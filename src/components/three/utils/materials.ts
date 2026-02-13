import * as THREE from "three";

/**
 * Impulsion Shared Materials
 *
 * Matériaux réutilisables avec les couleurs du design system.
 */

// ============================================================================
// COULEURS IMPULSION
// ============================================================================

export const IMPULSION_COLORS = {
  lime: new THREE.Color("#ccff00"),
  cyan: new THREE.Color("#00f3ff"),
  dark: new THREE.Color("#1a1a2e"),
  darkAlt: new THREE.Color("#16213e"),
  white: new THREE.Color("#ffffff"),
  success: new THREE.Color("#22c55e"),
  warning: new THREE.Color("#f59e0b"),
  danger: new THREE.Color("#ef4444"),
} as const;

// ============================================================================
// MATÉRIAUX DE BASE
// ============================================================================

/**
 * Matériau métallique lime (primary)
 */
export function createLimeMaterial(options?: {
  emissive?: boolean;
  emissiveIntensity?: number;
}) {
  return new THREE.MeshStandardMaterial({
    color: IMPULSION_COLORS.lime,
    metalness: 0.5,
    roughness: 0.3,
    emissive: options?.emissive ? IMPULSION_COLORS.lime : undefined,
    emissiveIntensity: options?.emissiveIntensity ?? 0.2,
  });
}

/**
 * Matériau métallique cyan (secondary)
 */
export function createCyanMaterial(options?: {
  emissive?: boolean;
  emissiveIntensity?: number;
}) {
  return new THREE.MeshStandardMaterial({
    color: IMPULSION_COLORS.cyan,
    metalness: 0.5,
    roughness: 0.3,
    emissive: options?.emissive ? IMPULSION_COLORS.cyan : undefined,
    emissiveIntensity: options?.emissiveIntensity ?? 0.2,
  });
}

/**
 * Matériau glass/transparent
 */
export function createGlassMaterial(color?: THREE.Color) {
  return new THREE.MeshPhysicalMaterial({
    color: color ?? IMPULSION_COLORS.white,
    metalness: 0,
    roughness: 0,
    transmission: 0.9,
    thickness: 0.5,
    transparent: true,
    opacity: 0.3,
  });
}

/**
 * Matériau dark pour backgrounds
 */
export function createDarkMaterial() {
  return new THREE.MeshStandardMaterial({
    color: IMPULSION_COLORS.dark,
    metalness: 0.2,
    roughness: 0.8,
  });
}

// ============================================================================
// MATÉRIAUX POUR PARTICULES
// ============================================================================

/**
 * Matériau pour particules avec blending additif
 */
export function createParticleMaterial(
  color: THREE.Color | string,
  options?: {
    size?: number;
    opacity?: number;
    sizeAttenuation?: boolean;
  },
) {
  return new THREE.PointsMaterial({
    color: typeof color === "string" ? new THREE.Color(color) : color,
    size: options?.size ?? 0.02,
    transparent: true,
    opacity: options?.opacity ?? 0.8,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: options?.sizeAttenuation ?? true,
  });
}

// ============================================================================
// SHADERS PERSONNALISÉS
// ============================================================================

/**
 * Shader pour effet de glow
 */
export const glowShader = {
  vertexShader: `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 glowColor;
    uniform float intensity;
    varying vec3 vNormal;
    void main() {
      float glow = pow(0.8 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
      gl_FragColor = vec4(glowColor, glow * intensity);
    }
  `,
};

/**
 * Créer un matériau de glow
 */
export function createGlowMaterial(
  color: THREE.Color | string,
  intensity = 1.0,
) {
  return new THREE.ShaderMaterial({
    uniforms: {
      glowColor: {
        value: typeof color === "string" ? new THREE.Color(color) : color,
      },
      intensity: { value: intensity },
    },
    vertexShader: glowShader.vertexShader,
    fragmentShader: glowShader.fragmentShader,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
  });
}

// ============================================================================
// GRADIENTS
// ============================================================================

/**
 * Créer une texture de gradient
 */
export function createGradientTexture(
  colorStart: string,
  colorEnd: string,
  size = 256,
) {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const gradient = ctx.createLinearGradient(0, 0, 0, size);
  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(1, colorEnd);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  return texture;
}

/**
 * Matériau avec gradient Impulsion (lime -> cyan)
 */
export function createImpulsionGradientMaterial() {
  const texture = createGradientTexture("#ccff00", "#00f3ff");

  if (!texture) {
    return new THREE.MeshStandardMaterial({ color: IMPULSION_COLORS.lime });
  }

  return new THREE.MeshStandardMaterial({
    map: texture,
    metalness: 0.4,
    roughness: 0.4,
  });
}
