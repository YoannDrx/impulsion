import {
  LoadMetricsProjection,
  ModulesSidebar,
  PlanningGrid,
} from "@/features/planner/cyberpunk";
import {
  HudNavbar,
  NeonText,
  NoiseTexture,
  ScanlinesOverlay,
} from "@/components/impulsion/cyberpunk";
import Link from "next/link";

export default function BlueprintPage() {
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
        <span className="px-3 py-1 font-mono text-xs tracking-wider text-[var(--imp-lime-400)]">
          BLUEPRINT
        </span>
        <Link
          href="/session-architect"
          className="px-3 py-1 font-mono text-xs tracking-wider text-neutral-400 transition-colors hover:text-white"
        >
          SESSION_ARCHITECT
        </Link>
      </HudNavbar>

      {/* Main content */}
      <main className="flex h-[calc(100vh-56px)] pt-14">
        {/* Left sidebar - Modules */}
        <aside className="w-64 flex-shrink-0 border-r border-neutral-800 p-4">
          <ModulesSidebar className="h-full" />
        </aside>

        {/* Center - Planning grid */}
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
                THE_BLUEPRINT // PLANNER
              </NeonText>
              <p className="font-mono text-xs text-neutral-500">
                ATHLETE: J.MITCHELL • MESOCYCLE: WEEK 3/4
              </p>
            </div>
          </div>

          {/* Planning grid */}
          <PlanningGrid className="flex-1" />
        </div>

        {/* Right sidebar - Load projection */}
        <aside className="w-72 flex-shrink-0 border-l border-neutral-800 p-4">
          <LoadMetricsProjection />
        </aside>
      </main>
    </div>
  );
}
