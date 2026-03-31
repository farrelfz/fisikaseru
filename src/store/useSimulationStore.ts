import { create } from "zustand";
import { updateMotion } from "@/lib/physicsEngine";

type SimulationStore = {
  voltage: number;
  mass: number;
  charge: number;
  velocity: number;
  position: number;
  running: boolean;
  setVoltage: (voltage: number) => void;
  setMass: (mass: number) => void;
  setCharge: (charge: number) => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
  updateSimulation: (dt: number) => void;
};

const initialState = {
  voltage: 150,
  mass: 2e-12,
  charge: 1.6e-19,
  velocity: 0,
  position: 0,
  running: false
};

export const useSimulationStore = create<SimulationStore>((set, get) => ({
  ...initialState,
  setVoltage: (voltage) => set({ voltage }),
  setMass: (mass) => set({ mass }),
  setCharge: (charge) => set({ charge }),
  start: () => set({ running: true }),
  pause: () => set({ running: false }),
  reset: () => set({ ...initialState }),
  updateSimulation: (dt) => {
    const { running, voltage, mass, charge, velocity, position } = get();
    if (!running) return;

    const next = updateMotion({ voltage, mass, charge, velocity, position }, dt);
    const clampedPosition = Math.max(-1.4, Math.min(1.4, next.position));

    set({
      velocity: next.velocity,
      position: clampedPosition
    });
  }
}));
