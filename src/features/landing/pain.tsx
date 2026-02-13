"use client";

import { Typography } from "@/components/nowts/typography";
import { CheckCircle, XCircle } from "lucide-react";
import { SectionLayout } from "./section-layout";

export const PainSection = () => {
  return (
    <SectionLayout
      variant="card"
      size="base"
      className="flex flex-col items-center justify-center gap-4"
    >
      <div className="flex w-full flex-col items-center gap-3 lg:gap-4 xl:gap-6">
        <Typography variant="h1">Le coaching devient simple</Typography>
        <Typography variant="large">
          Comparez votre quotidien avant et avec Impulsion
        </Typography>
        <div className="flex items-start gap-4 max-lg:flex-col">
          <div className="flex-1 rounded-lg bg-red-500/20 p-4 lg:p-6">
            <Typography
              variant="h3"
              className="flex items-center gap-2 text-red-500"
            >
              <XCircle className="size-6" />
              Sans Impulsion
            </Typography>
            <ul className="text-foreground/80 mt-4 ml-4 flex list-disc flex-col gap-2 text-lg">
              <li>Programmes sur Excel ou papier</li>
              <li>Retours des athletes par SMS ou WhatsApp</li>
              <li>Pas de visibilite sur la charge</li>
              <li>Videos envoyees par email sans contexte</li>
            </ul>
          </div>
          <div className="flex-1 rounded-lg bg-green-500/20 p-4 lg:p-6">
            <Typography
              variant="h3"
              className="flex items-center gap-2 text-green-500"
            >
              <CheckCircle className="size-6" />
              Avec Impulsion
            </Typography>
            <ul className="text-foreground/80 mt-4 ml-4 flex list-disc flex-col gap-2 text-lg">
              <li>Calendrier partage et intuitif</li>
              <li>Feedback structure avec RPE et sensations</li>
              <li>Suivi de charge automatique (ACWR)</li>
              <li>Analyse video avec marqueurs temporels</li>
            </ul>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};
