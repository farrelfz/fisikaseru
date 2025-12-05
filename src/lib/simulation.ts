/**
 * Model fisika Milikan: estimasi muatan elektron dari gerak tetesan minyak.
 * Fungsi-fungsi di sini modular dan pure.
 */

export type MilikanParams = {
  radiusMicron: number;
  voltage: number;
  fieldOn: boolean;
  mode: "melayang" | "naik-turun";
  zeroAdjust: number;
};

export function terminalVelocity(radiusMicron: number, voltage: number): number {
  // Placeholder: v ~ k * r * V
  const k = 1e-6;
  return k * radiusMicron * voltage;
}

export function estimateCharge(params: MilikanParams): number {
  // Placeholder: q ~ e
  const e = 1.602176634e-19;
  return e;
}
import type {
  SimulationParameters,
  SimulationResult,
  SimulationMeta,
  PlateMaterial
} from "@/types/simulation";

export const MILLIKAN_CONSTANTS: {
  gravity: number;
  plateDistance: number;
  airViscosity: number;
  airDensity: number;
  oilDensity: number;
  cunninghamB: number;
  airPressure: number;
  electronCharge: number;
} = {
  gravity: 9.80665, // m/s^2
  plateDistance: 0.003, // meters (3 mm) - user adjustable
  airViscosity: 1.83e-5, // Pa·s (20°C standard air viscosity)
  airDensity: 1.225, // kg/m^3 (air at 15°C, standard lab)
  oilDensity: 877, // kg/m^3 (mineral/silicone oil)
  cunninghamB: 6.17e-6, // m (correct Cunningham slip factor)
  airPressure: 101325, // Pa (1 atm reference)
  electronCharge: 1.602176634e-19 // Coulomb
};

// Work function (approx., in eV) for supported plate materials.
// These are relative typical values and are used to compute contact potential (in volts).
export const WORK_FUNCTION = {
  aluminium: 4.12, // eV (approx average)
  brass: 4.50,    // eV (approx for Cu/Zn alloy)
  steel: 4.70     // eV (approx for Fe/C steel)
} as const;

const dropletVolume = (radius: number): number =>
  (4 / 3) * Math.PI * Math.pow(radius, 3);

export const gravitationalForce = (radius: number): number => {
  const mass = dropletVolume(radius) * MILLIKAN_CONSTANTS.oilDensity;
  return mass * MILLIKAN_CONSTANTS.gravity;
};

export const buoyantForce = (radius: number): number => {
  const displacedMass = dropletVolume(radius) * MILLIKAN_CONSTANTS.airDensity;
  return displacedMass * MILLIKAN_CONSTANTS.gravity;
};

export const stokesDrag = (
  radius: number,
  velocity: number,
  viscosity = MILLIKAN_CONSTANTS.airViscosity
): number => {
  return 6 * Math.PI * viscosity * radius * velocity;
};

export const electricForce = (charge: number, electricField: number): number => {
  return charge * electricField;
};

export const correctedViscosity = (
  radius: number,
  pressure = MILLIKAN_CONSTANTS.airPressure
): number => {
  // radius tidak boleh nol atau negatif
  if (!Number.isFinite(radius) || radius <= 0) {
    return MILLIKAN_CONSTANTS.airViscosity;
  }

  const correctionFactor =
    1 + MILLIKAN_CONSTANTS.cunninghamB / (radius * pressure);

  if (!Number.isFinite(correctionFactor) || correctionFactor <= 0) {
    return MILLIKAN_CONSTANTS.airViscosity;
  }

  return MILLIKAN_CONSTANTS.airViscosity / correctionFactor;
};

export const dropletRadiusFromFallVelocity = (velocity: number): number => {
  if (!Number.isFinite(velocity) || velocity <= 0) {
    return 0;
  }

  const numerator = 9 * MILLIKAN_CONSTANTS.airViscosity * velocity;
  const denominator =
    2 *
    MILLIKAN_CONSTANTS.gravity *
    (MILLIKAN_CONSTANTS.oilDensity - MILLIKAN_CONSTANTS.airDensity);

  const raw = numerator / denominator;
  if (!Number.isFinite(raw) || raw <= 0) {
    return 0;
  }

  return Math.sqrt(raw);
};

/**
 * Compute contact potential (in Volts) between two plate materials.
 * WORK_FUNCTION difference (in eV) maps directly to volts (1 eV = 1 e * 1 V).
 */
export const contactPotentialVolts = (
  top: PlateMaterial,
  bottom: PlateMaterial
): number => {
  const wt = WORK_FUNCTION[top] ?? WORK_FUNCTION.brass;
  const wb = WORK_FUNCTION[bottom] ?? WORK_FUNCTION.brass;
  const deltaEv = Math.abs(wt - wb);
  // difference in eV equals the difference in volts (approx, per electron charge)
  return deltaEv;
};

/**
 * Compute effective voltage seen by droplet:
 * V_effective = V_input - ΔV_contact + offsetCompensation
 *
 * offsetCompensation is a value set by "Zero Adjust" to neutralize contact potential.
 * If offsetCompensation == ΔV_contact then V_effective == V_input.
 */
