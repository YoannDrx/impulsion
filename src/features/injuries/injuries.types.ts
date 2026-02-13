/**
 * Injury Tracking Types
 *
 * Types for comprehensive injury/pain tracking and analysis
 */

import type { PainLocation, PainSide } from "@/lib/impulsion/types";

/**
 * Pain report with athlete info for coach view
 */
export type PainReportWithAthlete = {
  id: string;
  athleteId: string;
  athleteName: string;
  athleteImage: string | null;
  location: PainLocation;
  side: PainSide;
  intensity: number;
  description: string | null;
  isResolved: boolean;
  resolvedAt: Date | null;
  coachNotes: string | null;
  createdAt: Date;
  sessionTitle: string | null;
};

/**
 * Injury severity level based on intensity
 */
export type InjurySeverity = "minor" | "moderate" | "severe" | "critical";

/**
 * Get severity from intensity
 */
export function getInjurySeverity(intensity: number): InjurySeverity {
  if (intensity <= 3) return "minor";
  if (intensity <= 5) return "moderate";
  if (intensity <= 7) return "severe";
  return "critical";
}

/**
 * Severity configuration
 */
export const INJURY_SEVERITY_CONFIG: Record<
  InjurySeverity,
  {
    label: string;
    color: string;
    bgColor: string;
    description: string;
  }
> = {
  minor: {
    label: "Mineur",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    description: "Gêne légère, entraînement possible",
  },
  moderate: {
    label: "Modéré",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    description: "Douleur modérée, adapter l'entraînement",
  },
  severe: {
    label: "Sévère",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    description: "Douleur importante, repos partiel recommandé",
  },
  critical: {
    label: "Critique",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    description: "Douleur intense, repos complet nécessaire",
  },
};

/**
 * Body location statistics
 */
export type LocationStats = {
  location: PainLocation;
  count: number;
  averageIntensity: number;
  activeCount: number;
};

/**
 * Athlete injury summary
 */
export type AthleteInjurySummary = {
  athleteId: string;
  athleteName: string;
  athleteImage: string | null;
  totalReports: number;
  activeReports: number;
  resolvedReports: number;
  highestIntensity: number | null;
  mostAffectedLocation: PainLocation | null;
  recentReports: PainReportWithAthlete[];
};

/**
 * Team injury overview
 */
export type TeamInjuryOverview = {
  totalReports: number;
  activeReports: number;
  criticalAlerts: number; // intensity >= 7
  locationStats: LocationStats[];
  athleteSummaries: AthleteInjurySummary[];
  recentReports: PainReportWithAthlete[];
};

/**
 * Alert threshold for coach notification
 */
export const ALERT_INTENSITY_THRESHOLD = 6;
