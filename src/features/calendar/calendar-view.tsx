"use client";

import { GlowCard } from "@/components/impulsion/glow-card";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { useState, useMemo } from "react";
import { CalendarHeader } from "./calendar-header";
import { CalendarDayCell } from "./calendar-day-cell";
import type { CalendarDay, CalendarSession } from "./calendar.types";

type CalendarViewProps = {
  sessions: CalendarSession[];
  orgSlug: string;
  initialYear?: number;
  initialMonth?: number;
};

const WEEKDAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function getToday() {
  return new Date();
}

export function CalendarView({
  sessions,
  orgSlug,
  initialYear,
  initialMonth,
}: CalendarViewProps) {
  const today = useMemo(() => getToday(), []);

  const [viewDate, setViewDate] = useState(() => {
    const now = getToday();
    return new Date(
      initialYear ?? now.getFullYear(),
      initialMonth ?? now.getMonth(),
      1,
    );
  });

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(viewDate);
    const monthEnd = endOfMonth(viewDate);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    return days.map((date): CalendarDay => {
      const daySessions = sessions.filter((session) =>
        isSameDay(new Date(session.scheduledAt), date),
      );

      return {
        date,
        isCurrentMonth: isSameMonth(date, viewDate),
        isToday: isSameDay(date, today),
        sessions: daySessions,
      };
    });
  }, [viewDate, sessions, today]);

  const handlePreviousMonth = () => {
    setViewDate((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setViewDate((prev) => addMonths(prev, 1));
  };

  const handleToday = () => {
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  return (
    <GlowCard variant="default" glow="none" className="p-6">
      <CalendarHeader
        year={viewDate.getFullYear()}
        month={viewDate.getMonth()}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
      />

      {/* Weekday headers */}
      <div className="mt-6 grid grid-cols-7 gap-2">
        {WEEKDAY_LABELS.map((day) => (
          <div
            key={day}
            className="text-muted-foreground py-2 text-center text-sm font-medium"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="mt-2 grid grid-cols-7 gap-2">
        {calendarDays.map((day) => (
          <CalendarDayCell
            key={day.date.toISOString()}
            day={day}
            orgSlug={orgSlug}
          />
        ))}
      </div>
    </GlowCard>
  );
}
