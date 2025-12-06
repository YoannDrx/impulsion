"use client";

import { GlowCard } from "@/components/impulsion/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SESSION_TYPE_LABELS,
  TEMPLATE_CATEGORY_LABELS,
  type SessionType,
  type TemplateCategory,
} from "@/lib/impulsion/types";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "motion/react";
import {
  Clock,
  Copy,
  Flame,
  MoreVertical,
  Pencil,
  Play,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteTemplate, duplicateTemplate } from "./templates.action";
import type { TemplateWithCreator } from "./templates.types";

type TemplateCardProps = {
  template: TemplateWithCreator;
  orgSlug: string;
  index?: number;
  onDeleted?: () => void;
};

const CATEGORY_COLORS: Record<TemplateCategory, string> = {
  COURSE: "bg-blue-500/10 text-blue-500",
  PPG: "bg-orange-500/10 text-orange-500",
  PLIOMETRIE: "bg-purple-500/10 text-purple-500",
  TECHNIQUE: "bg-green-500/10 text-green-500",
  FORCE: "bg-red-500/10 text-red-500",
  AUTRE: "bg-gray-500/10 text-gray-500",
};

export function TemplateCard({
  template,
  orgSlug,
  index = 0,
  onDeleted,
}: TemplateCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    if (!confirm("Supprimer ce template ?")) return;

    setIsDeleting(true);
    const result = await deleteTemplate(template.id);
    setIsDeleting(false);

    if (result.success) {
      toast.success("Template supprimé");
      onDeleted?.();
    } else {
      toast.error(result.error);
    }
  };

  const handleDuplicate = () => {
    startTransition(async () => {
      const result = await duplicateTemplate(template.id);
      if (result.success) {
        toast.success("Template dupliqué");
        onDeleted?.(); // Refresh the list
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <GlowCard variant="default" glow="none" className="h-full">
        <div className="flex h-full flex-col p-4">
          {/* Header */}
          <div className="mb-3 flex items-start justify-between">
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-2">
                <Badge
                  className={cn("text-xs", CATEGORY_COLORS[template.category])}
                >
                  {TEMPLATE_CATEGORY_LABELS[template.category]}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {SESSION_TYPE_LABELS[template.type as SessionType]}
                </Badge>
              </div>
              <h3 className="font-semibold">{template.title}</h3>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link
                    href={`/orgs/${orgSlug}/sessions/new?template=${template.id}`}
                  >
                    <Play className="mr-2 size-4" />
                    Utiliser
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/orgs/${orgSlug}/templates/${template.id}/edit`}>
                    <Pencil className="mr-2 size-4" />
                    Modifier
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDuplicate}
                  disabled={isPending}
                >
                  <Copy className="mr-2 size-4" />
                  Dupliquer
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 size-4" />
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Description */}
          {template.description && (
            <p className="text-muted-foreground mb-3 line-clamp-2 flex-1 text-sm">
              {template.description}
            </p>
          )}

          {/* Meta */}
          <div className="text-muted-foreground flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="size-4" />
              <span>{template.durationMinutes} min</span>
            </div>
            {template.targetRpe && (
              <div className="flex items-center gap-1">
                <Flame className="size-4" />
                <span>RPE {template.targetRpe}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {template.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {template.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {template.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{template.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="text-muted-foreground mt-3 border-t pt-3 text-xs">
            Créé{" "}
            {formatDistanceToNow(template.createdAt, {
              addSuffix: true,
              locale: fr,
            })}
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}
