"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Suspense, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type BaseCanvasProps = Omit<CanvasProps, "children"> & {
  children: ReactNode;
  className?: string;
  /** Show loading fallback */
  fallback?: ReactNode;
  /** Performance mode - reduces quality for better FPS */
  performanceMode?: boolean;
};

/**
 * Base Canvas wrapper pour tous les composants 3D
 *
 * Optimisé pour les performances avec:
 * - Lazy loading des ressources
 * - Mode performance optionnel
 * - Gestion du resize automatique
 *
 * @example
 * ```tsx
 * <BaseCanvas className="h-[400px]">
 *   <ambientLight />
 *   <MyMesh />
 * </BaseCanvas>
 * ```
 */
export function BaseCanvas({
  children,
  className,
  fallback,
  performanceMode = false,
  ...props
}: BaseCanvasProps) {
  return (
    <div className={cn("relative", className)}>
      <Canvas
        dpr={performanceMode ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: !performanceMode,
          alpha: true,
          powerPreference: performanceMode ? "low-power" : "high-performance",
        }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [0, 0, 5],
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        {...props}
      >
        <Suspense fallback={null}>
          {children}
          <Preload all />
        </Suspense>
      </Canvas>

      {/* Fallback visible pendant le chargement */}
      {fallback && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {fallback}
        </div>
      )}
    </div>
  );
}

/**
 * Canvas pour les backgrounds (landing, hero sections)
 * Configuration optimisée pour les arrière-plans
 */
export function BackgroundCanvas({
  children,
  className,
  ...props
}: BaseCanvasProps) {
  return (
    <BaseCanvas
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
      performanceMode
      camera={{
        fov: 60,
        near: 0.1,
        far: 100,
        position: [0, 0, 10],
      }}
      {...props}
    >
      {children}
    </BaseCanvas>
  );
}

/**
 * Canvas pour les éléments interactifs (badges, showcases)
 * Configuration optimisée pour l'interactivité
 */
export function InteractiveCanvas({
  children,
  className,
  ...props
}: BaseCanvasProps) {
  return (
    <BaseCanvas
      className={cn("cursor-grab active:cursor-grabbing", className)}
      camera={{
        fov: 45,
        near: 0.1,
        far: 50,
        position: [0, 0, 5],
      }}
      {...props}
    >
      {children}
    </BaseCanvas>
  );
}
