import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type QuizQuestion } from "@/types/quiz";
import { calculateScore } from "@/lib/quiz";

export interface QuizState {
  quizId: string | null;
  questions: QuizQuestion[];
  currentIndex: number;
  answers: Record<string, string>;
  startedAt: string | null;
  submittedAt: string | null;
  score: number | null;
  loadQuestions: (quizId: string, questions: QuizQuestion[]) => void;
  answerQuestion: (questionId: string, choice: string) => void;
  submit: () => void;
  reset: () => void;
}

const baseState: Omit<QuizState, "loadQuestions" | "answerQuestion" | "submit" | "reset"> = {
  quizId: null,
  questions: [],
  currentIndex: 0,
  answers: {},
  startedAt: null,
  submittedAt: null,
  score: null
};

export const quizInitialState = { ...baseState };

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      ...quizInitialState,
      loadQuestions: (quizId, questions) => {
        set({
          ...baseState,
          quizId,
          questions,
          startedAt: new Date().toISOString()
        });
      },
      answerQuestion: (questionId, choice) => {
        const { questions } = get();
        const currentIndex = questions.findIndex((q) => q.id === questionId);
        set((state) => ({
          answers: { ...state.answers, [questionId]: choice },
          currentIndex: currentIndex >= 0 ? currentIndex : state.currentIndex
        }));
      },
      submit: () => {
        const { answers, questions } = get();
        const correctCount = questions.reduce((acc, question) => {
          return acc + (answers[question.id] === question.answer ? 1 : 0);
        }, 0);
        const score = calculateScore(correctCount, questions.length);
        set({
          submittedAt: new Date().toISOString(),
          score
        });
      },
      reset: () => set({ ...baseState })
    }),
    {
      name: "fisikaseru-quiz"
    }
  )
);
