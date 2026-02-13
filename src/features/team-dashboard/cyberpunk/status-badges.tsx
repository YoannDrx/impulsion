"use client";

import { cn } from "@/lib/utils";

type AthleteStatus = "optimal" | "fatigued" | "at-risk" | "injured";

type StatusBadgeProps = {
  status: AthleteStatus;
  size?: "sm" | "md";
  className?: string;
};

const statusConfig: Record<
  AthleteStatus,
  { label: string; bgClass: string; textClass: string }
> = {
  optimal: {
    label: "OPTIMAL",
    bgClass: "bg-[var(--imp-lime-400)]/10",
    textClass: "text-[var(--imp-lime-400)]",
  },
  fatigued: {
    label: "FATIGUED",
    bgClass: "bg-[var(--imp-cyan-400)]/10",
    textClass: "text-[var(--imp-cyan-400)]",
  },
  "at-risk": {
    label: "AT RISK",
    bgClass: "bg-[var(--imp-warning)]/10",
    textClass: "text-[var(--imp-warning)]",
  },
  injured: {
    label: "INJURED",
    bgClass: "bg-[var(--imp-danger-neon)]/10",
    textClass: "text-[var(--imp-danger-neon)]",
  },
};

/**
 * StatusBadge - Badge de statut athlète
 */
export function StatusBadge({
  status,
  size = "md",
  className,
}: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded font-mono font-bold",
        config.bgClass,
        config.textClass,
        size === "sm" && "px-1.5 py-0.5 text-[10px]",
        size === "md" && "px-2 py-1 text-xs",
        className,
      )}
    >
      {config.label}
    </span>
  );
}

type StatusIndicatorDotProps = {
  status: AthleteStatus;
  pulse?: boolean;
  className?: string;
};

/**
 * StatusIndicatorDot - Point indicateur de statut avec animation pulse
 */
export function StatusIndicatorDot({
  status,
  pulse = true,
  className,
}: StatusIndicatorDotProps) {
  const dotColors: Record<AthleteStatus, string> = {
    optimal: "bg-[var(--imp-lime-400)]",
    fatigued: "bg-[var(--imp-cyan-400)]",
    "at-risk": "bg-[var(--imp-warning)]",
    injured: "bg-[var(--imp-danger-neon)]",
  };

  return (
    <span className={cn("relative flex size-2", className)}>
      {pulse && (
        <span
          className={cn(
            "absolute inline-flex size-full animate-ping rounded-full opacity-75",
            dotColors[status],
          )}
        />
      )}
      <span
        className={cn(
          "relative inline-flex size-2 rounded-full",
          dotColors[status],
        )}
      />
    </span>
  );
}
