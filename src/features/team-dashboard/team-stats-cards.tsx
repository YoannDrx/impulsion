"use client";

import { GlowCard } from "@/components/impulsion/glow-card";
import { motion } from "motion/react";
import { Calendar, ClipboardList, TrendingUp, Users } from "lucide-react";

type TeamStatsCardsProps = {
  athleteCount: number;
  upcomingSessionsCount: number;
  completedSessionsCount: number;
  pendingFeedbackCount: number;
};

const stats = [
  {
    key: "athletes",
    label: "Athlètes",
    icon: Users,
    getValue: (props: TeamStatsCardsProps) => props.athleteCount,
    color: "lime" as const,
  },
  {
    key: "upcoming",
    label: "Séances à venir",
    icon: Calendar,
    getValue: (props: TeamStatsCardsProps) => props.upcomingSessionsCount,
    color: "cyan" as const,
  },
  {
    key: "completed",
    label: "Séances terminées",
    icon: TrendingUp,
    getValue: (props: TeamStatsCardsProps) => props.completedSessionsCount,
    color: "none" as const,
  },
  {
    key: "feedback",
    label: "Feedbacks en attente",
    icon: ClipboardList,
    getValue: (props: TeamStatsCardsProps) => props.pendingFeedbackCount,
    color: "none" as const,
  },
];

export function TeamStatsCards(props: TeamStatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <GlowCard variant="default" glow={stat.color} size="sm">
            <div className="flex items-center gap-4 p-4">
              <div
                className={`flex size-10 items-center justify-center rounded-lg ${
                  stat.color === "lime"
                    ? "bg-primary/10 text-primary"
                    : stat.color === "cyan"
                      ? "bg-secondary/10 text-secondary"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                <stat.icon className="size-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.getValue(props)}</p>
              </div>
            </div>
          </GlowCard>
        </motion.div>
      ))}
    </div>
  );
}
