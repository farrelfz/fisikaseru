import { create } from "zustand";
import type { LearningSummary, RoadmapProgress, UserProfile } from "@/types/user";

export interface UserState {
  profile: UserProfile | null;
  roadmap: RoadmapProgress[];
  summary: LearningSummary;
  setProfile: (profile: UserProfile) => void;
  trackRoadmap: (node: RoadmapProgress) => void;
  updateSummary: (summary: Partial<LearningSummary>) => void;
  reset: () => void;
}

const defaultSummary: LearningSummary = {
  lastSimulationRun: undefined,
  lastQuizAttempt: undefined,
  certificates: 0
};

export const userInitialState: Pick<UserState, "profile" | "roadmap" | "summary"> = {
  profile: null,
  roadmap: [],
  summary: { ...defaultSummary }
};

export const useUserStore = create<UserState>((set, get) => ({
  ...userInitialState,
  setProfile: (profile) => set({ profile }),
  trackRoadmap: (node) => {
    const updated = [...get().roadmap.filter((item) => item.nodeId !== node.nodeId), node];
    set({ roadmap: updated });
  },
  updateSummary: (summary) => set({ summary: { ...get().summary, ...summary } }),
  reset: () => set({ ...userInitialState, summary: { ...defaultSummary } })
}));
