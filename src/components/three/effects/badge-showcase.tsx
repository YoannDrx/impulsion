"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
  RoundedBox,
  Text,
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
} from "@react-three/drei";
import * as THREE from "three";

type BadgeShowcaseProps = {
  /** Badge icon emoji or text */
  icon?: string;
  /** Badge title */
  title?: string;
  /** Primary color */
  color?: string;
  /** Enable auto-rotation */
  autoRotate?: boolean;
  /** Rotation speed */
  rotationSpeed?: number;
  /** Enable floating animation */
  float?: boolean;
  /** Badge style */
  variant?: "default" | "glow" | "wobble" | "distort";
};

/**
 * Badge 3D showcase avec rotation et effets
 *
 * @example
 * ```tsx
 * <InteractiveCanvas className="h-[200px]">
 *   <BadgeShowcase icon="🏃" title="Runner" color="#ccff00" />
 * </InteractiveCanvas>
 * ```
 */
export function BadgeShowcase({
  icon = "⚡",
  title,
  color = "#ccff00",
  autoRotate = true,
  rotationSpeed = 0.5,
  float = true,
  variant = "default",
}: BadgeShowcaseProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!groupRef.current || !autoRotate) return;

    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * rotationSpeed;

    // Subtle hover effect
    if (hovered) {
      groupRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1);
    } else {
      groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }
  });

  const content = (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Badge base */}
      <RoundedBox args={[2, 2, 0.3]} radius={0.2} smoothness={4}>
        {variant === "wobble" ? (
          <MeshWobbleMaterial
            color={color}
            factor={0.2}
            speed={2}
            metalness={0.5}
            roughness={0.3}
          />
        ) : variant === "distort" ? (
          <MeshDistortMaterial
            color={color}
            distort={0.2}
            speed={2}
            metalness={0.5}
            roughness={0.3}
          />
        ) : (
          <meshStandardMaterial
            color={color}
            metalness={0.5}
            roughness={0.3}
            emissive={variant === "glow" ? color : undefined}
            emissiveIntensity={variant === "glow" ? 0.3 : 0}
          />
        )}
      </RoundedBox>

      {/* Badge icon */}
      <Text
        position={[0, title ? 0.2 : 0, 0.2]}
        fontSize={0.8}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {icon}
      </Text>

      {/* Badge title */}
      {title && (
        <Text
          position={[0, -0.6, 0.2]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.8}
        >
          {title}
        </Text>
      )}

      {/* Glow ring for glow variant */}
      {variant === "glow" && (
        <mesh position={[0, 0, -0.1]}>
          <ringGeometry args={[1.1, 1.3, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );

  if (float) {
    return (
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {content}
      </Float>
    );
  }

  return content;
}

/**
 * Grille de badges 3D
 */
export function BadgeGrid({
  badges,
  spacing = 2.5,
}: {
  badges: {
    icon: string;
    title?: string;
    color?: string;
    unlocked?: boolean;
  }[];
  spacing?: number;
}) {
  const cols = Math.ceil(Math.sqrt(badges.length));

  return (
    <group>
      {badges.map((badge, i) => {
        const x = (i % cols) * spacing - ((cols - 1) * spacing) / 2;
        const y = -Math.floor(i / cols) * spacing + ((cols - 1) * spacing) / 2;

        return (
          <group key={i} position={[x, y, 0]}>
            <BadgeShowcase
              icon={badge.icon}
              title={badge.title}
              color={badge.unlocked ? badge.color : "#666666"}
              variant={badge.unlocked ? "glow" : "default"}
              autoRotate={badge.unlocked}
              float={badge.unlocked}
            />
          </group>
        );
      })}
    </group>
  );
}

/**
 * Badge avec anneau de progression
 */
export function ProgressBadge({
  icon = "🎯",
  progress = 0.5,
  color = "#ccff00",
}: {
  icon?: string;
  progress?: number;
  color?: string;
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    const time = state.clock.getElapsedTime();
    ringRef.current.rotation.z = time * 0.2;
  });

  return (
    <Float speed={2} floatIntensity={0.3}>
      <group>
        {/* Background ring */}
        <mesh>
          <ringGeometry args={[1.2, 1.4, 64]} />
          <meshBasicMaterial color="#333333" transparent opacity={0.5} />
        </mesh>

        {/* Progress ring */}
        <mesh ref={ringRef}>
          <ringGeometry args={[1.2, 1.4, 64, 1, 0, Math.PI * 2 * progress]} />
          <meshBasicMaterial color={color} />
        </mesh>

        {/* Badge center */}
        <RoundedBox args={[1.8, 1.8, 0.2]} radius={0.9} smoothness={4}>
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.3}
            roughness={0.5}
          />
        </RoundedBox>

        {/* Icon */}
        <Text
          position={[0, 0, 0.15]}
          fontSize={0.8}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {icon}
        </Text>

        {/* Progress text */}
        <Text
          position={[0, -1.8, 0]}
          fontSize={0.25}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {`${Math.round(progress * 100)}%`}
        </Text>
      </group>
    </Float>
  );
}
