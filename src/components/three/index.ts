/**
 * Impulsion Three.js Components
 *
 * Composants 3D pour l'interface Impulsion.
 * Utilise React Three Fiber et Drei.
 *
 * @example
 * ```tsx
 * import { BackgroundCanvas, ParticleField } from '@/components/three';
 *
 * function HeroSection() {
 *   return (
 *     <div className="relative h-screen">
 *       <BackgroundCanvas>
 *         <ParticleField count={2000} />
 *       </BackgroundCanvas>
 *       <div className="relative z-10">
 *         <h1>Welcome to Impulsion</h1>
 *       </div>
 *     </div>
 *   );
 * }
 * ```
 */

// Canvas wrappers
export { BaseCanvas, BackgroundCanvas, InteractiveCanvas } from "./canvas";

// Background effects
export {
  ParticleField,
  WaveParticleField,
  FloatingParticles,
} from "./backgrounds";

// Interactive effects
export { BadgeShowcase, BadgeGrid, ProgressBadge } from "./effects";

// Utilities and materials
export {
  IMPULSION_COLORS,
  createLimeMaterial,
  createCyanMaterial,
  createGlassMaterial,
  createDarkMaterial,
  createParticleMaterial,
  createGlowMaterial,
  createGradientTexture,
  createImpulsionGradientMaterial,
} from "./utils";
