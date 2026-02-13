"use client";

import { PulseLine } from "@/components/impulsion/landing";
import { motion } from "motion/react";
import Link from "next/link";

const footerLinks = {
  Produit: [
    { label: "Fonctionnalites", href: "#features" },
    { label: "Tarifs", href: "#pricing" },
    { label: "Changelog", href: "/changelog" },
    { label: "Roadmap", href: "/roadmap" },
  ],
  Ressources: [
    { label: "Documentation", href: "/docs" },
    { label: "Blog", href: "/posts" },
    { label: "FAQ", href: "#faq" },
    { label: "API", href: "/docs/api" },
  ],
  Entreprise: [
    { label: "A propos", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Carrieres", href: "/careers" },
    { label: "Presse", href: "/press" },
  ],
  Legal: [
    { label: "Confidentialite", href: "/legal/privacy" },
    { label: "CGU", href: "/legal/terms" },
    { label: "Cookies", href: "/legal/cookies" },
  ],
};

export function PulseFooter() {
  return (
    <footer className="relative bg-neutral-950 pt-16 pb-8">
      <PulseLine color="lime" className="absolute top-0" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                className="relative flex size-8 items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-lime-400"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div
                  className="size-3 rounded-full bg-lime-400"
                  style={{
                    boxShadow: "0 0 15px oklch(0.91 0.23 120 / 0.6)",
                  }}
                />
              </motion.div>
              <span
                className="text-lg font-bold text-lime-400"
                style={{ textShadow: "0 0 15px oklch(0.91 0.23 120 / 0.4)" }}
              >
                IMPULSION
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-neutral-400">
              La plateforme de coaching sportif hybride qui transforme les
              donnees brutes en performances concretes.
            </p>

            {/* Social links */}
            <div className="mt-6 flex gap-4">
              <SocialLink href="https://twitter.com" label="Twitter">
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </SocialLink>
              <SocialLink href="https://linkedin.com" label="LinkedIn">
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </SocialLink>
              <SocialLink href="https://github.com" label="GitHub">
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </SocialLink>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
                {category}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 transition-colors hover:text-lime-400"
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
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} Impulsion. Tous droits reserves.
          </p>
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-lime-500" />
            </span>
            <span className="text-sm text-neutral-500">
              Tous les systemes operationnels
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

type SocialLinkProps = {
  href: string;
  label: string;
  children: React.ReactNode;
};

function SocialLink({ href, label, children }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-10 items-center justify-center rounded-lg border border-white/10 text-neutral-400 transition-colors hover:border-lime-400/30 hover:text-lime-400"
      whileHover={{
        boxShadow: "0 0 20px oklch(0.91 0.23 120 / 0.2)",
      }}
    >
      {children}
    </motion.a>
  );
}
