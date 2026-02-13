"use client";

import { GlowHeading } from "@/components/impulsion/landing";
import { cn } from "@/lib/utils";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Compass, Target, Rocket, Trophy } from "lucide-react";

const journeySteps = [
  {
    id: "discover",
    icon: Compass,
    title: "Decouverte",
    description:
      "Evaluez vos athletes, comprenez leurs besoins, definissez les objectifs ensemble.",
    color: "lime",
  },
  {
    id: "plan",
    icon: Target,
    title: "Planification",
    description:
      "Creez des programmes personnalises, adaptez la charge, anticipez les pics de forme.",
    color: "cyan",
  },
  {
    id: "execute",
    icon: Rocket,
    title: "Execution",
    description:
      "Suivez les seances en temps reel, analysez les videos, ajustez a la volee.",
    color: "lime",
  },
  {
    id: "achieve",
    icon: Trophy,
    title: "Accomplissement",
    description:
      "Celebrez les progres, analysez les resultats, planifiez la suite.",
    color: "cyan",
  },
];

export function FlowJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative bg-neutral-900 py-24"
    >
      {/* Subtle background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 size-96 rounded-full bg-lime-400/5 blur-3xl" />
        <div className="absolute -right-32 bottom-1/4 size-96 rounded-full bg-cyan-400/5 blur-3xl" />
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
            Le parcours fluide
          </GlowHeading>
          <p className="mt-4 text-neutral-400">
            Un accompagnement naturel, de la premiere rencontre aux victoires.
          </p>
        </motion.div>

        {/* Journey path */}
        <div className="relative">
          {/* Curved SVG path */}
          <svg
            className="absolute top-0 left-1/2 hidden h-full w-1/2 -translate-x-1/2 lg:block"
            viewBox="0 0 200 800"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M100,0 C50,100 150,200 100,300 C50,400 150,500 100,600 C50,700 150,800 100,800"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{
                pathLength: pathProgress,
              }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a3e635" />
                <stop offset="50%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#a3e635" />
              </linearGradient>
            </defs>
          </svg>

          {/* Steps */}
          <div className="relative space-y-16 lg:space-y-24">
            {journeySteps.map((step, index) => (
              <JourneyStep
                key={step.id}
                step={step}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type JourneyStepProps = {
  step: (typeof journeySteps)[number];
  index: number;
  isInView: boolean;
};

function JourneyStep({ step, index, isInView }: JourneyStepProps) {
  const Icon = step.icon;
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={cn(
        "relative flex flex-col items-center gap-6 lg:flex-row lg:gap-12",
        isLeft ? "lg:flex-row" : "lg:flex-row-reverse",
      )}
    >
      {/* Content */}
      <div
        className={cn(
          "flex-1 text-center lg:text-left",
          !isLeft && "lg:text-right",
        )}
      >
        <motion.div
          className={cn(
            "inline-flex size-16 items-center justify-center rounded-2xl border",
            step.color === "lime"
              ? "border-lime-400/30 bg-lime-400/10 text-lime-400"
              : "border-cyan-400/30 bg-cyan-400/10 text-cyan-400",
          )}
          whileHover={{
            scale: 1.1,
            rotate: 5,
            boxShadow:
              step.color === "lime"
                ? "0 0 40px oklch(0.91 0.23 120 / 0.3)"
                : "0 0 40px oklch(0.85 0.16 195 / 0.3)",
          }}
        >
          <Icon className="size-8" />
        </motion.div>

        <h3
          className={cn(
            "mt-4 text-2xl font-bold",
            step.color === "lime" ? "text-lime-400" : "text-cyan-400",
          )}
        >
          {step.title}
        </h3>

        <p className="mt-2 max-w-md text-neutral-400">{step.description}</p>
      </div>

      {/* Center dot for mobile */}
      <div className="flex size-4 items-center justify-center lg:absolute lg:left-1/2 lg:-translate-x-1/2">
        <motion.div
          className={cn(
            "size-4 rounded-full",
            step.color === "lime" ? "bg-lime-400" : "bg-cyan-400",
          )}
          animate={{
            boxShadow: [
              `0 0 0 0 ${step.color === "lime" ? "rgba(163, 230, 53, 0.4)" : "rgba(34, 211, 238, 0.4)"}`,
              `0 0 0 12px ${step.color === "lime" ? "rgba(163, 230, 53, 0)" : "rgba(34, 211, 238, 0)"}`,
              `0 0 0 0 ${step.color === "lime" ? "rgba(163, 230, 53, 0.4)" : "rgba(34, 211, 238, 0.4)"}`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
        />
      </div>

      {/* Empty space for alignment */}
      <div className="hidden flex-1 lg:block" />
    </motion.div>
  );
}
