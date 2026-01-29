"use client";

import {
  ConcentricCircles,
  GlassPanel,
  GlitchText,
  NoiseTexture,
  PerspectiveGrid,
  ScanlinesOverlay,
  TerminalTyping,
} from "@/components/impulsion/cyberpunk";
import { CyberButton } from "@/components/impulsion/cyberpunk/form/cyber-button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Manifesto Hero - Hero section style terminal/HUD
 * Avec boot sequence, glitch text et cercles concentriques
 */
export function ManifestoHero() {
  const t = useTranslations("manifesto");
  const [bootComplete, setBootComplete] = useState(false);
  const [currentBootLine, setCurrentBootLine] = useState(0);

  const bootSequence = t.raw("hero.bootSequence") as string[];

  useEffect(() => {
    if (currentBootLine < bootSequence.length) {
      const timer = setTimeout(() => {
        setCurrentBootLine((prev) => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    } else if (currentBootLine === bootSequence.length && !bootComplete) {
      // Use timeout to avoid synchronous setState in effect
      const completeTimer = setTimeout(() => {
        setBootComplete(true);
      }, 100);
      return () => clearTimeout(completeTimer);
    }
  }, [currentBootLine, bootSequence.length, bootComplete]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--imp-void)]">
      {/* Background effects */}
      <PerspectiveGrid variant="perspective" color="cyan" />
      <NoiseTexture opacity={0.03} />
      <ScanlinesOverlay intensity="subtle" />

      {/* Concentric circles decoration */}
      <div className="pointer-events-none absolute top-1/2 right-0 translate-x-1/4 -translate-y-1/2 opacity-30">
        <ConcentricCircles size={600} rings={8} color="mixed" animated pulse />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-screen-xl flex-col items-center justify-center px-4 py-20">
        {/* Boot sequence */}
        <div
          className={cn(
            "mb-12 w-full max-w-2xl transition-all duration-500",
            bootComplete && "pointer-events-none absolute opacity-0",
          )}
        >
          <GlassPanel className="p-6" glow="cyan">
            <div className="font-mono text-sm">
              <div className="mb-4 flex items-center gap-2">
                <span className="size-3 animate-pulse rounded-full bg-[var(--imp-cyan-400)]" />
                <span className="text-[var(--imp-cyan-400)]">IMPULSION OS</span>
              </div>
              <div className="space-y-1">
                {bootSequence.slice(0, currentBootLine).map((line, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-neutral-400"
                  >
                    <span className="text-[var(--imp-lime-400)]">&gt;</span>
                    {line}
                    {i === currentBootLine - 1 && (
                      <span className="text-[var(--imp-lime-400)]">OK</span>
                    )}
                  </div>
                ))}
                {currentBootLine < bootSequence.length && (
                  <TerminalTyping
                    text={bootSequence[currentBootLine]}
                    speed={30}
                    cursor
                  />
                )}
              </div>
            </div>
          </GlassPanel>
        </div>

        {/* Hero content (appears after boot) */}
        <div
          className={cn(
            "text-center transition-all duration-1000",
            bootComplete
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0",
          )}
        >
          {/* Subtitle badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--imp-cyan-400)]/30 bg-[var(--imp-cyan-400)]/10 px-4 py-1.5">
            <span className="size-2 animate-pulse rounded-full bg-[var(--imp-cyan-400)]" />
            <span className="font-mono text-xs tracking-wider text-[var(--imp-cyan-400)] uppercase">
              {t("system.status")}
            </span>
          </div>

          {/* Main title with glitch */}
          <h1 className="mb-6">
            <GlitchText
              as="span"
              intensity="normal"
              color="lime"
              className="block text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl"
            >
              {t("hero.title")}
            </GlitchText>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-neutral-400 md:text-xl">
            {t("hero.subtitle")}
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CyberButton variant="solid" size="lg" asChild>
              <Link href="/auth/signup">{t("hero.cta.primary")}</Link>
            </CyberButton>
            <CyberButton variant="cyan" size="lg" asChild>
              <Link href="#features">{t("hero.cta.secondary")}</Link>
            </CyberButton>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { value: "500+", label: t("hero.stats.coaches") },
              { value: "2.5K", label: t("hero.stats.athletes") },
              { value: "50K", label: t("hero.stats.sessions") },
              { value: "10K", label: t("hero.stats.videos") },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-mono text-3xl font-bold text-[var(--imp-lime-400)] md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs tracking-wider text-neutral-500 uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HUD corner decorations */}
      <div className="pointer-events-none absolute top-4 left-4 h-8 w-8 border-t-2 border-l-2 border-[var(--imp-lime-400)]/50" />
      <div className="pointer-events-none absolute top-4 right-4 h-8 w-8 border-t-2 border-r-2 border-[var(--imp-lime-400)]/50" />
      <div className="pointer-events-none absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-[var(--imp-cyan-400)]/50" />
      <div className="pointer-events-none absolute right-4 bottom-4 h-8 w-8 border-r-2 border-b-2 border-[var(--imp-cyan-400)]/50" />
    </section>
  );
}
