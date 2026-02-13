"use client";

import { cn } from "@/lib/utils";

type StatusIndicatorProps = {
  status: "online" | "offline" | "warning" | "critical" | "optimal";
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
};

/**
 * Status Indicator - Badge de statut avec indicateur LED
 * Style moniteur systeme/HUD
 */
export function StatusIndicator({
  status,
  label,
  className,
  size = "md",
  pulse = true,
}: StatusIndicatorProps) {
  const statusColors = {
    online: {
      dot: "bg-[var(--imp-lime-400)]",
      glow: "shadow-[0_0_8px_var(--imp-lime-400)]",
      text: "text-[var(--imp-lime-400)]",
    },
    offline: {
      dot: "bg-neutral-500",
      glow: "",
      text: "text-neutral-500",
    },
    warning: {
      dot: "bg-[var(--imp-warning)]",
      glow: "shadow-[0_0_8px_var(--imp-warning)]",
      text: "text-[var(--imp-warning)]",
    },
    critical: {
      dot: "bg-[var(--imp-danger-neon)]",
      glow: "shadow-[0_0_8px_var(--imp-danger-neon)]",
      text: "text-[var(--imp-danger-neon)]",
    },
    optimal: {
      dot: "bg-[var(--imp-cyan-400)]",
      glow: "shadow-[0_0_8px_var(--imp-cyan-400)]",
      text: "text-[var(--imp-cyan-400)]",
    },
  };

  const sizeClasses = {
    sm: { dot: "size-1.5", text: "text-xs", gap: "gap-1.5" },
    md: { dot: "size-2", text: "text-sm", gap: "gap-2" },
    lg: { dot: "size-2.5", text: "text-base", gap: "gap-2.5" },
  };

  const colors = statusColors[status];
  const sizes = sizeClasses[size];

  return (
    <div className={cn("inline-flex items-center", sizes.gap, className)}>
      <span
        className={cn(
          "rounded-full",
          sizes.dot,
          colors.dot,
          colors.glow,
          pulse &&
            status !== "offline" &&
            "animate-[imp-pulse-fast_1.5s_ease-in-out_infinite]",
        )}
      />
      {label && (
        <span
          className={cn(
            "font-mono tracking-wider uppercase",
            sizes.text,
            colors.text,
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}
