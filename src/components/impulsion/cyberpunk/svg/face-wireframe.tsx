"use client";

import { cn } from "@/lib/utils";

type FaceWireframeProps = {
  className?: string;
  size?: number;
  color?: "lime" | "cyan";
  animated?: boolean;
  scanLine?: boolean;
};

/**
 * Face Wireframe - Maillage 3D simplifie d'un visage
 * Pour ecran d'authentification biometrique
 */
export function FaceWireframe({
  className,
  size = 200,
  color = "cyan",
  animated = true,
  scanLine = true,
}: FaceWireframeProps) {
  const strokeColor =
    color === "lime" ? "var(--imp-lime-400)" : "var(--imp-cyan-400)";
  const glowFilter = color === "lime" ? "url(#limeGlow)" : "url(#cyanGlow)";

  return (
    <div
      className={cn("relative", className)}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className={cn(
          "overflow-visible",
          animated && "animate-[imp-float_4s_ease-in-out_infinite]",
        )}
      >
        {/* Glow filters */}
        <defs>
          <filter id="cyanGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="limeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Face outline */}
        <g
          fill="none"
          stroke={strokeColor}
          strokeWidth="0.5"
          opacity="0.6"
          filter={glowFilter}
        >
          {/* Oval face shape */}
          <ellipse cx="100" cy="100" rx="60" ry="80" />

          {/* Horizontal grid lines */}
          {[40, 60, 80, 100, 120, 140, 160].map((y) => (
            <ellipse
              key={y}
              cx="100"
              cy={y}
              rx={60 * Math.sin(((y - 20) / 160) * Math.PI)}
              ry="0"
              strokeWidth="0.3"
            />
          ))}

          {/* Vertical grid lines */}
          {[-40, -20, 0, 20, 40].map((offset) => (
            <path
              key={offset}
              d={`M ${100 + offset} 20 Q ${100 + offset * 1.2} 100, ${100 + offset} 180`}
              strokeWidth="0.3"
            />
          ))}
        </g>

        {/* Facial features - wireframe style */}
        <g fill="none" stroke={strokeColor} strokeWidth="1" filter={glowFilter}>
          {/* Eyes */}
          <ellipse cx="70" cy="85" rx="15" ry="8" />
          <ellipse cx="130" cy="85" rx="15" ry="8" />
          <circle cx="70" cy="85" r="4" />
          <circle cx="130" cy="85" r="4" />

          {/* Eyebrows */}
          <path d="M55 70 Q70 65, 85 70" />
          <path d="M115 70 Q130 65, 145 70" />

          {/* Nose */}
          <path d="M100 75 L100 110" />
          <path d="M90 115 Q100 120, 110 115" />

          {/* Mouth */}
          <path d="M75 140 Q100 155, 125 140" />
          <line x1="75" y1="140" x2="85" y2="140" />
          <line x1="115" y1="140" x2="125" y2="140" />
        </g>

        {/* Corner brackets */}
        <g stroke={strokeColor} strokeWidth="2" fill="none" opacity="0.8">
          <path d="M15 15 L15 35 M15 15 L35 15" />
          <path d="M185 15 L185 35 M185 15 L165 15" />
          <path d="M15 185 L15 165 M15 185 L35 185" />
          <path d="M185 185 L185 165 M185 185 L165 185" />
        </g>

        {/* Data points */}
        <g fill={strokeColor}>
          {[
            [70, 85],
            [130, 85],
            [100, 110],
            [100, 145],
            [40, 100],
            [160, 100],
          ].map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="2"
              className={
                animated
                  ? "animate-[imp-pulse-fast_1.5s_ease-in-out_infinite]"
                  : ""
              }
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </g>
      </svg>

      {/* Scan line */}
      {scanLine && (
        <div
          className="pointer-events-none absolute left-0 h-0.5 w-full animate-[imp-scan-vertical_2s_linear_infinite]"
          style={{
            background: `linear-gradient(90deg, transparent, ${strokeColor}, transparent)`,
            boxShadow: `0 0 10px ${strokeColor}`,
          }}
        />
      )}
    </div>
  );
}
