"use client";

import { CyberButton } from "@/components/impulsion/cyber-button";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import {
  VideoPlayer,
  VideoMarkersPanel,
  getVideoDetail,
  type VideoDetail,
} from "@/features/video";
import { useCurrentOrg } from "@app/[locale]/orgs/[orgSlug]/use-current-org";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { use, useCallback, useState } from "react";

type VideoDetailPageProps = {
  params: Promise<{
    locale: string;
    orgSlug: string;
    videoId: string;
  }>;
};

export default function Page(props: VideoDetailPageProps) {
  const params = use(props.params);
  const org = useCurrentOrg();

  const [video, setVideo] = useState<VideoDetail | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Load video data on mount
  if (isLoading && org) {
    void getVideoDetail(params.videoId, org.id).then((data) => {
      setVideo(data);
      setIsLoading(false);
    });
  }

  const handleTimeUpdate = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  const handleSeekTo = useCallback((timestamp: number) => {
    const videoElement = document.querySelector("video");
    if (videoElement) {
      videoElement.currentTime = timestamp;
    }
  }, []);

  const handleMarkersChange = useCallback(() => {
    // Trigger reload by resetting loading state
    if (org) {
      void getVideoDetail(params.videoId, org.id).then((data) => {
        setVideo(data);
      });
    }
  }, [org, params.videoId]);

  if (!org) {
    return null;
  }

  if (isLoading) {
    return (
      <Layout size="xl">
        <LayoutContent>
          <div className="flex h-96 items-center justify-center">
            <div className="text-muted-foreground">Chargement...</div>
          </div>
        </LayoutContent>
      </Layout>
    );
  }

  if (!video) {
    return (
      <Layout size="xl">
        <LayoutContent>
          <div className="flex h-96 flex-col items-center justify-center">
            <p className="text-muted-foreground mb-4">Vidéo non trouvée</p>
            <CyberButton variant="outline" asChild>
              <Link href={`/orgs/${params.orgSlug}/videos`}>
                <ArrowLeft className="mr-2 size-4" />
                Retour aux vidéos
              </Link>
            </CyberButton>
          </div>
        </LayoutContent>
      </Layout>
    );
  }

  return (
    <Layout size="xl">
      <LayoutHeader>
        <div className="flex items-center gap-4">
          <CyberButton variant="ghost" size="sm" asChild>
            <Link href={`/orgs/${params.orgSlug}/videos`}>
              <ArrowLeft className="size-4" />
            </Link>
          </CyberButton>
          <LayoutTitle>{video.title}</LayoutTitle>
        </div>
      </LayoutHeader>
      <LayoutContent>
        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          {/* Video Player */}
          <div className="space-y-4">
            <VideoPlayer
              src={video.fileUrl}
              markers={video.markers}
              onTimeUpdate={handleTimeUpdate}
              onMarkerClick={(marker) => handleSeekTo(marker.timestamp)}
              className="aspect-video w-full"
            />

            {/* Video Info */}
            {video.session && (
              <div className="text-muted-foreground text-sm">
                Séance : {video.session.title}
              </div>
            )}
          </div>

          {/* Markers Panel */}
          <div className="border-border h-[600px] overflow-hidden rounded-lg border">
            <VideoMarkersPanel
              videoId={video.id}
              markers={video.markers}
              currentTime={currentTime}
              currentUserId={org.id}
              onMarkerClick={handleSeekTo}
              onMarkersChange={handleMarkersChange}
            />
          </div>
        </div>
      </LayoutContent>
    </Layout>
  );
}
