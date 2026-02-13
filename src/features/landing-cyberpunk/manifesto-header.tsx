"use client";

import { StatusIndicator } from "@/components/impulsion/cyberpunk";
import { CyberButton } from "@/components/impulsion/cyberpunk/form/cyber-button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Manifesto Header - Navigation style HUD
 */
export function ManifestoHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--imp-glass-10)] bg-[var(--imp-void)]/90 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span className="font-mono text-xl font-bold text-[var(--imp-lime-400)]">
            IMPULSION
          </span>
          <StatusIndicator status="online" size="sm" />
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="#features"
            className="text-sm text-neutral-400 transition-colors hover:text-white"
          >
            Modules
          </Link>
          <Link
            href="#pricing"
            className="text-sm text-neutral-400 transition-colors hover:text-white"
          >
            Pricing
          </Link>
          <Link
            href="/docs"
            className="text-sm text-neutral-400 transition-colors hover:text-white"
          >
            Docs
          </Link>
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-3">
          <CyberButton variant="ghost" size="sm" asChild>
            <Link href="/auth/signin">LOGIN</Link>
          </CyberButton>
          <CyberButton variant="lime" size="sm" asChild>
            <Link href="/auth/signup">GET ACCESS</Link>
          </CyberButton>
        </div>
      </div>

      {/* HUD corners */}
      <div className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-[var(--imp-lime-400)]/50" />
      <div className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-[var(--imp-lime-400)]/50" />
    </header>
  );
}
