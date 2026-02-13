"use client";

import { AnimatedStat, PulseLine } from "@/components/impulsion/landing";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function PulseStats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative bg-neutral-950 py-24">
      {/* Pulse lines */}
      <PulseLine color="lime" className="absolute top-0" />
      <PulseLine color="cyan" className="absolute bottom-0" />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-sm tracking-widest text-lime-400 uppercase">
            En temps reel
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
            Des chiffres qui parlent
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          <AnimatedStat
            value={847}
            label="Athletes actifs"
            suffix="+"
            glowColor="lime"
            delay={0}
            showLive
          />
          <AnimatedStat
            value={12463}
            label="Seances planifiees"
            glowColor="cyan"
            delay={0.2}
          />
          <AnimatedStat
            value={98.7}
            label="Satisfaction"
            suffix="%"
            decimals={1}
            glowColor="lime"
            delay={0.4}
          />
          <AnimatedStat
            value={2.4}
            label="Temps de reponse"
            suffix="ms"
            decimals={1}
            glowColor="cyan"
            delay={0.6}
            showLive
          />
        </div>

        {/* Additional metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          <MetricCard
            icon={
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            }
            title="Charge ACWR"
            value="0.8 - 1.3"
            description="Zone optimale de progression"
            color="lime"
          />
          <MetricCard
            icon={
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            }
            title="Videos analysees"
            value="+340%"
            description="Croissance mensuelle"
            color="cyan"
          />
          <MetricCard
            icon={
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            title="Temps moyen feedback"
            value="< 2min"
            description="Coach vers athlete"
            color="lime"
          />
        </motion.div>
      </div>
    </section>
  );
}

type MetricCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  color: "lime" | "cyan";
};

function MetricCard({
  icon,
  title,
  value,
  description,
  color,
}: MetricCardProps) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-neutral-900/50 p-6 backdrop-blur-sm"
      whileHover={{
        borderColor:
          color === "lime"
            ? "oklch(0.91 0.23 120 / 0.3)"
            : "oklch(0.85 0.16 195 / 0.3)",
        boxShadow:
          color === "lime"
            ? "0 0 30px oklch(0.91 0.23 120 / 0.15)"
            : "0 0 30px oklch(0.85 0.16 195 / 0.15)",
      }}
    >
      <div className={color === "lime" ? "text-lime-400" : "text-cyan-400"}>
        {icon}
      </div>
      <h3 className="mt-4 text-sm text-neutral-400">{title}</h3>
      <p
        className={`mt-1 text-2xl font-bold ${color === "lime" ? "text-lime-400" : "text-cyan-400"}`}
        style={{
          textShadow:
            color === "lime"
              ? "0 0 15px oklch(0.91 0.23 120 / 0.4)"
              : "0 0 15px oklch(0.85 0.16 195 / 0.4)",
        }}
      >
        {value}
      </p>
      <p className="mt-2 text-sm text-neutral-500">{description}</p>

      {/* Live pulse indicator */}
      <div className="absolute top-4 right-4">
        <span className="relative flex size-2">
          <span
            className={`absolute inline-flex size-full animate-ping rounded-full opacity-75 ${color === "lime" ? "bg-lime-400" : "bg-cyan-400"}`}
          />
          <span
            className={`relative inline-flex size-2 rounded-full ${color === "lime" ? "bg-lime-500" : "bg-cyan-500"}`}
          />
        </span>
      </div>
    </motion.div>
  );
}
