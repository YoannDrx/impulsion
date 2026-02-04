"use client";

import { cn } from "@/lib/utils";
import { motion, type Variants } from "motion/react";
import { useState, type ReactNode, type MouseEvent } from "react";

type RippleButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: "lime" | "cyan" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
};

type Ripple = {
  id: number;
  x: number;
  y: number;
};

export function RippleButton({
  children,
  className,
  variant = "lime",
  size = "md",
  onClick,
  disabled = false,
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      id: Date.now(),
      x,
      y,
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    onClick?.();
  };

  const variantStyles = {
    lime: "bg-lime-400 text-black hover:bg-lime-300 shadow-[0_0_30px_oklch(0.91_0.23_120/0.4)]",
    cyan: "bg-cyan-400 text-black hover:bg-cyan-300 shadow-[0_0_30px_oklch(0.85_0.16_195/0.4)]",
    outline:
      "bg-transparent border-2 border-lime-400 text-lime-400 hover:bg-lime-400/10",
  };

  const rippleColors = {
    lime: "bg-black/20",
    cyan: "bg-black/20",
    outline: "bg-lime-400/30",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      className={cn(
        "relative overflow-hidden rounded-lg font-semibold transition-all",
        variantStyles[variant],
        sizeStyles[size],
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      onClick={handleClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className={cn(
            "pointer-events-none absolute rounded-full",
            rippleColors[variant],
          )}
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
          initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.5 }}
          animate={{
            width: 400,
            height: 400,
            x: -200,
            y: -200,
            opacity: 0,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

type GlowButtonProps = {
  children: ReactNode;
  className?: string;
  color?: "lime" | "cyan";
  onClick?: () => void;
};

export function GlowButton({
  children,
  className,
  color = "lime",
  onClick,
}: GlowButtonProps) {
  const buttonVariants: Variants = {
    initial: {
      boxShadow:
        color === "lime"
          ? "0 0 20px oklch(0.91 0.23 120 / 0.3)"
          : "0 0 20px oklch(0.85 0.16 195 / 0.3)",
    },
    hover: {
      boxShadow:
        color === "lime"
          ? "0 0 40px oklch(0.91 0.23 120 / 0.6)"
          : "0 0 40px oklch(0.85 0.16 195 / 0.6)",
    },
  };

  return (
    <motion.button
      className={cn(
        "relative rounded-lg px-8 py-4 font-bold transition-colors",
        color === "lime"
          ? "bg-lime-400 text-black hover:bg-lime-300"
          : "bg-cyan-400 text-black hover:bg-cyan-300",
        className,
      )}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

type OutlineGlowButtonProps = {
  children: ReactNode;
  className?: string;
  color?: "lime" | "cyan";
  onClick?: () => void;
};

export function OutlineGlowButton({
  children,
  className,
  color = "lime",
  onClick,
}: OutlineGlowButtonProps) {
  return (
    <motion.button
      className={cn(
        "relative rounded-lg border-2 bg-transparent px-8 py-4 font-bold transition-all",
        color === "lime"
          ? "border-lime-400 text-lime-400 hover:bg-lime-400/10"
          : "border-cyan-400 text-cyan-400 hover:bg-cyan-400/10",
        className,
      )}
      whileHover={{
        boxShadow:
          color === "lime"
            ? "0 0 30px oklch(0.91 0.23 120 / 0.4), inset 0 0 30px oklch(0.91 0.23 120 / 0.1)"
            : "0 0 30px oklch(0.85 0.16 195 / 0.4), inset 0 0 30px oklch(0.85 0.16 195 / 0.1)",
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
