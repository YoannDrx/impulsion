"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

type BodyZone =
  | "head"
  | "neck"
  | "left-shoulder"
  | "right-shoulder"
  | "chest"
  | "left-arm"
  | "right-arm"
  | "core"
  | "left-hip"
  | "right-hip"
  | "left-thigh"
  | "right-thigh"
  | "left-knee"
  | "right-knee"
  | "left-calf"
  | "right-calf"
  | "left-foot"
  | "right-foot";

type ZoneStatus = "optimal" | "fatigued" | "at-risk" | "injured";

type BodyMapProps = {
  zones?: Partial<Record<BodyZone, ZoneStatus>>;
  onZoneClick?: (zone: BodyZone) => void;
  selectedZone?: BodyZone | null;
  className?: string;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
};

const zoneColors: Record<ZoneStatus, string> = {
  optimal: "var(--imp-lime-400)",
  fatigued: "var(--imp-cyan-400)",
  "at-risk": "var(--imp-warning)",
  injured: "var(--imp-danger-neon)",
};

/**
 * Body Map - Silhouette humaine avec zones cliquables
 * Pour visualiser l'etat physique d'un athlete
 */
export function BodyMap({
  zones = {},
  onZoneClick,
  selectedZone,
  className,
  size = "md",
  interactive = true,
}: BodyMapProps) {
  const [hoveredZone, setHoveredZone] = useState<BodyZone | null>(null);

  const sizeConfig = {
    sm: { width: 120, height: 240 },
    md: { width: 180, height: 360 },
    lg: { width: 240, height: 480 },
  };

  const { width, height } = sizeConfig[size];

  const getZoneColor = (zone: BodyZone) => {
    const status = zones[zone];
    if (!status) return "var(--imp-glass-15)";
    return zoneColors[status];
  };

  const getZoneOpacity = (zone: BodyZone) => {
    if (selectedZone === zone) return 1;
    if (hoveredZone === zone) return 0.8;
    if (zones[zone]) return 0.6;
    return 0.3;
  };

  const handleZoneInteraction = (zone: BodyZone) => {
    if (interactive && onZoneClick) {
      onZoneClick(zone);
    }
  };

  // Simplified body parts SVG paths (proportional to 100x200 viewBox)
  const bodyParts: { zone: BodyZone; d: string }[] = [
    // Head
    { zone: "head", d: "M42,8 a8,10 0 1,1 16,0 a8,10 0 1,1 -16,0" },
    // Neck
    { zone: "neck", d: "M46,18 L54,18 L53,25 L47,25 Z" },
    // Shoulders
    { zone: "left-shoulder", d: "M35,25 L47,25 L47,32 L38,35 Z" },
    { zone: "right-shoulder", d: "M53,25 L65,25 L62,35 L53,32 Z" },
    // Chest
    { zone: "chest", d: "M40,32 L60,32 L60,50 L40,50 Z" },
    // Arms
    { zone: "left-arm", d: "M30,35 L38,35 L35,70 L28,70 Z" },
    { zone: "right-arm", d: "M62,35 L70,35 L72,70 L65,70 Z" },
    // Core
    { zone: "core", d: "M42,50 L58,50 L58,75 L42,75 Z" },
    // Hips
    { zone: "left-hip", d: "M40,75 L50,75 L48,85 L38,85 Z" },
    { zone: "right-hip", d: "M50,75 L60,75 L62,85 L52,85 Z" },
    // Thighs
    { zone: "left-thigh", d: "M38,85 L48,85 L46,120 L36,120 Z" },
    { zone: "right-thigh", d: "M52,85 L62,85 L64,120 L54,120 Z" },
    // Knees
    { zone: "left-knee", d: "M36,120 L46,120 L45,135 L37,135 Z" },
    { zone: "right-knee", d: "M54,120 L64,120 L63,135 L55,135 Z" },
    // Calves
    { zone: "left-calf", d: "M37,135 L45,135 L44,170 L38,170 Z" },
    { zone: "right-calf", d: "M55,135 L63,135 L62,170 L56,170 Z" },
    // Feet
    { zone: "left-foot", d: "M35,170 L44,170 L45,185 L34,185 Z" },
    { zone: "right-foot", d: "M56,170 L65,170 L66,185 L55,185 Z" },
  ];

  return (
    <div className={cn("relative inline-block", className)}>
      <svg
        viewBox="0 0 100 200"
        width={width}
        height={height}
        className="overflow-visible"
      >
        {/* Grid background */}
        <defs>
          <pattern
            id="bodyMapGrid"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="var(--imp-grid-line)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100" height="200" fill="url(#bodyMapGrid)" opacity="0.3" />

        {/* Body outline glow */}
        <g filter="url(#bodyGlow)">
          {bodyParts.map(({ zone, d }) => (
            <path
              key={zone}
              d={d}
              fill={getZoneColor(zone)}
              opacity={getZoneOpacity(zone)}
              stroke={selectedZone === zone ? "white" : "var(--imp-glass-20)"}
              strokeWidth={selectedZone === zone ? 1.5 : 0.5}
              className={cn(
                "transition-all duration-200",
                interactive && "cursor-pointer",
              )}
              onMouseEnter={() => interactive && setHoveredZone(zone)}
              onMouseLeave={() => setHoveredZone(null)}
              onClick={() => handleZoneInteraction(zone)}
            />
          ))}
        </g>

        {/* Glow filter */}
        <defs>
          <filter id="bodyGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Hover tooltip */}
      {hoveredZone && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded border border-neutral-700 bg-[var(--imp-charcoal)] px-2 py-1 font-mono text-xs whitespace-nowrap text-white">
          {hoveredZone.replace("-", " ").toUpperCase()}
          {zones[hoveredZone] && (
            <span
              className="ml-2"
              style={{ color: zoneColors[zones[hoveredZone]] }}
            >
              [{zones[hoveredZone].toUpperCase()}]
            </span>
          )}
        </div>
      )}
    </div>
  );
}
