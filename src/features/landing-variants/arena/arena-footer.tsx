"use client";

import { motion } from "motion/react";
import Link from "next/link";

const footerLinks = {
  Produit: [
    { label: "Fonctionnalites", href: "#features" },
    { label: "Tarifs", href: "#pricing" },
    { label: "Changelog", href: "/changelog" },
  ],
  Ressources: [
    { label: "Documentation", href: "/docs" },
    { label: "Blog", href: "/posts" },
    { label: "Support", href: "/contact" },
  ],
  Legal: [
    { label: "Confidentialite", href: "/legal/privacy" },
    { label: "CGU", href: "/legal/terms" },
  ],
};

export function ArenaFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-black py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div
                className="size-3 rounded-full bg-lime-400"
                style={{ boxShadow: "0 0 15px oklch(0.91 0.23 120 / 0.6)" }}
              />
              <span className="text-xl font-black tracking-tight text-white uppercase">
                Impulsion
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-neutral-400">
              Sous les projecteurs de la performance. Chaque athlete merite un
              coach qui voit au-dela des chiffres.
            </p>

            {/* Social */}
            <div className="mt-6 flex gap-4">
              {["Twitter", "LinkedIn", "Instagram"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="text-neutral-500 transition-colors hover:text-lime-400"
                  whileHover={{ y: -2 }}
                >
                  <span className="sr-only">{social}</span>
                  <div className="size-5 rounded bg-neutral-800" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-bold tracking-wider text-white uppercase">
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
            &copy; {new Date().getFullYear()} Impulsion. The stage is set.
          </p>
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <span className="size-2 rounded-full bg-lime-400" />
            En ligne
          </div>
        </div>
      </div>
    </footer>
  );
}
