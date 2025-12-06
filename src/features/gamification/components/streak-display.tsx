"use client";

import { Typography } from "@/components/nowts/typography";
import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";
import { motion } from "motion/react";
import {
  streakContainer,
  streakCounter,
  streakFlame,
  streakPulse,
} from "../animations/streak";

type StreakDisplayProps = {
  currentStreak: number;
  longestStreak?: number;
  size?: "sm" | "md" | "lg";
  showLongest?: boolean;
  animated?: boolean;
  className?: string;
};

export function StreakDisplay({
  currentStreak,
  longestStreak,
  size = "md",
  showLongest = false,
  animated = true,
  className,
}: StreakDisplayProps) {
  const isActive = currentStreak > 0;

  const sizeClasses = {
    sm: {
      container: "gap-1",
      icon: "size-4",
      text: "text-lg",
      label: "text-xs",
    },
    md: {
      container: "gap-2",
      icon: "size-6",
      text: "text-2xl",
      label: "text-sm",
    },
    lg: {
      container: "gap-3",
      icon: "size-10",
      text: "text-4xl",
      label: "text-base",
    },
  };

  const sizes = sizeClasses[size];

  const Container = animated ? motion.div : "div";
  const IconContainer = animated ? motion.div : "div";
  const CounterContainer = animated ? motion.div : "div";

  return (
    <Container
      className={cn("flex items-center", sizes.container, className)}
      {...(animated && {
        variants: streakContainer,
        initial: "initial",
        animate: "animate",
      })}
    >
      {/* Flame Icon */}
      <IconContainer
        className={cn(
          "relative",
          isActive ? "text-orange-500" : "text-muted-foreground",
        )}
        {...(animated &&
          isActive && {
            variants: streakFlame,
          })}
      >
        {isActive && animated && (
          <motion.div
            className="absolute inset-0"
            variants={streakPulse}
            animate="animate"
          >
            <Flame className={cn(sizes.icon, "text-orange-500/50")} />
          </motion.div>
        )}
        <Flame className={sizes.icon} />
      </IconContainer>

      {/* Counter */}
      <div className="flex flex-col">
        <CounterContainer
          className="flex items-baseline gap-1"
          {...(animated && {
            variants: streakCounter,
          })}
        >
          <Typography
            variant="code"
            className={cn(
              sizes.text,
              "font-bold tabular-nums",
              isActive ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {currentStreak}
          </Typography>
          <Typography variant="muted" className={sizes.label}>
            {currentStreak === 1 ? "jour" : "jours"}
          </Typography>
        </CounterContainer>

        {/* Longest streak */}
        {showLongest && longestStreak !== undefined && longestStreak > 0 && (
          <Typography variant="muted" className="text-xs">
            Record: {longestStreak} jours
          </Typography>
        )}
      </div>
    </Container>
  );
}

type StreakWidgetProps = {
  currentStreak: number;
  longestStreak: number;
  xp: number;
  level: number;
  className?: string;
};

export function StreakWidget({
  currentStreak,
  longestStreak,
  xp,
  level,
  className,
}: StreakWidgetProps) {
  return (
    <div
      className={cn(
        "bg-card flex items-center justify-between rounded-lg border p-4",
        className,
      )}
    >
      <StreakDisplay
        currentStreak={currentStreak}
        longestStreak={longestStreak}
        showLongest
        size="md"
      />

      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-2">
          <Typography variant="muted" className="text-sm">
            Niveau
          </Typography>
          <Typography variant="large" className="font-bold">
            {level}
          </Typography>
        </div>
        <Typography variant="muted" className="text-xs">
          {xp.toLocaleString()} XP
        </Typography>
      </div>
    </div>
  );
}
