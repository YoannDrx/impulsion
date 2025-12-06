"use client";

import { GlowCard } from "@/components/impulsion/glow-card";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Dumbbell, Users } from "lucide-react";
import { type UserRole, useOnboardingStore } from "./onboarding-store";

const roles: {
  id: UserRole;
  title: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "coach",
    title: "Je suis Coach",
    description:
      "Je veux créer une équipe et suivre mes athlètes. Planifier des séances, analyser des vidéos et monitorer leur progression.",
    icon: <Users className="size-12" />,
  },
  {
    id: "athlete",
    title: "Je suis Athlète",
    description:
      "Je veux rejoindre une équipe et suivre mon entraînement. Recevoir mes séances, donner mon feedback et progresser.",
    icon: <Dumbbell className="size-12" />,
  },
];

export function RoleSelection() {
  const { role, setRole } = useOnboardingStore();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-tight lg:text-4xl"
        >
          Bienvenue sur Impulsion
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground mt-2"
        >
          Comment souhaitez-vous utiliser la plateforme ?
        </motion.p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {roles.map((r, index) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <button
              type="button"
              onClick={() => setRole(r.id)}
              className="w-full text-left"
            >
              <GlowCard
                variant={role === r.id ? "elevated" : "default"}
                glow={role === r.id ? "lime" : "none"}
                size="lg"
                className={cn(
                  "cursor-pointer transition-all duration-300",
                  role === r.id
                    ? "ring-primary ring-2"
                    : "hover:ring-primary/50 hover:ring-1",
                )}
              >
                <div className="flex flex-col items-center gap-4 p-4 text-center">
                  <div
                    className={cn(
                      "transition-colors",
                      role === r.id ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {r.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{r.title}</h3>
                    <p className="text-muted-foreground mt-2 text-sm">
                      {r.description}
                    </p>
                  </div>
                </div>
              </GlowCard>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
