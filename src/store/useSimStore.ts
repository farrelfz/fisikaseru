"use client";
import { create } from "zustand";
import { LAB } from "@/lib/constants";

// Refactored store for MilikanLab per module
export type Mode = "floating" | "rising";
export type Polarity = "top-positive" | "bottom-positive";
export type SimSpeed = "slow" | "normal" | "fast" | "ultra";
export type Material = "aluminium" | "brass" | "steel";
export type MeasurementMode = "measure_v_fall" | "measure_v_rise" | "auto_terminal";

export type FloatingRow = {
  id: number;
  U: number; // Volt
  t2: number; // seconds
  v2: number; // mm/s
  rMicron: number; // micron
  q19: number; // x1e-19 C
};

export type RisingFallingRow = {
  id: number;
  U: number; // Volt
  t1: number; // seconds
  t2: number; // seconds
  v1: number; // mm/s
  v2: number; // mm/s
  rMicron: number;
  q19: number;
};



export interface SimState {
  // core experimental settings
  mode: Mode;
  U: number; // voltage (0–2000 V)
  polarity: Polarity;
  running: boolean;
  simSpeed: SimSpeed;
  showElectricField: boolean;

  // optical UI
  lampIntensity: number; // 0–100
  focus: number; // 0–100
  colorTemperature: number; // 2000–7500 K
  backgroundContrast: number; // 0–100

  // stopwatch & reticle
  stopwatchRunning: boolean;
  reticleTopY: number; // in mm relative reference (for UI)
  reticleBottomY: number;
  lastCrossTopAt: number | null; // timestamp ms
  lastCrossBottomAt: number | null;

  // instrument geometry & materials
  plateTopMaterial: Material;
  plateBottomMaterial: Material;
  plateSeparationMm: number; // mm
  plateThicknessMm: number; // mm
  plateReflectiveness: number; // 0–100

  // droplets
  dropletCount: number;
  dropletAutoGen: boolean;
  lockedDropletId?: string | null;
  microscopeView: boolean;
  measurementMode: MeasurementMode;
  autoCaptureFall: boolean;
  autoCaptureRise: boolean;

  // data tables
  floatingTable: FloatingRow[];
  risingTable: RisingFallingRow[];

  // computed latest results
  rMicron?: number;
  q?: number;
  qc?: number;

  // actions
  setMode: (m: Mode) => void;
  setU: (U: number) => void;
  setPolarity: (p: Polarity) => void;
  setLampIntensity: (v: number) => void;
  setFocus: (v: number) => void;
  setSimSpeed: (s: SimSpeed) => void;
  setShowElectricField: (v: boolean) => void;
  setColorTemperature: (k: number) => void;
  setBackgroundContrast: (v: number) => void;
  setPlateTopMaterial: (m: Material) => void;
  setPlateBottomMaterial: (m: Material) => void;
  setPlateSeparationMm: (mm: number) => void;
  setPlateThicknessMm: (mm: number) => void;
  setPlateReflectiveness: (v: number) => void;
  setDropletAutoGen: (v: boolean) => void;
  addDroplet: () => void;
  clearDroplets: () => void;
  lockDroplet: (id: string | null) => void;
  toggleMicroscopeView: () => void;
  setMeasurementMode: (m: MeasurementMode) => void;
  setAutoCaptureFall: (v: boolean) => void;
  setAutoCaptureRise: (v: boolean) => void;

  // floating controls
  startFall: () => void; // turn off U, start stopwatch
  stop: () => void; // stop stopwatch, compute v2 and push row

  // rising–falling controls
  riseOn: () => void; // apply U, enable rising observation
  markT1: () => void; // record t1 at reticle crossing
  fallOff: () => void; // disable U, falling phase
  markT2: () => void; // record t2 at reticle crossing and push row

  // reticle crossing event from 3D
  onCrossReticle: (which: "top" | "bottom") => void;

  resetAll: () => void;
}

const DEFAULTS = {
  U: 300,
  polarity: "top-positive" as Polarity,
  lampIntensity: 60,
  focus: 50,
  simSpeed: "normal" as SimSpeed,
  showElectricField: false,
  colorTemperature: 5000,
  backgroundContrast: 60,
  plateTopMaterial: "brass" as Material,
  plateBottomMaterial: "brass" as Material,
  plateSeparationMm: LAB.plateSepDefault * 1000,
  plateThicknessMm: 1,
  plateReflectiveness: 50,
};

