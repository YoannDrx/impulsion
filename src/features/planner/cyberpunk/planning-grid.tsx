"use client";

import { GlassPanel, NeonText } from "@/components/impulsion/cyberpunk";
import { cn } from "@/lib/utils";
import { DraggableBlock } from "./draggable-block";

type ScheduledBlock = {
  id: string;
  day: number;
  name: string;
  duration: number;
  load: "light" | "moderate" | "heavy";
  color: "lime" | "cyan";
};

type PlanningGridProps = {
  className?: string;
  weekStart?: Date;
  blocks?: ScheduledBlock[];
  onBlockRemove?: (id: string) => void;
  onDayDrop?: (day: number) => void;
};

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const defaultBlocks: ScheduledBlock[] = [
  {
    id: "1",
    day: 0,
    name: "STRENGTH",
    duration: 60,
    load: "heavy",
    color: "lime",
  },
  {
    id: "2",
    day: 1,
    name: "CARDIO",
    duration: 45,
    load: "moderate",
    color: "cyan",
  },
  {
    id: "3",
    day: 2,
    name: "RECOVERY",
    duration: 30,
    load: "light",
    color: "cyan",
  },
  {
    id: "4",
    day: 3,
    name: "POWER",
    duration: 45,
    load: "heavy",
    color: "lime",
  },
  {
    id: "5",
    day: 4,
    name: "STRENGTH",
    duration: 60,
    load: "heavy",
    color: "lime",
  },
  {
    id: "6",
    day: 5,
    name: "CARDIO",
    duration: 45,
    load: "moderate",
    color: "cyan",
  },
];

/**
 * PlanningGrid - Grille de planning hebdomadaire
 */
export function PlanningGrid({
  className,
  blocks = defaultBlocks,
  onBlockRemove,
  onDayDrop,
}: PlanningGridProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (day: number) => {
    onDayDrop?.(day);
  };

  return (
    <GlassPanel className={cn("flex-1 p-4", className)} glow="cyan">
      <div className="mb-4 flex items-center justify-between">
        <NeonText
          as="h3"
          color="cyan"
          intensity="subtle"
          className="font-mono text-xs tracking-wider uppercase"
        >
          WEEK_PLANNER
        </NeonText>
        <span className="font-mono text-xs text-neutral-500">
          JAN 15 - JAN 21, 2024
        </span>
      </div>

      {/* Grid header */}
      <div className="mb-2 grid grid-cols-7 gap-2">
        {DAYS.map((day, i) => (
          <div
            key={day}
            className={cn(
              "py-2 text-center font-mono text-xs",
              i === 6 ? "text-neutral-600" : "text-neutral-400",
            )}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Grid cells */}
      <div className="grid min-h-[300px] grid-cols-7 gap-2">
        {DAYS.map((_, dayIndex) => {
          const dayBlocks = blocks.filter((b) => b.day === dayIndex);
          return (
            <div
              key={dayIndex}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(dayIndex)}
              className={cn(
                "flex flex-col gap-1 rounded border border-dashed border-neutral-800 p-2 transition-colors",
                "hover:border-[var(--imp-cyan-400)]/30 hover:bg-[var(--imp-cyan-400)]/5",
              )}
            >
              {dayBlocks.map((block) => (
                <DraggableBlock
                  key={block.id}
                  name={block.name}
                  duration={block.duration}
                  load={block.load}
                  color={block.color}
                  onRemove={() => onBlockRemove?.(block.id)}
                />
              ))}
              {dayBlocks.length === 0 && (
                <div className="flex flex-1 items-center justify-center font-mono text-[10px] text-neutral-700">
                  DROP HERE
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Load summary */}
      <div className="mt-4 grid grid-cols-7 gap-2">
        {DAYS.map((_, dayIndex) => {
          const dayBlocks = blocks.filter((b) => b.day === dayIndex);
          const totalDuration = dayBlocks.reduce(
            (sum, b) => sum + b.duration,
            0,
          );
          return (
            <div
              key={dayIndex}
              className="text-center font-mono text-[10px] text-neutral-500"
            >
              {totalDuration > 0 ? `${totalDuration}min` : "-"}
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
}
