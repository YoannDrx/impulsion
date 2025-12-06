"use client";

import { CyberButton } from "@/components/impulsion/cyber-button";
import { GlowCard } from "@/components/impulsion/glow-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  SESSION_TYPE_LABELS,
  SESSION_TYPES,
  RPE_LABELS,
  type SessionType,
} from "@/lib/impulsion/types";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Flame,
  Loader2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { createSession } from "./sessions.action";

type Athlete = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

type CreateSessionFormProps = {
  orgSlug: string;
  athletes: Athlete[];
};

export function CreateSessionForm({
  orgSlug,
  athletes,
}: CreateSessionFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<SessionType>("COURSE");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("09:00");
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [targetRpe, setTargetRpe] = useState<number | null>(null);
  const [selectedAthletes, setSelectedAthletes] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Le titre est requis");
      return;
    }

    if (!scheduledDate) {
      toast.error("La date est requise");
      return;
    }

    if (selectedAthletes.length === 0) {
      toast.error("Sélectionnez au moins un athlète");
      return;
    }

    const scheduledAt = new Date(`${scheduledDate}T${scheduledTime}`);

    startTransition(async () => {
      const result = await createSession({
        title,
        description: description || undefined,
        type,
        scheduledAt,
        durationMinutes,
        targetRpe: targetRpe ?? undefined,
        athleteIds: selectedAthletes,
      });

      if (result.success) {
        toast.success("Séance créée !");
        router.push(`/orgs/${orgSlug}/sessions`);
      } else {
        toast.error(result.error);
      }
    });
  };

  const toggleAthlete = (athleteId: string) => {
    setSelectedAthletes((prev) =>
      prev.includes(athleteId)
        ? prev.filter((id) => id !== athleteId)
        : [...prev, athleteId],
    );
  };

  const selectAllAthletes = () => {
    if (selectedAthletes.length === athletes.length) {
      setSelectedAthletes([]);
    } else {
      setSelectedAthletes(athletes.map((a) => a.id));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <GlowCard variant="default" glow="none">
        <div className="space-y-6 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Calendar className="size-5" />
            Informations de la séance
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                placeholder="Ex: Sortie longue, Fractionné 10x400m..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type de séance</Label>
              <Select
                value={type}
                onValueChange={(v) => setType(v as SessionType)}
              >
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(SESSION_TYPES).map(([key, value]) => (
                    <SelectItem key={key} value={value}>
                      {SESSION_TYPE_LABELS[value as SessionType]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Détails de la séance, consignes, objectifs..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>
      </GlowCard>

      {/* Schedule */}
      <GlowCard variant="default" glow="none">
        <div className="space-y-6 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Clock className="size-5" />
            Planification
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Heure</Label>
              <Input
                id="time"
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Durée (minutes)</Label>
              <Input
                id="duration"
                type="number"
                min={5}
                max={480}
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </GlowCard>

      {/* Intensity */}
      <GlowCard variant="default" glow="none">
        <div className="space-y-6 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Flame className="size-5" />
            Intensité cible (optionnel)
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>RPE cible</Label>
              <span className="text-muted-foreground text-sm">
                {targetRpe
                  ? `${targetRpe} - ${RPE_LABELS[targetRpe as keyof typeof RPE_LABELS]}`
                  : "Non défini"}
              </span>
            </div>
            <Slider
              value={targetRpe ? [targetRpe] : [5]}
              onValueChange={(values: number[]) => setTargetRpe(values[0])}
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
            <div className="text-muted-foreground flex justify-between text-xs">
              <span>1 - Très léger</span>
              <span>10 - Maximal</span>
            </div>
          </div>
        </div>
      </GlowCard>

      {/* Athletes Selection */}
      <GlowCard variant="default" glow="lime">
        <div className="space-y-6 p-6">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Users className="size-5" />
              Athlètes ({selectedAthletes.length}/{athletes.length})
            </h2>
            <CyberButton
              type="button"
              variant="outline"
              size="sm"
              onClick={selectAllAthletes}
            >
              {selectedAthletes.length === athletes.length
                ? "Désélectionner tout"
                : "Sélectionner tout"}
            </CyberButton>
          </div>

          {athletes.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">
                Aucun athlète dans l'équipe.
              </p>
              <Link
                href={`/orgs/${orgSlug}/settings/members`}
                className="text-primary hover:underline"
              >
                Inviter des athlètes
              </Link>
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {athletes.map((athlete) => (
                <motion.div
                  key={athlete.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <label
                    htmlFor={`athlete-${athlete.id}`}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all ${
                      selectedAthletes.includes(athlete.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Checkbox
                      id={`athlete-${athlete.id}`}
                      checked={selectedAthletes.includes(athlete.id)}
                      onCheckedChange={() => toggleAthlete(athlete.id)}
                    />
                    <Avatar className="size-8">
                      {athlete.image ? (
                        <AvatarImage src={athlete.image} alt={athlete.name} />
                      ) : null}
                      <AvatarFallback>
                        {athlete.name.slice(0, 1).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{athlete.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {athlete.email}
                      </p>
                    </div>
                  </label>
                </motion.div>
              ))}
            </div>
          )}
        </div>
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
          disabled={isPending || selectedAthletes.length === 0}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Création...
            </>
          ) : (
            "Créer la séance"
          )}
        </CyberButton>
      </div>
    </form>
  );
}
