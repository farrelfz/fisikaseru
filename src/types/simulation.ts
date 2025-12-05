export type PlateMaterial = "aluminium" | "brass" | "steel";

export interface SimulationParameters {
  voltage: number;
  polarity: "top-positive" | "bottom-positive";
  riseTime: number; // seconds
  fallTime: number; // seconds
  dropletRadiusMicron?: number; // optional manual input in µm

  // optional advanced flags merged in by store
  plateTop?: PlateMaterial;
  plateBottom?: PlateMaterial;
  showElectricField?: boolean;
  simSpeed?: "normal" | "slow" | "ultra";
  offsetVoltage?: number; // Zero Adjust compensation
}

export interface SimulationSnapshot {
  timestamp: string; // ISO
  velocity: number;  // m/s
  position: number;  // meters
}

export interface SimulationMeta {
  plateTop: PlateMaterial;
  plateBottom: PlateMaterial;
  simSpeed: "normal" | "slow" | "ultra";
  offsetVoltage: number;
  contactPotentialVolt: number;
  effectiveVoltage: number;
  showElectricField: boolean;
  polarity: "top-positive" | "bottom-positive";
}

export interface SimulationResult {
  method: "floating" | "rising";
  dropletRadius: number;          // meters
  charge: number;                 // Coulomb
  correctedViscosity: number;     // Pa·s
  snapshots: SimulationSnapshot[];
  meta: SimulationMeta;
}

export interface SimulationRunRequest {
  method: "floating" | "rising";
  parameters: SimulationParameters;
}

export interface SimulationRunPayload {
  parameters: SimulationParameters;
  method: "floating" | "rising";
  result: SimulationResult;
}
export type PlateMaterial = "aluminium" | "brass" | "steel";

export interface SimulationParameters {
  voltage: number; // Volt
  polarity: "top-positive" | "bottom-positive";
  riseTime: number; // seconds
  fallTime: number; // seconds
  dropletRadiusMicron?: number;
  temperatureC?: number;
  plateTop?: PlateMaterial;
  plateBottom?: PlateMaterial;
  simSpeed?: "normal" | "slow" | "ultra";
  offsetVoltage?: number;
  showElectricField?: boolean;
}

export interface SimulationSnapshot {
  timestamp: string;
  velocity: number;
  position: number;
}

export interface SimulationMeta {
  plateTop: PlateMaterial;
  plateBottom: PlateMaterial;
  simSpeed: "normal" | "slow" | "ultra";
  offsetVoltage: number;
  contactPotentialVolt: number;
  effectiveVoltage: number;
  showElectricField: boolean;
  polarity: "top-positive" | "bottom-positive";
}

export interface SimulationResult {
  method: "floating" | "rising";
  dropletRadius: number; // meters
  charge: number; // Coulomb
  correctedViscosity: number; // N s/m^2
  snapshots: SimulationSnapshot[];
  meta: SimulationMeta;
}

export interface SimulationRunRequest {
  method: "floating" | "rising";
  parameters: SimulationParameters;
}

export interface SimulationRunPayload extends SimulationRunRequest {
  result: SimulationResult;
}