export const effectiveVoltage = (
  inputVoltage: number,
  plateTop: PlateMaterial,
  plateBottom: PlateMaterial,
  offsetCompensation = 0
): number => {
  const deltaContact = contactPotentialVolts(plateTop, plateBottom);
  const Veff = inputVoltage - deltaContact + (offsetCompensation ?? 0);
  if (!Number.isFinite(Veff)) return 0;
  return Veff;
};

export const chargeFromFloatingMethod = (
  radius: number,
  effectiveVoltage: number
): number => {
  const weightMinusBuoyancy =
    gravitationalForce(radius) - buoyantForce(radius);
  const electricField = effectiveVoltage / MILLIKAN_CONSTANTS.plateDistance;

  if (!Number.isFinite(electricField) || electricField === 0) {
    return 0;
  }

  return weightMinusBuoyancy / electricField;
};

export const chargeFromRisingFalling = (
  radius: number,
  riseVelocity: number,
  fallVelocity: number,
  effectiveVoltage: number
): number => {
  const viscosity = correctedViscosity(radius);
  const dragRise = stokesDrag(radius, riseVelocity, viscosity);
  const dragFall = stokesDrag(radius, fallVelocity, viscosity);

  const forceSum = dragRise + dragFall; // ∝ (v_r + v_f)
  const electricField = effectiveVoltage / MILLIKAN_CONSTANTS.plateDistance;

  if (!Number.isFinite(electricField) || electricField === 0) {
    return 0;
  }

  return forceSum / electricField;
};

export const buildSimulationResult = (
  parameters: SimulationParameters,
  method: "floating" | "rising",
  pathLength = 0.0005
): SimulationResult => {
  // Read optional advanced settings from parameters (safe defaults)
  const plateTop = (parameters.plateTop as PlateMaterial) ?? "brass";
  const plateBottom = (parameters.plateBottom as PlateMaterial) ?? "brass";
  const offsetCompensation = Number(parameters.offsetVoltage ?? 0);
  const simSpeed = (parameters.simSpeed as "normal" | "slow" | "ultra") ?? "normal";

  const fallVelocity =
    parameters.fallTime > 0 ? pathLength / parameters.fallTime : 0;
  const riseVelocity =
    parameters.riseTime > 0 ? pathLength / parameters.riseTime : 0;

  // radius: pakai input manual kalau ada, kalau tidak pakai kecepatan jatuh
  let dropletRadius =
    typeof parameters.dropletRadiusMicron === "number"
      ? parameters.dropletRadiusMicron * 1e-6
      : dropletRadiusFromFallVelocity(fallVelocity);

  // jaga agar radius tidak nol/negatif
  if (!Number.isFinite(dropletRadius) || dropletRadius <= 0) {
    dropletRadius = 1e-6; // 1 µm sebagai fallback
  }

  const viscosity = correctedViscosity(dropletRadius);

  // compute effective voltage using contact potential + offset compensation
  const V_effective = effectiveVoltage(
    parameters.voltage,
    plateTop,
    plateBottom,
    offsetCompensation
  );

  const charge =
    method === "floating"
      ? chargeFromFloatingMethod(dropletRadius, V_effective)
      : chargeFromRisingFalling(
          dropletRadius,
          riseVelocity,
          fallVelocity,
          V_effective
        );

  // ==== Snapshot untuk grafik & tabel ====
  const sampleCount = 24;
  const duration = Math.max(
    parameters.riseTime + parameters.fallTime,
    1 // minimal 1 detik supaya dt nggak terlalu kecil
  );

  // simSpeed multiplier: normal=1, slow=0.25, ultra=0.1 (slower drawing)
  const speedMultiplier = simSpeed === "normal" ? 1 : simSpeed === "slow" ? 0.25 : 0.1;
  const dt = (duration / sampleCount) * (1 / speedMultiplier); // smaller speedMultiplier -> larger dt in seconds for animation pacing

  const riseBoundary = parameters.riseTime;

  let cumulativePosition = 0;
  const baseTime = Date.now();

  const snapshots = Array.from({ length: sampleCount }, (_, index) => {
    const elapsed = (duration / sampleCount) * index; // logical elapsed time (sec)
    const isRisePhase = elapsed <= riseBoundary;

    const baseVelocity = isRisePhase ? riseVelocity : -Math.abs(fallVelocity);
    const velocity = Number.isFinite(baseVelocity) ? baseVelocity : 0;

    cumulativePosition += velocity * (duration / sampleCount); // integrate using physical dt (not animation dt)

    // timestamp uses animation pacing (so UI playback aligns with simSpeed)
    const animationElapsed = ((duration / sampleCount) * index) / speedMultiplier;
    return {
      timestamp: new Date(baseTime + animationElapsed * 1000).toISOString(),
      velocity,
      position: cumulativePosition
    };
  });

  const meta: SimulationMeta = {
    plateTop,
    plateBottom,
    simSpeed,
    offsetVoltage: offsetCompensation,
    contactPotentialVolt: contactPotentialVolts(plateTop, plateBottom),
    effectiveVoltage: V_effective,
    showElectricField: Boolean(parameters.showElectricField),
    polarity: parameters.polarity
  };

  return {
    method,
    dropletRadius,
    charge,
    correctedViscosity: viscosity,
    snapshots,
    meta
  };
};
