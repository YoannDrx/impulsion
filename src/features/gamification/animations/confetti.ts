/**
 * Confetti Animation Utilities
 *
 * Utilise canvas-confetti pour les célébrations.
 * À installer: pnpm add canvas-confetti @types/canvas-confetti
 */

type ConfettiOptions = {
  /** Number of confetti particles */
  particleCount?: number;
  /** Spread angle in degrees */
  spread?: number;
  /** Starting velocity */
  startVelocity?: number;
  /** Gravity (1 = normal) */
  gravity?: number;
  /** Time to fade out (seconds) */
  decay?: number;
  /** Scalar for particle size */
  scalar?: number;
  /** Custom colors (hex) */
  colors?: string[];
  /** Origin point (0-1) */
  origin?: { x: number; y: number };
  /** Angle in degrees */
  angle?: number;
};

// Couleurs Impulsion par défaut
const IMPULSION_COLORS = [
  "#ccff00", // Electric Lime
  "#00f3ff", // Neon Cyan
  "#ffffff", // White
  "#a3e635", // Lime variation
  "#22d3ee", // Cyan variation
];

/**
 * Charge dynamiquement canvas-confetti
 * @returns Confetti function or null if not installed
 */
async function getConfetti() {
  try {
    // @ts-expect-error - canvas-confetti is an optional dependency
    const confettiModule = await import("canvas-confetti");
    return confettiModule.default;
  } catch {
    return null;
  }
}

/**
 * Fonction de base pour lancer des confettis
 * Note: Nécessite que canvas-confetti soit installé
 */
export async function fireConfetti(options: ConfettiOptions = {}) {
  const confetti = await getConfetti();
  if (!confetti) return;

  const defaults: ConfettiOptions = {
    particleCount: 100,
    spread: 70,
    startVelocity: 30,
    gravity: 1,
    decay: 0.94,
    scalar: 1,
    colors: IMPULSION_COLORS,
    origin: { x: 0.5, y: 0.5 },
  };

  confetti({
    ...defaults,
    ...options,
  });
}

/**
 * Confetti burst depuis un point spécifique
 */
export async function confettiBurst(
  x: number,
  y: number,
  options: Omit<ConfettiOptions, "origin"> = {},
) {
  await fireConfetti({
    ...options,
    origin: { x, y },
    particleCount: options.particleCount ?? 50,
    spread: options.spread ?? 60,
    startVelocity: options.startVelocity ?? 25,
  });
}

/**
 * Confetti cannon - tire depuis le côté
 */
export async function confettiCannon(
  side: "left" | "right" = "left",
  options: ConfettiOptions = {},
) {
  const angle = side === "left" ? 60 : 120;
  const x = side === "left" ? 0 : 1;

  await fireConfetti({
    ...options,
    origin: { x, y: 0.7 },
    particleCount: options.particleCount ?? 80,
    spread: options.spread ?? 55,
    startVelocity: options.startVelocity ?? 45,
    angle,
  });
}

/**
 * Double cannon - tire des deux côtés
 */
export async function confettiDoubleCannon(options: ConfettiOptions = {}) {
  await Promise.all([
    confettiCannon("left", options),
    confettiCannon("right", options),
  ]);
}

/**
 * Confetti rain - tombe depuis le haut
 */
export function confettiRain(duration = 3000, options: ConfettiOptions = {}) {
  const end = Date.now() + duration;

  const frame = () => {
    void fireConfetti({
      ...options,
      particleCount: 2,
      origin: {
        x: Math.random(),
        y: 0,
      },
      startVelocity: 0,
      gravity: options.gravity ?? 0.5,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  void frame();
}

/**
 * Fireworks effect - explosions multiples
 */
export function confettiFireworks(count = 3) {
  const positions = Array.from({ length: count }, () => ({
    x: 0.2 + Math.random() * 0.6,
    y: 0.3 + Math.random() * 0.4,
  }));

  positions.forEach((pos, i) => {
    setTimeout(() => {
      void fireConfetti({
        origin: pos,
        particleCount: 30,
        spread: 360,
        startVelocity: 20,
        scalar: 0.8,
      });
    }, i * 200);
  });
}

/**
 * Célébration complète - utilisé pour les achievements majeurs
 */
export async function celebrationSequence() {
  const delay = async (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // Premier burst central
  await fireConfetti({
    particleCount: 100,
    spread: 70,
    origin: { x: 0.5, y: 0.6 },
  });

  // Double cannon après un délai
  await delay(300);
  await confettiDoubleCannon({ particleCount: 50 });

  // Quelques bursts supplémentaires
  await delay(200);
  await Promise.all([
    confettiBurst(0.3, 0.5, { particleCount: 30 }),
    confettiBurst(0.7, 0.5, { particleCount: 30 }),
  ]);
}

/**
 * Confetti pour badge débloqué
 */
export async function badgeUnlockedConfetti(badgePosition?: {
  x: number;
  y: number;
}) {
  const origin = badgePosition ?? { x: 0.5, y: 0.5 };

  // Burst principal
  await fireConfetti({
    origin,
    particleCount: 60,
    spread: 80,
    startVelocity: 30,
    scalar: 1.2,
  });

  // Petits bursts en étoile
  await new Promise((resolve) => setTimeout(resolve, 150));

  const angles = [0, 72, 144, 216, 288];
  const burstPromises = angles.map(async (angle) => {
    const rad = (angle * Math.PI) / 180;
    const offsetX = Math.cos(rad) * 0.15;
    const offsetY = Math.sin(rad) * 0.15;

    return fireConfetti({
      origin: {
        x: origin.x + offsetX,
        y: origin.y + offsetY,
      },
      particleCount: 15,
      spread: 40,
      startVelocity: 15,
      scalar: 0.8,
    });
  });

  await Promise.all(burstPromises);
}

/**
 * Confetti pour streak atteint
 */
export async function streakConfetti(streakNumber: number) {
  // Plus de confettis pour les streaks plus longs
  const particleCount = Math.min(30 + streakNumber * 10, 150);

  await confettiDoubleCannon({
    particleCount: particleCount / 2,
    spread: 60,
    startVelocity: 40,
  });
}