export const simInitialState: Omit<SimState,
  | "setMode" | "setU" | "setPolarity" | "setLampIntensity" | "setFocus"
  | "startFall" | "stop" | "riseOn" | "markT1" | "fallOff" | "markT2"
  | "onCrossReticle" | "resetAll"
  | "setSimSpeed" | "setShowElectricField" | "setColorTemperature" | "setBackgroundContrast"
  | "setPlateTopMaterial" | "setPlateBottomMaterial" | "setPlateSeparationMm" | "setPlateThicknessMm" | "setPlateReflectiveness"
  | "setDropletAutoGen" | "addDroplet" | "clearDroplets" | "lockDroplet" | "toggleMicroscopeView" | "setMeasurementMode" | "setAutoCaptureFall" | "setAutoCaptureRise"
> = {
  mode: "floating",
  U: DEFAULTS.U,
  polarity: DEFAULTS.polarity,
  running: false,
  simSpeed: DEFAULTS.simSpeed,
  showElectricField: DEFAULTS.showElectricField,
  lampIntensity: DEFAULTS.lampIntensity,
  focus: DEFAULTS.focus,
  colorTemperature: DEFAULTS.colorTemperature,
  backgroundContrast: DEFAULTS.backgroundContrast,
  stopwatchRunning: false,
  reticleTopY: 10,
  reticleBottomY: -10,
  lastCrossTopAt: null,
  lastCrossBottomAt: null,
  plateTopMaterial: DEFAULTS.plateTopMaterial,
  plateBottomMaterial: DEFAULTS.plateBottomMaterial,
  plateSeparationMm: DEFAULTS.plateSeparationMm,
  plateThicknessMm: DEFAULTS.plateThicknessMm,
  plateReflectiveness: DEFAULTS.plateReflectiveness,
  dropletCount: 0,
  dropletAutoGen: false,
  lockedDropletId: null,
  microscopeView: false,
  measurementMode: "measure_v_fall",
  autoCaptureFall: true,
  autoCaptureRise: false,
  floatingTable: [],
  risingTable: [],
  rMicron: undefined,
  q: undefined,
  qc: undefined,
};

