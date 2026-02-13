"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaceWireframe } from "./face-wireframe";

type ScanPhase = "idle" | "scanning" | "processing" | "success" | "error";

type BiometricScannerProps = {
  className?: string;
  size?: number;
  onScanComplete?: (success: boolean) => void;
  autoStart?: boolean;
  scanDuration?: number;
};

const getStatusText = (phase: ScanPhase): string => {
  switch (phase) {
    case "idle":
      return "AWAITING SCAN";
    case "scanning":
      return "SCANNING...";
    case "processing":
      return "PROCESSING...";
    case "success":
      return "ACCESS GRANTED";
    case "error":
      return "ACCESS DENIED";
  }
};

/**
 * Biometric Scanner - Animation complete de scan biometrique
 * Combine FaceWireframe avec effets de scan et feedback
 */
export function BiometricScanner({
  className,
  size = 280,
  onScanComplete,
  autoStart = false,
  scanDuration = 3000,
}: BiometricScannerProps) {
  const [phase, setPhase] = useState<ScanPhase>(
    autoStart ? "scanning" : "idle",
  );
  const [progress, setProgress] = useState(0);
  const onScanCompleteRef = useRef(onScanComplete);

  // Keep ref updated
  useEffect(() => {
    onScanCompleteRef.current = onScanComplete;
  }, [onScanComplete]);

  const statusText = getStatusText(phase);

  const handleScanComplete = useCallback((success: boolean) => {
    setPhase(success ? "success" : "error");
    onScanCompleteRef.current?.(success);
  }, []);

  useEffect(() => {
    if (phase !== "scanning") return;

    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / scanDuration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(progressInterval);
        setPhase("processing");

        // Simulate processing
        setTimeout(() => {
          const success = Math.random() > 0.1; // 90% success rate
          handleScanComplete(success);
        }, 1000);
      }
    }, 50);

    return () => clearInterval(progressInterval);
  }, [phase, scanDuration, handleScanComplete]);

  const startScan = () => {
    if (phase === "idle" || phase === "success" || phase === "error") {
      setProgress(0);
      setPhase("scanning");
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case "success":
        return "var(--imp-lime-400)";
      case "error":
        return "var(--imp-danger-neon)";
      default:
        return "var(--imp-cyan-400)";
    }
  };

  return (
    <div
      className={cn(
        "relative flex flex-col items-center",
        phase === "idle" && "cursor-pointer",
        className,
      )}
      onClick={startScan}
      style={{ width: size }}
    >
      {/* Scanner frame */}
      <div
        className="relative rounded-lg border-2 p-4"
        style={{
          borderColor: getPhaseColor(),
          boxShadow: `0 0 20px ${getPhaseColor()}40, inset 0 0 20px ${getPhaseColor()}10`,
        }}
      >
        {/* Corner decorations */}
        <div
          className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2"
          style={{ borderColor: getPhaseColor() }}
        />
        <div
          className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2"
          style={{ borderColor: getPhaseColor() }}
        />
        <div
          className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2"
          style={{ borderColor: getPhaseColor() }}
        />
        <div
          className="absolute right-0 bottom-0 h-4 w-4 border-r-2 border-b-2"
          style={{ borderColor: getPhaseColor() }}
        />

        {/* Face wireframe */}
        <FaceWireframe
          size={size - 48}
          color={phase === "success" ? "lime" : "cyan"}
          animated={phase === "scanning" || phase === "processing"}
          scanLine={phase === "scanning"}
        />

        {/* Success/Error overlay */}
        {(phase === "success" || phase === "error") && (
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center rounded",
              phase === "success"
                ? "bg-[var(--imp-lime-400)]/10"
                : "bg-[var(--imp-danger-neon)]/10",
            )}
          >
            <span
              className="font-mono text-2xl font-bold"
              style={{ color: getPhaseColor() }}
            >
              {phase === "success" ? "OK" : "X"}
            </span>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-neutral-800">
        <div
          className="h-full transition-all duration-100"
          style={{
            width: `${progress}%`,
            backgroundColor: getPhaseColor(),
            boxShadow: `0 0 10px ${getPhaseColor()}`,
          }}
        />
      </div>

      {/* Status text */}
      <div className="mt-3 flex items-center gap-2">
        <span
          className={cn(
            "size-2 rounded-full",
            phase === "scanning" || phase === "processing"
              ? "animate-[imp-pulse-fast_0.5s_ease-in-out_infinite]"
              : "",
          )}
          style={{ backgroundColor: getPhaseColor() }}
        />
        <span
          className="font-mono text-xs tracking-wider uppercase"
          style={{ color: getPhaseColor() }}
        >
          {statusText}
        </span>
      </div>

      {/* Instruction */}
      {phase === "idle" && (
        <p className="mt-2 text-center font-mono text-xs text-neutral-500">
          CLICK TO INITIATE SCAN
        </p>
      )}
    </div>
  );
}
