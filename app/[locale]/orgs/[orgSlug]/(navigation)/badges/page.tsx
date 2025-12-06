import { Typography } from "@/components/nowts/typography";
import { BadgesByCategory } from "@/features/gamification/components/badges-grid";
import { StreakWidget } from "@/features/gamification/components/streak-display";
import { getRequiredCurrentOrgCache } from "@/lib/react/cache";
import {
  getUserBadges,
  getUserGamificationStats,
} from "@/query/gamification/get-user-gamification.query";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<BadgesPageSkeleton />}>
      <BadgesPage />
    </Suspense>
  );
}

async function BadgesPage() {
  const org = await getRequiredCurrentOrgCache();
  const userId = org.user.id;

  const [badges, stats] = await Promise.all([
    getUserBadges(userId),
    getUserGamificationStats(userId),
  ]);

  return (
    <div className="container mx-auto space-y-8 py-8">
      {/* Header */}
      <div className="space-y-2">
        <Typography variant="h1">Mes Badges</Typography>
        <Typography variant="muted">
          Debloquez des badges en completant des defis et en restant regulier
        </Typography>
      </div>

      {/* Stats Widget */}
      <StreakWidget
        currentStreak={stats.currentStreak}
        longestStreak={stats.longestStreak}
        xp={stats.totalXp}
        level={stats.level}
      />

      {/* Progress Summary */}
      <div className="bg-card flex items-center justify-between rounded-lg border p-4">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <Typography variant="h2" className="text-primary">
              {stats.unlockedBadges}
            </Typography>
            <Typography variant="muted" className="text-xs">
              Debloques
            </Typography>
          </div>
          <div className="bg-border h-8 w-px" />
          <div className="text-center">
            <Typography variant="h2" className="text-muted-foreground">
              {stats.totalBadges - stats.unlockedBadges}
            </Typography>
            <Typography variant="muted" className="text-xs">
              A debloquer
            </Typography>
          </div>
        </div>
        <div className="text-right">
          <Typography variant="muted" className="text-sm">
            Progression
          </Typography>
          <Typography variant="large">
            {Math.round((stats.unlockedBadges / stats.totalBadges) * 100)}%
          </Typography>
        </div>
      </div>

      {/* Badges Grid */}
      <BadgesByCategory badges={badges} />
    </div>
  );
}

function BadgesPageSkeleton() {
  return (
    <div className="container mx-auto space-y-8 py-8">
      <div className="space-y-2">
        <div className="bg-muted h-10 w-48 animate-pulse rounded" />
        <div className="bg-muted h-5 w-96 animate-pulse rounded" />
      </div>
      <div className="bg-muted h-24 animate-pulse rounded-lg" />
      <div className="bg-muted h-20 animate-pulse rounded-lg" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-muted h-48 animate-pulse rounded-lg" />
        ))}
      </div>
    </div>
  );
}
