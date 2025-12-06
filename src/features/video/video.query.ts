import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import type { VideoStatus } from "@/lib/impulsion/types";
import type {
  VideoDetail,
  VideoListItem,
  VideoMarkerData,
} from "./video.types";

/**
 * Get all videos for an organization
 */
export async function getOrgVideos(orgId: string): Promise<VideoListItem[]> {
  try {
    const videos = await prisma.$queryRaw<
      {
        id: string;
        title: string;
        thumbnailUrl: string | null;
        duration: number | null;
        status: string;
        createdAt: Date;
        uploadedById: string;
        uploaderName: string;
        uploaderImage: string | null;
        sessionId: string | null;
        sessionTitle: string | null;
        markerCount: bigint;
      }[]
    >`
      SELECT
        v.id,
        v.title,
        v."thumbnailUrl",
        v.duration,
        v.status,
        v."createdAt",
        v."uploadedById",
        u.name as "uploaderName",
        u.image as "uploaderImage",
        v."sessionId",
        cs.title as "sessionTitle",
        (SELECT COUNT(*) FROM video_marker vm WHERE vm."videoId" = v.id) as "markerCount"
      FROM video v
      JOIN "user" u ON v."uploadedById" = u.id
      LEFT JOIN coaching_session cs ON v."sessionId" = cs.id
      WHERE v."organizationId" = ${orgId}
      ORDER BY v."createdAt" DESC
    `;

    return videos.map((v) => ({
      id: v.id,
      title: v.title,
      thumbnailUrl: v.thumbnailUrl,
      duration: v.duration,
      status: v.status as VideoStatus,
      createdAt: v.createdAt,
      uploadedBy: {
        id: v.uploadedById,
        name: v.uploaderName,
        image: v.uploaderImage,
      },
      session: v.sessionId
        ? {
            id: v.sessionId,
            title: v.sessionTitle ?? "Sans titre",
          }
        : null,
      markerCount: Number(v.markerCount),
    }));
  } catch (err) {
    logger.error("getOrgVideos error:", { err });
    return [];
  }
}

/**
 * Get video detail with markers
 */
export async function getVideoDetail(
  videoId: string,
  orgId: string,
): Promise<VideoDetail | null> {
  try {
    const videos = await prisma.$queryRaw<
      {
        id: string;
        title: string;
        fileName: string;
        fileUrl: string;
        fileSize: number;
        thumbnailUrl: string | null;
        duration: number | null;
        status: string;
        createdAt: Date;
        uploadedById: string;
        uploaderName: string;
        uploaderImage: string | null;
        sessionId: string | null;
        sessionTitle: string | null;
      }[]
    >`
      SELECT
        v.id,
        v.title,
        v."fileName",
        v."fileUrl",
        v."fileSize",
        v."thumbnailUrl",
        v.duration,
        v.status,
        v."createdAt",
        v."uploadedById",
        u.name as "uploaderName",
        u.image as "uploaderImage",
        v."sessionId",
        cs.title as "sessionTitle"
      FROM video v
      JOIN "user" u ON v."uploadedById" = u.id
      LEFT JOIN coaching_session cs ON v."sessionId" = cs.id
      WHERE v.id = ${videoId}
        AND v."organizationId" = ${orgId}
    `;

    if (videos.length === 0) return null;
    const v = videos[0];

    // Get markers with authors
    const markers = await prisma.$queryRaw<
      {
        id: string;
        timestamp: number;
        content: string;
        createdAt: Date;
        authorId: string;
        authorName: string;
        authorImage: string | null;
        parentId: string | null;
      }[]
    >`
      SELECT
        vm.id,
        vm.timestamp,
        vm.content,
        vm."createdAt",
        vm."authorId",
        u.name as "authorName",
        u.image as "authorImage",
        vm."parentId"
      FROM video_marker vm
      JOIN "user" u ON vm."authorId" = u.id
      WHERE vm."videoId" = ${videoId}
      ORDER BY vm.timestamp ASC, vm."createdAt" ASC
    `;

    // Group markers and replies
    const markerMap = new Map<string, VideoMarkerData>();
    const replies: {
      parentId: string;
      reply: VideoMarkerData["replies"][0];
    }[] = [];

    for (const m of markers) {
      if (m.parentId) {
        replies.push({
          parentId: m.parentId,
          reply: {
            id: m.id,
            content: m.content,
            createdAt: m.createdAt,
            author: {
              id: m.authorId,
              name: m.authorName,
              image: m.authorImage,
            },
          },
        });
      } else {
        markerMap.set(m.id, {
          id: m.id,
          timestamp: m.timestamp,
          content: m.content,
          createdAt: m.createdAt,
          author: {
            id: m.authorId,
            name: m.authorName,
            image: m.authorImage,
          },
          replies: [],
        });
      }
    }

    // Attach replies to their parent markers
    for (const { parentId, reply } of replies) {
      const parent = markerMap.get(parentId);
      if (parent) {
        parent.replies.push(reply);
      }
    }

    return {
      id: v.id,
      title: v.title,
      fileName: v.fileName,
      fileUrl: v.fileUrl,
      fileSize: v.fileSize,
      thumbnailUrl: v.thumbnailUrl,
      duration: v.duration,
      status: v.status as VideoStatus,
      createdAt: v.createdAt,
      uploadedBy: {
        id: v.uploadedById,
        name: v.uploaderName,
        image: v.uploaderImage,
      },
      session: v.sessionId
        ? {
            id: v.sessionId,
            title: v.sessionTitle ?? "Sans titre",
          }
        : null,
      markerCount: markerMap.size,
      markers: Array.from(markerMap.values()),
    };
  } catch (err) {
    logger.error("getVideoDetail error:", { err });
    return null;
  }
}

