import { EmailFormSection } from "@/features/email/email-form-section";
import { BentoGridSection } from "@/features/landing/bento-section";
import { CtaSection } from "@/features/landing/cta/cta-section";
import { FAQSection } from "@/features/landing/faq-section";
import { Hero } from "@/features/landing/hero";
import { LandingHeader } from "@/features/landing/landing-header";
import { PainSection } from "@/features/landing/pain";
import { ReviewGrid } from "@/features/landing/review/review-grid";
import { ReviewTriple } from "@/features/landing/review/review-triple";
import { SectionDivider } from "@/features/landing/section-divider";
import { StatsSection } from "@/features/landing/stats-section";
import { Footer } from "@/features/layout/footer";
import { Pricing } from "@/features/plans/pricing-section";

export default function HomePage() {
  return (
    <div className="bg-background text-foreground relative flex h-fit flex-col">
      <div className="mt-16"></div>

      <LandingHeader />

      <Hero />

      <StatsSection />

      <BentoGridSection />

      <PainSection />

      <SectionDivider />

      <ReviewTriple
        reviews={[
          {
            image: "https://i.pravatar.cc/300?u=coach1",
            name: "Thomas",
            review: `Impulsion a **transforme ma facon de travailler avec mes athletes**. Le suivi de charge et les alertes me permettent d'adapter les programmes en temps reel.`,
            role: "Coach Trail Running",
          },
          {
            image: "https://i.pravatar.cc/300?u=coach2",
            name: "Marie",
            review: `L'analyse video avec les marqueurs temporels est un game-changer. **Mes athletes comprennent enfin mes corrections techniques** sans avoir a se rappeler de tout.`,
            role: "Coach Athletisme",
          },
          {
            image: "https://i.pravatar.cc/300?u=athlete1",
            name: "Lucas",
            review: `Fini les echanges par WhatsApp ! Je remplis mon feedback apres chaque seance et **mon coach voit tout sur son tableau de bord**. Simple et efficace.`,
            role: "Athlete Trail",
          },
        ]}
      />

      <SectionDivider />

      <CtaSection />

      <Pricing />

      <FAQSection
        faq={[
          {
            question: "Qu'est-ce qu'Impulsion ?",
            answer:
              "Impulsion est une plateforme de coaching sportif hybride qui connecte coachs et athletes. Elle permet de planifier des seances, suivre la charge d'entrainement, analyser des videos et communiquer efficacement.",
          },
          {
            question: "Comment fonctionne le suivi de charge ?",
            answer:
              "Le suivi de charge utilise le RPE (Rating of Perceived Exertion) multiplie par la duree pour calculer la charge d'entrainement. Le ratio ACWR (Acute:Chronic Workload Ratio) permet de detecter les risques de surcharge ou de sous-entrainement.",
          },
          {
            question: "Puis-je analyser des videos de mes athletes ?",
            answer:
              "Oui ! Vous pouvez uploader des videos et ajouter des marqueurs temporels avec des commentaires. Vos athletes voient exactement ou et quoi corriger dans leur technique.",
          },
          {
            question: "Combien d'athletes puis-je suivre ?",
            answer:
              "Le plan gratuit permet de suivre jusqu'a 5 athletes avec 10 videos par mois. Le plan Pro offre un nombre illimite d'athletes et de videos.",
          },
          {
            question: "L'integration Strava est-elle disponible ?",
            answer:
              "L'integration Strava est en cours de developpement et sera disponible dans une prochaine mise a jour. Elle permettra d'importer automatiquement les activites de vos athletes.",
          },
          {
            question: "Mes donnees sont-elles securisees ?",
            answer:
              "Oui, toutes les donnees sont chiffrees et stockees de maniere securisee. Nous respectons le RGPD et ne partageons jamais vos donnees avec des tiers.",
          },
        ]}
      />

      <SectionDivider />

      <ReviewGrid
        reviews={[
          {
            image: "https://i.pravatar.cc/300?u=c1",
            name: "Sophie",
            review:
              "Le calendrier partage me fait gagner un temps fou. Plus besoin d'envoyer les programmes par email, tout est centralise.",
            role: "Coach Running",
          },
          {
            image: "https://i.pravatar.cc/300?u=c2",
            name: "Antoine",
            review:
              "Le systeme de badges motive mes athletes. Ils adorent voir leur progression et debloquer de nouveaux niveaux.",
            role: "Coach Triathlon",
          },
          {
            image: "https://i.pravatar.cc/300?u=c3",
            name: "Julie",
            review:
              "Enfin un outil qui comprend les besoins des coachs. L'ACWR m'alerte quand un athlete est en zone de risque.",
            role: "Preparateur Physique",
          },
          {
            image: "https://i.pravatar.cc/300?u=a1",
            name: "Maxime",
            review:
              "Je peux enfin donner mon ressenti apres chaque seance sans envoyer 10 messages. Mon coach a tout sur une seule page.",
            role: "Athlete Marathon",
          },
          {
            image: "https://i.pravatar.cc/300?u=a2",
            name: "Emma",
            review:
              "Les commentaires sur les videos m'ont vraiment aide a corriger ma technique de course. C'est comme avoir mon coach a cote de moi.",
            role: "Athlete Trail",
          },
          {
            image: "https://i.pravatar.cc/300?u=a3",
            name: "Pierre",
            review:
              "Interface claire et intuitive. Je remplis mon feedback en 30 secondes apres chaque entrainement.",
            role: "Athlete Cyclisme",
          },
        ]}
      />

      <EmailFormSection />

      <SectionDivider />

      <Footer />
    </div>
  );
}
