"use client";

import {
  GridBackground,
  GlowButton,
  OutlineGlowButton,
} from "@/components/impulsion/landing";
import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { DashboardPreview } from "./dashboard-preview";

export function GridHero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [drawProgress, setDrawProgress] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDrawProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 30);

      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timer);
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden bg-neutral-950 pt-20"
    >
      {/* Animated grid background */}
      <GridBackground color="lime" spacing={80} animated />

      {/* Blueprint overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 0%, oklch(0.10 0.01 260 / 0.9) 70%),
            linear-gradient(180deg, transparent 0%, oklch(0.10 0.01 260 / 0.5) 100%)
          `,
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-between">
          {/* Left: Text content */}
          <div className="flex-1">
            {/* Technical annotation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="mb-6 font-mono text-xs text-lime-400/60"
            >
              {`// IMPULSION.SYSTEM v2.0 - COACHING HYBRIDE`}
            </motion.div>

            {/* Title with drawing effect */}
            <div className="relative">
              <motion.h1
                className="text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl"
                style={{
                  WebkitTextStroke: "1px oklch(0.91 0.23 120 / 0.3)",
                }}
              >
                Elevez votre
                <br />
                coaching
              </motion.h1>

              {/* Filled title that reveals progressively */}
              <motion.h1
                className="absolute inset-0 text-4xl font-bold tracking-tight text-lime-400 md:text-5xl lg:text-6xl"
                style={{
                  clipPath: `inset(0 ${100 - drawProgress}% 0 0)`,
                  textShadow: "0 0 40px oklch(0.91 0.23 120 / 0.4)",
                }}
              >
                Elevez votre
                <br />
                coaching
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="mt-8"
            >
              <p className="max-w-md text-lg text-neutral-400 md:text-xl">
                La plateforme hybride qui connecte coachs et athletes.
                Planifiez, analysez, progressez.
              </p>

              {/* Key benefits */}
              <div className="mt-6 flex flex-wrap gap-4 font-mono text-sm">
                <Benefit label="Calendrier" value="Drag & Drop" />
                <Benefit label="Video" value="Annotations" />
                <Benefit label="Charge" value="ACWR" />
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link href="/auth/signup">
                <GlowButton color="lime">Commencer gratuitement</GlowButton>
              </Link>
              <Link href="#bento">
                <OutlineGlowButton color="lime">
                  Voir les fonctionnalites
                </OutlineGlowButton>
              </Link>
            </motion.div>

            {/* Coordinates indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 2 }}
              className="mt-8 font-mono text-xs text-neutral-600"
            >
              [0, 0]
            </motion.div>
          </div>

          {/* Right: Dashboard Preview */}
          <div className="w-full lg:w-auto">
            <DashboardPreview />
          </div>
        </div>
      </div>

      {/* Minimap navigation preview */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute top-1/2 right-8 hidden -translate-y-1/2 xl:block"
      >
        <Minimap />
      </motion.div>
    </section>
  );
}

type BenefitProps = {
  label: string;
  value: string;
};

function Benefit({ label, value }: BenefitProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-neutral-600">{label}:</span>
      <span className="text-lime-400">{value}</span>
    </div>
  );
}

function Minimap() {
  const sections = [
    { id: "hero", label: "HERO", active: true },
    { id: "bento", label: "FEATURES" },
    { id: "specs", label: "SPECS" },
    { id: "pricing", label: "PRICING" },
  ];

  return (
    <div className="flex flex-col gap-2 border border-neutral-800 bg-neutral-950/80 p-3 backdrop-blur-sm">
      <div className="mb-2 font-mono text-xs text-neutral-600">{`// NAV`}</div>
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`flex items-center gap-2 font-mono text-xs transition-colors ${
            section.active
              ? "text-lime-400"
              : "text-neutral-600 hover:text-neutral-400"
          }`}
        >
          <div
            className={`size-1.5 ${section.active ? "bg-lime-400" : "bg-neutral-700"}`}
            style={
              section.active
                ? { boxShadow: "0 0 8px oklch(0.91 0.23 120 / 0.6)" }
                : undefined
            }
          />
          {section.label}
        </a>
      ))}
    </div>
  );
}
