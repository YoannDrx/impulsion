"use client";

import { cn } from "@/lib/utils";

type SparklineProps = {
  data: number[];
  className?: string;
  width?: number;
  height?: number;
  color?: "lime" | "cyan" | "danger" | "auto";
  fill?: boolean;
  showDots?: boolean;
  showLastValue?: boolean;
};

/**
 * Sparkline - Mini graphique en ligne pour affichage compact
 * Ideal pour les listes et tableaux
 */
export function Sparkline({
  data,
  className,
  width = 80,
  height = 24,
  color = "lime",
  fill = false,
  showDots = false,
  showLastValue = false,
}: SparklineProps) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  // Determine trend for auto color
  const trend = data[data.length - 1] - data[0];
  const autoColor = trend >= 0 ? "lime" : "danger";
  const activeColor = color === "auto" ? autoColor : color;

  const strokeColors = {
    lime: "stroke-[var(--imp-lime-400)]",
    cyan: "stroke-[var(--imp-cyan-400)]",
    danger: "stroke-[var(--imp-danger-neon)]",
  };

  const fillColors = {
    lime: "fill-[var(--imp-lime-400)]/20",
    cyan: "fill-[var(--imp-cyan-400)]/20",
    danger: "fill-[var(--imp-danger-neon)]/20",
  };

  const dotColors = {
    lime: "fill-[var(--imp-lime-400)]",
    cyan: "fill-[var(--imp-cyan-400)]",
    danger: "fill-[var(--imp-danger-neon)]",
  };

  const textColors = {
    lime: "text-[var(--imp-lime-400)]",
    cyan: "text-[var(--imp-cyan-400)]",
    danger: "text-[var(--imp-danger-neon)]",
  };

  // Generate path
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * (height - 4) - 2;
    return { x, y };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaPath = fill
    ? `${linePath} L ${width} ${height} L 0 ${height} Z`
    : "";

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <svg width={width} height={height} className="overflow-visible">
        {/* Fill area */}
        {fill && (
          <path
            d={areaPath}
            className={cn("stroke-none", fillColors[activeColor])}
          />
        )}

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={strokeColors[activeColor]}
        />

        {/* Dots */}
        {showDots &&
          points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={i === points.length - 1 ? 2.5 : 1.5}
              className={dotColors[activeColor]}
            />
          ))}

        {/* Last point highlight */}
        {!showDots && (
          <circle
            cx={points[points.length - 1].x}
            cy={points[points.length - 1].y}
            r={2}
            className={dotColors[activeColor]}
          />
        )}
      </svg>

      {/* Last value */}
      {showLastValue && (
        <span
          className={cn(
            "font-mono text-xs tabular-nums",
            textColors[activeColor],
          )}
        >
          {data[data.length - 1]}
        </span>
      )}
    </div>
  );
}
