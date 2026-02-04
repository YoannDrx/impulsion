"use client";

import { FloatingCard, GlowHeading } from "@/components/impulsion/landing";
import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: "1",
    quote:
      "Impulsion a completement transforme ma facon de coacher. Mes athletes progressent plus vite et je gagne un temps fou.",
    author: "Marie Dupont",
    role: "Coach Athletisme",
    avatar: "MD",
    color: "lime" as const,
  },
  {
    id: "2",
    quote:
      "L'analyse video est un game-changer. Mes athletes comprennent enfin ce qu'ils doivent corriger.",
    author: "Thomas Martin",
    role: "Preparateur Physique",
    avatar: "TM",
    color: "cyan" as const,
  },
  {
    id: "3",
    quote:
      "Interface intuitive, support reactif. Exactement ce dont j'avais besoin pour professionnaliser mon activite.",
    author: "Sophie Bernard",
    role: "Coach Running",
    avatar: "SB",
    color: "lime" as const,
  },
];

export function FlowTestimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative bg-neutral-900 py-24"
    >
      {/* Wave top */}
      <div className="absolute top-0 right-0 left-0 -translate-y-full">
        <svg
          viewBox="0 0 1440 120"
          className="h-auto w-full fill-neutral-900"
          preserveAspectRatio="none"
        >
          <path d="M0,120 L0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 Z" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <GlowHeading level={2} glowColor="lime">
            Ils nous font confiance
          </GlowHeading>
          <p className="mt-4 text-neutral-400">
            Decouvrez les retours de coachs qui ont adopte Impulsion.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <FloatingCard
                glowColor={testimonial.color}
                className="relative h-full p-6"
              >
                {/* Quote icon */}
                <Quote
                  className={cn(
                    "size-8 opacity-30",
                    testimonial.color === "lime"
                      ? "text-lime-400"
                      : "text-cyan-400",
                  )}
                />

                {/* Quote text */}
                <p className="mt-4 text-neutral-300">{testimonial.quote}</p>

                {/* Author */}
                <div className="mt-6 flex items-center gap-3">
                  <motion.div
                    className={cn(
                      "flex size-10 items-center justify-center rounded-full text-sm font-bold",
                      testimonial.color === "lime"
                        ? "bg-lime-400/20 text-lime-400"
                        : "bg-cyan-400/20 text-cyan-400",
                    )}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {testimonial.avatar}
                  </motion.div>
                  <div>
                    <p className="font-medium text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Decorative wave */}
                <div className="absolute right-0 bottom-0 left-0 overflow-hidden rounded-b-lg">
                  <motion.svg
                    viewBox="0 0 400 40"
                    className={cn(
                      "h-8 w-full",
                      testimonial.color === "lime"
                        ? "fill-lime-400/5"
                        : "fill-cyan-400/5",
                    )}
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d="M0,20 C100,40 200,0 300,20 C350,30 380,25 400,20 L400,40 L0,40 Z"
                      animate={{
                        d: [
                          "M0,20 C100,40 200,0 300,20 C350,30 380,25 400,20 L400,40 L0,40 Z",
                          "M0,25 C100,10 200,35 300,15 C350,10 380,20 400,25 L400,40 L0,40 Z",
                          "M0,20 C100,40 200,0 300,20 C350,30 380,25 400,20 L400,40 L0,40 Z",
                        ],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5,
                      }}
                    />
                  </motion.svg>
                </div>
              </FloatingCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute right-0 bottom-0 left-0 translate-y-full">
        <svg
          viewBox="0 0 1440 120"
          className="h-auto w-full fill-neutral-900"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L0,60 C360,0 720,120 1080,60 C1260,30 1380,40 1440,60 L1440,0 Z" />
        </svg>
      </div>
    </section>
  );
}
