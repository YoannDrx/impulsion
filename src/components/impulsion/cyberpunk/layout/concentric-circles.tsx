"use client";

import { cn } from "@/lib/utils";

type ConcentricCirclesProps = {
  className?: string;
  size?: number;
  rings?: number;
  color?: "lime" | "cyan" | "mixed";
  animated?: boolean;
  pulse?: boolean;
};

/**
 * Concentric Circles - Cercles concentriques animés pour hero sections
 * Style radar/HUD militaire
 */
export function ConcentricCircles({
  className,
  size = 400,
  rings = 5,
  color = "lime",
  animated = true,
  pulse = false,
}: ConcentricCirclesProps) {
  const getColor = (index: number) => {
    if (color === "mixed") {
      return index % 2 === 0 ? "var(--imp-lime-400)" : "var(--imp-cyan-400)";
    }
    return color === "lime" ? "var(--imp-lime-400)" : "var(--imp-cyan-400)";
  };

  const circleArray = Array.from({ length: rings }, (_, i) => i);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute",
        animated && "animate-[imp-spin-slow_12s_linear_infinite]",
        className,
      )}
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-full w-full"
        style={{ overflow: "visible" }}
      >
        {circleArray.map((i) => {
          const radius = ((i + 1) / rings) * (size / 2 - 10);
          const opacity = 0.15 + (i / rings) * 0.3;

          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={getColor(i)}
              strokeWidth={1}
              opacity={opacity}
              className={cn(
                pulse && "animate-[imp-neon-pulse_2s_ease-in-out_infinite]",
              )}
              style={{
                animationDelay: pulse ? `${i * 0.2}s` : undefined,
              }}
            />
          );
        })}

        {/* Lignes de croisement */}
        <line
          x1={size / 2}
          y1={10}
          x2={size / 2}
          y2={size - 10}
          stroke={getColor(0)}
          strokeWidth={0.5}
          opacity={0.3}
        />
        <line
          x1={10}
          y1={size / 2}
          x2={size - 10}
          y2={size / 2}
          stroke={getColor(0)}
          strokeWidth={0.5}
          opacity={0.3}
        />

        {/* Point central */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={3}
          fill={getColor(0)}
          className={cn(
            pulse && "animate-[imp-pulse-fast_1s_ease-in-out_infinite]",
          )}
        />
      </svg>
    </div>
  );
}
