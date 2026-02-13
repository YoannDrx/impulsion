"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GlowCard } from "@/components/impulsion/glow-card";
import { VIDEO_STATUSES, type VideoStatus } from "@/lib/impulsion/types";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "motion/react";
import { Clock, MessageSquare, Play, Video } from "lucide-react";
import Link from "next/link";
import type { VideoListItem } from "./video.types";

type VideoCardProps = VideoListItem & {
  orgSlug: string;
};

const statusConfig: Record<VideoStatus, { label: string; color: string }> = {
  UPLOADING: { label: "Upload...", color: "bg-yellow-500/20 text-yellow-500" },
  PROCESSING: {
    label: "Traitement...",
    color: "bg-blue-500/20 text-blue-500",
  },
  READY: { label: "Prête", color: "bg-green-500/20 text-green-500" },
  ERROR: { label: "Erreur", color: "bg-red-500/20 text-red-500" },
};

export function VideoCard({
  id,
  title,
  thumbnailUrl,
  duration,
  status,
  createdAt,
  uploadedBy,
  session,
  markerCount,
  orgSlug,
}: VideoCardProps) {
  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const isReady = status === VIDEO_STATUSES.READY;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/orgs/${orgSlug}/videos/${id}`}>
        <GlowCard
          variant="default"
          glow={isReady ? "none" : "cyan"}
          className={cn(
            "cursor-pointer overflow-hidden transition-all",
            isReady && "hover:ring-primary/50 hover:ring-1",
          )}
        >
          {/* Thumbnail */}
          <div className="relative aspect-video bg-black">
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt={title}
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center">
                <Video className="text-muted-foreground size-12" />
              </div>
            )}

            {/* Duration Badge */}
            {duration && (
              <div className="absolute right-2 bottom-2 flex items-center gap-1 rounded bg-black/70 px-2 py-0.5 text-xs text-white">
                <Clock className="size-3" />
                {formatDuration(duration)}
              </div>
            )}

            {/* Play Overlay */}
            {isReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity hover:opacity-100">
                <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                  <Play className="size-8 text-white" />
                </div>
              </div>
            )}

            {/* Status Badge (if not ready) */}
            {!isReady && (
              <div className="absolute top-2 left-2">
                <Badge className={statusConfig[status].color}>
                  {statusConfig[status].label}
                </Badge>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="line-clamp-1 font-semibold">{title}</h3>

            {session && (
              <p className="text-muted-foreground mt-1 line-clamp-1 text-sm">
                {session.title}
              </p>
            )}

            <div className="mt-3 flex items-center justify-between">
              {/* Author */}
              <div className="flex items-center gap-2">
                <Avatar className="size-6">
                  {uploadedBy.image && (
                    <AvatarImage src={uploadedBy.image} alt={uploadedBy.name} />
                  )}
                  <AvatarFallback className="text-xs">
                    {uploadedBy.name.slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-muted-foreground text-xs">
                  {uploadedBy.name}
                </span>
              </div>

              {/* Meta */}
              <div className="text-muted-foreground flex items-center gap-3 text-xs">
                {markerCount > 0 && (
                  <div className="flex items-center gap-1">
                    <MessageSquare className="size-3" />
                    {markerCount}
                  </div>
                )}
                <span>
                  {formatDistanceToNow(createdAt, {
                    addSuffix: true,
                    locale: fr,
                  })}
                </span>
              </div>
            </div>
          </div>
        </GlowCard>
      </Link>
    </motion.div>
  );
}
