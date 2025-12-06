/**
 * Impulsion Animation System
 *
 * Système d'animation complet pour Impulsion.
 * Basé sur Motion (Framer Motion 12).
 *
 * @example
 * ```tsx
 * import { fadeInUp, glowIn, useInViewAnimation, ScrollReveal } from '@/lib/animations';
 *
 * // Utiliser les variants directement
 * <motion.div variants={fadeInUp} initial="initial" animate="animate">
 *   Content
 * </motion.div>
 *
 * // Utiliser les presets Impulsion
 * <motion.div variants={glowIn} initial="initial" animate="animate">
 *   Glow effect
 * </motion.div>
 *
 * // Utiliser les hooks
 * const { ref, isInView } = useInViewAnimation();
 *
 * // Utiliser les composants wrapper
 * <ScrollReveal direction="up">
 *   <Card>Animated content</Card>
 * </ScrollReveal>
 * ```
 */

// Re-export variants
export * from "./variants";

// Re-export presets
export * from "./presets";

// Re-export hooks
export * from "./hooks";

// Re-export components
export * from "./components";
