"use client";

import { CyberButton } from "@/components/impulsion/cyber-button";
import { GlowCard } from "@/components/impulsion/glow-card";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  MOOD_LABELS,
  MOODS,
  RPE_LABELS,
  SENSATION_LABELS,
  SENSATIONS,
  type Mood,
  type RPEValue,
  type Sensation,
} from "@/lib/impulsion/types";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import {
  AlertTriangle,
  ArrowLeft,
  Clock,
  Flame,
  Loader2,
  MessageSquare,
  Smile,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { submitFeedback } from "./feedback.action";

type FeedbackFormProps = {
  sessionId: string;
  sessionTitle: string;
  sessionDuration: number;
  orgSlug: string;
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

export function FeedbackForm({
  sessionId,
  sessionTitle,
  sessionDuration,
  orgSlug,
}: FeedbackFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [rpe, setRpe] = useState<RPEValue>(5);
  const [actualDuration, setActualDuration] = useState(sessionDuration);
  const [sensation, setSensation] = useState<Sensation | null>(null);
  const [mood, setMood] = useState<Mood | null>(null);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await submitFeedback({
        sessionId,
        rpe,
        actualDuration,
        sensation: sensation ?? undefined,
        mood: mood ?? undefined,
        comment: comment || undefined,
      });

      if (result.success) {
        toast.success("Feedback envoyé !", {
          description: "Merci pour votre retour",
        });
        router.push(`/orgs/${orgSlug}/sessions`);
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Session info */}
      <GlowCard variant="elevated" glow="lime" size="sm">
        <div className="flex items-center gap-3 p-4">
          <Sparkles className="text-primary size-5" />
          <div>
            <p className="font-medium">{sessionTitle}</p>
            <p className="text-muted-foreground text-sm">
              Durée prévue : {sessionDuration} min
            </p>
          </div>
        </div>
      </GlowCard>

      {/* RPE Section */}
      <GlowCard variant="default" glow="none">
        <div className="space-y-4 p-6">
          <div className="flex items-center gap-2">
            <Flame className="size-5 text-orange-500" />
            <h2 className="text-lg font-semibold">Effort ressenti (RPE)</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-4xl font-bold">{rpe}</span>
              <span className="text-muted-foreground">
                {RPE_LABELS[rpe as keyof typeof RPE_LABELS]}
              </span>
            </div>
            <Slider
              value={[rpe]}
              onValueChange={(values: number[]) =>
                setRpe(values[0] as RPEValue)
              }
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
            <div className="text-muted-foreground flex justify-between text-xs">
              <span>Très léger</span>
              <span>Maximal</span>
            </div>
          </div>
        </div>
      </GlowCard>

      {/* Duration Section */}
      <GlowCard variant="default" glow="none">
        <div className="space-y-4 p-6">
          <div className="flex items-center gap-2">
            <Clock className="text-secondary size-5" />
            <h2 className="text-lg font-semibold">Durée réelle</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-4xl font-bold">{actualDuration}</span>
              <span className="text-muted-foreground">minutes</span>
            </div>
            <Slider
              value={[actualDuration]}
              onValueChange={(values: number[]) => setActualDuration(values[0])}
              min={5}
              max={240}
              step={5}
              className="w-full"
            />
          </div>
        </div>
      </GlowCard>

      {/* Sensation Section */}
      <GlowCard variant="default" glow="none">
        <div className="space-y-4 p-6">
          <div className="flex items-center gap-2">
            <Smile className="size-5 text-yellow-500" />
            <h2 className="text-lg font-semibold">Sensation</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.entries(SENSATIONS).map(([key, value]) => (
              <motion.button
                key={key}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSensation(sensation === value ? null : value)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-4 py-2 transition-all",
                  sensation === value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50",
                )}
              >
                <span>{sensationIcons[value]}</span>
                <span>{SENSATION_LABELS[value]}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </GlowCard>

      {/* Mood Section */}
      <GlowCard variant="default" glow="none">
        <div className="space-y-4 p-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧠</span>
            <h2 className="text-lg font-semibold">Humeur</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.entries(MOODS).map(([key, value]) => (
              <motion.button
                key={key}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMood(mood === value ? null : value)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-4 py-2 transition-all",
                  mood === value
                    ? "border-secondary bg-secondary/10 text-secondary"
                    : "border-border hover:border-secondary/50",
                )}
              >
                <span>{moodIcons[value]}</span>
                <span>{MOOD_LABELS[value]}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </GlowCard>

      {/* Comment Section */}
      <GlowCard variant="default" glow="none">
        <div className="space-y-4 p-6">
          <div className="flex items-center gap-2">
            <MessageSquare className="text-muted-foreground size-5" />
            <h2 className="text-lg font-semibold">Commentaire (optionnel)</h2>
          </div>

          <Textarea
            placeholder="Comment s'est passée ta séance ? Des sensations particulières ?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
          />
        </div>
      </GlowCard>

      {/* Pain Report Link */}
      <GlowCard variant="default" glow="none">
        <Link
          href={`/orgs/${orgSlug}/sessions/${sessionId}/pain-report`}
          className="hover:bg-muted/50 flex items-center justify-between p-4 transition-colors"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="size-5 text-orange-500" />
            <div>
              <p className="font-medium">Signaler une douleur</p>
              <p className="text-muted-foreground text-sm">
                Informe ton coach si tu as ressenti une gêne
              </p>
            </div>
          </div>
          <span className="text-muted-foreground">→</span>
        </Link>
      </GlowCard>

      {/* Actions */}
      <div className="flex gap-4">
        <CyberButton type="button" variant="ghost" asChild>
          <Link href={`/orgs/${orgSlug}/sessions`}>
            <ArrowLeft className="mr-2 size-4" />
            Annuler
          </Link>
        </CyberButton>

        <CyberButton
          type="submit"
          variant="neon"
          className="flex-1"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Envoi...
            </>
          ) : (
            "Envoyer mon feedback"
          )}
        </CyberButton>
      </div>
    </form>
  );
}
