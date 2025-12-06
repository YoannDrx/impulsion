import { Header } from "@/features/layout/header";
import { OnboardingWizard } from "@/features/onboarding/onboarding-wizard";
import { getRequiredUser } from "@/lib/auth/auth-user";
import { getUsersOrgs } from "@/query/org/get-users-orgs.query";
import { SiteConfig } from "@/site-config";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `Bienvenue | ${SiteConfig.title}`,
  description:
    "Bienvenue sur Impulsion ! Configurez votre profil pour commencer.",
};

/**
 * Onboarding page for new users.
 * Allows users to choose their role (coach or athlete) and set up their profile.
 */
export default async function Page(props: PageProps<"/auth/new-user">) {
  // Check if user is authenticated
  await getRequiredUser();

  // If user already has organizations, they're already onboarded
  // Redirect to orgs page
  const userOrgs = await getUsersOrgs();
  if (userOrgs.length > 0) {
    const searchParams = await props.searchParams;
    const callbackUrl =
      typeof searchParams.callbackUrl === "string"
        ? searchParams.callbackUrl
        : "/orgs";
    redirect(callbackUrl);
  }

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main>
        <OnboardingWizard />
      </main>
    </div>
  );
}
