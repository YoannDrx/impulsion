"use client";

import { GlassPanel } from "@/components/impulsion/cyberpunk";
import { CyberButton } from "@/components/impulsion/cyberpunk/form/cyber-button";
import { TerminalInput } from "@/components/impulsion/cyberpunk/form/terminal-input";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

type TerminalAuthFormProps = {
  className?: string;
  onSubmit?: (data: { coachId: string; passKey: string }) => void;
  isLoading?: boolean;
};

/**
 * TerminalAuthForm - Formulaire d'authentification style terminal
 * Avec champs COACH_ID et PASS_KEY
 */
export function TerminalAuthForm({
  className,
  onSubmit,
  isLoading = false,
}: TerminalAuthFormProps) {
  const t = useTranslations("accessTerminal");
  const [coachId, setCoachId] = useState("");
  const [passKey, setPassKey] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ coachId, passKey });
  };

  return (
    <GlassPanel className={cn("p-6", className)} glow="lime">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Header */}
        <div className="border-b border-[var(--imp-glass-10)] pb-4">
          <h2 className="font-mono text-lg font-bold tracking-wider text-[var(--imp-lime-400)] uppercase">
            {t("form.title")}
          </h2>
          <p className="mt-1 text-xs text-neutral-500">{t("form.subtitle")}</p>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block font-mono text-xs tracking-wider text-neutral-400 uppercase">
              {t("form.coachId.label")}
            </label>
            <TerminalInput
              prefix=">"
              placeholder={t("form.coachId.placeholder")}
              value={coachId}
              onChange={(e) => setCoachId(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="mb-1.5 block font-mono text-xs tracking-wider text-neutral-400 uppercase">
              {t("form.passKey.label")}
            </label>
            <TerminalInput
              prefix=">"
              placeholder={t("form.passKey.placeholder")}
              type="password"
              value={passKey}
              onChange={(e) => setPassKey(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Forgot password */}
        <div className="text-right">
          <Link
            href="/auth/forget-password"
            className="font-mono text-xs text-neutral-500 transition-colors hover:text-[var(--imp-cyan-400)]"
          >
            {t("form.forgotPassword")}
          </Link>
        </div>

        {/* Submit button */}
        <CyberButton
          type="submit"
          variant="solid"
          size="lg"
          className="w-full"
          disabled={isLoading || !coachId || !passKey}
        >
          {isLoading ? t("form.loading") : t("form.submit")}
        </CyberButton>

        {/* Register link */}
        <p className="text-center text-sm text-neutral-500">
          {t("form.noAccount")}{" "}
          <Link
            href="/auth/signup"
            className="font-mono text-[var(--imp-lime-400)] transition-colors hover:underline"
          >
            {t("form.register")}
          </Link>
        </p>
      </form>
    </GlassPanel>
  );
}
