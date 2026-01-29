"use client";

import { GlassPanel } from "@/components/impulsion/cyberpunk";
import { cn } from "@/lib/utils";

type Metric = {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "stable";
  color?: "lime" | "cyan" | "warning" | "danger";
};

type MetricsOverviewStripProps = {
  className?: string;
  metrics?: Metric[];
};

const defaultMetrics: Metric[] = [
  { label: "SQUAD_SIZE", value: 12, color: "cyan" },
  { label: "AVG_READINESS", value: "78%", trend: "up", color: "lime" },
  { label: "ACTIVE_TODAY", value: 8, color: "cyan" },
  { label: "AT_RISK", value: 2, color: "warning" },
  { label: "INJURED", value: 1, color: "danger" },
  { label: "SESSIONS_WEEK", value: 34, trend: "up", color: "lime" },
];

/**
 * MetricsOverviewStrip - Bandeau de métriques d'équipe
 */
export function MetricsOverviewStrip({
  className,
  metrics = defaultMetrics,
}: MetricsOverviewStripProps) {
  const getTrendSymbol = (trend?: "up" | "down" | "stable") => {
    if (trend === "up") return "↑";
    if (trend === "down") return "↓";
    return "";
  };

  return (
    <GlassPanel className={cn("px-6 py-3", className)} glow="none">
      <div className="flex items-center justify-between">
        {metrics.map((metric, i) => (
          <div
            key={metric.label}
            className={cn(
              "flex items-center gap-3",
              i > 0 && "border-l border-neutral-800 pl-6",
            )}
          >
            <span className="font-mono text-xs text-neutral-500">
              {metric.label}
            </span>
            <span
              className={cn(
                "font-mono text-lg font-bold",
                metric.color === "lime" && "text-[var(--imp-lime-400)]",
                metric.color === "cyan" && "text-[var(--imp-cyan-400)]",
                metric.color === "warning" && "text-[var(--imp-warning)]",
                metric.color === "danger" && "text-[var(--imp-danger-neon)]",
                !metric.color && "text-white",
              )}
            >
              {metric.value}
              {metric.trend && (
                <span
                  className={cn(
                    "ml-1 text-sm",
                    metric.trend === "up" && "text-[var(--imp-lime-400)]",
                    metric.trend === "down" && "text-[var(--imp-danger-neon)]",
                  )}
                >
                  {getTrendSymbol(metric.trend)}
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}
