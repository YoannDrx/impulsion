"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type GridBackgroundProps = {
  className?: string;
  color?: "lime" | "cyan" | "white";
  spacing?: number;
  animated?: boolean;
  perspective?: boolean;
};

export function GridBackground({
  className,
  color = "lime",
  spacing = 60,
  animated = false,
  perspective = false,
}: GridBackgroundProps) {
  const gridColor = {
    lime: "oklch(0.91 0.23 120 / 0.15)",
    cyan: "oklch(0.85 0.16 195 / 0.15)",
    white: "oklch(1 0 0 / 0.08)",
  };

  const glowColor = {
    lime: "oklch(0.91 0.23 120 / 0.3)",
    cyan: "oklch(0.85 0.16 195 / 0.3)",
    white: "oklch(1 0 0 / 0.2)",
  };

  const gridStyle = {
    backgroundImage: `
      linear-gradient(90deg, ${gridColor[color]} 1px, transparent 1px),
      linear-gradient(180deg, ${gridColor[color]} 1px, transparent 1px)
    `,
    backgroundSize: `${spacing}px ${spacing}px`,
  };

  if (perspective) {
    return (
      <div
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden",
          className,
        )}
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="absolute inset-0 origin-bottom"
          style={{
            ...gridStyle,
            transform: "rotateX(60deg) translateZ(0)",
            transformStyle: "preserve-3d",
          }}
          animate={
            animated
              ? {
                  backgroundPosition: [`0 0`, `0 ${spacing}px`],
                }
              : undefined
          }
          transition={
            animated
              ? {
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }
              : undefined
          }
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{
            background: `linear-gradient(to top, var(--background), transparent)`,
          }}
        />
      </div>
    );
  }

  return (
    <motion.div
      className={cn("pointer-events-none absolute inset-0", className)}
      style={gridStyle}
      animate={
        animated
          ? {
              backgroundPosition: [`0 0`, `${spacing}px ${spacing}px`],
            }
          : undefined
      }
      transition={
        animated
          ? {
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }
          : undefined
      }
    >
      {/* Corner glow accent */}
      <div
        className="absolute top-0 left-0 size-96 opacity-50"
        style={{
          background: `radial-gradient(circle at 0% 0%, ${glowColor[color]}, transparent 50%)`,
        }}
      />
    </motion.div>
  );
}

type GridLinesProps = {
  className?: string;
  color?: "lime" | "cyan";
  direction?: "horizontal" | "vertical" | "both";
  count?: number;
  animated?: boolean;
};

export function GridLines({
  className,
  color = "lime",
  direction = "both",
  count = 10,
  animated = true,
}: GridLinesProps) {
  const lineColor = color === "lime" ? "bg-lime-400/20" : "bg-cyan-400/20";
  const glowLine = color === "lime" ? "bg-lime-400" : "bg-cyan-400";

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {(direction === "horizontal" || direction === "both") &&
        Array.from({ length: count }).map((_, i) => (
          <div
            key={`h-${i}`}
            className={cn("absolute left-0 h-px w-full", lineColor)}
            style={{ top: `${(i / count) * 100}%` }}
          >
            {animated && (
              <motion.div
                className={cn("absolute h-full w-20", glowLine)}
                style={{
                  boxShadow:
                    color === "lime"
                      ? "0 0 20px oklch(0.91 0.23 120 / 0.5)"
                      : "0 0 20px oklch(0.85 0.16 195 / 0.5)",
                }}
                animate={{
                  x: ["-100%", "calc(100vw + 100%)"],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.3,
                }}
              />
            )}
          </div>
        ))}

      {(direction === "vertical" || direction === "both") &&
        Array.from({ length: count }).map((_, i) => (
          <div
            key={`v-${i}`}
            className={cn("absolute top-0 h-full w-px", lineColor)}
            style={{ left: `${(i / count) * 100}%` }}
          >
            {animated && (
              <motion.div
                className={cn("absolute h-20 w-full", glowLine)}
                style={{
                  boxShadow:
                    color === "lime"
                      ? "0 0 20px oklch(0.91 0.23 120 / 0.5)"
                      : "0 0 20px oklch(0.85 0.16 195 / 0.5)",
                }}
                animate={{
                  y: ["-100%", "calc(100vh + 100%)"],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.4,
                }}
              />
            )}
          </div>
        ))}
    </div>
  );
}

type ParallaxGridProps = {
  className?: string;
  color?: "lime" | "cyan";
};

export function ParallaxGrid({ className, color = "lime" }: ParallaxGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.15, 0]);

  const gridColor =
    color === "lime"
      ? "oklch(0.91 0.23 120 / 0.1)"
      : "oklch(0.85 0.16 195 / 0.1)";

  return (
    <div
      ref={ref}
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          y,
          opacity,
          backgroundImage: `
            linear-gradient(90deg, ${gridColor} 1px, transparent 1px),
            linear-gradient(180deg, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}
