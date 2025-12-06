import type { Variants } from "motion/react";

/**
 * Slide animation variants
 * Utilisé pour les entrées/sorties avec translation
 */

export const slideInFromLeft: Variants = {
  initial: { x: "-100%", opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: { duration: 0.3, ease: [0.55, 0.06, 0.68, 0.19] },
  },
};

export const slideInFromRight: Variants = {
  initial: { x: "100%", opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.3, ease: [0.55, 0.06, 0.68, 0.19] },
  },
};

export const slideInFromTop: Variants = {
  initial: { y: "-100%", opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    y: "-100%",
    opacity: 0,
    transition: { duration: 0.3, ease: [0.55, 0.06, 0.68, 0.19] },
  },
};

export const slideInFromBottom: Variants = {
  initial: { y: "100%", opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: { duration: 0.3, ease: [0.55, 0.06, 0.68, 0.19] },
  },
};

/**
 * Slide avec spring - plus dynamique
 */
export const slideSpringFromLeft: Variants = {
  initial: { x: -50, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    x: -30,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export const slideSpringFromRight: Variants = {
  initial: { x: 50, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    x: 30,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export const slideSpringFromBottom: Variants = {
  initial: { y: 30, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    y: 20,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

/**
 * Slide pour drawer/sidebar
 */
export const slideDrawer: Variants = {
  initial: { x: "-100%" },
  animate: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
  exit: {
    x: "-100%",
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

export const slideDrawerRight: Variants = {
  initial: { x: "100%" },
  animate: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.25, ease: "easeIn" },
  },
};
