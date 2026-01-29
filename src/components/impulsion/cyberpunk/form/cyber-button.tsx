"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

const cyberButtonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 font-mono text-sm font-medium uppercase tracking-wider",
    "transition-all duration-200 outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    // HUD corners base
    "before:pointer-events-none before:absolute before:top-0 before:left-0 before:h-2 before:w-2 before:border-t-2 before:border-l-2",
    "after:pointer-events-none after:absolute after:top-0 after:right-0 after:h-2 after:w-2 after:border-t-2 after:border-r-2",
  ],
  {
    variants: {
      variant: {
        lime: [
          "border border-[var(--imp-lime-400)] bg-transparent text-[var(--imp-lime-400)]",
          "hover:bg-[var(--imp-lime-400)] hover:text-[var(--imp-void)] hover:shadow-[var(--imp-glow-lime)]",
          "before:border-[var(--imp-lime-400)] after:border-[var(--imp-lime-400)]",
          "focus-visible:ring-2 focus-visible:ring-[var(--imp-lime-400)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--imp-void)]",
        ],
        cyan: [
          "border border-[var(--imp-cyan-400)] bg-transparent text-[var(--imp-cyan-400)]",
          "hover:bg-[var(--imp-cyan-400)] hover:text-[var(--imp-void)] hover:shadow-[var(--imp-glow-cyan)]",
          "before:border-[var(--imp-cyan-400)] after:border-[var(--imp-cyan-400)]",
          "focus-visible:ring-2 focus-visible:ring-[var(--imp-cyan-400)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--imp-void)]",
        ],
        danger: [
          "border border-[var(--imp-danger-neon)] bg-transparent text-[var(--imp-danger-neon)]",
          "hover:bg-[var(--imp-danger-neon)] hover:text-white hover:shadow-[var(--imp-glow-danger-neon)]",
          "before:border-[var(--imp-danger-neon)] after:border-[var(--imp-danger-neon)]",
          "focus-visible:ring-2 focus-visible:ring-[var(--imp-danger-neon)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--imp-void)]",
        ],
        ghost: [
          "border border-neutral-700 bg-transparent text-neutral-400",
          "hover:border-neutral-500 hover:text-white",
          "before:border-neutral-700 after:border-neutral-700",
          "hover:before:border-neutral-500 hover:after:border-neutral-500",
          "focus-visible:ring-2 focus-visible:ring-neutral-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--imp-void)]",
        ],
        solid: [
          "border border-[var(--imp-lime-400)] bg-[var(--imp-lime-400)] text-[var(--imp-void)]",
          "hover:bg-[var(--imp-lime-400)]/90 hover:shadow-[var(--imp-glow-lime)]",
          "before:border-[var(--imp-lime-400)] after:border-[var(--imp-lime-400)]",
          "focus-visible:ring-2 focus-visible:ring-[var(--imp-lime-400)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--imp-void)]",
        ],
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "lime",
      size: "md",
    },
  },
);

type CyberButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof cyberButtonVariants> & {
    asChild?: boolean;
    loading?: boolean;
    loadingText?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
  };

/**
 * Cyber Button - Bouton style HUD avec coins decoratifs
 * Effets de glow au hover et variants de couleur
 */
export function CyberButton({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  loadingText,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}: CyberButtonProps) {
  const Comp = asChild ? Slot : "button";

  // When asChild is true, we wrap the content in a span to ensure a single child for Slot
  const content = loading ? (
    <>
      <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      {loadingText ?? children}
    </>
  ) : (
    <>
      {leftIcon}
      {children}
      {rightIcon}
    </>
  );

  if (asChild) {
    return (
      <Comp
        className={cn(cyberButtonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </Comp>
    );
  }

  return (
    <Comp
      className={cn(cyberButtonVariants({ variant, size, className }))}
      disabled={disabled ?? loading}
      {...props}
    >
      {/* Bottom corners */}
      <span className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-inherit" />
      <span className="pointer-events-none absolute right-0 bottom-0 h-2 w-2 border-r-2 border-b-2 border-inherit" />

      {/* Content */}
      {content}
    </Comp>
  );
}

export { cyberButtonVariants };
