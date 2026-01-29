"use client";

import { GlassPanel, NeonText } from "@/components/impulsion/cyberpunk";
import { ProgressNeon } from "@/components/impulsion/cyberpunk/data/progress-neon";
import { cn } from "@/lib/utils";

type LoadMetricsProjectionProps = {
  className?: string;
  weeklyLoad?: number;
  targetLoad?: number;
  acwr?: number;
  projectedReadiness?: number;
};

/**
 * LoadMetricsProjection - Projection des métriques de charge
 */
export function LoadMetricsProjection({
  className,
  weeklyLoad = 420,
  targetLoad = 500,
  acwr = 1.08,
  projectedReadiness = 82,
}: LoadMetricsProjectionProps) {
  const getAcwrStatus = () => {
    if (acwr >= 0.8 && acwr <= 1.3)
      return { label: "OPTIMAL", color: "lime" as const };
    if (acwr > 1.3 && acwr <= 1.5)
      return { label: "ELEVATED", color: "warning" as const };
    return { label: "HIGH RISK", color: "danger" as const };
  };

  const acwrStatus = getAcwrStatus();

  return (
    <GlassPanel className={cn("p-4", className)} glow="lime">
      <NeonText
        as="h3"
        color="lime"
        intensity="subtle"
        className="mb-4 font-mono text-xs tracking-wider uppercase"
      >
        LOAD_PROJECTION
      </NeonText>

      <div className="space-y-4">
        {/* Weekly load */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-xs text-neutral-500">
              WEEKLY_LOAD
            </span>
            <span className="font-mono text-sm font-bold text-white">
              {weeklyLoad} / {targetLoad}
            </span>
          </div>
          <ProgressNeon
            value={weeklyLoad}
            max={targetLoad}
            color="lime"
            size="md"
          />
        </div>

        {/* ACWR */}
        <div className="flex items-center justify-between rounded border border-neutral-800 p-3">
          <div>
            <span className="font-mono text-xs text-neutral-500">ACWR</span>
            <p
              className={cn(
                "font-mono text-xl font-bold",
                acwrStatus.color === "lime" && "text-[var(--imp-lime-400)]",
                acwrStatus.color === "warning" && "text-[var(--imp-warning)]",
                acwrStatus.color === "danger" &&
                  "text-[var(--imp-danger-neon)]",
              )}
            >
              {acwr.toFixed(2)}
            </p>
          </div>
          <span
            className={cn(
              "rounded px-2 py-1 font-mono text-xs font-bold",
              acwrStatus.color === "lime" &&
                "bg-[var(--imp-lime-400)]/10 text-[var(--imp-lime-400)]",
              acwrStatus.color === "warning" &&
                "bg-[var(--imp-warning)]/10 text-[var(--imp-warning)]",
              acwrStatus.color === "danger" &&
                "bg-[var(--imp-danger-neon)]/10 text-[var(--imp-danger-neon)]",
            )}
          >
            {acwrStatus.label}
          </span>
        </div>

        {/* Projected readiness */}
        <div className="rounded border border-neutral-800 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-xs text-neutral-500">
              PROJECTED_READINESS
            </span>
            <span className="font-mono text-sm font-bold text-[var(--imp-cyan-400)]">
              {projectedReadiness}%
            </span>
          </div>
          <ProgressNeon
            value={projectedReadiness}
            max={100}
            color="cyan"
            size="sm"
          />
        </div>

        {/* Status */}
        <div className="rounded bg-[var(--imp-lime-400)]/5 p-3 text-center">
          <p className="font-mono text-xs text-[var(--imp-lime-400)]">
            LOAD BALANCE: OPTIMAL
          </p>
          <p className="mt-1 font-mono text-[10px] text-neutral-500">
            Current plan aligns with training goals
          </p>
        </div>
      </div>
    </GlassPanel>
  );
}
