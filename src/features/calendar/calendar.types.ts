import type { SessionStatus, SessionType } from "@/lib/impulsion/types";

/**
 * Session data for calendar display
 */
export type CalendarSession = {
  id: string;
  title: string;
  type: SessionType;
  status: SessionStatus;
  scheduledAt: Date;
  durationMinutes: number;
  targetRpe: number | null;
  assigneeCount: number;
  feedbackCount: number;
};

/**
 * Day data for calendar grid
 */
export type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  sessions: CalendarSession[];
};

/**
 * Calendar view state
 */
export type CalendarViewState = {
  year: number;
  month: number; // 0-11
};
