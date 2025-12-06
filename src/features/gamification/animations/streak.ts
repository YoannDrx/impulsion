import type { Variants } from "motion/react";

/**
 * Streak Animation Variants
 *
 * Animations pour les indicateurs de streak (séries consécutives).
 */

/**
 * Container pour l'animation de streak
 */
export const streakContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

/**
 * Animation du compteur de streak
 */
export const streakCounter: Variants = {
  initial: {
    scale: 0.5,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

/**
 * Animation quand le streak augmente
 */
export const streakIncrement: Variants = {
  initial: {
    scale: 1,
    y: 0,
  },
  animate: {
    scale: [1, 1.3, 1],
    y: [0, -10, 0],
    transition: {
      duration: 0.5,
      times: [0, 0.4, 1],
      ease: "easeOut",
    },
  },
};

/**
 * Animation de la flamme/icône de streak
 */
export const streakFlame: Variants = {
  initial: {
    scale: 0,
    rotate: -45,
  },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
    },
  },
};

/**
 * Animation de pulse pour streak actif
 */
export const streakPulse: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/**
 * Animation des jours de la semaine
 */
export const streakDay: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

/**
 * Animation pour jour complété
 */
export const streakDayComplete: Variants = {
  initial: {
    scale: 1,
    backgroundColor: "var(--muted)",
  },
  animate: {
    scale: [1, 1.2, 1],
    backgroundColor: "var(--imp-lime-400)",
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

/**
 * Animation de connexion entre les jours
 */
export const streakConnection: Variants = {
  initial: {
    scaleX: 0,
    originX: 0,
  },
  animate: {
    scaleX: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

/**
 * Effet de glow pour milestone de streak
 */
export const streakMilestone: Variants = {
  initial: {
    boxShadow: "0 0 0px var(--imp-lime-400)",
  },
  animate: {
    boxShadow: [
      "0 0 0px var(--imp-lime-400)",
      "0 0 30px var(--imp-lime-400)",
      "0 0 15px var(--imp-lime-400)",
    ],
    transition: {
      duration: 1,
      times: [0, 0.5, 1],
    },
  },
};

/**
 * Animation de break de streak (perte)
 */
export const streakBreak: Variants = {
  animate: {
    x: [0, -5, 5, -5, 5, 0],
    opacity: [1, 0.5, 1],
    transition: {
      duration: 0.5,
    },
  },
};

/**
 * Animation de recovery de streak
 */
export const streakRecovery: Variants = {
  initial: {
    scale: 0.8,
    opacity: 0,
    filter: "grayscale(100%)",
  },
  animate: {
    scale: 1,
    opacity: 1,
    filter: "grayscale(0%)",
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};
