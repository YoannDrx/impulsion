"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

type ParticleFieldProps = {
  /** Number of particles */
  count?: number;
  /** Size of particles */
  size?: number;
  /** Primary color (hex) */
  color?: string;
  /** Secondary color for variation (hex) */
  secondaryColor?: string;
  /** Speed of movement */
  speed?: number;
  /** Spread radius */
  radius?: number;
  /** Seed for deterministic randomness */
  seed?: number;
};

/**
 * Simple seeded random number generator for deterministic results
 */
function createSeededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

/**
 * Generate particle positions and colors (pure function)
 */
function generateParticles(
  count: number,
  radius: number,
  color: string,
  secondaryColor: string,
  seed: number,
) {
  const random = createSeededRandom(seed);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const primaryColor = new THREE.Color(color);
  const secondary = new THREE.Color(secondaryColor);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // Spherical distribution
    const theta = random() * Math.PI * 2;
    const phi = Math.acos(2 * random() - 1);
    const r = radius * Math.cbrt(random());

    positions[i3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = r * Math.cos(phi);

    // Mix colors based on position
    const mixFactor = random();
    const particleColor = primaryColor.clone().lerp(secondary, mixFactor);

    colors[i3] = particleColor.r;
    colors[i3 + 1] = particleColor.g;
    colors[i3 + 2] = particleColor.b;
  }

  return { positions, colors };
}

/**
 * Generate grid positions for wave effect (pure function)
 */
function generateWaveGrid(
  count: number,
  color: string,
  secondaryColor: string,
) {
  const positions = new Float32Array(count * 3);
  const originalPositions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const primaryColor = new THREE.Color(color);
  const secondary = new THREE.Color(secondaryColor);

  const gridSize = Math.ceil(Math.sqrt(count));
  const spacing = 20 / gridSize;

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const x = (i % gridSize) * spacing - 10;
    const z = Math.floor(i / gridSize) * spacing - 10;

    positions[i3] = x;
    positions[i3 + 1] = 0;
    positions[i3 + 2] = z;

    originalPositions[i3] = x;
    originalPositions[i3 + 1] = 0;
    originalPositions[i3 + 2] = z;

    // Color based on distance from center
    const distance = Math.sqrt(x * x + z * z);
    const mixFactor = Math.min(distance / 10, 1);
    const particleColor = primaryColor.clone().lerp(secondary, mixFactor);

    colors[i3] = particleColor.r;
    colors[i3 + 1] = particleColor.g;
    colors[i3 + 2] = particleColor.b;
  }

  return { positions, colors, originalPositions };
}

/**
 * Generate floating particles data (pure function)
 */
function generateFloatingData(count: number, radius: number, seed: number) {
  const random = createSeededRandom(seed);
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // Random positions within radius
    positions[i3] = (random() - 0.5) * radius * 2;
    positions[i3 + 1] = (random() - 0.5) * radius * 2;
    positions[i3 + 2] = (random() - 0.5) * radius * 2;

    // Random velocities
    velocities[i3] = (random() - 0.5) * 0.02;
    velocities[i3 + 1] = (random() - 0.5) * 0.02;
    velocities[i3 + 2] = (random() - 0.5) * 0.02;
  }

  return { positions, velocities };
}

/**
 * Champ de particules animé pour les backgrounds
 *
 * Style "Cyber-Athlétisme" avec Electric Lime et Neon Cyan.
 *
 * @example
 * ```tsx
 * <BackgroundCanvas>
 *   <ParticleField count={2000} />
 * </BackgroundCanvas>
 * ```
 */
export function ParticleField({
  count = 2000,
  size = 0.015,
  color = "#ccff00",
  secondaryColor = "#00f3ff",
  speed = 0.3,
  radius = 10,
  seed = 42,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  // Generate particles with deterministic seed
  const { positions, colors } = useMemo(
    () => generateParticles(count, radius, color, secondaryColor, seed),
    [count, radius, color, secondaryColor, seed],
  );

  // Animation loop
  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime() * speed;

    // Rotate the entire particle system
    pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    pointsRef.current.rotation.y = time * 0.05;

    // Pulse effect on size
    if (materialRef.current) {
      materialRef.current.size = size * (1 + Math.sin(time * 2) * 0.1);
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors}>
      <PointMaterial
        ref={materialRef}
        vertexColors
        size={size}
        sizeAttenuation
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

/**
 * Version avec effet de vague
 */
export function WaveParticleField({
  count = 3000,
  size = 0.02,
  color = "#ccff00",
  secondaryColor = "#00f3ff",
  speed = 0.5,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate grid positions
  const { positions, colors, originalPositions } = useMemo(
    () => generateWaveGrid(count, color, secondaryColor),
    [count, color, secondaryColor],
  );

  // Animation loop - wave effect
  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime() * speed;
    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const posArray = positionAttribute.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = originalPositions[i3];
      const z = originalPositions[i3 + 2];

      // Wave function
      const wave =
        Math.sin(x * 0.5 + time) * 0.5 + Math.cos(z * 0.5 + time * 0.8) * 0.5;

      posArray[i3 + 1] = wave;
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors}>
      <PointMaterial
        vertexColors
        size={size}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

/**
 * Particules flottantes avec mouvement organique
 */
export function FloatingParticles({
  count = 500,
  size = 0.03,
  color = "#ccff00",
  speed = 0.2,
  radius = 8,
  seed = 123,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Store initial positions and velocities
  const particleData = useMemo(
    () => generateFloatingData(count, radius, seed),
    [count, radius, seed],
  );

  // Animation loop
  useFrame(() => {
    if (!pointsRef.current) return;

    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const positions = positionAttribute.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Update positions with velocity
      positions[i3] += particleData.velocities[i3] * speed;
      positions[i3 + 1] += particleData.velocities[i3 + 1] * speed;
      positions[i3 + 2] += particleData.velocities[i3 + 2] * speed;

      // Wrap around boundaries
      for (let j = 0; j < 3; j++) {
        if (positions[i3 + j] > radius) positions[i3 + j] = -radius;
        if (positions[i3 + j] < -radius) positions[i3 + j] = radius;
      }
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={particleData.positions}>
      <PointMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}
