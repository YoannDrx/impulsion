"use client";

import { cn } from "@/lib/utils";
import {
  Maximize,
  Minimize,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import type { VideoMarkerData } from "./video.types";

type VideoPlayerProps = {
  src: string;
  markers?: VideoMarkerData[];
  onTimeUpdate?: (time: number) => void;
  onMarkerClick?: (marker: VideoMarkerData) => void;
  onAddMarker?: (timestamp: number) => void;
  className?: string;
};

export function VideoPlayer({
  src,
  markers = [],
  onTimeUpdate,
  onMarkerClick,
  onAddMarker,
  className,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Play/Pause toggle
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  // Mute toggle
  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      void container.requestFullscreen();
      setIsFullscreen(true);
    } else {
      void document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Seek to position
  const seekTo = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const progress = progressRef.current;
    if (!video || !progress) return;

    const rect = progress.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  }, []);

  // Add marker at current time
  const handleAddMarker = useCallback(() => {
    const video = videoRef.current;
    if (!video || !onAddMarker) return;
    onAddMarker(video.currentTime);
  }, [onAddMarker]);

  // Change playback rate
  const cyclePlaybackRate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    const newRate = rates[nextIndex];

    video.playbackRate = newRate;
    setPlaybackRate(newRate);
  }, [playbackRate]);

  // Handle time update
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      onTimeUpdate?.(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
    };
  }, [onTimeUpdate]);

  // Auto-hide controls
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }

      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      switch (e.key) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlay();
          break;
        case "m":
          toggleMute();
          break;
        case "f":
          toggleFullscreen();
          break;
        case "ArrowLeft":
          if (videoRef.current) {
            videoRef.current.currentTime -= 5;
          }
          break;
        case "ArrowRight":
          if (videoRef.current) {
            videoRef.current.currentTime += 5;
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [togglePlay, toggleMute, toggleFullscreen]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative overflow-hidden rounded-lg bg-black",
        className,
      )}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        className="size-full cursor-pointer"
        onClick={togglePlay}
        playsInline
      />

      {/* Controls Overlay */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity",
          showControls ? "opacity-100" : "opacity-0",
        )}
      >
        {/* Progress Bar */}
        <div className="px-4 pb-2">
          <div
            ref={progressRef}
            className="group/progress relative h-1 cursor-pointer rounded-full bg-white/30 transition-all hover:h-2"
            onClick={seekTo}
          >
            {/* Progress Fill */}
            <div
              className="bg-primary absolute top-0 left-0 h-full rounded-full"
              style={{ width: `${progress}%` }}
            />

            {/* Markers */}
            {markers.map((marker) => {
              const markerPos =
                duration > 0 ? (marker.timestamp / duration) * 100 : 0;
              return (
                <button
                  key={marker.id}
                  type="button"
                  className="bg-secondary hover:bg-secondary/80 absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform hover:scale-150"
                  style={{ left: `${markerPos}%` }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (videoRef.current) {
                      videoRef.current.currentTime = marker.timestamp;
                    }
                    onMarkerClick?.(marker);
                  }}
                  title={marker.content}
                />
              );
            })}

            {/* Scrubber */}
            <div
              className="bg-primary absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity group-hover/progress:opacity-100"
              style={{ left: `${progress}%` }}
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between px-4 pb-4">
          <div className="flex items-center gap-3">
            {/* Play/Pause */}
            <button
              type="button"
              onClick={togglePlay}
              className="text-white transition-transform hover:scale-110"
            >
              {isPlaying ? (
                <Pause className="size-6" />
              ) : (
                <Play className="size-6" />
              )}
            </button>

            {/* Volume */}
            <button
              type="button"
              onClick={toggleMute}
              className="text-white transition-transform hover:scale-110"
            >
              {isMuted ? (
                <VolumeX className="size-5" />
              ) : (
                <Volume2 className="size-5" />
              )}
            </button>

            {/* Time Display */}
            <span className="text-sm text-white">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Add Marker Button */}
            {onAddMarker && (
              <button
                type="button"
                onClick={handleAddMarker}
                className="rounded bg-white/20 px-2 py-1 text-xs text-white transition-colors hover:bg-white/30"
              >
                + Marqueur
              </button>
            )}

            {/* Playback Rate */}
            <button
              type="button"
              onClick={cyclePlaybackRate}
              className="min-w-[3rem] rounded bg-white/20 px-2 py-1 text-xs text-white transition-colors hover:bg-white/30"
            >
              {playbackRate}x
            </button>

            {/* Fullscreen */}
            <button
              type="button"
              onClick={toggleFullscreen}
              className="text-white transition-transform hover:scale-110"
            >
              {isFullscreen ? (
                <Minimize className="size-5" />
              ) : (
                <Maximize className="size-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Play Button Overlay (when paused) */}
      {!isPlaying && (
        <button
          type="button"
          onClick={togglePlay}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 p-4 backdrop-blur-sm transition-transform hover:scale-110"
        >
          <Play className="size-12 text-white" />
        </button>
      )}
    </div>
  );
}
