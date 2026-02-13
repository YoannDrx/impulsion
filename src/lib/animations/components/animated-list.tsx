"use client";

import { motion, AnimatePresence, type Variants } from "motion/react";
import { Children, isValidElement, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import {
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,
  staggerItem,
  staggerItemScale,
  staggerItemSlideLeft,
  staggerItemSlideRight,
  gridContainer,
  gridItem,
} from "../variants";

type AnimatedListProps = {
  children: ReactNode;
  className?: string;
  /** Stagger speed preset */
  speed?: "fast" | "normal" | "slow";
  /** Item animation style */
  itemStyle?: "fade" | "scale" | "slideLeft" | "slideRight";
  /** Custom container variants */
  containerVariants?: Variants;
  /** Custom item variants */
  itemVariants?: Variants;
  /** Enable AnimatePresence for exit animations */
  enableExitAnimation?: boolean;
};

const speedVariants = {
  fast: staggerContainerFast,
  normal: staggerContainer,
  slow: staggerContainerSlow,
};

const itemStyleVariants = {
  fade: staggerItem,
  scale: staggerItemScale,
  slideLeft: staggerItemSlideLeft,
  slideRight: staggerItemSlideRight,
};

/**
 * Container pour listes animées avec stagger
 *
 * @example
 * ```tsx
 * <AnimatedList speed="fast" itemStyle="scale">
 *   {items.map((item) => (
 *     <AnimatedListItem key={item.id}>
 *       <Card>{item.content}</Card>
 *     </AnimatedListItem>
 *   ))}
 * </AnimatedList>
 * ```
 */
export function AnimatedList({
  children,
  className,
  speed = "normal",
  itemStyle = "fade",
  containerVariants,
  itemVariants,
  enableExitAnimation = false,
}: AnimatedListProps) {
  const selectedContainerVariants = containerVariants ?? speedVariants[speed];
  const selectedItemVariants = itemVariants ?? itemStyleVariants[itemStyle];

  const content = (
    <motion.div
      className={cn("flex flex-col", className)}
      initial="initial"
      animate="animate"
      exit={enableExitAnimation ? "exit" : undefined}
      variants={selectedContainerVariants}
    >
      {Children.map(children, async (child) => {
        if (!isValidElement(child)) return child;

        return <motion.div variants={selectedItemVariants}>{child}</motion.div>;
      })}
    </motion.div>
  );

  if (enableExitAnimation) {
    return <AnimatePresence mode="wait">{content}</AnimatePresence>;
  }

  return content;
}

type AnimatedListItemProps = {
  children: ReactNode;
  className?: string;
  /** Custom variants for this specific item */
  variants?: Variants;
};

/**
 * Item individuel pour AnimatedList
 * Utile quand vous avez besoin de plus de contrôle sur chaque item
 */
export function AnimatedListItem({
  children,
  className,
  variants,
}: AnimatedListItemProps) {
  return (
    <motion.div className={cn(className)} variants={variants ?? staggerItem}>
      {children}
    </motion.div>
  );
}

type AnimatedGridProps = {
  children: ReactNode;
  className?: string;
  /** Number of columns */
  columns?: 2 | 3 | 4;
  /** Gap between items */
  gap?: "sm" | "md" | "lg";
  /** Custom container variants */
  containerVariants?: Variants;
  /** Custom item variants */
  itemVariants?: Variants;
};

const gapClasses = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
};

const columnClasses = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

/**
 * Grille animée avec stagger
 *
 * @example
 * ```tsx
 * <AnimatedGrid columns={3} gap="md">
 *   {items.map((item) => (
 *     <Card key={item.id}>{item.content}</Card>
 *   ))}
 * </AnimatedGrid>
 * ```
 */
export function AnimatedGrid({
  children,
  className,
  columns = 3,
  gap = "md",
  containerVariants,
  itemVariants,
}: AnimatedGridProps) {
  return (
    <motion.div
      className={cn("grid", columnClasses[columns], gapClasses[gap], className)}
      initial="initial"
      animate="animate"
      variants={containerVariants ?? gridContainer}
    >
      {Children.map(children, async (child) => {
        if (!isValidElement(child)) return child;

        return (
          <motion.div variants={itemVariants ?? gridItem}>{child}</motion.div>
        );
      })}
    </motion.div>
  );
}
