import { Typography } from "@/components/nowts/typography";
import { Layout, LayoutContent } from "@/features/page/layout";
import { SiteConfig } from "@/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Politique de confidentialite - ${SiteConfig.title}`,
  description:
    "Politique de confidentialite et protection des donnees personnelles d'Impulsion.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-neutral-950 text-white">
      <div className="border-b border-neutral-800 py-12">
        <Layout>
          <LayoutContent>
            <p className="mb-4 font-mono text-sm text-lime-400">
              {`// LEGAL.PRIVACY`}
            </p>
            <Typography
              variant="h1"
              className="text-3xl font-bold text-white sm:text-4xl"
            >
              Politique de confidentialite
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
                1. Introduction
              </h2>
              <p className="text-neutral-400">
                Impulsion s'engage a proteger la vie privee de ses utilisateurs.
                Cette politique de confidentialite explique comment nous
                collectons, utilisons et protegeons vos donnees personnelles
                conformement au Reglement General sur la Protection des Donnees
                (RGPD).
              </p>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-mono text-xl font-bold text-lime-400">
                2. Donnees collectees
              </h2>
              <p className="mb-4 text-neutral-400">
                Nous collectons les donnees suivantes :
              </p>
              <ul className="list-inside list-disc space-y-2 text-neutral-400">
                <li>
                  Informations de compte : nom, email, mot de passe (chiffre)
                </li>
                <li>Donnees d'entrainement : seances, charge, RPE, notes</li>
                <li>Videos uploadees pour l'analyse technique</li>
                <li>
                  Donnees de connexion : adresse IP, navigateur, horodatage
                </li>
                <li>Donnees Strava (si integration activee)</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-mono text-xl font-bold text-lime-400">
                3. Utilisation des donnees
              </h2>
              <p className="mb-4 text-neutral-400">
                Vos donnees sont utilisees pour :
              </p>
              <ul className="list-inside list-disc space-y-2 text-neutral-400">
                <li>Fournir les services de coaching et de suivi</li>
                <li>Calculer les metriques de charge et d'ACWR</li>
                <li>Permettre la communication coach-athlete</li>
                <li>Ameliorer nos services et l'experience utilisateur</li>
                <li>Envoyer des notifications relatives au service</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-mono text-xl font-bold text-lime-400">
                4. Partage des donnees
              </h2>
              <p className="text-neutral-400">
                Nous ne vendons jamais vos donnees. Elles peuvent etre partagees
                uniquement avec : votre coach (donnees d'entrainement), nos
                sous-traitants techniques (hebergement, email), et les autorites
                en cas d'obligation legale.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-mono text-xl font-bold text-lime-400">
                5. Securite
              </h2>
              <p className="text-neutral-400">
                Toutes les donnees sont chiffrees en transit (TLS) et au repos
                (AES-256). Les mots de passe sont hashes avec bcrypt. Nous
                effectuons des sauvegardes quotidiennes et des audits de
                securite reguliers.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-mono text-xl font-bold text-lime-400">
                6. Vos droits (RGPD)
              </h2>
              <p className="mb-4 text-neutral-400">
                Vous disposez des droits suivants :
              </p>
              <ul className="list-inside list-disc space-y-2 text-neutral-400">
                <li>Droit d'acces a vos donnees</li>
                <li>Droit de rectification</li>
                <li>Droit a l'effacement ("droit a l'oubli")</li>
                <li>Droit a la portabilite</li>
                <li>Droit d'opposition au traitement</li>
                <li>Droit de retirer votre consentement</li>
              </ul>
              <p className="mt-4 text-neutral-400">
                Pour exercer ces droits, contactez-nous a privacy@impulsion.app
              </p>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-mono text-xl font-bold text-lime-400">
                7. Conservation des donnees
              </h2>
              <p className="text-neutral-400">
                Les donnees de compte sont conservees tant que le compte est
                actif. Les donnees d'entrainement sont conservees 3 ans apres la
                derniere activite. Vous pouvez demander la suppression a tout
                moment.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 font-mono text-xl font-bold text-lime-400">
                8. Cookies
              </h2>
              <p className="text-neutral-400">
                Nous utilisons uniquement des cookies essentiels au
                fonctionnement du service (authentification, preferences). Aucun
                cookie publicitaire ou de tracking tiers n'est utilise.
              </p>
            </section>

            <section>
              <h2 className="mb-4 font-mono text-xl font-bold text-lime-400">
                9. Contact
              </h2>
              <p className="text-neutral-400">
                Pour toute question concernant cette politique, contactez notre
                Delegue a la Protection des Donnees : dpo@impulsion.app
              </p>
            </section>
          </LayoutContent>
        </Layout>
      </div>
    </div>
  );
}
