import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { TemplateForm, getTemplateById } from "@/features/templates";
import { combineWithParentMetadata } from "@/lib/metadata";
import { getRequiredCurrentOrgCache } from "@/lib/react/cache";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const generateMetadata = combineWithParentMetadata({
  title: "Modifier le template",
  description: "Modifiez votre template de séance.",
});

type EditTemplatePageProps = {
  params: Promise<{
    locale: string;
    orgSlug: string;
    templateId: string;
  }>;
};

export default function Page(props: EditTemplatePageProps) {
  return (
    <Suspense fallback={<EditTemplateSkeleton />}>
      <EditTemplatePage {...props} />
    </Suspense>
  );
}

async function EditTemplatePage(props: EditTemplatePageProps) {
  const params = await props.params;
  const org = await getRequiredCurrentOrgCache();
  const template = await getTemplateById(params.templateId, org.id);

  if (!template) {
    notFound();
  }

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Modifier le template</LayoutTitle>
        <LayoutDescription>{template.title}</LayoutDescription>
      </LayoutHeader>
      <LayoutContent>
        <TemplateForm
          orgSlug={params.orgSlug}
          template={template}
          mode="edit"
        />
      </LayoutContent>
    </Layout>
  );
}

function EditTemplateSkeleton() {
  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Modifier le template</LayoutTitle>
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
