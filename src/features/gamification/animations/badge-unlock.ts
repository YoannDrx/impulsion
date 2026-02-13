import type { Variants, Transition } from "motion/react";

/**
 * Badge Unlock Animations
 *
 * Animations pour le déblocage de badges et achievements.
 * Style "Cyber-Athlétisme" avec effets énergiques.
 */

// ============================================================================
// TRANSITIONS
// ============================================================================

export const badgeSpring: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
};

export const badgeBounce: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 15,
};

// ============================================================================
// BADGE CONTAINER
// ============================================================================

/**
 * Container pour l'animation de déblocage
 * Gère le timing global de l'animation
 */
export const badgeUnlockContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

// ============================================================================
// BADGE ICON
// ============================================================================

/**
 * Animation principale du badge
 * Rotation + Scale avec spring énergique
 */
export const badgeIconUnlock: Variants = {
  initial: {
    scale: 0,
    rotate: -180,
    opacity: 0,
  },
  animate: {
    scale: [0, 1.3, 1],
    rotate: [-180, 15, 0],
    opacity: 1,
    transition: {
      duration: 0.7,
      times: [0, 0.6, 1],
      ease: "easeOut",
    },
  },
  exit: {
    scale: 0,
    rotate: 180,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

/**
 * Pulse glow après déblocage
 */
export const badgeGlowPulse: Variants = {
  initial: {
    boxShadow: "0 0 0px var(--imp-lime-400)",
  },
  animate: {
    boxShadow: [
      "0 0 0px var(--imp-lime-400)",
      "0 0 40px var(--imp-lime-400)",
      "0 0 20px var(--imp-lime-400)",
    ],
    transition: {
      duration: 0.8,
      times: [0, 0.5, 1],
      delay: 0.3,
    },
  },
};

/**
 * Shine effect qui traverse le badge
 */
export const badgeShine: Variants = {
  initial: {
    x: "-100%",
    opacity: 0,
  },
  animate: {
    x: "200%",
    opacity: [0, 1, 0],
    transition: {
      duration: 0.8,
      delay: 0.5,
      ease: "easeInOut",
    },
  },
};

// ============================================================================
// BADGE TEXT
// ============================================================================

/**
 * Titre du badge
 */
export const badgeTitle: Variants = {
  initial: {
    y: 20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

/**
 * Description du badge
 */
export const badgeDescription: Variants = {
  initial: {
    y: 10,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: 0.1,
      ease: "easeOut",
    },
  },
};

// ============================================================================
// PARTICLES
// ============================================================================

/**
 * Particules qui explosent autour du badge
 */
export const badgeParticle: Variants = {
  initial: {
    scale: 0,
    opacity: 1,
  },
  animate: (custom: { x: number; y: number; delay: number }) => ({
    scale: [0, 1, 0],
    x: custom.x,
    y: custom.y,
    opacity: [1, 1, 0],
    transition: {
      duration: 0.6,
      delay: 0.3 + custom.delay,
      ease: "easeOut",
    },
  }),
};

/**
 * Génère des positions de particules aléatoires
 */
export function generateParticlePositions(count = 8) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
    const distance = 60 + Math.random() * 40;
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      delay: Math.random() * 0.2,
    };
  });
}

// ============================================================================
// RING EFFECTS
// ============================================================================

/**
 * Anneau qui s'étend depuis le badge
 */
export const badgeRing: Variants = {
  initial: {
    scale: 0.5,
    opacity: 0.8,
  },
  animate: {
    scale: 2,
    opacity: 0,
    transition: {
      duration: 0.6,
      delay: 0.2,
      ease: "easeOut",
    },
  },
};

/**
 * Multiple rings en cascade
 */
export const badgeRingCascade = (index: number): Variants => ({
  initial: {
    scale: 0.5,
    opacity: 0.6,
  },
  animate: {
    scale: 2.5,
    opacity: 0,
    transition: {
      duration: 0.8,
      delay: 0.2 + index * 0.15,
      ease: "easeOut",
    },
  },
});
