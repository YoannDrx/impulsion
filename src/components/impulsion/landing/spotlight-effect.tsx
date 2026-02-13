"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

type SpotlightEffectProps = {
  children: ReactNode;
  className?: string;
  color?: "lime" | "cyan" | "white";
  size?: number;
  intensity?: number;
};

export function SpotlightEffect({
  children,
  className,
  color = "lime",
  size = 400,
  intensity = 0.15,
}: SpotlightEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [mouseX, mouseY]);

  const spotlightColors = {
    lime: `radial-gradient(${size}px circle at var(--x) var(--y), oklch(0.91 0.23 120 / ${intensity}), transparent)`,
    cyan: `radial-gradient(${size}px circle at var(--x) var(--y), oklch(0.85 0.16 195 / ${intensity}), transparent)`,
    white: `radial-gradient(${size}px circle at var(--x) var(--y), oklch(1 0 0 / ${intensity}), transparent)`,
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={
          {
            "--x": springX,
            "--y": springY,
            background: spotlightColors[color]
              .replace("var(--x)", "calc(var(--x) * 1px)")
              .replace("var(--y)", "calc(var(--y) * 1px)"),
          } as React.CSSProperties
        }
      />
      {children}
    </div>
  );
}

type SpotlightBeamProps = {
  className?: string;
  color?: "lime" | "cyan";
  angle?: number;
  width?: number;
  animated?: boolean;
};

export function SpotlightBeam({
  className,
  color = "lime",
  angle = -30,
  width = 200,
  animated = true,
}: SpotlightBeamProps) {
  const beamColor =
    color === "lime"
      ? "from-lime-400/30 via-lime-400/10 to-transparent"
      : "from-cyan-400/30 via-cyan-400/10 to-transparent";

  const glowColor =
    color === "lime"
      ? "shadow-[0_0_100px_50px_oklch(0.91_0.23_120/0.2)]"
      : "shadow-[0_0_100px_50px_oklch(0.85_0.16_195/0.2)]";

  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute -top-20 h-[150%] bg-gradient-to-b",
        beamColor,
        glowColor,
        className,
      )}
      style={{
        width,
        transform: `rotate(${angle}deg)`,
        transformOrigin: "top center",
      }}
      animate={
        animated
          ? {
              x: ["-50%", "150%"],
              opacity: [0, 1, 1, 0],
            }
          : undefined
      }
      transition={
        animated
          ? {
              duration: 4,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }
          : undefined
      }
    />
  );
}

type MultipleSpotlightsProps = {
  className?: string;
  count?: number;
  color?: "lime" | "cyan" | "mixed";
};

export function MultipleSpotlights({
  className,
  count = 3,
  color = "mixed",
}: MultipleSpotlightsProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, i) => {
        const beamColor =
          color === "mixed" ? (i % 2 === 0 ? "lime" : "cyan") : color;
        const delay = i * 1.5;
        const angle = -20 + i * 15;

        return (
          <motion.div
            key={i}
            className={cn(
              "absolute -top-20 h-[150%] w-48 bg-gradient-to-b",
              beamColor === "lime"
                ? "from-lime-400/20 via-lime-400/5 to-transparent"
                : "from-cyan-400/20 via-cyan-400/5 to-transparent",
            )}
            style={{
              left: `${20 + i * 25}%`,
              transform: `rotate(${angle}deg)`,
              transformOrigin: "top center",
            }}
            animate={{
              opacity: [0, 0.8, 0.8, 0],
              scale: [0.8, 1, 1, 0.8],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatDelay: 3,
              delay,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
