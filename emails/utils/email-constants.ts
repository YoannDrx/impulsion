import { getServerUrl } from "@/lib/server-url";
import { SiteConfig } from "@/site-config";

// Impulsion Brand Colors - Dark Theme for Sport Performance
export const EMAIL_COLORS = {
  // Primary brand color - Electric Lime
  primary: "#ccff00",
  primaryHover: "#b8e600",
  primaryDark: "#99cc00", // For text on light backgrounds

  // Secondary accent - Neon Cyan
  secondary: "#00f3ff",
  secondaryHover: "#00d4e0",

  // Dark background colors
  background: "#0a0a0a",
  cardBackground: "#1a1a1a",
  cardBackgroundLight: "#222222",

  // Text colors
  textPrimary: "#FFFFFF",
  textSecondary: "#A1A1AA",
  textMuted: "#71717A",
  textOnPrimary: "#0a0a0a", // Dark text on lime buttons

  // Accent colors
  success: "#22c55e",
  warning: "#eab308",
  error: "#ef4444",
  info: "#3b82f6",

  // Badge/Achievement colors
  gold: "#fbbf24",
  silver: "#9ca3af",
  bronze: "#d97706",

  // Border colors
  border: "#27272a",
  divider: "#3f3f46",
} as const;

// Email Typography
export const EMAIL_FONTS = {
  primary:
    "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  fallback: "Arial, sans-serif",
} as const;

// Get the base URL for email assets
export const getEmailBaseUrl = () => {
  let baseUrl = getServerUrl();
  // Email clients can't handle localhost URL
  if (baseUrl.startsWith("http://localhost")) {
    baseUrl = SiteConfig.prodUrl;
  }
  return baseUrl;
};

// Email URLs
export const EMAIL_URLS = {
  logo: () => `${getEmailBaseUrl()}${SiteConfig.appIcon}`,
  dashboard: () => `${getEmailBaseUrl()}/dashboard`,
  sessions: () => `${getEmailBaseUrl()}/sessions`,
  athletes: () => `${getEmailBaseUrl()}/athletes`,
  videos: () => `${getEmailBaseUrl()}/videos`,
  pricing: () => `${getEmailBaseUrl()}/pricing`,
  billing: () => `${getEmailBaseUrl()}/account/billing`,
  settings: () => `${getEmailBaseUrl()}/settings`,
  profile: () => `${getEmailBaseUrl()}/profile`,
  achievements: () => `${getEmailBaseUrl()}/achievements`,
  unsubscribe: () => `${getEmailBaseUrl()}/settings/notifications`,
} as const;

// Contact email
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_EMAIL_CONTACT ?? "hello@impulsion.app";

// Site config re-export for convenience
export { SiteConfig };
