"use client";

import { GlassPanel } from "@/components/impulsion/cyberpunk";
import { cn } from "@/lib/utils";
import { Maximize2, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

type VideoStageProps = {
  className?: string;
  videoUrl?: string;
  showGrid?: boolean;
  showVectors?: boolean;
};

/**
 * VideoStage - Player vidéo avec overlay d'analyse
 */
export function VideoStage({
  className,
  videoUrl = "/placeholder-video.mp4",
  showGrid = true,
  showVectors = false,
}: VideoStageProps) {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <GlassPanel
      className={cn("relative overflow-hidden", className)}
      glow="cyan"
    >
      {/* Video container */}
      <div className="relative aspect-video w-full bg-black">
        {/* Placeholder for video */}
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
          <span className="font-mono text-sm text-neutral-600">
            VIDEO_FEED: {videoUrl}
          </span>
        </div>

        {/* Grid overlay */}
        {showGrid && (
          <svg
            className="pointer-events-none absolute inset-0 size-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Horizontal lines */}
            {[25, 50, 75].map((y) => (
              <line
                key={`h-${y}`}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke="var(--imp-cyan-400)"
                strokeWidth="0.1"
                strokeOpacity="0.3"
              />
            ))}
            {/* Vertical lines */}
            {[25, 50, 75].map((x) => (
              <line
                key={`v-${x}`}
                x1={x}
                y1="0"
                x2={x}
                y2="100"
                stroke="var(--imp-cyan-400)"
                strokeWidth="0.1"
                strokeOpacity="0.3"
              />
            ))}
            {/* Center crosshair */}
            <circle
              cx="50"
              cy="50"
              r="1"
              fill="none"
              stroke="var(--imp-lime-400)"
              strokeWidth="0.2"
              strokeOpacity="0.5"
            />
          </svg>
        )}

        {/* Vector overlay */}
        {showVectors && (
          <svg
            className="pointer-events-none absolute inset-0 size-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Example motion vectors */}
            <line
              x1="30"
              y1="60"
              x2="45"
              y2="40"
              stroke="var(--imp-lime-400)"
              strokeWidth="0.3"
              markerEnd="url(#arrowhead)"
            />
            <line
              x1="50"
              y1="70"
              x2="55"
              y2="45"
              stroke="var(--imp-lime-400)"
              strokeWidth="0.3"
              markerEnd="url(#arrowhead)"
            />
            <defs>
              <marker
                id="arrowhead"
                markerWidth="4"
                markerHeight="3"
                refX="4"
                refY="1.5"
                orient="auto"
              >
                <polygon points="0 0, 4 1.5, 0 3" fill="var(--imp-lime-400)" />
              </marker>
            </defs>
          </svg>
        )}

        {/* HUD corners */}
        <div className="pointer-events-none absolute inset-2">
          <div className="absolute top-0 left-0 size-6 border-t-2 border-l-2 border-[var(--imp-cyan-400)]/50" />
          <div className="absolute top-0 right-0 size-6 border-t-2 border-r-2 border-[var(--imp-cyan-400)]/50" />
          <div className="absolute bottom-0 left-0 size-6 border-b-2 border-l-2 border-[var(--imp-cyan-400)]/50" />
          <div className="absolute right-0 bottom-0 size-6 border-r-2 border-b-2 border-[var(--imp-cyan-400)]/50" />
        </div>

        {/* Top info bar */}
        <div className="absolute top-2 right-2 left-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded bg-[var(--imp-danger-neon)] px-2 py-0.5 font-mono text-xs font-bold text-white">
              REC
            </span>
            <span className="font-mono text-xs text-neutral-400">
              00:12:34:15
            </span>
          </div>
          <div className="font-mono text-xs text-neutral-400">
            1920x1080 @ 60fps
          </div>
        </div>

        {/* Bottom controls */}
        <div className="absolute right-2 bottom-2 left-2 flex items-center justify-between">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="rounded p-1 transition-colors hover:bg-white/10"
          >
            {isMuted ? (
              <VolumeX className="size-4 text-neutral-400" />
            ) : (
              <Volume2 className="size-4 text-[var(--imp-cyan-400)]" />
            )}
          </button>
          <button className="rounded p-1 transition-colors hover:bg-white/10">
            <Maximize2 className="size-4 text-neutral-400" />
          </button>
        </div>
      </div>
    </GlassPanel>
  );
}
