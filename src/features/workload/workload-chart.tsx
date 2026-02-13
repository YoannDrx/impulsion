"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { WeeklyLoad } from "./workload.types";

type WorkloadChartProps = {
  weeklyLoads: WeeklyLoad[];
  className?: string;
};

export function WorkloadChart({ weeklyLoads, className }: WorkloadChartProps) {
  // Get max load for scaling
  const maxLoad = Math.max(...weeklyLoads.map((w) => w.totalLoad), 1);

  // Take last 5 weeks
  const displayWeeks = weeklyLoads.slice(-5);

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-end justify-between gap-2">
        {displayWeeks.map((week, index) => {
          const heightPercent = (week.totalLoad / maxLoad) * 100;
          const isCurrentWeek = index === displayWeeks.length - 1;

          return (
            <div
              key={week.weekStart.toISOString()}
              className="flex flex-1 flex-col items-center gap-1"
            >
              {/* Bar */}
              <div className="relative flex h-24 w-full items-end justify-center">
                <motion.div
                  className={cn(
                    "w-full max-w-[40px] rounded-t-md",
                    isCurrentWeek
                      ? "bg-primary"
                      : "bg-primary/40 hover:bg-primary/60",
                  )}
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(heightPercent, 5)}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
                {/* Load value */}
                <span className="absolute -top-5 text-xs font-medium">
                  {Math.round(week.totalLoad)}
                </span>
              </div>

              {/* Week label */}
              <span className="text-muted-foreground text-xs">
                {format(week.weekStart, "dd/MM", { locale: fr })}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="text-muted-foreground flex justify-between text-xs">
        <span>Charge hebdomadaire (RPE × minutes)</span>
        <span>{displayWeeks.length} semaines</span>
      </div>
    </div>
  );
}
