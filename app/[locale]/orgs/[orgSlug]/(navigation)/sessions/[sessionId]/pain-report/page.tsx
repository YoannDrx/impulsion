"use client";

import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { PainReportForm } from "@/features/pain-report";
import { useRouter } from "next/navigation";
import { use } from "react";

type PainReportPageProps = {
  params: Promise<{
    locale: string;
    orgSlug: string;
    sessionId: string;
  }>;
};

export default function Page(props: PainReportPageProps) {
  const params = use(props.params);
  const router = useRouter();

  const handleSuccess = () => {
    router.push(`/orgs/${params.orgSlug}/sessions`);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <Layout size="sm">
      <LayoutHeader>
        <LayoutTitle>Signaler une douleur</LayoutTitle>
        <LayoutDescription>
          Informe ton coach si tu as ressenti une gêne ou douleur
        </LayoutDescription>
      </LayoutHeader>
      <LayoutContent>
        <PainReportForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </LayoutContent>
    </Layout>
  );
}
