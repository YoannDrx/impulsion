import type { NavigationGroup } from "@/features/navigation/navigation.type";
import type { AuthRole } from "@/lib/auth/auth-permissions";
import { isInRoles } from "@/lib/organizations/is-in-roles";
import {
  Activity,
  Calendar,
  CalendarDays,
  ClipboardList,
  CreditCard,
  HeartPulse,
  Home,
  Settings,
  TriangleAlert,
  Users,
  Video,
} from "lucide-react";

const replaceSlug = (href: string, slug: string): string =>
  href.replace(":organizationSlug", slug);

export const getOrganizationNavigation = (
  slug: string,
  userRoles: AuthRole[] | undefined,
): NavigationGroup[] => {
  return ORGANIZATION_LINKS.reduce<NavigationGroup[]>((acc, group) => {
    const filteredLinks = group.links
      .filter((link) => !link.roles || isInRoles(userRoles, link.roles))
      .map((link) => ({
        ...link,
        href: replaceSlug(link.href, slug),
      }));

    if (filteredLinks.length === 0) return acc;

    acc.push({
      ...group,
      defaultOpenStartPath: group.defaultOpenStartPath
        ? replaceSlug(group.defaultOpenStartPath, slug)
        : undefined,
      links: filteredLinks,
    });

    return acc;
  }, []);
};

const ORGANIZATION_PATH = `/orgs/:organizationSlug`;

export const ORGANIZATION_LINKS: NavigationGroup[] = [
  {
    title: "Coaching",
    links: [
      {
        href: ORGANIZATION_PATH,
        Icon: Home,
        label: "Tableau de bord",
      },
      {
        href: `${ORGANIZATION_PATH}/calendar`,
        Icon: CalendarDays,
        label: "Calendrier",
      },
      {
        href: `${ORGANIZATION_PATH}/sessions`,
        Icon: Calendar,
        label: "Séances",
      },
      {
        href: `${ORGANIZATION_PATH}/videos`,
        Icon: Video,
        label: "Vidéos",
      },
      {
        href: `${ORGANIZATION_PATH}/workload`,
        Icon: Activity,
        label: "Charge",
        roles: ["admin", "owner"],
      },
      {
        href: `${ORGANIZATION_PATH}/injuries`,
        Icon: HeartPulse,
        label: "Blessures",
        roles: ["admin", "owner"],
      },
      {
        href: `${ORGANIZATION_PATH}/templates`,
        Icon: ClipboardList,
        label: "Templates",
        roles: ["admin", "owner"],
      },
    ],
  },
  {
    title: "Équipe",
    defaultOpenStartPath: `${ORGANIZATION_PATH}/settings`,
    links: [
      {
        href: `${ORGANIZATION_PATH}/settings/members`,
        Icon: Users,
        label: "Athlètes",
        roles: ["admin", "owner"],
      },
      {
        href: `${ORGANIZATION_PATH}/settings`,
        Icon: Settings,
        label: "Paramètres",
        roles: ["admin", "owner"],
      },
      {
        href: `${ORGANIZATION_PATH}/settings/billing`,
        Icon: CreditCard,
        label: "Abonnement",
        roles: ["admin", "owner"],
      },
      {
        href: `${ORGANIZATION_PATH}/settings/danger`,
        Icon: TriangleAlert,
        label: "Zone danger",
        roles: ["owner"],
      },
    ],
  },
] satisfies NavigationGroup[];
