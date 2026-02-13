"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";
import type * as React from "react";

import { cn } from "@/lib/utils";

const neonBadgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium transition-all [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default:
          "border-primary/50 bg-primary/10 text-primary shadow-[0_0_10px_var(--imp-lime-400)/20]",
        secondary:
          "border-secondary/50 bg-secondary/10 text-secondary shadow-[0_0_10px_var(--imp-cyan-400)/20]",
        success:
          "border-success/50 bg-success/10 text-success shadow-[0_0_10px_var(--imp-success)/20]",
        warning:
          "border-warning/50 bg-warning/10 text-warning shadow-[0_0_10px_var(--imp-warning)/20]",
        danger:
          "border-destructive/50 bg-destructive/10 text-destructive shadow-[0_0_10px_var(--imp-danger)/20]",
        outline: "border-border bg-transparent text-foreground",
      },
      glow: {
        none: "",
        subtle: "",
        intense: "",
      },
      pulse: {
        true: "animate-pulse-glow",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        glow: "intense",
        className: "shadow-[0_0_20px_var(--imp-lime-400)/40]",
      },
      {
        variant: "secondary",
        glow: "intense",
        className: "shadow-[0_0_20px_var(--imp-cyan-400)/40]",
      },
    ],
    defaultVariants: {
      variant: "default",
      glow: "subtle",
      pulse: false,
    },
  },
);

export type NeonBadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof neonBadgeVariants> & {
    asChild?: boolean;
    /** Animate entrance with bounce */
    animateIn?: boolean;
  };

function NeonBadge({
  className,
  variant,
  glow,
  pulse,
  asChild = false,
  animateIn = false,
  children,
}: NeonBadgeProps) {
  const Comp = asChild ? Slot : "span";

  if (animateIn) {
    return (
      <motion.span
        data-slot="neon-badge"
        className={cn(neonBadgeVariants({ variant, glow, pulse }), className)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <Comp
      data-slot="neon-badge"
      className={cn(neonBadgeVariants({ variant, glow, pulse }), className)}
    >
      {children}
    </Comp>
  );
}

export { NeonBadge, neonBadgeVariants };
