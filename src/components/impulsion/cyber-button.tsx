"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";
import type * as React from "react";

import { cn } from "@/lib/utils";

const cyberButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:shadow-[var(--glow-primary)] focus-visible:ring-primary",
        secondary:
          "bg-secondary text-secondary-foreground hover:shadow-[var(--glow-secondary)] focus-visible:ring-secondary",
        outline:
          "border-2 border-primary bg-transparent text-primary hover:bg-primary/10 hover:shadow-[var(--glow-primary)]",
        ghost:
          "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
        neon: "border border-imp-lime-400 bg-imp-lime-400/10 text-imp-lime-400 hover:bg-imp-lime-400/20 hover:shadow-[var(--glow-primary)]",
        "neon-cyan":
          "border border-imp-cyan-400 bg-imp-cyan-400/10 text-imp-cyan-400 hover:bg-imp-cyan-400/20 hover:shadow-[var(--glow-secondary)]",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        default: "h-10 px-5",
        lg: "h-12 px-8 text-lg",
        icon: "size-10",
      },
      glow: {
        none: "",
        pulse: "animate-pulse-glow",
        hover: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      glow: "hover",
    },
  },
);

export type CyberButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof cyberButtonVariants> & {
    asChild?: boolean;
    /** Show scanning line animation on hover */
    scanLine?: boolean;
  };

function CyberButton({
  className,
  variant,
  size,
  glow,
  asChild = false,
  scanLine = false,
  children,
  disabled,
  onClick,
  type = "button",
}: CyberButtonProps) {
  const Comp = asChild ? Slot : "button";

  const buttonContent = (
    <>
      {scanLine && (
        <span className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="absolute inset-y-0 left-[-100%] w-1/3 skew-x-[-20deg] bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-0 transition-all duration-500 group-hover:left-[150%] group-hover:opacity-100" />
        </span>
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (asChild) {
    return (
      <Comp
        data-slot="cyber-button"
        className={cn(
          cyberButtonVariants({ variant, size, glow }),
          scanLine && "group",
          className,
        )}
      >
        {buttonContent}
      </Comp>
    );
  }

  return (
    <motion.button
      data-slot="cyber-button"
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        cyberButtonVariants({ variant, size, glow }),
        scanLine && "group",
        className,
      )}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.1 }}
    >
      {buttonContent}
    </motion.button>
  );
}

export { CyberButton, cyberButtonVariants };
