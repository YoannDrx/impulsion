"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Parcours", href: "#journey" },
  { label: "Fonctionnalites", href: "#features" },
  { label: "Temoignages", href: "#testimonials" },
  { label: "Tarifs", href: "#pricing" },
];

export function FlowNavbar() {
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(10, 10, 10, 0)", "rgba(10, 10, 10, 0.8)"],
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(12px)"],
  );

  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);

  return (
    <motion.nav
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="flex items-center gap-2 rounded-full border px-2 py-2"
        style={{
          backgroundColor,
          backdropFilter: backdropBlur,
          borderColor: `rgba(163, 230, 53, ${borderOpacity.get()})`,
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full bg-lime-400/10 px-4 py-2 transition-colors hover:bg-lime-400/20"
        >
          <motion.div
            className="size-2 rounded-full bg-lime-400"
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: [
                "0 0 0 0 rgba(163, 230, 53, 0.4)",
                "0 0 0 8px rgba(163, 230, 53, 0)",
                "0 0 0 0 rgba(163, 230, 53, 0.4)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-sm font-semibold text-white">Impulsion</span>
        </Link>

        {/* Nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-4 py-2"
              onMouseEnter={() => setIsHovered(link.href)}
              onMouseLeave={() => setIsHovered(null)}
            >
              {isHovered === link.href && (
                <motion.span
                  layoutId="navbar-hover"
                  className="absolute inset-0 rounded-full bg-white/5"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
                />
              )}
              <span
                className={cn(
                  "relative z-10 text-sm transition-colors",
                  isHovered === link.href
                    ? "text-lime-400"
                    : "text-neutral-400",
                )}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link href="/auth/signup">
          <motion.button
            className="rounded-full bg-lime-400 px-4 py-2 text-sm font-semibold text-neutral-950 transition-colors hover:bg-lime-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Commencer
          </motion.button>
        </Link>
      </motion.div>
    </motion.nav>
  );
}
