/** Model gravitasi & data spektroskopi */
export type GravityParams = { starMass: number; planetMass: number };

export function twoBodyPeriod({ starMass, planetMass }: GravityParams): number {
  return 2 * Math.PI * Math.sqrt(1 / (starMass + planetMass));
}
