"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "dark" | "colored";
  blur?: "light" | "normal" | "heavy";
  border?: boolean;
  glow?: "none" | "lime" | "cyan";
};

/**
 * Glass Panel - Conteneur glassmorphism style cyberpunk
 * Avec options de blur, bordure et glow
 */
export function GlassPanel({
  children,
  className,
  variant = "default",
  blur = "normal",
  border = true,
  glow = "none",
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg",
        // Background variants
        variant === "default" && "bg-[var(--imp-cyber-glass-bg)]",
        variant === "dark" && "bg-[var(--imp-glass-dark-80)]",
        variant === "colored" && "bg-[var(--imp-glass-lime)]",
        // Blur levels
        blur === "light" && "backdrop-blur-sm",
        blur === "normal" && "backdrop-blur-md",
        blur === "heavy" && "backdrop-blur-xl",
        // Border
        border && "border border-[var(--imp-cyber-glass-border)]",
        // Glow effects
        glow === "lime" && "shadow-[var(--imp-glow-lime-subtle)]",
        glow === "cyan" && "shadow-[var(--imp-glow-cyan-subtle)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
