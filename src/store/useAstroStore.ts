"use client";
import { create } from "zustand";

type Status = "idle" | "running" | "stopped";

interface AstroState {
  parameters: { mass: number; radius: number; v0: number };
  status: Status;
  running: boolean;
  run: () => void;
  stop: () => void;
  reset: () => void;
}

export const useAstroStore = create<AstroState>((set) => ({
  parameters: { mass: 1, radius: 1, v0: 1 },
  status: "idle",
  running: false,
  run: () => set({ running: true, status: "running" }),
  stop: () => set({ running: false, status: "stopped" }),
  reset: () => set({ running: false, status: "idle" }),
}));
