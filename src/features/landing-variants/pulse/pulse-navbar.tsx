"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function PulseNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        isScrolled ? "py-3" : "py-5",
      )}
    >
      {/* Glass background that appears on scroll */}
      <motion.div
        className="absolute inset-0 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl"
        style={{ opacity }}
      />

      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            className="relative flex size-10 items-center justify-center"
            whileHover={{ scale: 1.05 }}
          >
            {/* Pulse ring */}
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
            {/* Inner dot */}
            <div
              className="size-4 rounded-full bg-lime-400"
              style={{
                boxShadow: "0 0 20px oklch(0.91 0.23 120 / 0.6)",
              }}
            />
          </motion.div>
          <span
            className="text-xl font-bold text-lime-400"
            style={{ textShadow: "0 0 20px oklch(0.91 0.23 120 / 0.4)" }}
          >
            IMPULSION
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {["Fonctionnalites", "Tarifs", "Temoignages"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-neutral-400 transition-colors hover:text-lime-400"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Link
            href="/auth/signin"
            className="text-sm text-neutral-400 transition-colors hover:text-white"
          >
            Connexion
          </Link>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/auth/signup"
              className="rounded-lg bg-lime-400 px-5 py-2.5 text-sm font-semibold text-black transition-all hover:bg-lime-300"
              style={{
                boxShadow: "0 0 20px oklch(0.91 0.23 120 / 0.4)",
              }}
            >
              Commencer
            </Link>
          </motion.div>
        </div>
      </nav>
    </motion.header>
  );
}
