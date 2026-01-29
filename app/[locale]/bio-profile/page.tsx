import {
  BiometricWidgets,
  BodyMapView,
  TrainingLoadChart,
} from "@/features/athlete-profile/cyberpunk";
import {
  GlassPanel,
  HudNavbar,
  NeonText,
  NoiseTexture,
  ScanlinesOverlay,
} from "@/components/impulsion/cyberpunk";
import { NeonText as NeonLink } from "@/components/impulsion/cyberpunk";
import Link from "next/link";

export default function BioProfilePage() {
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
            <NeonLink as="span" color="lime" intensity="normal">
              IMPULSION
            </NeonLink>
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
          href="/squad-telemetry"
          className="px-3 py-1 font-mono text-xs tracking-wider text-neutral-400 transition-colors hover:text-white"
        >
          SQUAD
        </Link>
        <span className="px-3 py-1 font-mono text-xs tracking-wider text-[var(--imp-cyan-400)]">
          BIO_PROFILE
        </span>
      </HudNavbar>

      {/* Main content */}
      <main className="mx-auto max-w-screen-xl px-4 pt-24 pb-12">
        {/* Page header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <NeonText
              as="h1"
              color="cyan"
              intensity="normal"
              className="mb-2 text-3xl font-bold tracking-wider uppercase"
            >
              BIO_PROFILE // DEEP_DIVE
            </NeonText>
            <p className="text-neutral-400">
              Complete biometric analysis and readiness overview
            </p>
          </div>

          {/* Athlete info badge */}
          <GlassPanel className="px-4 py-2" glow="lime">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-[var(--imp-lime-400)]/20 font-mono text-lg font-bold text-[var(--imp-lime-400)]">
                JM
              </div>
              <div>
                <p className="font-mono text-sm font-bold text-white">
                  JAMES MITCHELL
                </p>
                <p className="font-mono text-xs text-neutral-400">
                  ID: ATH-2024-0047
                </p>
              </div>
            </div>
          </GlassPanel>
        </div>

        {/* Biometric widgets row */}
        <BiometricWidgets
          className="mb-8"
          readiness={87}
          sleep={7.2}
          hrv={58}
          strain={14.2}
        />

        {/* Body Map + Training Load grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <BodyMapView />
          <TrainingLoadChart />
        </div>
      </main>
    </div>
  );
}
