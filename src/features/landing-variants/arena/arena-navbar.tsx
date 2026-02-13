"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";

export function ArenaNavbar() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300, 400], [0, 0, 1]);
  const y = useTransform(scrollY, [0, 300, 400], [-100, -100, 0]);

  return (
    <motion.header
      className="fixed top-0 right-0 left-0 z-50"
      style={{ opacity, y }}
    >
      <div className="border-b border-white/10 bg-black/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <div
                className="size-3 rounded-full bg-lime-400"
                style={{ boxShadow: "0 0 20px oklch(0.91 0.23 120 / 0.6)" }}
              />
            </div>
            <span className="text-xl font-black tracking-tight text-white uppercase">
              Impulsion
            </span>
          </Link>

          {/* Nav links */}
          <div className="hidden items-center gap-8 md:flex">
            {[
              { label: "Histoire", href: "#story" },
              { label: "Features", href: "#features" },
              { label: "Temoignages", href: "#testimonials" },
              { label: "Prix", href: "#pricing" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-neutral-400 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <Link
              href="/auth/signin"
              className="text-sm font-medium text-neutral-400 transition-colors hover:text-white"
            >
              Connexion
            </Link>
            <Link
              href="/auth/signup"
              className="rounded-lg bg-lime-400 px-5 py-2.5 text-sm font-bold text-black transition-all hover:bg-lime-300"
              style={{ boxShadow: "0 0 20px oklch(0.91 0.23 120 / 0.4)" }}
            >
              Commencer
            </Link>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function CinematicNavLink({ href, children, className }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative text-sm font-medium text-neutral-400 transition-colors hover:text-white",
        className,
      )}
    >
      {children}
      <motion.div
        className="absolute -bottom-1 left-0 h-px w-full origin-left bg-lime-400"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{ boxShadow: "0 0 10px oklch(0.91 0.23 120 / 0.5)" }}
      />
    </Link>
  );
}
