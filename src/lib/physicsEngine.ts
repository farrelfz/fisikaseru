export type SimulationState = {
  voltage: number;
  mass: number;
  charge: number;
  velocity: number;
  position: number;
};

const GRAVITY = 9.81;
const PLATE_DISTANCE = 0.1;

export function calculateElectricForce(q: number, E: number): number {
  return q * E;
}

export function calculateGravity(m: number): number {
  return m * GRAVITY;
}

export function calculateAcceleration(F_total: number, m: number): number {
  if (m <= 0) return 0;
  return F_total / m;
}

export function updateMotion(state: SimulationState, dt: number): Pick<SimulationState, "position" | "velocity"> {
  const E = state.voltage / PLATE_DISTANCE;
  const Fg = calculateGravity(state.mass);
  const Fe = calculateElectricForce(state.charge, E);
  const F_total = Fe - Fg;
  const a = calculateAcceleration(F_total, state.mass);
  const velocity = state.velocity + a * dt;
  const position = state.position + velocity * dt;

  return { position, velocity };
}
