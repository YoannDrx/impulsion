"use client";

import {
  TypewriterText,
  WaveBackground,
  GlowButton,
  OutlineGlowButton,
} from "@/components/impulsion/landing";
import { motion } from "motion/react";
import Link from "next/link";

export function PulseHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-neutral-950">
      {/* Wave background */}
      <WaveBackground
        color="lime"
        speed={1.5}
        amplitude={40}
        frequency={0.015}
        opacity={0.25}
        className="opacity-60"
      />

      {/* Secondary wave */}
      <WaveBackground
        color="cyan"
        speed={1}
        amplitude={30}
        frequency={0.02}
        opacity={0.15}
        className="translate-y-20 opacity-40"
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-2"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-lime-500" />
          </span>
          <span className="text-sm text-lime-400">
            Live Performance Tracking
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <h1 className="mb-2 text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            Chaque{" "}
            <span
              className="text-lime-400"
              style={{ textShadow: "0 0 40px oklch(0.91 0.23 120 / 0.6)" }}
            >
              <TypewriterText
                text="battement"
                speed={80}
                delay={800}
                glowColor="lime"
                cursor={false}
              />
            </span>
          </h1>
          <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            compte.
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 max-w-2xl text-center text-lg text-neutral-400 md:text-xl"
        >
          Impulsion transforme les donnees brutes en performances concretes.
          <br className="hidden md:block" />
          Suivi de charge, analyse video, feedback en temps reel.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link href="/auth/signup">
            <GlowButton color="lime">Commencer a pulser</GlowButton>
          </Link>
          <Link href="#features">
            <OutlineGlowButton color="lime">
              Voir les fonctionnalites
            </OutlineGlowButton>
          </Link>
        </motion.div>

        {/* Live stats preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
        >
          <LiveStatPreview
            value="847"
            label="Athletes actifs"
            suffix="+"
            delay={1.4}
          />
          <LiveStatPreview
            value="12.4k"
            label="Seances planifiees"
            delay={1.6}
          />
          <LiveStatPreview value="99.2" label="Uptime" suffix="%" delay={1.8} />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs tracking-widest text-neutral-500 uppercase">
              Scroll
            </span>
            <div className="h-12 w-px bg-gradient-to-b from-lime-400/50 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

type LiveStatPreviewProps = {
  value: string;
  label: string;
  suffix?: string;
  delay?: number;
};

function LiveStatPreview({
  value,
  label,
  suffix = "",
  delay = 0,
}: LiveStatPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="flex flex-col items-center"
    >
      <div className="relative">
        <span
          className="font-mono text-3xl font-bold text-lime-400 md:text-4xl"
          style={{ textShadow: "0 0 20px oklch(0.91 0.23 120 / 0.5)" }}
        >
          {value}
          {suffix}
        </span>
        {/* Live indicator */}
        <span className="absolute -top-1 -right-3 flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime-400 opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-lime-500" />
        </span>
      </div>
      <span className="mt-1 text-xs tracking-wider text-neutral-500 uppercase">
        {label}
      </span>
    </motion.div>
  );
}
