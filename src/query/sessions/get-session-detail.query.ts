import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import type { SessionStatus, SessionType } from "@/lib/impulsion/types";
import type { SessionDetailData } from "@/features/session-detail";

/**
 * Get detailed session information including assignees and feedbacks
 */
export async function getSessionDetail(
  sessionId: string,
  orgId: string,
): Promise<SessionDetailData | null> {
  try {
    // Get session basic info
    const sessions = await prisma.$queryRaw<
      {
        id: string;
        title: string;
        description: string | null;
        type: string;
        status: string;
        scheduledAt: Date;
        durationMinutes: number;
        targetRpe: number | null;
      }[]
    >`
      SELECT
        id, title, description, type, status,
        "scheduledAt", "durationMinutes", "targetRpe"
      FROM coaching_session
      WHERE id = ${sessionId}
        AND "organizationId" = ${orgId}
    `;

    if (sessions.length === 0) return null;
    const session = sessions[0];

    // Get assignees with their status and feedback info
    const assignees = await prisma.$queryRaw<
      {
        id: string;
        name: string;
        image: string | null;
        status: string;
        hasFeedback: boolean;
      }[]
    >`
      SELECT
        u.id,
        u.name,
        u.image,
        sa.status,
        EXISTS(
          SELECT 1 FROM session_feedback sf
          WHERE sf."sessionId" = sa."sessionId"
            AND sf."athleteId" = u.id
        ) as "hasFeedback"
      FROM session_assignment sa
      JOIN "user" u ON sa."athleteId" = u.id
      WHERE sa."sessionId" = ${sessionId}
    `;

    // Get feedbacks with athlete info
    const feedbacks = await prisma.$queryRaw<
      {
        id: string;
        athleteId: string;
        athleteName: string;
        athleteImage: string | null;
        rpe: number;
        actualDuration: number | null;
        sensation: string | null;
        mood: string | null;
        comment: string | null;
        createdAt: Date;
      }[]
    >`
      SELECT
        sf.id,
        sf."athleteId",
        u.name as "athleteName",
        u.image as "athleteImage",
        sf.rpe,
        sf."actualDuration",
        sf.sensation,
        sf.mood,
        sf.comment,
        sf."createdAt"
      FROM session_feedback sf
      JOIN "user" u ON sf."athleteId" = u.id
      WHERE sf."sessionId" = ${sessionId}
      ORDER BY sf."createdAt" DESC
    `;

    return {
      id: session.id,
      title: session.title,
      description: session.description,
      type: session.type as SessionType,
      status: session.status as SessionStatus,
      scheduledAt: session.scheduledAt,
      durationMinutes: session.durationMinutes,
      targetRpe: session.targetRpe,
      assignees: assignees.map((a) => ({
        ...a,
        status: a.status as SessionStatus,
      })),
      feedbacks,
    };
  } catch (err) {
    logger.error("getSessionDetail error:", { err });
    return null;
  }
}
