import { Typography } from "@/components/nowts/typography";
import { Layout, LayoutContent } from "@/features/page/layout";
import { SiteConfig } from "@/site-config";
import { FileText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Blog - ${SiteConfig.title}`,
  description:
    "Articles, tutoriels et actualites sur le coaching sportif, l'entrainement et les performances.",
  keywords: [
    "blog",
    "coaching sportif",
    "entrainement",
    "performance",
    "athletisme",
  ],
  openGraph: {
    title: `Blog - ${SiteConfig.title}`,
    description:
      "Articles, tutoriels et actualites sur le coaching sportif, l'entrainement et les performances.",
    url: `${SiteConfig.prodUrl}/blog`,
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <div className="bg-neutral-950 text-white">
      <div className="border-b border-neutral-800 py-20">
        <Layout>
          <LayoutContent>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 font-mono text-sm text-lime-400">
                {`// BLOG.IMPULSION`}
              </p>
              <Typography
                variant="h1"
                className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
              >
                Blog
              </Typography>
              <Typography variant="p" className="mt-6 text-lg text-neutral-400">
                Articles, tutoriels et actualites sur le coaching sportif.
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
                <div className="flex size-16 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/50">
                  <FileText className="size-8 text-neutral-500" />
                </div>
              </div>
              <Typography
                variant="h2"
                className="text-xl font-bold text-neutral-400"
              >
                Articles a venir...
              </Typography>
              <Typography variant="p" className="mt-4 text-neutral-500">
                Nous preparons du contenu de qualite sur le coaching sportif,
                les methodologies d'entrainement et les bonnes pratiques.
              </Typography>
              <Typography variant="p" className="mt-2 text-neutral-500">
                Inscrivez-vous pour etre notifie des nouveaux articles.
              </Typography>
              <div className="mt-8">
                <Link
                  href="/auth/signup"
                  className="inline-block rounded border border-lime-400 bg-lime-400/10 px-6 py-3 font-mono text-sm text-lime-400 transition-all hover:bg-lime-400 hover:text-black"
                >
                  S'inscrire
                </Link>
              </div>
            </div>
          </LayoutContent>
        </Layout>
      </div>
    </div>
  );
}
