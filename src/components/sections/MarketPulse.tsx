"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Activity, Home } from "lucide-react";
import Link from "next/link";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

const GOLD = "rgb(212, 175, 55)";

// Sparkline data — normalized 0-1 values representing trend over 12 months
const fresnoPriceTrend = [0.42, 0.45, 0.48, 0.46, 0.52, 0.55, 0.58, 0.61, 0.65, 0.7, 0.74, 0.8];
const tularePriceTrend = [0.38, 0.4, 0.43, 0.47, 0.5, 0.48, 0.53, 0.57, 0.62, 0.66, 0.71, 0.78];
const foreclosureTrend = [0.2, 0.22, 0.28, 0.35, 0.4, 0.48, 0.52, 0.58, 0.65, 0.72, 0.8, 0.9];
const rateTrend = [0.9, 0.88, 0.85, 0.82, 0.78, 0.75, 0.72, 0.7, 0.68, 0.65, 0.63, 0.6];

function buildSparklinePath(data: number[], width: number, height: number): string {
  const stepX = width / (data.length - 1);
  return data
    .map((v, i) => {
      const x = i * stepX;
      const y = height - v * height;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

function Sparkline({ data, className }: { data: number[]; className?: string }) {
  const w = 200;
  const h = 60;
  const path = buildSparklinePath(data, w, h);

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      className={className}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="sparkGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={GOLD} stopOpacity={0.3} />
          <stop offset="100%" stopColor={GOLD} stopOpacity={0} />
        </linearGradient>
      </defs>
      {/* Fill area */}
      <motion.path
        d={`${path} L ${w} ${h} L 0 ${h} Z`}
        fill="url(#sparkGold)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
      />
      {/* Line */}
      <motion.path
        d={path}
        stroke={GOLD}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
      />
    </svg>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: [0, -6, 0],
    transition: {
      opacity: { duration: 0.6, delay: i * 0.1 },
      y: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut" as const,
        delay: i * 0.3,
      },
    },
  }),
};

export function MarketPulse() {
  return (
    <section id="market-pulse" className="relative bg-neutral-950 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-4 font-sans text-xs uppercase tracking-[0.3em]" style={{ color: GOLD }}>
            Central Valley Market Pulse &bull; NR.2
          </p>
          <h2 className="font-serif text-3xl font-light tracking-tight text-white md:text-6xl">
            Visalia & Fresno Housing Market{" "}
            <span className="italic" style={{ color: GOLD }}>Analytics</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Interest Rate — spans 2 cols on lg */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-white/20 md:border-white/10 bg-white/5 p-6 backdrop-blur-sm will-change-transform lg:col-span-2"
          >
            <Sparkline data={rateTrend} className="absolute inset-0 h-full w-full opacity-30" />
            <div className="relative z-10">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <Activity className="h-5 w-5" style={{ color: GOLD }} />
                </div>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40">
                  30-Yr Fixed Rate
                </p>
              </div>
              <p className="font-serif text-5xl font-light text-white md:text-6xl">
                6.14<span className="text-3xl text-white/40">%</span>
              </p>
              <p className="mt-2 font-sans text-xs text-white/40">
                National average &mdash; trending down from 2024 highs
              </p>
            </div>
          </motion.div>

          {/* Fresno */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-white/20 md:border-white/10 bg-white/5 p-6 backdrop-blur-sm will-change-transform"
          >
            <Sparkline data={fresnoPriceTrend} className="absolute inset-0 h-full w-full opacity-30" />
            <div className="relative z-10">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <Home className="h-5 w-5" style={{ color: GOLD }} />
                </div>
                <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40">
                  Fresno Median Home Price
                </h3>
              </div>
              <p className="font-serif text-3xl font-light text-white">
                $435<span className="text-lg text-white/40">k</span>
              </p>
              <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.15em] text-white/30">
                Median Price
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-white/30" />
                <p className="font-sans text-xs text-white/50">
                  31 days on market
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tulare */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-white/20 md:border-white/10 bg-white/5 p-6 backdrop-blur-sm will-change-transform"
          >
            <Sparkline data={tularePriceTrend} className="absolute inset-0 h-full w-full opacity-30" />
            <div className="relative z-10">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <Home className="h-5 w-5" style={{ color: GOLD }} />
                </div>
                <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40">
                  Tulare County Median Price
                </h3>
              </div>
              <p className="font-serif text-3xl font-light text-white">
                $404<span className="text-lg text-white/40">,990</span>
              </p>
              <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.15em] text-white/30">
                Median Price
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-white/30" />
                <p className="font-sans text-xs text-white/50">
                  28 days on market
                </p>
              </div>
            </div>
          </motion.div>

          {/* Foreclosure Trend — spans full width */}
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-[#C5A059]/30 md:border-[#C5A059]/20 bg-[#C5A059]/5 p-6 backdrop-blur-sm will-change-transform lg:col-span-4"
          >
            <Sparkline data={foreclosureTrend} className="absolute right-0 top-0 h-full w-1/2 opacity-20" />
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#C5A059]/20 bg-[#C5A059]/10">
                    <TrendingUp className="h-5 w-5" style={{ color: GOLD }} />
                  </div>
                  <h3 className="font-sans text-[10px] uppercase tracking-[0.2em]" style={{ color: GOLD }}>
                    Central Valley Foreclosure Trend
                  </h3>
                </div>
                <p className="font-serif text-4xl font-light text-white md:text-5xl">
                  +32<span className="text-2xl text-white/40">%</span>{" "}
                  <span className="font-sans text-sm font-normal text-white/40">YoY</span>
                </p>
                <p className="mt-2 max-w-md font-sans text-xs leading-relaxed text-white/50">
                  High opportunity for AB 2424 listing pauses. Central Valley foreclosure filings
                  are rising — positioning investors and distressed homeowners for strategic action.
                </p>
              </div>
              <div className="flex shrink-0 gap-3">
                <Link href="/foreclosures">
                  <LiquidButton size="lg">
                    Learn About AB 2424
                  </LiquidButton>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Weekly Investor Report CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block rounded-2xl border border-white/20 md:border-white/10 bg-white/5 px-6 py-8 md:px-10 backdrop-blur-sm will-change-transform">
            <p className="mb-2 font-sans text-[10px] uppercase tracking-[0.3em] text-white/30">
              Stay Informed
            </p>
            <h3 className="mb-4 font-serif text-2xl font-light text-white">
              Weekly <span className="italic" style={{ color: GOLD }}>Investor Report</span>
            </h3>
            <p className="mx-auto mb-6 max-w-sm font-sans text-xs leading-relaxed text-white/40">
              Data-driven insights on pricing, inventory, and foreclosure trends across the Central Valley.
            </p>
            <Link href="/blog">
              <LiquidButton size="xl">
                View Full Market Analysis
              </LiquidButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
