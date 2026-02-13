"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GlowCard } from "@/components/impulsion/glow-card";
import { CyberButton } from "@/components/impulsion/cyber-button";
import { motion } from "motion/react";
import { ClipboardList, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { PendingFeedbackSession } from "@/query/team/get-team-dashboard.query";
import { SESSION_TYPE_LABELS } from "@/lib/impulsion/types";

type PendingFeedbackListProps = {
  sessions: PendingFeedbackSession[];
  orgSlug: string;
};

export function PendingFeedbackList({
  sessions,
  orgSlug,
}: PendingFeedbackListProps) {
  if (sessions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <ClipboardList className="text-secondary size-5" />
          Feedbacks en attente
        </h2>
        <Badge variant="secondary">{sessions.length}</Badge>
      </div>

      <div className="space-y-3">
        {sessions.slice(0, 5).map((session, index) => (
          <motion.div
            key={`${session.sessionId}-${session.athleteId}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <GlowCard
              variant="default"
              glow="cyan"
              className="hover:ring-secondary/50 transition-all hover:ring-1"
            >
              <Link
                href={`/orgs/${orgSlug}/sessions/${session.sessionId}`}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="size-8">
                    {session.athleteImage ? (
                      <AvatarImage
                        src={session.athleteImage}
                        alt={session.athleteName}
                      />
                    ) : null}
                    <AvatarFallback className="text-xs">
                      {session.athleteName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      {session.sessionTitle}
                    </p>
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <span>{session.athleteName}</span>
                      <span>•</span>
                      <span>
                        {session.sessionType in SESSION_TYPE_LABELS
                          ? SESSION_TYPE_LABELS[
                              session.sessionType as keyof typeof SESSION_TYPE_LABELS
                            ]
                          : session.sessionType}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="gap-1">
                    <Clock className="size-3" />
                    {formatRelativeDate(new Date(session.scheduledAt))}
                  </Badge>
                  <ChevronRight className="text-muted-foreground size-4" />
                </div>
              </Link>
            </GlowCard>
          </motion.div>
        ))}
      </div>

      {sessions.length > 5 ? (
        <div className="text-center">
          <CyberButton variant="ghost" size="sm" asChild>
            <Link href={`/orgs/${orgSlug}/sessions?filter=pending`}>
              Voir tous les feedbacks en attente ({sessions.length})
            </Link>
          </CyberButton>
        </div>
      ) : null}
    </div>
  );
}

function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffInDays === 0) return "Aujourd'hui";
  if (diffInDays === 1) return "Hier";
  if (diffInDays < 7) return `Il y a ${diffInDays} j`;
  if (diffInDays < 30) return `Il y a ${Math.floor(diffInDays / 7)} sem.`;
  return `Il y a ${Math.floor(diffInDays / 30)} mois`;
}
