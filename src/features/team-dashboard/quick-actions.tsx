"use client";

import { CyberButton } from "@/components/impulsion/cyber-button";
import { motion } from "motion/react";
import { Calendar, UserPlus, Video, ClipboardList } from "lucide-react";
import Link from "next/link";

type QuickActionsProps = {
  orgSlug: string;
  onInviteClick?: () => void;
};

const actions = [
  {
    key: "session",
    label: "Nouvelle séance",
    icon: Calendar,
    href: (orgSlug: string) => `/orgs/${orgSlug}/sessions/new`,
    variant: "neon" as const,
  },
  {
    key: "video",
    label: "Analyser vidéo",
    icon: Video,
    href: (orgSlug: string) => `/orgs/${orgSlug}/videos/new`,
    variant: "neon-cyan" as const,
  },
  {
    key: "template",
    label: "Mes templates",
    icon: ClipboardList,
    href: (orgSlug: string) => `/orgs/${orgSlug}/templates`,
    variant: "outline" as const,
  },
];

export function QuickActions({ orgSlug, onInviteClick }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {onInviteClick ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0 }}
        >
          <CyberButton variant="default" onClick={onInviteClick}>
            <UserPlus className="mr-2 size-4" />
            Inviter un athlète
          </CyberButton>
        </motion.div>
      ) : null}

      {actions.map((action, index) => (
        <motion.div
          key={action.key}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: (index + 1) * 0.05 }}
        >
          <Link href={action.href(orgSlug)}>
            <CyberButton variant={action.variant}>
              <action.icon className="mr-2 size-4" />
              {action.label}
            </CyberButton>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
