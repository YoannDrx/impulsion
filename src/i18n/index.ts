/**
 * Impulsion i18n
 *
 * Point d'entrée pour l'internationalisation.
 */

// Configuration
export {
  locales,
  defaultLocale,
  localeNames,
  localeFlags,
  isValidLocale,
  getLocaleFromPathname,
  type Locale,
} from "./config";

// Navigation (utiliser à la place de next/navigation)
export {
  Link,
  redirect,
  usePathname,
  useRouter,
  getPathname,
} from "./navigation";

// Routing config
export { routing } from "./navigation";
