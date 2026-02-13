import {
  PhysicsTelemetry,
  PlaybackControls,
  TimelineWaveform,
  ToolPalette,
  VideoStage,
} from "@/features/video/cyberpunk";
import {
  HudNavbar,
  NeonText,
  NoiseTexture,
  ScanlinesOverlay,
} from "@/components/impulsion/cyberpunk";
import Link from "next/link";

export default function BiomechanicsLabPage() {
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
          href="/vault"
          className="px-3 py-1 font-mono text-xs tracking-wider text-neutral-400 transition-colors hover:text-white"
        >
          VAULT
        </Link>
        <span className="px-3 py-1 font-mono text-xs tracking-wider text-[var(--imp-cyan-400)]">
          BIOMECHANICS_LAB
        </span>
      </HudNavbar>

      {/* Main content */}
      <main className="flex h-[calc(100vh-56px)] pt-14">
        {/* Left sidebar - Tool palette */}
        <aside className="flex-shrink-0 p-2">
          <ToolPalette />
        </aside>

        {/* Center - Video and timeline */}
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <NeonText
                as="h1"
                color="cyan"
                intensity="normal"
                className="text-xl font-bold tracking-wider uppercase"
              >
                BIOMECHANICS_LAB // ANALYSIS
              </NeonText>
              <p className="font-mono text-xs text-neutral-500">
                SESSION: 2024-01-15_SPRINT_ANALYSIS_001
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-[var(--imp-lime-400)]/10 px-2 py-1 font-mono text-xs text-[var(--imp-lime-400)]">
                ATHLETE: J.MITCHELL
              </span>
              <span className="rounded bg-neutral-800 px-2 py-1 font-mono text-xs text-neutral-400">
                DURATION: 00:02:34
              </span>
            </div>
          </div>

          {/* Video stage */}
          <VideoStage className="flex-1" showGrid showVectors />

          {/* Timeline */}
          <TimelineWaveform />

          {/* Playback controls */}
          <PlaybackControls />
        </div>

        {/* Right sidebar - Telemetry */}
        <aside className="w-72 flex-shrink-0 p-4">
          <PhysicsTelemetry />
        </aside>
      </main>
    </div>
  );
}
