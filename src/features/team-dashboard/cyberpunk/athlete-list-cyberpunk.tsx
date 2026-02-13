"use client";

import { GlassPanel, NeonText } from "@/components/impulsion/cyberpunk";
import { Sparkline } from "@/components/impulsion/cyberpunk/data/sparkline";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { StatusBadge } from "./status-badges";

type AthleteStatus = "optimal" | "fatigued" | "at-risk" | "injured";

type Athlete = {
  id: string;
  name: string;
  initials: string;
  status: AthleteStatus;
  readiness: number;
  loadHistory: number[];
  lastSession?: string;
};

type AthleteListCyberpunkProps = {
  className?: string;
  athletes?: Athlete[];
  onAthleteSelect?: (athlete: Athlete) => void;
};

const defaultAthletes: Athlete[] = [
  {
    id: "1",
    name: "James Mitchell",
    initials: "JM",
    status: "optimal",
    readiness: 92,
    loadHistory: [65, 72, 68, 75, 70, 78, 82],
    lastSession: "2h ago",
  },
  {
    id: "2",
    name: "Sarah Chen",
    initials: "SC",
    status: "fatigued",
    readiness: 68,
    loadHistory: [80, 85, 88, 90, 85, 82, 78],
    lastSession: "Yesterday",
  },
  {
    id: "3",
    name: "Marcus Williams",
    initials: "MW",
    status: "at-risk",
    readiness: 54,
    loadHistory: [70, 75, 82, 88, 92, 95, 90],
    lastSession: "3h ago",
  },
  {
    id: "4",
    name: "Elena Rodriguez",
    initials: "ER",
    status: "optimal",
    readiness: 88,
    loadHistory: [60, 65, 62, 68, 70, 72, 75],
    lastSession: "1h ago",
  },
  {
    id: "5",
    name: "David Kim",
    initials: "DK",
    status: "injured",
    readiness: 35,
    loadHistory: [40, 35, 30, 25, 20, 15, 10],
    lastSession: "1 week ago",
  },
];

/**
 * AthleteListCyberpunk - Liste des athlètes avec sparklines et statuts
 */
export function AthleteListCyberpunk({
  className,
  athletes = defaultAthletes,
  onAthleteSelect,
}: AthleteListCyberpunkProps) {
  return (
    <GlassPanel className={cn("p-4", className)} glow="none">
      <div className="mb-4 flex items-center justify-between">
        <NeonText
          as="h3"
          color="cyan"
          intensity="subtle"
          className="font-mono text-xs tracking-wider uppercase"
        >
          SQUAD_ROSTER
        </NeonText>
        <span className="font-mono text-xs text-neutral-500">
          {athletes.length} ATHLETES
        </span>
      </div>

      <div className="space-y-2">
        {athletes.map((athlete) => (
          <button
            key={athlete.id}
            onClick={() => onAthleteSelect?.(athlete)}
            className="group flex w-full items-center gap-4 rounded border border-neutral-800 p-3 text-left transition-all hover:border-[var(--imp-cyan-400)]/30 hover:bg-neutral-900/50"
          >
            {/* Avatar */}
            <div
              className={cn(
                "flex size-10 items-center justify-center rounded-full font-mono text-sm font-bold",
                athlete.status === "optimal" &&
                  "bg-[var(--imp-lime-400)]/10 text-[var(--imp-lime-400)]",
                athlete.status === "fatigued" &&
                  "bg-[var(--imp-cyan-400)]/10 text-[var(--imp-cyan-400)]",
                athlete.status === "at-risk" &&
                  "bg-[var(--imp-warning)]/10 text-[var(--imp-warning)]",
                athlete.status === "injured" &&
                  "bg-[var(--imp-danger-neon)]/10 text-[var(--imp-danger-neon)]",
              )}
            >
              {athlete.initials}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-white">
                  {athlete.name}
                </span>
                <StatusBadge status={athlete.status} size="sm" />
              </div>
              <div className="flex items-center gap-3 font-mono text-xs text-neutral-500">
                <span>Readiness: {athlete.readiness}%</span>
                <span className="text-neutral-700">|</span>
                <span>{athlete.lastSession}</span>
              </div>
            </div>

            {/* Load sparkline */}
            <div className="w-24">
              <Sparkline
                data={athlete.loadHistory}
                height={30}
                color={athlete.status === "optimal" ? "lime" : "cyan"}
              />
            </div>

            {/* Arrow */}
            <ChevronRight className="size-4 text-neutral-600 transition-transform group-hover:translate-x-1 group-hover:text-neutral-400" />
          </button>
        ))}
      </div>
    </GlassPanel>
  );
}
