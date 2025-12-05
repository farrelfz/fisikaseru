import { NextResponse } from "next/server";
import type { QuizQuestion } from "@/types/quiz";

export async function POST(request: Request) {
  const { quizId } = await request.json();
  const seed: Record<string, QuizQuestion[]> = {
    "hukum-newton": [
      {
        id: "newton-1",
        prompt: "Sebuah benda dikatakan setimbang apabila resultan gaya...",
        concept: "Equilibrium",
        difficulty: "explorer",
        choices: [
          { label: "Tidak nol", value: "A" },
          { label: "Nol", value: "B" },
          { label: "Arah ke kanan", value: "C" },
          { label: "Mengikuti percepatan", value: "D" }
        ],
        answer: "B"
      }
    ]
  };

  const questions = seed[quizId] ?? [];
  return NextResponse.json({ quizId, questions });
}
