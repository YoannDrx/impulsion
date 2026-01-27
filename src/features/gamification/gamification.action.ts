"use server";

import { authAction } from "@/lib/actions/safe-actions";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { nanoid } from "nanoid";

import {
  calculateLevel,
  isWithin24Hours,
  isYesterday,
  isToday,
} from "./gamification.utils";

// ============================================================================
// TYPES
// ============================================================================

type BadgeCriteria = {
  type: string;
  value: number;
};

type UnlockedBadge = {
  id: string;
  key: string;
  name: string;
  description: string;
  rarity: string;
  xpReward: number;
};

// ============================================================================
// ACTIONS
// ============================================================================

/**
 * Update user streak after activity (feedback submission)
 * - If last activity was today: no change
 * - If last activity was yesterday: increment streak
 * - If last activity was more than 1 day ago: reset streak to 1
 */
export const updateStreakAction = authAction
  .schema(z.object({}))
  .action(async ({ ctx }) => {
    const userId = ctx.user.id;

    // Get or create user streak
    let streak = await prisma.userStreak.findUnique({
      where: { userId },
    });

    const now = new Date();

    if (!streak) {
      // Create new streak
      streak = await prisma.userStreak.create({
        data: {
          id: nanoid(11),
          userId,
          currentStreak: 1,
          longestStreak: 1,
          lastActivityAt: now,
          xp: 0,
          level: 1,
        },
      });
      return { streak, isNewStreak: true };
    }

    // Check if already logged today
    if (streak.lastActivityAt && isToday(streak.lastActivityAt)) {
      return { streak, isNewStreak: false };
    }

    // Calculate new streak
    let newStreak = 1;
    if (streak.lastActivityAt) {
      if (
        isYesterday(streak.lastActivityAt) ||
        isWithin24Hours(streak.lastActivityAt)
      ) {
        newStreak = streak.currentStreak + 1;
      }
    }

    const newLongest = Math.max(streak.longestStreak, newStreak);

    // Update streak
    const updatedStreak = await prisma.userStreak.update({
      where: { userId },
      data: {
        currentStreak: newStreak,
        longestStreak: newLongest,
        lastActivityAt: now,
      },
    });

    return {
      streak: updatedStreak,
      isNewStreak: newStreak > streak.currentStreak,
      streakBroken: newStreak === 1 && streak.currentStreak > 1,
    };
  });

/**
 * Check and unlock badges based on user progress
 * Returns newly unlocked badges
 */
export const checkAndUnlockBadgesAction = authAction
  .schema(
    z.object({
      triggerType: z.enum([
        "feedback",
        "video",
        "session",
        "streak",
        "general",
      ]),
    }),
  )
  .action(async ({ ctx, parsedInput }) => {
    const userId = ctx.user.id;
    const { triggerType } = parsedInput;

    // Get badges user already has
    const existingBadges = await prisma.userBadge.findMany({
      where: { userId },
      select: { badge: { select: { key: true } } },
    });
    const existingKeys = new Set(existingBadges.map((ub) => ub.badge.key));

    // Get all badges
    const allBadges = await prisma.badge.findMany();

    // Get user stats for badge criteria checking
    const [feedbackCount, sessionCount, videoCount, streak, memberSince] =
      await Promise.all([
        prisma.sessionFeedback.count({ where: { athleteId: userId } }),
        prisma.sessionFeedback.count({
          where: {
            athleteId: userId,
            session: { status: "FAITE" },
          },
        }),
        prisma.video.count({ where: { uploadedById: userId } }),
        prisma.userStreak.findUnique({ where: { userId } }),
        prisma.member.findFirst({
          where: { userId },
          orderBy: { createdAt: "asc" },
          select: { createdAt: true },
        }),
      ]);

    const unlockedBadges: UnlockedBadge[] = [];
    let totalXpEarned = 0;

    // Check each badge
    for (const badge of allBadges) {
      // Skip if already unlocked
      if (existingKeys.has(badge.key)) continue;

      const criteria = badge.criteria as BadgeCriteria | null;
      if (!criteria) continue;

      let shouldUnlock = false;

      // Check criteria based on type
      switch (criteria.type) {
        case "streak":
          if (
            triggerType === "streak" ||
            triggerType === "feedback" ||
            triggerType === "general"
          ) {
            shouldUnlock = (streak?.currentStreak ?? 0) >= criteria.value;
          }
          break;

        case "sessions":
          if (triggerType === "session" || triggerType === "general") {
            shouldUnlock = sessionCount >= criteria.value;
          }
          break;

        case "feedbacks":
          if (triggerType === "feedback" || triggerType === "general") {
            shouldUnlock = feedbackCount >= criteria.value;
          }
          break;

        case "video_upload":
          if (triggerType === "video" || triggerType === "general") {
            shouldUnlock = videoCount >= criteria.value;
          }
          break;

        case "team_tenure":
          if (triggerType === "general" && memberSince) {
            const daysSinceJoin = Math.floor(
              (Date.now() - memberSince.createdAt.getTime()) /
                (1000 * 60 * 60 * 24),
            );
            shouldUnlock = daysSinceJoin >= criteria.value;
          }
          break;
      }

      if (shouldUnlock) {
        unlockedBadges.push({
          id: badge.id,
          key: badge.key,
          name: badge.name,
          description: badge.description,
          rarity: badge.rarity,
          xpReward: badge.xpReward,
        });

        totalXpEarned += badge.xpReward;
      }
    }

    // Create all user badges in parallel
    if (unlockedBadges.length > 0) {
      await Promise.all(
        unlockedBadges.map(async (badge) =>
          prisma.userBadge.create({
            data: {
              id: nanoid(11),
              userId,
              badgeId: badge.id,
              progress: 100,
            },
          }),
        ),
      );
    }

    // Update user XP and level if badges were unlocked
    if (totalXpEarned > 0 && streak) {
      const newXp = streak.xp + totalXpEarned;
      const newLevel = calculateLevel(newXp);

      await prisma.userStreak.update({
        where: { userId },
        data: {
          xp: newXp,
          level: newLevel,
        },
      });
    } else if (totalXpEarned > 0) {
      // Create streak record if it doesn't exist
      const newLevel = calculateLevel(totalXpEarned);
      await prisma.userStreak.create({
        data: {
          id: nanoid(11),
          userId,
          currentStreak: 0,
          longestStreak: 0,
          xp: totalXpEarned,
          level: newLevel,
        },
      });
    }

    // Create notifications for unlocked badges
    if (unlockedBadges.length > 0) {
      await prisma.notification.createMany({
        data: unlockedBadges.map((badge) => ({
          id: nanoid(11),
          userId,
          type: "BADGE_UNLOCK",
          title: `Badge debloqu\u00e9 : ${badge.name}`,
          message: badge.description,
          link: "/badges",
        })),
      });
    }

    return {
      unlockedBadges,
      totalXpEarned,
      badgesCount: unlockedBadges.length,
    };
  });

