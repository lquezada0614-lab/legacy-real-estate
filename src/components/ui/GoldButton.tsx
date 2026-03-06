"use client";

import type { ReactNode } from "react";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { cn } from "@/lib/utils";

interface GoldButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function GoldButton({
  children,
  href,
  onClick,
  size = "md",
  className = "",
}: GoldButtonProps) {
  const sizeClasses = {
    sm: "h-10 w-auto px-5 text-sm",
    md: "h-12 w-auto px-7 text-base",
    lg: "h-14 w-auto px-9 text-lg",
  };

  return (
    <MovingBorderButton
      as={href ? "a" : "button"}
      href={href}
      onClick={onClick}
      borderRadius="0.5rem"
      duration={3000}
      containerClassName={cn(sizeClasses[size], className?.includes("w-full") && "w-full")}
      borderClassName="bg-[radial-gradient(var(--gold-400)_40%,transparent_60%)]"
      className={cn(
        "bg-luxury-charcoal/90 border-gold/30 text-gold font-heading font-semibold hover:bg-luxury-charcoal",
        className
      )}
    >
      {children}
    </MovingBorderButton>
  );
}
