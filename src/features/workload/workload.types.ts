/**
 * Workload Management Types
 *
 * ACWR (Acute Chronic Workload Ratio) explanation:
 * - Acute load: Training load from the past 7 days
 * - Chronic load: Average weekly training load from the past 28 days
 * - ACWR = Acute Load / Chronic Load
 *
 * Risk zones:
 * - < 0.8: Under-training (fitness loss risk)
 * - 0.8 - 1.3: Optimal (sweet spot)
 * - 1.3 - 1.5: Caution (elevated injury risk)
 * - > 1.5: Danger (high injury risk)
 */

/**
 * Single session load entry
 */
export type SessionLoad = {
  id: string;
  date: Date;
  sessionTitle: string;
  rpe: number;
  duration: number; // in minutes
  load: number; // RPE × duration
};

/**
 * Daily aggregated load
 */
export type DailyLoad = {
  date: Date;
  totalLoad: number;
  sessionCount: number;
  sessions: SessionLoad[];
};

/**
 * Weekly aggregated load
 */
export type WeeklyLoad = {
  weekStart: Date;
  weekEnd: Date;
  totalLoad: number;
  sessionCount: number;
  avgDailyLoad: number;
};

/**
 * ACWR risk level
 */
export type AcwrRiskLevel = "undertrained" | "optimal" | "caution" | "danger";

/**
 * ACWR calculation result
 */
export type AcwrResult = {
  acuteLoad: number; // 7-day load
  chronicLoad: number; // 28-day average weekly load
  acwr: number | null; // null if chronic load is 0
  riskLevel: AcwrRiskLevel;
  trend: "increasing" | "stable" | "decreasing"; // compared to previous week
};

/**
 * Athlete workload summary
 */
export type AthleteWorkloadSummary = {
  athleteId: string;
  athleteName: string;
  athleteImage: string | null;
  acwr: AcwrResult;
  weeklyLoads: WeeklyLoad[];
  dailyLoads: DailyLoad[];
  lastSessionDate: Date | null;
  hasRecentPain: boolean;
  painIntensity: number | null;
};

/**
 * Team workload overview
 */
export type TeamWorkloadOverview = {
  athletes: AthleteWorkloadSummary[];
  averageAcwr: number | null;
  athletesAtRisk: number;
  athletesOptimal: number;
  athletesUndertrained: number;
};

/**
 * Get risk level from ACWR value
 */
export function getAcwrRiskLevel(acwr: number | null): AcwrRiskLevel {
  if (acwr === null) return "undertrained";
  if (acwr < 0.8) return "undertrained";
  if (acwr <= 1.3) return "optimal";
  if (acwr <= 1.5) return "caution";
  return "danger";
}

/**
 * Get risk level configuration
 */
export const ACWR_RISK_CONFIG: Record<
  AcwrRiskLevel,
  {
    label: string;
    description: string;
    color: string;
    bgColor: string;
    borderColor: string;
  }
> = {
  undertrained: {
    label: "Sous-entraîné",
    description: "Charge insuffisante, risque de perte de forme",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
  },
  optimal: {
    label: "Optimal",
    description: "Zone idéale de progression",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
  },
  caution: {
    label: "Attention",
    description: "Risque de blessure élevé",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
  },
  danger: {
    label: "Danger",
    description: "Risque de blessure très élevé",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
  },
};
