import { getRequestConfig } from "next-intl/server";
import { routing } from "./navigation";

/**
 * Configuration next-intl pour les Server Components
 *
 * Charge les messages de traduction pour la locale demandée.
 * Cette config est utilisée par le plugin next-intl.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale est fourni par le middleware
  let locale = await requestLocale;

  // Valider et fallback sur la locale par défaut
  if (!locale || !routing.locales.includes(locale as "fr" | "en")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../locales/${locale}/index.ts`)).default,
  };
});
