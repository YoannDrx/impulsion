"use client";

import { GlowHeading, FloatingCard } from "@/components/impulsion/landing";
import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Thomas Durand",
    role: "Coach Trail Running",
    initials: "TD",
    quote:
      "Impulsion a transforme ma facon de travailler avec mes athletes. Le suivi de charge et les alertes me permettent d'adapter les programmes en temps reel.",
    metrics: { athletes: 24, sessions: "150+/mois" },
    color: "lime" as const,
  },
  {
    name: "Marie Lefebvre",
    role: "Coach Athletisme",
    initials: "ML",
    quote:
      "L'analyse video avec les marqueurs temporels est un game-changer. Mes athletes comprennent enfin mes corrections techniques sans avoir a se rappeler de tout.",
    metrics: { athletes: 18, videos: "50+/mois" },
    color: "cyan" as const,
  },
  {
    name: "Lucas Martin",
    role: "Athlete Trail",
    initials: "LM",
    quote:
      "Fini les echanges par WhatsApp ! Je remplis mon feedback apres chaque seance et mon coach voit tout sur son tableau de bord. Simple et efficace.",
    metrics: { streak: "45 jours", improvement: "+12%" },
    color: "lime" as const,
  },
];

export function PulseTestimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative bg-neutral-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-sm tracking-widest text-cyan-400 uppercase">
            Temoignages
          </span>
          <GlowHeading level={2} glowColor="cyan" className="mt-4">
            Ils pulsent avec nous
          </GlowHeading>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-400">
            Des coachs et athletes qui ont transforme leur facon de travailler.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
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

type TestimonialCardProps = {
  testimonial: (typeof testimonials)[number];
  index: number;
  isInView: boolean;
};

function TestimonialCard({
  testimonial,
  index,
  isInView,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <FloatingCard
        glowColor={testimonial.color}
        floatAmount={3}
        className="h-full"
      >
        {/* Quote icon */}
        <Quote
          className={cn(
            "size-8",
            testimonial.color === "lime"
              ? "text-lime-400/30"
              : "text-cyan-400/30",
          )}
        />

        {/* Quote text */}
        <p className="mt-4 text-neutral-300">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        {/* Author */}
        <div className="mt-6 flex items-center gap-4">
          <div className="relative">
            <motion.div
              className={cn(
                "flex size-12 items-center justify-center rounded-full text-sm font-bold",
                testimonial.color === "lime"
                  ? "bg-lime-400/20 text-lime-400"
                  : "bg-cyan-400/20 text-cyan-400",
              )}
              whileHover={{ scale: 1.1 }}
            >
              {testimonial.initials}
            </motion.div>
            {/* Live indicator */}
            <span className="absolute -right-0.5 -bottom-0.5 flex size-3">
              <span
                className={cn(
                  "absolute inline-flex size-full animate-ping rounded-full opacity-75",
                  testimonial.color === "lime" ? "bg-lime-400" : "bg-cyan-400",
                )}
              />
              <span
                className={cn(
                  "relative inline-flex size-3 rounded-full border-2 border-neutral-900",
                  testimonial.color === "lime" ? "bg-lime-500" : "bg-cyan-500",
                )}
              />
            </span>
          </div>
          <div>
            <p className="font-semibold text-white">{testimonial.name}</p>
            <p className="text-sm text-neutral-400">{testimonial.role}</p>
          </div>
        </div>

        {/* Metrics */}
        <div className="mt-6 flex gap-4 border-t border-white/10 pt-4">
          {Object.entries(testimonial.metrics).map(([key, value]) => (
            <div key={key} className="flex-1">
              <p
                className={cn(
                  "font-mono text-lg font-bold",
                  testimonial.color === "lime"
                    ? "text-lime-400"
                    : "text-cyan-400",
                )}
                style={{
                  textShadow:
                    testimonial.color === "lime"
                      ? "0 0 10px oklch(0.91 0.23 120 / 0.4)"
                      : "0 0 10px oklch(0.85 0.16 195 / 0.4)",
                }}
              >
                {value}
              </p>
              <p className="text-xs text-neutral-500 capitalize">{key}</p>
            </div>
          ))}
        </div>
      </FloatingCard>
    </motion.div>
  );
}
