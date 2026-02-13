import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { SessionDetail } from "@/features/session-detail";
import { combineWithParentMetadata } from "@/lib/metadata";
import { getRequiredCurrentOrgCache } from "@/lib/react/cache";
import { getSessionDetail } from "@/query/sessions/get-session-detail.query";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type SessionDetailPageProps = {
  params: Promise<{
    locale: string;
    orgSlug: string;
    sessionId: string;
  }>;
};

export const generateMetadata = combineWithParentMetadata({
  title: "Détail séance",
  description: "Consultez les détails de la séance.",
});

export default function Page(props: SessionDetailPageProps) {
  return (
    <Suspense fallback={null}>
      <SessionDetailPage {...props} />
    </Suspense>
  );
}

async function SessionDetailPage(props: SessionDetailPageProps) {
  const params = await props.params;
  const org = await getRequiredCurrentOrgCache();

  const session = await getSessionDetail(params.sessionId, org.id);

  if (!session) {
    notFound();
  }

  const isCoach = org.memberRoles.some((role) =>
    ["owner", "admin"].includes(role),
  );

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Détail de la séance</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <SessionDetail
          session={session}
          orgSlug={params.orgSlug}
          isCoach={isCoach}
        />
      </LayoutContent>
    </Layout>
  );
}
