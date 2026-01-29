"use client";

import { GlassPanel, NeonText } from "@/components/impulsion/cyberpunk";
import { BodyMap } from "@/components/impulsion/cyberpunk/svg/body-map";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";

type BodyZone =
  | "head"
  | "neck"
  | "left-shoulder"
  | "right-shoulder"
  | "chest"
  | "left-arm"
  | "right-arm"
  | "core"
  | "left-hip"
  | "right-hip"
  | "left-thigh"
  | "right-thigh"
  | "left-knee"
  | "right-knee"
  | "left-calf"
  | "right-calf"
  | "left-foot"
  | "right-foot";

type ZoneStatus = "optimal" | "fatigued" | "at-risk" | "injured";

type ZoneData = {
  status: ZoneStatus;
  value: number;
  label: string;
};

type BodyMapViewProps = {
  className?: string;
  zonesData?: Partial<Record<BodyZone, ZoneData>>;
  onZoneSelect?: (zone: BodyZone) => void;
};

const defaultZonesData: Partial<Record<BodyZone, ZoneData>> = {
  "left-shoulder": { status: "optimal", value: 95, label: "Optimal" },
  "right-shoulder": { status: "optimal", value: 92, label: "Optimal" },
  "left-knee": { status: "fatigued", value: 72, label: "Fatigue detected" },
  "right-knee": { status: "optimal", value: 88, label: "Good" },
  "left-calf": { status: "optimal", value: 88, label: "Good" },
  "right-calf": { status: "at-risk", value: 58, label: "Monitor closely" },
  "left-foot": { status: "injured", value: 45, label: "Recovery needed" },
};

// Convert ZoneData map to simple ZoneStatus map for BodyMap
const convertToZonesMap = (
  zonesData: Partial<Record<BodyZone, ZoneData>>,
): Partial<Record<BodyZone, ZoneStatus>> => {
  return Object.fromEntries(
    Object.entries(zonesData).map(([zone, data]) => [zone, data.status]),
  ) as Partial<Record<BodyZone, ZoneStatus>>;
};

/**
 * BodyMapView - Vue du body map avec détails par zone
 */
export function BodyMapView({
  className,
  zonesData = defaultZonesData,
  onZoneSelect,
}: BodyMapViewProps) {
  const t = useTranslations("bioProfile");
  const [selectedZone, setSelectedZone] = useState<BodyZone | null>(null);

  const handleZoneClick = (zone: BodyZone) => {
    setSelectedZone(zone);
    onZoneSelect?.(zone);
  };

  const selectedZoneData = selectedZone ? zonesData[selectedZone] : null;

  const getStatusLabel = (status: ZoneStatus) => {
    const labels: Record<ZoneStatus, string> = {
      optimal: "OPTIMAL",
      fatigued: "FATIGUED",
      "at-risk": "AT RISK",
      injured: "INJURED",
    };
    return labels[status];
  };

  return (
    <div className={cn("grid gap-6 lg:grid-cols-2", className)}>
      {/* Body Map */}
      <GlassPanel className="flex items-center justify-center p-8" glow="cyan">
        <BodyMap
          size="lg"
          zones={convertToZonesMap(zonesData)}
          onZoneClick={handleZoneClick}
          selectedZone={selectedZone}
          interactive
        />
      </GlassPanel>

      {/* Zone Details */}
      <GlassPanel className="p-6" glow="none">
        <NeonText
          as="h3"
          color="cyan"
          intensity="subtle"
          className="mb-4 font-mono text-sm tracking-wider uppercase"
        >
          {t("bodyMap.details")}
        </NeonText>

        {selectedZone && selectedZoneData ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--imp-glass-10)] pb-4">
              <span className="font-mono text-lg font-bold tracking-wider text-white uppercase">
                {selectedZone.replace(/-/g, " ")}
              </span>
              <span
                className={cn(
                  "rounded px-2 py-1 font-mono text-xs",
                  selectedZoneData.status === "optimal" &&
                    "bg-[var(--imp-lime-400)]/10 text-[var(--imp-lime-400)]",
                  selectedZoneData.status === "fatigued" &&
                    "bg-[var(--imp-cyan-400)]/10 text-[var(--imp-cyan-400)]",
                  selectedZoneData.status === "at-risk" &&
                    "bg-[var(--imp-warning)]/10 text-[var(--imp-warning)]",
                  selectedZoneData.status === "injured" &&
                    "bg-[var(--imp-danger-neon)]/10 text-[var(--imp-danger-neon)]",
                )}
              >
                {getStatusLabel(selectedZoneData.status)}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-neutral-500">
                  {t("bodyMap.readiness")}
                </span>
                <span
                  className={cn(
                    "font-mono font-bold",
                    selectedZoneData.value >= 80 &&
                      "text-[var(--imp-lime-400)]",
                    selectedZoneData.value >= 50 &&
                      selectedZoneData.value < 80 &&
                      "text-[var(--imp-warning)]",
                    selectedZoneData.value < 50 &&
                      "text-[var(--imp-danger-neon)]",
                  )}
                >
                  {selectedZoneData.value}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-neutral-800">
                <div
                  className={cn(
                    "h-full transition-all duration-500",
                    selectedZoneData.status === "optimal" &&
                      "bg-[var(--imp-lime-400)]",
                    selectedZoneData.status === "fatigued" &&
                      "bg-[var(--imp-cyan-400)]",
                    selectedZoneData.status === "at-risk" &&
                      "bg-[var(--imp-warning)]",
                    selectedZoneData.status === "injured" &&
                      "bg-[var(--imp-danger-neon)]",
                  )}
                  style={{ width: `${selectedZoneData.value}%` }}
                />
              </div>

              <p className="text-sm text-neutral-400">
                {selectedZoneData.label}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex h-40 items-center justify-center text-neutral-500">
            <p className="text-center text-sm">{t("bodyMap.selectZone")}</p>
          </div>
        )}
      </GlassPanel>
    </div>
  );
}
