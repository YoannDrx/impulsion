import type { Variants } from "motion/react";

/**
 * Scale animation variants
 * Utilisé pour les effets de zoom et d'apparition
 */

export const scaleIn: Variants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export const scaleInCenter: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

/**
 * Scale avec spring - pour les éléments interactifs
 */
export const scaleSpring: Variants = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
  exit: {
    scale: 0,
    transition: { duration: 0.2 },
  },
};

/**
 * Scale bounce - pour les badges et achievements
 */
export const scaleBounce: Variants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
  exit: {
    scale: 0,
    rotate: 180,
    transition: { duration: 0.3 },
  },
};

/**
 * Scale pop - effet de pop rapide
 */
export const scalePop: Variants = {
  initial: { scale: 0.5, opacity: 0 },
  animate: {
    scale: [0.5, 1.1, 1],
    opacity: 1,
    transition: {
      duration: 0.4,
      times: [0, 0.7, 1],
      ease: "easeOut",
    },
  },
  exit: {
    scale: 0.5,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

/**
 * Hover scale - pour les cards et boutons
 */
export const hoverScale: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

export const hoverScaleLarge: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

/**
 * Pulse scale - pour attirer l'attention
 */
export const pulseScale: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/**
 * Zoom in from point - pour les images
 */
export const zoomIn: Variants = {
  initial: { scale: 1.2, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    scale: 1.1,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};
