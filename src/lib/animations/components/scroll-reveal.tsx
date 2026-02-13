"use client";

import { motion, type Variants } from "motion/react";
import type * as React from "react";

import { cn } from "@/lib/utils";

import { useInViewAnimation } from "../hooks/use-in-view-animation";
import { fadeInUp, fadeInDown, fadeInLeft, fadeInRight } from "../variants";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Direction of the reveal animation */
  direction?: "up" | "down" | "left" | "right";
  /** Delay before animation starts (in seconds) */
  delay?: number;
  /** Duration of the animation (in seconds) */
  duration?: number;
  /** How much of the element should be visible before triggering (0-1) */
  threshold?: number;
  /** Whether to animate only once or every time element enters viewport */
  once?: boolean;
  /** Custom variants to use instead of default */
  variants?: Variants;
  /** HTML tag to render */
  as?:
    | "div"
    | "section"
    | "article"
    | "aside"
    | "main"
    | "header"
    | "footer"
    | "span";
};

const directionVariants = {
  up: fadeInUp,
  down: fadeInDown,
  left: fadeInLeft,
  right: fadeInRight,
};

/**
 * Composant wrapper pour animer les éléments au scroll
 *
 * @example
 * ```tsx
 * <ScrollReveal direction="up" delay={0.2}>
 *   <Card>Content that animates in</Card>
 * </ScrollReveal>
 * ```
 */
export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration,
  threshold = 0.2,
  once = true,
  variants,
  as = "div",
}: ScrollRevealProps) {
  const { ref, isInView } = useInViewAnimation({
    once,
    amount: threshold,
  });

  const selectedVariants = variants ?? directionVariants[direction];
  const Component = motion[as as keyof typeof motion] as typeof motion.div;

  // Merge custom duration/delay with variants
  const customTransition = {
    ...(duration && { duration }),
    ...(delay && { delay }),
  };

  return (
    <Component
      ref={ref}
      className={cn(className)}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={selectedVariants}
      transition={customTransition}
    >
      {children}
    </Component>
  );
}

/**
 * Version avec effet de blur - signature Impulsion
 */
export function ScrollRevealBlur({
  children,
  className,
  delay = 0,
  threshold = 0.2,
  once = true,
}: Omit<ScrollRevealProps, "direction" | "variants">) {
  const { ref, isInView } = useInViewAnimation({
    once,
    amount: threshold,
  });

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={
        isInView
          ? { opacity: 1, filter: "blur(0px)" }
          : { opacity: 0, filter: "blur(10px)" }
      }
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Version avec effet de scale
 */
export function ScrollRevealScale({
  children,
  className,
  delay = 0,
  threshold = 0.2,
  once = true,
}: Omit<ScrollRevealProps, "direction" | "variants">) {
  const { ref, isInView } = useInViewAnimation({
    once,
    amount: threshold,
  });

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
