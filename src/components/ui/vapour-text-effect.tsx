"use client";
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

export enum Tag {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  P = "p",
}

type VaporizeTextCycleProps = {
  texts: string[];
  font?: {
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: number;
  };
  color?: string;
  spread?: number;
  density?: number;
  animation?: {
    vaporizeDuration?: number;
    fadeInDuration?: number;
    waitDuration?: number;
  };
  direction?: "left-to-right" | "right-to-left";
  alignment?: "left" | "center" | "right";
  tag?: Tag;
};

type Particle = {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  color: string;
  opacity: number;
  originalAlpha: number;
  velocityX: number;
  velocityY: number;
  angle: number;
  speed: number;
  shouldFadeQuickly?: boolean;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function transformValue(
  value: number,
  inputRange: [number, number],
  outputRange: [number, number],
  shouldClamp = false
) {
  const [inMin, inMax] = inputRange;
  const [outMin, outMax] = outputRange;
  const mapped = ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
  return shouldClamp ? clamp(mapped, Math.min(outMin, outMax), Math.max(outMin, outMax)) : mapped;
}

function parseColor(color: string): [number, number, number] {
  const match = color.match(/\d+/g);
  if (match && match.length >= 3) {
    return [parseInt(match[0]), parseInt(match[1]), parseInt(match[2])];
  }
  return [255, 255, 255];
}

export function VaporizeTextCycle({
  texts = ["Next.js", "React"],
  font = {
    fontFamily: "sans-serif",
    fontSize: "50px",
    fontWeight: 400,
  },
  color = "rgb(255, 255, 255)",
  spread = 5,
  density = 5,
  animation = {
    vaporizeDuration: 2,
    fadeInDuration: 1,
    waitDuration: 0.5,
  },
  direction = "left-to-right",
  alignment = "center",
  tag = Tag.P,
}: VaporizeTextCycleProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animationState, setAnimationState] = useState<
    "static" | "vaporizing" | "fadingIn" | "waiting"
  >("static");
  const vaporizeProgressRef = useRef(0);
  const fadeOpacityRef = useRef(0);
  const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 });
  const transformedDensity = transformValue(density, [0, 10], [0.3, 1], true);

  const isMobile = useMemo(() => {
    if (typeof window !== "undefined") return window.innerWidth < 768;
    return false;
  }, []);

  const dpr = useMemo(() => {
    if (typeof window === "undefined") return 1;
    const base = window.devicePixelRatio * 1.5 || 1;
    return isMobile ? base * 0.6 : base;
  }, [isMobile]);

  const animationDurations = useMemo(
    () => ({
      VAPORIZE: (animation.vaporizeDuration ?? 2) * 1000,
      FADE_IN: (animation.fadeInDuration ?? 1) * 1000,
      WAIT: (animation.waitDuration ?? 0.5) * 1000,
    }),
    [animation.vaporizeDuration, animation.fadeInDuration, animation.waitDuration]
  );

  const fontSize = parseInt(font.fontSize?.replace("px", "") || "50");
  const SPREAD = Math.max(1, Math.round(fontSize * (spread / 10) * 2));

  // Resize observer
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        console.log("Canvas rendering, wrapper size:", { width, height });
        if (width > 0 && height > 0) {
          setWrapperSize({ width, height });
        }
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Build particles from text
  const buildParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || wrapperSize.width === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = wrapperSize.width * dpr;
    const h = wrapperSize.height * dpr;
    canvas.width = w;
    canvas.height = h;

    const fontStr = `${font.fontWeight ?? 400} ${fontSize * dpr}px ${font.fontFamily ?? "sans-serif"}`;
    ctx.font = fontStr;
    ctx.fillStyle = color;
    ctx.textBaseline = "middle";

    const text = texts[currentTextIndex] || "";
    const metrics = ctx.measureText(text);
    let textX: number;
    if (alignment === "left") textX = 0;
    else if (alignment === "right") textX = w - metrics.width;
    else textX = (w - metrics.width) / 2;

    ctx.clearRect(0, 0, w, h);
    ctx.fillText(text, textX, h / 2);

    const imageData = ctx.getImageData(0, 0, w, h);
    const pixels = imageData.data;
    const particles: Particle[] = [];
    const step = Math.max(1, Math.round(1 / transformedDensity));

    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const i = (y * w + x) * 4;
        const a = pixels[i + 3];
        if (a > 20) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const angle = (Math.random() - 0.5) * Math.PI;
          particles.push({
            x: x / dpr,
            y: y / dpr,
            originalX: x / dpr,
            originalY: y / dpr,
            color: `rgba(${r},${g},${b},${a / 255})`,
            opacity: a / 255,
            originalAlpha: a / 255,
            velocityX: 0,
            velocityY: 0,
            angle,
            speed: Math.random() * SPREAD * 0.5 + SPREAD * 0.1,
          });
        }
      }
    }

    particlesRef.current = particles;
    ctx.clearRect(0, 0, w, h);
  }, [wrapperSize, currentTextIndex, texts, font, fontSize, color, dpr, alignment, transformedDensity, SPREAD]);

  useEffect(() => {
    buildParticles();
  }, [buildParticles]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastTime = 0;
    let stateStartTime = 0;
    let currentState = animationState;

    function animate(time: number) {
      if (!lastTime) {
        lastTime = time;
        stateStartTime = time;
      }
      const dt = time - lastTime;
      lastTime = time;

      const w = wrapperSize.width;
      const h = wrapperSize.height;
      if (w === 0 || h === 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      const particles = particlesRef.current;
      const elapsed = time - stateStartTime;

      if (currentState === "static") {
        // Draw particles at original positions
        for (const p of particles) {
          ctx!.fillStyle = p.color;
          ctx!.globalAlpha = p.originalAlpha;
          ctx!.fillRect(p.originalX * dpr, p.originalY * dpr, dpr, dpr);
        }
        ctx!.globalAlpha = 1;

        if (elapsed > animationDurations.WAIT && texts.length > 1) {
          currentState = "vaporizing";
          stateStartTime = time;
          vaporizeProgressRef.current = 0;
          // Assign vaporize velocities
          for (const p of particles) {
            const dirMult = direction === "left-to-right" ? 1 : -1;
            p.velocityX = Math.cos(p.angle) * p.speed * dirMult;
            p.velocityY = Math.sin(p.angle) * p.speed - Math.random() * SPREAD * 0.3;
          }
          setAnimationState("vaporizing");
        }
      } else if (currentState === "vaporizing") {
        const progress = Math.min(elapsed / animationDurations.VAPORIZE, 1);
        vaporizeProgressRef.current = progress;

        for (const p of particles) {
          const normalizedX =
            direction === "left-to-right"
              ? p.originalX / w
              : 1 - p.originalX / w;

          const particleProgress = clamp(
            (progress - normalizedX * 0.5) / 0.5,
            0,
            1
          );

          if (particleProgress > 0) {
            p.x = p.originalX + p.velocityX * particleProgress * 3;
            p.y = p.originalY + p.velocityY * particleProgress * 3;
            p.opacity = p.originalAlpha * (1 - particleProgress);
          } else {
            p.x = p.originalX;
            p.y = p.originalY;
            p.opacity = p.originalAlpha;
          }

          if (p.opacity > 0.01) {
            ctx!.globalAlpha = p.opacity;
            ctx!.fillStyle = p.color;
            ctx!.fillRect(p.x * dpr, p.y * dpr, dpr, dpr);
          }
        }
        ctx!.globalAlpha = 1;

        if (progress >= 1) {
          currentState = "waiting";
          stateStartTime = time;
          setAnimationState("waiting");
        }
      } else if (currentState === "waiting") {
        if (elapsed > animationDurations.WAIT) {
          const nextIndex = (currentTextIndex + 1) % texts.length;
          setCurrentTextIndex(nextIndex);
          currentState = "fadingIn";
          stateStartTime = time;
          fadeOpacityRef.current = 0;
          setAnimationState("fadingIn");
        }
      } else if (currentState === "fadingIn") {
        const progress = Math.min(elapsed / animationDurations.FADE_IN, 1);
        fadeOpacityRef.current = progress;

        for (const p of particles) {
          ctx!.globalAlpha = p.originalAlpha * progress;
          ctx!.fillStyle = p.color;
          ctx!.fillRect(p.originalX * dpr, p.originalY * dpr, dpr, dpr);
        }
        ctx!.globalAlpha = 1;

        if (progress >= 1) {
          currentState = "static";
          stateStartTime = time;
          setAnimationState("static");
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [
    animationState,
    wrapperSize,
    texts,
    currentTextIndex,
    dpr,
    direction,
    SPREAD,
    animationDurations,
  ]);

  return (
    <div
      ref={wrapperRef}
      style={{ width: "100%", minHeight: "150px", pointerEvents: "none" }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: wrapperSize.width || "100%",
          height: wrapperSize.height || 150,
          minHeight: "150px",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
