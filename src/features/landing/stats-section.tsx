"use client";

import { useTranslations } from "next-intl";
import { animate } from "motion/react";
import { useEffect, useRef } from "react";
import { SectionLayout } from "./section-layout";

type StatProps = {
  number: number;
  suffix: string;
  textKey: string;
};

const stats: StatProps[] = [
  {
    number: 150,
    suffix: "+",
    textKey: "coaches",
  },
  {
    number: 2.5,
    suffix: "K",
    textKey: "athletes",
  },
  {
    number: 12,
    suffix: "K+",
    textKey: "sessions",
  },
];

export function StatsSection() {
  const t = useTranslations("landing.hero.stats");

  return (
    <SectionLayout size="sm">
      <div className="grid w-full items-center gap-12 sm:grid-cols-3 md:-mx-5 md:max-w-none md:gap-0">
        {stats.map((stat, index) => (
          <div key={index} className="relative text-center md:px-5">
            <h4 className="mb-2 text-2xl font-bold tabular-nums md:text-3xl">
              <Counter from={0} to={stat.number} />
              {stat.suffix}
            </h4>
            <p className="text-muted-foreground text-sm">{t(stat.textKey)}</p>
          </div>
        ))}
      </div>
    </SectionLayout>
  );
}

function Counter({
  from,
  to,
  duration = 2,
}: {
  from: number;
  to: number;
  duration?: number;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!nodeRef.current) return;
    const node = nodeRef.current;

    const controls = animate(from, to, {
      duration,
      ease: "easeInOut",

      onUpdate(value) {
        // Format based on whether it's a decimal or integer
        node.textContent =
          to < 10 ? value.toFixed(1) : Math.floor(value).toString();
      },
    });

    return () => controls.stop();
  }, [from, to, duration]);

  return <span ref={nodeRef}>{from}</span>;
}
