"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type GlitchTextProps = {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  intensity?: "subtle" | "normal" | "intense";
  color?: "lime" | "cyan" | "white";
  animated?: boolean;
};

/**
 * Glitch Text - Titre avec effet de distorsion style glitch
 * Utilise des pseudo-elements pour creer l'effet de decalage
 */
export function GlitchText({
  children,
  className,
  as: Component = "span",
  intensity = "normal",
  color = "lime",
  animated = true,
}: GlitchTextProps) {
  const colorClass = {
    lime: "text-[var(--imp-lime-400)]",
    cyan: "text-[var(--imp-cyan-400)]",
    white: "text-white",
  }[color];

  const glowClass = {
    lime: "[text-shadow:var(--imp-text-glow-lime)]",
    cyan: "[text-shadow:var(--imp-text-glow-cyan)]",
    white: "[text-shadow:0_0_10px_rgba(255,255,255,0.5)]",
  }[color];

  return (
    <Component
      className={cn(
        "relative inline-block font-bold tracking-tight",
        colorClass,
        glowClass,
        animated &&
          intensity === "subtle" &&
          "animate-[imp-glitch_4s_linear_infinite]",
        animated &&
          intensity === "normal" &&
          "animate-[imp-glitch_2s_linear_infinite]",
        animated &&
          intensity === "intense" &&
          "animate-[imp-glitch-color_1s_linear_infinite]",
        className,
      )}
      data-text={typeof children === "string" ? children : undefined}
    >
      {children}
    </Component>
  );
}
