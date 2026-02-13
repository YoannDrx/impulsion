import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import { locales, defaultLocale } from "./config";

/**
 * Configuration du routing i18n
 */
export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed", // Pas de préfixe pour la locale par défaut (fr)
});

/**
 * Navigation utilities localisées
 *
 * Utiliser ces exports au lieu des imports de next/navigation
 * pour avoir un routing i18n automatique.
 *
 * @example
 * ```tsx
 * import { Link, useRouter, usePathname } from '@/i18n/navigation';
 *
 * // Link avec locale automatique
 * <Link href="/dashboard">Dashboard</Link>
 *
 * // Changer de locale
 * <Link href="/" locale="en">English</Link>
 * ```
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
