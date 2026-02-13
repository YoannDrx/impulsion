"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { MarqueeTicker } from "../text/marquee-ticker";

type HudFooterProps = {
  children?: ReactNode;
  className?: string;
  ticker?: ReactNode;
  version?: string;
};

/**
 * HUD Footer - Footer avec ticker marquee style breaking news
 * Affiche des informations en defilement continu
 */
export function HudFooter({
  children,
  className,
  ticker,
  version = "v1.0.0",
}: HudFooterProps) {
  return (
    <footer
      className={cn(
        "border-t border-[var(--imp-glass-10)] bg-[var(--imp-void)]",
        className,
      )}
    >
      {/* Ticker band */}
      {ticker && (
        <div className="border-b border-[var(--imp-glass-5)] bg-[var(--imp-charcoal)] py-2">
          <MarqueeTicker speed="slow">
            <span className="text-xs tracking-wider text-neutral-400 uppercase">
              {ticker}
            </span>
          </MarqueeTicker>
        </div>
      )}

      {/* Main footer content */}
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-[var(--imp-lime-400)]">
            IMPULSION
          </span>
          <span className="font-mono text-xs text-neutral-600">{version}</span>
        </div>

        {children && (
          <div className="flex items-center gap-4 text-xs text-neutral-500">
            {children}
          </div>
        )}

        {/* HUD corner decorations */}
        <div className="flex items-center gap-2">
          <div className="size-1.5 rounded-full bg-[var(--imp-lime-400)] shadow-[0_0_6px_var(--imp-lime-400)]" />
          <span className="font-mono text-xs tracking-wider text-neutral-600 uppercase">
            ONLINE
          </span>
        </div>
      </div>

      {/* Bottom HUD corners */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[var(--imp-cyan-400)]/30" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 border-[var(--imp-cyan-400)]/30" />
    </footer>
  );
}
