"use client";
import { create } from "zustand";

type Status = "idle" | "running" | "stopped";

interface PyroState {
  parameters: { mass: number; temp: number; duration: number };
  status: Status;
  running: boolean;
  run: () => void;
  stop: () => void;
  reset: () => void;
}

export const usePyroStore = create<PyroState>((set) => ({
  parameters: { mass: 0.5, temp: 450, duration: 600 },
  status: "idle",
  running: false,
  run: () => set({ running: true, status: "running" }),
  stop: () => set({ running: false, status: "stopped" }),
  reset: () => set({ running: false, status: "idle" }),
}));
