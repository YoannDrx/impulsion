"use client";

import {
  GlassPanel,
  HudBorder,
  MarqueeTicker,
  NeonText,
  NoiseTexture,
  PerspectiveGrid,
  ScanlinesOverlay,
  StatusIndicator,
} from "@/components/impulsion/cyberpunk";
import { DataWidget } from "@/components/impulsion/cyberpunk/data/data-widget";
import {
  CriticalAlertsTable,
  LiveDataFeed,
  SquadReadinessGauge,
} from "@/features/team-dashboard/cyberpunk";
import {
  Activity,
  Calendar,
  TrendingUp,
  Users,
  Video,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * Mission Control - Dashboard principal style cyberpunk
 * Affiche les métriques clés, alertes et feed temps réel
 */
export default function MissionControlPage() {
  const t = useTranslations("missionControl");

  // Mock data - in real app, this would come from the database
  const mockAlerts = [
    {
      id: "1",
      athleteName: "Lucas M.",
      metric: "ACWR",
      value: "1.52",
      risk: "critical" as const,
      timestamp: "10:32",
    },
    {
      id: "2",
      athleteName: "Sophie L.",
      metric: "Sleep Score",
      value: "45%",
      risk: "elevated" as const,
      timestamp: "09:15",
    },
    {
      id: "3",
      athleteName: "Thomas D.",
      metric: "HRV",
      value: "-18%",
      risk: "moderate" as const,
      timestamp: "08:45",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[var(--imp-void)]">
      {/* Background effects */}
      <PerspectiveGrid variant="flat" color="cyan" />
      <NoiseTexture opacity={0.02} />
      <ScanlinesOverlay intensity="subtle" />

      {/* Top ticker */}
      <div className="border-b border-[var(--imp-glass-10)] bg-[var(--imp-charcoal)] py-2">
        <MarqueeTicker speed="slow">
          <span className="font-mono text-xs tracking-wider text-neutral-400 uppercase">
            {t("ticker")}
          </span>
        </MarqueeTicker>
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-screen-2xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <NeonText
              as="h1"
              color="lime"
              intensity="normal"
              className="font-mono text-2xl font-bold tracking-wider uppercase md:text-3xl"
            >
              {t("title")}
            </NeonText>
            <p className="mt-1 text-sm text-neutral-500">{t("subtitle")}</p>
          </div>
          <div className="flex items-center gap-4">
            <StatusIndicator status="online" label="SYSTEMS NOMINAL" />
          </div>
        </div>

        {/* Stats row */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          <DataWidget
            label={t("stats.athletes")}
            value="24"
            icon={Users}
            trend={{ value: 2 }}
          />
          <DataWidget
            label={t("stats.sessions")}
            value="156"
            icon={Calendar}
            trend={{ value: 12 }}
          />
          <DataWidget
            label={t("stats.videos")}
            value="48"
            icon={Video}
            trend={{ value: 5 }}
          />
          <DataWidget
            label={t("stats.avgLoad")}
            value="720"
            unit="AU"
            icon={Activity}
          />
          <DataWidget
            label={t("stats.compliance")}
            value="92"
            unit="%"
            icon={Zap}
            color="lime"
          />
          <DataWidget
            label={t("stats.performance")}
            value="+8.5"
            unit="%"
            icon={TrendingUp}
            color="lime"
          />
        </div>

        {/* Main grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left column - Readiness gauge */}
          <div className="lg:col-span-1">
            <HudBorder color="cyan" cornerSize="md">
              <SquadReadinessGauge
                readiness={78}
                athleteCount={24}
                optimalCount={18}
                warningCount={4}
                criticalCount={2}
              />
            </HudBorder>
          </div>

          {/* Center column - Alerts table */}
          <div className="lg:col-span-2">
            <HudBorder color="lime" cornerSize="md">
              <CriticalAlertsTable alerts={mockAlerts} />
            </HudBorder>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Live feed */}
          <HudBorder color="cyan" cornerSize="md">
            <LiveDataFeed maxItems={6} />
          </HudBorder>

          {/* Quick stats panel */}
          <HudBorder color="lime" cornerSize="md">
            <GlassPanel className="p-6">
              <NeonText
                as="h3"
                color="lime"
                intensity="subtle"
                className="mb-4 font-mono text-sm tracking-wider uppercase"
              >
                {t("widgets.quickStats.title")}
              </NeonText>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded border border-[var(--imp-glass-10)] bg-[var(--imp-void)]/50 p-4">
                  <div className="font-mono text-3xl font-bold text-[var(--imp-lime-400)]">
                    4.2h
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">
                    {t("widgets.quickStats.avgTraining")}
                  </div>
                </div>
                <div className="rounded border border-[var(--imp-glass-10)] bg-[var(--imp-void)]/50 p-4">
                  <div className="font-mono text-3xl font-bold text-[var(--imp-cyan-400)]">
                    0.98
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">
                    {t("widgets.quickStats.avgAcwr")}
                  </div>
                </div>
                <div className="rounded border border-[var(--imp-glass-10)] bg-[var(--imp-void)]/50 p-4">
                  <div className="font-mono text-3xl font-bold text-[var(--imp-lime-400)]">
                    86%
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">
                    {t("widgets.quickStats.teamReadiness")}
                  </div>
                </div>
                <div className="rounded border border-[var(--imp-glass-10)] bg-[var(--imp-void)]/50 p-4">
                  <div className="font-mono text-3xl font-bold text-[var(--imp-cyan-400)]">
                    12
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">
                    {t("widgets.quickStats.pendingReviews")}
                  </div>
                </div>
              </div>
            </GlassPanel>
          </HudBorder>
        </div>
      </div>

      {/* HUD corners */}
      <div className="pointer-events-none absolute top-16 left-4 h-8 w-8 border-t-2 border-l-2 border-[var(--imp-lime-400)]/50" />
      <div className="pointer-events-none absolute top-16 right-4 h-8 w-8 border-t-2 border-r-2 border-[var(--imp-lime-400)]/50" />
      <div className="pointer-events-none absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-[var(--imp-cyan-400)]/50" />
      <div className="pointer-events-none absolute right-4 bottom-4 h-8 w-8 border-r-2 border-b-2 border-[var(--imp-cyan-400)]/50" />
    </div>
  );
}
