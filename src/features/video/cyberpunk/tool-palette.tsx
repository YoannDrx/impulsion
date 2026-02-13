"use client";

import { GlassPanel, NeonText } from "@/components/impulsion/cyberpunk";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import {
  Circle,
  Grid3X3,
  Move,
  Pencil,
  Ruler,
  Square,
  Target,
  Trash2,
  Type,
  Undo,
  ZoomIn,
} from "lucide-react";
import { useState } from "react";

type Tool = {
  id: string;
  icon: LucideIcon;
  label: string;
  shortcut?: string;
};

const tools: Tool[] = [
  { id: "select", icon: Move, label: "Select", shortcut: "V" },
  { id: "draw", icon: Pencil, label: "Draw", shortcut: "P" },
  { id: "line", icon: Ruler, label: "Line", shortcut: "L" },
  { id: "circle", icon: Circle, label: "Circle", shortcut: "C" },
  { id: "rect", icon: Square, label: "Rectangle", shortcut: "R" },
  { id: "text", icon: Type, label: "Text", shortcut: "T" },
  { id: "marker", icon: Target, label: "Marker", shortcut: "M" },
  { id: "grid", icon: Grid3X3, label: "Grid", shortcut: "G" },
  { id: "zoom", icon: ZoomIn, label: "Zoom", shortcut: "Z" },
];

type ToolPaletteProps = {
  className?: string;
  activeTool?: string;
  onToolChange?: (toolId: string) => void;
  onUndo?: () => void;
  onClear?: () => void;
};

/**
 * ToolPalette - Palette d'outils d'analyse vidéo
 */
export function ToolPalette({
  className,
  activeTool: controlledTool,
  onToolChange,
  onUndo,
  onClear,
}: ToolPaletteProps) {
  const [internalTool, setInternalTool] = useState("select");
  const activeTool = controlledTool ?? internalTool;

  const handleToolClick = (toolId: string) => {
    setInternalTool(toolId);
    onToolChange?.(toolId);
  };

  return (
    <GlassPanel className={cn("w-14 p-2", className)} glow="lime">
      <NeonText
        as="span"
        color="lime"
        intensity="subtle"
        className="mb-3 block text-center font-mono text-[10px] tracking-wider"
      >
        TOOLS
      </NeonText>

      <div className="space-y-1">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => handleToolClick(tool.id)}
              title={`${tool.label} (${tool.shortcut})`}
              className={cn(
                "group relative flex size-10 items-center justify-center rounded transition-all",
                isActive
                  ? "bg-[var(--imp-lime-400)] text-black"
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-white",
              )}
            >
              <Icon className="size-4" />
              {/* Tooltip */}
              <div className="pointer-events-none absolute left-full ml-2 hidden rounded bg-neutral-900 px-2 py-1 font-mono text-xs whitespace-nowrap text-white group-hover:block">
                {tool.label}
                <span className="ml-2 text-neutral-500">[{tool.shortcut}]</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="my-3 h-px bg-neutral-800" />

      {/* Actions */}
      <div className="space-y-1">
        <button
          onClick={onUndo}
          title="Undo (Ctrl+Z)"
          className="flex size-10 items-center justify-center rounded text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
        >
          <Undo className="size-4" />
        </button>
        <button
          onClick={onClear}
          title="Clear All"
          className="flex size-10 items-center justify-center rounded text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-[var(--imp-danger-neon)]"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </GlassPanel>
  );
}
