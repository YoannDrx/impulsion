"use client";

import { TerminalWindow, GitLogEntry } from "@/components/impulsion/landing";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const changelog = [
  {
    hash: "a3f7b2c",
    author: "team@impulsion.io",
    date: "Jan 28, 2026",
    message: "feat: Add real-time athlete performance dashboard",
  },
  {
    hash: "8d2e1f9",
    author: "team@impulsion.io",
    date: "Jan 25, 2026",
    message: "feat: Implement ACWR auto-calculation with risk alerts",
  },
  {
    hash: "5c9a3b7",
    author: "team@impulsion.io",
    date: "Jan 22, 2026",
    message: "feat: Video analysis with timestamp markers",
  },
  {
    hash: "2f8d4e1",
    author: "team@impulsion.io",
    date: "Jan 18, 2026",
    message: "feat: Strava integration for automatic sync",
  },
  {
    hash: "9b3c7a2",
    author: "team@impulsion.io",
    date: "Jan 15, 2026",
    message: "fix: Calendar drag-and-drop performance on mobile",
  },
];

const testimonials = [
  {
    hash: "user001",
    author: "Marie D. <marie@coach.fr>",
    date: "5 days ago",
    message: "Incroyable! J'ai gagne 2h par semaine sur ma gestion d'athletes.",
  },
  {
    hash: "user002",
    author: "Thomas M. <thomas@prepaphys.io>",
    date: "2 weeks ago",
    message:
      "L'analyse video est exactement ce dont j'avais besoin. Game changer.",
  },
  {
    hash: "user003",
    author: "Sophie B. <sophie@running.club>",
    date: "1 month ago",
    message: "Interface propre, fonctionnalites puissantes. Je recommande.",
  },
];

export function TerminalChangelog() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="changelog" ref={ref} className="relative bg-neutral-950 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Changelog */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 font-mono text-sm">
              <span className="text-lime-400">$</span>{" "}
              <span className="text-white">git log</span>{" "}
              <span className="text-cyan-400">--oneline -n 5</span>
            </div>

            <TerminalWindow title="changelog">
              <div className="space-y-1">
                {changelog.map((commit, index) => (
                  <motion.div
                    key={commit.hash}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1 }}
                    className="font-mono text-xs"
                  >
                    <span className="text-yellow-400">{commit.hash}</span>{" "}
                    <span className="text-white">{commit.message}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 border-t border-neutral-800 pt-4">
                <span className="font-mono text-xs text-neutral-600">
                  {`// ${changelog.length} commits this month`}
                </span>
              </div>
            </TerminalWindow>

            {/* Full log preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <TerminalWindow title="git log --format=full">
                {changelog.slice(0, 2).map((commit) => (
                  <GitLogEntry
                    key={commit.hash}
                    hash={commit.hash}
                    author={commit.author}
                    date={commit.date}
                    message={commit.message}
                  />
                ))}
              </TerminalWindow>
            </motion.div>
          </motion.div>

          {/* Testimonials as git log */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-6 font-mono text-sm">
              <span className="text-lime-400">$</span>{" "}
              <span className="text-white">git log</span>{" "}
              <span className="text-cyan-400">--author=users</span>
            </div>

            <TerminalWindow title="reviews.log">
              {testimonials.map((review, index) => (
                <motion.div
                  key={review.hash}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.15 }}
                  className="mb-6 border-b border-neutral-800 pb-6 last:mb-0 last:border-0 last:pb-0"
                >
                  <GitLogEntry
                    hash={review.hash}
                    author={review.author}
                    date={review.date}
                    message={`"${review.message}"`}
                  />
                </motion.div>
              ))}
            </TerminalWindow>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-6"
            >
              <TerminalWindow title="stats.sh">
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Total users:</span>
                    <span className="text-lime-400">500+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Athletes managed:</span>
                    <span className="text-lime-400">2,500+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Sessions tracked:</span>
                    <span className="text-lime-400">50,000+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Satisfaction:</span>
                    <span className="text-lime-400">98%</span>
                  </div>
                </div>
              </TerminalWindow>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
