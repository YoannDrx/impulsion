"use client";

import { motion } from "motion/react";
import Link from "next/link";

const links = [
  { label: "docs", href: "/docs" },
  { label: "api", href: "/api" },
  { label: "blog", href: "/posts" },
  { label: "privacy", href: "/legal/privacy" },
  { label: "terms", href: "/legal/terms" },
];

export function TerminalFooter() {
  return (
    <footer className="relative border-t border-neutral-800 bg-black py-12">
      {/* Scanlines */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Logo as terminal prompt */}
          <Link href="/" className="font-mono text-sm">
            <span className="text-lime-400">~</span>
            <span className="text-white">/impulsion</span>
            <motion.span
              className="ml-1 inline-block"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <span className="text-lime-400">_</span>
            </motion.span>
          </Link>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs">
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-neutral-500 transition-colors hover:text-lime-400"
              >
                <span className="text-neutral-700">[{index + 1}]</span>{" "}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-600">
            <motion.span
              className="size-2 rounded-full bg-lime-400"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(163, 230, 53, 0.4)",
                  "0 0 0 4px rgba(163, 230, 53, 0)",
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span>v2.0.0</span>
            <span className="text-neutral-700">|</span>
            <span className="text-lime-400">stable</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center font-mono text-xs text-neutral-700">
          <span>{`// `}</span>
          <span className="text-neutral-600">
            &copy; {new Date().getFullYear()} Impulsion
          </span>
          <span>{` // `}</span>
          <span className="text-neutral-600">Built with precision</span>
        </div>

        {/* ASCII decoration */}
        <div className="mt-8 text-center font-mono text-[8px] text-neutral-800">
          <pre>
            {`
    ╔═══════════════════════════════════════════════════════════╗
    ║  Thank you for using IMPULSION - The Coaching OS v2.0     ║
    ╚═══════════════════════════════════════════════════════════╝
            `}
          </pre>
        </div>
      </div>
    </footer>
  );
}
