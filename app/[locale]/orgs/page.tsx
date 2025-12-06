import { GlowCard } from "@/components/impulsion/glow-card";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { getRequiredUser } from "@/lib/auth/auth-user";
import { combineWithParentMetadata } from "@/lib/metadata";
import { getUsersOrgs } from "@/query/org/get-users-orgs.query";
import { Plus, Users } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const generateMetadata = combineWithParentMetadata({
  title: "Mes Équipes",
  description: "Gérez vos équipes et accédez à vos athlètes.",
});

export default function Page() {
  return (
    <Suspense fallback={null}>
      <TeamsPage />
    </Suspense>
  );
}

async function TeamsPage() {
  await getRequiredUser();
  const userOrgs = await getUsersOrgs();

  // If user has only one org, redirect directly to it
  if (userOrgs.length === 1) {
    redirect(`/orgs/${userOrgs[0].slug}`);
  }

  return (
    <Layout size="lg">
      <LayoutHeader>
        <LayoutTitle>Mes Équipes</LayoutTitle>
        <LayoutDescription>
          Sélectionnez une équipe pour accéder à son tableau de bord
        </LayoutDescription>
      </LayoutHeader>
      <LayoutContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {userOrgs.map((org) => (
            <Link key={org.id} href={`/orgs/${org.slug}`}>
              <GlowCard
                variant="elevated"
                glow="none"
                className="hover:ring-primary/50 cursor-pointer transition-all duration-300 hover:ring-1"
              >
                <div className="flex items-center gap-4 p-6">
                  <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
                    <Users className="size-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{org.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      Équipe de coaching
                    </p>
                  </div>
                </div>
              </GlowCard>
            </Link>
          ))}

          {/* Create new team card */}
          <Link href="/orgs/new">
            <GlowCard
              variant="default"
              glow="none"
              className="hover:border-primary hover:ring-primary/50 cursor-pointer border-dashed transition-all duration-300 hover:ring-1"
            >
              <div className="flex items-center gap-4 p-6">
                <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-full">
                  <Plus className="size-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Créer une équipe</h3>
                  <p className="text-muted-foreground text-sm">
                    Nouvelle équipe de coaching
                  </p>
                </div>
              </div>
            </GlowCard>
          </Link>
        </div>
      </LayoutContent>
    </Layout>
  );
}
