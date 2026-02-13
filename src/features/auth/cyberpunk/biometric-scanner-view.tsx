"use client";

import { BiometricScanner } from "@/components/impulsion/cyberpunk/svg/biometric-scanner";
import {
  GlassPanel,
  NoiseTexture,
  ScanlinesOverlay,
  StatusIndicator,
} from "@/components/impulsion/cyberpunk";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type BiometricScannerViewProps = {
  className?: string;
  onScanComplete?: (success: boolean) => void;
};

/**
 * BiometricScannerView - Vue du scanner biométrique pour l'authentification
 * Affiche le wireframe du visage avec effet de scan
 */
export function BiometricScannerView({
  className,
  onScanComplete,
}: BiometricScannerViewProps) {
  const t = useTranslations("accessTerminal");

  return (
    <div className={cn("relative", className)}>
      {/* Background effects */}
      <NoiseTexture opacity={0.02} />
      <ScanlinesOverlay intensity="subtle" />

      <GlassPanel className="p-8" glow="cyan">
        <div className="flex flex-col items-center gap-6">
          {/* Status header */}
          <div className="flex items-center gap-3">
            <StatusIndicator status="optimal" size="md" />
            <span className="font-mono text-sm tracking-wider text-[var(--imp-cyan-400)] uppercase">
              {t("scanner.status")}
            </span>
          </div>

          {/* Scanner */}
          <div className="relative">
            <BiometricScanner
              size={280}
              autoStart
              onScanComplete={onScanComplete}
            />
          </div>

          {/* Instructions */}
          <p className="max-w-xs text-center text-sm text-neutral-500">
            {t("scanner.instructions")}
          </p>
        </div>
      </GlassPanel>
    </div>
  );
}
