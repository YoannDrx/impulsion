"use client";

import { BlobBackground, GlowText } from "@/components/impulsion/landing";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Link from "next/link";

export function FlowHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-neutral-950"
    >
      {/* Blob background */}
      <BlobBackground color="mixed" count={4} opacity={0.4} />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/50 to-neutral-950" />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
      >
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/5 px-4 py-2 text-sm text-lime-400 backdrop-blur-sm">
            <motion.span
              className="size-2 rounded-full bg-lime-400"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            En harmonie avec votre rythme
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl"
        >
          Trouvez votre{" "}
          <GlowText glowColor="lime" className="font-bold">
            flow
          </GlowText>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 max-w-2xl text-lg text-neutral-400 md:text-xl"
        >
          Le coaching fluide. Impulsion s&apos;adapte naturellement a votre
          rythme, comme l&apos;eau epouse les formes.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10"
        >
          <Link href="/auth/signup">
            <motion.button
              className="group relative overflow-hidden rounded-full bg-lime-400 px-8 py-4 font-semibold text-neutral-950 transition-all hover:bg-lime-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Ripple effect on hover */}
              <motion.span
                className="absolute inset-0 bg-white/20"
                initial={{ scale: 0, opacity: 1 }}
                whileHover={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6 }}
                style={{ borderRadius: "50%", transformOrigin: "center" }}
              />
              <span className="relative z-10">Plonger</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-neutral-500"
          >
            <span className="text-xs">Decouvrir</span>
            <svg
              className="size-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
      </motion.div>

      {/* Wave divider at bottom */}
      <div className="absolute right-0 bottom-0 left-0">
        <svg
          viewBox="0 0 1440 120"
          className="h-auto w-full fill-neutral-900"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,64 C288,128 576,0 864,64 C1152,128 1440,32 1440,32 L1440,120 L0,120 Z"
            animate={{
              d: [
                "M0,64 C288,128 576,0 864,64 C1152,128 1440,32 1440,32 L1440,120 L0,120 Z",
                "M0,32 C288,0 576,128 864,64 C1152,0 1440,96 1440,96 L1440,120 L0,120 Z",
                "M0,64 C288,128 576,0 864,64 C1152,128 1440,32 1440,32 L1440,120 L0,120 Z",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </section>
  );
}
