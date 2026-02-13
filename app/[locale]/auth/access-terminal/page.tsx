"use client";

import {
  ConcentricCircles,
  HudBorder,
  NoiseTexture,
  PerspectiveGrid,
  ScanlinesOverlay,
} from "@/components/impulsion/cyberpunk";
import {
  BiometricScannerView,
  SystemLogsDisplay,
  TerminalAuthForm,
} from "@/features/auth/cyberpunk";
import { useTranslations } from "next-intl";
import { useState } from "react";

/**
 * Access Terminal - Page d'authentification style cyberpunk
 * Avec scanner biométrique, formulaire terminal et logs système
 */
export default function AccessTerminalPage() {
  const t = useTranslations("accessTerminal");
  const [showForm, setShowForm] = useState(false);

  const handleScanComplete = (success: boolean) => {
    if (success) {
      setShowForm(true);
    }
  };

  const handleFormSubmit = (_data: { coachId: string; passKey: string }) => {
    // TODO: Integrate with actual auth
  };

  return (
    <div className="relative min-h-screen bg-[var(--imp-void)]">
      {/* Background effects */}
      <PerspectiveGrid variant="perspective" color="cyan" />
      <NoiseTexture opacity={0.03} />
      <ScanlinesOverlay intensity="subtle" />

      {/* Decorative circles */}
      <div className="pointer-events-none absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 opacity-20">
        <ConcentricCircles size={500} rings={6} color="cyan" animated />
      </div>
      <div className="pointer-events-none absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 opacity-20">
        <ConcentricCircles size={500} rings={6} color="lime" animated />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-screen-xl flex-col items-center justify-center px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-mono text-3xl font-bold tracking-wider text-[var(--imp-lime-400)] uppercase md:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-2 text-neutral-500">{t("subtitle")}</p>
        </div>

        {/* Main panel */}
        <HudBorder
          color="cyan"
          cornerSize="lg"
          animated
          className="w-full max-w-4xl"
        >
          <div className="grid gap-8 p-8 md:grid-cols-2">
            {/* Left: Scanner or Form */}
            <div className="flex items-center justify-center">
              {!showForm ? (
                <BiometricScannerView onScanComplete={handleScanComplete} />
              ) : (
                <TerminalAuthForm onSubmit={handleFormSubmit} />
              )}
            </div>

            {/* Right: System logs */}
            <div className="flex flex-col gap-6">
              <SystemLogsDisplay />

              {/* Status panel */}
              <div className="rounded border border-[var(--imp-glass-10)] bg-[var(--imp-void)]/50 p-4">
                <div className="flex items-center gap-2">
                  <span className="size-2 animate-pulse rounded-full bg-[var(--imp-cyan-400)]" />
                  <span className="font-mono text-xs tracking-wider text-[var(--imp-cyan-400)] uppercase">
                    {t("status.secure")}
                  </span>
                </div>
                <div className="mt-3 space-y-2 font-mono text-xs text-neutral-500">
                  <div className="flex justify-between">
                    <span>{t("status.encryption")}</span>
                    <span className="text-[var(--imp-lime-400)]">
                      AES-256-GCM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("status.protocol")}</span>
                    <span className="text-[var(--imp-lime-400)]">TLS 1.3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("status.session")}</span>
                    <span className="text-[var(--imp-cyan-400)]">PENDING</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HudBorder>
      </div>

      {/* HUD corners */}
      <div className="pointer-events-none absolute top-4 left-4 h-8 w-8 border-t-2 border-l-2 border-[var(--imp-lime-400)]/50" />
      <div className="pointer-events-none absolute top-4 right-4 h-8 w-8 border-t-2 border-r-2 border-[var(--imp-lime-400)]/50" />
      <div className="pointer-events-none absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-[var(--imp-cyan-400)]/50" />
      <div className="pointer-events-none absolute right-4 bottom-4 h-8 w-8 border-r-2 border-b-2 border-[var(--imp-cyan-400)]/50" />
    </div>
  );
}
