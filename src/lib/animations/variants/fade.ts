import type { Variants } from "motion/react";

/**
 * Fade animation variants
 * Utilisé pour les transitions d'opacité simples
 */

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: { opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
};

export const fadeOut: Variants = {
  initial: { opacity: 1 },
  animate: {
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

/**
 * Fade with blur effect - signature Impulsion
 */
export const fadeInBlur: Variants = {
  initial: { opacity: 0, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    filter: "blur(5px)",
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

/**
 * Fade with scale - pour les modals et popovers
 */
export const fadeInScale: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};
