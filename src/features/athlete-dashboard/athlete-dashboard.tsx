"use client";

import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { GamificationWidget } from "@/features/gamification/components";
import type {
  BadgeCategory,
  BadgeRarity,
  SessionStatus,
  SessionType,
} from "@/lib/impulsion/types";
import { AthleteStatsCards } from "./athlete-stats-cards";
import { MyTeamInfo } from "./my-team-info";
import { UpcomingSessions } from "./upcoming-sessions";

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

type TeamMember = {
  id: string;
  name: string;
  image: string | null;
  role: "owner" | "admin" | "member";
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

type AthleteDashboardProps = {
  orgSlug: string;
  orgName: string;
  athleteName: string;
  dashboardData: AthleteDashboardData;
};

export function AthleteDashboard({
  orgSlug,
  orgName,
  athleteName,
  dashboardData,
}: AthleteDashboardProps) {
  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Salut {athleteName.split(" ")[0]} !</LayoutTitle>
        <LayoutDescription>
          Voici ton programme d'entraînement
        </LayoutDescription>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-8">
        {/* Stats Cards */}
        <AthleteStatsCards
          upcomingSessionsCount={dashboardData.upcomingSessionsCount}
          completedThisWeek={dashboardData.completedThisWeek}
          currentStreak={dashboardData.currentStreak}
          averageRpe={dashboardData.averageRpe}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Upcoming Sessions - Takes 2 columns */}
          <div className="lg:col-span-2">
            <UpcomingSessions
              sessions={dashboardData.upcomingSessions}
              orgSlug={orgSlug}
            />
          </div>

          {/* Sidebar - Takes 1 column */}
          <div className="flex flex-col gap-6">
            {/* Gamification Widget */}
            {dashboardData.gamification && (
              <GamificationWidget
                currentStreak={dashboardData.gamification.currentStreak}
                longestStreak={dashboardData.gamification.longestStreak}
                xp={dashboardData.gamification.xp}
                level={dashboardData.gamification.level}
                recentBadges={dashboardData.gamification.recentBadges}
                totalBadges={dashboardData.gamification.totalBadges}
                unlockedBadges={dashboardData.gamification.unlockedBadges}
                orgSlug={orgSlug}
              />
            )}

            {/* Team Info */}
            <MyTeamInfo
              teamName={orgName}
              coach={dashboardData.coach}
              teammates={dashboardData.teammates}
            />
          </div>
        </div>
      </LayoutContent>
    </Layout>
  );
}
