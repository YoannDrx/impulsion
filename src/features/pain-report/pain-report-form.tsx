"use client";

import { CyberButton } from "@/components/impulsion/cyber-button";
import { GlowCard } from "@/components/impulsion/glow-card";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  PAIN_LOCATIONS,
  PAIN_LOCATION_LABELS,
  PAIN_SIDES,
  PAIN_SIDE_LABELS,
  type PainLocation,
  type PainSide,
} from "@/lib/impulsion/types";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { submitPainReport } from "./pain-report.action";

type PainReportFormProps = {
  feedbackId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export function PainReportForm({
  feedbackId,
  onSuccess,
  onCancel,
}: PainReportFormProps) {
  const [isPending, startTransition] = useTransition();

  const [location, setLocation] = useState<PainLocation | null>(null);
  const [side, setSide] = useState<PainSide>("CENTER");
  const [intensity, setIntensity] = useState(5);
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!location) {
      toast.error("Veuillez sélectionner une zone");
      return;
    }

    startTransition(async () => {
      const result = await submitPainReport({
        feedbackId,
        location,
        side,
        intensity,
        description: description || undefined,
      });

      if (result.success) {
        toast.success("Douleur signalée", {
          description: "Ton coach sera notifié",
        });
        onSuccess?.();
      } else {
        toast.error(result.error ?? "Une erreur est survenue");
      }
    });
  };

  const getIntensityColor = (value: number) => {
    if (value <= 3) return "text-green-500";
    if (value <= 5) return "text-yellow-500";
    if (value <= 7) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Location Selection */}
      <GlowCard variant="default" glow="none">
        <div className="space-y-4 p-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-orange-500" />
            <h2 className="text-lg font-semibold">Zone de douleur</h2>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
            {Object.entries(PAIN_LOCATIONS).map(([key, value]) => (
              <motion.button
                key={key}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLocation(value)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-sm transition-all",
                  location === value
                    ? "border-destructive bg-destructive/10 text-destructive"
                    : "border-border hover:border-destructive/50",
                )}
              >
                {PAIN_LOCATION_LABELS[value]}
              </motion.button>
            ))}
          </div>
        </div>
      </GlowCard>

      {/* Side Selection */}
      {location && !["HEAD", "NECK", "BACK"].includes(location) ? (
        <GlowCard variant="default" glow="none">
          <div className="space-y-4 p-6">
            <h2 className="text-lg font-semibold">Côté</h2>

            <div className="flex flex-wrap gap-2">
              {Object.entries(PAIN_SIDES).map(([key, value]) => (
                <motion.button
                  key={key}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSide(value)}
                  className={cn(
                    "rounded-full border px-4 py-2 transition-all",
                    side === value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50",
                  )}
                >
                  {PAIN_SIDE_LABELS[value]}
                </motion.button>
              ))}
            </div>
          </div>
        </GlowCard>
      ) : null}

      {/* Intensity */}
      <GlowCard variant="default" glow="none">
        <div className="space-y-4 p-6">
          <h2 className="text-lg font-semibold">Intensité</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span
                className={`text-4xl font-bold ${getIntensityColor(intensity)}`}
              >
                {intensity}
              </span>
              <span className="text-muted-foreground">/ 10</span>
            </div>
            <Slider
              value={[intensity]}
              onValueChange={(values: number[]) => setIntensity(values[0])}
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
            <div className="text-muted-foreground flex justify-between text-xs">
              <span>Légère gêne</span>
              <span>Douleur intense</span>
            </div>
          </div>
        </div>
      </GlowCard>

      {/* Description */}
      <GlowCard variant="default" glow="none">
        <div className="space-y-4 p-6">
          <h2 className="text-lg font-semibold">Description (optionnel)</h2>

          <Textarea
            placeholder="Décris ta douleur : type de douleur, quand elle apparaît, etc."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>
      </GlowCard>

      {/* Actions */}
      <div className="flex gap-4">
        {onCancel ? (
          <CyberButton type="button" variant="ghost" onClick={onCancel}>
            Annuler
          </CyberButton>
        ) : null}

        <CyberButton
          type="submit"
          variant="neon"
          className="flex-1"
          disabled={isPending || !location}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Envoi...
            </>
          ) : (
            "Signaler la douleur"
          )}
        </CyberButton>
      </div>
    </form>
  );
}
