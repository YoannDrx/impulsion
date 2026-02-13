import { Typography } from "@/components/nowts/typography";
import { Layout, LayoutContent } from "@/features/page/layout";
import { SiteConfig } from "@/site-config";
import { Target, Heart, Zap, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `A propos - ${SiteConfig.title}`,
  description:
    "Decouvrez Impulsion, la plateforme de coaching sportif hybride qui augmente les coachs sans les remplacer.",
  keywords: [
    "impulsion",
    "coaching sportif",
    "plateforme coaching",
    "athletisme",
    "running",
  ],
  openGraph: {
    title: `A propos - ${SiteConfig.title}`,
    description:
      "Decouvrez Impulsion, la plateforme de coaching sportif hybride qui augmente les coachs sans les remplacer.",
    url: `${SiteConfig.prodUrl}/about`,
    type: "website",
  },
};

const values = [
  {
    icon: Target,
    title: "Precision",
    description:
      "Chaque fonctionnalite est concue pour maximiser l'efficacite du coaching.",
  },
  {
    icon: Heart,
    title: "Humain",
    description:
      "La technologie au service de la relation coach-athlete, pas l'inverse.",
  },
  {
    icon: Zap,
    title: "Performance",
    description:
      "Des outils rapides et intuitifs pour gagner du temps au quotidien.",
  },
  {
    icon: Users,
    title: "Communaute",
    description:
      "Une plateforme construite avec et pour les coachs independants.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-neutral-950 text-white">
      {/* Hero Section */}
      <div className="border-b border-neutral-800 py-20">
        <Layout>
          <LayoutContent>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 font-mono text-sm text-lime-400">
                {`// ABOUT.IMPULSION`}
              </p>
              <Typography
                variant="h1"
                className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
              >
                Augmenter le coach, pas le remplacer
              </Typography>
              <Typography variant="p" className="mt-6 text-lg text-neutral-400">
                Impulsion est ne d'un constat simple : les outils de coaching
                actuels sont soit trop austeres, soit trop automatises. Nous
                croyons que la technologie doit amplifier l'expertise humaine,
                pas la remplacer.
              </Typography>
            </div>
          </LayoutContent>
        </Layout>
      </div>

      {/* Mission Section */}
      <div className="border-b border-neutral-800 py-20">
        <Layout>
          <LayoutContent>
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="mb-4 font-mono text-xs text-neutral-500">
                  {`// NOTRE MISSION`}
                </p>
                <Typography
                  variant="h2"
                  className="text-2xl font-bold text-lime-400"
                >
                  Democratiser le coaching de qualite
                </Typography>
                <Typography variant="p" className="mt-4 text-neutral-400">
                  Les meilleurs coachs passent trop de temps sur des taches
                  administratives et pas assez sur ce qui compte vraiment :
                  accompagner leurs athletes.
                </Typography>
                <Typography variant="p" className="mt-4 text-neutral-400">
                  Impulsion automatise le suivi, centralise la communication et
                  fournit des insights actionables pour que chaque coach puisse
                  se concentrer sur son expertise.
                </Typography>
              </div>
              <div>
                <p className="mb-4 font-mono text-xs text-neutral-500">
                  {`// NOTRE VISION`}
                </p>
                <Typography
                  variant="h2"
                  className="text-2xl font-bold text-cyan-400"
                >
                  Le coaching hybride comme standard
                </Typography>
                <Typography variant="p" className="mt-4 text-neutral-400">
                  Nous imaginons un monde ou chaque athlete a acces a un
                  accompagnement personnalise, ou la distance n'est plus un
                  obstacle a la performance.
                </Typography>
                <Typography variant="p" className="mt-4 text-neutral-400">
                  Le coaching hybride combine le meilleur des deux mondes : la
                  presence humaine et la puissance des donnees.
                </Typography>
              </div>
            </div>
          </LayoutContent>
        </Layout>
      </div>

      {/* Values Section */}
      <div className="py-20">
        <Layout>
          <LayoutContent>
            <p className="mb-4 text-center font-mono text-xs text-neutral-500">
              {`// NOS VALEURS`}
            </p>
            <Typography
              variant="h2"
              className="mb-12 text-center text-2xl font-bold text-white"
            >
              Ce qui nous guide
            </Typography>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-6"
                  >
                    <div className="mb-4 flex size-10 items-center justify-center rounded-lg border border-lime-400/30 bg-lime-400/10">
                      <Icon className="size-5 text-lime-400" />
                    </div>
                    <Typography
                      variant="h3"
                      className="font-mono text-sm font-bold text-lime-400"
                    >
                      {value.title}
                    </Typography>
                    <Typography
                      variant="p"
                      className="mt-2 text-sm text-neutral-400"
                    >
                      {value.description}
                    </Typography>
                  </div>
                );
              })}
            </div>
          </LayoutContent>
        </Layout>
      </div>

      {/* CTA Section */}
      <div className="border-t border-neutral-800 py-20">
        <Layout>
          <LayoutContent>
            <div className="mx-auto max-w-2xl text-center">
              <Typography
                variant="h2"
                className="text-2xl font-bold text-white"
              >
                Pret a transformer votre coaching ?
              </Typography>
              <Typography variant="p" className="mt-4 text-neutral-400">
                Rejoignez les coachs qui ont choisi d'augmenter leur impact.
              </Typography>
              <div className="mt-8">
                <Link
                  href="/auth/signup"
                  className="inline-block rounded border border-lime-400 bg-lime-400/10 px-6 py-3 font-mono text-sm text-lime-400 transition-all hover:bg-lime-400 hover:text-black"
                >
                  Commencer gratuitement
                </Link>
              </div>
            </div>
          </LayoutContent>
        </Layout>
      </div>
    </div>
  );
}
