"use client";

import { GlassPanel, NeonText } from "@/components/impulsion/cyberpunk";
import { Sparkline } from "@/components/impulsion/cyberpunk/data/sparkline";
import { cn } from "@/lib/utils";

type TelemetryData = {
  label: string;
  value: number;
  unit: string;
  history?: number[];
  status?: "normal" | "elevated" | "critical";
};

type PhysicsTelemetryProps = {
  className?: string;
  data?: TelemetryData[];
};

const defaultData: TelemetryData[] = [
  {
    label: "Velocity",
    value: 8.42,
    unit: "m/s",
    history: [7.2, 7.8, 8.1, 8.3, 8.4, 8.42],
    status: "normal",
  },
  {
    label: "Acceleration",
    value: 2.14,
    unit: "m/s²",
    history: [1.8, 2.0, 2.1, 2.2, 2.1, 2.14],
    status: "normal",
  },
  {
    label: "Force",
    value: 1847,
    unit: "N",
    history: [1200, 1400, 1600, 1750, 1800, 1847],
    status: "elevated",
  },
  {
    label: "Joint Angle",
    value: 142,
    unit: "°",
    history: [90, 110, 125, 135, 140, 142],
    status: "normal",
  },
  {
    label: "Ground Contact",
    value: 0.18,
    unit: "s",
    history: [0.22, 0.2, 0.19, 0.18, 0.18, 0.18],
    status: "normal",
  },
  {
    label: "Power Output",
    value: 2340,
    unit: "W",
    history: [1800, 2000, 2100, 2250, 2300, 2340],
    status: "elevated",
  },
];

/**
 * PhysicsTelemetry - Panel de données physiques en temps réel
 */
export function PhysicsTelemetry({
  className,
  data = defaultData,
}: PhysicsTelemetryProps) {
  return (
    <GlassPanel className={cn("p-4", className)} glow="cyan">
      <NeonText
        as="h3"
        color="cyan"
        intensity="subtle"
        className="mb-4 font-mono text-xs tracking-wider uppercase"
      >
        PHYSICS_TELEMETRY
      </NeonText>

      <div className="space-y-3">
        {data.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between border-b border-neutral-800 pb-2 last:border-0"
          >
            <div className="flex-1">
              <span className="font-mono text-xs text-neutral-500">
                {item.label.toUpperCase()}
              </span>
              <div className="flex items-baseline gap-1">
                <span
                  className={cn(
                    "font-mono text-lg font-bold",
                    item.status === "normal" && "text-[var(--imp-lime-400)]",
                    item.status === "elevated" && "text-[var(--imp-cyan-400)]",
                    item.status === "critical" &&
                      "text-[var(--imp-danger-neon)]",
                  )}
                >
                  {item.value}
                </span>
                <span className="font-mono text-xs text-neutral-500">
                  {item.unit}
                </span>
              </div>
            </div>

            {item.history && (
              <div className="w-20">
                <Sparkline
                  data={item.history}
                  height={24}
                  color={item.status === "elevated" ? "cyan" : "lime"}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}
