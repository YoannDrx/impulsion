"use client";

import { GlassPanel } from "@/components/impulsion/cyberpunk";
import { cn } from "@/lib/utils";
import { GripVertical, X } from "lucide-react";

type HolographicCardProps = {
  className?: string;
  title: string;
  duration: number;
  load: number;
  color?: "lime" | "cyan";
  onRemove?: () => void;
  draggable?: boolean;
};

/**
 * HolographicCard - Carte d'exercice style holographique
 */
export function HolographicCard({
  className,
  title,
  duration,
  load,
  color = "lime",
  onRemove,
  draggable = true,
}: HolographicCardProps) {
  const colorClasses = {
    lime: {
      border: "border-[var(--imp-lime-400)]/30",
      glow: "shadow-[0_0_20px_rgba(204,255,0,0.1)]",
      text: "text-[var(--imp-lime-400)]",
      bg: "bg-[var(--imp-lime-400)]/5",
    },
    cyan: {
      border: "border-[var(--imp-cyan-400)]/30",
      glow: "shadow-[0_0_20px_rgba(0,243,255,0.1)]",
      text: "text-[var(--imp-cyan-400)]",
      bg: "bg-[var(--imp-cyan-400)]/5",
    },
  };

  const styles = colorClasses[color];

  return (
    <GlassPanel
      className={cn(
        "group relative border p-3 transition-all hover:scale-[1.02]",
        styles.border,
        styles.glow,
        styles.bg,
        className,
      )}
      glow="none"
    >
      {/* Holographic effect lines */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "absolute top-0 -left-full h-px w-[200%] bg-gradient-to-r from-transparent via-current to-transparent opacity-20",
            styles.text,
          )}
          style={{ animation: "imp-marquee 3s linear infinite" }}
        />
        <div
          className={cn(
            "absolute bottom-0 -left-full h-px w-[200%] bg-gradient-to-r from-transparent via-current to-transparent opacity-20",
            styles.text,
          )}
          style={{ animation: "imp-marquee 3s linear infinite reverse" }}
        />
      </div>

      <div className="flex items-start gap-2">
        {/* Drag handle */}
        {draggable && (
          <div className="cursor-grab text-neutral-600 hover:text-neutral-400">
            <GripVertical className="size-4" />
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          <h4 className={cn("font-mono text-sm font-bold", styles.text)}>
            {title}
          </h4>
          <div className="mt-1 flex items-center gap-3 font-mono text-xs text-neutral-500">
            <span>{duration} min</span>
            <span className="text-neutral-700">|</span>
            <span>Load: {load}</span>
          </div>
        </div>

        {/* Remove button */}
        {onRemove && (
          <button
            onClick={onRemove}
            className="opacity-0 transition-opacity group-hover:opacity-100"
          >
            <X className="size-4 text-neutral-500 hover:text-[var(--imp-danger-neon)]" />
          </button>
        )}
      </div>
    </GlassPanel>
  );
}
