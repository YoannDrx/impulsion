import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { InjuriesDashboard, getTeamInjuryOverview } from "@/features/injuries";
import { combineWithParentMetadata } from "@/lib/metadata";
import { getRequiredCurrentOrgCache } from "@/lib/react/cache";
import { Suspense } from "react";

export const generateMetadata = combineWithParentMetadata({
  title: "Suivi des blessures",
  description: "Suivez les signalements de douleur de vos athlètes.",
});

type InjuriesPageProps = {
  params: Promise<{
    locale: string;
    orgSlug: string;
  }>;
};

export default function Page(props: InjuriesPageProps) {
  return (
    <Suspense fallback={<InjuriesSkeleton />}>
      <InjuriesPage {...props} />
    </Suspense>
  );
}

async function InjuriesPage(_props: InjuriesPageProps) {
  const org = await getRequiredCurrentOrgCache();
  const injuryData = await getTeamInjuryOverview(org.id);

  return (
    <Layout size="xl">
      <LayoutHeader>
        <LayoutTitle>Suivi des blessures</LayoutTitle>
        <LayoutDescription>
          Visualisez et gérez les signalements de douleur de votre équipe
        </LayoutDescription>
      </LayoutHeader>
      <LayoutContent>
        <InjuriesDashboard data={injuryData} />
      </LayoutContent>
    </Layout>
  );
}

function InjuriesSkeleton() {
  return (
    <Layout size="xl">
      <LayoutHeader>
        <LayoutTitle>Suivi des blessures</LayoutTitle>
        <LayoutDescription>Chargement...</LayoutDescription>
      </LayoutHeader>
      <LayoutContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-muted h-24 animate-pulse rounded-lg" />
          ))}
        </div>
      </LayoutContent>
    </Layout>
  );
}
