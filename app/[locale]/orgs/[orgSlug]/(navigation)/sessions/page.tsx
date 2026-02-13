import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { SessionsList } from "@/features/sessions";
import { combineWithParentMetadata } from "@/lib/metadata";
import { getRequiredCurrentOrgCache } from "@/lib/react/cache";
import { getOrgSessions } from "@/query/sessions/get-sessions.query";
import { Suspense } from "react";

export const generateMetadata = combineWithParentMetadata({
  title: "Séances",
  description: "Gérez les séances d'entraînement de votre équipe.",
});

export default function Page(
  props: PageProps<"/[locale]/orgs/[orgSlug]/sessions">,
) {
  return (
    <Suspense fallback={null}>
      <SessionsPage {...props} />
    </Suspense>
  );
}

async function SessionsPage(
  props: PageProps<"/[locale]/orgs/[orgSlug]/sessions">,
) {
  const params = await props.params;
  const org = await getRequiredCurrentOrgCache();
  const sessions = await getOrgSessions(org.id);

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Séances</LayoutTitle>
        <LayoutDescription>
          Planifiez et suivez les séances d'entraînement de vos athlètes
        </LayoutDescription>
      </LayoutHeader>
      <LayoutContent>
        <SessionsList sessions={sessions} orgSlug={params.orgSlug} />
      </LayoutContent>
    </Layout>
  );
}