export const useSimStore = create<SimState>((set, get) => ({
  ...simInitialState,

  setMode: (m) => set({ mode: m }),
  setU: (U) => set({ U }),
  setPolarity: (p) => set({ polarity: p }),
  setLampIntensity: (v) => set({ lampIntensity: Math.max(0, Math.min(100, v)) }),
  setFocus: (v) => set({ focus: Math.max(0, Math.min(100, v)) }),
  setSimSpeed: (s) => set({ simSpeed: s }),
  setShowElectricField: (v) => set({ showElectricField: v }),
  setColorTemperature: (k) => set({ colorTemperature: Math.max(2000, Math.min(7500, k)) }),
  setBackgroundContrast: (v) => set({ backgroundContrast: Math.max(0, Math.min(100, v)) }),
  setPlateTopMaterial: (m) => set({ plateTopMaterial: m }),
  setPlateBottomMaterial: (m) => set({ plateBottomMaterial: m }),
  setPlateSeparationMm: (mm) => {
    // clamp to [5,20] mm which corresponds to [0.005,0.02] m
    const clamped = Math.max(5, Math.min(20, mm));
    set({ plateSeparationMm: clamped });
  },
  setPlateThicknessMm: (mm) => set({ plateThicknessMm: Math.max(0.1, Math.min(10, mm)) }),
  setPlateReflectiveness: (v) => set({ plateReflectiveness: Math.max(0, Math.min(100, v)) }),
  setDropletAutoGen: (v) => set({ dropletAutoGen: v }),
  addDroplet: () => set((s) => ({ dropletCount: s.dropletCount + 1 })),
  clearDroplets: () => set({ dropletCount: 0, lockedDropletId: null }),
  lockDroplet: (id) => set({ lockedDropletId: id }),
  toggleMicroscopeView: () => set((s) => ({ microscopeView: !s.microscopeView })),
  setMeasurementMode: (m) => set({ measurementMode: m }),
  setAutoCaptureFall: (v) => set({ autoCaptureFall: v }),
  setAutoCaptureRise: (v) => set({ autoCaptureRise: v }),

  // Floating method
  startFall: () => {
    // turn off U and start stopwatch
    set({ U: 0, stopwatchRunning: true, lastCrossTopAt: null, lastCrossBottomAt: null });
  },
  stop: () => {
    // stop stopwatch; if we have bottom crossing timestamps, compute t2/v2 and push row
    const { floatingTable, lastCrossTopAt, lastCrossBottomAt, U } = get();
    set({ stopwatchRunning: false });
    if (lastCrossTopAt && lastCrossBottomAt && lastCrossBottomAt > lastCrossTopAt) {
      const t2 = (lastCrossBottomAt - lastCrossTopAt) / 1000; // seconds
      const reticleGapMm = Math.abs(get().reticleTopY - get().reticleBottomY);
      const v2 = reticleGapMm / t2; // mm/s
      // Physics estimates (defaults; can be refined):
      // Convert units
      const v2_m_s = v2 / 1000; // mm/s -> m/s
      const g = LAB.g;
      const eta = LAB.eta;
      const rho_oil = LAB.rho_oil;
      const rho_air = LAB.rho_air;
      // Stokes radius (falling, without Cunningham correction): r = sqrt((9ηv)/(2(ρ_oil-ρ_air)g))
      const r_m = Math.sqrt((9 * eta * v2_m_s) / (2 * (rho_oil - rho_air) * g));
      const rMicron = Math.max(0.05, Math.min(10, r_m * 1e6));
      // Charge estimate (simplified): q ≈ 6π η r (v_rise + v_fall) (d / U)
      const d = get().plateSeparationMm / 1000; // meters
      const v_rise = v2_m_s; // placeholder using v2 if only falling measured
      const q_coul = 6 * Math.PI * eta * (r_m || 1e-7) * (v_rise + v2_m_s) * (d / Math.max(1, U));
      const q19 = Math.max(0.01, Math.min(200, q_coul / 1e-19));
      const row: FloatingRow = { id: floatingTable.length + 1, U, t2, v2, rMicron, q19 };
      set({ floatingTable: [...floatingTable, row], rMicron, q: q19 * 1e-19, qc: q19 * 1e-19 });
    }
  },

  // Rising–Falling
  riseOn: () => {
    // ensure stopwatch ready for t1 at crossing
    set({ stopwatchRunning: true, lastCrossTopAt: null, lastCrossBottomAt: null });
  },
  markT1: () => {
    // record top crossing timestamp if available
    const now = Date.now();
    set({ lastCrossTopAt: now });
  },
  fallOff: () => {
    // disable U, prepare for t2
    set({ U: 0, stopwatchRunning: true });
  },
  markT2: () => {
    const now = Date.now();
    const { lastCrossTopAt, U, risingTable } = get();
    if (!lastCrossTopAt) return;
    const reticleGapMm = Math.abs(get().reticleTopY - get().reticleBottomY);
    const t1 = 0; // in this simplified version, t1 should be measured at rise crossing via onCrossReticle; keeping 0 placeholder
    const t2 = (now - lastCrossTopAt) / 1000;
    const v1 = 0; // placeholder
    const v2 = reticleGapMm / t2;
    // Physics estimates similar to floating
    const g = LAB.g;
    const eta = LAB.eta;
    const rho_oil = LAB.rho_oil;
    const rho_air = LAB.rho_air;
    const v2_m_s = v2 / 1000;
    const r_m = Math.sqrt((9 * eta * v2_m_s) / (2 * (rho_oil - rho_air) * g));
    const rMicron = Math.max(0.05, Math.min(10, r_m * 1e6));
    const d = get().plateSeparationMm / 1000;
    const v_rise = v1 / 1000;
    const q_coul = 6 * Math.PI * eta * (r_m || 1e-7) * (v_rise + v2_m_s) * (d / Math.max(1, U));
    const q19 = Math.max(0.01, Math.min(200, q_coul / 1e-19));
    const row: RisingFallingRow = { id: risingTable.length + 1, U, t1, t2, v1, v2, rMicron, q19 };
    set({ risingTable: [...risingTable, row], rMicron, q: q19 * 1e-19, qc: q19 * 1e-19, stopwatchRunning: false, lastCrossTopAt: null });
  },

  onCrossReticle: (which) => {
    const now = Date.now();
    if (which === "top") set({ lastCrossTopAt: now });
    else set({ lastCrossBottomAt: now });
  },

  resetAll: () => set({ ...simInitialState })
}));
