"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GlowCard } from "@/components/impulsion/glow-card";
import {
  SESSION_STATUS_LABELS,
  SESSION_TYPE_LABELS,
  type SessionStatus,
  type SessionType,
} from "@/lib/impulsion/types";
import { motion } from "motion/react";
import {
  Calendar,
  Clock,
  Flame,
  MoreHorizontal,
  Users,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

type SessionAssignee = {
  id: string;
  name: string;
  image?: string | null;
};

type SessionCardProps = {
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
  orgSlug: string;
};

const statusConfig: Record<
  SessionStatus,
  { icon: typeof CheckCircle2; color: string; glow: "lime" | "cyan" | "none" }
> = {
  PLANIFIEE: { icon: Calendar, color: "text-muted-foreground", glow: "none" },
  FAITE: { icon: CheckCircle2, color: "text-green-500", glow: "lime" },
  PARTIELLE: { icon: AlertCircle, color: "text-yellow-500", glow: "none" },
  MANQUEE: { icon: XCircle, color: "text-red-500", glow: "none" },
};

export function SessionCard({
  id,
  title,
  description,
  type,
  status,
  scheduledAt,
  durationMinutes,
  targetRpe,
  assignees,
  feedbackCount,
  orgSlug,
}: SessionCardProps) {
  const StatusIcon = statusConfig[status].icon;
  const isPast = new Date(scheduledAt) < new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/orgs/${orgSlug}/sessions/${id}`}>
        <GlowCard
          variant="default"
          glow={statusConfig[status].glow}
          className="hover:ring-primary/50 cursor-pointer transition-all hover:ring-1"
        >
          <div className="p-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {SESSION_TYPE_LABELS[type]}
                  </Badge>
                </div>
                {description ? (
                  <p className="text-muted-foreground mt-1 line-clamp-1 text-sm">
                    {description}
                  </p>
                ) : null}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={(e) => e.preventDefault()}
                  >
                    <MoreHorizontal className="size-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/orgs/${orgSlug}/sessions/${id}`}>
                      Voir les détails
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/orgs/${orgSlug}/sessions/${id}/edit`}>
                      Modifier
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Meta info */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <Calendar className="text-muted-foreground size-4" />
                <span>{format(scheduledAt, "EEE d MMM", { locale: fr })}</span>
                <span className="text-muted-foreground">
                  {format(scheduledAt, "HH:mm")}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Clock className="text-muted-foreground size-4" />
                <span>{durationMinutes} min</span>
              </div>

              {targetRpe ? (
                <div className="flex items-center gap-1.5">
                  <Flame className="size-4 text-orange-500" />
                  <span>RPE {targetRpe}</span>
                </div>
              ) : null}
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between">
              {/* Assignees */}
              <div className="flex items-center gap-2">
                <Users className="text-muted-foreground size-4" />
                <div className="flex -space-x-2">
                  {assignees.slice(0, 4).map((assignee) => (
                    <Avatar
                      key={assignee.id}
                      className="border-background size-6 border-2"
                    >
                      {assignee.image ? (
                        <AvatarImage src={assignee.image} alt={assignee.name} />
                      ) : null}
                      <AvatarFallback className="text-xs">
                        {assignee.name.slice(0, 1).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {assignees.length > 4 ? (
                    <div className="border-background bg-muted flex size-6 items-center justify-center rounded-full border-2 text-xs">
                      +{assignees.length - 4}
                    </div>
                  ) : null}
                </div>
                <span className="text-muted-foreground text-xs">
                  {assignees.length} athlète{assignees.length > 1 ? "s" : ""}
                </span>
              </div>

              {/* Status */}
              <div
                className={`flex items-center gap-1.5 ${statusConfig[status].color}`}
              >
                <StatusIcon className="size-4" />
                <span className="text-sm">{SESSION_STATUS_LABELS[status]}</span>
                {isPast && feedbackCount > 0 ? (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {feedbackCount}/{assignees.length} feedbacks
                  </Badge>
                ) : null}
              </div>
            </div>
          </div>
        </GlowCard>
      </Link>
    </motion.div>
  );
}
