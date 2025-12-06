"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GlowCard } from "@/components/impulsion/glow-card";
import { StatCard } from "@/components/impulsion/stat-card";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  Users,
} from "lucide-react";
import { AcwrGauge } from "./acwr-gauge";
import { WorkloadChart } from "./workload-chart";
import {
  type TeamWorkloadOverview,
  type AthleteWorkloadSummary,
  ACWR_RISK_CONFIG,
} from "./workload.types";

type TeamWorkloadDashboardProps = {
  data: TeamWorkloadOverview;
};

export function TeamWorkloadDashboard({ data }: TeamWorkloadDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Athlètes"
          value={data.athletes.length}
          icon={<Users className="size-5" />}
        />
        <StatCard
          label="Zone optimale"
          value={data.athletesOptimal}
          icon={<CheckCircle className="size-5" />}
          accent="success"
          trend={{
            value: `${data.athletes.length > 0 ? Math.round((data.athletesOptimal / data.athletes.length) * 100) : 0}%`,
            direction: "up",
          }}
        />
        <StatCard
          label="À risque"
          value={data.athletesAtRisk}
          icon={<AlertTriangle className="size-5" />}
          accent={data.athletesAtRisk > 0 ? "danger" : "none"}
          trend={
            data.athletesAtRisk > 0
              ? { value: "Attention", direction: "down" }
              : undefined
          }
        />
        <StatCard
          label="Sous-entraînés"
          value={data.athletesUndertrained}
          icon={<TrendingDown className="size-5" />}
          accent={data.athletesUndertrained > 0 ? "warning" : "none"}
        />
      </div>

      {/* ACWR moyen */}
      {data.averageAcwr !== null && (
        <GlowCard variant="default" glow="none">
          <div className="flex items-center justify-between p-6">
            <div>
              <h3 className="text-lg font-semibold">ACWR Moyen de l'équipe</h3>
              <p className="text-muted-foreground text-sm">
                Ratio charge aiguë / chronique
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-3xl font-bold">
                  {data.averageAcwr.toFixed(2)}
                </div>
                <div className="text-muted-foreground text-sm">
                  {data.averageAcwr < 0.8
                    ? "Charge insuffisante"
                    : data.averageAcwr <= 1.3
                      ? "Zone optimale"
                      : data.averageAcwr <= 1.5
                        ? "Attention requise"
                        : "Risque élevé"}
                </div>
              </div>
              <Activity
                className={cn(
                  "size-8",
                  data.averageAcwr < 0.8
                    ? "text-blue-500"
                    : data.averageAcwr <= 1.3
                      ? "text-green-500"
                      : data.averageAcwr <= 1.5
                        ? "text-yellow-500"
                        : "text-red-500",
                )}
              />
            </div>
          </div>
        </GlowCard>
      )}

      {/* Athletes List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Suivi individuel</h3>

        {data.athletes.length === 0 ? (
          <GlowCard variant="default" glow="none">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="text-muted-foreground mb-4 size-12" />
              <p className="text-muted-foreground">
                Aucun athlète dans l'équipe
              </p>
            </div>
          </GlowCard>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {data.athletes.map((athlete, index) => (
              <AthleteWorkloadCard
                key={athlete.athleteId}
                athlete={athlete}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

type AthleteWorkloadCardProps = {
  athlete: AthleteWorkloadSummary;
  index: number;
};

function AthleteWorkloadCard({ athlete, index }: AthleteWorkloadCardProps) {
  const riskConfig = ACWR_RISK_CONFIG[athlete.acwr.riskLevel];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <GlowCard
        variant="default"
        glow={
          athlete.acwr.riskLevel === "danger" ||
          athlete.acwr.riskLevel === "caution"
            ? "intense"
            : "none"
        }
        className={cn(
          "overflow-hidden transition-all",
          athlete.hasRecentPain && "ring-1 ring-red-500/50",
        )}
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                {athlete.athleteImage && (
                  <AvatarImage
                    src={athlete.athleteImage}
                    alt={athlete.athleteName}
                  />
                )}
                <AvatarFallback>
                  {athlete.athleteName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">{athlete.athleteName}</h4>
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  {athlete.lastSessionDate ? (
                    <span>
                      Dernière séance :{" "}
                      {formatDistanceToNow(athlete.lastSessionDate, {
                        addSuffix: true,
                        locale: fr,
                      })}
                    </span>
                  ) : (
                    <span>Aucune séance récente</span>
                  )}
                </div>
              </div>
            </div>

            {/* Risk Badge */}
            <div
              className={cn(
                "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
                riskConfig.bgColor,
                riskConfig.color,
              )}
            >
              {athlete.acwr.riskLevel === "danger" && (
                <AlertTriangle className="size-3" />
              )}
              {riskConfig.label}
            </div>
          </div>

          {/* Content */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            {/* ACWR Gauge */}
            <div className="flex justify-center">
              <AcwrGauge acwr={athlete.acwr} size="sm" showDetails={false} />
            </div>

            {/* Chart */}
            <WorkloadChart
              weeklyLoads={athlete.weeklyLoads}
              className="h-full"
            />
          </div>

          {/* Pain Alert */}
          {athlete.hasRecentPain && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-500/10 p-2 text-sm text-red-500">
              <AlertTriangle className="size-4" />
              <span>
                Douleur signalée (intensité {athlete.painIntensity}/10)
              </span>
            </div>
          )}

          {/* Load Details */}
          <div className="text-muted-foreground mt-3 flex justify-between text-xs">
            <span>Charge 7j: {Math.round(athlete.acwr.acuteLoad)}</span>
            <span>Moy. hebdo: {Math.round(athlete.acwr.chronicLoad)}</span>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}
