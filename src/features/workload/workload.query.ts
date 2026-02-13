import { prisma } from "@/lib/prisma";
import {
  startOfDay,
  endOfDay,
  subDays,
  endOfWeek,
  eachDayOfInterval,
  eachWeekOfInterval,
  isWithinInterval,
} from "date-fns";
import {
  type SessionLoad,
  type DailyLoad,
  type WeeklyLoad,
  type AcwrResult,
  type AthleteWorkloadSummary,
  type TeamWorkloadOverview,
  getAcwrRiskLevel,
} from "./workload.types";

/**
 * Get session loads for an athlete over a date range
 */
export async function getAthleteSessionLoads(
  athleteId: string,
  startDate: Date,
  endDate: Date,
): Promise<SessionLoad[]> {
  const feedbacks = await prisma.$queryRaw<
    {
      id: string;
      createdAt: Date;
      rpe: number;
      actualDuration: number | null;
      sessionTitle: string;
      sessionDuration: number;
    }[]
  >`
    SELECT
      sf.id,
      sf."createdAt",
      sf.rpe,
      sf."actualDuration",
      cs.title as "sessionTitle",
      cs."durationMinutes" as "sessionDuration"
    FROM session_feedback sf
    JOIN coaching_session cs ON sf."sessionId" = cs.id
    WHERE sf."athleteId" = ${athleteId}
      AND sf."createdAt" >= ${startDate}
      AND sf."createdAt" <= ${endDate}
    ORDER BY sf."createdAt" DESC
  `;

  return feedbacks.map((f) => {
    const duration = f.actualDuration ?? f.sessionDuration;
    return {
      id: f.id,
      date: f.createdAt,
      sessionTitle: f.sessionTitle,
      rpe: f.rpe,
      duration,
      load: f.rpe * duration,
    };
  });
}

/**
 * Aggregate session loads into daily loads
 */
export function aggregateDailyLoads(
  sessions: SessionLoad[],
  startDate: Date,
  endDate: Date,
): DailyLoad[] {
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  return days.map((day) => {
    const dayStart = startOfDay(day);
    const dayEnd = endOfDay(day);

    const daySessions = sessions.filter((s) =>
      isWithinInterval(s.date, { start: dayStart, end: dayEnd }),
    );

    return {
      date: day,
      totalLoad: daySessions.reduce((sum, s) => sum + s.load, 0),
      sessionCount: daySessions.length,
      sessions: daySessions,
    };
  });
}

/**
 * Aggregate session loads into weekly loads
 */
export function aggregateWeeklyLoads(
  sessions: SessionLoad[],
  startDate: Date,
  endDate: Date,
): WeeklyLoad[] {
  const weeks = eachWeekOfInterval(
    { start: startDate, end: endDate },
    { weekStartsOn: 1 }, // Monday
  );

  return weeks.map((weekStart) => {
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });

    const weekSessions = sessions.filter((s) =>
      isWithinInterval(s.date, { start: weekStart, end: weekEnd }),
    );

    const totalLoad = weekSessions.reduce((sum, s) => sum + s.load, 0);

    return {
      weekStart,
      weekEnd,
      totalLoad,
      sessionCount: weekSessions.length,
      avgDailyLoad: totalLoad / 7,
    };
  });
}

/**
 * Calculate ACWR for an athlete
 *
 * Uses exponentially weighted moving average (EWMA) approach:
 * - Acute load: 7-day rolling sum
 * - Chronic load: 28-day rolling average (divided by 4 to get weekly avg)
 */
