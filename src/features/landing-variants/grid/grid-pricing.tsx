"use client";

import {
  GlowHeading,
  GlowButton,
  OutlineGlowButton,
} from "@/components/impulsion/landing";
import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    id: "free",
    name: "Starter",
    price: "0",
    description: "Pour demarrer avec Impulsion",
    features: [
      "5 athletes max",
      "10 videos/mois",
      "Calendrier basique",
      "Suivi de charge RPE",
      "Support email",
    ],
    cta: "Commencer",
    variant: "outline" as const,
    coords: "[0,0]",
  },
  {
    id: "pro",
    name: "Pro",
    price: "29",
    description: "Pour les coachs serieux",
    features: [
      "Athletes illimites",
      "Videos illimitees",
      "Calendrier avance",
      "ACWR automatique",
      "Analyse video annotee",
      "Support prioritaire",
      "Integration Strava",
    ],
    popular: true,
    cta: "Essai gratuit",
    variant: "default" as const,
    coords: "[1,0]",
  },
  {
    id: "team",
    name: "Team",
    price: "79",
    description: "Pour les structures",
    features: [
      "Tout de Pro",
      "Multi-coachs",
      "Roles & permissions",
      "Branding personnalise",
      "API access",
      "Support dedie",
      "SLA 99.9%",
    ],
    cta: "Contacter",
    variant: "outline" as const,
    coords: "[2,0]",
  },
];

export function GridPricing() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" ref={ref} className="relative bg-neutral-950 py-24">
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4 font-mono text-xs text-neutral-600"
        >
          {`// SECTION.PRICING`}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center"
        >
          <GlowHeading level={2} glowColor="lime">
            Tarification transparente
          </GlowHeading>
          <p className="mt-4 text-neutral-400">
            Choisissez le plan adapte a vos besoins. Sans engagement.
          </p>
        </motion.div>

        {/* Plans grid */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Enterprise note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="font-mono text-sm text-neutral-500">
            {`// Besoin d'une solution sur mesure ?`}{" "}
            <Link href="/contact" className="text-lime-400 hover:underline">
              Contactez-nous
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

type PlanCardProps = {
  plan: (typeof plans)[number];
  index: number;
  isInView: boolean;
};

function PlanCard({ plan, index, isInView }: PlanCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={cn(
        "relative rounded-lg border p-6",
        plan.popular
          ? "border-lime-400/50 bg-lime-400/5"
          : "border-neutral-800 bg-neutral-900/30",
      )}
    >
      {/* Coords */}
      <div className="absolute top-4 right-4 font-mono text-xs text-neutral-600">
        {plan.coords}
      </div>

      {/* Popular badge */}
      {plan.popular && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded border border-lime-400/30 bg-lime-400/10 px-3 py-1 font-mono text-xs text-lime-400"
          style={{ boxShadow: "0 0 20px oklch(0.91 0.23 120 / 0.2)" }}
        >
          RECOMMENDED
        </div>
      )}

      {/* Plan name */}
      <h3
        className={cn(
          "font-mono text-lg font-bold",
          plan.popular ? "text-lime-400" : "text-white",
        )}
      >
        {plan.name}
      </h3>

      {/* Price */}
      <div className="mt-4 flex items-baseline gap-1">
        <span
          className={cn(
            "font-mono text-4xl font-bold",
            plan.popular ? "text-lime-400" : "text-white",
          )}
          style={
            plan.popular
              ? { textShadow: "0 0 20px oklch(0.91 0.23 120 / 0.4)" }
              : undefined
          }
        >
          {plan.price}EUR
        </span>
        <span className="font-mono text-sm text-neutral-500">/mois</span>
      </div>

      {/* Description */}
      <p className="mt-2 text-sm text-neutral-400">{plan.description}</p>

      {/* Features */}
      <ul className="mt-6 space-y-3">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2 font-mono text-sm text-neutral-300"
          >
            <Check
              className={cn(
                "size-4",
                plan.popular ? "text-lime-400" : "text-neutral-600",
              )}
            />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-8">
        <Link href="/auth/signup" className="block">
          {plan.variant === "default" ? (
            <GlowButton color="lime">{plan.cta}</GlowButton>
          ) : (
            <OutlineGlowButton color="lime">{plan.cta}</OutlineGlowButton>
          )}
        </Link>
      </div>

      {/* Corner decorations */}
      {plan.popular && (
        <>
          <div className="absolute -top-px -right-px size-4 border-t border-r border-lime-400" />
          <div className="absolute -bottom-px -left-px size-4 border-b border-l border-lime-400" />
        </>
      )}
    </motion.div>
  );
}
