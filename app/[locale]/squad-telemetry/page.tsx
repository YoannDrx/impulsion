import {
  AthleteListCyberpunk,
  MetricsOverviewStrip,
  QuickActionsPanel,
} from "@/features/team-dashboard/cyberpunk";
import {
  HudNavbar,
  NeonText,
  NoiseTexture,
  ScanlinesOverlay,
} from "@/components/impulsion/cyberpunk";
import Link from "next/link";

export default function SquadTelemetryPage() {
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
        <span className="px-3 py-1 font-mono text-xs tracking-wider text-[var(--imp-cyan-400)]">
          SQUAD_TELEMETRY
        </span>
        <Link
          href="/bio-profile"
          className="px-3 py-1 font-mono text-xs tracking-wider text-neutral-400 transition-colors hover:text-white"
        >
          BIO_PROFILE
        </Link>
      </HudNavbar>

      {/* Main content */}
      <main className="mx-auto max-w-screen-xl px-4 pt-20 pb-12">
        {/* Header */}
        <div className="mb-6">
          <NeonText
            as="h1"
            color="cyan"
            intensity="normal"
            className="mb-2 text-3xl font-bold tracking-wider uppercase"
          >
            SQUAD_TELEMETRY // ROSTER
          </NeonText>
          <p className="text-neutral-400">
            Real-time athlete status monitoring and team management
          </p>
        </div>

        {/* Metrics strip */}
        <MetricsOverviewStrip className="mb-6" />

        {/* Quick actions */}
        <QuickActionsPanel className="mb-6" />

        {/* Athlete list */}
        <AthleteListCyberpunk />
      </main>
    </div>
  );
}
