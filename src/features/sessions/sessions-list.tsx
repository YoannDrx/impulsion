"use client";

import { CyberButton } from "@/components/impulsion/cyber-button";
import { GlowCard } from "@/components/impulsion/glow-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SESSION_STATUS_LABELS,
  SESSION_TYPE_LABELS,
  SESSION_STATUSES,
  SESSION_TYPES,
  type SessionStatus,
  type SessionType,
} from "@/lib/impulsion/types";
import { AnimatePresence, motion } from "motion/react";
import { Calendar, Filter, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SessionCard } from "./session-card";

type SessionAssignee = {
  id: string;
  name: string;
  image?: string | null;
};

type Session = {
  id: string;
  title: string;
  description?: string | null;
  type: SessionType;
  status: SessionStatus;
  scheduledAt: Date;
  durationMinutes: number;
  targetRpe?: number | null;
  assignees: SessionAssignee[];
  feedbackCount: number;
};

type SessionsListProps = {
  sessions: Session[];
  orgSlug: string;
};

export function SessionsList({ sessions, orgSlug }: SessionsListProps) {
  const [statusFilter, setStatusFilter] = useState<SessionStatus | "ALL">(
    "ALL",
  );
  const [typeFilter, setTypeFilter] = useState<SessionType | "ALL">("ALL");

  const filteredSessions = sessions.filter((session) => {
    if (statusFilter !== "ALL" && session.status !== statusFilter) return false;
    if (typeFilter !== "ALL" && session.type !== typeFilter) return false;
    return true;
  });

  // Group sessions by date
  const groupedSessions = filteredSessions.reduce<Record<string, Session[]>>(
    (acc, session) => {
      const dateKey = new Date(session.scheduledAt).toDateString();
      const existing = acc[dateKey] ?? [];
      return { ...acc, [dateKey]: [...existing, session] };
    },
    {},
  );

  const sortedDates = Object.keys(groupedSessions).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  );

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Filter className="text-muted-foreground size-4" />
          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v as SessionStatus | "ALL")}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Tous les statuts</SelectItem>
              {Object.entries(SESSION_STATUSES).map(([key, value]) => (
                <SelectItem key={key} value={value}>
                  {SESSION_STATUS_LABELS[value as SessionStatus]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={typeFilter}
            onValueChange={(v) => setTypeFilter(v as SessionType | "ALL")}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Tous les types</SelectItem>
              {Object.entries(SESSION_TYPES).map(([key, value]) => (
                <SelectItem key={key} value={value}>
                  {SESSION_TYPE_LABELS[value as SessionType]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <CyberButton variant="neon" asChild>
          <Link href={`/orgs/${orgSlug}/sessions/new`}>
            <Plus className="mr-2 size-4" />
            Nouvelle séance
          </Link>
        </CyberButton>
      </div>

      {/* Sessions list */}
      {filteredSessions.length === 0 ? (
        <GlowCard variant="default" glow="none" className="p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="bg-muted flex size-16 items-center justify-center rounded-full">
              <Calendar className="text-muted-foreground size-8" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Aucune séance</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                {sessions.length === 0
                  ? "Créez votre première séance pour commencer"
                  : "Aucune séance ne correspond aux filtres"}
              </p>
            </div>
            {sessions.length === 0 ? (
              <CyberButton variant="neon" asChild>
                <Link href={`/orgs/${orgSlug}/sessions/new`}>
                  <Plus className="mr-2 size-4" />
                  Créer une séance
                </Link>
              </CyberButton>
            ) : null}
          </div>
        </GlowCard>
      ) : (
        <AnimatePresence mode="popLayout">
          {sortedDates.map((dateKey) => (
            <motion.div
              key={dateKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <h3 className="text-muted-foreground text-sm font-medium">
                {formatDateHeader(new Date(dateKey))}
              </h3>
              <div className="space-y-3">
                {groupedSessions[dateKey].map((session) => (
                  <SessionCard
                    key={session.id}
                    {...session}
                    orgSlug={orgSlug}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}

function formatDateHeader(date: Date): string {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Aujourd'hui";
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return "Demain";
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return "Hier";
  }

  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}
