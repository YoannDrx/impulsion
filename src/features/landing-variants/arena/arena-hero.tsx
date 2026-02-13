"use client";

import { MultipleSpotlights, GlowButton } from "@/components/impulsion/landing";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";
import { useState, useEffect } from "react";

export function ArenaHero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Small delay to ensure proper mounting before animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      {/* Animated spotlights */}
      <MultipleSpotlights count={4} color="mixed" />

      {/* Stadium atmosphere gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 100%, oklch(0.91 0.23 120 / 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 30%, oklch(0.91 0.23 120 / 0.05) 0%, transparent 40%),
            radial-gradient(ellipse at 80% 30%, oklch(0.85 0.16 195 / 0.05) 0%, transparent 40%)
          `,
        }}
      />

      {/* Silhouette athlete */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isLoaded ? { opacity: 0.15, y: 0 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative"
        >
          <svg
            viewBox="0 0 400 500"
            className="h-[60vh] w-auto"
            fill="currentColor"
          >
            {/* Simplified runner silhouette */}
            <path
              d="M200 50 C220 50 235 65 235 85 C235 105 220 120 200 120 C180 120 165 105 165 85 C165 65 180 50 200 50 Z M200 130 L210 130 L230 200 L280 250 L320 350 L300 360 L250 280 L220 320 L240 450 L210 460 L190 350 L170 460 L140 450 L160 320 L130 280 L80 360 L60 350 L100 250 L150 200 L170 130 L180 130 L190 200 L200 200 L210 200 L200 130 Z"
              className="text-white"
            />
          </svg>
          {/* Dramatic backlight glow */}
          <div
            className="absolute inset-0 blur-3xl"
            style={{
              background: `radial-gradient(ellipse at center bottom, oklch(0.91 0.23 120 / 0.3), transparent 60%)`,
            }}
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Main title with dramatic reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-6xl font-black tracking-tighter text-white uppercase md:text-7xl lg:text-8xl">
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="block"
            >
              Sous les
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="block text-lime-400"
              style={{
                textShadow: `
                  0 0 40px oklch(0.91 0.23 120 / 0.6),
                  0 0 80px oklch(0.91 0.23 120 / 0.4),
                  0 0 120px oklch(0.91 0.23 120 / 0.2)
                `,
              }}
            >
              Projecteurs
            </motion.span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="mx-auto mt-8 max-w-2xl text-xl text-neutral-300 md:text-2xl"
        >
          Chaque athlete merite un coach qui voit au-dela des chiffres.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-12"
        >
          <Link href="/auth/signup">
            <GlowButton color="lime">Entrer dans l&apos;arene</GlowButton>
          </Link>
        </motion.div>

        {/* Flash effect on title */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.3, delay: 1.1 }}
          style={{
            background: `radial-gradient(circle at center, oklch(1 0 0 / 0.3), transparent 50%)`,
          }}
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-neutral-500"
        >
          <span className="text-xs tracking-widest uppercase">Decouvrir</span>
          <svg
            className="size-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

type SpotlightTextProps = {
  children: React.ReactNode;
  className?: string;
};

export function SpotlightText({ children, className }: SpotlightTextProps) {
  return (
    <motion.span
      className={cn("relative inline-block", className)}
      whileHover={{
        textShadow: `
          0 0 40px oklch(0.91 0.23 120 / 0.8),
          0 0 80px oklch(0.91 0.23 120 / 0.6)
        `,
      }}
    >
      {children}
    </motion.span>
  );
}
