"use client";

import { LogoSvg } from "@/components/svg/logo-svg";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";

export function GridNavbar() {
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  return (
    <motion.header className="fixed top-0 right-0 left-0 z-50 bg-neutral-950/90 backdrop-blur-sm">
      <motion.div
        className="absolute inset-x-0 bottom-0 h-px bg-lime-400/30"
        style={{ opacity: borderOpacity }}
      />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <LogoSvg size={24} className="text-lime-400" />
          <span className="font-mono text-sm font-bold text-white">
            IMPULSION
          </span>
        </Link>

        {/* Nav with coordinates style */}
        <div className="hidden items-center gap-1 md:flex">
          {[
            { label: "Features", href: "#bento", coord: "[1,0]" },
            { label: "Specs", href: "#specs", coord: "[2,0]" },
            { label: "Architecture", href: "#arch", coord: "[3,0]" },
            { label: "Pricing", href: "#pricing", coord: "[4,0]" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex items-center gap-2 rounded px-3 py-2 font-mono text-sm text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-lime-400"
            >
              <span className="text-neutral-600 group-hover:text-lime-400/60">
                {item.coord}
              </span>
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Link
            href="/auth/signin"
            className="font-mono text-sm text-neutral-400 transition-colors hover:text-white"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="rounded border border-lime-400 bg-lime-400/10 px-4 py-2 font-mono text-sm text-lime-400 transition-all hover:bg-lime-400 hover:text-black"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
