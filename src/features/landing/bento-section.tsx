"use client";

import { BentoGrid, BentoGridItem } from "@/components/nowts/bentoo";
import { Loader } from "@/components/nowts/loader";
import { Typography } from "@/components/nowts/typography";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import {
  Activity,
  Calendar,
  CheckCircle,
  PlayCircle,
  Trophy,
  Users,
} from "lucide-react";
import type { Variants } from "motion/react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { SectionLayout } from "./section-layout";

export function BentoGridSection() {
  const t = useTranslations("landing.features");

  const items = [
    {
      title: t("calendar.title"),
      description: <span className="text-sm">{t("calendar.description")}</span>,
      header: <CalendarSkeleton />,
      className: "md:col-span-1",
      icon: <Calendar size={20} />,
    },
    {
      title: t("video.title"),
      description: <span className="text-sm">{t("video.description")}</span>,
      header: <VideoSkeleton />,
      className: "md:col-span-1",
      icon: <PlayCircle size={20} />,
    },
    {
      title: t("load.title"),
      description: <span className="text-sm">{t("load.description")}</span>,
      header: <LoadSkeleton />,
      className: "md:col-span-1",
      icon: <Activity size={20} />,
    },
    {
      title: t("team.title"),
      description: <span className="text-sm">{t("team.description")}</span>,
      header: <TeamSkeleton />,
      className: "md:col-span-2",
      icon: <Users size={20} />,
    },
    {
      title: t("gamification.title"),
      description: (
        <span className="text-sm">{t("gamification.description")}</span>
      ),
      header: <GamificationSkeleton />,
      className: "md:col-span-1",
      icon: <Trophy size={20} />,
    },
  ];

  return (
    <SectionLayout id="features">
      <div className="mb-12 text-center">
        <Typography variant="h2" className="mb-4">
          {t("title")}
        </Typography>
        <Typography variant="muted" className="text-lg">
          {t("subtitle")}
        </Typography>
      </div>
      <BentoGrid className="mx-auto max-w-4xl md:auto-rows-[20rem]">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={cn("[&>p:text-lg]", item.className)}
            icon={item.icon}
          />
        ))}
      </BentoGrid>
    </SectionLayout>
  );
}

const CalendarSkeleton = () => {
  const variants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex h-full flex-col gap-2"
    >
      <motion.div className="border-border bg-background flex flex-row items-center gap-2 rounded-2xl border p-3">
        <Calendar className="text-primary size-5" />
        <div>
          <p className="text-xs font-medium">Lundi - Course 45min</p>
          <p className="text-muted-foreground text-xs">RPE cible: 6</p>
        </div>
      </motion.div>
      <motion.div
        variants={variants}
        className="border-border bg-background flex flex-row items-center gap-2 rounded-2xl border p-3"
      >
        <Calendar className="text-primary size-5" />
        <div>
          <p className="text-xs font-medium">Mercredi - PPG</p>
          <p className="text-muted-foreground text-xs">RPE cible: 7</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const VideoSkeleton = () => {
  const variants: Variants = {
    initial: { scale: 1 },
    animate: { scale: 1.05 },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      variants={variants}
      className="bg-muted flex h-full items-center justify-center rounded-lg"
    >
      <div className="flex flex-col items-center gap-2">
        <PlayCircle className="text-primary size-12" />
        <p className="text-muted-foreground text-xs">Cliquez pour analyser</p>
      </div>
    </motion.div>
  );
};

const LoadSkeleton = () => {
  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex h-full flex-col gap-2"
    >
      <motion.div>
        <Alert variant="default">
          <Loader size={20} />
          <AlertTitle>Calcul de la charge...</AlertTitle>
        </Alert>
      </motion.div>
      <motion.div
        variants={{
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
        }}
      >
        <Alert variant="success">
          <CheckCircle size={20} />
          <AlertTitle>ACWR: 1.12 - Zone optimale</AlertTitle>
        </Alert>
      </motion.div>
    </motion.div>
  );
};

const TeamSkeleton = () => {
  const first = {
    initial: { x: 20, rotate: -5 },
    hover: { x: 0, rotate: 0 },
  };
  const second = {
    initial: { x: -20, rotate: 5 },
    hover: { x: 0, rotate: 0 },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 flex-row gap-4"
    >
      <motion.div
        variants={first}
        className="border-border bg-background flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border p-4"
      >
        <Typography variant="large">12 athletes</Typography>
        <Typography variant="muted">Actifs ce mois</Typography>
        <Typography variant="muted" className="text-green-500">
          +3
        </Typography>
      </motion.div>
      <motion.div className="border-border bg-background flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border p-4">
        <Typography variant="large">48 seances</Typography>
        <Typography variant="muted">Planifiees</Typography>
        <Typography variant="muted" className="text-green-500">
          +12%
        </Typography>
      </motion.div>
      <motion.div
        variants={second}
        className="border-border bg-background flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border p-4"
      >
        <Typography variant="large">RPE moy: 6.4</Typography>
        <Typography variant="muted">Charge optimale</Typography>
        <Typography variant="muted" className="text-green-500">
          OK
        </Typography>
      </motion.div>
    </motion.div>
  );
};

const GamificationSkeleton = () => {
  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex h-full flex-col items-center justify-center gap-3"
    >
      <motion.div
        variants={{
          initial: { scale: 1, rotate: 0 },
          animate: { scale: 1.1, rotate: 5 },
        }}
        className="flex flex-col items-center"
      >
        <Trophy className="text-primary size-12" />
        <Typography variant="large" className="mt-2">
          Streak: 7 jours
        </Typography>
        <Typography variant="muted">Continue comme ca !</Typography>
      </motion.div>
    </motion.div>
  );
};
