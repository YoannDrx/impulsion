"use client";

import { useInView, type UseInViewOptions } from "motion/react";
import { useRef, type RefObject } from "react";

type InViewAnimationOptions = UseInViewOptions & {
  /** Trigger animation only once */
  once?: boolean;
  /** Delay before animation starts (ms) */
  delay?: number;
};

/**
 * Hook pour animer un élément quand il entre dans le viewport
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { ref, isInView } = useInViewAnimation();
 *
 *   return (
 *     <motion.div
 *       ref={ref}
 *       initial={{ opacity: 0, y: 20 }}
 *       animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
 *     >
 *       Content
 *     </motion.div>
 *   );
 * }
 * ```
 */
export function useInViewAnimation<T extends HTMLElement = HTMLDivElement>(
  options: InViewAnimationOptions = {},
): {
  ref: RefObject<T | null>;
  isInView: boolean;
} {
  const { once = true, amount = 0.3, ...restOptions } = options;
  const ref = useRef<T>(null);

  const isInView = useInView(ref, {
    once,
    amount,
    ...restOptions,
  });

  return { ref, isInView };
}

/**
 * Hook pour animer avec un délai quand l'élément entre dans le viewport
 */
export function useDelayedInViewAnimation<
  T extends HTMLElement = HTMLDivElement,
>(
  delayMs = 0,
  options: InViewAnimationOptions = {},
): {
  ref: RefObject<T | null>;
  isInView: boolean;
  shouldAnimate: boolean;
  /** Delay in seconds for motion transition */
  transitionDelay: number;
} {
  const { ref, isInView } = useInViewAnimation<T>(options);

  return {
    ref,
    isInView,
    shouldAnimate: isInView,
    transitionDelay: delayMs / 1000,
  };
}

/**
 * Hook pour créer un stagger d'éléments basé sur leur ordre d'apparition
 */
export function useStaggerInView<T extends HTMLElement = HTMLDivElement>(
  index: number,
  baseDelay = 0.1,
  options: InViewAnimationOptions = {},
): {
  ref: RefObject<T | null>;
  isInView: boolean;
  delay: number;
} {
  const { ref, isInView } = useInViewAnimation<T>(options);

  return {
    ref,
    isInView,
    delay: index * baseDelay,
  };
}
