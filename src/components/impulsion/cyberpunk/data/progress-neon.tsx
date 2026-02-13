"use client";

import { cn } from "@/lib/utils";

type ProgressNeonProps = {
  value: number;
  max?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: "lime" | "cyan" | "danger" | "auto";
  showValue?: boolean;
  label?: string;
  animated?: boolean;
};

/**
 * Progress Neon - Barre de progression avec effet glow neon
 * Style loading bar cyberpunk
 */
export function ProgressNeon({
  value,
  max = 100,
  className,
  size = "md",
  color = "lime",
  showValue = false,
  label,
  animated = true,
}: ProgressNeonProps) {
  const percentage = Math.min((value / max) * 100, 100);

  // Auto color based on percentage
  const getAutoColor = () => {
    if (percentage >= 70) return "lime";
    if (percentage >= 40) return "cyan";
    return "danger";
  };

  const activeColor = color === "auto" ? getAutoColor() : color;

  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  const barColors = {
    lime: "bg-[var(--imp-lime-400)]",
    cyan: "bg-[var(--imp-cyan-400)]",
    danger: "bg-[var(--imp-danger-neon)]",
  };

  const glowColors = {
    lime: "shadow-[0_0_10px_var(--imp-lime-400),0_0_20px_var(--imp-lime-400)/50]",
    cyan: "shadow-[0_0_10px_var(--imp-cyan-400),0_0_20px_var(--imp-cyan-400)/50]",
    danger:
      "shadow-[0_0_10px_var(--imp-danger-neon),0_0_20px_var(--imp-danger-neon)/50]",
  };

  const textColors = {
    lime: "text-[var(--imp-lime-400)]",
    cyan: "text-[var(--imp-cyan-400)]",
    danger: "text-[var(--imp-danger-neon)]",
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Label + Value header */}
      {(label ?? showValue) && (
        <div className="mb-1 flex items-center justify-between">
          {label && (
            <span className="text-xs font-medium tracking-wider text-neutral-400 uppercase">
              {label}
            </span>
          )}
          {showValue && (
            <span
              className={cn(
                "font-mono text-xs tabular-nums",
                textColors[activeColor],
              )}
            >
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      {/* Progress track */}
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-neutral-800",
          sizeClasses[size],
        )}
      >
        {/* Progress bar */}
        <div
          className={cn(
            "h-full rounded-full",
            barColors[activeColor],
            glowColors[activeColor],
            animated && "transition-all duration-500 ease-out",
          )}
          style={{ width: `${percentage}%` }}
        />

        {/* Animated scan line */}
        {animated && percentage > 0 && percentage < 100 && (
          <div className="absolute inset-y-0 w-8 animate-[imp-scan-horizontal_2s_linear_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        )}
      </div>

      {/* Tick marks */}
      <div className="mt-1 flex justify-between">
        {[0, 25, 50, 75, 100].map((tick) => (
          <div
            key={tick}
            className={cn(
              "h-1 w-px",
              tick <= percentage ? barColors[activeColor] : "bg-neutral-700",
            )}
          />
        ))}
      </div>
    </div>
  );
}
