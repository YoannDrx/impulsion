"use client";

import { cn } from "@/lib/utils";

type ScanlinesOverlayProps = {
  className?: string;
  intensity?: "subtle" | "normal" | "heavy";
  animated?: boolean;
};

/**
 * Scanlines Overlay - Effet lignes horizontales style CRT/terminal
 * S'utilise comme overlay fullscreen ou sur un conteneur specifique
 */
export function ScanlinesOverlay({
  className,
  intensity = "normal",
  animated = false,
}: ScanlinesOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-50",
        // Scanlines pattern
        intensity === "subtle" && "opacity-30",
        intensity === "normal" && "opacity-50",
        intensity === "heavy" && "opacity-70",
        // Animation optionnelle
        animated && "animate-[imp-scan-vertical_3s_linear_infinite]",
        className,
      )}
      style={{
        backgroundImage:
          intensity === "heavy"
            ? "var(--imp-scanlines-heavy)"
            : "var(--imp-scanlines)",
        backgroundSize: "var(--imp-scanlines-size)",
      }}
    />
  );
}
