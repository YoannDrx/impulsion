import { prisma } from "@/lib/prisma";

export type TeamDashboardAthlete = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  sport: string | null;
  lastSessionDate: Date | null;
  pendingFeedback: boolean;
  streak: number;
};

export type PendingFeedbackSession = {
  sessionId: string;
  sessionTitle: string;
  sessionType: string;
  scheduledAt: Date;
  athleteId: string;
  athleteName: string;
  athleteImage: string | null;
};

export type TeamDashboardData = {
  athleteCount: number;
  upcomingSessionsCount: number;
  completedSessionsCount: number;
  pendingFeedbackCount: number;
  athletes: TeamDashboardAthlete[];
  pendingFeedbackSessions: PendingFeedbackSession[];
};

/**
 * Fetches all dashboard data for a team/organization
 */
export async function getTeamDashboardData(
  orgId: string,
): Promise<TeamDashboardData> {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Monday
  startOfWeek.setHours(0, 0, 0, 0);

  // Run all queries in parallel for performance
  const [
    upcomingCount,
    completedCount,
    pendingFeedback,
    athletesWithDetails,
    pendingFeedbackSessions,
  ] = await Promise.all([
    // Count upcoming sessions (scheduled in the future, status PLANIFIEE)
    prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(*) as count
      FROM coaching_session
      WHERE "organizationId" = ${orgId}
        AND "scheduledAt" >= ${now}
        AND status = 'PLANIFIEE'
    `,

    // Count completed sessions this week
    prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(*) as count
      FROM coaching_session
      WHERE "organizationId" = ${orgId}
        AND status = 'FAITE'
        AND "updatedAt" >= ${startOfWeek}
    `,

    // Count pending feedback (past sessions with assignments but no feedback)
    prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(*) as count
      FROM session_assignment sa
      INNER JOIN coaching_session cs ON cs.id = sa."sessionId"
      LEFT JOIN session_feedback sf ON sf."sessionId" = sa."sessionId" AND sf."athleteId" = sa."athleteId"
      WHERE cs."organizationId" = ${orgId}
        AND cs."scheduledAt" < ${now}
        AND cs.status IN ('PLANIFIEE', 'FAITE', 'PARTIELLE')
        AND sf.id IS NULL
    `,

    // Get all athletes with their details
    prisma.$queryRaw<
      {
        id: string;
        name: string;
        email: string;
        image: string | null;
        sport: string | null;
        lastSessionDate: Date | null;
        pendingFeedback: boolean;
        streak: number;
      }[]
    >`
      SELECT
        u.id,
        u.name,
        u.email,
        u.image,
        ap.sport,
        (
          SELECT MAX(cs."scheduledAt")
          FROM session_assignment sa
          INNER JOIN coaching_session cs ON cs.id = sa."sessionId"
          WHERE sa."athleteId" = u.id
            AND cs."scheduledAt" < ${now}
        ) as "lastSessionDate",
        EXISTS (
          SELECT 1
          FROM session_assignment sa
          INNER JOIN coaching_session cs ON cs.id = sa."sessionId"
          LEFT JOIN session_feedback sf ON sf."sessionId" = sa."sessionId" AND sf."athleteId" = sa."athleteId"
          WHERE sa."athleteId" = u.id
            AND cs."organizationId" = ${orgId}
            AND cs."scheduledAt" < ${now}
            AND cs.status IN ('PLANIFIEE', 'FAITE', 'PARTIELLE')
            AND sf.id IS NULL
        ) as "pendingFeedback",
        COALESCE(us."currentStreak", 0) as streak
      FROM member m
      INNER JOIN "user" u ON u.id = m."userId"
      LEFT JOIN athlete_profile ap ON ap."userId" = u.id
      LEFT JOIN user_streak us ON us."userId" = u.id
      WHERE m."organizationId" = ${orgId}
        AND m.role = 'member'
      ORDER BY u.name ASC
    `,

    // Get pending feedback sessions for the list
    prisma.$queryRaw<PendingFeedbackSession[]>`
      SELECT
        cs.id as "sessionId",
        cs.title as "sessionTitle",
        cs.type as "sessionType",
        cs."scheduledAt",
        u.id as "athleteId",
        u.name as "athleteName",
        u.image as "athleteImage"
      FROM session_assignment sa
      INNER JOIN coaching_session cs ON cs.id = sa."sessionId"
      INNER JOIN "user" u ON u.id = sa."athleteId"
      LEFT JOIN session_feedback sf ON sf."sessionId" = sa."sessionId" AND sf."athleteId" = sa."athleteId"
      WHERE cs."organizationId" = ${orgId}
        AND cs."scheduledAt" < ${now}
        AND cs.status IN ('PLANIFIEE', 'FAITE', 'PARTIELLE')
        AND sf.id IS NULL
      ORDER BY cs."scheduledAt" DESC
      LIMIT 10
    `,
  ]);

  return {
    athleteCount: athletesWithDetails.length,
    upcomingSessionsCount: Number(upcomingCount[0]?.count ?? 0),
    completedSessionsCount: Number(completedCount[0]?.count ?? 0),
    pendingFeedbackCount: Number(pendingFeedback[0]?.count ?? 0),
    athletes: athletesWithDetails.map((a) => ({
      id: a.id,
      name: a.name,
      email: a.email,
      image: a.image,
      sport: a.sport,
      lastSessionDate: a.lastSessionDate,
      pendingFeedback: Boolean(a.pendingFeedback),
      streak: Number(a.streak),
    })),
    pendingFeedbackSessions,
  };
}

/**
 * Get count of pending invitations for an organization
 */
export async function getPendingInvitationsCount(
  orgId: string,
): Promise<number> {
  const count = await prisma.invitation.count({
    where: {
      organizationId: orgId,
      status: "pending",
    },
  });

  return count;
}
