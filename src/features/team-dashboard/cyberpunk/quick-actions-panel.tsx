"use client";

import { GlassPanel, NeonText } from "@/components/impulsion/cyberpunk";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import {
  Calendar,
  FileText,
  MessageSquare,
  PlayCircle,
  Video,
} from "lucide-react";

type QuickAction = {
  id: string;
  icon: LucideIcon;
  label: string;
  description: string;
  color: "lime" | "cyan";
};

const defaultActions: QuickAction[] = [
  {
    id: "session",
    icon: PlayCircle,
    label: "NEW_SESSION",
    description: "Create training session",
    color: "lime",
  },
  {
    id: "video",
    icon: Video,
    label: "VIDEO_REVIEW",
    description: "Analyze technique",
    color: "cyan",
  },
  {
    id: "schedule",
    icon: Calendar,
    label: "SCHEDULE",
    description: "Plan upcoming week",
    color: "cyan",
  },
  {
    id: "notes",
    icon: FileText,
    label: "ADD_NOTES",
    description: "Coach observations",
    color: "lime",
  },
  {
    id: "message",
    icon: MessageSquare,
    label: "MESSAGE",
    description: "Contact athlete",
    color: "cyan",
  },
];

type QuickActionsPanelProps = {
  className?: string;
  actions?: QuickAction[];
  onActionClick?: (actionId: string) => void;
};

/**
 * QuickActionsPanel - Panneau d'actions rapides pour le coach
 */
export function QuickActionsPanel({
  className,
  actions = defaultActions,
  onActionClick,
}: QuickActionsPanelProps) {
  return (
    <GlassPanel className={cn("p-4", className)} glow="lime">
      <NeonText
        as="h3"
        color="lime"
        intensity="subtle"
        className="mb-4 font-mono text-xs tracking-wider uppercase"
      >
        QUICK_ACTIONS
      </NeonText>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => onActionClick?.(action.id)}
              className={cn(
                "group flex flex-col items-center gap-2 rounded border border-neutral-800 p-3 transition-all hover:scale-105",
                action.color === "lime" &&
                  "hover:border-[var(--imp-lime-400)]/50 hover:bg-[var(--imp-lime-400)]/5",
                action.color === "cyan" &&
                  "hover:border-[var(--imp-cyan-400)]/50 hover:bg-[var(--imp-cyan-400)]/5",
              )}
            >
              <Icon
                className={cn(
                  "size-6 transition-colors",
                  action.color === "lime"
                    ? "text-neutral-500 group-hover:text-[var(--imp-lime-400)]"
                    : "text-neutral-500 group-hover:text-[var(--imp-cyan-400)]",
                )}
              />
              <span className="font-mono text-[10px] text-neutral-400 group-hover:text-white">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </GlassPanel>
  );
}
