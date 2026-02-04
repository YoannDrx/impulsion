"use client";

import { cn } from "@/lib/utils";
import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type GlowTextProps = {
  children: ReactNode;
  className?: string;
  glowColor?: "lime" | "cyan" | "white";
  as?: "h1" | "h2" | "h3" | "p" | "span";
  animate?: boolean;
};

const glowColors = {
  lime: {
    text: "text-lime-400",
    shadow:
      "0 0 40px oklch(0.91 0.23 120 / 0.6), 0 0 80px oklch(0.91 0.23 120 / 0.3)",
    shadowDim:
      "0 0 20px oklch(0.91 0.23 120 / 0.3), 0 0 40px oklch(0.91 0.23 120 / 0.15)",
  },
  cyan: {
    text: "text-cyan-400",
    shadow:
      "0 0 40px oklch(0.85 0.16 195 / 0.6), 0 0 80px oklch(0.85 0.16 195 / 0.3)",
    shadowDim:
      "0 0 20px oklch(0.85 0.16 195 / 0.3), 0 0 40px oklch(0.85 0.16 195 / 0.15)",
  },
  white: {
    text: "text-white",
    shadow: "0 0 40px oklch(1 0 0 / 0.5), 0 0 80px oklch(1 0 0 / 0.25)",
    shadowDim: "0 0 20px oklch(1 0 0 / 0.25), 0 0 40px oklch(1 0 0 / 0.12)",
  },
};

export function GlowText({
  children,
  className,
  glowColor = "lime",
  as: Component = "span",
  animate = false,
}: GlowTextProps) {
  const colors = glowColors[glowColor];

  const glowVariants: Variants = {
    initial: {
      textShadow: colors.shadowDim,
    },
    animate: {
      textShadow: [colors.shadowDim, colors.shadow, colors.shadowDim],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  if (!animate) {
    return (
      <Component
        className={cn(colors.text, className)}
        style={{ textShadow: colors.shadow }}
      >
        {children}
      </Component>
    );
  }

  return (
    <motion.span
      className={cn(colors.text, className)}
      variants={glowVariants}
      initial="initial"
      animate="animate"
    >
      {children}
    </motion.span>
  );
}

type GlowHeadingProps = {
  children: ReactNode;
  className?: string;
  glowColor?: "lime" | "cyan" | "white";
  level?: 1 | 2 | 3;
  animate?: boolean;
};

export function GlowHeading({
  children,
  className,
  glowColor = "lime",
  level = 1,
  animate = false,
}: GlowHeadingProps) {
  const sizeClasses = {
    1: "text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight",
    2: "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight",
    3: "text-2xl md:text-3xl font-semibold tracking-tight",
  };

  const Component = `h${level}` as const;

  return (
    <GlowText
      as={Component}
      glowColor={glowColor}
      className={cn(sizeClasses[level], className)}
      animate={animate}
    >
      {children}
    </GlowText>
  );
}
