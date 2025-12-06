"use client";

import { CyberButton } from "@/components/impulsion/cyber-button";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CalendarHeaderProps = {
  year: number;
  month: number;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
};

export function CalendarHeader({
  year,
  month,
  onPreviousMonth,
  onNextMonth,
  onToday,
}: CalendarHeaderProps) {
  const date = new Date(year, month, 1);
  const monthLabel = format(date, "MMMM yyyy", { locale: fr });

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <CyberButton variant="ghost" size="icon" onClick={onPreviousMonth}>
          <ChevronLeft className="size-5" />
        </CyberButton>
        <CyberButton variant="ghost" size="icon" onClick={onNextMonth}>
          <ChevronRight className="size-5" />
        </CyberButton>
        <h2 className="text-xl font-semibold capitalize">{monthLabel}</h2>
      </div>

      <CyberButton variant="outline" size="sm" onClick={onToday}>
        Aujourd'hui
      </CyberButton>
    </div>
  );
}
