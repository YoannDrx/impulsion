"use client";

import { cn } from "@/lib/utils";
import { VideoCardScan } from "./video-card-scan";

type Video = {
  id: string;
  title: string;
  duration: string;
  views: number;
  category: string;
  date: string;
};

type VideoGridCyberpunkProps = {
  className?: string;
  videos?: Video[];
  onVideoSelect?: (video: Video) => void;
};

const defaultVideos: Video[] = [
  {
    id: "1",
    title: "Sprint Analysis - 100m Heat",
    duration: "02:34",
    views: 24,
    category: "SPRINT",
    date: "2d ago",
  },
  {
    id: "2",
    title: "Long Jump Technique Review",
    duration: "05:12",
    views: 18,
    category: "JUMPS",
    date: "3d ago",
  },
  {
    id: "3",
    title: "Start Block Positioning",
    duration: "03:45",
    views: 31,
    category: "TECHNIQUE",
    date: "1w ago",
  },
  {
    id: "4",
    title: "Shot Put Release Angle",
    duration: "04:20",
    views: 12,
    category: "THROWS",
    date: "1w ago",
  },
  {
    id: "5",
    title: "200m Curve Running Form",
    duration: "03:58",
    views: 22,
    category: "SPRINT",
    date: "2w ago",
  },
  {
    id: "6",
    title: "High Jump Approach Analysis",
    duration: "06:15",
    views: 15,
    category: "JUMPS",
    date: "2w ago",
  },
  {
    id: "7",
    title: "Regional Championship Finals",
    duration: "08:30",
    views: 45,
    category: "COMPETITION",
    date: "3w ago",
  },
  {
    id: "8",
    title: "Hurdle Technique Drill",
    duration: "04:55",
    views: 28,
    category: "TECHNIQUE",
    date: "1m ago",
  },
];

/**
 * VideoGridCyberpunk - Grille de vidéos style cyberpunk
 */
export function VideoGridCyberpunk({
  className,
  videos = defaultVideos,
  onVideoSelect,
}: VideoGridCyberpunkProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {videos.map((video) => (
        <VideoCardScan
          key={video.id}
          title={video.title}
          duration={video.duration}
          views={video.views}
          category={video.category}
          date={video.date}
          onClick={() => onVideoSelect?.(video)}
        />
      ))}
    </div>
  );
}
