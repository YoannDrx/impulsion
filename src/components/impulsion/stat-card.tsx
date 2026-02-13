"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";
import type * as React from "react";

import { cn } from "@/lib/utils";

const statCardVariants = cva(
  "relative flex flex-col gap-1 overflow-hidden rounded-lg border p-4 transition-all",
  {
    variants: {
      variant: {
        default: "border-border bg-card",
        glass:
          "border-[var(--glass-border)] bg-[var(--glass-background)] backdrop-blur-xl",
        elevated: "border-imp-dark-600 bg-imp-dark-800",
      },
      accent: {
        none: "",
        lime: "border-l-2 border-l-imp-lime-400",
        cyan: "border-l-2 border-l-imp-cyan-400",
        success: "border-l-2 border-l-success",
        warning: "border-l-2 border-l-warning",
        danger: "border-l-2 border-l-destructive",
      },
      size: {
        sm: "p-3",
        default: "p-4",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      accent: "none",
      size: "default",
    },
  },
);

export type StatCardProps = React.ComponentProps<"div"> &
  VariantProps<typeof statCardVariants> & {
    /** The main statistic value */
    value: string | number;
    /** Label describing the stat */
    label: string;
    /** Optional unit (km, min, bpm, etc.) */
    unit?: string;
    /** Optional icon to display */
    icon?: React.ReactNode;
    /** Optional trend indicator (+5%, -2%, etc.) */
    trend?: {
      value: string;
      direction: "up" | "down" | "neutral";
    };
    /** Animate the value counting up */
    animateValue?: boolean;
  };

function StatCard({
  className,
  variant,
  accent,
  size,
  value,
  label,
  unit,
  icon,
  trend,
  animateValue = false,
}: StatCardProps) {
  return (
    <motion.div
      data-slot="stat-card"
      className={cn(statCardVariants({ variant, accent, size }), className)}
      initial={animateValue ? { opacity: 0, y: 10 } : undefined}
      animate={animateValue ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex items-start justify-between">
        <span className="text-muted-foreground text-sm">{label}</span>
        {icon && (
          <span className="text-muted-foreground [&>svg]:size-4">{icon}</span>
        )}
      </div>

      <div className="flex items-baseline gap-1">
        <span className="font-stat text-2xl font-bold tracking-tight">
          {value}
        </span>
        {unit && <span className="text-muted-foreground text-sm">{unit}</span>}
      </div>

      {trend && (
        <div
          className={cn(
            "mt-1 flex items-center gap-1 text-xs font-medium",
            trend.direction === "up" && "text-success",
            trend.direction === "down" && "text-destructive",
            trend.direction === "neutral" && "text-muted-foreground",
          )}
        >
          {trend.direction === "up" && (
            <svg
              className="size-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          )}
          {trend.direction === "down" && (
            <svg
              className="size-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          )}
          <span>{trend.value}</span>
        </div>
      )}
    </motion.div>
  );
}

/** Container for multiple stat cards in a grid */
function StatCardGrid({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-card-grid"
      className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { StatCard, StatCardGrid, statCardVariants };
