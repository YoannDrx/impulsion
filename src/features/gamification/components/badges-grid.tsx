"use client";

import { Typography } from "@/components/nowts/typography";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BADGE_CATEGORIES,
  BADGE_CATEGORY_LABELS,
  type BadgeCategory,
} from "@/lib/impulsion/types";
import { motion } from "motion/react";
import { useState } from "react";
import type { BadgeWithProgress } from "@/query/gamification/get-user-gamification.query";
import { BadgeCard } from "./badge-card";

type BadgesGridProps = {
  badges: BadgeWithProgress[];
  onBadgeClick?: (badge: BadgeWithProgress) => void;
  showFilters?: boolean;
  columns?: 2 | 3 | 4;
  className?: string;
};

export function BadgesGrid({
  badges,
  onBadgeClick,
  showFilters = true,
  columns = 3,
  className,
}: BadgesGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    BadgeCategory | "all"
  >("all");

  const filteredBadges =
    selectedCategory === "all"
      ? badges
      : badges.filter((b) => b.category === selectedCategory);

  const categories = Object.values(BADGE_CATEGORIES) as BadgeCategory[];

  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
          >
            Tous ({badges.length})
          </Button>
          {categories.map((category) => {
            const count = badges.filter((b) => b.category === category).length;
            return (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {BADGE_CATEGORY_LABELS[category]} ({count})
              </Button>
            );
          })}
        </div>
      )}

      {/* Grid */}
      {filteredBadges.length > 0 ? (
        <motion.div
          className={cn("grid gap-4", gridCols[columns])}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {filteredBadges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <BadgeCard
                badge={badge}
                onClick={() => onBadgeClick?.(badge)}
                size="md"
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-muted-foreground py-12 text-center">
          <Typography variant="muted">
            Aucun badge dans cette categorie
          </Typography>
        </div>
      )}
    </div>
  );
}

type BadgesByCategoryProps = {
  badges: BadgeWithProgress[];
  onBadgeClick?: (badge: BadgeWithProgress) => void;
  className?: string;
};

/**
 * Display badges grouped by category with section headers
 */
export function BadgesByCategory({
  badges,
  onBadgeClick,
  className,
}: BadgesByCategoryProps) {
  const categories = Object.values(BADGE_CATEGORIES) as BadgeCategory[];

  const badgesByCategory = categories.map((category) => ({
    category,
    badges: badges.filter((b) => b.category === category),
  }));

  return (
    <div className={cn("space-y-8", className)}>
      {badgesByCategory.map(({ category, badges: categoryBadges }) => (
        <div key={category} className="space-y-4">
          <div className="flex items-center justify-between">
            <Typography variant="h3">
              {BADGE_CATEGORY_LABELS[category]}
            </Typography>
            <Typography variant="muted" className="text-sm">
              {categoryBadges.filter((b) => b.isUnlocked).length}/
              {categoryBadges.length} debloques
            </Typography>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {categoryBadges.map((badge) => (
              <BadgeCard
                key={badge.id}
                badge={badge}
                onClick={() => onBadgeClick?.(badge)}
                size="md"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
