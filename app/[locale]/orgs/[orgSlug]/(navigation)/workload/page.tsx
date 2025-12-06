import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import {
  TeamWorkloadDashboard,
  getTeamWorkloadOverview,
} from "@/features/workload";
import { combineWithParentMetadata } from "@/lib/metadata";
import { getRequiredCurrentOrgCache } from "@/lib/react/cache";
import { Suspense } from "react";

export const generateMetadata = combineWithParentMetadata({
  title: "Charge d'entraînement",
  description: "Suivez la charge d'entraînement de vos athlètes.",
});

type WorkloadPageProps = {
  params: Promise<{
    locale: string;
    orgSlug: string;
  }>;
};

export default function Page(props: WorkloadPageProps) {
  return (
    <Suspense fallback={<WorkloadSkeleton />}>
      <WorkloadPage {...props} />
    </Suspense>
  );
}

async function WorkloadPage(_props: WorkloadPageProps) {
  const org = await getRequiredCurrentOrgCache();
  const workloadData = await getTeamWorkloadOverview(org.id);

  return (
    <Layout size="xl">
      <LayoutHeader>
        <LayoutTitle>Charge d'entraînement</LayoutTitle>
        <LayoutDescription>
          Suivez le ratio charge aiguë / chronique (ACWR) pour prévenir les
          blessures
        </LayoutDescription>
      </LayoutHeader>
      <LayoutContent>
        <TeamWorkloadDashboard data={workloadData} />
      </LayoutContent>
    </Layout>
  );
}

function WorkloadSkeleton() {
  return (
    <Layout size="xl">
      <LayoutHeader>
        <LayoutTitle>Charge d'entraînement</LayoutTitle>
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
