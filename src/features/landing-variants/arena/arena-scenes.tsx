"use client";

import { GlowHeading, SpotlightBeam } from "@/components/impulsion/landing";
import { cn } from "@/lib/utils";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Calendar, Video, TrendingUp, MessageCircle } from "lucide-react";

const scenes = [
  {
    id: "scene-1",
    title: "Planifiez comme un pro",
    subtitle: "Acte I",
    description:
      "Un calendrier intelligent qui s'adapte a votre methode. Planifiez des semaines entieres, dupliquez des blocs, ajustez en temps reel.",
    icon: Calendar,
    color: "lime" as const,
    features: [
      "Drag & drop intuitif",
      "Templates replicables",
      "Alertes automatiques",
    ],
  },
  {
    id: "scene-2",
    title: "Analysez chaque mouvement",
    subtitle: "Acte II",
    description:
      "Uploadez vos videos, ajoutez des marqueurs temporels, annotez les points cles. Vos athletes comprennent instantanement.",
    icon: Video,
    color: "cyan" as const,
    features: [
      "Marqueurs timestamps",
      "Annotations visuelles",
      "Partage instantane",
    ],
  },
  {
    id: "scene-3",
    title: "Maitrisez la charge",
    subtitle: "Acte III",
    description:
      "Le ratio ACWR n'a plus de secret. Visualisez la fatigue, detectez les risques, optimisez la progression.",
    icon: TrendingUp,
    color: "lime" as const,
    features: ["ACWR automatique", "Zones de risque", "Historique complet"],
  },
  {
    id: "scene-4",
    title: "Communiquez efficacement",
    subtitle: "Acte IV",
    description:
      "Fini les messages eparpilles. Tout le feedback au meme endroit, structure et actionable.",
    icon: MessageCircle,
    color: "cyan" as const,
    features: ["Feedback structure", "Notifications", "Historique conserve"],
  },
];

export function ArenaScenes() {
  return (
    <section id="features" className="relative bg-black">
      {/* Section header */}
      <div className="relative py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm tracking-widest text-neutral-500 uppercase"
          >
            Le scenario parfait
          </motion.span>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <GlowHeading level={2} glowColor="lime" className="mt-4">
              Quatre actes pour la victoire
            </GlowHeading>
          </motion.div>
        </div>
      </div>

      {/* Scenes */}
      {scenes.map((scene, index) => (
        <SceneSection key={scene.id} scene={scene} index={index} />
      ))}
    </section>
  );
}

type SceneSectionProps = {
  scene: (typeof scenes)[number];
  index: number;
};

function SceneSection({ scene, index }: SceneSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.9, 1, 1, 0.9],
  );
  const Icon = scene.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className="relative min-h-screen py-24"
      style={{ opacity }}
    >
      {/* Spotlight beam */}
      <SpotlightBeam
        color={scene.color}
        angle={isEven ? -25 : 25}
        width={300}
        animated
      />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          style={{ scale }}
          className={cn(
            "grid items-center gap-12 lg:grid-cols-2",
            !isEven && "lg:direction-rtl",
          )}
        >
          {/* Content */}
          <div className={cn(!isEven && "lg:order-2 lg:text-right")}>
            {/* Act number */}
            <motion.span
              initial={{ opacity: 0, x: isEven ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className={cn(
                "text-sm font-medium tracking-widest uppercase",
                scene.color === "lime"
                  ? "text-lime-400/60"
                  : "text-cyan-400/60",
              )}
            >
              {scene.subtitle}
            </motion.span>

            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={cn(
                "mt-4 text-4xl font-black tracking-tight uppercase md:text-5xl",
                scene.color === "lime" ? "text-lime-400" : "text-cyan-400",
              )}
              style={{
                textShadow:
                  scene.color === "lime"
                    ? "0 0 40px oklch(0.91 0.23 120 / 0.4)"
                    : "0 0 40px oklch(0.85 0.16 195 / 0.4)",
              }}
            >
              {scene.title}
            </motion.h3>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-neutral-300"
            >
              {scene.description}
            </motion.p>

            {/* Features */}
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={cn(
                "mt-8 space-y-3",
                !isEven && "lg:flex lg:flex-col lg:items-end",
              )}
            >
              {scene.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-neutral-400"
                >
                  <div
                    className={cn(
                      "size-1.5 rounded-full",
                      scene.color === "lime" ? "bg-lime-400" : "bg-cyan-400",
                    )}
                    style={{
                      boxShadow:
                        scene.color === "lime"
                          ? "0 0 10px oklch(0.91 0.23 120 / 0.6)"
                          : "0 0 10px oklch(0.85 0.16 195 / 0.6)",
                    }}
                  />
                  {feature}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Visual */}
          <div className={cn(!isEven && "lg:order-1")}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex items-center justify-center"
            >
              {/* Glow backdrop */}
              <div
                className="absolute size-64 rounded-full blur-3xl"
                style={{
                  background:
                    scene.color === "lime"
                      ? "oklch(0.91 0.23 120 / 0.2)"
                      : "oklch(0.85 0.16 195 / 0.2)",
                }}
              />

              {/* Icon container */}
              <motion.div
                className={cn(
                  "relative flex size-48 items-center justify-center rounded-3xl border",
                  scene.color === "lime"
                    ? "border-lime-400/30 bg-lime-400/5"
                    : "border-cyan-400/30 bg-cyan-400/5",
                )}
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    scene.color === "lime"
                      ? "0 0 60px oklch(0.91 0.23 120 / 0.3)"
                      : "0 0 60px oklch(0.85 0.16 195 / 0.3)",
                }}
              >
                <Icon
                  className={cn(
                    "size-24",
                    scene.color === "lime" ? "text-lime-400" : "text-cyan-400",
                  )}
                  strokeWidth={1}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
