"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode, type MouseEvent } from "react";

type FloatingCardProps = {
  children: ReactNode;
  className?: string;
  glowColor?: "lime" | "cyan" | "none";
  tiltAmount?: number;
  floatAmount?: number;
};

export function FloatingCard({
  children,
  className,
  glowColor = "lime",
  tiltAmount = 10,
  floatAmount = 5,
}: FloatingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [tiltAmount, -tiltAmount]),
    {
      stiffness: 300,
      damping: 30,
    },
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-tiltAmount, tiltAmount]),
    {
      stiffness: 300,
      damping: 30,
    },
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const glowStyles = {
    lime: "shadow-[0_0_30px_oklch(0.91_0.23_120/0.2)] hover:shadow-[0_0_50px_oklch(0.91_0.23_120/0.3)]",
    cyan: "shadow-[0_0_30px_oklch(0.85_0.16_195/0.2)] hover:shadow-[0_0_50px_oklch(0.85_0.16_195/0.3)]",
    none: "",
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative rounded-xl border border-white/10 bg-neutral-900/50 p-6 backdrop-blur-sm transition-shadow",
        glowStyles[glowColor],
        className,
      )}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        y: [0, -floatAmount, 0],
      }}
      transition={{
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type FloatingElementProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  amplitude?: number;
  duration?: number;
};

export function FloatingElement({
  children,
  className,
  delay = 0,
  amplitude = 10,
  duration = 4,
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -amplitude, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  glowColor?: "lime" | "cyan" | "none";
  animated?: boolean;
};

export function GlassCard({
  children,
  className,
  glowColor = "none",
  animated = false,
}: GlassCardProps) {
  const glowStyles = {
    lime: "border-lime-400/20 shadow-[0_0_30px_oklch(0.91_0.23_120/0.15)]",
    cyan: "border-cyan-400/20 shadow-[0_0_30px_oklch(0.85_0.16_195/0.15)]",
    none: "border-white/10",
  };

  const Card = animated ? motion.div : "div";

  return (
    <Card
      className={cn(
        "rounded-xl border bg-white/5 p-6 backdrop-blur-md",
        glowStyles[glowColor],
        className,
      )}
      {...(animated
        ? {
            whileHover: {
              scale: 1.02,
              boxShadow:
                glowColor === "lime"
                  ? "0 0 50px oklch(0.91 0.23 120 / 0.25)"
                  : glowColor === "cyan"
                    ? "0 0 50px oklch(0.85 0.16 195 / 0.25)"
                    : undefined,
            },
            transition: { duration: 0.2 },
          }
        : {})}
    >
      {children}
    </Card>
  );
}

type BentoCardProps = {
  children: ReactNode;
  className?: string;
  span?: "1" | "2" | "row";
  glowColor?: "lime" | "cyan" | "none";
};

export function BentoCard({
  children,
  className,
  span = "1",
  glowColor = "none",
}: BentoCardProps) {
  const spanStyles = {
    "1": "",
    "2": "md:col-span-2",
    row: "md:col-span-2 lg:col-span-3",
  };

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10 bg-neutral-900/50 p-6 backdrop-blur-sm transition-all",
        spanStyles[span],
        glowColor === "lime" &&
          "hover:border-lime-400/30 hover:shadow-[0_0_30px_oklch(0.91_0.23_120/0.2)]",
        glowColor === "cyan" &&
          "hover:border-cyan-400/30 hover:shadow-[0_0_30px_oklch(0.85_0.16_195/0.2)]",
        className,
      )}
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
