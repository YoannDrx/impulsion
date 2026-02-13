"use client";

import { CircleSvg } from "@/components/svg/circle-svg";
import { buttonVariants } from "@/components/ui/button";
import { Typography } from "@/components/nowts/typography";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  const t = useTranslations("landing.hero");

  return (
    <div className="relative isolate flex flex-col">
      <GridBackground />
      <main className="relative py-24 sm:py-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Typography
              variant="h1"
              className="text-5xl font-semibold tracking-tight text-balance sm:text-7xl lg:text-7xl"
            >
              {t("title").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="relative inline-block">
                <span>{t("title").split(" ").slice(-1)[0]}</span>
                <CircleSvg className="fill-primary absolute inset-0" />
              </span>
            </Typography>
            <Typography
              variant="large"
              className="text-muted-foreground mt-8 text-lg font-medium text-pretty sm:text-xl/8"
            >
              {t("subtitle")}
            </Typography>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/signin"
                className={buttonVariants({ size: "lg", variant: "default" })}
              >
                {t("cta.primary")}
              </Link>
              <Link
                href="#features"
                className={buttonVariants({ size: "lg", variant: "link" })}
              >
                {t("cta.secondary")} <span aria-hidden="true">-&gt;</span>
              </Link>
            </div>
          </div>
          <Image
            alt="Impulsion Dashboard"
            src="/images/screenshot.png"
            width={1280}
            height={720}
            className="mt-16 rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 sm:mt-24"
          />
        </div>
      </main>
    </div>
  );
};

const GridBackground = () => {
  return (
    <div className="bg-grid absolute inset-0 [mask-image:linear-gradient(180deg,transparent,var(--foreground),transparent)]"></div>
  );
};
