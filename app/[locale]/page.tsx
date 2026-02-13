import {
  GridNavbar,
  GridHero,
  GridBento,
  GridSpecs,
  GridPricing,
  GridFooter,
} from "@/features/landing-variants/grid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impulsion - Plateforme de coaching sportif hybride",
  description:
    "Connectez-vous avec vos athletes, planifiez, analysez. Impulsion augmente votre coaching.",
};

export default function HomePage() {
  return (
    <div className="bg-neutral-950 text-white">
      <GridNavbar />
      <GridHero />
      <GridBento />
      <GridSpecs />
      <GridPricing />
      <GridFooter />
    </div>
  );
}
