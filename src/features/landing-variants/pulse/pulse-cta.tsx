"use client";

import {
  GlowButton,
  OutlineGlowButton,
  WaveBackground,
} from "@/components/impulsion/landing";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Link from "next/link";

export function PulseCta() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-neutral-950 py-32"
    >
      {/* Background effects */}
      <WaveBackground
        color="lime"
        speed={1}
        amplitude={25}
        frequency={0.02}
        opacity={0.15}
      />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.91 0.23 120 / 0.1) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Pulse animation around heading */}
          <div className="relative inline-block">
            <motion.div
              className="absolute -inset-8 rounded-full border-2 border-lime-400/30"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -inset-16 rounded-full border border-lime-400/20"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.2, 0, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            />

            <h2
              className="text-4xl font-bold text-white md:text-5xl lg:text-6xl"
              style={{ textShadow: "0 0 40px oklch(0.91 0.23 120 / 0.3)" }}
            >
              Pret a{" "}
              <span
                className="text-lime-400"
                style={{ textShadow: "0 0 40px oklch(0.91 0.23 120 / 0.6)" }}
              >
                pulser
              </span>
              ?
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 text-lg text-neutral-400 md:text-xl"
          >
            Rejoignez des centaines de coachs qui ont deja transforme
            <br className="hidden md:block" />
            leur facon de travailler avec leurs athletes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/auth/signup">
              <GlowButton color="lime">Commencer gratuitement</GlowButton>
            </Link>
            <Link href="/contact">
              <OutlineGlowButton color="lime">Nous contacter</OutlineGlowButton>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-500"
          >
            <div className="flex items-center gap-2">
              <svg
                className="size-5 text-lime-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Essai gratuit 14 jours</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="size-5 text-lime-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Sans carte bancaire</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="size-5 text-lime-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Annulation a tout moment</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
