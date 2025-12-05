export const LAB = {
  g: 9.80665, // m/s^2
  eta: 1.81e-5, // Pa·s (air @ ~20°C)
  rho_oil: 900, // kg/m^3 (typical light oil)
  rho_air: 1.225, // kg/m^3 (sea-level, 15–20°C)
  plateSepDefault: 0.01, // meters (1 cm)
  tempK: 293.15, // 20°C
  elementaryCharge: 1.602176634e-19,
  PI: Math.PI,
};

export const clampPlateSepMeters = (m: number) => {
  return Math.max(0.005, Math.min(0.02, m));
};
