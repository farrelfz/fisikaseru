import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { method, parameters } = await req.json();

  const { voltage, polarity } = parameters;

  const snapshots = [];
  let t = 0;
  let dt = 0.02;
  let position = 0;      // meter
  let velocity = 0;      // m/s

  // KONSTANTA FISIKA (DISAATUKAN)
  const charge = 1.6e-19;
  const radius = 1e-6;
  const mass = (4 / 3) * Math.PI * radius ** 3 * 900;
  const k = 6e-3;

  const gap = 0.005;
  const E = voltage / gap;

  while (t < 3) {
    const Fg = mass * 9.81;
    const Fe = charge * E * (polarity === "top-positive" ? 1 : -1);
    const Fdrag = -k * velocity;

    const F = Fe - Fg + Fdrag;

    // ‼️ INI YANG HILANG DAN WAJIB ADA
    velocity += (F / mass) * dt;
    position += velocity * dt;

    // sanitasi nilai
    velocity = isFinite(velocity) ? velocity : 0;
    position = isFinite(position) ? position : 0;

    snapshots.push({
      timestamp: Date.now() + t * 1000,
      position,
      velocity,
    });

    t += dt;
  }

  return NextResponse.json({
    result: { snapshots },
    method,
    parameters,
  });
}
