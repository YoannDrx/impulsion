import { prisma } from "@/lib/prisma";
import type { PainLocation } from "@/lib/impulsion/types";
import {
  type PainReportWithAthlete,
  type LocationStats,
  type AthleteInjurySummary,
  type TeamInjuryOverview,
  ALERT_INTENSITY_THRESHOLD,
} from "./injuries.types";

/**
 * Get all pain reports for an organization (for coach view)
 */
export async function getTeamPainReports(
  orgId: string,
  options?: {
    activeOnly?: boolean;
    limit?: number;
  },
): Promise<PainReportWithAthlete[]> {
  const { activeOnly = false, limit = 50 } = options ?? {};

  const reports = await prisma.$queryRaw<
    {
      id: string;
      athleteId: string;
      athleteName: string;
      athleteImage: string | null;
      location: string;
      side: string;
      intensity: number;
      description: string | null;
      isResolved: boolean;
      resolvedAt: Date | null;
      coachNotes: string | null;
      createdAt: Date;
      sessionTitle: string | null;
    }[]
  >`
    SELECT
      pr.id,
      pr."athleteId",
      u.name as "athleteName",
      u.image as "athleteImage",
      pr.location,
      pr.side,
      pr.intensity,
      pr.description,
      pr."isResolved",
      pr."resolvedAt",
      pr."coachNotes",
      pr."createdAt",
      cs.title as "sessionTitle"
    FROM pain_report pr
    JOIN "user" u ON pr."athleteId" = u.id
    JOIN member m ON u.id = m."userId" AND m."organizationId" = ${orgId}
    LEFT JOIN session_feedback sf ON pr."feedbackId" = sf.id
    LEFT JOIN coaching_session cs ON sf."sessionId" = cs.id
    WHERE m."organizationId" = ${orgId}
      ${activeOnly ? prisma.$queryRaw`AND pr."isResolved" = false` : prisma.$queryRaw``}
    ORDER BY pr."createdAt" DESC
    LIMIT ${limit}
  `;

  return reports.map((r) => ({
    ...r,
    location: r.location as PainLocation,
    side: r.side as PainReportWithAthlete["side"],
  }));
}

/**
 * Get critical alerts (pain intensity >= threshold)
 */
export async function getCriticalAlerts(
  orgId: string,
): Promise<PainReportWithAthlete[]> {
  const reports = await prisma.$queryRaw<
    {
      id: string;
      athleteId: string;
      athleteName: string;
      athleteImage: string | null;
      location: string;
      side: string;
      intensity: number;
      description: string | null;
      isResolved: boolean;
      resolvedAt: Date | null;
      coachNotes: string | null;
      createdAt: Date;
      sessionTitle: string | null;
    }[]
  >`
    SELECT
      pr.id,
      pr."athleteId",
      u.name as "athleteName",
      u.image as "athleteImage",
      pr.location,
      pr.side,
      pr.intensity,
      pr.description,
      pr."isResolved",
      pr."resolvedAt",
      pr."coachNotes",
      pr."createdAt",
      cs.title as "sessionTitle"
    FROM pain_report pr
    JOIN "user" u ON pr."athleteId" = u.id
    JOIN member m ON u.id = m."userId" AND m."organizationId" = ${orgId}
    LEFT JOIN session_feedback sf ON pr."feedbackId" = sf.id
    LEFT JOIN coaching_session cs ON sf."sessionId" = cs.id
    WHERE m."organizationId" = ${orgId}
      AND pr."isResolved" = false
      AND pr.intensity >= ${ALERT_INTENSITY_THRESHOLD}
    ORDER BY pr.intensity DESC, pr."createdAt" DESC
  `;

  return reports.map((r) => ({
    ...r,
    location: r.location as PainLocation,
    side: r.side as PainReportWithAthlete["side"],
  }));
}

/**
 * Get location statistics
 */
export async function getLocationStats(
  orgId: string,
): Promise<LocationStats[]> {
  const stats = await prisma.$queryRaw<
    {
      location: string;
      count: bigint;
      avgIntensity: number;
      activeCount: bigint;
    }[]
  >`
    SELECT
      pr.location,
      COUNT(*) as count,
      AVG(pr.intensity) as "avgIntensity",
      SUM(CASE WHEN pr."isResolved" = false THEN 1 ELSE 0 END) as "activeCount"
    FROM pain_report pr
    JOIN "user" u ON pr."athleteId" = u.id
    JOIN member m ON u.id = m."userId" AND m."organizationId" = ${orgId}
    WHERE m."organizationId" = ${orgId}
    GROUP BY pr.location
    ORDER BY count DESC
  `;

  return stats.map((s) => ({
    location: s.location as PainLocation,
    count: Number(s.count),
    averageIntensity: Math.round(s.avgIntensity * 10) / 10,
    activeCount: Number(s.activeCount),
  }));
}