/**
 * Combined action for after feedback submission
 * Updates streak and checks for badges
 */
export const processGamificationAfterFeedbackAction = authAction
  .schema(z.object({}))
  .action(async ({ ctx }) => {
    const userId = ctx.user.id;

    // Update streak first
    let streak = await prisma.userStreak.findUnique({
      where: { userId },
    });

    const now = new Date();

    if (!streak) {
      streak = await prisma.userStreak.create({
        data: {
          id: nanoid(11),
          userId,
          currentStreak: 1,
          longestStreak: 1,
          lastActivityAt: now,
          xp: 0,
          level: 1,
        },
      });
    } else if (!streak.lastActivityAt || !isToday(streak.lastActivityAt)) {
      let newStreak = 1;
      if (
        streak.lastActivityAt &&
        (isYesterday(streak.lastActivityAt) ||
          isWithin24Hours(streak.lastActivityAt))
      ) {
        newStreak = streak.currentStreak + 1;
      }

      streak = await prisma.userStreak.update({
        where: { userId },
        data: {
          currentStreak: newStreak,
          longestStreak: Math.max(streak.longestStreak, newStreak),
          lastActivityAt: now,
        },
      });
    }

    // Check badges
    const existingBadges = await prisma.userBadge.findMany({
      where: { userId },
      select: { badge: { select: { key: true } } },
    });
    const existingKeys = new Set(existingBadges.map((ub) => ub.badge.key));

    const allBadges = await prisma.badge.findMany();

    const [feedbackCount, sessionCount] = await Promise.all([
      prisma.sessionFeedback.count({ where: { athleteId: userId } }),
      prisma.sessionFeedback.count({
        where: { athleteId: userId, session: { status: "FAITE" } },
      }),
    ]);

    const unlockedBadges: UnlockedBadge[] = [];
    let totalXpEarned = 0;

    for (const badge of allBadges) {
      if (existingKeys.has(badge.key)) continue;

      const criteria = badge.criteria as BadgeCriteria | null;
      if (!criteria) continue;

      let shouldUnlock = false;

      switch (criteria.type) {
        case "streak":
          shouldUnlock = streak.currentStreak >= criteria.value;
          break;
        case "sessions":
          shouldUnlock = sessionCount >= criteria.value;
          break;
        case "feedbacks":
          shouldUnlock = feedbackCount >= criteria.value;
          break;
      }

      if (shouldUnlock) {
        unlockedBadges.push({
          id: badge.id,
          key: badge.key,
          name: badge.name,
          description: badge.description,
          rarity: badge.rarity,
          xpReward: badge.xpReward,
        });

        totalXpEarned += badge.xpReward;
      }
    }

    // Create all user badges in parallel
    if (unlockedBadges.length > 0) {
      await Promise.all(
        unlockedBadges.map(async (badge) =>
          prisma.userBadge.create({
            data: {
              id: nanoid(11),
              userId,
              badgeId: badge.id,
              progress: 100,
            },
          }),
        ),
      );
    }

    // Update XP
    if (totalXpEarned > 0) {
      const newXp = streak.xp + totalXpEarned;
      await prisma.userStreak.update({
        where: { userId },
        data: {
          xp: newXp,
          level: calculateLevel(newXp),
        },
      });
    }

    // Create notifications
    if (unlockedBadges.length > 0) {
      await prisma.notification.createMany({
        data: unlockedBadges.map((badge) => ({
          id: nanoid(11),
          userId,
          type: "BADGE_UNLOCK",
          title: `Badge debloqu\u00e9 : ${badge.name}`,
          message: badge.description,
          link: "/badges",
        })),
      });
    }

    return {
      streak: {
        currentStreak: streak.currentStreak,
        longestStreak: streak.longestStreak,
      },
      unlockedBadges,
      totalXpEarned,
    };
  });
