"use client";

import {
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "motion/react";
import { useRef, type RefObject } from "react";

type ScrollAnimationOptions = {
  /** Offset from start of element entering viewport [0-1] */
  start?: number;
  /** Offset from end of element leaving viewport [0-1] */
  end?: number;
  /** Apply spring smoothing to the animation */
  smooth?: boolean;
  /** Spring stiffness (only if smooth is true) */
  stiffness?: number;
  /** Spring damping (only if smooth is true) */
  damping?: number;
};

/**
 * Hook pour créer des animations basées sur le scroll
 *
 * @example
 * ```tsx
 * function ParallaxSection() {
 *   const { ref, scrollYProgress } = useScrollAnimation();
 *   const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
 *
 *   return (
 *     <motion.div ref={ref} style={{ y }}>
 *       Parallax content
 *     </motion.div>
 *   );
 * }
 * ```
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: ScrollAnimationOptions = {},
): {
  ref: RefObject<T | null>;
  scrollYProgress: MotionValue<number>;
  scrollXProgress: MotionValue<number>;
} {
  const {
    start = 0,
    end = 1,
    smooth = false,
    stiffness = 100,
    damping = 30,
  } = options;

  const ref = useRef<T>(null);

  const { scrollYProgress: rawScrollYProgress, scrollXProgress } = useScroll({
    target: ref,
    offset: [`start ${end}`, `end ${start}`],
  });

  const smoothScrollYProgress = useSpring(rawScrollYProgress, {
    stiffness,
    damping,
  });

  return {
    ref,
    scrollYProgress: smooth ? smoothScrollYProgress : rawScrollYProgress,
    scrollXProgress,
  };
}

/**
 * Hook pour créer un effet parallax
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  distance = 100,
  options: ScrollAnimationOptions = {},
): {
  ref: RefObject<T | null>;
  y: MotionValue<number>;
} {
  const { ref, scrollYProgress } = useScrollAnimation<T>({
    smooth: true,
    ...options,
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return { ref, y };
}

/**
 * Hook pour créer un effet de fade basé sur le scroll
 */
export function useScrollFade<T extends HTMLElement = HTMLDivElement>(
  options: ScrollAnimationOptions = {},
): {
  ref: RefObject<T | null>;
  opacity: MotionValue<number>;
} {
  const { ref, scrollYProgress } = useScrollAnimation<T>(options);

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return { ref, opacity };
}

/**
 * Hook pour créer un effet de scale basé sur le scroll
 */
export function useScrollScale<T extends HTMLElement = HTMLDivElement>(
  minScale = 0.8,
  maxScale = 1,
  options: ScrollAnimationOptions = {},
): {
  ref: RefObject<T | null>;
  scale: MotionValue<number>;
} {
  const { ref, scrollYProgress } = useScrollAnimation<T>(options);

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [minScale, maxScale, minScale],
  );

  return { ref, scale };
}

/**
 * Hook pour créer un effet de rotation basé sur le scroll
 */
export function useScrollRotate<T extends HTMLElement = HTMLDivElement>(
  degrees = 360,
  options: ScrollAnimationOptions = {},
): {
  ref: RefObject<T | null>;
  rotate: MotionValue<number>;
} {
  const { ref, scrollYProgress } = useScrollAnimation<T>(options);

  const rotate = useTransform(scrollYProgress, [0, 1], [0, degrees]);

  return { ref, rotate };
}

/**
 * Hook pour créer un effet de reveal progressif
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  direction: "up" | "down" | "left" | "right" = "up",
  distance = 50,
  options: ScrollAnimationOptions = {},
): {
  ref: RefObject<T | null>;
  opacity: MotionValue<number>;
  x: MotionValue<number>;
  y: MotionValue<number>;
} {
  const { ref, scrollYProgress } = useScrollAnimation<T>(options);

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const getTransform = () => {
    switch (direction) {
      case "up":
        return { x: 0, y: distance };
      case "down":
        return { x: 0, y: -distance };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
    }
  };

  const { x: startX, y: startY } = getTransform();

  const x = useTransform(scrollYProgress, [0, 0.5], [startX, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [startY, 0]);

  return { ref, opacity, x, y };
}
