"use client";

import { TerminalWindow, TypewriterText } from "@/components/impulsion/landing";
import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const bootSequence = [
  { text: "Initializing IMPULSION v2.0...", delay: 0 },
  { text: "Loading coaching modules... OK", delay: 800 },
  { text: "Connecting to athlete database... OK", delay: 1400 },
  { text: "Calibrating performance metrics... OK", delay: 2000 },
  { text: "System ready.", delay: 2600 },
];

const systemInfo = `
┌─────────────────────────────────────────────────┐
│  ██╗███╗   ███╗██████╗ ██╗   ██╗██╗     ███████╗│
│  ██║████╗ ████║██╔══██╗██║   ██║██║     ██╔════╝│
│  ██║██╔████╔██║██████╔╝██║   ██║██║     ███████╗│
│  ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██║     ╚════██║│
│  ██║██║ ╚═╝ ██║██║     ╚██████╔╝███████╗███████║│
│  ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚══════╝╚══════╝│
│                                                 │
│  The Operating System for Modern Coaching       │
│  Version 2.0.0-stable                          │
└─────────────────────────────────────────────────┘
`;

export function TerminalHero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [bootComplete, setBootComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isInView) {
      const bootTimer = setTimeout(() => {
        setBootComplete(true);
      }, 3200);

      const contentTimer = setTimeout(() => {
        setShowContent(true);
      }, 3800);

      return () => {
        clearTimeout(bootTimer);
        clearTimeout(contentTimer);
      };
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-black"
    >
      {/* Scanlines effect */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
        }}
      />

      {/* CRT glow effect */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow: "inset 0 0 100px rgba(163, 230, 53, 0.05)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 py-20">
        {/* Boot sequence terminal */}
        {!bootComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-3xl"
          >
            <TerminalWindow title="boot.sh">
              <div className="space-y-1 font-mono text-sm">
                {bootSequence.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: line.delay / 1000 }}
                    className="text-lime-400"
                  >
                    <span className="text-neutral-600">
                      [{String(index).padStart(2, "0")}]
                    </span>{" "}
                    {line.text}
                  </motion.div>
                ))}
              </div>
            </TerminalWindow>
          </motion.div>
        )}

        {/* Main content after boot */}
        {bootComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl text-center"
          >
            {/* ASCII art logo */}
            <motion.pre
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-8 overflow-x-auto font-mono text-[8px] whitespace-pre text-lime-400 sm:text-xs"
              style={{ textShadow: "0 0 10px rgba(163, 230, 53, 0.5)" }}
            >
              {systemInfo}
            </motion.pre>

            {/* Tagline */}
            {showContent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="font-mono text-lg text-neutral-500">
                  <span className="text-lime-400">$</span>{" "}
                  <TypewriterText
                    text="Le systeme d'exploitation du coaching moderne"
                    speed={30}
                    className="text-white"
                  />
                </div>

                {/* CTA buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row"
                >
                  <Link href="/auth/signup">
                    <motion.button
                      className="group relative font-mono"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="block rounded border border-lime-400 bg-lime-400/10 px-6 py-3 text-lime-400 transition-all group-hover:bg-lime-400 group-hover:text-black">
                        [ENTER] Executer
                      </span>
                    </motion.button>
                  </Link>

                  <Link href="/docs">
                    <motion.button
                      className="group font-mono"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="block rounded border border-neutral-700 px-6 py-3 text-neutral-400 transition-all group-hover:border-neutral-500 group-hover:text-white">
                        [D] Documentation
                      </span>
                    </motion.button>
                  </Link>
                </motion.div>

                {/* Keyboard hint */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="pt-8 font-mono text-xs text-neutral-600"
                >
                  Tip: Utilisez les raccourcis clavier pour naviguer
                </motion.p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Blinking cursor at bottom */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-lime-400"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        _
      </motion.div>
    </section>
  );
}
