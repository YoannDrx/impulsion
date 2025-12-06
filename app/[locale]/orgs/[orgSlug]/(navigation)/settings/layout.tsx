import { Layout, LayoutContent } from "@/features/page/layout";
import { combineWithParentMetadata } from "@/lib/metadata";

export const generateMetadata = combineWithParentMetadata({
  title: "Settings",
  description: "Manage your organization settings.",
});

export default async function RouteLayout(
  props: LayoutProps<"/[locale]/orgs/[orgSlug]/settings">,
) {
  return (
    <Layout size="lg">
      <LayoutContent>{props.children}</LayoutContent>
    </Layout>
  );
}
