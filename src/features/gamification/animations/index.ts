/**
 * Gamification Animations
 *
 * Animations pour les éléments de gamification :
 * badges, streaks, achievements, confetti.
 */

// Badge unlock animations
export {
  badgeSpring,
  badgeBounce,
  badgeUnlockContainer,
  badgeIconUnlock,
  badgeGlowPulse,
  badgeShine,
  badgeTitle,
  badgeDescription,
  badgeParticle,
  generateParticlePositions,
  badgeRing,
  badgeRingCascade,
} from "./badge-unlock";

// Streak animations
export {
  streakContainer,
  streakCounter,
  streakIncrement,
  streakFlame,
  streakPulse,
  streakDay,
  streakDayComplete,
  streakConnection,
  streakMilestone,
  streakBreak,
  streakRecovery,
} from "./streak";

// Confetti effects
export {
  fireConfetti,
  confettiBurst,
  confettiCannon,
  confettiDoubleCannon,
  confettiRain,
  confettiFireworks,
  celebrationSequence,
  badgeUnlockedConfetti,
  streakConfetti,
} from "./confetti";
