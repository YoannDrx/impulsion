"use client";

import { TerminalWindow } from "@/components/impulsion/landing";
import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Link from "next/link";

const packages = [
  {
    name: "starter",
    version: "0.0.0",
    description: "Pour demarrer avec Impulsion",
    price: "0",
    features: ["5 athletes max", "10 videos/mois", "Support email"],
    downloads: "Free",
  },
  {
    name: "pro",
    version: "2.0.0",
    description: "Pour les coachs serieux",
    price: "29",
    features: [
      "Athletes illimites",
      "Videos illimitees",
      "ACWR automatique",
      "Support prioritaire",
    ],
    downloads: "Most popular",
    recommended: true,
  },
  {
    name: "team",
    version: "2.0.0-enterprise",
    description: "Pour les structures",
    price: "79",
    features: ["Tout de Pro", "Multi-coachs", "API access", "SLA 99.9%"],
    downloads: "Enterprise",
  },
];

export function TerminalInstall() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="install" ref={ref} className="relative bg-black py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="mb-12 font-mono text-sm"
        >
          <span className="text-lime-400">$</span>{" "}
          <span className="text-white">npm search</span>{" "}
          <span className="text-cyan-400">@impulsion</span>
        </motion.div>

        {/* Packages */}
        <div className="grid gap-6 lg:grid-cols-3">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15 }}
            >
              <TerminalWindow
                title={`package.json`}
                className={cn(pkg.recommended && "ring-1 ring-lime-400/50")}
              >
                {/* Recommended badge */}
                {pkg.recommended && (
                  <div className="-mx-4 -mt-2 mb-4 border-b border-lime-400/30 bg-lime-400/10 px-4 py-2">
                    <span className="font-mono text-xs text-lime-400">
                      {`// RECOMMENDED`}
                    </span>
                  </div>
                )}

                {/* Package info */}
                <div className="font-mono text-xs">
                  <div className="text-neutral-500">{`{`}</div>
                  <div className="pl-4">
                    <div>
                      <span className="text-cyan-400">&quot;name&quot;</span>
                      <span className="text-white">: </span>
                      <span className="text-lime-400">
                        &quot;@impulsion/{pkg.name}&quot;
                      </span>
                      <span className="text-white">,</span>
                    </div>
                    <div>
                      <span className="text-cyan-400">&quot;version&quot;</span>
                      <span className="text-white">: </span>
                      <span className="text-yellow-400">
                        &quot;{pkg.version}&quot;
                      </span>
                      <span className="text-white">,</span>
                    </div>
                    <div>
                      <span className="text-cyan-400">
                        &quot;description&quot;
                      </span>
                      <span className="text-white">: </span>
                      <span className="text-neutral-400">
                        &quot;{pkg.description}&quot;
                      </span>
                      <span className="text-white">,</span>
                    </div>
                    <div>
                      <span className="text-cyan-400">&quot;price&quot;</span>
                      <span className="text-white">: </span>
                      <span className="text-lime-400">
                        &quot;{pkg.price}EUR/mois&quot;
                      </span>
                      <span className="text-white">,</span>
                    </div>
                    <div>
                      <span className="text-cyan-400">
                        &quot;features&quot;
                      </span>
                      <span className="text-white">: [</span>
                    </div>
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="pl-4">
                        <span className="text-neutral-400">
                          &quot;{feature}&quot;
                        </span>
                        {i < pkg.features.length - 1 && (
                          <span className="text-white">,</span>
                        )}
                      </div>
                    ))}
                    <div>
                      <span className="text-white">]</span>
                    </div>
                  </div>
                  <div className="text-neutral-500">{`}`}</div>
                </div>

                {/* Install command */}
                <div className="mt-6 rounded border border-neutral-800 bg-neutral-900/50 p-3">
                  <div className="font-mono text-xs">
                    <span className="text-lime-400">$</span>{" "}
                    <span className="text-white">npm install</span>{" "}
                    <span className="text-cyan-400">@impulsion/{pkg.name}</span>
                  </div>
                </div>

                {/* CTA */}
                <Link href="/auth/signup" className="mt-4 block">
                  <motion.button
                    className={cn(
                      "w-full rounded border py-2 font-mono text-sm transition-all",
                      pkg.recommended
                        ? "border-lime-400 bg-lime-400/10 text-lime-400 hover:bg-lime-400 hover:text-black"
                        : "border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-white",
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {pkg.price === "0" ? "npm install" : `npm install --save`}
                  </motion.button>
                </Link>

                {/* Downloads badge */}
                <div className="mt-4 text-center font-mono text-xs text-neutral-600">
                  {pkg.downloads}
                </div>
              </TerminalWindow>
            </motion.div>
          ))}
        </div>

        {/* Enterprise note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center font-mono text-sm"
        >
          <span className="text-neutral-600">{`// `}</span>
          <span className="text-neutral-500">
            Besoin d&apos;une solution sur mesure ?
          </span>{" "}
          <Link href="/contact" className="text-lime-400 hover:underline">
            npm run contact
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
