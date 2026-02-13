"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type RadialGaugeProps = {
  value: number;
  max?: number;
  label?: string;
  unit?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: "lime" | "cyan" | "danger" | "auto";
  animated?: boolean;
  showValue?: boolean;
};

/**
 * Radial Gauge - Jauge circulaire SVG style HUD
 * Avec animation de remplissage et support de seuils de couleur
 */
export function RadialGauge({
  value,
  max = 100,
  label,
  unit = "%",
  className,
  size = "md",
  color = "auto",
  animated = true,
  showValue = true,
}: RadialGaugeProps) {
  const [displayValue, setDisplayValue] = useState(animated ? 0 : value);

  const percentage = Math.min((value / max) * 100, 100);

  // Animation du compteur
  useEffect(() => {
    if (!animated) {
      setDisplayValue(value);
      return;
    }

    const duration = 1000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, value);
      setDisplayValue(Math.round(current));

      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, animated]);

  // Couleur automatique basee sur la valeur
  const getAutoColor = () => {
    if (percentage >= 80) return "lime";
    if (percentage >= 50) return "cyan";
    if (percentage >= 30) return "warning";
    return "danger";
  };

  const activeColor = color === "auto" ? getAutoColor() : color;

  const colorClasses = {
    lime: "stroke-[var(--imp-lime-400)]",
    cyan: "stroke-[var(--imp-cyan-400)]",
    danger: "stroke-[var(--imp-danger-neon)]",
    warning: "stroke-[var(--imp-warning)]",
  };

  const glowClasses = {
    lime: "[filter:drop-shadow(0_0_4px_var(--imp-lime-400))]",
    cyan: "[filter:drop-shadow(0_0_4px_var(--imp-cyan-400))]",
    danger: "[filter:drop-shadow(0_0_4px_var(--imp-danger-neon))]",
    warning: "[filter:drop-shadow(0_0_4px_var(--imp-warning))]",
  };

  const textColors = {
    lime: "text-[var(--imp-lime-400)]",
    cyan: "text-[var(--imp-cyan-400)]",
    danger: "text-[var(--imp-danger-neon)]",
    warning: "text-[var(--imp-warning)]",
  };

  const sizeConfig = {
    sm: { size: 80, stroke: 6, fontSize: "text-lg" },
    md: { size: 120, stroke: 8, fontSize: "text-2xl" },
    lg: { size: 160, stroke: 10, fontSize: "text-4xl" },
  };

  const config = sizeConfig[size];
  const radius = (config.size - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className={cn("relative inline-flex flex-col items-center", className)}
    >
      <svg width={config.size} height={config.size} className="rotate-[-90deg]">
        {/* Background track */}
        <circle
          cx={config.size / 2}
          cy={config.size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={config.stroke}
          className="text-neutral-800"
        />

        {/* Progress arc */}
        <circle
          cx={config.size / 2}
          cy={config.size / 2}
          r={radius}
          fill="none"
          strokeWidth={config.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={cn(
            colorClasses[activeColor],
            glowClasses[activeColor],
            animated && "transition-all duration-1000 ease-out",
          )}
        />

        {/* Tick marks */}
        {[0, 25, 50, 75, 100].map((tick) => {
          const angle = (tick / 100) * 360 - 90;
          const tickRadius = radius + config.stroke / 2 + 4;
          const x =
            config.size / 2 + tickRadius * Math.cos((angle * Math.PI) / 180);
          const y =
            config.size / 2 + tickRadius * Math.sin((angle * Math.PI) / 180);

          return (
            <circle
              key={tick}
              cx={x}
              cy={y}
              r={1}
              fill="currentColor"
              className="text-neutral-600"
            />
          );
        })}
      </svg>

      {/* Center value */}
      {showValue && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={cn(
              "font-mono font-bold tabular-nums",
              config.fontSize,
              textColors[activeColor],
            )}
          >
            {displayValue}
            <span className="text-[0.5em] opacity-70">{unit}</span>
          </span>
        </div>
      )}

      {/* Label */}
      {label && (
        <span className="mt-2 text-xs font-medium tracking-wider text-neutral-400 uppercase">
          {label}
        </span>
      )}
    </div>
  );
}
