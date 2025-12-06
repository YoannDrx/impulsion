import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import type { SessionStatus, SessionType } from "@/lib/impulsion/types";

export type SessionWithAssignees = {
  id: string;
  title: string;
  description: string | null;
  type: SessionType;
  status: SessionStatus;
  scheduledAt: Date;
  durationMinutes: number;
  targetRpe: number | null;
  assignees: {
    id: string;
    name: string;
    image: string | null;
  }[];
  feedbackCount: number;
};

/**
 * Get all sessions for an organization
 * Uses raw SQL since schema may not be migrated yet
 */
export async function getOrgSessions(
  orgId: string,
): Promise<SessionWithAssignees[]> {
  try {
    // Query sessions using raw SQL
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
      WHERE "organizationId" = ${orgId}
      ORDER BY "scheduledAt" DESC
    `;

    // For each session, get assignees
    const sessionsWithAssignees = await Promise.all(
      sessions.map(async (session) => {
        const assignees = await prisma.$queryRaw<
          { id: string; name: string; image: string | null }[]
        >`
          SELECT u.id, u.name, u.image
          FROM session_assignment sa
          JOIN "user" u ON sa."athleteId" = u.id
          WHERE sa."sessionId" = ${session.id}
        `;

        const feedbackCount = await prisma.$queryRaw<{ count: bigint }[]>`
          SELECT COUNT(*) as count
          FROM session_feedback
          WHERE "sessionId" = ${session.id}
        `;

        return {
          ...session,
          type: session.type as SessionType,
          status: session.status as SessionStatus,
          assignees,
          feedbackCount: Number(feedbackCount[0]?.count ?? 0),
        };
      }),
    );

    return sessionsWithAssignees;
  } catch (err) {
    logger.error("getOrgSessions error:", { err });
    return [];
  }
}

/**
 * Get athletes available for session assignment
 */
export async function getOrgAthletes(
  orgId: string,
): Promise<
  { id: string; name: string; email: string; image: string | null }[]
> {
  const members = await prisma.member.findMany({
    where: {
      organizationId: orgId,
      role: "member", // Athletes have member role
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  return members.map((m) => ({
    id: m.user.id,
    name: m.user.name,
    email: m.user.email,
    image: m.user.image ?? null,
  }));
}
