"use client";

import { Badge } from "@/components/ui/badge";
import type { SessionType } from "@/lib/impulsion/types";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { format } from "date-fns";
import Link from "next/link";
import type { CalendarDay } from "./calendar.types";

type CalendarDayCellProps = {
  day: CalendarDay;
  orgSlug: string;
};

const typeColors: Record<SessionType, string> = {
  COURSE: "bg-green-500/20 text-green-400 border-green-500/30",
  PPG: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  TECHNIQUE: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  FORCE: "bg-red-500/20 text-red-400 border-red-500/30",
  RECUPERATION: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  AUTRE: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

export function CalendarDayCell({ day, orgSlug }: CalendarDayCellProps) {
  const dayNumber = format(day.date, "d");

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn(
        "min-h-[100px] rounded-lg border p-2 transition-colors",
        day.isCurrentMonth
          ? "bg-card border-border"
          : "bg-muted/30 border-border/50",
        day.isToday && "ring-primary ring-2",
      )}
    >
      <div
        className={cn(
          "mb-1 text-sm font-medium",
          day.isToday && "text-primary",
          !day.isCurrentMonth && "text-muted-foreground",
        )}
      >
        {dayNumber}
      </div>

      <div className="space-y-1">
        {day.sessions.slice(0, 3).map((session) => (
          <Link
            key={session.id}
            href={`/orgs/${orgSlug}/sessions/${session.id}`}
            className="block"
          >
            <motion.div
              whileHover={{ x: 2 }}
              className={cn(
                "truncate rounded border px-1.5 py-0.5 text-xs",
                typeColors[session.type],
              )}
            >
              <span className="font-medium">
                {format(session.scheduledAt, "HH:mm")}
              </span>{" "}
              {session.title}
            </motion.div>
          </Link>
        ))}

        {day.sessions.length > 3 ? (
          <Badge variant="secondary" className="text-xs">
            +{day.sessions.length - 3} autres
          </Badge>
        ) : null}
      </div>
    </motion.div>
  );
}
