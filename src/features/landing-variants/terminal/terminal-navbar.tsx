"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "specs", href: "#specs", shortcut: "1" },
  { label: "changelog", href: "#changelog", shortcut: "2" },
  { label: "install", href: "#install", shortcut: "3" },
  { label: "api", href: "#api", shortcut: "4" },
];

export function TerminalNavbar() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3.5 }}
      className="fixed top-0 right-0 left-0 z-50 border-b border-neutral-800 bg-black/90 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        {/* Path style logo */}
        <Link href="/" className="font-mono text-sm text-neutral-400">
          <span className="text-lime-400">~</span>/
          <span className="text-white">impulsion</span>/
          <span className="text-cyan-400">v2.0</span>
        </Link>

        {/* Nav items */}
        <div className="hidden items-center gap-1 font-mono text-sm md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-3 py-1"
              onMouseEnter={() => setActiveItem(item.href)}
              onMouseLeave={() => setActiveItem(null)}
            >
              {activeItem === item.href && (
                <motion.span
                  layoutId="terminal-nav-hover"
                  className="absolute inset-0 rounded bg-lime-400/10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                />
              )}
              <span
                className={cn(
                  "relative z-10",
                  activeItem === item.href
                    ? "text-lime-400"
                    : "text-neutral-500",
                )}
              >
                <span className="text-neutral-600">[{item.shortcut}]</span>{" "}
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Status */}
        <div className="flex items-center gap-4 font-mono text-xs">
          <span className="hidden text-neutral-600 sm:inline">
            branch: <span className="text-cyan-400">main</span>
          </span>
          <span className="flex items-center gap-1.5">
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
            <span className="text-lime-400">online</span>
          </span>
        </div>
      </div>
    </motion.nav>
  );
}
