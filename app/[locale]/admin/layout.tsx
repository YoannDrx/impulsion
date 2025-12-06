import { AdminNavigation } from "./_navigation/admin-navigation";

export default async function AdminLayout(
  props: LayoutProps<"/[locale]/admin">,
) {
  return <AdminNavigation>{props.children}</AdminNavigation>;
}
