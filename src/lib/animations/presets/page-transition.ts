import type { Variants } from "motion/react";

/**
 * Page Transition Presets
 *
 * Animations pour les transitions entre pages.
 * Compatible avec Next.js App Router.
 */

/**
 * Transition standard - fade avec léger mouvement
 */
export const pageDefault: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Transition slide - pour navigation latérale
 */
export const pageSlideRight: Variants = {
  initial: {
    x: "5%",
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    x: "-5%",
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
};

export const pageSlideLeft: Variants = {
  initial: {
    x: "-5%",
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    x: "5%",
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
};

/**
 * Transition scale - pour les modals et overlays
 */
export const pageScale: Variants = {
  initial: {
    scale: 0.98,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    scale: 0.98,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Transition blur - signature Impulsion
 */
export const pageBlur: Variants = {
  initial: {
    filter: "blur(8px)",
    opacity: 0,
  },
  animate: {
    filter: "blur(0px)",
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    filter: "blur(4px)",
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
};

/**
 * Transition avec stagger pour le contenu
 */
export const pageWithContent: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export const pageContentItem: Variants = {
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
 * Overlay backdrop
 */
export const overlayBackdrop: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

/**
 * Modal content
 */
export const modalContent: Variants = {
  initial: {
    scale: 0.95,
    opacity: 0,
    y: 10,
  },
  animate: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    scale: 0.95,
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Sheet/Drawer bottom
 */
export const sheetBottom: Variants = {
  initial: {
    y: "100%",
  },
  animate: {
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
  exit: {
    y: "100%",
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
};

/**
 * Sheet/Drawer right
 */
export const sheetRight: Variants = {
  initial: {
    x: "100%",
  },
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
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
};
