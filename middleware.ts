import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/navigation";

/**
 * Middleware Impulsion
 *
 * Gère :
 * - Détection automatique de la locale (Accept-Language)
 * - Redirection vers la locale par défaut si nécessaire
 * - Préservation de la locale dans les cookies
 */
export default createMiddleware(routing);

export const config = {
  // Matcher pour toutes les routes sauf :
  // - api routes
  // - static files (_next, favicon, etc.)
  // - images et autres assets
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
