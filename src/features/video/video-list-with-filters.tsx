"use client";

import { CyberButton } from "@/components/impulsion/cyber-button";
import { Video } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { VideoCard } from "./video-card";
import { VideoFilters } from "./video-filters";
import type { SessionOption } from "./video.query";
import type { VideoListItem } from "./video.types";

type VideoListWithFiltersProps = {
  videos: VideoListItem[];
  sessions: SessionOption[];
  orgSlug: string;
  isCoach: boolean;
};

export function VideoListWithFilters({
  videos,
  sessions,
  orgSlug,
  isCoach,
}: VideoListWithFiltersProps) {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const hasActiveFilters =
    selectedSession !== null ||
    dateFrom !== "" ||
    dateTo !== "" ||
    searchQuery !== "";

  const clearFilters = () => {
    setSelectedSession(null);
    setDateFrom("");
    setDateTo("");
    setSearchQuery("");
  };

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = video.title.toLowerCase().includes(query);
        const matchesSession = video.session?.title
          .toLowerCase()
          .includes(query);
        const matchesAuthor = video.uploadedBy.name
          .toLowerCase()
          .includes(query);
        if (!matchesTitle && !matchesSession && !matchesAuthor) {
          return false;
        }
      }

      // Session filter
      if (selectedSession && video.session?.id !== selectedSession) {
        return false;
      }

      // Date from filter
      if (dateFrom) {
        const fromDate = new Date(dateFrom);
        fromDate.setHours(0, 0, 0, 0);
        if (new Date(video.createdAt) < fromDate) {
          return false;
        }
      }

      // Date to filter
      if (dateTo) {
        const toDate = new Date(dateTo);
        toDate.setHours(23, 59, 59, 999);
        if (new Date(video.createdAt) > toDate) {
          return false;
        }
      }

      return true;
    });
  }, [videos, searchQuery, selectedSession, dateFrom, dateTo]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <VideoFilters
        sessions={sessions}
        selectedSession={selectedSession}
        onSessionChange={setSelectedSession}
        dateFrom={dateFrom}
        onDateFromChange={setDateFrom}
        dateTo={dateTo}
        onDateToChange={setDateTo}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Results count */}
      {hasActiveFilters && (
        <p className="text-muted-foreground text-sm">
          {filteredVideos.length} vidéo{filteredVideos.length !== 1 ? "s" : ""}{" "}
          trouvée{filteredVideos.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* Video Grid */}
      {filteredVideos.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} {...video} orgSlug={orgSlug} />
          ))}
        </div>
      ) : videos.length > 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Video className="text-muted-foreground mb-4 size-16" />
          <h3 className="text-lg font-semibold">Aucun résultat</h3>
          <p className="text-muted-foreground mt-2 max-w-md">
            Aucune vidéo ne correspond à vos critères de recherche
          </p>
          <CyberButton
            variant="outline"
            className="mt-6"
            onClick={clearFilters}
          >
            Effacer les filtres
          </CyberButton>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Video className="text-muted-foreground mb-4 size-16" />
          <h3 className="text-lg font-semibold">Aucune vidéo</h3>
          <p className="text-muted-foreground mt-2 max-w-md">
            {isCoach
              ? "Uploadez des vidéos pour les analyser avec vos athlètes"
              : "Votre coach n'a pas encore uploadé de vidéos"}
          </p>
          {isCoach && (
            <CyberButton variant="neon" className="mt-6" asChild>
              <Link href={`/orgs/${orgSlug}/videos/upload`}>
                <Video className="mr-2 size-4" />
                Uploader une vidéo
              </Link>
            </CyberButton>
          )}
        </div>
      )}
    </div>
  );
}
