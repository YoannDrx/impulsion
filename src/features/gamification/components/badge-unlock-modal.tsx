"use client";

import { Typography } from "@/components/nowts/typography";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { BADGE_RARITY_LABELS, type BadgeRarity } from "@/lib/impulsion/types";
import { Sparkles, Star, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import {
  badgeUnlockContainer,
  badgeIconUnlock,
  badgeTitle,
  badgeDescription,
  badgeGlowPulse,
  badgeRing,
  generateParticlePositions,
  badgeParticle,
} from "../animations/badge-unlock";
import { badgeUnlockedConfetti } from "../animations/confetti";

type UnlockedBadgeData = {
  id: string;
  key: string;
  name: string;
  description: string;
  rarity: string;
  xpReward: number;
};

type BadgeUnlockModalProps = {
  badge: UnlockedBadgeData | null;
  open: boolean;
  onClose: () => void;
};

const rarityColors: Record<BadgeRarity, string> = {
  COMMUN: "text-muted-foreground border-muted-foreground/30",
  RARE: "text-blue-500 border-blue-500/50",
  EPIQUE: "text-purple-500 border-purple-500/50",
  LEGENDAIRE: "text-amber-500 border-amber-500/50",
};

const rarityGlows: Record<BadgeRarity, string> = {
  COMMUN: "",
  RARE: "shadow-[0_0_30px_rgba(59,130,246,0.5)]",
  EPIQUE: "shadow-[0_0_40px_rgba(168,85,247,0.6)]",
  LEGENDAIRE: "shadow-[0_0_50px_rgba(245,158,11,0.7)]",
};

const categoryIcons = {
  REGULARITE: Zap,
  JALON: Star,
  SPECIAL: Sparkles,
};

export function BadgeUnlockModal({
  badge,
  open,
  onClose,
}: BadgeUnlockModalProps) {
  const particles = generateParticlePositions(12);

  useEffect(() => {
    if (open && badge) {
      // Trigger confetti after a short delay
      const timer = setTimeout(() => {
        void badgeUnlockedConfetti();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open, badge]);

  if (!badge) return null;

  const rarity = badge.rarity as BadgeRarity;
  const Icon = categoryIcons.SPECIAL;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="overflow-hidden sm:max-w-md">
        <DialogHeader className="sr-only">
          <DialogTitle>Badge Debloque</DialogTitle>
          <DialogDescription>
            Vous avez debloque le badge {badge.name}
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              className="flex flex-col items-center py-8"
              variants={badgeUnlockContainer}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* Badge Icon Container */}
              <div className="relative mb-6">
                {/* Particles */}
                {particles.map((particle, i) => (
                  <motion.div
                    key={i}
                    className="bg-primary absolute top-1/2 left-1/2 size-2 rounded-full"
                    variants={badgeParticle}
                    custom={particle}
                  />
                ))}

                {/* Ring Effect */}
                <motion.div
                  className={cn(
                    "absolute -inset-4 rounded-full border-2",
                    rarityColors[rarity],
                  )}
                  variants={badgeRing}
                />

                {/* Badge Icon */}
                <motion.div
                  className={cn(
                    "relative flex size-24 items-center justify-center rounded-full border-2",
                    rarityColors[rarity],
                    rarityGlows[rarity],
                  )}
                  variants={badgeIconUnlock}
                >
                  <motion.div variants={badgeGlowPulse}>
                    <Icon className={cn("size-12", rarityColors[rarity])} />
                  </motion.div>
                </motion.div>
              </div>

              {/* Badge Name */}
              <motion.div variants={badgeTitle}>
                <Typography variant="h2" className="text-center">
                  {badge.name}
                </Typography>
              </motion.div>

              {/* Rarity */}
              <motion.div variants={badgeTitle}>
                <span
                  className={cn(
                    "mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium",
                    rarityColors[rarity],
                    "bg-background/50 border",
                  )}
                >
                  {BADGE_RARITY_LABELS[rarity]}
                </span>
              </motion.div>

              {/* Description */}
              <motion.div variants={badgeDescription} className="mt-4">
                <Typography
                  variant="muted"
                  className="max-w-sm text-center text-base"
                >
                  {badge.description}
                </Typography>
              </motion.div>

              {/* XP Reward */}
              <motion.div
                variants={badgeDescription}
                className="mt-4 flex items-center gap-2"
              >
                <Sparkles className="text-primary size-5" />
                <Typography variant="large" className="text-primary">
                  +{badge.xpReward} XP
                </Typography>
              </motion.div>

              {/* Close Button */}
              <motion.div variants={badgeDescription} className="mt-8">
                <Button onClick={onClose} size="lg">
                  Super !
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Hook to manage badge unlock modal state
 */
export function useBadgeUnlockModal() {
  const [badge, setBadge] = useState<UnlockedBadgeData | null>(null);
  const [open, setOpen] = useState(false);

  const showBadge = (newBadge: UnlockedBadgeData) => {
    setBadge(newBadge);
    setOpen(true);
  };

  const closeBadge = () => {
    setOpen(false);
    // Clear badge after animation
    setTimeout(() => setBadge(null), 300);
  };

  return {
    badge,
    open,
    showBadge,
    closeBadge,
  };
}
