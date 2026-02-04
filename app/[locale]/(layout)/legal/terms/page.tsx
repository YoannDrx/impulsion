import { Typography } from "@/components/nowts/typography";
import { Layout, LayoutContent } from "@/features/page/layout";
import { SiteConfig } from "@/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Conditions d'utilisation - ${SiteConfig.title}`,
  description: "Conditions generales d'utilisation de la plateforme Impulsion.",
};

export default function TermsPage() {
  return (
    <div className="bg-neutral-950 text-white">
      <div className="border-b border-neutral-800 py-12">
        <Layout>
          <LayoutContent>
            <p className="mb-4 font-mono text-sm text-lime-400">
              {`// LEGAL.TERMS`}
            </p>
            <Typography
              variant="h1"
              className="text-3xl font-bold text-white sm:text-4xl"
            >
              Conditions d'utilisation
            </Typography>
            <Typography variant="p" className="mt-4 text-neutral-400">
              Derniere mise a jour : Janvier 2025
            </Typography>
          </LayoutContent>
        </Layout>
      </div>

      <div className="py-12">
        <Layout>
          <LayoutContent className="prose prose-invert max-w-3xl">
            <section className="mb-12">
              <h2 className="mb-4 font-mono text-xl font-bold text-lime-400">
                1. Objet
              </h2>
              <p className="text-neutral-400">
                Les presentes conditions generales d'utilisation (CGU) regissent
                l'utilisation de la plateforme Impulsion, accessible a l'adresse
                impulsion.app. En utilisant nos services, vous acceptez ces
                conditions.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-mono text-xl font-bold text-lime-400">
                2. Description du service
              </h2>
              <p className="text-neutral-400">
                Impulsion est une plateforme de coaching sportif hybride
                permettant aux coachs de gerer leurs athletes, planifier des
                entrainements, analyser des videos et suivre la charge
                d'entrainement.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-mono text-xl font-bold text-lime-400">
                3. Inscription et compte
              </h2>
              <p className="mb-4 text-neutral-400">
                Pour utiliser Impulsion, vous devez creer un compte avec des
                informations exactes. Vous etes responsable de la
                confidentialite de vos identifiants et de toutes les actions
                effectuees sous votre compte.
              </p>
              <p className="text-neutral-400">
                Vous devez avoir au moins 16 ans pour creer un compte. Les
                mineurs doivent avoir l'autorisation de leurs parents ou tuteurs
                legaux.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-mono text-xl font-bold text-lime-400">
                4. Abonnements et paiements
              </h2>
              <p className="mb-4 text-neutral-400">
                Impulsion propose differentes formules d'abonnement. Les prix
                sont indiques en euros TTC. Les abonnements sont renouveles
                automatiquement sauf annulation.
              </p>
              <p className="text-neutral-400">
                Vous pouvez annuler votre abonnement a tout moment depuis votre
                espace compte. L'annulation prendra effet a la fin de la periode
                en cours.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-mono text-xl font-bold text-lime-400">
                5. Utilisation acceptable
              </h2>
              <p className="mb-4 text-neutral-400">Vous vous engagez a :</p>
              <ul className="list-inside list-disc space-y-2 text-neutral-400">
                <li>Utiliser le service conformement aux lois en vigueur</li>
                <li>Ne pas partager vos identifiants de connexion</li>
                <li>Ne pas uploader de contenu illegal ou prejudiciable</li>
                <li>Respecter les droits de propriete intellectuelle</li>
                <li>Ne pas tenter de compromettre la securite du service</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-mono text-xl font-bold text-lime-400">
                6. Propriete intellectuelle
              </h2>
              <p className="text-neutral-400">
                Impulsion et son contenu (design, code, textes) sont proteges
                par le droit d'auteur. Vous conservez la propriete des contenus
                que vous uploadez (videos, notes). En les uploadant, vous nous
                accordez une licence limitee pour les afficher dans le cadre du
                service.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-mono text-xl font-bold text-lime-400">
                7. Limitation de responsabilite
              </h2>
              <p className="text-neutral-400">
                Impulsion est fourni "en l'etat". Nous ne garantissons pas que
                le service sera ininterrompu ou exempt d'erreurs. Nous ne sommes
                pas responsables des conseils d'entrainement donnes par les
                coachs utilisant la plateforme.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-mono text-xl font-bold text-lime-400">
                8. Resiliation
              </h2>
              <p className="text-neutral-400">
                Nous nous reservons le droit de suspendre ou resilier votre
                compte en cas de violation de ces CGU. Vous pouvez supprimer
                votre compte a tout moment depuis les parametres.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-mono text-xl font-bold text-lime-400">
                9. Modifications
              </h2>
              <p className="text-neutral-400">
                Nous pouvons modifier ces CGU a tout moment. Les modifications
                importantes seront notifiees par email. En continuant a utiliser
                le service apres modification, vous acceptez les nouvelles
                conditions.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-mono text-xl font-bold text-lime-400">
                10. Droit applicable
              </h2>
              <p className="text-neutral-400">
                Ces CGU sont soumises au droit francais. Tout litige sera porte
                devant les tribunaux competents de Paris, France.
              </p>
            </section>
          </LayoutContent>
        </Layout>
      </div>
    </div>
  );
}
