import { prisma } from "@/lib/prisma";
import type { BadgeCategory, BadgeRarity } from "@/lib/impulsion/types";

// ============================================================================
// TYPES
// ============================================================================

export type BadgeWithProgress = {
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
  progress: number; // 0-100
};

export type UserStreakData = {
  currentStreak: number;
  longestStreak: number;
  lastActivityAt: Date | null;
  xp: number;
  level: number;
};

export type UserGamificationStats = {
  totalBadges: number;
  unlockedBadges: number;
  totalXp: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
};

// ============================================================================
// QUERIES
// ============================================================================

/**
 * Get all badges for a user with their unlock status and progress
 */
export async function getUserBadges(
  userId: string,
): Promise<BadgeWithProgress[]> {
  const badges = await prisma.badge.findMany({
    include: {
      userBadges: {
        where: { userId },
      },
    },
    orderBy: [{ category: "asc" }, { xpReward: "asc" }],
  });

  return badges.map((badge) => {
    const userBadge = badge.userBadges[0] as
      | (typeof badge.userBadges)[number]
      | undefined;
    const isUnlocked = userBadge !== undefined;
    return {
      id: badge.id,
      key: badge.key,
      name: badge.name,
      description: badge.description,
      iconUrl: badge.iconUrl,
      category: badge.category as BadgeCategory,
      rarity: badge.rarity as BadgeRarity,
      xpReward: badge.xpReward,
      criteria: badge.criteria as { type: string; value: number } | null,
      isUnlocked,
      unlockedAt: isUnlocked ? userBadge.unlockedAt : null,
      progress: isUnlocked ? userBadge.progress : 0,
    };
  });
}

/**
 * Get only unlocked badges for a user
 */
export async function getUserUnlockedBadges(
  userId: string,
): Promise<BadgeWithProgress[]> {
  const userBadges = await prisma.userBadge.findMany({
    where: { userId },
    include: { badge: true },
    orderBy: { unlockedAt: "desc" },
  });

  return userBadges.map((ub) => ({
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
  }));
}

/**
 * Get recent unlocked badges (for dashboard widget)
 */
export async function getRecentBadges(
  userId: string,
  limit = 3,
): Promise<BadgeWithProgress[]> {
  const userBadges = await prisma.userBadge.findMany({
    where: { userId },
    include: { badge: true },
    orderBy: { unlockedAt: "desc" },
    take: limit,
  });

  return userBadges.map((ub) => ({
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
  }));
}

/**
 * Get user streak data
 */
export async function getUserStreak(userId: string): Promise<UserStreakData> {
  const streak = await prisma.userStreak.findUnique({
    where: { userId },
  });

  return {
    currentStreak: streak?.currentStreak ?? 0,
    longestStreak: streak?.longestStreak ?? 0,
    lastActivityAt: streak?.lastActivityAt ?? null,
    xp: streak?.xp ?? 0,
    level: streak?.level ?? 1,
  };
}

/**
 * Get user gamification stats (for dashboard)
 */
export async function getUserGamificationStats(
  userId: string,
): Promise<UserGamificationStats> {
  const [totalBadges, unlockedBadges, streak] = await Promise.all([
    prisma.badge.count(),
    prisma.userBadge.count({ where: { userId } }),
    prisma.userStreak.findUnique({ where: { userId } }),
  ]);

  return {
    totalBadges,
    unlockedBadges,
    totalXp: streak?.xp ?? 0,
    level: streak?.level ?? 1,
    currentStreak: streak?.currentStreak ?? 0,
    longestStreak: streak?.longestStreak ?? 0,
  };
}

/**
 * Get all available badges (for badge catalog)
 */
export async function getAllBadges(): Promise<
  Omit<BadgeWithProgress, "isUnlocked" | "unlockedAt" | "progress">[]
> {
  const badges = await prisma.badge.findMany({
    orderBy: [{ category: "asc" }, { xpReward: "asc" }],
  });

  return badges.map((badge) => ({
    id: badge.id,
    key: badge.key,
    name: badge.name,
    description: badge.description,
    iconUrl: badge.iconUrl,
    category: badge.category as BadgeCategory,
    rarity: badge.rarity as BadgeRarity,
    xpReward: badge.xpReward,
    criteria: badge.criteria as { type: string; value: number } | null,
  }));
}

/**
 * Check if user has a specific badge
 */
export async function hasUserBadge(
  userId: string,
  badgeKey: string,
): Promise<boolean> {
  const userBadge = await prisma.userBadge.findFirst({
    where: {
      userId,
      badge: { key: badgeKey },
    },
  });
  return !!userBadge;
}

/**
 * Get user progress towards badges
 * Returns badges that are not yet unlocked with their current progress
 */
export async function getUserBadgeProgress(
  userId: string,
): Promise<{ badge: BadgeWithProgress; currentValue: number }[]> {
  // Get all badges not yet unlocked by user
  const unlockedKeys = await prisma.userBadge.findMany({
    where: { userId },
    select: { badge: { select: { key: true } } },
  });
  const unlockedKeySet = new Set(unlockedKeys.map((ub) => ub.badge.key));

  const badges = await prisma.badge.findMany({
    where: {
      key: { notIn: Array.from(unlockedKeySet) },
    },
  });

  // Get user stats for progress calculation
  const [feedbackCount, sessionCount, videoCount, streak] = await Promise.all([
    prisma.sessionFeedback.count({ where: { athleteId: userId } }),
    prisma.sessionFeedback.count({
      where: {
        athleteId: userId,
        session: { status: "FAITE" },
      },
    }),
    prisma.video.count({ where: { uploadedById: userId } }),
    prisma.userStreak.findUnique({ where: { userId } }),
  ]);

  return badges.map((badge) => {
    const criteria = badge.criteria as { type: string; value: number } | null;
    let currentValue = 0;
    let progress = 0;

    if (criteria) {
      switch (criteria.type) {
        case "streak":
          currentValue = streak?.currentStreak ?? 0;
          break;
        case "sessions":
          currentValue = sessionCount;
          break;
        case "feedbacks":
          currentValue = feedbackCount;
          break;
        case "video_upload":
          currentValue = videoCount;
          break;
        default:
          currentValue = 0;
      }
      progress = Math.min(
        100,
        Math.round((currentValue / criteria.value) * 100),
      );
    }

    return {
      badge: {
        id: badge.id,
        key: badge.key,
        name: badge.name,
        description: badge.description,
        iconUrl: badge.iconUrl,
        category: badge.category as BadgeCategory,
        rarity: badge.rarity as BadgeRarity,
        xpReward: badge.xpReward,
        criteria,
        isUnlocked: false,
        unlockedAt: null,
        progress,
      },
      currentValue,
    };
  });
}
