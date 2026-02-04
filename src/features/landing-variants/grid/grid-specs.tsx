"use client";

import { GlowHeading } from "@/components/impulsion/landing";
import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Briefcase, User, Clock, TrendingUp, Shield, Zap } from "lucide-react";

const benefitsForCoaches = [
  {
    icon: Clock,
    title: "Gagnez 2h par semaine",
    description: "Automatisez la planification et les suivis",
  },
  {
    icon: User,
    title: "Suivez 20+ athletes",
    description: "Tableau de bord centralise et alertes intelligentes",
  },
  {
    icon: TrendingUp,
    title: "Reduisez les blessures",
    description: "ACWR et detection des surcharges",
  },
];

const benefitsForAthletes = [
  {
    icon: Zap,
    title: "Progressez plus vite",
    description: "Feedback video detaille sur votre technique",
  },
  {
    icon: Briefcase,
    title: "Feedback en 24h",
    description: "Votre coach repond rapidement a chaque seance",
  },
  {
    icon: Shield,
    title: "Restez motive",
    description: "Badges, XP et suivi de progression",
  },
];

export function GridSpecs() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="specs" ref={ref} className="relative bg-neutral-950 py-24">
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(90deg, oklch(0.91 0.23 120 / 0.03) 1px, transparent 1px),
            linear-gradient(180deg, oklch(0.91 0.23 120 / 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4 font-mono text-xs text-neutral-600"
        >
          {`// SECTION.BENEFITS`}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <GlowHeading level={2} glowColor="cyan">
            Pour coachs et athletes
          </GlowHeading>
          <p className="mt-4 max-w-xl text-neutral-400">
            Impulsion beneficie a tous. Les coachs gagnent du temps, les
            athletes progressent plus vite.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* For Coaches */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-lg border border-lime-400/30 bg-lime-400/5 p-6"
          >
            <div className="mb-6 flex items-center justify-between border-b border-neutral-800 pb-4">
              <h3 className="font-mono text-sm font-bold text-lime-400">
                POUR LES COACHS
              </h3>
              <span className="font-mono text-xs text-neutral-600">[0,*]</span>
            </div>

            <div className="space-y-6">
              {benefitsForCoaches.map((benefit, index) => (
                <BenefitItem
                  key={benefit.title}
                  benefit={benefit}
                  index={index}
                  isInView={isInView}
                  color="lime"
                  baseDelay={0.3}
                />
              ))}
            </div>

            {/* Corner decorations */}
            <div className="absolute -top-px -right-px size-3 border-t border-r border-lime-400" />
            <div className="absolute -bottom-px -left-px size-3 border-b border-l border-lime-400" />
          </motion.div>

          {/* For Athletes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="relative rounded-lg border border-cyan-400/30 bg-cyan-400/5 p-6"
          >
            <div className="mb-6 flex items-center justify-between border-b border-neutral-800 pb-4">
              <h3 className="font-mono text-sm font-bold text-cyan-400">
                POUR LES ATHLETES
              </h3>
              <span className="font-mono text-xs text-neutral-600">[1,*]</span>
            </div>

            <div className="space-y-6">
              {benefitsForAthletes.map((benefit, index) => (
                <BenefitItem
                  key={benefit.title}
                  benefit={benefit}
                  index={index}
                  isInView={isInView}
                  color="cyan"
                  baseDelay={0.45}
                />
              ))}
            </div>

            {/* Corner decorations */}
            <div className="absolute -top-px -right-px size-3 border-t border-r border-cyan-400" />
            <div className="absolute -bottom-px -left-px size-3 border-b border-l border-cyan-400" />
          </motion.div>
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 rounded-lg border border-neutral-800 bg-neutral-900/30 p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <h4 className="font-mono text-sm text-neutral-400">
                CONFIANCE & SECURITE
              </h4>
              <p className="mt-1 text-sm text-neutral-500">
                Vos donnees sont protegees et securisees
              </p>
            </div>
            <div className="flex gap-8">
              <TrustBadge label="Chiffrement" value="AES-256" />
              <TrustBadge label="Conformite" value="RGPD" />
              <TrustBadge label="Uptime" value="99.9%" />
              <TrustBadge label="Support" value="24h" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

type BenefitItemProps = {
  benefit: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
  };
  index: number;
  isInView: boolean;
  color: "lime" | "cyan";
  baseDelay: number;
};

function BenefitItem({
  benefit,
  index,
  isInView,
  color,
  baseDelay,
}: BenefitItemProps) {
  const Icon = benefit.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.4,
        delay: baseDelay + index * 0.1,
      }}
      className="flex items-start gap-4"
    >
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-lg border",
          color === "lime"
            ? "border-lime-400/30 bg-lime-400/10"
            : "border-cyan-400/30 bg-cyan-400/10",
        )}
      >
        <Icon
          className={cn(
            "size-5",
            color === "lime" ? "text-lime-400" : "text-cyan-400",
          )}
        />
      </div>
      <div>
        <h4
          className={cn(
            "font-mono text-sm font-bold",
            color === "lime" ? "text-lime-400" : "text-cyan-400",
          )}
        >
          {benefit.title}
        </h4>
        <p className="mt-1 text-sm text-neutral-400">{benefit.description}</p>
      </div>
    </motion.div>
  );
}

type TrustBadgeProps = {
  label: string;
  value: string;
};

function TrustBadge({ label, value }: TrustBadgeProps) {
  return (
    <div className="text-center">
      <div
        className="font-mono text-lg font-bold text-lime-400"
        style={{
          textShadow: "0 0 10px oklch(0.91 0.23 120 / 0.4)",
        }}
      >
        {value}
      </div>
      <div className="mt-1 font-mono text-xs text-neutral-500">{label}</div>
    </div>
  );
}
