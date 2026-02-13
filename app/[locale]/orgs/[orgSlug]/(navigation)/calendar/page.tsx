import { CalendarView, getCalendarSessions } from "@/features/calendar";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { combineWithParentMetadata } from "@/lib/metadata";
import { getRequiredCurrentOrgCache } from "@/lib/react/cache";
import { startOfMonth, endOfMonth, addMonths, subMonths } from "date-fns";
import { Suspense } from "react";

export const generateMetadata = combineWithParentMetadata({
  title: "Calendrier",
  description: "Visualisez les séances d'entraînement sur un calendrier.",
});

export default function Page(
  props: PageProps<"/[locale]/orgs/[orgSlug]/calendar">,
) {
  return (
    <Suspense fallback={null}>
      <CalendarPage {...props} />
    </Suspense>
  );
}

async function CalendarPage(
  props: PageProps<"/[locale]/orgs/[orgSlug]/calendar">,
) {
  const params = await props.params;
  const org = await getRequiredCurrentOrgCache();

  // Get sessions for current month + 1 month before and after
  const today = new Date();
  const startDate = startOfMonth(subMonths(today, 1));
  const endDate = endOfMonth(addMonths(today, 1));

  const sessions = await getCalendarSessions(org.id, startDate, endDate);

  return (
    <Layout size="xl">
      <LayoutHeader>
        <LayoutTitle>Calendrier</LayoutTitle>
        <LayoutDescription>
          Vue d'ensemble de vos séances d'entraînement
        </LayoutDescription>
      </LayoutHeader>
      <LayoutContent>
        <CalendarView sessions={sessions} orgSlug={params.orgSlug} />
      </LayoutContent>
    </Layout>
  );
}