/**
 * Get videos for an athlete
 */
export async function getAthleteVideos(
  orgId: string,
  athleteId: string,
): Promise<VideoListItem[]> {
  try {
    const videos = await prisma.$queryRaw<
      {
        id: string;
        title: string;
        thumbnailUrl: string | null;
        duration: number | null;
        status: string;
        createdAt: Date;
        uploadedById: string;
        uploaderName: string;
        uploaderImage: string | null;
        sessionId: string | null;
        sessionTitle: string | null;
        markerCount: bigint;
      }[]
    >`
      SELECT
        v.id,
        v.title,
        v."thumbnailUrl",
        v.duration,
        v.status,
        v."createdAt",
        v."uploadedById",
        u.name as "uploaderName",
        u.image as "uploaderImage",
        v."sessionId",
        cs.title as "sessionTitle",
        (SELECT COUNT(*) FROM video_marker vm WHERE vm."videoId" = v.id) as "markerCount"
      FROM video v
      JOIN "user" u ON v."uploadedById" = u.id
      LEFT JOIN coaching_session cs ON v."sessionId" = cs.id
      WHERE v."organizationId" = ${orgId}
        AND v."uploadedById" = ${athleteId}
      ORDER BY v."createdAt" DESC
    `;

    return videos.map((v) => ({
      id: v.id,
      title: v.title,
      thumbnailUrl: v.thumbnailUrl,
      duration: v.duration,
      status: v.status as VideoStatus,
      createdAt: v.createdAt,
      uploadedBy: {
        id: v.uploadedById,
        name: v.uploaderName,
        image: v.uploaderImage,
      },
      session: v.sessionId
        ? {
            id: v.sessionId,
            title: v.sessionTitle ?? "Sans titre",
          }
        : null,
      markerCount: Number(v.markerCount),
    }));
  } catch (err) {
    logger.error("getAthleteVideos error:", { err });
    return [];
  }
}

/**
 * Session option for filter dropdown
 */
export type SessionOption = {
  id: string;
  title: string;
};

/**
 * Get all sessions for an organization (for filter dropdown)
 */
export async function getOrgSessions(orgId: string): Promise<SessionOption[]> {
  try {
    const sessions = await prisma.$queryRaw<
      {
        id: string;
        title: string;
      }[]
    >`
      SELECT id, title
      FROM coaching_session
      WHERE "organizationId" = ${orgId}
      ORDER BY "scheduledAt" DESC
    `;

    return sessions;
  } catch (err) {
    logger.error("getOrgSessions error:", { err });
    return [];
  }
}
