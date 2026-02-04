"use client";

import { PulseLine, GlowHeading } from "@/components/impulsion/landing";
import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Calendar, Video, TrendingUp, Users, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Calendrier intelligent",
    description:
      "Planifiez les seances, visualisez la charge et anticipez les pics d'intensite.",
    color: "lime" as const,
    metrics: [
      "Planification drag & drop",
      "Vue semaine/mois",
      "Alertes de surcharge",
    ],
  },
  {
    icon: Video,
    title: "Analyse video",
    description:
      "Ajoutez des marqueurs temporels et commentaires directement sur les videos.",
    color: "cyan" as const,
    metrics: ["Marqueurs timestamps", "Annotations", "Export partage"],
  },
  {
    icon: TrendingUp,
    title: "Suivi de charge",
    description:
      "ACWR, RPE, duree - toutes les metriques pour optimiser la progression.",
    color: "lime" as const,
    metrics: ["Ratio ACWR", "RPE tracking", "Historique complet"],
  },
  {
    icon: Users,
    title: "Gestion d'equipe",
    description:
      "Gerez plusieurs athletes, assignez des programmes et suivez leur progression.",
    color: "cyan" as const,
    metrics: ["Multi-athletes", "Templates", "Roles & permissions"],
  },
  {
    icon: Zap,
    title: "Feedback instantane",
    description:
      "Les athletes remplissent leur ressenti apres chaque seance en quelques clics.",
    color: "lime" as const,
    metrics: ["Formulaire rapide", "Notifications", "Dashboard coach"],
  },
  {
    icon: Shield,
    title: "Donnees securisees",
    description: "Vos donnees sont chiffrees et stockees en conformite RGPD.",
    color: "cyan" as const,
    metrics: ["Chiffrement AES-256", "RGPD compliant", "Backup quotidien"],
  },
];

export function PulseFeatures() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" ref={ref} className="relative bg-neutral-950 py-24">
      {/* Background pulse effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 size-96 rounded-full bg-lime-400/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-1/4 bottom-1/4 size-96 rounded-full bg-cyan-400/5 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-sm tracking-widest text-lime-400 uppercase">
            Fonctionnalites
          </span>
          <GlowHeading level={2} glowColor="lime" className="mt-4">
            Tout ce dont vous avez besoin
          </GlowHeading>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-400">
            Une plateforme complete pour le coaching sportif hybride. Planifiez,
            analysez, communiquez.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Center line */}
          <div className="absolute left-1/2 hidden h-full w-px -translate-x-1/2 bg-neutral-800 lg:block">
            <motion.div
              className="h-full w-full bg-gradient-to-b from-lime-400 via-cyan-400 to-lime-400"
              initial={{ scaleY: 0, originY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>

          <div className="space-y-12 lg:space-y-24">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>

      <PulseLine color="lime" className="absolute bottom-0" />
    </section>
  );
}

type FeatureCardProps = {
  feature: (typeof features)[number];
  index: number;
  isInView: boolean;
};

function FeatureCard({ feature, index, isInView }: FeatureCardProps) {
  const isLeft = index % 2 === 0;
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={cn(
        "relative grid gap-8 lg:grid-cols-2",
        isLeft ? "lg:text-right" : "lg:text-left",
      )}
    >
      {/* Spacer for alternating layout */}
      {!isLeft && <div className="hidden lg:block" />}

      <div
        className={cn(
          "flex flex-col",
          isLeft ? "lg:items-end" : "lg:items-start",
        )}
      >
        {/* Icon */}
        <motion.div
          className={cn(
            "flex size-14 items-center justify-center rounded-xl",
            feature.color === "lime"
              ? "bg-lime-400/10 text-lime-400"
              : "bg-cyan-400/10 text-cyan-400",
          )}
          whileHover={{
            scale: 1.1,
            boxShadow:
              feature.color === "lime"
                ? "0 0 30px oklch(0.91 0.23 120 / 0.4)"
                : "0 0 30px oklch(0.85 0.16 195 / 0.4)",
          }}
        >
          <Icon className="size-7" />
        </motion.div>

        {/* Title */}
        <h3
          className={cn(
            "mt-4 text-2xl font-bold",
            feature.color === "lime" ? "text-lime-400" : "text-cyan-400",
          )}
          style={{
            textShadow:
              feature.color === "lime"
                ? "0 0 20px oklch(0.91 0.23 120 / 0.3)"
                : "0 0 20px oklch(0.85 0.16 195 / 0.3)",
          }}
        >
          {feature.title}
        </h3>

        {/* Description */}
        <p className="mt-2 max-w-md text-neutral-400">{feature.description}</p>

        {/* Metrics */}
        <div
          className={cn(
            "mt-4 flex flex-wrap gap-2",
            isLeft ? "justify-end" : "justify-start",
          )}
        >
          {feature.metrics.map((metric) => (
            <span
              key={metric}
              className={cn(
                "rounded-full border px-3 py-1 text-xs",
                feature.color === "lime"
                  ? "border-lime-400/30 bg-lime-400/10 text-lime-400"
                  : "border-cyan-400/30 bg-cyan-400/10 text-cyan-400",
              )}
            >
              {metric}
            </span>
          ))}
        </div>
      </div>

      {/* Spacer for alternating layout */}
      {isLeft && <div className="hidden lg:block" />}

      {/* Center dot on timeline */}
      <div className="absolute top-4 left-1/2 hidden -translate-x-1/2 lg:block">
        <motion.div
          className={cn(
            "size-4 rounded-full",
            feature.color === "lime" ? "bg-lime-400" : "bg-cyan-400",
          )}
          style={{
            boxShadow:
              feature.color === "lime"
                ? "0 0 20px oklch(0.91 0.23 120 / 0.6)"
                : "0 0 20px oklch(0.85 0.16 195 / 0.6)",
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />
      </div>
    </motion.div>
  );
}
