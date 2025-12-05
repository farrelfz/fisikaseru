export interface QuizChoice {
  label: string;
  value: string;
  explanation?: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  concept: string;
  difficulty: "explorer" | "engineer" | "scholar" | "theorist";
  choices: QuizChoice[];
  answer: string;
  reference?: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  answers: Record<string, string>;
  correctCount: number;
  totalQuestions: number;
  score: number;
  startedAt: string;
  submittedAt?: string;
}
