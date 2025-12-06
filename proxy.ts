import createMiddleware from "next-intl/middleware";
import { locales } from "@/i18n/config";
import { routing } from "@/i18n/navigation";
import {
  buildOrgRedirectUrl,
  extractOrgSlug,
  findUserOrganization,
  getFirstUserOrganization,
  handleRootRedirect,
  isAdminRoute,
  isReservedSlug,
  redirectToOrgList,
  redirectToRoot,
  switchActiveOrganization,
  validateAdminAccess,
  validateSession,
} from "@/lib/auth/proxy-utils";
import type { NextRequest } from "next/server";
import type { NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

type ProxyContext = {
  request: NextRequest;
  pathname: string;
};

export async function proxy(request: NextRequest) {
  const intlResponse = intlMiddleware(request);
  const pathname = stripLocalePrefix(request.nextUrl.pathname);

  const authResponse = await handleProxy({ request, pathname });

  if (authResponse) {
    return mergeIntlCookies(intlResponse, authResponse);
  }

  return intlResponse;
}

function stripLocalePrefix(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return "/";
  }

  const [firstSegment, ...rest] = segments;
  if (!locales.includes(firstSegment as (typeof locales)[number])) {
    return pathname;
  }

  return rest.length ? `/${rest.join("/")}` : "/";
}

function mergeIntlCookies(
  intlResponse: NextResponse | undefined,
  response: NextResponse,
) {
  if (!intlResponse) return response;

  intlResponse.cookies.getAll().forEach((cookie) => {
    response.cookies.set(cookie);
  });

  return response;
}

async function handleProxy({
  request,
  pathname,
}: ProxyContext): Promise<NextResponse | undefined> {
  if (pathname === "/") {
    const rootRedirect = handleRootRedirect(request);
    if (rootRedirect) {
      return rootRedirect;
    }
  }

  if (isAdminRoute(pathname)) {
    const adminUser = await validateAdminAccess(request);
    if (!adminUser) {
      return redirectToRoot(request);
    }
    return undefined;
  }

  const slug = extractOrgSlug(pathname);
  if (!slug) return undefined;

  if (isReservedSlug(slug)) {
    return undefined;
  }

  const sessionData = await validateSession(request);
  if (!sessionData) return undefined;

  const { session, activeOrganisation } = sessionData;

  if (slug === "default") {
    const firstOrg = await getFirstUserOrganization(session.session.userId);
    if (firstOrg?.slug) {
      return buildOrgRedirectUrl(request, firstOrg.slug);
    }
    return redirectToOrgList(request);
  }

  if (activeOrganisation?.slug === slug) {
    return undefined;
  }

  const org = await findUserOrganization(slug, session.session.userId);

  if (!org) {
    return redirectToOrgList(request);
  }

  if (org.slug && slug !== org.slug) {
    return buildOrgRedirectUrl(request, org.slug);
  }

  return switchActiveOrganization(request, org.id);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_next|_vercel|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
