"use client";

import { GlassPanel, NeonText } from "@/components/impulsion/cyberpunk";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { HolographicCard } from "./holographic-card";

type SessionBlock = {
  id: string;
  name: string;
  duration: number;
  load: number;
  color: "lime" | "cyan";
};

type TimelineBuilderProps = {
  className?: string;
  blocks?: SessionBlock[];
  onBlockRemove?: (id: string) => void;
  onAddBlock?: () => void;
};

const defaultBlocks: SessionBlock[] = [
  { id: "1", name: "Warm-up Mobility", duration: 10, load: 20, color: "cyan" },
  { id: "2", name: "Sprint Drills", duration: 15, load: 75, color: "lime" },
  {
    id: "3",
    name: "Plyometric Circuit",
    duration: 20,
    load: 85,
    color: "lime",
  },
  { id: "4", name: "Cool-down Stretch", duration: 10, load: 15, color: "cyan" },
];

/**
 * TimelineBuilder - Constructeur de session avec blocs ordonnés
 */
export function TimelineBuilder({
  className,
  blocks = defaultBlocks,
  onBlockRemove,
  onAddBlock,
}: TimelineBuilderProps) {
  const totalDuration = blocks.reduce((sum, b) => sum + b.duration, 0);
  const totalLoad = blocks.reduce((sum, b) => sum + b.load, 0);
  const avgLoad = blocks.length > 0 ? Math.round(totalLoad / blocks.length) : 0;

  return (
    <GlassPanel className={cn("flex flex-col p-4", className)} glow="cyan">
      <div className="mb-4 flex items-center justify-between">
        <NeonText
          as="h3"
          color="cyan"
          intensity="subtle"
          className="font-mono text-xs tracking-wider uppercase"
        >
          SESSION_TIMELINE
        </NeonText>
        <div className="flex items-center gap-4 font-mono text-xs">
          <span className="text-neutral-500">
            DURATION:{" "}
            <span className="text-[var(--imp-cyan-400)]">
              {totalDuration}min
            </span>
          </span>
          <span className="text-neutral-500">
            AVG_LOAD:{" "}
            <span className="text-[var(--imp-lime-400)]">{avgLoad}</span>
          </span>
        </div>
      </div>

      {/* Timeline visualization */}
      <div className="mb-4 h-2 overflow-hidden rounded-full bg-neutral-800">
        <div className="flex h-full">
          {blocks.map((block, i) => (
            <div
              key={block.id}
              className={cn(
                "h-full transition-all",
                block.color === "lime"
                  ? "bg-[var(--imp-lime-400)]"
                  : "bg-[var(--imp-cyan-400)]",
                i > 0 && "border-l border-neutral-900",
              )}
              style={{ width: `${(block.duration / totalDuration) * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* Blocks */}
      <div className="flex-1 space-y-2 overflow-y-auto">
        {blocks.map((block, index) => (
          <div key={block.id} className="flex items-center gap-2">
            <span className="w-6 font-mono text-xs text-neutral-600">
              {String(index + 1).padStart(2, "0")}
            </span>
            <HolographicCard
              className="flex-1"
              title={block.name}
              duration={block.duration}
              load={block.load}
              color={block.color}
              onRemove={() => onBlockRemove?.(block.id)}
            />
          </div>
        ))}
      </div>

      {/* Add block button */}
      <button
        onClick={onAddBlock}
        className="mt-4 flex items-center justify-center gap-2 rounded border border-dashed border-neutral-700 p-3 font-mono text-xs text-neutral-500 transition-colors hover:border-[var(--imp-lime-400)]/50 hover:text-[var(--imp-lime-400)]"
      >
        <Plus className="size-4" />
        ADD_BLOCK
      </button>
    </GlassPanel>
  );
}
