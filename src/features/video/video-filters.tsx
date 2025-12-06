"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CyberButton } from "@/components/impulsion/cyber-button";
import { Calendar, Filter, Search, X } from "lucide-react";
import type { SessionOption } from "./video.query";

type VideoFiltersProps = {
  sessions: SessionOption[];
  selectedSession: string | null;
  onSessionChange: (sessionId: string | null) => void;
  dateFrom: string;
  onDateFromChange: (date: string) => void;
  dateTo: string;
  onDateToChange: (date: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
};

export function VideoFilters({
  sessions,
  selectedSession,
  onSessionChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  searchQuery,
  onSearchChange,
  onClearFilters,
  hasActiveFilters,
}: VideoFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative min-w-[200px] flex-1 sm:flex-none">
        <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        <Input
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Session Filter */}
      <Select
        value={selectedSession ?? "all"}
        onValueChange={(v) => onSessionChange(v === "all" ? null : v)}
      >
        <SelectTrigger className="w-[200px]">
          <Filter className="mr-2 size-4" />
          <SelectValue placeholder="Toutes les séances" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les séances</SelectItem>
          {sessions.map((session) => (
            <SelectItem key={session.id} value={session.id}>
              {session.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Date From */}
      <div className="relative">
        <Calendar className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        <Input
          type="date"
          value={dateFrom}
          onChange={(e) => onDateFromChange(e.target.value)}
          className="w-[150px] pl-9"
          placeholder="Du"
        />
      </div>

      {/* Date To */}
      <div className="relative">
        <Calendar className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        <Input
          type="date"
          value={dateTo}
          onChange={(e) => onDateToChange(e.target.value)}
          className="w-[150px] pl-9"
          placeholder="Au"
        />
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <CyberButton variant="ghost" size="sm" onClick={onClearFilters}>
          <X className="mr-1 size-4" />
          Effacer
        </CyberButton>
      )}
    </div>
  );
}
