import { Typography } from "@/components/nowts/typography";
import { Layout, LayoutContent } from "@/features/page/layout";
import { SiteConfig } from "@/site-config";
import { Rocket } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Carrieres - ${SiteConfig.title}`,
  description:
    "Rejoignez l'equipe Impulsion et contribuez a transformer le coaching sportif.",
  keywords: ["emploi", "carrieres", "startup", "sport", "tech"],
  openGraph: {
    title: `Carrieres - ${SiteConfig.title}`,
    description:
      "Rejoignez l'equipe Impulsion et contribuez a transformer le coaching sportif.",
    url: `${SiteConfig.prodUrl}/careers`,
    type: "website",
  },
};

export default function CareersPage() {
  return (
    <div className="bg-neutral-950 text-white">
      <div className="border-b border-neutral-800 py-20">
        <Layout>
          <LayoutContent>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 font-mono text-sm text-lime-400">
                {`// CAREERS.IMPULSION`}
              </p>
              <Typography
                variant="h1"
                className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
              >
                Rejoignez l'aventure
              </Typography>
              <Typography variant="p" className="mt-6 text-lg text-neutral-400">
                Nous construisons l'avenir du coaching sportif. Envie de nous
                rejoindre ?
              </Typography>
            </div>
          </LayoutContent>
        </Layout>
      </div>

      <div className="py-20">
        <Layout>
          <LayoutContent>
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-8 flex justify-center">
                <div className="flex size-16 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/10">
                  <Rocket className="size-8 text-cyan-400" />
                </div>
              </div>
              <Typography
                variant="h2"
                className="text-xl font-bold text-cyan-400"
              >
                Nous recrutons bientot...
              </Typography>
              <Typography variant="p" className="mt-4 text-neutral-500">
                Impulsion est en phase de lancement. Nous ouvrirons des postes
                des que nous serons prets a agrandir l'equipe.
              </Typography>
              <Typography variant="p" className="mt-4 text-neutral-400">
                En attendant, vous pouvez nous contacter pour manifester votre
                interet.
              </Typography>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-block rounded border border-cyan-400 bg-cyan-400/10 px-6 py-3 font-mono text-sm text-cyan-400 transition-all hover:bg-cyan-400 hover:text-black"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </LayoutContent>
        </Layout>
      </div>
    </div>
  );
}
