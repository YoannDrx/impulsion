"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbTerminalProps = {
  items: BreadcrumbItem[];
  className?: string;
  prefix?: string;
};

/**
 * Breadcrumb Terminal - Fil d'ariane style chemin de fichier terminal
 * Avec prefix optionnel (ex: "~/", "root@impulsion:")
 */
export function BreadcrumbTerminal({
  items,
  className,
  prefix = "~/impulsion",
}: BreadcrumbTerminalProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center font-mono text-sm", className)}
    >
      <span className="text-[var(--imp-lime-400)]">{prefix}</span>
      <span className="mx-1 text-neutral-500">/</span>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={item.label} className="flex items-center">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-neutral-400 transition-colors hover:text-[var(--imp-cyan-400)]"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  isLast ? "text-[var(--imp-cyan-400)]" : "text-neutral-400",
                )}
              >
                {item.label}
              </span>
            )}

            {!isLast && (
              <ChevronRight className="mx-1 size-3 text-neutral-600" />
            )}
          </span>
        );
      })}
    </nav>
  );
}
