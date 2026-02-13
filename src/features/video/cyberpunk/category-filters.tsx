"use client";

import { GlassPanel, NeonText } from "@/components/impulsion/cyberpunk";
import { cn } from "@/lib/utils";

type Category = {
  id: string;
  label: string;
  count: number;
};

type CategoryFiltersProps = {
  className?: string;
  categories?: Category[];
  activeCategory?: string | null;
  onCategoryChange?: (categoryId: string | null) => void;
};

const defaultCategories: Category[] = [
  { id: "all", label: "ALL", count: 47 },
  { id: "sprint", label: "SPRINT", count: 12 },
  { id: "jumps", label: "JUMPS", count: 8 },
  { id: "throws", label: "THROWS", count: 6 },
  { id: "technique", label: "TECHNIQUE", count: 15 },
  { id: "competition", label: "COMPETITION", count: 6 },
];

/**
 * CategoryFilters - Filtres de catégories pour la bibliothèque vidéo
 */
export function CategoryFilters({
  className,
  categories = defaultCategories,
  activeCategory = "all",
  onCategoryChange,
}: CategoryFiltersProps) {
  return (
    <GlassPanel className={cn("p-4", className)} glow="none">
      <NeonText
        as="h3"
        color="cyan"
        intensity="subtle"
        className="mb-3 font-mono text-xs tracking-wider uppercase"
      >
        CATEGORIES
      </NeonText>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() =>
              onCategoryChange?.(category.id === "all" ? null : category.id)
            }
            className={cn(
              "flex items-center gap-2 rounded border px-3 py-1.5 font-mono text-xs transition-all",
              activeCategory === category.id ||
                (category.id === "all" && !activeCategory)
                ? "border-[var(--imp-cyan-400)] bg-[var(--imp-cyan-400)]/10 text-[var(--imp-cyan-400)]"
                : "border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white",
            )}
          >
            {category.label}
            <span
              className={cn(
                "rounded px-1.5 py-0.5 text-[10px]",
                activeCategory === category.id ||
                  (category.id === "all" && !activeCategory)
                  ? "bg-[var(--imp-cyan-400)]/20"
                  : "bg-neutral-800",
              )}
            >
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </GlassPanel>
  );
}
