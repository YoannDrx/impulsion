import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { TemplateForm } from "@/features/templates";
import { combineWithParentMetadata } from "@/lib/metadata";
import { Suspense } from "react";

export const generateMetadata = combineWithParentMetadata({
  title: "Nouveau template",
  description: "Créez un nouveau template de séance.",
});

type NewTemplatePageProps = {
  params: Promise<{
    locale: string;
    orgSlug: string;
  }>;
};

export default function Page(props: NewTemplatePageProps) {
  return (
    <Suspense fallback={<NewTemplateSkeleton />}>
      <NewTemplatePage {...props} />
    </Suspense>
  );
}

async function NewTemplatePage(props: NewTemplatePageProps) {
  const params = await props.params;

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Nouveau template</LayoutTitle>
        <LayoutDescription>
          Créez un template réutilisable pour vos séances
        </LayoutDescription>
      </LayoutHeader>
      <LayoutContent>
        <TemplateForm orgSlug={params.orgSlug} mode="create" />
      </LayoutContent>
    </Layout>
  );
}

function NewTemplateSkeleton() {
  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Nouveau template</LayoutTitle>
        <LayoutDescription>Chargement...</LayoutDescription>
      </LayoutHeader>
      <LayoutContent>
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-muted h-48 animate-pulse rounded-lg" />
          ))}
        </div>
      </LayoutContent>
    </Layout>
  );
}
