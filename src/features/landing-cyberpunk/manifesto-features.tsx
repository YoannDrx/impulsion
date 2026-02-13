"use client";

import {
  GlassPanel,
  HudBorder,
  NeonText,
} from "@/components/impulsion/cyberpunk";
import { cn } from "@/lib/utils";
import { Activity, BarChart3, Calendar, Play, Users, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

const featureIcons = {
  dataCore: BarChart3,
  videoLab: Play,
  missionControl: Activity,
  neuralPlanner: Calendar,
};

/**
 * Manifesto Features - Section modules système en bento grid
 */
export function ManifestoFeatures() {
  const t = useTranslations("manifesto");

  const features = [
    {
      key: "dataCore",
      color: "cyan" as const,
      size: "large" as const,
    },
    {
      key: "videoLab",
      color: "lime" as const,
      size: "normal" as const,
    },
    {
      key: "missionControl",
      color: "lime" as const,
      size: "normal" as const,
    },
    {
      key: "neuralPlanner",
      color: "cyan" as const,
      size: "large" as const,
    },
  ];

  return (
    <section id="features" className="relative bg-[var(--imp-void)] py-24">
      <div className="mx-auto max-w-screen-xl px-4">
        {/* Section header */}
        <div className="mb-16 text-center">
          <NeonText
            as="h2"
            color="lime"
            intensity="normal"
            className="mb-4 text-3xl font-bold tracking-wider uppercase md:text-4xl"
          >
            {t("features.title")}
          </NeonText>
          <p className="mx-auto max-w-xl text-neutral-400">
            {t("features.subtitle")}
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = featureIcons[feature.key as keyof typeof featureIcons];
            const isLarge = feature.size === "large";

            return (
              <HudBorder
                key={feature.key}
                color={feature.color}
                cornerSize="md"
                className={cn(
                  "group transition-all duration-300 hover:scale-[1.02]",
                  isLarge && "lg:col-span-2",
                )}
              >
                <GlassPanel className="h-full p-6" glow={feature.color}>
                  <div className="flex h-full flex-col">
                    {/* Icon + Title */}
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className={cn(
                          "flex size-10 items-center justify-center rounded-lg",
                          feature.color === "lime"
                            ? "bg-[var(--imp-lime-400)]/10 text-[var(--imp-lime-400)]"
                            : "bg-[var(--imp-cyan-400)]/10 text-[var(--imp-cyan-400)]",
                        )}
                      >
                        <Icon className="size-5" />
                      </div>
                      <h3
                        className={cn(
                          "font-mono text-lg font-bold tracking-wider uppercase",
                          feature.color === "lime"
                            ? "text-[var(--imp-lime-400)]"
                            : "text-[var(--imp-cyan-400)]",
                        )}
                      >
                        {t(`features.${feature.key}.title`)}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="mb-4 flex-grow text-sm text-neutral-400">
                      {t(`features.${feature.key}.description`)}
                    </p>

                    {/* Feature tags */}
                    <div className="flex flex-wrap gap-2">
                      {(t.raw(`features.${feature.key}.tags`) as string[]).map(
                        (tag: string) => (
                          <span
                            key={tag}
                            className={cn(
                              "rounded border px-2 py-0.5 font-mono text-xs",
                              feature.color === "lime"
                                ? "border-[var(--imp-lime-400)]/30 text-[var(--imp-lime-400)]/70"
                                : "border-[var(--imp-cyan-400)]/30 text-[var(--imp-cyan-400)]/70",
                            )}
                          >
                            {tag}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </GlassPanel>
              </HudBorder>
            );
          })}
        </div>

        {/* Additional features grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { icon: Activity, label: "Real-time Sync" },
            { icon: Zap, label: "Load Monitoring" },
            { icon: Users, label: "Team Management" },
            { icon: Calendar, label: "Smart Calendar" },
          ].map((item, i) => (
            <GlassPanel
              key={i}
              className="flex items-center gap-3 p-4"
              blur="light"
            >
              <item.icon className="size-5 text-[var(--imp-lime-400)]" />
              <span className="text-sm text-neutral-300">{item.label}</span>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
