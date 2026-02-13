"use client";

import { Badge } from "@/components/ui/badge";
import { GlowCard } from "@/components/impulsion/glow-card";
import { CyberButton } from "@/components/impulsion/cyber-button";
import {
  SESSION_TYPE_LABELS,
  type SessionStatus,
  type SessionType,
} from "@/lib/impulsion/types";
import { motion } from "motion/react";
import { Calendar, Clock, Flame, Play } from "lucide-react";
import { format, isToday, isTomorrow } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";

type UpcomingSession = {
  id: string;
  title: string;
  type: SessionType;
  status: SessionStatus;
  scheduledAt: Date;
  durationMinutes: number;
  targetRpe: number | null;
  hasFeedback: boolean;
};

type UpcomingSessionsProps = {
  sessions: UpcomingSession[];
  orgSlug: string;
};

const typeColors: Record<SessionType, string> = {
  COURSE: "bg-green-500/20 text-green-400",
  PPG: "bg-orange-500/20 text-orange-400",
  TECHNIQUE: "bg-blue-500/20 text-blue-400",
  FORCE: "bg-red-500/20 text-red-400",
  RECUPERATION: "bg-purple-500/20 text-purple-400",
  AUTRE: "bg-gray-500/20 text-gray-400",
};

function getDateLabel(date: Date): string {
  if (isToday(date)) return "Aujourd'hui";
  if (isTomorrow(date)) return "Demain";
  return format(date, "EEEE d MMMM", { locale: fr });
}

export function UpcomingSessions({ sessions, orgSlug }: UpcomingSessionsProps) {
  if (sessions.length === 0) {
    return (
      <GlowCard variant="default" glow="none">
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <Calendar className="text-muted-foreground mb-4 size-12" />
          <h3 className="text-lg font-semibold">Aucune séance à venir</h3>
          <p className="text-muted-foreground mt-1">
            Ton coach n'a pas encore planifié de séance pour toi
          </p>
        </div>
      </GlowCard>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Prochaines séances</h2>

      <div className="space-y-3">
        {sessions.map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlowCard
              variant="default"
              glow={isToday(session.scheduledAt) ? "lime" : "none"}
              className="hover:ring-primary/50 transition-all hover:ring-1"
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{session.title}</h3>
                    <Badge className={typeColors[session.type]}>
                      {SESSION_TYPE_LABELS[session.type]}
                    </Badge>
                  </div>

                  <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="size-4" />
                      <span className="capitalize">
                        {getDateLabel(session.scheduledAt)}
                      </span>
                      <span>{format(session.scheduledAt, "HH:mm")}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Clock className="size-4" />
                      <span>{session.durationMinutes} min</span>
                    </div>

                    {session.targetRpe ? (
                      <div className="flex items-center gap-1.5 text-orange-500">
                        <Flame className="size-4" />
                        <span>RPE cible: {session.targetRpe}</span>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="ml-4">
                  {session.hasFeedback ? (
                    <Badge variant="secondary">Feedback envoyé</Badge>
                  ) : (
                    <CyberButton variant="neon" size="sm" asChild>
                      <Link
                        href={`/orgs/${orgSlug}/sessions/${session.id}/feedback`}
                      >
                        <Play className="mr-2 size-4" />
                        Démarrer
                      </Link>
                    </CyberButton>
                  )}
                </div>
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
