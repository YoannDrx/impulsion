"use client";

import { cn } from "@/lib/utils";

type PerspectiveGridProps = {
  className?: string;
  variant?: "flat" | "perspective" | "radial";
  color?: "default" | "lime" | "cyan";
  animated?: boolean;
};

/**
 * Perspective Grid - Grille de fond style Tron/cyberpunk
 * Peut etre plate, en perspective ou radiale
 */
export function PerspectiveGrid({
  className,
  variant = "flat",
  color = "default",
  animated = false,
}: PerspectiveGridProps) {
  const gridColor = {
    default: "var(--imp-grid-line)",
    lime: "var(--imp-glass-lime)",
    cyan: "var(--imp-glass-cyan)",
  }[color];

  if (variant === "radial") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden",
          className,
        )}
      >
        {/* Cercles concentriques */}
        <div
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            animated && "animate-[imp-spin-slow_20s_linear_infinite]",
          )}
          style={{
            width: "200%",
            height: "200%",
            background: `
              repeating-radial-gradient(
                circle at center,
                transparent 0px,
                transparent 60px,
                ${gridColor} 60px,
                ${gridColor} 61px
              )
            `,
          }}
        />
      </div>
    );
  }

  if (variant === "perspective") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden",
          className,
        )}
        style={{
          perspective: "500px",
          perspectiveOrigin: "50% 100%",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: "rotateX(60deg)",
            transformOrigin: "50% 100%",
            backgroundImage: `
              linear-gradient(${gridColor} 1px, transparent 1px),
              linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>
    );
  }

  // Flat grid
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0",
        animated && "animate-pulse",
        className,
      )}
      style={{
        backgroundImage: "var(--imp-perspective-grid)",
        backgroundSize: "var(--imp-perspective-grid-size)",
      }}
    />
  );
}
