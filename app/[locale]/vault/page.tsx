import {
  CategoryFilters,
  VideoGridCyberpunk,
} from "@/features/video/cyberpunk";
import {
  GlassPanel,
  HudNavbar,
  NeonText,
  NoiseTexture,
  ScanlinesOverlay,
} from "@/components/impulsion/cyberpunk";
import { TerminalInput } from "@/components/impulsion/cyberpunk/form/terminal-input";
import { CyberButton } from "@/components/impulsion/cyberpunk/form/cyber-button";
import Link from "next/link";
import { Upload } from "lucide-react";

export default function VaultPage() {
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
          THE_VAULT
        </span>
        <Link
          href="/biomechanics-lab"
          className="px-3 py-1 font-mono text-xs tracking-wider text-neutral-400 transition-colors hover:text-white"
        >
          BIOMECHANICS_LAB
        </Link>
      </HudNavbar>

      {/* Main content */}
      <main className="mx-auto max-w-screen-xl px-4 pt-20 pb-12">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <NeonText
              as="h1"
              color="cyan"
              intensity="normal"
              className="mb-2 text-3xl font-bold tracking-wider uppercase"
            >
              THE_VAULT // VIDEO_SELECT
            </NeonText>
            <p className="text-neutral-400">
              Video library and analysis archive
            </p>
          </div>
          <CyberButton variant="lime" size="sm">
            <Upload className="mr-2 size-4" />
            UPLOAD_VIDEO
          </CyberButton>
        </div>

        {/* Search and filters */}
        <div className="mb-6 grid gap-4 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <TerminalInput placeholder="Search videos..." />
          </div>
          <GlassPanel
            className="flex items-center justify-between px-4 py-2"
            glow="none"
          >
            <span className="font-mono text-xs text-neutral-500">TOTAL</span>
            <span className="font-mono text-lg font-bold text-[var(--imp-cyan-400)]">
              47 VIDEOS
            </span>
          </GlassPanel>
        </div>

        {/* Category filters */}
        <CategoryFilters className="mb-6" />

        {/* Video grid */}
        <VideoGridCyberpunk />
      </main>
    </div>
  );
}
