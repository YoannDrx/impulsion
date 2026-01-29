"use client";

import { GlassPanel, NeonText } from "@/components/impulsion/cyberpunk";
import { RadialGauge } from "@/components/impulsion/cyberpunk/data/radial-gauge";
import { cn } from "@/lib/utils";

type NeuralLoadCounterProps = {
  className?: string;
  currentLoad: number;
  maxLoad?: number;
  targetLoad?: number;
};

/**
 * NeuralLoadCounter - Indicateur de charge neurale de session
 */
export function NeuralLoadCounter({
  className,
  currentLoad,
  maxLoad = 100,
  targetLoad = 75,
}: NeuralLoadCounterProps) {
  const loadPercent = (currentLoad / maxLoad) * 100;
  const targetPercent = (targetLoad / maxLoad) * 100;

  const getLoadStatus = () => {
    if (loadPercent > 90)
      return { label: "OVERLOAD", color: "danger" as const };
    if (loadPercent > 75) return { label: "HIGH", color: "warning" as const };
    if (loadPercent > 50) return { label: "OPTIMAL", color: "lime" as const };
    return { label: "LOW", color: "cyan" as const };
  };

  const status = getLoadStatus();

  return (
    <GlassPanel className={cn("p-4", className)} glow="lime">
      <NeonText
        as="h3"
        color="lime"
        intensity="subtle"
        className="mb-4 text-center font-mono text-xs tracking-wider uppercase"
      >
        NEURAL_LOAD_INDEX
      </NeonText>

      <div className="flex justify-center">
        <RadialGauge
          value={loadPercent}
          max={100}
          size="lg"
          color="auto"
          animated
        />
      </div>

      <div className="mt-4 space-y-2">
        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-neutral-500">STATUS</span>
          <span
            className={cn(
              "rounded px-2 py-0.5 font-mono text-xs font-bold",
              status.color === "lime" &&
                "bg-[var(--imp-lime-400)]/10 text-[var(--imp-lime-400)]",
              status.color === "cyan" &&
                "bg-[var(--imp-cyan-400)]/10 text-[var(--imp-cyan-400)]",
              status.color === "warning" &&
                "bg-[var(--imp-warning)]/10 text-[var(--imp-warning)]",
              status.color === "danger" &&
                "bg-[var(--imp-danger-neon)]/10 text-[var(--imp-danger-neon)]",
            )}
          >
            {status.label}
          </span>
        </div>

        {/* Current vs Target */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-neutral-500">CURRENT</span>
          <span className="font-mono text-sm font-bold text-white">
            {currentLoad}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-neutral-500">TARGET</span>
          <span className="font-mono text-sm text-[var(--imp-cyan-400)]">
            {targetLoad}
          </span>
        </div>

        {/* Progress bar with target marker */}
        <div className="relative h-2 overflow-hidden rounded-full bg-neutral-800">
          <div
            className={cn(
              "h-full transition-all duration-500",
              status.color === "lime" && "bg-[var(--imp-lime-400)]",
              status.color === "cyan" && "bg-[var(--imp-cyan-400)]",
              status.color === "warning" && "bg-[var(--imp-warning)]",
              status.color === "danger" && "bg-[var(--imp-danger-neon)]",
            )}
            style={{ width: `${loadPercent}%` }}
          />
          {/* Target marker */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white"
            style={{ left: `${targetPercent}%` }}
          />
        </div>
      </div>
    </GlassPanel>
  );
}
