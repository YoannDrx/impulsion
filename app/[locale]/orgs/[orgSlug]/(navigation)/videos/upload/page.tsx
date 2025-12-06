"use client";

import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { VideoUpload } from "@/features/video";
import { useCurrentOrg } from "@app/[locale]/orgs/[orgSlug]/use-current-org";
import { useRouter } from "next/navigation";
import { use } from "react";

type UploadPageProps = {
  params: Promise<{
    locale: string;
    orgSlug: string;
  }>;
};

export default function Page(props: UploadPageProps) {
  const params = use(props.params);
  const router = useRouter();
  const org = useCurrentOrg();

  const handleSuccess = (videoId: string) => {
    router.push(`/orgs/${params.orgSlug}/videos/${videoId}`);
  };

  const handleCancel = () => {
    router.push(`/orgs/${params.orgSlug}/videos`);
  };

  if (!org) {
    return null;
  }

  return (
    <Layout size="sm">
      <LayoutHeader>
        <LayoutTitle>Uploader une vidéo</LayoutTitle>
        <LayoutDescription>
          Ajoutez une vidéo pour l&apos;analyser avec des commentaires horodatés
        </LayoutDescription>
      </LayoutHeader>
      <LayoutContent>
        <VideoUpload
          organizationId={org.id}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </LayoutContent>
    </Layout>
  );
}
