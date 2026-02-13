"use client";

import {
  GlassPanel,
  NeonText,
  TerminalTyping,
} from "@/components/impulsion/cyberpunk";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type FeedItem = {
  id: string;
  type: "session" | "feedback" | "video" | "alert";
  message: string;
  timestamp: string;
  athlete?: string;
};

type LiveDataFeedProps = {
  className?: string;
  items?: FeedItem[];
  maxItems?: number;
};

const defaultItems: FeedItem[] = [
  {
    id: "1",
    type: "session",
    message: "Session completed: Interval Training",
    timestamp: "2min ago",
    athlete: "Lucas M.",
  },
  {
    id: "2",
    type: "feedback",
    message: "RPE submitted: 7/10",
    timestamp: "5min ago",
    athlete: "Marie P.",
  },
  {
    id: "3",
    type: "video",
    message: "New video uploaded for analysis",
    timestamp: "12min ago",
    athlete: "Thomas D.",
  },
  {
    id: "4",
    type: "alert",
    message: "ACWR threshold exceeded",
    timestamp: "18min ago",
    athlete: "Sophie L.",
  },
];

/**
 * LiveDataFeed - Feed temps réel des événements
 * Affiche les dernières activités avec animations
 */
export function LiveDataFeed({
  className,
  items = defaultItems,
  maxItems = 5,
}: LiveDataFeedProps) {
  const t = useTranslations("missionControl");
  const [visibleItems, setVisibleItems] = useState<FeedItem[]>([]);

  useEffect(() => {
    // Animate items appearing one by one
    const timer = setInterval(() => {
      setVisibleItems((prev) => {
        if (prev.length >= Math.min(items.length, maxItems)) {
          clearInterval(timer);
          return prev;
        }
        return [...prev, items[prev.length]];
      });
    }, 500);

    return () => clearInterval(timer);
  }, [items, maxItems]);

  const getTypeColor = (type: FeedItem["type"]) => {
    switch (type) {
      case "session":
        return "text-[var(--imp-lime-400)]";
      case "feedback":
        return "text-[var(--imp-cyan-400)]";
      case "video":
        return "text-[var(--imp-cyan-400)]";
      case "alert":
        return "text-[var(--imp-danger-neon)]";
    }
  };

  const getTypePrefix = (type: FeedItem["type"]) => {
    switch (type) {
      case "session":
        return "[SESSION]";
      case "feedback":
        return "[FEEDBACK]";
      case "video":
        return "[VIDEO]";
      case "alert":
        return "[ALERT]";
    }
  };

  return (
    <GlassPanel className={cn("p-6", className)} glow="none">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-[var(--imp-glass-10)] pb-4">
        <div className="flex items-center gap-3">
          <span className="size-2 animate-pulse rounded-full bg-[var(--imp-lime-400)]" />
          <NeonText
            as="h3"
            color="lime"
            intensity="subtle"
            className="font-mono text-sm tracking-wider uppercase"
          >
            {t("widgets.liveFeed.title")}
          </NeonText>
        </div>
        <span className="font-mono text-xs text-neutral-500">
          {t("widgets.liveFeed.realtime")}
        </span>
      </div>

      {/* Feed items */}
      <div className="space-y-3 font-mono text-sm">
        {visibleItems.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "flex flex-col gap-1 border-l-2 pl-3 transition-opacity duration-300",
              item.type === "alert"
                ? "border-[var(--imp-danger-neon)]"
                : "border-[var(--imp-glass-20)]",
            )}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div className="flex items-center gap-2">
              <span className={cn("text-xs", getTypeColor(item.type))}>
                {getTypePrefix(item.type)}
              </span>
              <span className="text-xs text-neutral-500">{item.timestamp}</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              {item.athlete && (
                <span className="text-white">{item.athlete}:</span>
              )}
              <span>{item.message}</span>
            </div>
          </div>
        ))}

        {visibleItems.length < items.length && (
          <div className="pl-3">
            <TerminalTyping
              text="Loading more events..."
              speed={50}
              cursor
              className="text-neutral-500"
            />
          </div>
        )}
      </div>
    </GlassPanel>
  );
}
