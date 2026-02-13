"use client";

import {
  GlowButton,
  OutlineGlowButton,
  MultipleSpotlights,
} from "@/components/impulsion/landing";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Link from "next/link";

export function ArenaCta() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative overflow-hidden bg-black py-32">
      {/* Spotlights */}
      <MultipleSpotlights count={3} color="lime" />

      {/* Dramatic vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, black 70%)`,
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Dramatic heading */}
          <h2 className="text-5xl font-black tracking-tight text-white uppercase md:text-6xl lg:text-7xl">
            Votre{" "}
            <span
              className="text-lime-400"
              style={{
                textShadow: `
                  0 0 40px oklch(0.91 0.23 120 / 0.6),
                  0 0 80px oklch(0.91 0.23 120 / 0.4)
                `,
              }}
            >
              moment
            </span>
            <br />
            de gloire
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 text-xl text-neutral-300"
          >
            Les projecteurs sont allumes. La scene vous attend.
            <br />
            Entrez dans l&apos;arene.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/auth/signup">
              <GlowButton color="lime">Commencer gratuitement</GlowButton>
            </Link>
            <Link href="/contact">
              <OutlineGlowButton color="cyan">
                Demander une demo
              </OutlineGlowButton>
            </Link>
          </motion.div>

          {/* Final dramatic flash */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: [0, 0.3, 0] } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
            style={{
              background: `radial-gradient(circle at center, oklch(0.91 0.23 120 / 0.3), transparent 50%)`,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
