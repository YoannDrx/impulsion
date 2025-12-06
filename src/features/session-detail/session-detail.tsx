"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GlowCard } from "@/components/impulsion/glow-card";
import { CyberButton } from "@/components/impulsion/cyber-button";
import { FeedbackCard } from "@/features/feedback/feedback-card";
import {
  SESSION_STATUS_LABELS,
  SESSION_TYPE_LABELS,
  type SessionStatus,
  type SessionType,
} from "@/lib/impulsion/types";
import { motion } from "motion/react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Edit,
  Flame,
  MessageSquare,
  Users,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";

type SessionAssignee = {
  id: string;
  name: string;
  image: string | null;
  status: SessionStatus;
  hasFeedback: boolean;
};

type SessionFeedback = {
  id: string;
  athleteId: string;
  athleteName: string;
  athleteImage: string | null;
  rpe: number;
  actualDuration: number | null;
  sensation: string | null;
  mood: string | null;
  comment: string | null;
  createdAt: Date;
};

export type SessionDetailData = {
  id: string;
  title: string;
  description: string | null;
  type: SessionType;
  status: SessionStatus;
  scheduledAt: Date;
  durationMinutes: number;
  targetRpe: number | null;
  assignees: SessionAssignee[];
  feedbacks: SessionFeedback[];
};

type SessionDetailProps = {
  session: SessionDetailData;
  orgSlug: string;
  isCoach: boolean;
};

const statusConfig: Record<SessionStatus, { color: string }> = {
  PLANIFIEE: { color: "bg-blue-500/20 text-blue-400" },
  FAITE: { color: "bg-green-500/20 text-green-400" },
  PARTIELLE: { color: "bg-yellow-500/20 text-yellow-400" },
  MANQUEE: { color: "bg-red-500/20 text-red-400" },
};

export function SessionDetail({
  session,
  orgSlug,
  isCoach,
}: SessionDetailProps) {
  const completedCount = session.assignees.filter(
    (a) => a.status === "FAITE",
  ).length;
  const feedbackCount = session.feedbacks.length;

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <GlowCard variant="elevated" glow="lime">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold">{session.title}</h1>
                  <Badge className={statusConfig[session.status].color}>
                    {SESSION_STATUS_LABELS[session.status]}
                  </Badge>
                </div>
                {session.description ? (
                  <p className="text-muted-foreground mt-2">
                    {session.description}
                  </p>
                ) : null}
              </div>

              {isCoach ? (
                <CyberButton variant="outline" size="sm" asChild>
                  <Link href={`/orgs/${orgSlug}/sessions/${session.id}/edit`}>
                    <Edit className="mr-2 size-4" />
                    Modifier
                  </Link>
                </CyberButton>
              ) : null}
            </div>

            {/* Meta info */}
            <div className="mt-6 flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Calendar className="text-muted-foreground size-5" />
                <div>
                  <p className="text-sm font-medium">
                    {format(session.scheduledAt, "EEEE d MMMM yyyy", {
                      locale: fr,
                    })}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {format(session.scheduledAt, "HH:mm")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="text-muted-foreground size-5" />
                <div>
                  <p className="text-sm font-medium">
                    {session.durationMinutes} min
                  </p>
                  <p className="text-muted-foreground text-sm">Durée prévue</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {SESSION_TYPE_LABELS[session.type]}
                </Badge>
              </div>

              {session.targetRpe ? (
                <div className="flex items-center gap-2 text-orange-500">
                  <Flame className="size-5" />
                  <div>
                    <p className="text-sm font-medium">
                      RPE {session.targetRpe}
                    </p>
                    <p className="text-muted-foreground text-sm">Cible</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </GlowCard>
      </motion.div>

      {/* Assignees */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlowCard variant="default" glow="none">
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="text-muted-foreground size-5" />
                <h2 className="text-lg font-semibold">
                  Athlètes ({session.assignees.length})
                </h2>
              </div>
              <div className="text-muted-foreground text-sm">
                {completedCount}/{session.assignees.length} terminé
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {session.assignees.map((assignee) => (
                <div
                  key={assignee.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10">
                      {assignee.image ? (
                        <AvatarImage src={assignee.image} alt={assignee.name} />
                      ) : null}
                      <AvatarFallback>
                        {assignee.name.slice(0, 1).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{assignee.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {SESSION_STATUS_LABELS[assignee.status]}
                      </p>
                    </div>
                  </div>
                  {assignee.hasFeedback ? (
                    <CheckCircle2 className="size-5 text-green-500" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </GlowCard>
      </motion.div>

      {/* Feedbacks */}
      {session.feedbacks.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-4 flex items-center gap-2">
            <MessageSquare className="text-muted-foreground size-5" />
            <h2 className="text-lg font-semibold">
              Feedbacks ({feedbackCount})
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {session.feedbacks.map((feedback) => (
              <FeedbackCard
                key={feedback.id}
                id={feedback.id}
                athleteName={feedback.athleteName}
                athleteImage={feedback.athleteImage}
                rpe={feedback.rpe}
                actualDuration={feedback.actualDuration}
                sensation={feedback.sensation}
                mood={feedback.mood}
                comment={feedback.comment}
                createdAt={feedback.createdAt}
              />
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlowCard variant="default" glow="none">
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <MessageSquare className="text-muted-foreground mb-4 size-12" />
              <h3 className="text-lg font-semibold">Aucun feedback</h3>
              <p className="text-muted-foreground mt-1">
                Les athlètes n'ont pas encore envoyé leur feedback
              </p>
            </div>
          </GlowCard>
        </motion.div>
      )}
    </div>
  );
}
