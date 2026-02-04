export const previewStats = {
  athleteCount: 12,
  upcomingSessions: 5,
  completedSessions: 47,
  weeklyLoad: 2450,
};

export const previewCalendar = [
  { title: "Fractionne", day: "Lun", time: "10:00", type: "interval" as const },
  {
    title: "Sortie Longue",
    day: "Mer",
    time: "08:00",
    type: "endurance" as const,
  },
  { title: "Renfo", day: "Ven", time: "18:00", type: "strength" as const },
];

export const previewAthletes = [
  { name: "Lucas M.", status: "active" as const, load: 85 },
  { name: "Emma R.", status: "active" as const, load: 72 },
  { name: "Thomas D.", status: "rest" as const, load: 45 },
];
