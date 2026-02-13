"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { StatusIndicator } from "./status-indicator";

type HudNavbarProps = {
  children: ReactNode;
  className?: string;
  logo?: ReactNode;
  status?: "online" | "offline" | "warning";
  systemTime?: boolean;
};

/**
 * HUD Navbar - Barre de navigation style HUD militaire
 * Avec indicateurs de statut systeme
 */
export function HudNavbar({
  children,
  className,
  logo,
  status = "online",
  systemTime = true,
}: HudNavbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-[var(--imp-glass-10)] bg-[var(--imp-void)]/90 backdrop-blur-md",
        className,
      )}
    >
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4">
        {/* Left section - Logo + Status */}
        <div className="flex items-center gap-4">
          {logo}
          <div className="hidden items-center gap-2 border-l border-neutral-800 pl-4 sm:flex">
            <StatusIndicator status={status} size="sm" />
            <span className="font-mono text-xs tracking-wider text-neutral-500 uppercase">
              SYS
            </span>
          </div>
        </div>

        {/* Center - Navigation */}
        <nav className="flex items-center gap-1">{children}</nav>

        {/* Right section - System info */}
        <div className="flex items-center gap-4">
          {systemTime && <SystemClock />}
        </div>
      </div>

      {/* HUD corner decorations */}
      <div className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-[var(--imp-lime-400)]/50" />
      <div className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-[var(--imp-lime-400)]/50" />
    </header>
  );
}

function SystemClock() {
  return (
    <div className="flex items-center gap-2 font-mono text-xs text-neutral-500">
      <span className="hidden text-[var(--imp-cyan-400)] sm:inline">UTC</span>
      <time className="tabular-nums" suppressHydrationWarning>
        {new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </time>
    </div>
  );
}
