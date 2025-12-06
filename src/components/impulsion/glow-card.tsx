"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";
import type * as React from "react";

import { cn } from "@/lib/utils";

const glowCardVariants = cva(
  "relative overflow-hidden rounded-xl border transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-card border-border",
        glass:
          "bg-[var(--glass-background)] border-[var(--glass-border)] backdrop-blur-xl",
        elevated: "bg-imp-dark-800 border-imp-dark-600",
      },
      glow: {
        none: "",
        lime: "hover:shadow-[var(--glow-primary)]",
        cyan: "hover:shadow-[var(--glow-secondary)]",
        intense:
          "hover:shadow-[var(--glow-intense)] hover:border-imp-lime-500/50",
      },
      size: {
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      glow: "lime",
      size: "default",
    },
  },
);

export type GlowCardProps = React.ComponentProps<"div"> &
  VariantProps<typeof glowCardVariants> & {
    /** Show animated glow border on hover */
    animatedBorder?: boolean;
  };

function GlowCard({
  className,
  variant,
  glow,
  size,
  animatedBorder = false,
  children,
}: GlowCardProps) {
  return (
    <motion.div
      data-slot="glow-card"
      className={cn(glowCardVariants({ variant, glow, size }), className)}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {animatedBorder && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
          <motion.div
            className="from-imp-lime-400 via-imp-cyan-400 to-imp-lime-400 absolute inset-[-2px] bg-gradient-to-r"
            style={{ backgroundSize: "200% 100%" }}
            animate={{
              backgroundPosition: ["0% 0%", "200% 0%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <div className="bg-card absolute inset-[1px] rounded-[11px]" />
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

function GlowCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="glow-card-header"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  );
}

function GlowCardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="glow-card-title"
      className={cn(
        "font-display text-lg font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function GlowCardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="glow-card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function GlowCardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="glow-card-content"
      className={cn("mt-4", className)}
      {...props}
    />
  );
}

function GlowCardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="glow-card-footer"
      className={cn("mt-6 flex items-center gap-2", className)}
      {...props}
    />
  );
}

export {
  GlowCard,
  GlowCardHeader,
  GlowCardTitle,
  GlowCardDescription,
  GlowCardContent,
  GlowCardFooter,
  glowCardVariants,
};
