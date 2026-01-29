"use client";

import { CyberButton } from "@/components/impulsion/cyberpunk/form/cyber-button";
import { GlassPanel } from "@/components/impulsion/cyberpunk";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  SkipBack,
  SkipForward,
} from "lucide-react";

type PlaybackControlsProps = {
  className?: string;
  isPlaying?: boolean;
  playbackSpeed?: number;
  onPlayPause?: () => void;
  onStepBack?: () => void;
  onStepForward?: () => void;
  onSkipBack?: () => void;
  onSkipForward?: () => void;
  onSpeedChange?: (speed: number) => void;
};

const SPEED_OPTIONS = [0.25, 0.5, 1, 1.5, 2];

/**
 * PlaybackControls - Contrôles de lecture vidéo style HUD
 */
export function PlaybackControls({
  className,
  isPlaying = false,
  playbackSpeed = 1,
  onPlayPause,
  onStepBack,
  onStepForward,
  onSkipBack,
  onSkipForward,
  onSpeedChange,
}: PlaybackControlsProps) {
  return (
    <GlassPanel className={cn("p-4", className)} glow="none">
      <div className="flex items-center justify-between">
        {/* Left - Speed controls */}
        <div className="flex items-center gap-1">
          <span className="mr-2 font-mono text-xs text-neutral-500">SPEED</span>
          {SPEED_OPTIONS.map((speed) => (
            <button
              key={speed}
              onClick={() => onSpeedChange?.(speed)}
              className={cn(
                "rounded px-2 py-1 font-mono text-xs transition-colors",
                playbackSpeed === speed
                  ? "bg-[var(--imp-cyan-400)] text-black"
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-white",
              )}
            >
              {speed}x
            </button>
          ))}
        </div>

        {/* Center - Playback controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSkipBack}
            className="rounded p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
          >
            <SkipBack className="size-4" />
          </button>
          <button
            onClick={onStepBack}
            className="rounded p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
          >
            <ChevronLeft className="size-4" />
          </button>

          <CyberButton
            variant="lime"
            size="sm"
            onClick={onPlayPause}
            className="mx-2"
          >
            {isPlaying ? (
              <Pause className="size-5" />
            ) : (
              <Play className="size-5" />
            )}
          </CyberButton>

          <button
            onClick={onStepForward}
            className="rounded p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
          >
            <ChevronRight className="size-4" />
          </button>
          <button
            onClick={onSkipForward}
            className="rounded p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
          >
            <SkipForward className="size-4" />
          </button>
        </div>

        {/* Right - Frame info */}
        <div className="flex items-center gap-4 font-mono text-xs">
          <div className="text-neutral-500">
            <span className="text-neutral-400">FPS:</span> 60
          </div>
          <div className="text-neutral-500">
            <span className="text-neutral-400">FRAME:</span>{" "}
            <span className="text-[var(--imp-lime-400)]">2047</span>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}
