import { AthleteDashboard } from "@/features/athlete-dashboard";
import { CoachDashboard } from "@/features/team-dashboard";
import { getRequiredCurrentOrgCache } from "@/lib/react/cache";
import { getAthleteDashboardData } from "@/query/athlete/get-athlete-dashboard.query";
import { getTeamDashboardData } from "@/query/team/get-team-dashboard.query";
import { Suspense } from "react";

export default function Page(props: PageProps<"/[locale]/orgs/[orgSlug]">) {
  return (
    <Suspense fallback={null}>
      <DashboardPage {...props} />
    </Suspense>
  );
}

async function DashboardPage(props: PageProps<"/[locale]/orgs/[orgSlug]">) {
  const params = await props.params;
  const org = await getRequiredCurrentOrgCache();

  // Check if user is coach/admin or athlete
  const isCoachOrAdmin = org.memberRoles.some((role) =>
    ["owner", "admin"].includes(role),
  );

  if (isCoachOrAdmin) {
    const dashboardData = await getTeamDashboardData(org.id);
    return (
      <CoachDashboard
        orgSlug={params.orgSlug}
        orgName={org.name}
        dashboardData={dashboardData}
      />
    );
  }

  // Athlete view
  const dashboardData = await getAthleteDashboardData(org.id, org.user.id);
  return (
    <AthleteDashboard
      orgSlug={params.orgSlug}
      orgName={org.name}
      athleteName={org.user.name}
      dashboardData={dashboardData}
    />
  );
}
