import { NextResponse } from "next/server";
import { calculateScore } from "@/lib/quiz";
import type { QuizQuestion } from "@/types/quiz";

export async function POST(request: Request) {
  const { quizId, answers } = await request.json();
  const bank: Record<string, QuizQuestion[]> = {
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
  const questions = bank[quizId] ?? [];
  const correctCount = questions.reduce((acc, q) => acc + (answers[q.id] === q.answer ? 1 : 0), 0);
  const score = calculateScore(correctCount, questions.length || 1);
  return NextResponse.json({ quizId, score, correctCount, total: questions.length });
}
