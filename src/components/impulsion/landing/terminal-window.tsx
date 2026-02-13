"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

type TerminalWindowProps = {
  children: ReactNode;
  className?: string;
  title?: string;
  showControls?: boolean;
};

export function TerminalWindow({
  children,
  className,
  title = "terminal",
  showControls = true,
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950",
        className,
      )}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-neutral-800 bg-neutral-900 px-4 py-2">
        {showControls && (
          <div className="flex gap-1.5">
            <div className="size-3 rounded-full bg-red-500/80" />
            <div className="size-3 rounded-full bg-yellow-500/80" />
            <div className="size-3 rounded-full bg-green-500/80" />
          </div>
        )}
        <span className="flex-1 text-center font-mono text-xs text-neutral-500">
          {title}
        </span>
        {showControls && <div className="w-12" />}
      </div>

      {/* Content */}
      <div className="p-4 font-mono text-sm">{children}</div>
    </div>
  );
}

type TerminalLineProps = {
  prompt?: string;
  command?: string;
  output?: string | string[];
  delay?: number;
  typing?: boolean;
  className?: string;
};

export function TerminalLine({
  prompt = "$",
  command,
  output,
  delay = 0,
  typing = true,
  className,
}: TerminalLineProps) {
  const [displayCommand, setDisplayCommand] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!command || !typing) {
      setDisplayCommand(command ?? "");
      setShowOutput(true);
      setIsComplete(true);
      return;
    }

    let currentIndex = 0;
    const startTimeout = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (currentIndex < command.length) {
          setDisplayCommand(command.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(intervalId);
          setTimeout(() => {
            setShowOutput(true);
            setIsComplete(true);
          }, 300);
        }
      }, 50);

      return () => clearInterval(intervalId);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [command, delay, typing]);

  const outputLines = Array.isArray(output) ? output : output ? [output] : [];

  return (
    <div className={cn("mb-2", className)}>
      {command && (
        <div className="flex items-center gap-2">
          <span className="text-lime-400">{prompt}</span>
          <span className="text-white">
            {displayCommand}
            {!isComplete && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="ml-0.5 inline-block h-4 w-2 bg-lime-400"
              />
            )}
          </span>
        </div>
      )}
      {showOutput &&
        outputLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="text-neutral-400"
          >
            {line}
          </motion.div>
        ))}
    </div>
  );
}

type BootSequenceProps = {
  lines: string[];
  onComplete?: () => void;
  className?: string;
};

export function BootSequence({
  lines,
  onComplete,
  className,
}: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    if (visibleLines < lines.length) {
      const timeout = setTimeout(
        () => {
          setVisibleLines((prev) => prev + 1);
        },
        100 + lines[visibleLines].length * 10,
      );

      return () => clearTimeout(timeout);
    } else {
      onComplete?.();
    }
  }, [visibleLines, lines, onComplete]);

  return (
    <div className={cn("font-mono text-sm", className)}>
      {lines.slice(0, visibleLines).map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cn(
            line.startsWith("[OK]") && "text-lime-400",
            line.startsWith("[ERR]") && "text-red-400",
            line.startsWith("[WARN]") && "text-yellow-400",
            line.startsWith("[INFO]") && "text-cyan-400",
            !line.startsWith("[") && "text-neutral-500",
          )}
        >
          {line}
        </motion.div>
      ))}
      {visibleLines < lines.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="inline-block h-4 w-2 bg-lime-400"
        />
      )}
    </div>
  );
}

type AsciiArtProps = {
  art: string;
  className?: string;
  color?: "lime" | "cyan" | "white";
  animated?: boolean;
};

export function AsciiArt({
  art,
  className,
  color = "lime",
  animated = false,
}: AsciiArtProps) {
  const colorClass = {
    lime: "text-lime-400",
    cyan: "text-cyan-400",
    white: "text-white",
  };

  const glowStyle = {
    lime: { textShadow: "0 0 10px oklch(0.91 0.23 120 / 0.5)" },
    cyan: { textShadow: "0 0 10px oklch(0.85 0.16 195 / 0.5)" },
    white: { textShadow: "0 0 10px oklch(1 0 0 / 0.3)" },
  };

  if (animated) {
    const lines = art.split("\n");
    return (
      <pre
        className={cn(
          "font-mono text-xs leading-none",
          colorClass[color],
          className,
        )}
        style={glowStyle[color]}
      >
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            {line}
          </motion.div>
        ))}
      </pre>
    );
  }

  return (
    <pre
      className={cn(
        "font-mono text-xs leading-none",
        colorClass[color],
        className,
      )}
      style={glowStyle[color]}
    >
      {art}
    </pre>
  );
}

type GitLogEntryProps = {
  hash: string;
  author: string;
  date: string;
  message: string;
  className?: string;
};

export function GitLogEntry({
  hash,
  author,
  date,
  message,
  className,
}: GitLogEntryProps) {
  return (
    <div className={cn("mb-4 font-mono text-sm", className)}>
      <div className="flex items-center gap-2">
        <span className="text-yellow-400">commit</span>
        <span className="text-lime-400">{hash}</span>
      </div>
      <div className="text-neutral-400">
        Author: <span className="text-white">{author}</span>
      </div>
      <div className="text-neutral-400">
        Date: <span className="text-white">{date}</span>
      </div>
      <div className="mt-2 pl-4 text-white">{message}</div>
    </div>
  );
}
