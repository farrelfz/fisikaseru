/** Model pirolisis & kalor: fungsi suhu dan estimasi yield */
export type PyroParams = { mass: number; temp: number; duration: number };

export function temperatureCurve(p: PyroParams): number[] {
  return Array.from({ length: 100 }, (_, i) => p.temp * Math.sin(i / 10));
}

export function estimateYield(p: PyroParams): { oil: number; gas: number } {
  return { oil: 0.5 * p.mass, gas: 0.3 * p.mass };
}
