"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import {
  type AcwrResult,
  type AcwrRiskLevel,
  ACWR_RISK_CONFIG,
} from "./workload.types";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

type AcwrGaugeProps = {
  acwr: AcwrResult;
  size?: "sm" | "md" | "lg";
  showDetails?: boolean;
};

const sizeConfig = {
  sm: {
    container: "w-20 h-20",
    text: "text-lg",
    label: "text-xs",
    stroke: 6,
  },
  md: {
    container: "w-32 h-32",
    text: "text-2xl",
    label: "text-sm",
    stroke: 8,
  },
  lg: {
    container: "w-40 h-40",
    text: "text-3xl",
    label: "text-base",
    stroke: 10,
  },
};

const riskColors: Record<AcwrRiskLevel, string> = {
  undertrained: "#3b82f6", // blue-500
  optimal: "#22c55e", // green-500
  caution: "#eab308", // yellow-500
  danger: "#ef4444", // red-500
};

export function AcwrGauge({
  acwr,
  size = "md",
  showDetails = true,
}: AcwrGaugeProps) {
  const config = sizeConfig[size];
  const riskConfig = ACWR_RISK_CONFIG[acwr.riskLevel];

  // Calculate gauge progress (0-2 ACWR range mapped to 0-100%)
  const acwrValue = acwr.acwr ?? 0;
  const progress = Math.min(Math.max(acwrValue / 2, 0), 1) * 100;

  // SVG calculations
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const TrendIcon =
    acwr.trend === "increasing"
      ? TrendingUp
      : acwr.trend === "decreasing"
        ? TrendingDown
        : Minus;

  return (
    <div className="flex flex-col items-center">
      {/* Gauge */}
      <div className={cn("relative", config.container)}>
        <svg className="size-full -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={config.stroke}
            className="text-muted/20"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={riskColors[acwr.riskLevel]}
            strokeWidth={config.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-bold", config.text)}>
            {acwr.acwr !== null ? acwr.acwr.toFixed(2) : "—"}
          </span>
          <span className={cn("text-muted-foreground", config.label)}>
            ACWR
          </span>
        </div>
      </div>

      {/* Details */}
      {showDetails && (
        <div className="mt-3 flex flex-col items-center gap-1">
          {/* Risk badge */}
          <div
            className={cn(
              "flex items-center gap-1 rounded-full px-3 py-1",
              riskConfig.bgColor,
              riskConfig.color,
            )}
          >
            <span className="text-sm font-medium">{riskConfig.label}</span>
          </div>

          {/* Trend indicator */}
          <div className="text-muted-foreground flex items-center gap-1 text-xs">
            <TrendIcon className="size-3" />
            <span>
              {acwr.trend === "increasing"
                ? "En hausse"
                : acwr.trend === "decreasing"
                  ? "En baisse"
                  : "Stable"}
            </span>
          </div>

          {/* Load details */}
          <div className="text-muted-foreground mt-1 text-xs">
            <span>Aigu: {Math.round(acwr.acuteLoad)}</span>
            <span className="mx-2">|</span>
            <span>Chronique: {Math.round(acwr.chronicLoad)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
