"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type MarqueeTickerProps = {
  children: ReactNode;
  className?: string;
  speed?: "slow" | "normal" | "fast";
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  separator?: ReactNode;
  repeat?: number;
};

/**
 * Marquee Ticker - Bandeau defilant horizontal style breaking news
 * Le contenu est duplique pour creer un effet de boucle infinie
 */
export function MarqueeTicker({
  children,
  className,
  speed = "normal",
  direction = "left",
  pauseOnHover = true,
  separator = <span className="mx-8 text-[var(--imp-lime-400)]">/</span>,
  repeat = 4,
}: MarqueeTickerProps) {
  const speedDuration = {
    slow: "40s",
    normal: "25s",
    fast: "15s",
  }[speed];

  const content = Array.from({ length: repeat }, (_, i) => (
    <span key={i} className="inline-flex items-center">
      {children}
      {separator}
    </span>
  ));

  return (
    <div
      className={cn(
        "relative overflow-hidden whitespace-nowrap",
        pauseOnHover && "hover:[&>div]:pause",
        className,
      )}
    >
      <div
        className={cn(
          "inline-flex",
          direction === "left" &&
            "animate-[imp-marquee_var(--duration)_linear_infinite]",
          direction === "right" &&
            "animate-[imp-marquee_var(--duration)_linear_infinite_reverse]",
        )}
        style={
          {
            "--duration": speedDuration,
          } as React.CSSProperties
        }
      >
        {content}
        {content}
      </div>
    </div>
  );
}
