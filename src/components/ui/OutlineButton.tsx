"use client";

import type { ReactNode } from "react";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { cn } from "@/lib/utils";

interface OutlineButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function OutlineButton({
  children,
  href,
  onClick,
  size = "md",
  className = "",
}: OutlineButtonProps) {
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
      containerClassName={cn(sizeClasses[size])}
      borderClassName="bg-[radial-gradient(var(--gold-300)_40%,transparent_60%)]"
      className={cn(
        "bg-transparent border-gold/20 text-gold font-heading font-semibold hover:bg-gold/10",
        className
      )}
    >
      {children}
    </MovingBorderButton>
  );
}
