import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { CreateSessionForm } from "@/features/sessions";
import { combineWithParentMetadata } from "@/lib/metadata";
import { getRequiredCurrentOrgCache } from "@/lib/react/cache";
import { getOrgAthletes } from "@/query/sessions/get-sessions.query";
import { Suspense } from "react";

export const generateMetadata = combineWithParentMetadata({
  title: "Nouvelle séance",
  description: "Créez une nouvelle séance d'entraînement.",
});

export default function Page(
  props: PageProps<"/[locale]/orgs/[orgSlug]/sessions/new">,
) {
  return (
    <Suspense fallback={null}>
      <NewSessionPage {...props} />
    </Suspense>
  );
}

async function NewSessionPage(
  props: PageProps<"/[locale]/orgs/[orgSlug]/sessions/new">,
) {
  const params = await props.params;
  const org = await getRequiredCurrentOrgCache();
  const athletes = await getOrgAthletes(org.id);

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Nouvelle séance</LayoutTitle>
        <LayoutDescription>
          Créez une séance et assignez-la à vos athlètes
        </LayoutDescription>
      </LayoutHeader>
      <LayoutContent>
        <CreateSessionForm orgSlug={params.orgSlug} athletes={athletes} />
      </LayoutContent>
    </Layout>
  );
}
