"use client";

import { BlobBackground, GlowHeading } from "@/components/impulsion/landing";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Link from "next/link";

export function FlowCta() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-neutral-950 py-32"
    >
      {/* Blob background */}
      <BlobBackground color="mixed" count={3} opacity={0.2} blur={150} />

      {/* Content */}
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <GlowHeading level={2} glowColor="lime">
            Pret a trouver votre flow ?
          </GlowHeading>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-lg text-neutral-400"
        >
          Rejoignez des centaines de coachs qui ont deja transforme leur
          pratique avec Impulsion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/auth/signup">
            <motion.button
              className="group relative overflow-hidden rounded-full bg-lime-400 px-8 py-4 font-semibold text-neutral-950"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated background */}
              <motion.span
                className="absolute inset-0 bg-lime-300"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Commencer gratuitement</span>
            </motion.button>
          </Link>

          <Link href="/contact">
            <motion.button
              className="rounded-full border border-neutral-700 bg-transparent px-8 py-4 font-semibold text-white transition-colors hover:border-lime-400/50 hover:bg-lime-400/5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Nous contacter
            </motion.button>
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-500"
        >
          <span className="flex items-center gap-2">
            <motion.span
              className="size-2 rounded-full bg-lime-400"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Essai gratuit 14 jours
          </span>
          <span className="flex items-center gap-2">
            <motion.span
              className="size-2 rounded-full bg-cyan-400"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            Sans engagement
          </span>
          <span className="flex items-center gap-2">
            <motion.span
              className="size-2 rounded-full bg-lime-400"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
            Support inclus
          </span>
        </motion.div>
      </div>
    </section>
  );
}
