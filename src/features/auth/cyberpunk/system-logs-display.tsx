"use client";

import { GlassPanel, TerminalTyping } from "@/components/impulsion/cyberpunk";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type LogEntry = {
  timestamp: string;
  level: "info" | "success" | "warning" | "error";
  message: string;
};

type SystemLogsDisplayProps = {
  className?: string;
  logs?: LogEntry[];
  autoGenerate?: boolean;
};

const defaultLogs: LogEntry[] = [
  {
    timestamp: "00:00:01",
    level: "info",
    message: "Initializing secure connection...",
  },
  {
    timestamp: "00:00:02",
    level: "success",
    message: "TLS 1.3 handshake complete",
  },
  {
    timestamp: "00:00:03",
    level: "info",
    message: "Authenticating endpoint...",
  },
  {
    timestamp: "00:00:04",
    level: "success",
    message: "Server identity verified",
  },
  {
    timestamp: "00:00:05",
    level: "info",
    message: "Loading biometric module...",
  },
  {
    timestamp: "00:00:06",
    level: "success",
    message: "Neural interface ready",
  },
  {
    timestamp: "00:00:07",
    level: "warning",
    message: "Awaiting user credentials",
  },
];

/**
 * SystemLogsDisplay - Affichage des logs système animés
 * Style terminal avec timestamps et niveaux de log
 */
export function SystemLogsDisplay({
  className,
  logs = defaultLogs,
  autoGenerate = true,
}: SystemLogsDisplayProps) {
  const [visibleLogs, setVisibleLogs] = useState<LogEntry[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoGenerate || currentIndex >= logs.length) return;

    const timer = setTimeout(() => {
      setVisibleLogs((prev) => [...prev, logs[currentIndex]]);
      setCurrentIndex((prev) => prev + 1);
    }, 800);

    return () => clearTimeout(timer);
  }, [currentIndex, logs, autoGenerate]);

  const getLevelColor = (level: LogEntry["level"]) => {
    switch (level) {
      case "success":
        return "text-[var(--imp-lime-400)]";
      case "warning":
        return "text-[var(--imp-warning)]";
      case "error":
        return "text-[var(--imp-danger-neon)]";
      default:
        return "text-[var(--imp-cyan-400)]";
    }
  };

  const getLevelPrefix = (level: LogEntry["level"]) => {
    switch (level) {
      case "success":
        return "[OK]";
      case "warning":
        return "[WARN]";
      case "error":
        return "[ERR]";
      default:
        return "[INFO]";
    }
  };

  return (
    <GlassPanel className={cn("p-4", className)} blur="light">
      <div className="mb-3 flex items-center gap-2 border-b border-[var(--imp-glass-10)] pb-2">
        <span className="size-2 animate-pulse rounded-full bg-[var(--imp-lime-400)]" />
        <span className="font-mono text-xs tracking-wider text-neutral-400 uppercase">
          System Logs
        </span>
      </div>

      <div className="max-h-48 space-y-1 overflow-y-auto font-mono text-xs">
        {visibleLogs.map((log, index) => (
          <div key={index} className="flex gap-2">
            <span className="text-neutral-600">[{log.timestamp}]</span>
            <span className={cn("w-12", getLevelColor(log.level))}>
              {getLevelPrefix(log.level)}
            </span>
            <span className="text-neutral-300">{log.message}</span>
          </div>
        ))}

        {autoGenerate && currentIndex < logs.length && (
          <div className="flex gap-2">
            <span className="text-neutral-600">[--:--:--]</span>
            <TerminalTyping
              text="..."
              speed={100}
              cursor
              className="text-neutral-500"
            />
          </div>
        )}
      </div>
    </GlassPanel>
  );
}
