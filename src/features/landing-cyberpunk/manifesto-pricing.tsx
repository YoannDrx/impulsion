"use client";

import {
  GlassPanel,
  HudBorder,
  NeonText,
} from "@/components/impulsion/cyberpunk";
import { CyberButton } from "@/components/impulsion/cyberpunk/form/cyber-button";
import { cn } from "@/lib/utils";
import { Check, Shield, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

/**
 * Manifesto Pricing - Section tarifs style terminal
 */
export function ManifestoPricing() {
  const t = useTranslations("manifesto");

  const tiers = ["observer", "operator", "commander"] as const;

  return (
    <section className="relative bg-[var(--imp-charcoal)] py-24">
      <div className="mx-auto max-w-screen-xl px-4">
        {/* Section header */}
        <div className="mb-16 text-center">
          <NeonText
            as="h2"
            color="cyan"
            intensity="normal"
            className="mb-4 text-3xl font-bold tracking-wider uppercase md:text-4xl"
          >
            {t("pricing.title")}
          </NeonText>
          <p className="mx-auto max-w-xl text-neutral-400">
            {t("pricing.subtitle")}
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {tiers.map((tier) => {
            const isRecommended = tier === "operator";
            const tierData = t.raw(`pricing.tiers.${tier}`) as {
              name: string;
              price: string;
              period: string;
              clearance: string;
              features: string[];
              cta: string;
              badge?: string;
            };

            return (
              <HudBorder
                key={tier}
                color={isRecommended ? "lime" : "cyan"}
                cornerSize="md"
                animated={isRecommended}
                className={cn(
                  "relative transition-all duration-300",
                  isRecommended && "z-10 scale-105",
                )}
              >
                <GlassPanel
                  className="h-full p-6"
                  glow={isRecommended ? "lime" : "none"}
                >
                  {/* Recommended badge */}
                  {tierData.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[var(--imp-lime-400)] px-3 py-1 font-mono text-xs font-bold text-[var(--imp-void)]">
                        <Zap className="size-3" />
                        {tierData.badge}
                      </span>
                    </div>
                  )}

                  <div className="flex h-full flex-col">
                    {/* Tier name */}
                    <div className="mb-4">
                      <h3
                        className={cn(
                          "font-mono text-xl font-bold tracking-wider uppercase",
                          isRecommended
                            ? "text-[var(--imp-lime-400)]"
                            : "text-[var(--imp-cyan-400)]",
                        )}
                      >
                        {tierData.name}
                      </h3>
                      <div className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
                        <Shield className="size-3" />
                        {tierData.clearance}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <span className="font-mono text-4xl font-bold text-white">
                        {tierData.price}€
                      </span>
                      <span className="text-neutral-500">
                        {tierData.period}
                      </span>
                    </div>

                    {/* Features */}
                    <ul className="mb-8 flex-grow space-y-3">
                      {tierData.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-neutral-300"
                        >
                          <Check
                            className={cn(
                              "mt-0.5 size-4 shrink-0",
                              isRecommended
                                ? "text-[var(--imp-lime-400)]"
                                : "text-[var(--imp-cyan-400)]",
                            )}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <CyberButton
                      variant={isRecommended ? "solid" : "cyan"}
                      className="w-full"
                      asChild
                    >
                      <Link
                        href={
                          tier === "commander" ? "/contact" : "/auth/signup"
                        }
                      >
                        {tierData.cta}
                      </Link>
                    </CyberButton>
                  </div>
                </GlassPanel>
              </HudBorder>
            );
          })}
        </div>
      </div>
    </section>
  );
}
