"use client";

import {
  GlassPanel,
  NeonText,
  StatusIndicator,
} from "@/components/impulsion/cyberpunk";
import { RiskBadge } from "@/components/impulsion/cyberpunk/data/risk-badge";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type Alert = {
  id: string;
  athleteName: string;
  metric: string;
  value: string;
  risk: "optimal" | "moderate" | "elevated" | "critical";
  timestamp: string;
};

type CriticalAlertsTableProps = {
  className?: string;
  alerts: Alert[];
};

/**
 * CriticalAlertsTable - Table des alertes critiques
 * Affiche les athlètes en zone de risque avec leur matrice
 */
export function CriticalAlertsTable({
  className,
  alerts,
}: CriticalAlertsTableProps) {
  const t = useTranslations("missionControl");

  return (
    <GlassPanel className={cn("p-6", className)} glow="none">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-[var(--imp-glass-10)] pb-4">
        <div className="flex items-center gap-3">
          <StatusIndicator status="warning" size="md" />
          <NeonText
            as="h3"
            color="lime"
            intensity="subtle"
            className="font-mono text-sm tracking-wider uppercase"
          >
            {t("widgets.alerts.title")}
          </NeonText>
        </div>
        <span className="font-mono text-xs text-neutral-500">
          {alerts.length} {t("widgets.alerts.active")}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full font-mono text-sm">
          <thead>
            <tr className="text-left text-xs tracking-wider text-neutral-500 uppercase">
              <th className="pr-4 pb-3">{t("widgets.alerts.athlete")}</th>
              <th className="pr-4 pb-3">{t("widgets.alerts.metric")}</th>
              <th className="pr-4 pb-3">{t("widgets.alerts.value")}</th>
              <th className="pr-4 pb-3">{t("widgets.alerts.risk")}</th>
              <th className="pb-3">{t("widgets.alerts.time")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--imp-glass-5)]">
            {alerts.map((alert) => (
              <tr
                key={alert.id}
                className="transition-colors hover:bg-[var(--imp-glass-5)]"
              >
                <td className="py-3 pr-4 text-white">{alert.athleteName}</td>
                <td className="py-3 pr-4 text-neutral-400">{alert.metric}</td>
                <td className="py-3 pr-4 text-[var(--imp-cyan-400)]">
                  {alert.value}
                </td>
                <td className="py-3 pr-4">
                  <RiskBadge level={alert.risk} />
                </td>
                <td className="py-3 text-neutral-500">{alert.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {alerts.length === 0 && (
          <div className="py-8 text-center text-neutral-500">
            {t("widgets.alerts.noAlerts")}
          </div>
        )}
      </div>
    </GlassPanel>
  );
}
