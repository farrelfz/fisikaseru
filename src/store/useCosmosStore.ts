"use client";
import { create } from "zustand";

type Status = "idle" | "running" | "stopped";

interface CosmosState {
  parameters: { starMass: number; planetMass: number };
  status: Status;
  running: boolean;
  run: () => void;
  stop: () => void;
  reset: () => void;
}

export const useCosmosStore = create<CosmosState>((set) => ({
  parameters: { starMass: 1.0, planetMass: 0.001 },
  status: "idle",
  running: false,
  run: () => set({ running: true, status: "running" }),
  stop: () => set({ running: false, status: "stopped" }),
  reset: () => set({ running: false, status: "idle" }),
}));
