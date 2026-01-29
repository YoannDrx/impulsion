"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type NeonTextProps = {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  color?: "lime" | "cyan" | "danger" | "purple";
  intensity?: "subtle" | "normal" | "intense";
  animated?: boolean;
};

/**
 * Neon Text - Texte avec effet glow neon
 * Peut pulser pour attirer l'attention
 */
export function NeonText({
  children,
  className,
  as: Component = "span",
  color = "lime",
  intensity = "normal",
  animated = false,
}: NeonTextProps) {
  const colorStyles = {
    lime: {
      text: "text-[var(--imp-lime-400)]",
      glowSubtle: "[text-shadow:0_0_5px_var(--imp-lime-400)]",
      glowNormal: "[text-shadow:var(--imp-text-glow-lime)]",
      glowIntense:
        "[text-shadow:0_0_10px_var(--imp-lime-400),0_0_20px_var(--imp-lime-400),0_0_40px_var(--imp-lime-400)]",
    },
    cyan: {
      text: "text-[var(--imp-cyan-400)]",
      glowSubtle: "[text-shadow:0_0_5px_var(--imp-cyan-400)]",
      glowNormal: "[text-shadow:var(--imp-text-glow-cyan)]",
      glowIntense:
        "[text-shadow:0_0_10px_var(--imp-cyan-400),0_0_20px_var(--imp-cyan-400),0_0_40px_var(--imp-cyan-400)]",
    },
    danger: {
      text: "text-[var(--imp-danger-neon)]",
      glowSubtle: "[text-shadow:0_0_5px_var(--imp-danger-neon)]",
      glowNormal: "[text-shadow:var(--imp-text-glow-danger)]",
      glowIntense:
        "[text-shadow:0_0_10px_var(--imp-danger-neon),0_0_20px_var(--imp-danger-neon),0_0_40px_var(--imp-danger-neon)]",
    },
    purple: {
      text: "text-[var(--imp-purple-neon)]",
      glowSubtle: "[text-shadow:0_0_5px_var(--imp-purple-neon)]",
      glowNormal:
        "[text-shadow:0_0_10px_var(--imp-purple-neon),0_0_20px_var(--imp-purple-neon)]",
      glowIntense:
        "[text-shadow:0_0_10px_var(--imp-purple-neon),0_0_20px_var(--imp-purple-neon),0_0_40px_var(--imp-purple-neon)]",
    },
  };

  const style = colorStyles[color];
  const glowClass = {
    subtle: style.glowSubtle,
    normal: style.glowNormal,
    intense: style.glowIntense,
  }[intensity];

  return (
    <Component
      className={cn(
        style.text,
        glowClass,
        animated && "animate-[imp-neon-pulse_2s_ease-in-out_infinite]",
        className,
      )}
    >
      {children}
    </Component>
  );
}
