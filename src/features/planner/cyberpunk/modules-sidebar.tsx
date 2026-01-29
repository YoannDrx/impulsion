"use client";

import { GlassPanel, NeonText } from "@/components/impulsion/cyberpunk";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { Dumbbell, Heart, Moon, Zap } from "lucide-react";

type TrainingModule = {
  id: string;
  name: string;
  icon: LucideIcon;
  duration: number;
  load: "light" | "moderate" | "heavy";
  color: "lime" | "cyan";
};

const defaultModules: TrainingModule[] = [
  {
    id: "strength",
    name: "STRENGTH",
    icon: Dumbbell,
    duration: 60,
    load: "heavy",
    color: "lime",
  },
  {
    id: "cardio",
    name: "CARDIO",
    icon: Heart,
    duration: 45,
    load: "moderate",
    color: "cyan",
  },
  {
    id: "power",
    name: "POWER",
    icon: Zap,
    duration: 45,
    load: "heavy",
    color: "lime",
  },
  {
    id: "recovery",
    name: "RECOVERY",
    icon: Moon,
    duration: 30,
    load: "light",
    color: "cyan",
  },
];

type ModulesSidebarProps = {
  className?: string;
  modules?: TrainingModule[];
  onModuleDrag?: (module: TrainingModule) => void;
};

/**
 * ModulesSidebar - Panneau des modules de training à glisser
 */
export function ModulesSidebar({
  className,
  modules = defaultModules,
  onModuleDrag,
}: ModulesSidebarProps) {
  const loadColors = {
    light: "text-[var(--imp-cyan-400)]",
    moderate: "text-[var(--imp-lime-400)]",
    heavy: "text-[var(--imp-warning)]",
  };

  return (
    <GlassPanel
      className={cn("flex h-full flex-col p-4", className)}
      glow="none"
    >
      <NeonText
        as="h3"
        color="lime"
        intensity="subtle"
        className="mb-4 font-mono text-xs tracking-wider uppercase"
      >
        TRAINING_MODULES
      </NeonText>

      <p className="mb-4 font-mono text-[10px] text-neutral-500">
        DRAG MODULES TO CALENDAR →
      </p>

      <div className="flex-1 space-y-2">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <div
              key={module.id}
              draggable
              onDragStart={() => onModuleDrag?.(module)}
              className={cn(
                "group cursor-grab rounded border border-neutral-800 p-3 transition-all hover:scale-[1.02] active:cursor-grabbing",
                module.color === "lime" &&
                  "hover:border-[var(--imp-lime-400)]/50 hover:bg-[var(--imp-lime-400)]/5",
                module.color === "cyan" &&
                  "hover:border-[var(--imp-cyan-400)]/50 hover:bg-[var(--imp-cyan-400)]/5",
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex size-8 items-center justify-center rounded",
                    module.color === "lime"
                      ? "bg-[var(--imp-lime-400)]/10 text-[var(--imp-lime-400)]"
                      : "bg-[var(--imp-cyan-400)]/10 text-[var(--imp-cyan-400)]",
                  )}
                >
                  <Icon className="size-4" />
                </div>
                <div className="flex-1">
                  <p className="font-mono text-xs font-bold text-white">
                    {module.name}
                  </p>
                  <p className="font-mono text-[10px] text-neutral-500">
                    {module.duration}min •{" "}
                    <span className={loadColors[module.load]}>
                      {module.load.toUpperCase()}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
}
