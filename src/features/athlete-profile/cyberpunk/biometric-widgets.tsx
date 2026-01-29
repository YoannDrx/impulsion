"use client";

import { GlassPanel, NeonText } from "@/components/impulsion/cyberpunk";
import { RadialGauge } from "@/components/impulsion/cyberpunk/data/radial-gauge";
import { Sparkline } from "@/components/impulsion/cyberpunk/data/sparkline";
import { cn } from "@/lib/utils";
import { Activity, Heart, Moon, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

type BiometricWidgetsProps = {
  className?: string;
  readiness: number;
  sleep: number;
  hrv: number;
  strain: number;
  hrvHistory?: number[];
  sleepHistory?: number[];
};

/**
 * BiometricWidgets - Grille de widgets biométriques
 */
export function BiometricWidgets({
  className,
  readiness,
  sleep,
  hrv,
  strain,
  hrvHistory = [45, 52, 48, 55, 50, 58, 52, 60, 55, 62],
  sleepHistory = [6.5, 7.2, 6.8, 7.5, 7.0, 6.2, 7.8, 7.5, 6.9, 7.2],
}: BiometricWidgetsProps) {
  const t = useTranslations("bioProfile");

  return (
    <div className={cn("grid grid-cols-2 gap-4 lg:grid-cols-4", className)}>
      {/* Readiness */}
      <GlassPanel className="p-4" glow="lime">
        <div className="flex items-center gap-2">
          <Zap className="size-4 text-[var(--imp-lime-400)]" />
          <NeonText
            as="span"
            color="lime"
            intensity="subtle"
            className="font-mono text-xs tracking-wider uppercase"
          >
            {t("widgets.readiness")}
          </NeonText>
        </div>
        <div className="mt-4 flex justify-center">
          <RadialGauge value={readiness} size="md" color="auto" animated />
        </div>
      </GlassPanel>

      {/* Sleep */}
      <GlassPanel className="p-4" glow="cyan">
        <div className="flex items-center gap-2">
          <Moon className="size-4 text-[var(--imp-cyan-400)]" />
          <NeonText
            as="span"
            color="cyan"
            intensity="subtle"
            className="font-mono text-xs tracking-wider uppercase"
          >
            {t("widgets.sleep")}
          </NeonText>
        </div>
        <div className="mt-4">
          <div className="mb-2 text-center">
            <span className="font-mono text-2xl font-bold text-[var(--imp-cyan-400)]">
              {sleep}h
            </span>
          </div>
          <Sparkline data={sleepHistory} height={40} color="cyan" showDots />
        </div>
      </GlassPanel>

      {/* HRV */}
      <GlassPanel className="p-4" glow="lime">
        <div className="flex items-center gap-2">
          <Heart className="size-4 text-[var(--imp-lime-400)]" />
          <NeonText
            as="span"
            color="lime"
            intensity="subtle"
            className="font-mono text-xs tracking-wider uppercase"
          >
            {t("widgets.hrv")}
          </NeonText>
        </div>
        <div className="mt-4">
          <div className="mb-2 text-center">
            <span className="font-mono text-2xl font-bold text-[var(--imp-lime-400)]">
              {hrv}ms
            </span>
          </div>
          <Sparkline data={hrvHistory} height={40} color="lime" showDots />
        </div>
      </GlassPanel>

      {/* Strain */}
      <GlassPanel className="p-4" glow="cyan">
        <div className="flex items-center gap-2">
          <Activity className="size-4 text-[var(--imp-cyan-400)]" />
          <NeonText
            as="span"
            color="cyan"
            intensity="subtle"
            className="font-mono text-xs tracking-wider uppercase"
          >
            {t("widgets.strain")}
          </NeonText>
        </div>
        <div className="mt-4 flex justify-center">
          <RadialGauge
            value={strain}
            max={21}
            size="md"
            color="cyan"
            unit=""
            animated
          />
        </div>
      </GlassPanel>
    </div>
  );
}
