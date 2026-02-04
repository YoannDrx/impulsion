"use client";

import { TerminalWindow, AsciiArt } from "@/components/impulsion/landing";
import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const specCategories = [
  {
    name: "FRONTEND",
    ascii: `
┌─────────┐
│ ◉ ◉ ◉  │
│ ═══════ │
│ ■ ■ ■ ■ │
└─────────┘`,
    specs: [
      { key: "framework", value: "Next.js 16", status: "stable" },
      { key: "language", value: "TypeScript (strict)", status: "stable" },
      { key: "styling", value: "TailwindCSS v4", status: "stable" },
      { key: "components", value: "Shadcn/UI", status: "stable" },
      { key: "animations", value: "Motion 12", status: "stable" },
    ],
  },
  {
    name: "BACKEND",
    ascii: `
┌─────────┐
│ ╔═╗╔═╗  │
│ ║ ║║ ║  │
│ ╚═╝╚═╝  │
└─────────┘`,
    specs: [
      { key: "runtime", value: "Node.js 20 LTS", status: "stable" },
      { key: "database", value: "PostgreSQL 16", status: "stable" },
      { key: "orm", value: "Prisma", status: "stable" },
      { key: "cache", value: "Redis", status: "stable" },
      { key: "auth", value: "Better Auth", status: "stable" },
    ],
  },
  {
    name: "INFRA",
    ascii: `
┌─────────┐
│  ☁  ☁   │
│ ┌───┐   │
│ │ ● │   │
└─┴───┴───┘`,
    specs: [
      { key: "hosting", value: "Vercel Edge", status: "stable" },
      { key: "cdn", value: "Cloudflare", status: "stable" },
      { key: "storage", value: "S3-compatible", status: "stable" },
      { key: "monitoring", value: "OpenTelemetry", status: "beta" },
      { key: "ci/cd", value: "GitHub Actions", status: "stable" },
    ],
  },
];

export function TerminalSpecs() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="specs" ref={ref} className="relative bg-black py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="mb-12 font-mono"
        >
          <span className="text-lime-400">$</span>{" "}
          <span className="text-white">cat</span>{" "}
          <span className="text-cyan-400">./specs.md</span>
        </motion.div>

        {/* Specs grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {specCategories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: catIndex * 0.15 }}
            >
              <TerminalWindow title={`${category.name.toLowerCase()}.spec`}>
                {/* ASCII art */}
                <AsciiArt
                  art={category.ascii}
                  color="cyan"
                  className="mb-4 text-[10px]"
                />

                {/* Category name */}
                <div className="mb-4 border-b border-neutral-800 pb-2 font-mono text-xs text-lime-400">
                  # {category.name}
                </div>

                {/* Specs list */}
                <div className="space-y-2">
                  {category.specs.map((spec, specIndex) => (
                    <motion.div
                      key={spec.key}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: catIndex * 0.15 + specIndex * 0.05 }}
                      className="flex items-center justify-between font-mono text-xs"
                    >
                      <span className="text-neutral-500">{spec.key}:</span>
                      <span className="flex items-center gap-2">
                        <span className="text-white">{spec.value}</span>
                        <span
                          className={cn(
                            "rounded px-1.5 py-0.5 text-[10px]",
                            spec.status === "stable"
                              ? "bg-lime-400/10 text-lime-400"
                              : "bg-yellow-400/10 text-yellow-400",
                          )}
                        >
                          {spec.status}
                        </span>
                      </span>
                    </motion.div>
                  ))}
                </div>
              </TerminalWindow>
            </motion.div>
          ))}
        </div>

        {/* Performance benchmark */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <TerminalWindow title="benchmark.sh">
            <div className="font-mono text-xs">
              <div className="mb-4 text-neutral-500">
                # Running Lighthouse audit...
              </div>

              <div className="space-y-2">
                <BenchmarkBar label="Performance" value={98} color="lime" />
                <BenchmarkBar label="Accessibility" value={100} color="lime" />
                <BenchmarkBar label="Best Practices" value={100} color="lime" />
                <BenchmarkBar label="SEO" value={100} color="lime" />
              </div>

              <div className="mt-4 text-lime-400">
                [OK] All benchmarks passed
              </div>
            </div>
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  );
}

type BenchmarkBarProps = {
  label: string;
  value: number;
  color: "lime" | "cyan" | "yellow" | "red";
};

function BenchmarkBar({ label, value, color }: BenchmarkBarProps) {
  const barColor = {
    lime: "bg-lime-400",
    cyan: "bg-cyan-400",
    yellow: "bg-yellow-400",
    red: "bg-red-400",
  };

  const textColor = {
    lime: "text-lime-400",
    cyan: "text-cyan-400",
    yellow: "text-yellow-400",
    red: "text-red-400",
  };

  return (
    <div className="flex items-center gap-4">
      <span className="w-28 text-neutral-500">{label}</span>
      <div className="flex-1">
        <div className="h-2 rounded-full bg-neutral-800">
          <motion.div
            className={cn("h-full rounded-full", barColor[color])}
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
      <span className={cn("w-12 text-right", textColor[color])}>{value}%</span>
    </div>
  );
}
