import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { TemplatesList, getTemplatesOverview } from "@/features/templates";
import { combineWithParentMetadata } from "@/lib/metadata";
import { getRequiredCurrentOrgCache } from "@/lib/react/cache";
import { Suspense } from "react";

export const generateMetadata = combineWithParentMetadata({
  title: "Templates de séances",
  description: "Gérez vos templates de séances d'entraînement.",
});

type TemplatesPageProps = {
  params: Promise<{
    locale: string;
    orgSlug: string;
  }>;
};

export default function Page(props: TemplatesPageProps) {
  return (
    <Suspense fallback={<TemplatesSkeleton />}>
      <TemplatesPage {...props} />
    </Suspense>
  );
}

async function TemplatesPage(props: TemplatesPageProps) {
  const params = await props.params;
  const org = await getRequiredCurrentOrgCache();
  const templatesData = await getTemplatesOverview(org.id);

  return (
    <Layout size="xl">
      <LayoutHeader>
        <LayoutTitle>Templates de séances</LayoutTitle>
        <LayoutDescription>
          Créez et gérez vos templates pour gagner du temps
        </LayoutDescription>
      </LayoutHeader>
      <LayoutContent>
        <TemplatesList data={templatesData} orgSlug={params.orgSlug} />
      </LayoutContent>
    </Layout>
  );
}

function TemplatesSkeleton() {
  return (
    <Layout size="xl">
      <LayoutHeader>
        <LayoutTitle>Templates de séances</LayoutTitle>
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
