/**
 * Impulsion i18n Configuration
 *
 * Configuration centrale pour l'internationalisation.
 * Français par défaut, support anglais.
 */

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
};

export const localeFlags: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
};

/**
 * Vérifie si une chaîne est une locale valide
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Récupère la locale depuis un pathname
 */
export function getLocaleFromPathname(pathname: string): Locale | null {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isValidLocale(firstSegment)) {
    return firstSegment;
  }

  return null;
}
