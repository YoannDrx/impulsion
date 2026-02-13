"use client";

import { GlassPanel, NeonText } from "@/components/impulsion/cyberpunk";
import { TerminalInput } from "@/components/impulsion/cyberpunk/form/terminal-input";
import { cn } from "@/lib/utils";
import { Dumbbell, Heart, Timer, Zap } from "lucide-react";
import { useState } from "react";

type Exercise = {
  id: string;
  name: string;
  category: "strength" | "cardio" | "plyometric" | "mobility";
  load: number;
  duration: number;
};

type ExerciseLibraryProps = {
  className?: string;
  exercises?: Exercise[];
  onExerciseSelect?: (exercise: Exercise) => void;
};

const defaultExercises: Exercise[] = [
  {
    id: "1",
    name: "Barbell Squat",
    category: "strength",
    load: 85,
    duration: 45,
  },
  {
    id: "2",
    name: "Box Jumps",
    category: "plyometric",
    load: 70,
    duration: 20,
  },
  {
    id: "3",
    name: "Sprint Intervals",
    category: "cardio",
    load: 90,
    duration: 30,
  },
  {
    id: "4",
    name: "Hip Mobility Flow",
    category: "mobility",
    load: 20,
    duration: 15,
  },
  { id: "5", name: "Deadlift", category: "strength", load: 90, duration: 50 },
  {
    id: "6",
    name: "Depth Jumps",
    category: "plyometric",
    load: 80,
    duration: 25,
  },
  {
    id: "7",
    name: "Rowing Machine",
    category: "cardio",
    load: 65,
    duration: 40,
  },
  {
    id: "8",
    name: "Dynamic Stretching",
    category: "mobility",
    load: 15,
    duration: 10,
  },
];

const categoryIcons = {
  strength: Dumbbell,
  cardio: Heart,
  plyometric: Zap,
  mobility: Timer,
};

const categoryColors = {
  strength: "lime",
  cardio: "cyan",
  plyometric: "lime",
  mobility: "cyan",
} as const;

/**
 * ExerciseLibrary - Bibliothèque d'exercices filtrable
 */
export function ExerciseLibrary({
  className,
  exercises = defaultExercises,
  onExerciseSelect,
}: ExerciseLibraryProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = ["strength", "cardio", "plyometric", "mobility"];

  const filteredExercises = exercises.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !activeCategory || ex.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <GlassPanel
      className={cn("flex h-full flex-col p-4", className)}
      glow="none"
    >
      <NeonText
        as="h3"
        color="lime"
        intensity="subtle"
        className="mb-4 font-mono text-xs tracking-wider uppercase"
      >
        EXERCISE_LIBRARY
      </NeonText>

      {/* Search */}
      <TerminalInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search exercises..."
        className="mb-4"
      />

      {/* Category filters */}
      <div className="mb-4 flex flex-wrap gap-1">
        <button
          onClick={() => setActiveCategory(null)}
          className={cn(
            "rounded px-2 py-1 font-mono text-xs transition-colors",
            !activeCategory
              ? "bg-[var(--imp-lime-400)] text-black"
              : "text-neutral-400 hover:text-white",
          )}
        >
          ALL
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "rounded px-2 py-1 font-mono text-xs uppercase transition-colors",
              activeCategory === cat
                ? "bg-[var(--imp-lime-400)] text-black"
                : "text-neutral-400 hover:text-white",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Exercise list */}
      <div className="flex-1 space-y-2 overflow-y-auto">
        {filteredExercises.map((exercise) => {
          const Icon = categoryIcons[exercise.category];
          const color = categoryColors[exercise.category];
          return (
            <button
              key={exercise.id}
              onClick={() => onExerciseSelect?.(exercise)}
              className="group flex w-full items-center gap-3 rounded border border-neutral-800 p-3 text-left transition-all hover:border-[var(--imp-lime-400)]/50 hover:bg-neutral-900"
            >
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded",
                  color === "lime"
                    ? "bg-[var(--imp-lime-400)]/10 text-[var(--imp-lime-400)]"
                    : "bg-[var(--imp-cyan-400)]/10 text-[var(--imp-cyan-400)]",
                )}
              >
                <Icon className="size-4" />
              </div>
              <div className="flex-1">
                <p className="font-mono text-sm text-white">{exercise.name}</p>
                <p className="font-mono text-xs text-neutral-500">
                  {exercise.duration}min • Load: {exercise.load}
                </p>
              </div>
              <span className="font-mono text-xs text-neutral-600 opacity-0 transition-opacity group-hover:opacity-100">
                DRAG →
              </span>
            </button>
          );
        })}
      </div>
    </GlassPanel>
  );
}
