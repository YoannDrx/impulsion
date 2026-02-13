"use client";

import { StatCard, StatCardGrid } from "@/components/impulsion/stat-card";
import { Calendar, CheckCircle2, Flame, TrendingUp } from "lucide-react";

type AthleteStatsCardsProps = {
  upcomingSessionsCount: number;
  completedThisWeek: number;
  currentStreak: number;
  averageRpe: number | null;
};

export function AthleteStatsCards({
  upcomingSessionsCount,
  completedThisWeek,
  currentStreak,
  averageRpe,
}: AthleteStatsCardsProps) {
  return (
    <StatCardGrid>
      <StatCard
        label="À venir"
        value={upcomingSessionsCount}
        unit="séances"
        icon={<Calendar className="size-4" />}
        accent="lime"
        animateValue
      />
      <StatCard
        label="Cette semaine"
        value={completedThisWeek}
        unit="faites"
        icon={<CheckCircle2 className="size-4" />}
        accent="success"
        animateValue
      />
      <StatCard
        label="Streak"
        value={currentStreak}
        unit="semaines"
        icon={<TrendingUp className="size-4" />}
        accent="cyan"
        animateValue
      />
      <StatCard
        label="RPE moyen"
        value={averageRpe ?? "-"}
        icon={<Flame className="size-4" />}
        accent="warning"
        animateValue
      />
    </StatCardGrid>
  );
}
