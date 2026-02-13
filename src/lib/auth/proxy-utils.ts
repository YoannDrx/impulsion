import { auth } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { RESERVED_SLUGS } from "@/lib/organizations/reserved-slugs";
import { prisma } from "@/lib/prisma";
import { redisClient } from "@/lib/redis";
import { CacheKeys, CacheTTL } from "@/lib/redis-keys";
import { SiteConfig } from "@/site-config";
import {
  defaultLocale,
  getLocaleFromPathname,
  type Locale,
} from "@/i18n/config";
import { getSessionCookie } from "better-auth/cookies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const getLocaleFromRequest = (request: NextRequest) =>
  getLocaleFromPathname(request.nextUrl.pathname);

const withLocalePrefix = (pathname: string, locale: Locale | null) => {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (!locale || locale === defaultLocale) return normalizedPath;
  if (normalizedPath === "/") return `/${locale}`;
  return `/${locale}${normalizedPath}`;
};

export const handleRootRedirect = (request: NextRequest) => {
  if (!SiteConfig.features.enableLandingRedirection) return null;

  const session = getSessionCookie(request, {
    cookiePrefix: SiteConfig.appId,
  });

  if (!session) return null;

  const locale = getLocaleFromRequest(request);
  const url = request.nextUrl.clone();
  url.pathname = withLocalePrefix("/orgs", locale);
  return NextResponse.redirect(url);
};

export const extractOrgSlug = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  const orgIndex = segments.indexOf("orgs");
  if (orgIndex === -1) return null;

  const slug = segments[orgIndex + 1];
  if (!slug) return null;
  return slug;
};

export const validateSession = async (request: NextRequest) => {
  const sessionCookie = getSessionCookie(request, {
    cookiePrefix: SiteConfig.appId,
  });

  if (!sessionCookie) return null;

  const [session, activeOrganisation] = await Promise.all([
    auth.api.getSession({ headers: request.headers }),
    auth.api.getFullOrganization({ headers: request.headers }),
  ]);

  if (!session?.session) return null;

  return { session, activeOrganisation };
};

export const findUserOrganization = async (slug: string, userId: string) => {
  const cacheKey = CacheKeys.orgMember(slug, userId);

  try {
    const cached = await redisClient.get(cacheKey);

    if (cached) {
      return JSON.parse(cached) as { id: string; slug: string | null } | null;
    }
  } catch (error) {
    logger.error("[Cache Error] findUserOrganization:", error);
  }

  const org = await prisma.organization.findFirst({
    where: {
      OR: [{ slug }, { id: slug }],
      members: {
        some: { userId },
      },
    },
    select: { id: true, slug: true },
  });

  if (org) {
    try {
      await redisClient.setex(
        cacheKey,
        CacheTTL.ORG_MEMBER,
        JSON.stringify(org),
      );
    } catch (error) {
      logger.error("[Cache Error] setex findUserOrganization:", error);
    }
  }

  return org;
};

export const getFirstUserOrganization = async (userId: string) => {
  const cacheKey = CacheKeys.userFirstOrg(userId);

  try {
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return JSON.parse(cached) as { id: string; slug: string | null } | null;
    }
  } catch (error) {
    logger.error("[Cache Error] getFirstUserOrganization:", error);
  }

  const org = await prisma.organization.findFirst({
    where: {
      members: {
        some: { userId },
      },
    },
    select: { id: true, slug: true },
    orderBy: { createdAt: "asc" },
  });

  if (org) {
    try {
      await redisClient.setex(
        cacheKey,
        CacheTTL.ORG_MEMBER,
        JSON.stringify(org),
      );
    } catch (error) {
      logger.error("[Cache Error] setex getFirstUserOrganization:", error);
    }
  }

  return org;
};

export const switchActiveOrganization = async (
  request: NextRequest,
  organizationId: string,
) => {
  await auth.api.setActiveOrganization({
    headers: request.headers,
    body: { organizationId },
  });

  return NextResponse.redirect(request.url);
};

export const redirectToOrgList = (request: NextRequest) => {
  const locale = getLocaleFromRequest(request);
  const url = request.nextUrl.clone();
  url.pathname = withLocalePrefix("/orgs", locale);
  return NextResponse.redirect(url);
};

export const validateAdminAccess = async (request: NextRequest) => {
  const sessionCookie = getSessionCookie(request, {
    cookiePrefix: SiteConfig.appId,
  });

  if (!sessionCookie) return null;

  const session = await auth.api.getSession({ headers: request.headers });

  if (session?.user.role !== "admin") {
    return null;
  }

  return session.user;
};

export const redirectToRoot = (request: NextRequest) => {
  const locale = getLocaleFromRequest(request);
  const url = request.nextUrl.clone();
  url.pathname = withLocalePrefix("/", locale);
  return NextResponse.redirect(url);
};

export const isAdminRoute = (pathname: string) => {
  return pathname.startsWith("/admin");
};

export const isReservedSlug = (slug: string) => {
  return RESERVED_SLUGS.includes(slug);
};

export const buildOrgRedirectUrl = (request: NextRequest, newSlug: string) => {
  const currentPath = request.nextUrl.pathname;
  const locale = getLocaleFromPathname(currentPath);
  const segments = currentPath.split("/").filter(Boolean);

  if (locale) {
    segments.shift();
  }

  const orgIndex = segments.indexOf("orgs");
  if (orgIndex === -1) {
    segments.push("orgs", newSlug);
  } else if (segments.length > orgIndex + 1) {
    segments[orgIndex + 1] = newSlug;
  } else {
    segments.push(newSlug);
  }

  const newUrl = request.nextUrl.clone();
  newUrl.pathname = withLocalePrefix(`/${segments.join("/")}`, locale);
  return NextResponse.redirect(newUrl);
};
