"use client";

import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import type { TeamDashboardData } from "@/query/team/get-team-dashboard.query";
import { AthletesList } from "./athletes-list";
import { InviteAthleteDialog } from "./invite-athlete-dialog";
import { PendingFeedbackList } from "./pending-feedback-list";
import { QuickActions } from "./quick-actions";
import { TeamStatsCards } from "./team-stats-cards";

type CoachDashboardProps = {
  orgSlug: string;
  orgName: string;
  dashboardData: TeamDashboardData;
};

export function CoachDashboard({
  orgSlug,
  orgName,
  dashboardData,
}: CoachDashboardProps) {
  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>{orgName}</LayoutTitle>
      </LayoutHeader>
      <LayoutActions>
        <InviteAthleteDialog />
      </LayoutActions>
      <LayoutContent className="flex flex-col gap-8">
        {/* Stats Cards */}
        <TeamStatsCards
          athleteCount={dashboardData.athleteCount}
          upcomingSessionsCount={dashboardData.upcomingSessionsCount}
          completedSessionsCount={dashboardData.completedSessionsCount}
          pendingFeedbackCount={dashboardData.pendingFeedbackCount}
        />

        {/* Pending Feedback */}
        <PendingFeedbackList
          sessions={dashboardData.pendingFeedbackSessions}
          orgSlug={orgSlug}
        />

        {/* Quick Actions */}
        <QuickActions orgSlug={orgSlug} />

        {/* Athletes List */}
        <AthletesList athletes={dashboardData.athletes} orgSlug={orgSlug} />
      </LayoutContent>
    </Layout>
  );
}
