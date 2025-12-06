"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Typography } from "@/components/nowts/typography";
import { cn } from "@/lib/utils";
import {
  BADGE_CATEGORY_LABELS,
  BADGE_RARITY_LABELS,
  type BadgeCategory,
  type BadgeRarity,
} from "@/lib/impulsion/types";
import type { Trophy } from "lucide-react";
import { Lock, Sparkles, Star, Zap } from "lucide-react";
import { motion } from "motion/react";
import type { BadgeWithProgress } from "@/query/gamification/get-user-gamification.query";

type BadgeCardProps = {
  badge: BadgeWithProgress;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
};

const rarityColors: Record<BadgeRarity, string> = {
  COMMUN: "border-muted-foreground/30 bg-muted/50",
  RARE: "border-blue-500/50 bg-blue-500/10",
  EPIQUE: "border-purple-500/50 bg-purple-500/10",
  LEGENDAIRE:
    "border-amber-500/50 bg-amber-500/10 shadow-[0_0_15px_var(--amber-500)/20]",
};

const rarityIconColors: Record<BadgeRarity, string> = {
  COMMUN: "text-muted-foreground",
  RARE: "text-blue-500",
  EPIQUE: "text-purple-500",
  LEGENDAIRE: "text-amber-500",
};

const categoryIcons: Record<BadgeCategory, typeof Trophy> = {
  REGULARITE: Zap,
  JALON: Star,
  SPECIAL: Sparkles,
};

export function BadgeCard({ badge, onClick, size = "md" }: BadgeCardProps) {
  const Icon = categoryIcons[badge.category];
  const isLocked = !badge.isUnlocked;

  const sizeClasses = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const iconSizes = {
    sm: "size-8",
    md: "size-12",
    lg: "size-16",
  };

  return (
    <motion.div
      whileHover={badge.isUnlocked ? { scale: 1.02 } : undefined}
      whileTap={badge.isUnlocked ? { scale: 0.98 } : undefined}
    >
      <Card
        className={cn(
          "relative cursor-pointer transition-all",
          sizeClasses[size],
          isLocked ? "opacity-60 grayscale" : rarityColors[badge.rarity],
          onClick && "hover:shadow-md",
        )}
        onClick={onClick}
      >
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/20">
            <Lock className="text-muted-foreground size-6" />
          </div>
        )}

        <div className="flex flex-col items-center gap-2 text-center">
          {/* Badge Icon */}
          <div
            className={cn(
              "flex items-center justify-center rounded-full p-3",
              isLocked ? "bg-muted" : "bg-background/50",
            )}
          >
            <Icon
              className={cn(
                iconSizes[size],
                isLocked
                  ? "text-muted-foreground"
                  : rarityIconColors[badge.rarity],
              )}
            />
          </div>

          {/* Badge Info */}
          <div className="space-y-1">
            <Typography variant="large" className="line-clamp-1">
              {badge.name}
            </Typography>
            <Typography variant="muted" className="line-clamp-2 text-xs">
              {badge.description}
            </Typography>
          </div>

          {/* Rarity Badge */}
          <div
            className={cn(
              "rounded-full px-2 py-0.5 text-xs font-medium",
              rarityColors[badge.rarity],
            )}
          >
            {BADGE_RARITY_LABELS[badge.rarity]}
          </div>

          {/* Progress (if not unlocked) */}
          {!badge.isUnlocked && badge.progress > 0 && (
            <div className="w-full space-y-1">
              <Progress value={badge.progress} className="h-1.5" />
              <Typography variant="muted" className="text-xs">
                {badge.progress}%
              </Typography>
            </div>
          )}

          {/* XP Reward */}
          <Typography variant="muted" className="text-xs">
            +{badge.xpReward} XP
          </Typography>

          {/* Category */}
          <Typography variant="muted" className="text-xs opacity-60">
            {BADGE_CATEGORY_LABELS[badge.category]}
          </Typography>
        </div>
      </Card>
    </motion.div>
  );
}
