"use client";

import { cn } from "@/lib/utils";

type NoiseTextureProps = {
  className?: string;
  opacity?: number;
  animated?: boolean;
};

/**
 * Noise Texture - Overlay grain/noise style film/CRT
 * Ajoute de la texture aux backgrounds pour un effet plus organique
 */
export function NoiseTexture({
  className,
  opacity = 0.03,
  animated = false,
}: NoiseTextureProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-40",
        animated && "animate-pulse",
        className,
      )}
      style={{
        backgroundImage: "var(--imp-noise-texture)",
        opacity,
        mixBlendMode: "overlay",
      }}
    />
  );
}
