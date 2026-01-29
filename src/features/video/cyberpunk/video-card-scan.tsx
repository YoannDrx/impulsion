"use client";

import { GlassPanel } from "@/components/impulsion/cyberpunk";
import { cn } from "@/lib/utils";
import { Clock, Eye, Play } from "lucide-react";

type VideoCardScanProps = {
  className?: string;
  title: string;
  thumbnail?: string;
  duration: string;
  views?: number;
  category: string;
  date: string;
  onClick?: () => void;
};

/**
 * VideoCardScan - Carte vidéo avec effet scan au hover
 */
export function VideoCardScan({
  className,
  title,
  duration,
  views = 0,
  category,
  date,
  onClick,
}: VideoCardScanProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative block w-full overflow-hidden rounded text-left transition-all hover:scale-[1.02]",
        className,
      )}
    >
      <GlassPanel className="p-0" glow="none">
        {/* Thumbnail */}
        <div className="relative aspect-video w-full bg-neutral-900">
          {/* Placeholder pattern */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid size-full grid-cols-4 gap-px opacity-10">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="bg-neutral-700" />
              ))}
            </div>
          </div>

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex size-12 items-center justify-center rounded-full bg-[var(--imp-lime-400)]/90">
              <Play className="size-5 text-black" />
            </div>
          </div>

          {/* Scan effect */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--imp-cyan-400)]/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
            style={{
              animation: "imp-scan-vertical 1.5s ease-in-out infinite",
            }}
          />

          {/* Duration badge */}
          <div className="absolute right-2 bottom-2 rounded bg-black/80 px-2 py-0.5">
            <span className="font-mono text-xs text-white">{duration}</span>
          </div>

          {/* HUD corners */}
          <div className="pointer-events-none absolute inset-1 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="absolute top-0 left-0 size-4 border-t border-l border-[var(--imp-cyan-400)]" />
            <div className="absolute top-0 right-0 size-4 border-t border-r border-[var(--imp-cyan-400)]" />
            <div className="absolute bottom-0 left-0 size-4 border-b border-l border-[var(--imp-cyan-400)]" />
            <div className="absolute right-0 bottom-0 size-4 border-r border-b border-[var(--imp-cyan-400)]" />
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="mb-1 truncate font-mono text-sm font-bold text-white group-hover:text-[var(--imp-cyan-400)]">
            {title}
          </p>
          <div className="flex items-center justify-between font-mono text-[10px] text-neutral-500">
            <span className="rounded bg-neutral-800 px-1.5 py-0.5 text-[var(--imp-lime-400)]">
              {category}
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Eye className="size-3" />
                {views}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                {date}
              </span>
            </div>
          </div>
        </div>
      </GlassPanel>
    </button>
  );
}
