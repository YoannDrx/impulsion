"use client";

import { GlassPanel } from "@/components/impulsion/cyberpunk";
import { cn } from "@/lib/utils";

type TimelineWaveformProps = {
  className?: string;
  duration?: number;
  currentTime?: number;
  markers?: { time: number; label: string; color?: string }[];
  onSeek?: (time: number) => void;
};

/**
 * TimelineWaveform - Timeline avec forme d'onde audio
 */
export function TimelineWaveform({
  className,
  duration = 120,
  currentTime = 34,
  markers = [
    { time: 12, label: "Takeoff", color: "lime" },
    { time: 34, label: "Peak Height", color: "cyan" },
    { time: 56, label: "Landing", color: "lime" },
  ],
  onSeek,
}: TimelineWaveformProps) {
  // Static waveform data (simulating audio visualization)
  const waveformBars = [
    0.4, 0.6, 0.3, 0.8, 0.5, 0.7, 0.4, 0.9, 0.6, 0.5, 0.3, 0.7, 0.8, 0.4, 0.6,
    0.9, 0.5, 0.7, 0.3, 0.8, 0.6, 0.4, 0.7, 0.5, 0.9, 0.3, 0.8, 0.6, 0.4, 0.7,
    0.5, 0.8, 0.3, 0.6, 0.9, 0.4, 0.7, 0.5, 0.8, 0.3, 0.6, 0.9, 0.4, 0.7, 0.5,
    0.3, 0.8, 0.6, 0.9, 0.4, 0.7, 0.5, 0.8, 0.3, 0.6, 0.4, 0.9, 0.7, 0.5, 0.8,
    0.3, 0.6, 0.4, 0.9, 0.7, 0.5, 0.8, 0.3, 0.6, 0.4, 0.9, 0.7, 0.5, 0.8, 0.6,
    0.3, 0.4, 0.9, 0.7, 0.5, 0.8, 0.6, 0.3, 0.4, 0.9, 0.7, 0.5, 0.6, 0.8, 0.3,
    0.4, 0.9, 0.7, 0.5, 0.6, 0.8, 0.3, 0.4, 0.7, 0.5,
  ];

  const progressPercent = (currentTime / duration) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onSeek) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    onSeek(percent * duration);
  };

  return (
    <GlassPanel className={cn("p-4", className)} glow="none">
      {/* Time indicators */}
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-sm font-bold text-[var(--imp-cyan-400)]">
          {formatTime(currentTime)}
        </span>
        <span className="font-mono text-sm text-neutral-500">
          {formatTime(duration)}
        </span>
      </div>

      {/* Waveform visualization */}
      <div
        className="relative h-16 cursor-pointer rounded bg-neutral-900"
        onClick={handleClick}
      >
        {/* Waveform bars */}
        <div className="absolute inset-0 flex items-center justify-between gap-px px-1">
          {waveformBars.map((height, i) => {
            const barProgress = (i / waveformBars.length) * 100;
            const isPast = barProgress <= progressPercent;
            return (
              <div
                key={i}
                className={cn(
                  "flex-1 rounded-sm transition-colors",
                  isPast ? "bg-[var(--imp-cyan-400)]" : "bg-neutral-700",
                )}
                style={{ height: `${height * 100}%` }}
              />
            );
          })}
        </div>

        {/* Markers */}
        {markers.map((marker, i) => {
          const markerPercent = (marker.time / duration) * 100;
          return (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-0.5"
              style={{ left: `${markerPercent}%` }}
            >
              <div
                className={cn(
                  "absolute inset-y-0 w-full",
                  marker.color === "lime"
                    ? "bg-[var(--imp-lime-400)]"
                    : "bg-[var(--imp-cyan-400)]",
                )}
              />
              <div
                className={cn(
                  "absolute -top-5 left-1/2 -translate-x-1/2 rounded px-1 py-0.5 font-mono text-[10px] whitespace-nowrap",
                  marker.color === "lime"
                    ? "bg-[var(--imp-lime-400)]/20 text-[var(--imp-lime-400)]"
                    : "bg-[var(--imp-cyan-400)]/20 text-[var(--imp-cyan-400)]",
                )}
              >
                {marker.label}
              </div>
            </div>
          );
        })}

        {/* Playhead */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white"
          style={{ left: `${progressPercent}%` }}
        >
          <div className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-white" />
        </div>
      </div>

      {/* Frame counter */}
      <div className="mt-2 flex items-center justify-between font-mono text-xs text-neutral-500">
        <span>FRAME: {Math.floor(currentTime * 60)}</span>
        <span>TOTAL: {Math.floor(duration * 60)}</span>
      </div>
    </GlassPanel>
  );
}
