"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

type TypewriterTextProps = {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  cursorChar?: string;
  glowColor?: "lime" | "cyan" | "white";
  onComplete?: () => void;
};

export function TypewriterText({
  text,
  className,
  speed = 50,
  delay = 0,
  cursor = true,
  cursorChar = "_",
  glowColor = "lime",
  onComplete,
}: TypewriterTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;

      const intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(intervalId);
          setIsTyping(false);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(intervalId);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [isInView, text, speed, delay, onComplete]);

  const glowShadow = {
    lime: "0 0 20px oklch(0.91 0.23 120 / 0.5)",
    cyan: "0 0 20px oklch(0.85 0.16 195 / 0.5)",
    white: "0 0 20px oklch(1 0 0 / 0.4)",
  };

  const textColor = {
    lime: "text-lime-400",
    cyan: "text-cyan-400",
    white: "text-white",
  };

  return (
    <span
      ref={ref}
      className={cn(textColor[glowColor], className)}
      style={{ textShadow: glowShadow[glowColor] }}
    >
      {displayText}
      {cursor && !isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className={cn(isTyping ? "opacity-100" : "opacity-50")}
        >
          {cursorChar}
        </motion.span>
      )}
    </span>
  );
}

type TypewriterMultilineProps = {
  lines: string[];
  className?: string;
  lineClassName?: string;
  speed?: number;
  lineDelay?: number;
  glowColor?: "lime" | "cyan" | "white";
};

export function TypewriterMultiline({
  lines,
  className,
  lineClassName,
  speed = 50,
  lineDelay = 500,
  glowColor = "lime",
}: TypewriterMultilineProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);

  const handleLineComplete = () => {
    setCompletedLines((prev) => [...prev, lines[currentLine]]);
    if (currentLine < lines.length - 1) {
      setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
      }, lineDelay);
    }
  };

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {completedLines.map((line, index) => (
        <span
          key={index}
          className={cn(
            lineClassName,
            glowColor === "lime" && "text-lime-400",
            glowColor === "cyan" && "text-cyan-400",
            glowColor === "white" && "text-white",
          )}
        >
          {line}
        </span>
      ))}
      {currentLine < lines.length && (
        <TypewriterText
          text={lines[currentLine]}
          speed={speed}
          glowColor={glowColor}
          className={lineClassName}
          onComplete={handleLineComplete}
        />
      )}
    </div>
  );
}
