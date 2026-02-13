"use client";

import { GlassPanel, NeonText } from "@/components/impulsion/cyberpunk";
import { ProgressNeon } from "@/components/impulsion/cyberpunk/data/progress-neon";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type DayLoad = {
  day: string;
  load: number;
  max: number;
};

type TrainingLoadChartProps = {
  className?: string;
  weeklyData?: DayLoad[];
  acwr?: number;
  ctl?: number;
  atl?: number;
};

const defaultWeeklyData: DayLoad[] = [
  { day: "Mon", load: 650, max: 1000 },
  { day: "Tue", load: 820, max: 1000 },
  { day: "Wed", load: 450, max: 1000 },
  { day: "Thu", load: 780, max: 1000 },
  { day: "Fri", load: 920, max: 1000 },
  { day: "Sat", load: 350, max: 1000 },
  { day: "Sun", load: 0, max: 1000 },
];

/**
 * TrainingLoadChart - Graphique de charge d'entraînement
 */
export function TrainingLoadChart({
  className,
  weeklyData = defaultWeeklyData,
  acwr = 1.12,
  ctl = 720,
  atl = 805,
}: TrainingLoadChartProps) {
  const t = useTranslations("bioProfile");

  const getAcwrColor = () => {
    if (acwr >= 0.8 && acwr <= 1.3) return "lime";
    if (acwr > 1.3 && acwr <= 1.5) return "warning";
    return "danger";
  };

  return (
    <GlassPanel className={cn("p-6", className)} glow="none">
      <div className="mb-6 flex items-center justify-between">
        <NeonText
          as="h3"
          color="lime"
          intensity="subtle"
          className="font-mono text-sm tracking-wider uppercase"
        >
          {t("trainingLoad.title")}
        </NeonText>

        {/* ACWR indicator */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500">ACWR</span>
          <span
            className={cn(
              "font-mono text-lg font-bold",
              getAcwrColor() === "lime" && "text-[var(--imp-lime-400)]",
              getAcwrColor() === "warning" && "text-[var(--imp-warning)]",
              getAcwrColor() === "danger" && "text-[var(--imp-danger-neon)]",
            )}
          >
            {acwr.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Weekly bars */}
      <div className="mb-6 flex items-end justify-between gap-2">
        {weeklyData.map((day) => (
          <div
            key={day.day}
            className="flex flex-1 flex-col items-center gap-2"
          >
            <div
              className="relative w-full overflow-hidden rounded-t bg-neutral-800"
              style={{ height: 120 }}
            >
              <div
                className="absolute bottom-0 w-full rounded-t bg-[var(--imp-lime-400)] transition-all duration-500"
                style={{
                  height: `${(day.load / day.max) * 100}%`,
                  boxShadow: "0 0 10px var(--imp-lime-400)",
                }}
              />
            </div>
            <span className="font-mono text-xs text-neutral-500">
              {day.day}
            </span>
          </div>
        ))}
      </div>

      {/* CTL / ATL metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded border border-[var(--imp-glass-10)] p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-neutral-500">CTL (Fitness)</span>
            <span className="font-mono text-sm font-bold text-[var(--imp-cyan-400)]">
              {ctl}
            </span>
          </div>
          <ProgressNeon value={ctl} max={1000} color="cyan" size="sm" />
        </div>

        <div className="rounded border border-[var(--imp-glass-10)] p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-neutral-500">ATL (Fatigue)</span>
            <span className="font-mono text-sm font-bold text-[var(--imp-lime-400)]">
              {atl}
            </span>
          </div>
          <ProgressNeon value={atl} max={1000} color="lime" size="sm" />
        </div>
      </div>
    </GlassPanel>
  );
}
