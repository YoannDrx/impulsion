"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Calendar, Users, TrendingUp, Zap } from "lucide-react";
import { previewStats, previewCalendar, previewAthletes } from "./preview-data";

export function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
      className="relative w-full max-w-md rounded-lg border border-lime-400/30 bg-neutral-900/50 p-4 backdrop-blur-sm lg:max-w-lg"
      style={{ boxShadow: "0 0 40px oklch(0.91 0.23 120 / 0.1)" }}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-lime-400" />
          <span className="font-mono text-xs text-neutral-400">
            DASHBOARD.PREVIEW
          </span>
        </div>
        <span className="font-mono text-xs text-neutral-600">LIVE</span>
      </div>

      {/* Stats row */}
      <div className="mb-4 grid grid-cols-4 gap-2">
        <StatCard
          icon={Users}
          value={previewStats.athleteCount}
          label="Athletes"
          color="lime"
        />
        <StatCard
          icon={Calendar}
          value={previewStats.upcomingSessions}
          label="Seances"
          color="cyan"
        />
        <StatCard
          icon={TrendingUp}
          value={previewStats.completedSessions}
          label="Terminees"
          color="lime"
        />
        <StatCard
          icon={Zap}
          value={previewStats.weeklyLoad}
          label="Charge"
          color="cyan"
        />
      </div>

      {/* Calendar preview */}
      <div className="mb-4 rounded border border-neutral-800 bg-neutral-950/50 p-3">
        <div className="mb-2 font-mono text-xs text-neutral-500">
          {`// SEMAINE EN COURS`}
        </div>
        <div className="space-y-2">
          {previewCalendar.map((session, i) => (
            <motion.div
              key={session.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 + i * 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "size-1.5 rounded-full",
                    session.type === "interval"
                      ? "bg-lime-400"
                      : session.type === "endurance"
                        ? "bg-cyan-400"
                        : "bg-orange-400",
                  )}
                />
                <span className="font-mono text-xs text-neutral-300">
                  {session.title}
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-neutral-500">
                <span>{session.day}</span>
                <span className="text-neutral-600">|</span>
                <span>{session.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Athletes preview */}
      <div className="rounded border border-neutral-800 bg-neutral-950/50 p-3">
        <div className="mb-2 font-mono text-xs text-neutral-500">
          {`// ATHLETES ACTIFS`}
        </div>
        <div className="space-y-2">
          {previewAthletes.map((athlete, i) => (
            <motion.div
              key={athlete.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8 + i * 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "size-1.5 rounded-full",
                    athlete.status === "active"
                      ? "bg-lime-400"
                      : "bg-neutral-600",
                  )}
                />
                <span className="font-mono text-xs text-neutral-300">
                  {athlete.name}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-16 overflow-hidden rounded-full bg-neutral-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${athlete.load}%` }}
                    transition={{ delay: 2 + i * 0.1, duration: 0.6 }}
                    className={cn(
                      "h-full rounded-full",
                      athlete.load > 80
                        ? "bg-orange-400"
                        : athlete.load > 60
                          ? "bg-lime-400"
                          : "bg-cyan-400",
                    )}
                  />
                </div>
                <span className="w-8 font-mono text-xs text-neutral-500">
                  {athlete.load}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute -top-px -right-px size-4 border-t border-r border-lime-400/50" />
      <div className="absolute -bottom-px -left-px size-4 border-b border-l border-lime-400/50" />
    </motion.div>
  );
}

type StatCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  label: string;
  color: "lime" | "cyan";
};

function StatCard({ icon: Icon, value, label, color }: StatCardProps) {
  return (
    <div className="rounded border border-neutral-800 bg-neutral-950/50 p-2 text-center">
      <Icon
        className={cn(
          "mx-auto size-3",
          color === "lime" ? "text-lime-400" : "text-cyan-400",
        )}
      />
      <div
        className={cn(
          "mt-1 font-mono text-sm font-bold",
          color === "lime" ? "text-lime-400" : "text-cyan-400",
        )}
      >
        {value}
      </div>
      <div className="font-mono text-[10px] text-neutral-500">{label}</div>
    </div>
  );
}
