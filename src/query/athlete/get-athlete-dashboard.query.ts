import { prisma } from "@/lib/prisma";
import type {
  BadgeCategory,
  BadgeRarity,
  SessionStatus,
  SessionType,
} from "@/lib/impulsion/types";

type TeamMember = {
  id: string;
  name: string;
  image: string | null;
  role: "owner" | "admin" | "member";
};

type RecentBadge = {
  id: string;
  key: string;
  name: string;
  description: string;
  iconUrl: string | null;
  category: BadgeCategory;
  rarity: BadgeRarity;
  xpReward: number;
  criteria: { type: string; value: number } | null;
  isUnlocked: boolean;
  unlockedAt: Date | null;
  progress: number;
};

type GamificationData = {
  currentStreak: number;
  longestStreak: number;
  xp: number;
  level: number;
  recentBadges: RecentBadge[];
  totalBadges: number;
  unlockedBadges: number;
};

type UpcomingSession = {
  id: string;
  title: string;
  type: SessionType;
  status: SessionStatus;
  scheduledAt: Date;
  durationMinutes: number;
  targetRpe: number | null;
  hasFeedback: boolean;
};

export type AthleteDashboardData = {
  upcomingSessionsCount: number;
  completedThisWeek: number;
  currentStreak: number;
  averageRpe: number | null;
  upcomingSessions: UpcomingSession[];
  coach: TeamMember | null;
  teammates: TeamMember[];
  gamification?: GamificationData;
};

/**
 * Fetches all dashboard data for an athlete
 */
export async function getAthleteDashboardData(
  orgId: string,
  athleteId: string,
): Promise<AthleteDashboardData> {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Monday
  startOfWeek.setHours(0, 0, 0, 0);

  // Get upcoming sessions for this athlete
  const upcomingSessions = await prisma.$queryRaw<
    {
      id: string;
      title: string;
      type: string;
      status: string;
      scheduledAt: Date;
      durationMinutes: number;
      targetRpe: number | null;
      hasFeedback: boolean;
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
      CASE WHEN sf.id IS NOT NULL THEN true ELSE false END as "hasFeedback"
    FROM coaching_session cs
    INNER JOIN session_assignment sa ON sa."sessionId" = cs.id AND sa."athleteId" = ${athleteId}
    LEFT JOIN session_feedback sf ON sf."sessionId" = cs.id AND sf."athleteId" = ${athleteId}
    WHERE cs."organizationId" = ${orgId}
      AND cs."scheduledAt" >= ${now}
    ORDER BY cs."scheduledAt" ASC
    LIMIT 10
  `;

  // Count upcoming sessions
  const upcomingCount = await prisma.$queryRaw<{ count: bigint }[]>`
    SELECT COUNT(*) as count
    FROM coaching_session cs
    INNER JOIN session_assignment sa ON sa."sessionId" = cs.id AND sa."athleteId" = ${athleteId}
    WHERE cs."organizationId" = ${orgId}
      AND cs."scheduledAt" >= ${now}
  `;

  // Count completed this week
  const completedThisWeekCount = await prisma.$queryRaw<{ count: bigint }[]>`
    SELECT COUNT(*) as count
    FROM session_feedback sf
    INNER JOIN coaching_session cs ON cs.id = sf."sessionId"
    WHERE sf."athleteId" = ${athleteId}
      AND cs."organizationId" = ${orgId}
      AND sf."createdAt" >= ${startOfWeek}
  `;

  // Get average RPE from last 10 sessions
  const avgRpe = await prisma.$queryRaw<{ avg: number | null }[]>`
    SELECT AVG(rpe)::float as avg
    FROM (
      SELECT rpe
      FROM session_feedback
      WHERE "athleteId" = ${athleteId}
      ORDER BY "createdAt" DESC
      LIMIT 10
    ) as recent_feedback
  `;

  // Get current streak and gamification data from user_streak table
  const streak = await prisma.$queryRaw<
    {
      currentStreak: number;
      longestStreak: number;
      xp: number;
      level: number;
    }[]
  >`
    SELECT "currentStreak", "longestStreak", xp, level
    FROM user_streak
    WHERE "userId" = ${athleteId}
  `;

  // Get total badges count
  const totalBadgesCount = await prisma.badge.count();

  // Get unlocked badges count
  const unlockedBadgesCount = await prisma.userBadge.count({
    where: { userId: athleteId },
  });

  // Get recent badges
  const recentBadges = await prisma.userBadge.findMany({
    where: { userId: athleteId },
    include: { badge: true },
    orderBy: { unlockedAt: "desc" },
    take: 3,
  });

  // Get team members (coach and teammates)
  const members = await prisma.member.findMany({
    where: { organizationId: orgId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  const coach = members.find((m) => m.role === "owner");
  const teammates = members
    .filter((m) => m.role === "member" && m.userId !== athleteId)
    .map((m) => ({
      id: m.user.id,
      name: m.user.name,
      image: m.user.image,
      role: m.role as "owner" | "admin" | "member",
    }));

  // Build gamification data
  const gamificationData: GamificationData = {
    currentStreak: streak[0]?.currentStreak ?? 0,
    longestStreak: streak[0]?.longestStreak ?? 0,
    xp: streak[0]?.xp ?? 0,
    level: streak[0]?.level ?? 1,
    recentBadges: recentBadges.map((ub) => ({
      id: ub.badge.id,
      key: ub.badge.key,
      name: ub.badge.name,
      description: ub.badge.description,
      iconUrl: ub.badge.iconUrl,
      category: ub.badge.category as BadgeCategory,
      rarity: ub.badge.rarity as BadgeRarity,
      xpReward: ub.badge.xpReward,
      criteria: ub.badge.criteria as { type: string; value: number } | null,
      isUnlocked: true,
      unlockedAt: ub.unlockedAt,
      progress: ub.progress,
    })),
    totalBadges: totalBadgesCount,
    unlockedBadges: unlockedBadgesCount,
  };

  return {
    upcomingSessionsCount: Number(upcomingCount[0]?.count ?? 0),
    completedThisWeek: Number(completedThisWeekCount[0]?.count ?? 0),
    currentStreak: streak[0]?.currentStreak ?? 0,
    averageRpe: avgRpe[0]?.avg ? Math.round(avgRpe[0].avg * 10) / 10 : null,
    upcomingSessions: upcomingSessions.map((s) => ({
      id: s.id,
      title: s.title,
      type: s.type as SessionType,
      status: s.status as SessionStatus,
      scheduledAt: s.scheduledAt,
      durationMinutes: s.durationMinutes,
      targetRpe: s.targetRpe,
      hasFeedback: s.hasFeedback,
    })),
    coach: coach
      ? {
          id: coach.user.id,
          name: coach.user.name,
          image: coach.user.image,
          role: "owner" as const,
        }
      : null,
    teammates,
    gamification: gamificationData,
  };
}
