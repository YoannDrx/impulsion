import {
  ExerciseLibrary,
  NeuralLoadCounter,
  TimelineBuilder,
} from "@/features/sessions/cyberpunk";
import {
  GlassPanel,
  HudNavbar,
  NeonText,
  NoiseTexture,
  ScanlinesOverlay,
} from "@/components/impulsion/cyberpunk";
import { CyberButton } from "@/components/impulsion/cyberpunk/form/cyber-button";
import Link from "next/link";
import { Save } from "lucide-react";

export default function SessionArchitectPage() {
  return (
    <div className="relative min-h-screen bg-[var(--imp-void)]">
      {/* Background effects */}
      <NoiseTexture opacity={0.03} />
      <ScanlinesOverlay intensity="subtle" />

      {/* Navigation */}
      <HudNavbar
        status="online"
        logo={
          <Link href="/manifesto" className="font-mono text-lg font-bold">
            <NeonText as="span" color="lime" intensity="normal">
              IMPULSION
            </NeonText>
          </Link>
        }
      >
        <Link
          href="/mission-control"
          className="px-3 py-1 font-mono text-xs tracking-wider text-neutral-400 transition-colors hover:text-white"
        >
          MISSION_CONTROL
        </Link>
        <Link
          href="/blueprint"
          className="px-3 py-1 font-mono text-xs tracking-wider text-neutral-400 transition-colors hover:text-white"
        >
          BLUEPRINT
        </Link>
        <span className="px-3 py-1 font-mono text-xs tracking-wider text-[var(--imp-lime-400)]">
          SESSION_ARCHITECT
        </span>
      </HudNavbar>

      {/* Main content */}
      <main className="flex h-[calc(100vh-56px)] pt-14">
        {/* Left sidebar - Exercise library */}
        <aside className="w-80 flex-shrink-0 border-r border-neutral-800 p-4">
          <ExerciseLibrary className="h-full" />
        </aside>

        {/* Center - Timeline builder */}
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <NeonText
                as="h1"
                color="lime"
                intensity="normal"
                className="text-xl font-bold tracking-wider uppercase"
              >
                SESSION_ARCHITECT // MICRO_CYCLE
              </NeonText>
              <p className="font-mono text-xs text-neutral-500">
                BUILD SESSION: 2024-01-16_SPRINT_POWER
              </p>
            </div>
            <div className="flex items-center gap-2">
              <GlassPanel className="px-3 py-1" glow="none">
                <span className="font-mono text-xs text-neutral-400">
                  ATHLETE: J.MITCHELL
                </span>
              </GlassPanel>
              <CyberButton variant="lime" size="sm">
                <Save className="mr-2 size-4" />
                SAVE_SESSION
              </CyberButton>
            </div>
          </div>

          {/* Timeline builder */}
          <TimelineBuilder className="flex-1" />

          {/* Session summary */}
          <GlassPanel className="p-4" glow="none">
            <div className="flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-6">
                <span className="text-neutral-500">
                  BLOCKS: <span className="text-white">4</span>
                </span>
                <span className="text-neutral-500">
                  TOTAL_TIME:{" "}
                  <span className="text-[var(--imp-cyan-400)]">55min</span>
                </span>
                <span className="text-neutral-500">
                  INTENSITY:{" "}
                  <span className="text-[var(--imp-lime-400)]">HIGH</span>
                </span>
              </div>
              <span className="text-neutral-600">
                LAST_SAVED: 2024-01-15 14:32:00
              </span>
            </div>
          </GlassPanel>
        </div>

        {/* Right sidebar - Neural load */}
        <aside className="w-64 flex-shrink-0 border-l border-neutral-800 p-4">
          <NeuralLoadCounter currentLoad={72} targetLoad={75} />
        </aside>
      </main>
    </div>
  );
}
