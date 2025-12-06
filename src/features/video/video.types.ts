import type { VideoStatus } from "@/lib/impulsion/types";

/**
 * Video data for display in lists and cards
 */
export type VideoListItem = {
  id: string;
  title: string;
  thumbnailUrl: string | null;
  duration: number | null;
  status: VideoStatus;
  createdAt: Date;
  uploadedBy: {
    id: string;
    name: string;
    image: string | null;
  };
  session: {
    id: string;
    title: string;
  } | null;
  markerCount: number;
};

/**
 * Full video data for detail view
 */
export type VideoDetail = VideoListItem & {
  fileUrl: string;
  fileName: string;
  fileSize: number;
  markers: VideoMarkerData[];
};

/**
 * Video marker data
 */
export type VideoMarkerData = {
  id: string;
  timestamp: number;
  content: string;
  createdAt: Date;
  author: {
    id: string;
    name: string;
    image: string | null;
  };
  replies: VideoMarkerReply[];
};

/**
 * Video marker reply
 */
export type VideoMarkerReply = {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    id: string;
    name: string;
    image: string | null;
  };
};

/**
 * Upload progress state
 */
export type UploadProgress = {
  status: "idle" | "uploading" | "processing" | "complete" | "error";
  progress: number;
  error?: string;
};
