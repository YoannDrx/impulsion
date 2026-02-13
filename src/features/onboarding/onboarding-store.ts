"use client";

import type { Sport } from "@/lib/impulsion/types";
import { create } from "zustand";

export type UserRole = "coach" | "athlete";

type OnboardingStep = "role" | "profile" | "complete";

type OnboardingState = {
  step: OnboardingStep;
  role: UserRole | null;
  // Coach fields
  teamName: string;
  teamSport: Sport | null;
  // Athlete fields
  sport: Sport | null;
  seasonGoal: string;
  // Actions
  setStep: (step: OnboardingStep) => void;
  setRole: (role: UserRole) => void;
  setTeamName: (name: string) => void;
  setTeamSport: (sport: Sport) => void;
  setSport: (sport: Sport) => void;
  setSeasonGoal: (goal: string) => void;
  reset: () => void;
};

const initialState = {
  step: "role" as OnboardingStep,
  role: null,
  teamName: "",
  teamSport: null,
  sport: null,
  seasonGoal: "",
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialState,
  setStep: (step) => set({ step }),
  setRole: (role) => set({ role, step: "profile" }),
  setTeamName: (teamName) => set({ teamName }),
  setTeamSport: (teamSport) => set({ teamSport }),
  setSport: (sport) => set({ sport }),
  setSeasonGoal: (seasonGoal) => set({ seasonGoal }),
  reset: () => set(initialState),
}));
