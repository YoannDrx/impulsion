"use client";

import { CyberButton } from "@/components/impulsion/cyber-button";
import { GlowCard } from "@/components/impulsion/glow-card";
import { Badge } from "@/components/ui/badge";
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
  TEMPLATE_CATEGORY_LABELS,
  TEMPLATE_CATEGORIES,
  RPE_LABELS,
  type SessionType,
  type TemplateCategory,
} from "@/lib/impulsion/types";
import {
  ArrowLeft,
  Clock,
  Flame,
  Loader2,
  Tag,
  FileText,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { createTemplate, updateTemplate } from "./templates.action";
import type { TemplateWithCreator } from "./templates.types";

type TemplateFormProps = {
  orgSlug: string;
  template?: TemplateWithCreator;
  mode: "create" | "edit";
};

export function TemplateForm({ orgSlug, template, mode }: TemplateFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Form state
  const [title, setTitle] = useState(template?.title ?? "");
  const [description, setDescription] = useState(template?.description ?? "");
  const [type, setType] = useState<SessionType>(template?.type ?? "COURSE");
  const [category, setCategory] = useState<TemplateCategory>(
    template?.category ?? "COURSE",
  );
  const [durationMinutes, setDurationMinutes] = useState(
    template?.durationMinutes ?? 60,
  );
  const [targetRpe, setTargetRpe] = useState<number | null>(
    template?.targetRpe ?? null,
  );
  const [tags, setTags] = useState<string[]>(template?.tags ?? []);
  const [tagInput, setTagInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Le titre est requis");
      return;
    }

    startTransition(async () => {
      const data = {
        title,
        description: description || undefined,
        type,
        category,
        durationMinutes,
        targetRpe: targetRpe ?? undefined,
        tags: tags.length > 0 ? tags : undefined,
      };

      const result =
        mode === "create" || !template
          ? await createTemplate(data)
          : await updateTemplate(template.id, data);

      if (result.success) {
        toast.success(
          mode === "create" ? "Template créé !" : "Template mis à jour !",
        );
        router.push(`/orgs/${orgSlug}/templates`);
      } else {
        toast.error(result.error);
      }
    });
  };

  const addTag = () => {
    const trimmed = tagInput.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <GlowCard variant="default" glow="none">
        <div className="space-y-6 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <FileText className="size-5" />
            Informations du template
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                placeholder="Ex: Fractionné 10x400m, Sortie longue..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select
                value={category}
                onValueChange={(v) => setCategory(v as TemplateCategory)}
              >
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(TEMPLATE_CATEGORIES).map(([key, value]) => (
                    <SelectItem key={key} value={value}>
                      {TEMPLATE_CATEGORY_LABELS[value as TemplateCategory]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
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

            <div className="space-y-2">
              <Label htmlFor="duration">Durée par défaut (minutes)</Label>
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

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Détails du template, objectifs, consignes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
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

      {/* Tags */}
      <GlowCard variant="default" glow="none">
        <div className="space-y-6 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Tag className="size-5" />
            Tags (optionnel)
          </h2>

          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Ajouter un tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
              />
              <CyberButton
                type="button"
                variant="outline"
                onClick={addTag}
                disabled={!tagInput.trim()}
              >
                Ajouter
              </CyberButton>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-destructive ml-1"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </GlowCard>

      {/* Preview */}
      <GlowCard variant="default" glow="lime">
        <div className="space-y-4 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Clock className="size-5" />
            Aperçu
          </h2>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">
                  {title || "Titre du template"}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {TEMPLATE_CATEGORY_LABELS[category]} -{" "}
                  {SESSION_TYPE_LABELS[type]}
                </p>
              </div>
              <div className="text-right text-sm">
                <p className="font-medium">{durationMinutes} min</p>
                {targetRpe && (
                  <p className="text-muted-foreground">RPE {targetRpe}/10</p>
                )}
              </div>
            </div>
            {description && (
              <p className="text-muted-foreground mt-2 text-sm">
                {description}
              </p>
            )}
          </div>
        </div>
      </GlowCard>

      {/* Actions */}
      <div className="flex gap-4">
        <CyberButton type="button" variant="ghost" asChild>
          <Link href={`/orgs/${orgSlug}/templates`}>
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
              {mode === "create" ? "Création..." : "Mise à jour..."}
            </>
          ) : mode === "create" ? (
            "Créer le template"
          ) : (
            "Mettre à jour"
          )}
        </CyberButton>
      </div>
    </form>
  );
}
