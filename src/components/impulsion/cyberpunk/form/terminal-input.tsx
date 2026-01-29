"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type TerminalInputProps = Omit<React.ComponentProps<"input">, "prefix"> & {
  prefix?: string;
  error?: string;
  success?: boolean;
};

/**
 * Terminal Input - Champ de saisie style terminal/CLI
 * Avec prefix optionnel (ex: ">", "$", "root@")
 */
export const TerminalInput = forwardRef<HTMLInputElement, TerminalInputProps>(
  ({ className, prefix = ">", error, success, ...props }, ref) => {
    return (
      <div className="relative">
        <div
          className={cn(
            "flex items-center gap-2 rounded border bg-[var(--imp-void)] px-3 py-2 font-mono",
            "focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-offset-[var(--imp-void)]",
            error
              ? "border-[var(--imp-danger-neon)] focus-within:ring-[var(--imp-danger-neon)]/30"
              : success
                ? "border-[var(--imp-lime-400)] focus-within:ring-[var(--imp-lime-400)]/30"
                : "border-neutral-700 focus-within:border-[var(--imp-cyan-400)] focus-within:ring-[var(--imp-cyan-400)]/30",
            className,
          )}
        >
          {/* Prefix */}
          <span
            className={cn(
              "text-sm select-none",
              error
                ? "text-[var(--imp-danger-neon)]"
                : success
                  ? "text-[var(--imp-lime-400)]"
                  : "text-[var(--imp-lime-400)]",
            )}
          >
            {prefix}
          </span>

          {/* Input */}
          <input
            ref={ref}
            className={cn(
              "flex-1 bg-transparent text-sm text-white outline-none placeholder:text-neutral-600",
              "caret-[var(--imp-cyan-400)]",
            )}
            {...props}
          />

          {/* Status indicator */}
          {(error ?? success) && (
            <span
              className={cn(
                "size-2 rounded-full",
                error
                  ? "animate-[imp-pulse-fast_1s_ease-in-out_infinite] bg-[var(--imp-danger-neon)]"
                  : "bg-[var(--imp-lime-400)]",
              )}
            />
          )}
        </div>

        {/* Error message */}
        {error && (
          <p className="mt-1 font-mono text-xs text-[var(--imp-danger-neon)]">
            ERROR: {error}
          </p>
        )}
      </div>
    );
  },
);

TerminalInput.displayName = "TerminalInput";
