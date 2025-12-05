import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    level: "engineer",
    xp: 2400,
    roadmap: [
      { nodeId: "vector-mastery", confidence: 0.82 },
      { nodeId: "milikan-lab", confidence: 0.74 }
    ]
  });
}
