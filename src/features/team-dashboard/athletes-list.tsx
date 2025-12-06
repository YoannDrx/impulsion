"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GlowCard } from "@/components/impulsion/glow-card";
import { CyberButton } from "@/components/impulsion/cyber-button";
import { motion } from "motion/react";
import {
  MoreHorizontal,
  MessageSquare,
  Calendar,
  TrendingUp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import type { TeamDashboardAthlete } from "@/query/team/get-team-dashboard.query";

type AthletesListProps = {
  athletes: TeamDashboardAthlete[];
  orgSlug: string;
  onInviteClick?: () => void;
};

export function AthletesList({
  athletes,
  orgSlug,
  onInviteClick,
}: AthletesListProps) {
  if (athletes.length === 0) {
    return (
      <GlowCard variant="default" glow="none" className="p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-muted flex size-16 items-center justify-center rounded-full">
            <TrendingUp className="text-muted-foreground size-8" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Aucun athlète</h3>
            <p className="text-muted-foreground mt-1 text-sm">
              Invitez des athlètes pour commencer à suivre leur progression
            </p>
          </div>
          {onInviteClick ? (
            <CyberButton variant="neon" onClick={onInviteClick}>
              Inviter un athlète
            </CyberButton>
          ) : null}
        </div>
      </GlowCard>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Mes Athlètes</h2>
        {onInviteClick ? (
          <CyberButton variant="outline" size="sm" onClick={onInviteClick}>
            Inviter
          </CyberButton>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {athletes.map((athlete, index) => (
          <motion.div
            key={athlete.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <GlowCard
              variant="default"
              glow={athlete.pendingFeedback ? "cyan" : "none"}
              className="hover:ring-primary/50 transition-all hover:ring-1"
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10">
                      {athlete.image ? (
                        <AvatarImage src={athlete.image} alt={athlete.name} />
                      ) : null}
                      <AvatarFallback>
                        {athlete.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Link
                        href={`/orgs/${orgSlug}/athletes/${athlete.id}`}
                        className="font-medium hover:underline"
                      >
                        {athlete.name}
                      </Link>
                      {athlete.sport ? (
                        <p className="text-muted-foreground text-sm">
                          {athlete.sport}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <MoreHorizontal className="size-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/orgs/${orgSlug}/athletes/${athlete.id}`}>
                          Voir le profil
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/orgs/${orgSlug}/sessions/new?athlete=${athlete.id}`}
                        >
                          Créer une séance
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  {athlete.pendingFeedback ? (
                    <Badge variant="secondary" className="gap-1">
                      <MessageSquare className="size-3" />
                      Feedback en attente
                    </Badge>
                  ) : null}
                  {athlete.streak > 0 ? (
                    <Badge variant="outline" className="gap-1">
                      <TrendingUp className="size-3" />
                      {athlete.streak} jours
                    </Badge>
                  ) : null}
                  {athlete.lastSessionDate ? (
                    <Badge variant="outline" className="gap-1">
                      <Calendar className="size-3" />
                      {formatRelativeDate(athlete.lastSessionDate)}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </div>
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
  if (diffInDays < 7) return `Il y a ${diffInDays} jours`;
  if (diffInDays < 30) return `Il y a ${Math.floor(diffInDays / 7)} sem.`;
  return `Il y a ${Math.floor(diffInDays / 30)} mois`;
}
