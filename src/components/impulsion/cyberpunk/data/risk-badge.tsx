"use client";

import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

type RiskLevel = "optimal" | "moderate" | "elevated" | "critical";

type RiskBadgeProps = {
  level: RiskLevel;
  label?: string;
  className?: string;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
};

/**
 * Risk Badge - Badge indicateur de niveau de risque
 * Pour alertes, statuts et monitoring
 */
export function RiskBadge({
  level,
  label,
  className,
  showIcon = true,
  size = "md",
  pulse = false,
}: RiskBadgeProps) {
  const config = {
    optimal: {
      bg: "bg-[var(--imp-lime-400)]/10",
      border: "border-[var(--imp-lime-400)]/30",
      text: "text-[var(--imp-lime-400)]",
      glow: pulse ? "shadow-[0_0_8px_var(--imp-lime-400)/50]" : "",
      icon: CheckCircle,
      defaultLabel: "OPTIMAL",
    },
    moderate: {
      bg: "bg-[var(--imp-cyan-400)]/10",
      border: "border-[var(--imp-cyan-400)]/30",
      text: "text-[var(--imp-cyan-400)]",
      glow: pulse ? "shadow-[0_0_8px_var(--imp-cyan-400)/50]" : "",
      icon: CheckCircle,
      defaultLabel: "MODERATE",
    },
    elevated: {
      bg: "bg-[var(--imp-warning)]/10",
      border: "border-[var(--imp-warning)]/30",
      text: "text-[var(--imp-warning)]",
      glow: pulse ? "shadow-[0_0_8px_var(--imp-warning)/50]" : "",
      icon: AlertTriangle,
      defaultLabel: "ELEVATED",
    },
    critical: {
      bg: "bg-[var(--imp-danger-neon)]/10",
      border: "border-[var(--imp-danger-neon)]/30",
      text: "text-[var(--imp-danger-neon)]",
      glow: pulse ? "shadow-[0_0_8px_var(--imp-danger-neon)/50]" : "",
      icon: XCircle,
      defaultLabel: "CRITICAL",
    },
  };

  const sizeClasses = {
    sm: {
      padding: "px-2 py-0.5",
      text: "text-xs",
      icon: "size-3",
      gap: "gap-1",
    },
    md: {
      padding: "px-2.5 py-1",
      text: "text-xs",
      icon: "size-3.5",
      gap: "gap-1.5",
    },
    lg: {
      padding: "px-3 py-1.5",
      text: "text-sm",
      icon: "size-4",
      gap: "gap-2",
    },
  };

  const { bg, border, text, glow, icon: Icon, defaultLabel } = config[level];
  const { padding, text: textSize, icon: iconSize, gap } = sizeClasses[size];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded border font-mono font-medium tracking-wider uppercase",
        bg,
        border,
        text,
        glow,
        padding,
        textSize,
        gap,
        pulse &&
          level === "critical" &&
          "animate-[imp-pulse-fast_1s_ease-in-out_infinite]",
        className,
      )}
    >
      {showIcon && <Icon className={iconSize} />}
      {label ?? defaultLabel}
    </span>
  );
}
