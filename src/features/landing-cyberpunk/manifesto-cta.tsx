"use client";

import {
  ConcentricCircles,
  GlitchText,
  NoiseTexture,
  ScanlinesOverlay,
} from "@/components/impulsion/cyberpunk";
import { CyberButton } from "@/components/impulsion/cyberpunk/form/cyber-button";
import { useTranslations } from "next-intl";
import Link from "next/link";

/**
 * Manifesto CTA - Section call-to-action finale
 */
export function ManifestoCta() {
  const t = useTranslations("manifesto");

  return (
    <section className="relative overflow-hidden bg-[var(--imp-void)] py-32">
      {/* Background effects */}
      <NoiseTexture opacity={0.03} />
      <ScanlinesOverlay intensity="subtle" />

      {/* Decorative circles */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
        <ConcentricCircles size={800} rings={10} color="mixed" animated />
      </div>

      <div className="relative z-10 mx-auto max-w-screen-xl px-4 text-center">
        <GlitchText
          as="h2"
          intensity="subtle"
          color="white"
          className="mb-6 text-3xl font-bold md:text-5xl"
        >
          {t("cta.title")}
        </GlitchText>

        <p className="mx-auto mb-10 max-w-xl text-lg text-neutral-400">
          {t("cta.subtitle")}
        </p>

        <CyberButton variant="solid" size="lg" asChild>
          <Link href="/auth/signup">{t("cta.button")}</Link>
        </CyberButton>
      </div>
    </section>
  );
}