export function calculateAcwr(
  dailyLoads: DailyLoad[],
  today: Date = new Date(),
): AcwrResult {
  const last7Days = dailyLoads.filter((d) => {
    const daysAgo = Math.floor(
      (today.getTime() - d.date.getTime()) / (1000 * 60 * 60 * 24),
    );
    return daysAgo >= 0 && daysAgo < 7;
  });

  const last28Days = dailyLoads.filter((d) => {
    const daysAgo = Math.floor(
      (today.getTime() - d.date.getTime()) / (1000 * 60 * 60 * 24),
    );
    return daysAgo >= 0 && daysAgo < 28;
  });

  const acuteLoad = last7Days.reduce((sum, d) => sum + d.totalLoad, 0);
  const chronicTotalLoad = last28Days.reduce((sum, d) => sum + d.totalLoad, 0);
  const chronicLoad = chronicTotalLoad / 4; // Average weekly load

  // Calculate previous week for trend
  const prev7to14Days = dailyLoads.filter((d) => {
    const daysAgo = Math.floor(
      (today.getTime() - d.date.getTime()) / (1000 * 60 * 60 * 24),
    );
    return daysAgo >= 7 && daysAgo < 14;
  });
  const previousAcuteLoad = prev7to14Days.reduce(
    (sum, d) => sum + d.totalLoad,
    0,
  );

  let trend: "increasing" | "stable" | "decreasing" = "stable";
  if (acuteLoad > previousAcuteLoad * 1.1) {
    trend = "increasing";
  } else if (acuteLoad < previousAcuteLoad * 0.9) {
    trend = "decreasing";
  }

  const acwr = chronicLoad > 0 ? acuteLoad / chronicLoad : null;

  return {
    acuteLoad,
    chronicLoad,
    acwr,
    riskLevel: getAcwrRiskLevel(acwr),
    trend,
  };
}

/**
 * Check if athlete has recent pain reports (last 7 days)
 */
async function getRecentPain(
  athleteId: string,
): Promise<{ hasPain: boolean; intensity: number | null }> {
  const sevenDaysAgo = subDays(new Date(), 7);

  const painReports = await prisma.$queryRaw<
    {
      intensity: number;
    }[]
  >`
    SELECT intensity
    FROM pain_report
    WHERE "athleteId" = ${athleteId}
      AND "createdAt" >= ${sevenDaysAgo}
      AND "isResolved" = false
    ORDER BY intensity DESC
    LIMIT 1
  `;

  if (painReports.length === 0) {
    return { hasPain: false, intensity: null };
  }

  return { hasPain: true, intensity: painReports[0].intensity };
}

/**
 * Get complete workload summary for an athlete
 */
export async function getAthleteWorkloadSummary(
  athleteId: string,
  athleteName: string,
  athleteImage: string | null,
): Promise<AthleteWorkloadSummary> {
  const today = new Date();
  const startDate = subDays(today, 35); // 5 weeks for trend analysis

  const sessions = await getAthleteSessionLoads(athleteId, startDate, today);
  const dailyLoads = aggregateDailyLoads(sessions, startDate, today);
  const weeklyLoads = aggregateWeeklyLoads(sessions, startDate, today);
  const acwr = calculateAcwr(dailyLoads, today);
  const { hasPain, intensity } = await getRecentPain(athleteId);

  const lastSession = sessions.length > 0 ? sessions[0] : null;

  return {
    athleteId,
    athleteName,
    athleteImage,
    acwr,
    weeklyLoads,
    dailyLoads,
    lastSessionDate: lastSession?.date ?? null,
    hasRecentPain: hasPain,
    painIntensity: intensity,
  };
}

/**
 * Get team workload overview for a coach
 */
export async function getTeamWorkloadOverview(
  orgId: string,
): Promise<TeamWorkloadOverview> {
  // Get all athletes in the organization
  const athletes = await prisma.$queryRaw<
    {
      id: string;
      name: string;
      image: string | null;
    }[]
  >`
    SELECT u.id, u.name, u.image
    FROM "user" u
    JOIN member m ON u.id = m."userId"
    WHERE m."organizationId" = ${orgId}
      AND m.role = 'member'
    ORDER BY u.name ASC
  `;

  const summaries = await Promise.all(
    athletes.map(async (athlete) =>
      getAthleteWorkloadSummary(athlete.id, athlete.name, athlete.image),
    ),
  );

  // Calculate team stats
  const validAcwrs = summaries
    .map((s) => s.acwr.acwr)
    .filter((a): a is number => a !== null);

  const averageAcwr =
    validAcwrs.length > 0
      ? validAcwrs.reduce((a, b) => a + b, 0) / validAcwrs.length
      : null;

  const athletesAtRisk = summaries.filter(
    (s) => s.acwr.riskLevel === "caution" || s.acwr.riskLevel === "danger",
  ).length;

  const athletesOptimal = summaries.filter(
    (s) => s.acwr.riskLevel === "optimal",
  ).length;

  const athletesUndertrained = summaries.filter(
    (s) => s.acwr.riskLevel === "undertrained",
  ).length;

  return {
    athletes: summaries,
    averageAcwr,
    athletesAtRisk,
    athletesOptimal,
    athletesUndertrained,
  };
}
