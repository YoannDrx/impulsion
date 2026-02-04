"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type AnimatedCounterProps = {
  value: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  glowColor?: "lime" | "cyan";
};

export function AnimatedCounter({
  value,
  duration = 2,
  delay = 0,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
  glowColor = "lime",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const display = useTransform(spring, (current) => current.toFixed(decimals));

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timeout = setTimeout(() => {
        spring.set(value);
        setHasAnimated(true);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, hasAnimated, spring, value, delay]);

  return (
    <motion.span
      ref={ref}
      className={cn(
        "font-mono font-bold tabular-nums",
        glowColor === "lime" && "text-lime-400",
        glowColor === "cyan" && "text-cyan-400",
        className,
      )}
      style={{
        textShadow:
          glowColor === "lime"
            ? "0 0 20px oklch(0.91 0.23 120 / 0.6)"
            : "0 0 20px oklch(0.85 0.16 195 / 0.6)",
      }}
    >
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </motion.span>
  );
}

type AnimatedStatProps = {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  glowColor?: "lime" | "cyan";
  delay?: number;
  showLive?: boolean;
};

export function AnimatedStat({
  value,
  label,
  suffix = "",
  prefix = "",
  decimals = 0,
  glowColor = "lime",
  delay = 0,
  showLive = false,
}: AnimatedStatProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <AnimatedCounter
          value={value}
          suffix={suffix}
          prefix={prefix}
          decimals={decimals}
          glowColor={glowColor}
          delay={delay}
          className="text-4xl md:text-5xl lg:text-6xl"
        />
        {showLive && (
          <span className="absolute -top-1 -right-3 flex size-2">
            <span
              className={cn(
                "absolute inline-flex size-full animate-ping rounded-full opacity-75",
                glowColor === "lime" ? "bg-lime-400" : "bg-cyan-400",
              )}
            />
            <span
              className={cn(
                "relative inline-flex size-2 rounded-full",
                glowColor === "lime" ? "bg-lime-500" : "bg-cyan-500",
              )}
            />
          </span>
        )}
      </div>
      <span className="text-muted-foreground text-sm tracking-wider uppercase">
        {label}
      </span>
    </div>
  );
}
