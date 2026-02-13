"use client";

import { LogoSvg } from "@/components/svg/logo-svg";
import Link from "next/link";

const footerLinks = [
  {
    category: "Product",
    links: [
      { label: "Features", href: "#bento" },
      { label: "Specs", href: "#specs" },
      { label: "Pricing", href: "#pricing" },
      { label: "Docs", href: "/docs" },
    ],
  },
  {
    category: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    category: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
    ],
  },
];

export function GridFooter() {
  return (
    <footer className="relative border-t border-neutral-800 bg-neutral-950 py-16">
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(90deg, oklch(0.91 0.23 120 / 0.02) 1px, transparent 1px),
            linear-gradient(180deg, oklch(0.91 0.23 120 / 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <LogoSvg size={24} className="text-lime-400" />
              <span className="font-mono text-sm font-bold text-white">
                IMPULSION
              </span>
            </Link>
            <p className="mt-4 max-w-xs font-mono text-xs text-neutral-500">
              {`// Plateforme de coaching sportif hybride. Construit avec precision.`}
            </p>

            {/* Version */}
            <div className="mt-6 inline-flex items-center gap-2 rounded border border-neutral-800 bg-neutral-900/50 px-3 py-1.5 font-mono text-xs">
              <span className="text-neutral-500">v2.0.0</span>
              <span className="size-1.5 rounded-full bg-lime-400" />
              <span className="text-lime-400">stable</span>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.category}>
              <h3 className="font-mono text-xs font-bold text-neutral-600 uppercase">
                {group.category}
              </h3>
              <ul className="mt-4 space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-mono text-sm text-neutral-400 transition-colors hover:text-lime-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-8 md:flex-row">
          <p className="font-mono text-xs text-neutral-600">
            &copy; {new Date().getFullYear()} Impulsion. Built with precision.
          </p>
          <div className="flex items-center gap-4 font-mono text-xs text-neutral-600">
            <span>Status:</span>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-lime-400" />
              <span className="text-lime-400">operational</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
