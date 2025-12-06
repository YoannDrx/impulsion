import { describe, expect, it } from "vitest";
import {
  ORGANIZATION_LINKS,
  getOrganizationNavigation,
} from "../app/[locale]/orgs/[orgSlug]/(navigation)/_navigation/org-navigation.links";
import type { AuthRole } from "../src/lib/auth/auth-permissions";

describe("getOrganizationNavigation", () => {
  it("should replace organization slug in all URLs", () => {
    const slug = "test-org";
    const userRoles: AuthRole[] = ["member"];

    const result = getOrganizationNavigation(slug, userRoles);

    // Check that all links have the slug replaced
    result.forEach((group) => {
      if (group.defaultOpenStartPath) {
        expect(group.defaultOpenStartPath).not.toContain(":organizationSlug");
        expect(group.defaultOpenStartPath).toContain(slug);
      }

      group.links.forEach((link) => {
        expect(link.href).not.toContain(":organizationSlug");
        expect(link.href).toContain(slug);
      });
    });
  });

  it("should filter links based on user roles - member", () => {
    const slug = "test-org";
    const userRoles: AuthRole[] = ["member"];

    const result = getOrganizationNavigation(slug, userRoles);

    // Only Coaching group is present (member has no access to Équipe group)
    expect(result).toHaveLength(1);
    // Member can only see links without role restrictions (4 links)
    expect(result[0].links).toHaveLength(4);
  });

  it("should filter links based on user roles - admin", () => {
    const slug = "test-org";
    // Note: isInRoles uses .every() so admin alone doesn't match ["admin", "owner"]
    // Only owner has full access. Admin sees only links without role restrictions.
    const userRoles: AuthRole[] = ["admin"];

    const result = getOrganizationNavigation(slug, userRoles);

    // Admin only sees links without role restrictions (4 links in Coaching)
    expect(result).toHaveLength(1); // Only Coaching group
    expect(result[0].links).toHaveLength(4);
  });

  it("should filter links based on user roles - owner", () => {
    const slug = "test-org";
    const userRoles: AuthRole[] = ["owner"];

    const result = getOrganizationNavigation(slug, userRoles);

    // Owner can access all links
    expect(result[0].links).toHaveLength(ORGANIZATION_LINKS[0].links.length);
    const settingsGroup = result[1];
    const allowedLinks = settingsGroup.links;
    expect(allowedLinks.length).toEqual(ORGANIZATION_LINKS[1].links.length);
    expect(allowedLinks.map((link) => link.label)).toContain("Athlètes");
    expect(allowedLinks.map((link) => link.label)).toContain("Paramètres");
    expect(allowedLinks.map((link) => link.label)).toContain("Abonnement");
    expect(allowedLinks.map((link) => link.label)).toContain("Zone danger");
  });

  it("should handle undefined user roles", () => {
    const slug = "test-org";
    const userRoles = undefined;

    const result = getOrganizationNavigation(slug, userRoles);

    // Only Coaching group is present (no access to Équipe group)
    expect(result).toHaveLength(1);
    // Only links without role restrictions are visible (4 links)
    expect(result[0].links).toHaveLength(4);
  });
});
