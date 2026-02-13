"use client";

import { GlowHeading } from "@/components/impulsion/landing";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

const testimonials = [
  {
    name: "Sophie Bernard",
    role: "Coach Running Elite",
    initials: "SB",
    quote:
      "Avec Impulsion, j'ai l'impression d'etre dans la tete de mes athletes. Je vois tout, je comprends tout, je peux reagir en temps reel.",
    highlight: "etre dans la tete de mes athletes",
    stats: { athletes: 32, years: 8 },
  },
  {
    name: "Marc Fontaine",
    role: "Preparateur Physique Pro",
    initials: "MF",
    quote:
      "L'ACWR m'a permis d'eviter 3 blessures majeures cette saison. C'est un outil qui change vraiment la donne.",
    highlight: "eviter 3 blessures majeures",
    stats: { athletes: 18, years: 12 },
  },
  {
    name: "Lea Dubois",
    role: "Athlete Trail Ultra",
    initials: "LD",
    quote:
      "Les retours video de mon coach sont tellement clairs maintenant. Je sais exactement quoi corriger a chaque seance.",
    highlight: "tellement clairs",
    stats: { km: "15000+", podiums: 7 },
  },
];

export function ArenaTestimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" ref={ref} className="relative bg-black py-24">
      {/* Dramatic lighting */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-0 left-1/4 h-[600px] w-[400px] -translate-x-1/2 rotate-12"
          style={{
            background: `linear-gradient(180deg, oklch(0.91 0.23 120 / 0.1) 0%, transparent 100%)`,
          }}
        />
        <div
          className="absolute top-0 right-1/4 h-[600px] w-[400px] translate-x-1/2 -rotate-12"
          style={{
            background: `linear-gradient(180deg, oklch(0.85 0.16 195 / 0.1) 0%, transparent 100%)`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-sm tracking-widest text-neutral-500 uppercase">
            Interviews exclusives
          </span>
          <GlowHeading level={2} glowColor="cyan" className="mt-4">
            Paroles de champions
          </GlowHeading>
        </motion.div>

        {/* Testimonials */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <InterviewCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type InterviewCardProps = {
  testimonial: (typeof testimonials)[number];
  index: number;
  isInView: boolean;
};

function InterviewCard({ testimonial, index, isInView }: InterviewCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Highlight the specific text in the quote
  const parts = testimonial.quote.split(testimonial.highlight);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950"
    >
      {/* Video-like header */}
      <div className="relative aspect-video bg-neutral-900">
        {/* Profile background with initials */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900">
          <span className="text-6xl font-bold text-neutral-700 opacity-60 transition-opacity group-hover:opacity-80">
            {testimonial.initials}
          </span>
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />

        {/* Play button */}
        <motion.button
          className="absolute inset-0 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          <div
            className="flex size-16 items-center justify-center rounded-full border-2 border-lime-400 bg-lime-400/10 backdrop-blur-sm transition-all group-hover:bg-lime-400/20"
            style={{ boxShadow: "0 0 30px oklch(0.91 0.23 120 / 0.3)" }}
          >
            {isPlaying ? (
              <Pause className="size-6 text-lime-400" />
            ) : (
              <Play className="size-6 translate-x-0.5 text-lime-400" />
            )}
          </div>
        </motion.button>

        {/* Name tag */}
        <div className="absolute bottom-4 left-4">
          <p className="font-bold text-white">{testimonial.name}</p>
          <p className="text-sm text-lime-400">{testimonial.role}</p>
        </div>

        {/* Recording indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-2 rounded bg-black/50 px-2 py-1 backdrop-blur-sm">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-red-500" />
          </span>
          <span className="text-xs text-white">REC</span>
        </div>
      </div>

      {/* Quote */}
      <div className="p-6">
        <p className="text-neutral-300">
          &ldquo;{parts[0]}
          <span
            className="font-semibold text-lime-400"
            style={{ textShadow: "0 0 20px oklch(0.91 0.23 120 / 0.4)" }}
          >
            {testimonial.highlight}
          </span>
          {parts[1]}&rdquo;
        </p>

        {/* Stats */}
        <div className="mt-6 flex gap-6 border-t border-white/10 pt-4">
          {Object.entries(testimonial.stats).map(([key, value]) => (
            <div key={key}>
              <p className="font-mono text-lg font-bold text-cyan-400">
                {value}
              </p>
              <p className="text-xs text-neutral-500 uppercase">{key}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 0%, oklch(0.91 0.23 120 / 0.1), transparent 50%)`,
        }}
      />
    </motion.div>
  );
}
