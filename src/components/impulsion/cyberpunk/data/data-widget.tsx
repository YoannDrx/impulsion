"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { GlassPanel } from "../layout/glass-panel";

type DataWidgetProps = {
  label: string;
  value: ReactNode;
  unit?: string;
  icon?: LucideIcon;
  trend?: { value: number; label?: string };
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: "lime" | "cyan" | "neutral";
};

/**
 * Data Widget - Widget compact pour afficher une metrique
 * Avec icone, trend et unite
 */
export function DataWidget({
  label,
  value,
  unit,
  icon: Icon,
  trend,
  className,
  size = "md",
  color = "lime",
}: DataWidgetProps) {
  const sizeClasses = {
    sm: { padding: "p-3", valueSize: "text-xl", labelSize: "text-xs" },
    md: { padding: "p-4", valueSize: "text-2xl", labelSize: "text-xs" },
    lg: { padding: "p-5", valueSize: "text-3xl", labelSize: "text-sm" },
  };

  const colorClasses = {
    lime: {
      icon: "text-[var(--imp-lime-400)]",
      value: "text-[var(--imp-lime-400)]",
    },
    cyan: {
      icon: "text-[var(--imp-cyan-400)]",
      value: "text-[var(--imp-cyan-400)]",
    },
    neutral: {
      icon: "text-neutral-400",
      value: "text-white",
    },
  };

  const sizes = sizeClasses[size];
  const colors = colorClasses[color];

  return (
    <GlassPanel
      className={cn(sizes.padding, className)}
      glow={color === "neutral" ? "none" : color}
    >
      <div className="flex items-start justify-between">
        {/* Label + Icon */}
        <div className="flex items-center gap-2">
          {Icon && <Icon className={cn("size-4", colors.icon)} />}
          <span
            className={cn(
              "font-medium tracking-wider text-neutral-400 uppercase",
              sizes.labelSize,
            )}
          >
            {label}
          </span>
        </div>

        {/* Trend */}
        {trend && (
          <span
            className={cn(
              "flex items-center gap-0.5 font-mono text-xs",
              trend.value >= 0
                ? "text-[var(--imp-lime-400)]"
                : "text-[var(--imp-danger-neon)]",
            )}
          >
            {trend.value >= 0 ? "+" : ""}
            {trend.value}%
          </span>
        )}
      </div>

      {/* Value */}
      <div className="mt-2 flex items-baseline gap-1">
        <span
          className={cn(
            "font-mono font-bold tabular-nums",
            sizes.valueSize,
            colors.value,
          )}
        >
          {value}
        </span>
        {unit && <span className="text-sm text-neutral-500">{unit}</span>}
      </div>

      {/* Trend label */}
      {trend?.label && (
        <span className="mt-1 text-xs text-neutral-500">{trend.label}</span>
      )}
    </GlassPanel>
  );
}
