"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/impulsion/glow-card";
import { StatCard } from "@/components/impulsion/stat-card";
import {
  PAIN_LOCATION_LABELS,
  PAIN_SIDE_LABELS,
  type PainLocation,
} from "@/lib/impulsion/types";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "motion/react";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Clock,
  Heart,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { resolvePainReport } from "@/features/pain-report";
import {
  type TeamInjuryOverview,
  type PainReportWithAthlete,
  getInjurySeverity,
  INJURY_SEVERITY_CONFIG,
  ALERT_INTENSITY_THRESHOLD,
} from "./injuries.types";

type InjuriesDashboardProps = {
  data: TeamInjuryOverview;
  onRefresh?: () => void;
};

export function InjuriesDashboard({ data, onRefresh }: InjuriesDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Signalements totaux"
          value={data.totalReports}
          icon={<Activity className="size-5" />}
        />
        <StatCard
          label="Actifs"
          value={data.activeReports}
          icon={<Clock className="size-5" />}
          accent={data.activeReports > 0 ? "warning" : "none"}
        />
        <StatCard
          label="Alertes critiques"
          value={data.criticalAlerts}
          icon={<AlertTriangle className="size-5" />}
          accent={data.criticalAlerts > 0 ? "danger" : "success"}
          trend={
            data.criticalAlerts > 0
              ? {
                  value: `≥ ${ALERT_INTENSITY_THRESHOLD}/10`,
                  direction: "down",
                }
              : { value: "Aucune", direction: "up" }
          }
        />
        <StatCard
          label="Zones touchées"
          value={data.locationStats.length}
          icon={<Heart className="size-5" />}
        />
      </div>

      {/* Critical Alerts */}
      {data.criticalAlerts > 0 && (
        <GlowCard variant="default" glow="intense">
          <div className="p-6">
            <div className="mb-4 flex items-center gap-2 text-red-500">
              <AlertTriangle className="size-5" />
              <h3 className="font-semibold">
                Alertes critiques ({data.criticalAlerts})
              </h3>
            </div>
            <div className="space-y-3">
              {data.recentReports
                .filter(
                  (r) =>
                    r.intensity >= ALERT_INTENSITY_THRESHOLD && !r.isResolved,
                )
                .slice(0, 3)
                .map((report) => (
                  <CriticalAlertCard
                    key={report.id}
                    report={report}
                    onResolved={onRefresh}
                  />
                ))}
            </div>
          </div>
        </GlowCard>
      )}

      {/* Body Location Stats */}
      {data.locationStats.length > 0 && (
        <GlowCard variant="default" glow="none">
          <div className="p-6">
            <h3 className="mb-4 font-semibold">Zones les plus touchées</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {data.locationStats.slice(0, 6).map((stat) => (
                <LocationStatCard key={stat.location} stat={stat} />
              ))}
            </div>
          </div>
        </GlowCard>
      )}

      {/* Athletes with injuries */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Suivi par athlète</h3>

        {data.athleteSummaries.length === 0 ? (
          <GlowCard variant="default" glow="none">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle className="text-success mb-4 size-12" />
              <p className="font-medium">Aucune blessure signalée</p>
              <p className="text-muted-foreground mt-1 text-sm">
                Tous vos athlètes sont en bonne santé
              </p>
            </div>
          </GlowCard>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {data.athleteSummaries.map((summary, index) => (
              <AthleteInjuryCard
                key={summary.athleteId}
                summary={summary}
                index={index}
                onResolved={onRefresh}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

type CriticalAlertCardProps = {
  report: PainReportWithAthlete;
  onResolved?: () => void;
};

function CriticalAlertCard({ report, onResolved }: CriticalAlertCardProps) {
  const [isResolving, setIsResolving] = useState(false);
  const severity = getInjurySeverity(report.intensity);
  const severityConfig = INJURY_SEVERITY_CONFIG[severity];

  const handleResolve = async () => {
    setIsResolving(true);
    const result = await resolvePainReport(report.id);
    setIsResolving(false);

    if (result.success) {
      toast.success("Signalement résolu");
      onResolved?.();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="flex items-center justify-between rounded-lg border border-red-500/30 bg-red-500/5 p-3">
      <div className="flex items-center gap-3">
        <Avatar className="size-10">
          {report.athleteImage && (
            <AvatarImage src={report.athleteImage} alt={report.athleteName} />
          )}
          <AvatarFallback>
            {report.athleteName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{report.athleteName}</span>
            <Badge className={cn(severityConfig.bgColor, severityConfig.color)}>
              {report.intensity}/10
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            {PAIN_LOCATION_LABELS[report.location]} (
            {PAIN_SIDE_LABELS[report.side]})
            {report.description && ` - ${report.description}`}
          </p>
        </div>
      </div>
      <Button
        size="sm"
        variant="outline"
        onClick={handleResolve}
        disabled={isResolving}
      >
        {isResolving ? "..." : "Résoudre"}
      </Button>
    </div>
  );
}

type LocationStatCardProps = {
  stat: {
    location: PainLocation;
    count: number;
    averageIntensity: number;
    activeCount: number;
  };
};

function LocationStatCard({ stat }: LocationStatCardProps) {
  const severity = getInjurySeverity(stat.averageIntensity);
  const severityConfig = INJURY_SEVERITY_CONFIG[severity];

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg border p-3",
        stat.activeCount > 0 ? severityConfig.bgColor : "bg-muted/30",
      )}
    >
      <div>
        <p className="font-medium">{PAIN_LOCATION_LABELS[stat.location]}</p>
        <p className="text-muted-foreground text-sm">
          {stat.count} signalement{stat.count > 1 ? "s" : ""}
        </p>
      </div>
      <div className="text-right">
        <p className={cn("text-lg font-bold", severityConfig.color)}>
          {stat.averageIntensity}
        </p>
        <p className="text-muted-foreground text-xs">moy.</p>
      </div>
    </div>
  );
}

type AthleteInjuryCardProps = {
  summary: TeamInjuryOverview["athleteSummaries"][0];
  index: number;
  onResolved?: () => void;
};

function AthleteInjuryCard({
  summary,
  index,
  onResolved,
}: AthleteInjuryCardProps) {
  const [expanded, setExpanded] = useState(false);
  const hasActiveIssues = summary.activeReports > 0;
  const severity = summary.highestIntensity
    ? getInjurySeverity(summary.highestIntensity)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <GlowCard
        variant="default"
        glow={hasActiveIssues ? "intense" : "none"}
        className={cn(
          "overflow-hidden",
          hasActiveIssues && "border-orange-500/30",
        )}
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                {summary.athleteImage && (
                  <AvatarImage
                    src={summary.athleteImage}
                    alt={summary.athleteName}
                  />
                )}
                <AvatarFallback>
                  {summary.athleteName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">{summary.athleteName}</h4>
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <span>
                    {summary.totalReports} signalement
                    {summary.totalReports > 1 ? "s" : ""}
                  </span>
                  {summary.activeReports > 0 && (
                    <Badge variant="outline" className="text-orange-500">
                      {summary.activeReports} actif
                      {summary.activeReports > 1 ? "s" : ""}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Severity indicator */}
            {severity && summary.highestIntensity && (
              <div
                className={cn(
                  "flex items-center gap-1 rounded-full px-2 py-1 text-sm font-medium",
                  INJURY_SEVERITY_CONFIG[severity].bgColor,
                  INJURY_SEVERITY_CONFIG[severity].color,
                )}
              >
                {summary.highestIntensity}/10
              </div>
            )}
          </div>

          {/* Most affected location */}
          {summary.mostAffectedLocation && (
            <div className="text-muted-foreground mt-3 text-sm">
              Zone la plus touchée :{" "}
              <span className="font-medium">
                {PAIN_LOCATION_LABELS[summary.mostAffectedLocation]}
              </span>
            </div>
          )}

          {/* Expand button */}
          {summary.recentReports.length > 0 && (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="text-muted-foreground hover:text-foreground mt-3 flex items-center gap-1 text-sm transition-colors"
            >
              <ChevronRight
                className={cn(
                  "size-4 transition-transform",
                  expanded && "rotate-90",
                )}
              />
              {expanded ? "Masquer" : "Voir"} l'historique
            </button>
          )}

          {/* Recent reports */}
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 space-y-2 border-t pt-3"
            >
              {summary.recentReports.map((report) => (
                <ReportListItem
                  key={report.id}
                  report={report}
                  onResolved={onResolved}
                />
              ))}
            </motion.div>
          )}
        </div>
      </GlowCard>
    </motion.div>
  );
}

type ReportListItemProps = {
  report: PainReportWithAthlete;
  onResolved?: () => void;
};

function ReportListItem({ report, onResolved }: ReportListItemProps) {
  const [isResolving, setIsResolving] = useState(false);
  const severity = getInjurySeverity(report.intensity);
  const severityConfig = INJURY_SEVERITY_CONFIG[severity];

  const handleResolve = async () => {
    setIsResolving(true);
    const result = await resolvePainReport(report.id);
    setIsResolving(false);

    if (result.success) {
      toast.success("Signalement résolu");
      onResolved?.();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg p-2 text-sm",
        report.isResolved ? "bg-muted/30" : severityConfig.bgColor,
      )}
    >
      <div className="flex items-center gap-2">
        <Badge
          className={cn(
            report.isResolved
              ? "bg-muted text-muted-foreground"
              : cn(severityConfig.bgColor, severityConfig.color),
          )}
        >
          {report.intensity}/10
        </Badge>
        <span>
          {PAIN_LOCATION_LABELS[report.location]} (
          {PAIN_SIDE_LABELS[report.side]})
        </span>
        <span className="text-muted-foreground">
          {formatDistanceToNow(report.createdAt, {
            addSuffix: true,
            locale: fr,
          })}
        </span>
      </div>

      {!report.isResolved && (
        <Button
          size="sm"
          variant="ghost"
          onClick={handleResolve}
          disabled={isResolving}
          className="h-6 px-2 text-xs"
        >
          {isResolving ? "..." : "Résoudre"}
        </Button>
      )}

      {report.isResolved && <CheckCircle className="text-success size-4" />}
    </div>
  );
}
