"use client";

import { GlassPanel, NeonText } from "@/components/impulsion/cyberpunk";
import { RadialGauge } from "@/components/impulsion/cyberpunk/data/radial-gauge";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type SquadReadinessGaugeProps = {
  className?: string;
  readiness: number; // 0-100
  athleteCount: number;
  optimalCount: number;
  warningCount: number;
  criticalCount: number;
};

/**
 * SquadReadinessGauge - Jauge radiale principale du dashboard
 * Affiche la readiness globale de l'équipe avec breakdown par statut
 */
export function SquadReadinessGauge({
  className,
  readiness,
  athleteCount,
  optimalCount,
  warningCount,
  criticalCount,
}: SquadReadinessGaugeProps) {
  const t = useTranslations("missionControl");

  const getReadinessColor = (): "lime" | "cyan" | "danger" => {
    if (readiness >= 80) return "lime";
    if (readiness >= 60) return "cyan";
    return "danger";
  };

  return (
    <GlassPanel className={cn("p-6", className)} glow="cyan">
      <div className="flex flex-col items-center gap-6">
        {/* Header */}
        <div className="text-center">
          <NeonText
            as="h3"
            color="cyan"
            intensity="subtle"
            className="font-mono text-sm tracking-wider uppercase"
          >
            {t("widgets.squadReadiness.title")}
          </NeonText>
          <p className="mt-1 text-xs text-neutral-500">
            {athleteCount} {t("widgets.squadReadiness.athletes")}
          </p>
        </div>

        {/* Main gauge */}
        <RadialGauge
          value={readiness}
          max={100}
          size="lg"
          color={getReadinessColor()}
          label={t("widgets.squadReadiness.readiness")}
          animated
        />

        {/* Status breakdown */}
        <div className="grid w-full grid-cols-3 gap-4">
          <div className="text-center">
            <div className="font-mono text-2xl font-bold text-[var(--imp-lime-400)]">
              {optimalCount}
            </div>
            <div className="text-xs text-neutral-500">
              {t("widgets.squadReadiness.optimal")}
            </div>
          </div>
          <div className="text-center">
            <div className="font-mono text-2xl font-bold text-[var(--imp-warning)]">
              {warningCount}
            </div>
            <div className="text-xs text-neutral-500">
              {t("widgets.squadReadiness.warning")}
            </div>
          </div>
          <div className="text-center">
            <div className="font-mono text-2xl font-bold text-[var(--imp-danger-neon)]">
              {criticalCount}
            </div>
            <div className="text-xs text-neutral-500">
              {t("widgets.squadReadiness.critical")}
            </div>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}
