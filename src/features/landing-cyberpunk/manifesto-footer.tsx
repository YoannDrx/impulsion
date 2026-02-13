"use client";

import {
  MarqueeTicker,
  StatusIndicator,
} from "@/components/impulsion/cyberpunk";
import { useTranslations } from "next-intl";
import Link from "next/link";

/**
 * Manifesto Footer - Footer style HUD avec ticker
 */
export function ManifestoFooter() {
  const t = useTranslations("manifesto");

  return (
    <footer className="relative border-t border-[var(--imp-glass-10)] bg-[var(--imp-void)]">
      {/* Ticker band */}
      <div className="border-b border-[var(--imp-glass-5)] bg-[var(--imp-charcoal)] py-2">
        <MarqueeTicker speed="slow">
          <span className="text-xs tracking-wider text-neutral-400 uppercase">
            {t("system.ticker")}
          </span>
        </MarqueeTicker>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-screen-xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-xl font-bold text-[var(--imp-lime-400)]">
                {t("footer.system")}
              </span>
              <StatusIndicator status="online" size="sm" />
            </div>
            <p className="max-w-sm text-sm text-neutral-500">
              {t("footer.status")}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 font-mono text-xs font-bold tracking-wider text-neutral-400 uppercase">
              Resources
            </h4>
            <ul className="space-y-2">
              {Object.entries(
                t.raw("footer.links") as Record<string, string>,
              ).map(([key, value]) => (
                <li key={key}>
                  <Link
                    href={`/${key}`}
                    className="text-sm text-neutral-500 transition-colors hover:text-[var(--imp-cyan-400)]"
                  >
                    {value}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* System Status */}
          <div>
            <h4 className="mb-4 font-mono text-xs font-bold tracking-wider text-neutral-400 uppercase">
              System
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-500">API</span>
                <StatusIndicator status="online" size="sm" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-500">Database</span>
                <StatusIndicator status="online" size="sm" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-500">CDN</span>
                <StatusIndicator status="optimal" size="sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--imp-glass-10)] pt-8 md:flex-row">
          <div className="flex items-center gap-4 text-xs text-neutral-600">
            <span>© {new Date().getFullYear()} IMPULSION</span>
            <span>|</span>
            <Link href="/privacy" className="hover:text-neutral-400">
              Privacy
            </Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-neutral-400">
              Terms
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[var(--imp-lime-400)] shadow-[0_0_8px_var(--imp-lime-400)]" />
            <span className="font-mono text-xs tracking-wider text-neutral-600 uppercase">
              ALL SYSTEMS OPERATIONAL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
