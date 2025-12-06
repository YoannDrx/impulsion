"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GlowCard } from "@/components/impulsion/glow-card";
import {
  MOOD_LABELS,
  RPE_LABELS,
  SENSATION_LABELS,
  type Mood,
  type RPEValue,
  type Sensation,
} from "@/lib/impulsion/types";
import { motion } from "motion/react";
import { Clock, Flame, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

type FeedbackCardProps = {
  id: string;
  athleteName: string;
  athleteImage?: string | null;
  rpe: number;
  actualDuration?: number | null;
  sensation?: string | null;
  mood?: string | null;
  comment?: string | null;
  createdAt: Date;
};

const sensationIcons: Record<Sensation, string> = {
  SUPER: "🔥",
  BIEN: "😊",
  CORRECT: "😐",
  FATIGUE: "😓",
  MAUVAIS: "😫",
};

const moodIcons: Record<Mood, string> = {
  MOTIVE: "💪",
  NEUTRE: "😶",
  STRESSE: "😰",
  FATIGUE: "😴",
};

function getRpeColor(rpe: number): string {
  if (rpe <= 3) return "text-green-500";
  if (rpe <= 5) return "text-yellow-500";
  if (rpe <= 7) return "text-orange-500";
  return "text-red-500";
}

export function FeedbackCard({
  athleteName,
  athleteImage,
  rpe,
  actualDuration,
  sensation,
  mood,
  comment,
  createdAt,
}: FeedbackCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <GlowCard variant="default" glow="none">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                {athleteImage ? (
                  <AvatarImage src={athleteImage} alt={athleteName} />
                ) : null}
                <AvatarFallback>
                  {athleteName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{athleteName}</p>
                <p className="text-muted-foreground text-xs">
                  {formatDistanceToNow(createdAt, {
                    addSuffix: true,
                    locale: fr,
                  })}
                </p>
              </div>
            </div>

            {/* RPE Badge */}
            <div className={`text-right ${getRpeColor(rpe)}`}>
              <div className="flex items-center gap-1">
                <Flame className="size-4" />
                <span className="text-2xl font-bold">{rpe}</span>
              </div>
              <p className="text-xs">{RPE_LABELS[rpe as RPEValue]}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 flex flex-wrap gap-2">
            {actualDuration ? (
              <Badge variant="outline" className="gap-1">
                <Clock className="size-3" />
                {actualDuration} min
              </Badge>
            ) : null}

            {sensation ? (
              <Badge variant="outline" className="gap-1">
                {sensationIcons[sensation as Sensation]}
                {SENSATION_LABELS[sensation as Sensation]}
              </Badge>
            ) : null}

            {mood ? (
              <Badge variant="outline" className="gap-1">
                {moodIcons[mood as Mood]}
                {MOOD_LABELS[mood as Mood]}
              </Badge>
            ) : null}
          </div>

          {/* Comment */}
          {comment ? (
            <div className="bg-muted/50 mt-4 rounded-lg p-3">
              <div className="text-muted-foreground mb-1 flex items-center gap-1 text-xs">
                <MessageSquare className="size-3" />
                Commentaire
              </div>
              <p className="text-sm">{comment}</p>
            </div>
          ) : null}
        </div>
      </GlowCard>
    </motion.div>
  );
}
