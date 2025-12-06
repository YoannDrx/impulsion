import { CyberButton } from "@/components/impulsion/cyber-button";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import {
  VideoListWithFilters,
  getOrgVideos,
  getOrgSessions,
} from "@/features/video";
import { combineWithParentMetadata } from "@/lib/metadata";
import { getRequiredCurrentOrgCache } from "@/lib/react/cache";
import { Video } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export const generateMetadata = combineWithParentMetadata({
  title: "Vidéos",
  description: "Analysez les vidéos de vos athlètes.",
});

type VideosPageProps = {
  params: Promise<{
    locale: string;
    orgSlug: string;
  }>;
};

export default function Page(props: VideosPageProps) {
  return (
    <Suspense fallback={null}>
      <VideosPage {...props} />
    </Suspense>
  );
}

async function VideosPage(props: VideosPageProps) {
  const params = await props.params;
  const org = await getRequiredCurrentOrgCache();

  const [videos, sessions] = await Promise.all([
    getOrgVideos(org.id),
    getOrgSessions(org.id),
  ]);

  const isCoach = org.memberRoles.some((role) =>
    ["owner", "admin"].includes(role),
  );

  return (
    <Layout size="xl">
      <LayoutHeader>
        <div className="flex items-center justify-between">
          <div>
            <LayoutTitle>Vidéos</LayoutTitle>
            <LayoutDescription>
              Analysez les vidéos avec des commentaires horodatés
            </LayoutDescription>
          </div>
          <CyberButton variant="neon" asChild>
            <Link href={`/orgs/${params.orgSlug}/videos/upload`}>
              <Video className="mr-2 size-4" />
              Uploader
            </Link>
          </CyberButton>
        </div>
      </LayoutHeader>
      <LayoutContent>
        <VideoListWithFilters
          videos={videos}
          sessions={sessions}
          orgSlug={params.orgSlug}
          isCoach={isCoach}
        />
      </LayoutContent>
    </Layout>
  );
}
