import { NextResponse } from "next/server";
import { simulationExportSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = simulationExportSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.message },
      { status: 400 }
    );
  }

  const { method, parameters, result } = parsed.data;

  return NextResponse.json({
    ok: true,
    status: "scheduled",
    message: "Export PDF simulasi MilikanLab siap digabungkan.",
    metadata: {
      method,
      voltage: parameters.voltage,
      snapshotCount: result.snapshots.length,
    },
  });
}