/**
 * Get athlete injury summaries
 */
export async function getAthleteSummaries(
  orgId: string,
): Promise<AthleteInjurySummary[]> {
  // Get all athletes with their pain report counts
  const athletes = await prisma.$queryRaw<
    {
      id: string;
      name: string;
      image: string | null;
      totalReports: bigint;
      activeReports: bigint;
      resolvedReports: bigint;
      highestIntensity: number | null;
      mostAffectedLocation: string | null;
    }[]
  >`
    SELECT
      u.id,
      u.name,
      u.image,
      COUNT(pr.id) as "totalReports",
      SUM(CASE WHEN pr."isResolved" = false THEN 1 ELSE 0 END) as "activeReports",
      SUM(CASE WHEN pr."isResolved" = true THEN 1 ELSE 0 END) as "resolvedReports",
      MAX(CASE WHEN pr."isResolved" = false THEN pr.intensity ELSE NULL END) as "highestIntensity",
      (
        SELECT pr2.location
        FROM pain_report pr2
        WHERE pr2."athleteId" = u.id
        GROUP BY pr2.location
        ORDER BY COUNT(*) DESC
        LIMIT 1
      ) as "mostAffectedLocation"
    FROM "user" u
    JOIN member m ON u.id = m."userId"
    LEFT JOIN pain_report pr ON u.id = pr."athleteId"
    WHERE m."organizationId" = ${orgId}
      AND m.role = 'member'
    GROUP BY u.id, u.name, u.image
    HAVING COUNT(pr.id) > 0
    ORDER BY "activeReports" DESC, "totalReports" DESC
  `;

  // Get recent reports for each athlete in parallel
  const summaries = await Promise.all(
    athletes.map(async (athlete) => {
      const recentReports = await prisma.$queryRaw<
        {
          id: string;
          location: string;
          side: string;
          intensity: number;
          description: string | null;
          isResolved: boolean;
          resolvedAt: Date | null;
          coachNotes: string | null;
          createdAt: Date;
          sessionTitle: string | null;
        }[]
      >`
        SELECT
          pr.id,
          pr.location,
          pr.side,
          pr.intensity,
          pr.description,
          pr."isResolved",
          pr."resolvedAt",
          pr."coachNotes",
          pr."createdAt",
          cs.title as "sessionTitle"
        FROM pain_report pr
        LEFT JOIN session_feedback sf ON pr."feedbackId" = sf.id
        LEFT JOIN coaching_session cs ON sf."sessionId" = cs.id
        WHERE pr."athleteId" = ${athlete.id}
        ORDER BY pr."createdAt" DESC
        LIMIT 3
      `;

      return {
        athleteId: athlete.id,
        athleteName: athlete.name,
        athleteImage: athlete.image,
        totalReports: Number(athlete.totalReports),
        activeReports: Number(athlete.activeReports),
        resolvedReports: Number(athlete.resolvedReports),
        highestIntensity: athlete.highestIntensity,
        mostAffectedLocation:
          athlete.mostAffectedLocation as PainLocation | null,
        recentReports: recentReports.map((r) => ({
          ...r,
          athleteId: athlete.id,
          athleteName: athlete.name,
          athleteImage: athlete.image,
          location: r.location as PainLocation,
          side: r.side as PainReportWithAthlete["side"],
        })),
      };
    }),
  );

  return summaries;
}

/**
 * Get complete team injury overview
 */
export async function getTeamInjuryOverview(
  orgId: string,
): Promise<TeamInjuryOverview> {
  const [recentReports, locationStats, athleteSummaries, criticalAlerts] =
    await Promise.all([
      getTeamPainReports(orgId, { limit: 10 }),
      getLocationStats(orgId),
      getAthleteSummaries(orgId),
      getCriticalAlerts(orgId),
    ]);

  const totalReports = locationStats.reduce((sum, s) => sum + s.count, 0);
  const activeReports = locationStats.reduce(
    (sum, s) => sum + s.activeCount,
    0,
  );

  return {
    totalReports,
    activeReports,
    criticalAlerts: criticalAlerts.length,
    locationStats,
    athleteSummaries,
    recentReports,
  };
}
