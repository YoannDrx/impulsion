"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";

const footerLinks = [
  {
    category: "Produit",
    links: [
      { label: "Fonctionnalites", href: "#features" },
      { label: "Tarifs", href: "#pricing" },
      { label: "Documentation", href: "/docs" },
      { label: "API", href: "/api" },
    ],
  },
  {
    category: "Entreprise",
    links: [
      { label: "A propos", href: "/about" },
      { label: "Blog", href: "/posts" },
      { label: "Carrieres", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    category: "Legal",
    links: [
      { label: "Confidentialite", href: "/legal/privacy" },
      { label: "CGU", href: "/legal/terms" },
    ],
  },
];

const socialLinks = [
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
];

export function FlowFooter() {
  return (
    <footer className="relative bg-neutral-950 pt-16 pb-8">
      {/* Subtle wave at top */}
      <div className="absolute top-0 right-0 left-0 -translate-y-full">
        <svg
          viewBox="0 0 1440 60"
          className="h-auto w-full fill-neutral-950"
          preserveAspectRatio="none"
        >
          <path d="M0,60 C480,0 960,60 1440,30 L1440,60 Z" />
        </svg>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <motion.div
                className="size-3 rounded-full bg-lime-400"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(163, 230, 53, 0.4)",
                    "0 0 0 8px rgba(163, 230, 53, 0)",
                    "0 0 0 0 rgba(163, 230, 53, 0.4)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-lg font-bold text-white">Impulsion</span>
            </Link>

            <p className="mt-4 max-w-xs text-sm text-neutral-500">
              Le coaching fluide. Impulsion s&apos;adapte naturellement a votre
              rythme pour des resultats exceptionnels.
            </p>

            {/* Social links */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-sm text-neutral-500 transition-colors hover:text-lime-400"
                >
                  {social.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-semibold text-neutral-300">
                {group.category}
              </h3>
              <ul className="mt-4 space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm text-neutral-500 transition-colors hover:text-lime-400",
                      )}
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
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-8 md:flex-row">
          <p className="text-sm text-neutral-600">
            &copy; {new Date().getFullYear()} Impulsion. Tous droits reserves.
          </p>

          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <motion.span
              className="size-2 rounded-full bg-lime-400"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span>Tous les systemes operationnels</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
