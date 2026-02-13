"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type HudBorderProps = {
  children: ReactNode;
  className?: string;
  color?: "lime" | "cyan" | "danger";
  cornerSize?: "sm" | "md" | "lg";
  animated?: boolean;
};

/**
 * HUD Border - Conteneur avec coins styles interface militaire/HUD
 * Les 4 coins ont des bordures colorees caracteristiques
 */
export function HudBorder({
  children,
  className,
  color = "lime",
  cornerSize = "md",
  animated = false,
}: HudBorderProps) {
  const cornerSizeValue = {
    sm: "8px",
    md: "12px",
    lg: "16px",
  }[cornerSize];

  const colorClass = {
    lime: "before:border-[var(--imp-lime-400)] after:border-[var(--imp-lime-400)]",
    cyan: "before:border-[var(--imp-cyan-400)] after:border-[var(--imp-cyan-400)]",
    danger:
      "before:border-[var(--imp-danger-neon)] after:border-[var(--imp-danger-neon)]",
  }[color];

  return (
    <div
      className={cn(
        "relative",
        // Coins top-left et top-right via pseudo-elements
        "before:pointer-events-none before:absolute before:top-0 before:left-0 before:border-t-2 before:border-l-2",
        "after:pointer-events-none after:absolute after:top-0 after:right-0 after:border-t-2 after:border-r-2",
        colorClass,
        animated &&
          "before:animate-[imp-hud-corner-pulse_2s_ease-in-out_infinite] after:animate-[imp-hud-corner-pulse_2s_ease-in-out_infinite_0.5s]",
        className,
      )}
      style={
        {
          "--corner-size": cornerSizeValue,
        } as React.CSSProperties
      }
    >
      {/* Coins bottom-left et bottom-right */}
      <div
        className={cn(
          "pointer-events-none absolute bottom-0 left-0 border-b-2 border-l-2",
          color === "lime" && "border-[var(--imp-lime-400)]",
          color === "cyan" && "border-[var(--imp-cyan-400)]",
          color === "danger" && "border-[var(--imp-danger-neon)]",
          animated &&
            "animate-[imp-hud-corner-pulse_2s_ease-in-out_infinite_0.25s]",
        )}
        style={{ width: cornerSizeValue, height: cornerSizeValue }}
      />
      <div
        className={cn(
          "pointer-events-none absolute right-0 bottom-0 border-r-2 border-b-2",
          color === "lime" && "border-[var(--imp-lime-400)]",
          color === "cyan" && "border-[var(--imp-cyan-400)]",
          color === "danger" && "border-[var(--imp-danger-neon)]",
          animated &&
            "animate-[imp-hud-corner-pulse_2s_ease-in-out_infinite_0.75s]",
        )}
        style={{ width: cornerSizeValue, height: cornerSizeValue }}
      />
      {/* Style des pseudo-elements top */}
      <style jsx>{`
        div::before,
        div::after {
          width: var(--corner-size);
          height: var(--corner-size);
        }
      `}</style>
      {children}
    </div>
  );
}
