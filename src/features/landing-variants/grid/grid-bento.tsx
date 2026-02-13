"use client";

import {
  BentoCard,
  GlowHeading,
  GridLines,
} from "@/components/impulsion/landing";
import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import {
  Calendar,
  Video,
  TrendingUp,
  Users,
  MessageSquare,
  Trophy,
} from "lucide-react";

const features = [
  {
    id: "calendar",
    title: "Calendrier",
    description:
      "Planifiez vos seances en drag & drop. Vue semaine, mois et suivi de charge integre.",
    icon: Calendar,
    span: "2" as const,
    color: "lime" as const,
    coords: "[0,0]",
  },
  {
    id: "video",
    title: "Video",
    description:
      "Annotez vos analyses techniques avec des marqueurs temporels. Vos athletes voient exactement quoi corriger.",
    icon: Video,
    span: "1" as const,
    color: "cyan" as const,
    coords: "[2,0]",
  },
  {
    id: "load",
    title: "Charge",
    description:
      "Suivez l'ACWR en temps reel. Detectez les risques de blessure avant qu'il ne soit trop tard.",
    icon: TrendingUp,
    span: "1" as const,
    color: "lime" as const,
    coords: "[0,1]",
  },
  {
    id: "team",
    title: "Equipe",
    description:
      "Gerez tous vos athletes depuis un tableau de bord unique. Templates, groupes et permissions.",
    icon: Users,
    span: "1" as const,
    color: "cyan" as const,
    coords: "[1,1]",
  },
  {
    id: "feedback",
    title: "Feedback",
    description:
      "Recueillez les ressentis post-seance en 30 secondes. Notifications temps reel.",
    icon: MessageSquare,
    span: "1" as const,
    color: "lime" as const,
    coords: "[2,1]",
  },
  {
    id: "gamification",
    title: "Gamification",
    description:
      "Motivez avec badges et XP. Vos athletes progressent et restent engages.",
    icon: Trophy,
    span: "row" as const,
    color: "cyan" as const,
    coords: "[0,2]",
  },
];

export function GridBento() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="bento" ref={ref} className="relative bg-neutral-950 py-24">
      {/* Grid lines background */}
      <GridLines color="lime" direction="both" count={8} animated />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4 font-mono text-xs text-neutral-600"
        >
          {`// SECTION.FEATURES`}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <GlowHeading level={2} glowColor="lime">
            Tout ce dont vous avez besoin
          </GlowHeading>
          <p className="mt-4 max-w-xl text-neutral-400">
            Une plateforme complete pour gerer vos athletes, planifier les
            entrainements et suivre leur progression.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCell
              key={feature.id}
              feature={feature}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type FeatureCellProps = {
  feature: (typeof features)[number];
  index: number;
  isInView: boolean;
};

function FeatureCell({ feature, index, isInView }: FeatureCellProps) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ perspective: "1000px" }}
    >
      <BentoCard span={feature.span} glowColor={feature.color}>
        {/* Coordinates */}
        <div className="absolute top-4 right-4 font-mono text-xs text-neutral-600">
          {feature.coords}
        </div>

        {/* Icon */}
        <motion.div
          className={cn(
            "flex size-12 items-center justify-center rounded-lg border",
            feature.color === "lime"
              ? "border-lime-400/30 bg-lime-400/10 text-lime-400"
              : "border-cyan-400/30 bg-cyan-400/10 text-cyan-400",
          )}
          whileHover={{
            scale: 1.1,
            rotateY: 10,
            boxShadow:
              feature.color === "lime"
                ? "0 0 30px oklch(0.91 0.23 120 / 0.3)"
                : "0 0 30px oklch(0.85 0.16 195 / 0.3)",
          }}
        >
          <Icon className="size-6" />
        </motion.div>

        {/* Title */}
        <h3
          className={cn(
            "mt-4 font-mono text-lg font-bold",
            feature.color === "lime" ? "text-lime-400" : "text-cyan-400",
          )}
        >
          {feature.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-neutral-400">{feature.description}</p>

        {/* Connection lines (visual effect) */}
        <div className="absolute -right-2 -bottom-2 size-4 border-r border-b border-neutral-800" />
        <div className="absolute -top-2 -left-2 size-4 border-t border-l border-neutral-800" />
      </BentoCard>
    </motion.div>
  );
}
