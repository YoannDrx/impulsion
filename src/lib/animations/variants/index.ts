/**
 * Animation Variants
 *
 * Variants de base pour les animations Motion.
 * Ces variants sont composables et réutilisables.
 */

// Fade animations
export {
  fadeIn,
  fadeOut,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  fadeInBlur,
  fadeInScale,
} from "./fade";

// Slide animations
export {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
  slideInFromBottom,
  slideSpringFromLeft,
  slideSpringFromRight,
  slideSpringFromBottom,
  slideDrawer,
  slideDrawerRight,
} from "./slide";

// Scale animations
export {
  scaleIn,
  scaleInCenter,
  scaleSpring,
  scaleBounce,
  scalePop,
  hoverScale,
  hoverScaleLarge,
  pulseScale,
  zoomIn,
} from "./scale";

// Stagger animations
export {
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,
  staggerItem,
  staggerItemFade,
  staggerItemScale,
  staggerItemSlideLeft,
  staggerItemSlideRight,
  staggerContainerSpring,
  staggerItemSpring,
  gridContainer,
  gridItem,
  createStaggerContainer,
  createStaggerItem,
} from "./stagger";
