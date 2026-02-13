"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type TerminalTypingProps = {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  onComplete?: () => void;
};

/**
 * Terminal Typing - Texte avec effet typewriter style terminal
 * Affiche le texte caractere par caractere
 */
export function TerminalTyping({
  text,
  className,
  speed = 50,
  delay = 0,
  cursor = true,
  onComplete,
}: TerminalTypingProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(typingInterval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay, onComplete]);

  // Cursor blink effect
  useEffect(() => {
    if (!cursor) return;

    const blinkInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(blinkInterval);
  }, [cursor]);

  return (
    <span className={cn("font-mono text-[var(--imp-lime-400)]", className)}>
      {displayedText}
      {cursor && (
        <span
          className={cn(
            "ml-0.5 inline-block w-2 bg-current",
            isTyping ? "opacity-100" : showCursor ? "opacity-100" : "opacity-0",
          )}
          style={{ height: "1.1em" }}
        >
          &nbsp;
        </span>
      )}
    </span>
  );
}
