/** Model orbit Newton sederhana: fungsi energi dan evolusi orbit */
export type OrbitParams = { mass: number; radius: number; v0: number };

export function totalEnergy({ mass, radius, v0 }: OrbitParams): number {
  return 0.5 * mass * v0 * v0 - (mass / radius);
}
