import type { Variants, Transition } from "motion/react";

/**
 * Impulsion Animation Presets
 *
 * Animations signature du design system "Cyber-Athlétisme".
 * Ces presets utilisent les tokens CSS définis dans le design system.
 */

// ============================================================================
// TRANSITIONS RÉUTILISABLES
// ============================================================================

export const springBouncy: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

export const springGentle: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 25,
};

export const easeOutExpo: Transition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1],
};

// ============================================================================
// APPARITION AVEC GLOW
// ============================================================================

/**
 * Apparition avec effet de blur qui se dissipe
 * Signature Impulsion pour les éléments importants
 */
export const glowIn: Variants = {
  initial: {
    opacity: 0,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    filter: "blur(5px)",
    transition: {
      duration: 0.3,
    },
  },
};

/**
 * Apparition avec glow intense
 * Pour les éléments de succès ou les achievements
 */
export const glowInIntense: Variants = {
  initial: {
    opacity: 0,
    filter: "blur(15px)",
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ============================================================================
// ANIMATIONS ÉNERGIQUES
// ============================================================================

/**
 * Bounce énergique avec rotation
 * Pour les badges, achievements, et éléments de gamification
 */
export const energyBounce: Variants = {
  initial: {
    scale: 0,
    rotate: -180,
    opacity: 0,
  },
  animate: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: springBouncy,
  },
  exit: {
    scale: 0,
    rotate: 180,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

/**
 * Pop rapide pour les micro-interactions
 */
export const energyPop: Variants = {
  initial: { scale: 0.5, opacity: 0 },
  animate: {
    scale: [0.5, 1.15, 1],
    opacity: 1,
    transition: {
      duration: 0.4,
      times: [0, 0.6, 1],
      ease: "easeOut",
    },
  },
  tap: { scale: 0.95 },
  hover: { scale: 1.05 },
};

/**
 * Entrée avec élan (slide + overshoot)
 */
export const energySlide: Variants = {
  initial: { x: -50, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: springSnappy,
  },
  exit: {
    x: 30,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

// ============================================================================
// EFFETS NEON
// ============================================================================

/**
 * Pulse neon continu
 * Pour les éléments qui doivent attirer l'attention
 */
export const neonPulse: Variants = {
  animate: {
    boxShadow: [
      "0 0 0px var(--imp-lime-400)",
      "0 0 20px var(--imp-lime-400)",
      "0 0 0px var(--imp-lime-400)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/**
 * Pulse neon cyan
 */
export const neonPulseCyan: Variants = {
  animate: {
    boxShadow: [
      "0 0 0px var(--imp-cyan-400)",
      "0 0 20px var(--imp-cyan-400)",
      "0 0 0px var(--imp-cyan-400)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/**
 * Flicker neon - effet glitch subtil
 */
export const neonFlicker: Variants = {
  animate: {
    opacity: [1, 0.8, 1, 0.9, 1, 0.85, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      times: [0, 0.1, 0.2, 0.4, 0.6, 0.8, 1],
    },
  },
};

// ============================================================================
// ANIMATIONS DE STATUT
// ============================================================================

/**
 * Check/validation animée
 */
export const statusSuccess: Variants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: [0, 1.2, 1],
    opacity: 1,
    transition: {
      duration: 0.5,
      times: [0, 0.6, 1],
    },
  },
};

/**
 * Shake pour erreur
 */
export const statusError: Variants = {
  animate: {
    x: [0, -10, 10, -10, 10, -5, 5, 0],
    transition: {
      duration: 0.5,
    },
  },
};

/**
 * Pulse warning
 */
export const statusWarning: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.8,
      repeat: 3,
    },
  },
};

// ============================================================================
// ANIMATIONS SPORT/PERFORMANCE
// ============================================================================

/**
 * Compteur animé - pour les stats qui augmentent
 */
export const counterUp: Variants = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

/**
 * Barre de progression qui se remplit
 */
export const progressFill: Variants = {
  initial: { scaleX: 0, originX: 0 },
  animate: {
    scaleX: 1,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * Ring de progression circulaire
 */
export const progressRing: Variants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 1.5,
        ease: "easeOut",
      },
      opacity: {
        duration: 0.3,
      },
    },
  },
};

// ============================================================================
// ANIMATIONS DE CALENDRIER
// ============================================================================

/**
 * Transition de jour dans le calendrier
 */
export const calendarDay: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.2 },
  },
  hover: {
    scale: 1.1,
    transition: { duration: 0.15 },
  },
  tap: { scale: 0.95 },
};

/**
 * Séance planifiée apparaît
 */
export const sessionCard: Variants = {
  initial: { y: 10, opacity: 0, scale: 0.95 },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: springGentle,
  },
  exit: {
    y: -10,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
  hover: {
    y: -2,
    transition: { duration: 0.2 },
  },
};

// ============================================================================
// ANIMATIONS VIDÉO
// ============================================================================

/**
 * Marker sur la timeline
 */
export const timelineMarker: Variants = {
  initial: { scale: 0, y: 10 },
  animate: {
    scale: 1,
    y: 0,
    transition: springBouncy,
  },
  hover: {
    scale: 1.2,
    transition: { duration: 0.15 },
  },
  tap: { scale: 0.9 },
};

/**
 * Commentaire qui slide
 */
export const videoComment: Variants = {
  initial: { x: 20, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: springSnappy,
  },
  exit: {
    x: -20,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

// ============================================================================
// PAGE TRANSITIONS
// ============================================================================

/**
 * Transition de page standard
 */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
    },
  },
};

/**
 * Transition de page avec fade
 */
export const pageTransitionFade: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};
