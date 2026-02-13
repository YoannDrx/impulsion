"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type DraggableBlockProps = {
  className?: string;
  name: string;
  duration: number;
  load: "light" | "moderate" | "heavy";
  color: "lime" | "cyan";
  onRemove?: () => void;
};

/**
 * DraggableBlock - Bloc de session dans le planning
 */
export function DraggableBlock({
  className,
  name,
  duration,
  load,
  color,
  onRemove,
}: DraggableBlockProps) {
  const loadColors = {
    light: "text-[var(--imp-cyan-400)]",
    moderate: "text-[var(--imp-lime-400)]",
    heavy: "text-[var(--imp-warning)]",
  };

  return (
    <div
      className={cn(
        "group relative rounded border p-2 transition-all",
        color === "lime"
          ? "border-[var(--imp-lime-400)]/30 bg-[var(--imp-lime-400)]/10"
          : "border-[var(--imp-cyan-400)]/30 bg-[var(--imp-cyan-400)]/10",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-1">
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "truncate font-mono text-[10px] font-bold",
              color === "lime"
                ? "text-[var(--imp-lime-400)]"
                : "text-[var(--imp-cyan-400)]",
            )}
          >
            {name}
          </p>
          <p className="font-mono text-[9px] text-neutral-500">
            {duration}min •{" "}
            <span className={loadColors[load]}>{load[0].toUpperCase()}</span>
          </p>
        </div>
        {onRemove && (
          <button
            onClick={onRemove}
            className="opacity-0 transition-opacity group-hover:opacity-100"
          >
            <X className="size-3 text-neutral-500 hover:text-[var(--imp-danger-neon)]" />
          </button>
        )}
      </div>
    </div>
  );
}
