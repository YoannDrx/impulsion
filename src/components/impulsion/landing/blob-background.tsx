"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useMemo } from "react";

type BlobBackgroundProps = {
  className?: string;
  color?: "lime" | "cyan" | "mixed";
  count?: number;
  blur?: number;
  opacity?: number;
};

// Predefined random-like values for deterministic rendering
const BLOB_CONFIGS = [
  { sizeOffset: 0.2, x: 15, y: 25, durationOffset: 0.3 },
  { sizeOffset: 0.7, x: 65, y: 10, durationOffset: 0.8 },
  { sizeOffset: 0.4, x: 40, y: 70, durationOffset: 0.5 },
  { sizeOffset: 0.9, x: 80, y: 55, durationOffset: 0.2 },
  { sizeOffset: 0.5, x: 25, y: 85, durationOffset: 0.6 },
  { sizeOffset: 0.3, x: 55, y: 35, durationOffset: 0.9 },
];

export function BlobBackground({
  className,
  color = "mixed",
  count = 4,
  blur = 100,
  opacity = 0.3,
}: BlobBackgroundProps) {
  const blobs = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const blobColor =
        color === "mixed"
          ? i % 2 === 0
            ? "bg-lime-400"
            : "bg-cyan-400"
          : color === "lime"
            ? "bg-lime-400"
            : "bg-cyan-400";

      const config = BLOB_CONFIGS[i % BLOB_CONFIGS.length];
      const size = 200 + config.sizeOffset * 300;

      return {
        id: i,
        color: blobColor,
        size,
        x: config.x,
        y: config.y,
        duration: 15 + config.durationOffset * 10,
        delay: i * 2,
      };
    });
  }, [count, color]);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      style={{ filter: `blur(${blur}px)` }}
    >
      {blobs.map((blob) => (
        <motion.div
          key={blob.id}
          className={cn("absolute rounded-full", blob.color)}
          style={{
            width: blob.size,
            height: blob.size,
            left: `${blob.x}%`,
            top: `${blob.y}%`,
            opacity,
          }}
          animate={{
            x: [0, 50, -30, 20, 0],
            y: [0, -40, 30, -20, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            delay: blob.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

type FloatingBlobProps = {
  className?: string;
  color?: "lime" | "cyan";
  size?: number;
};

export function FloatingBlob({
  className,
  color = "lime",
  size = 400,
}: FloatingBlobProps) {
  const blobColor = color === "lime" ? "bg-lime-400" : "bg-cyan-400";
  const glowColor =
    color === "lime"
      ? "shadow-[0_0_100px_50px_oklch(0.91_0.23_120/0.3)]"
      : "shadow-[0_0_100px_50px_oklch(0.85_0.16_195/0.3)]";

  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl",
        blobColor,
        glowColor,
        className,
      )}
      style={{
        width: size,
        height: size,
        opacity: 0.4,
      }}
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 180, 360],
        borderRadius: ["40% 60% 60% 40%", "60% 40% 40% 60%", "40% 60% 60% 40%"],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

type OrganicShapeProps = {
  className?: string;
  color?: "lime" | "cyan";
};

export function OrganicShape({ className, color = "lime" }: OrganicShapeProps) {
  const fillColor = color === "lime" ? "#ccff00" : "#00f3ff";
  const glowColor =
    color === "lime"
      ? "drop-shadow-[0_0_30px_oklch(0.91_0.23_120/0.5)]"
      : "drop-shadow-[0_0_30px_oklch(0.85_0.16_195/0.5)]";

  return (
    <motion.svg
      viewBox="0 0 200 200"
      className={cn("size-full", glowColor, className)}
      animate={{
        d: [
          "M44.5,-76.2C57.1,-68.4,66.3,-54.2,73.7,-39.1C81.1,-24,86.7,-8.1,84.8,6.8C82.9,21.7,73.5,35.6,62.7,47.8C51.9,60,39.7,70.5,25.4,76.8C11.1,83.1,-5.3,85.2,-20.6,81.5C-35.9,77.8,-50.1,68.3,-61.7,55.9C-73.3,43.5,-82.3,28.2,-85.1,11.7C-87.9,-4.8,-84.5,-22.5,-76.3,-37.5C-68.1,-52.5,-55.1,-64.8,-40.7,-71.8C-26.3,-78.8,-10.5,-80.5,3.2,-85.5C16.9,-90.5,31.9,-84,44.5,-76.2Z",
          "M47.7,-79.6C60.7,-72.5,69.3,-57.1,76.6,-41.1C83.9,-25.1,89.9,-8.5,88.3,7.4C86.7,23.3,77.5,38.5,66,51.4C54.5,64.3,40.7,74.9,25.1,80.2C9.5,85.5,-7.9,85.5,-23.7,80.4C-39.5,75.3,-53.7,65.1,-64.3,52.1C-74.9,39.1,-81.9,23.3,-83.8,6.6C-85.7,-10.1,-82.5,-27.7,-74.1,-42.5C-65.7,-57.3,-52.1,-69.3,-37.4,-75.6C-22.7,-81.9,-6.9,-82.5,6.3,-91.6C19.5,-100.7,34.7,-86.7,47.7,-79.6Z",
          "M44.5,-76.2C57.1,-68.4,66.3,-54.2,73.7,-39.1C81.1,-24,86.7,-8.1,84.8,6.8C82.9,21.7,73.5,35.6,62.7,47.8C51.9,60,39.7,70.5,25.4,76.8C11.1,83.1,-5.3,85.2,-20.6,81.5C-35.9,77.8,-50.1,68.3,-61.7,55.9C-73.3,43.5,-82.3,28.2,-85.1,11.7C-87.9,-4.8,-84.5,-22.5,-76.3,-37.5C-68.1,-52.5,-55.1,-64.8,-40.7,-71.8C-26.3,-78.8,-10.5,-80.5,3.2,-85.5C16.9,-90.5,31.9,-84,44.5,-76.2Z",
        ],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.path
        fill={fillColor}
        fillOpacity={0.1}
        stroke={fillColor}
        strokeWidth={0.5}
        strokeOpacity={0.3}
        d="M44.5,-76.2C57.1,-68.4,66.3,-54.2,73.7,-39.1C81.1,-24,86.7,-8.1,84.8,6.8C82.9,21.7,73.5,35.6,62.7,47.8C51.9,60,39.7,70.5,25.4,76.8C11.1,83.1,-5.3,85.2,-20.6,81.5C-35.9,77.8,-50.1,68.3,-61.7,55.9C-73.3,43.5,-82.3,28.2,-85.1,11.7C-87.9,-4.8,-84.5,-22.5,-76.3,-37.5C-68.1,-52.5,-55.1,-64.8,-40.7,-71.8C-26.3,-78.8,-10.5,-80.5,3.2,-85.5C16.9,-90.5,31.9,-84,44.5,-76.2Z"
        transform="translate(100 100)"
        animate={{
          d: [
            "M44.5,-76.2C57.1,-68.4,66.3,-54.2,73.7,-39.1C81.1,-24,86.7,-8.1,84.8,6.8C82.9,21.7,73.5,35.6,62.7,47.8C51.9,60,39.7,70.5,25.4,76.8C11.1,83.1,-5.3,85.2,-20.6,81.5C-35.9,77.8,-50.1,68.3,-61.7,55.9C-73.3,43.5,-82.3,28.2,-85.1,11.7C-87.9,-4.8,-84.5,-22.5,-76.3,-37.5C-68.1,-52.5,-55.1,-64.8,-40.7,-71.8C-26.3,-78.8,-10.5,-80.5,3.2,-85.5C16.9,-90.5,31.9,-84,44.5,-76.2Z",
            "M39.5,-67.1C51.3,-60.3,61.3,-49.8,68.9,-37.4C76.5,-25,81.7,-10.7,80.8,3.1C79.9,16.9,72.9,30.2,63.8,41.5C54.7,52.8,43.5,62.1,30.5,68.3C17.5,74.5,2.7,77.6,-12.8,77.2C-28.3,76.8,-44.5,72.9,-56.9,63.9C-69.3,54.9,-77.9,40.8,-82.1,25.5C-86.3,10.2,-86.1,-6.3,-81.4,-21.4C-76.7,-36.5,-67.5,-50.2,-55.1,-57C-42.7,-63.8,-27.1,-63.7,-12.9,-66.5C1.3,-69.3,27.7,-73.9,39.5,-67.1Z",
            "M44.5,-76.2C57.1,-68.4,66.3,-54.2,73.7,-39.1C81.1,-24,86.7,-8.1,84.8,6.8C82.9,21.7,73.5,35.6,62.7,47.8C51.9,60,39.7,70.5,25.4,76.8C11.1,83.1,-5.3,85.2,-20.6,81.5C-35.9,77.8,-50.1,68.3,-61.7,55.9C-73.3,43.5,-82.3,28.2,-85.1,11.7C-87.9,-4.8,-84.5,-22.5,-76.3,-37.5C-68.1,-52.5,-55.1,-64.8,-40.7,-71.8C-26.3,-78.8,-10.5,-80.5,3.2,-85.5C16.9,-90.5,31.9,-84,44.5,-76.2Z",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.svg>
  );
}
