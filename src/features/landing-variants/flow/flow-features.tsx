"use client";

import { FloatingCard, GlowHeading } from "@/components/impulsion/landing";
import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import {
  Calendar,
  Video,
  TrendingUp,
  Users,
  Zap,
  Shield,
  BarChart3,
  MessageCircle,
} from "lucide-react";

const features = [
  {
    id: "calendar",
    icon: Calendar,
    title: "Calendrier adaptatif",
    description:
      "Planning drag & drop qui s'ajuste automatiquement selon la charge et la fatigue.",
    color: "lime" as const,
  },
  {
    id: "video",
    icon: Video,
    title: "Analyse video",
    description: "Annotez, commentez, partagez vos analyses en quelques clics.",
    color: "cyan" as const,
  },
  {
    id: "load",
    icon: TrendingUp,
    title: "Gestion de charge",
    description: "ACWR automatique, alertes de surcharge, historique complet.",
    color: "lime" as const,
  },
  {
    id: "team",
    icon: Users,
    title: "Multi-athletes",
    description: "Gerez tous vos athletes depuis un tableau de bord unifie.",
    color: "cyan" as const,
  },
  {
    id: "feedback",
    icon: MessageCircle,
    title: "Feedback instantane",
    description: "Formulaires post-seance, notifications, chat integre.",
    color: "lime" as const,
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics avances",
    description:
      "Tableaux de bord personnalises, export de donnees, rapports automatiques.",
    color: "cyan" as const,
  },
  {
    id: "performance",
    icon: Zap,
    title: "Performances",
    description: "Suivi des records personnels, progression, comparaisons.",
    color: "lime" as const,
  },
  {
    id: "security",
    icon: Shield,
    title: "Securite",
    description:
      "Chiffrement AES-256, RGPD compliant, sauvegardes quotidiennes.",
    color: "cyan" as const,
  },
];

export function FlowFeatures() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="features" ref={ref} className="relative bg-neutral-950 py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 size-[600px] rounded-full bg-lime-400/3 blur-[100px]"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-1/4 bottom-0 size-[500px] rounded-full bg-cyan-400/3 blur-[100px]"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <GlowHeading level={2} glowColor="cyan">
            Tout coule naturellement
          </GlowHeading>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-400">
            Des outils qui s&apos;adaptent a votre facon de travailler, pas
            l&apos;inverse.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(feature.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <FloatingCard
                glowColor={feature.color}
                className={cn(
                  "h-full p-6 transition-all duration-300",
                  hoveredId === feature.id && "scale-[1.02]",
                )}
              >
                <FeatureIcon
                  icon={feature.icon}
                  color={feature.color}
                  isHovered={hoveredId === feature.id}
                />
                <h3
                  className={cn(
                    "mt-4 font-semibold",
                    feature.color === "lime"
                      ? "text-lime-400"
                      : "text-cyan-400",
                  )}
                >
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-400">
                  {feature.description}
                </p>
              </FloatingCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

type FeatureIconProps = {
  icon: React.ComponentType<{ className?: string }>;
  color: "lime" | "cyan";
  isHovered: boolean;
};

function FeatureIcon({ icon: Icon, color, isHovered }: FeatureIconProps) {
  return (
    <motion.div
      className={cn(
        "flex size-12 items-center justify-center rounded-xl border",
        color === "lime"
          ? "border-lime-400/30 bg-lime-400/10 text-lime-400"
          : "border-cyan-400/30 bg-cyan-400/10 text-cyan-400",
      )}
      animate={
        isHovered
          ? {
              rotate: [0, -5, 5, 0],
              scale: 1.1,
            }
          : {
              rotate: 0,
              scale: 1,
            }
      }
      transition={{ duration: 0.3 }}
    >
      <Icon className="size-6" />
    </motion.div>
  );
}
