"use client";

import { Typography } from "@/components/nowts/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Award, ChevronRight, Flame, Trophy } from "lucide-react";
import Link from "next/link";
import type { BadgeWithProgress } from "@/query/gamification/get-user-gamification.query";
import { BadgeCard } from "./badge-card";

type GamificationWidgetProps = {
  currentStreak: number;
  longestStreak: number;
  xp: number;
  level: number;
  recentBadges: BadgeWithProgress[];
  totalBadges: number;
  unlockedBadges: number;
  orgSlug: string;
  className?: string;
};

export function GamificationWidget({
  currentStreak,
  longestStreak,
  xp,
  level,
  recentBadges,
  totalBadges,
  unlockedBadges,
  orgSlug,
  className,
}: GamificationWidgetProps) {
  const isActive = currentStreak > 0;

  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Trophy className="text-primary size-5" />
          Progression
        </CardTitle>
        <Link href={`/orgs/${orgSlug}/badges`}>
          <Button variant="ghost" size="sm" className="gap-1">
            Voir tout
            <ChevronRight className="size-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Streak & Level */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5",
                isActive
                  ? "bg-orange-500/10 text-orange-500"
                  : "bg-muted text-muted-foreground",
              )}
            >
              <Flame className="size-4" />
              <span className="font-bold tabular-nums">{currentStreak}</span>
              <span className="text-xs">jours</span>
            </div>
            {longestStreak > currentStreak && (
              <Typography variant="muted" className="text-xs">
                Record: {longestStreak}
              </Typography>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <Typography variant="muted" className="text-xs">
                Niveau
              </Typography>
              <Typography variant="large" className="font-bold">
                {level}
              </Typography>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5">
            <Award className="text-muted-foreground size-4" />
            <span>
              {unlockedBadges}/{totalBadges} badges
            </span>
          </div>
          <Typography variant="muted">{xp.toLocaleString()} XP</Typography>
        </div>

        {/* Recent Badges */}
        {recentBadges.length > 0 && (
          <div className="space-y-2">
            <Typography variant="muted" className="text-xs">
              Badges recents
            </Typography>
            <div className="grid grid-cols-3 gap-2">
              {recentBadges.slice(0, 3).map((badge) => (
                <BadgeCard key={badge.id} badge={badge} size="sm" />
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {recentBadges.length === 0 && (
          <div className="text-muted-foreground py-4 text-center text-sm">
            <Award className="mx-auto mb-2 size-8 opacity-50" />
            <p>Aucun badge pour l'instant</p>
            <p className="text-xs">Continue a t'entrainer !</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
