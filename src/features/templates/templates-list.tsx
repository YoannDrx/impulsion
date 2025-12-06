"use client";

import { CyberButton } from "@/components/impulsion/cyber-button";
import { GlowCard } from "@/components/impulsion/glow-card";
import { StatCard } from "@/components/impulsion/stat-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TEMPLATE_CATEGORIES,
  TEMPLATE_CATEGORY_LABELS,
  type TemplateCategory,
} from "@/lib/impulsion/types";
import { ClipboardList, FolderOpen, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { TemplateCard } from "./template-card";
import type { TemplatesOverview } from "./templates.types";

type TemplatesListProps = {
  data: TemplatesOverview;
  orgSlug: string;
};

export function TemplatesList({ data, orgSlug }: TemplatesListProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<
    TemplateCategory | "all"
  >("all");

  const filteredTemplates = useMemo(() => {
    let result = [...data.templates];

    // Filter by category
    if (categoryFilter !== "all") {
      result = result.filter((t) => t.category === categoryFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          (t.description?.toLowerCase().includes(query) ?? false) ||
          t.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    return result;
  }, [data.templates, categoryFilter, searchQuery]);

  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Templates"
          value={data.totalCount}
          icon={<ClipboardList className="size-5" />}
        />
        {data.categoryStats.slice(0, 3).map((stat) => (
          <StatCard
            key={stat.category}
            label={TEMPLATE_CATEGORY_LABELS[stat.category]}
            value={stat.count}
            icon={<FolderOpen className="size-5" />}
          />
        ))}
      </div>

      {/* Filters */}
      <GlowCard variant="default" glow="none">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select
              value={categoryFilter}
              onValueChange={(v) =>
                setCategoryFilter(v as TemplateCategory | "all")
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes catégories</SelectItem>
                {Object.entries(TEMPLATE_CATEGORIES).map(([key, value]) => (
                  <SelectItem key={key} value={value}>
                    {TEMPLATE_CATEGORY_LABELS[value as TemplateCategory]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <CyberButton variant="neon" asChild>
            <Link href={`/orgs/${orgSlug}/templates/new`}>
              <Plus className="mr-2 size-4" />
              Nouveau template
            </Link>
          </CyberButton>
        </div>
      </GlowCard>

      {/* Templates Grid */}
      {filteredTemplates.length === 0 ? (
        <GlowCard variant="default" glow="none">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ClipboardList className="text-muted-foreground mb-4 size-12" />
            {data.totalCount === 0 ? (
              <>
                <p className="font-medium">Aucun template</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  Créez votre premier template pour gagner du temps
                </p>
                <CyberButton variant="neon" className="mt-4" asChild>
                  <Link href={`/orgs/${orgSlug}/templates/new`}>
                    <Plus className="mr-2 size-4" />
                    Créer un template
                  </Link>
                </CyberButton>
              </>
            ) : (
              <>
                <p className="font-medium">Aucun résultat</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  Aucun template ne correspond à votre recherche
                </p>
              </>
            )}
          </div>
        </GlowCard>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template, index) => (
            <TemplateCard
              key={template.id}
              template={template}
              orgSlug={orgSlug}
              index={index}
              onDeleted={handleRefresh}
            />
          ))}
        </div>
      )}
    </div>
  );
}
