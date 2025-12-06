import { prisma } from "@/lib/prisma";
import type { CalendarSession } from "./calendar.types";

/**
 * Get sessions for a date range in an organization
 */
export async function getCalendarSessions(
  orgId: string,
  startDate: Date,
  endDate: Date,
): Promise<CalendarSession[]> {
  const sessions = await prisma.$queryRaw<
    {
      id: string;
      title: string;
      type: string;
      status: string;
      scheduledAt: Date;
      durationMinutes: number;
      targetRpe: number | null;
      assigneeCount: bigint;
      feedbackCount: bigint;
    }[]
  >`
    SELECT
      cs.id,
      cs.title,
      cs.type,
      cs.status,
      cs."scheduledAt",
      cs."durationMinutes",
      cs."targetRpe",
      COUNT(DISTINCT sa.id) as "assigneeCount",
      COUNT(DISTINCT sf.id) as "feedbackCount"
    FROM coaching_session cs
    LEFT JOIN session_assignment sa ON sa."sessionId" = cs.id
    LEFT JOIN session_feedback sf ON sf."sessionId" = cs.id
    WHERE cs."organizationId" = ${orgId}
      AND cs."scheduledAt" >= ${startDate}
      AND cs."scheduledAt" < ${endDate}
    GROUP BY cs.id
    ORDER BY cs."scheduledAt" ASC
  `;

  return sessions.map((session) => ({
    id: session.id,
    title: session.title,
    type: session.type as CalendarSession["type"],
    status: session.status as CalendarSession["status"],
    scheduledAt: session.scheduledAt,
    durationMinutes: session.durationMinutes,
    targetRpe: session.targetRpe,
    assigneeCount: Number(session.assigneeCount),
    feedbackCount: Number(session.feedbackCount),
  }));
}
