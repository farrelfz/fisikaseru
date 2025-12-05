"use client";

import { useEffect, useMemo, useRef } from "react";
import type { QuizQuestion } from "@/types/quiz";
import { useQuizStore } from "@/store/useQuizStore";
import { QuestionCard } from "./QuestionCard";
import { ProgressBar } from "./ProgressBar";
import { Timer } from "./Timer";
import { ScoreBoard } from "./ScoreBoard";
import { ExplanationAccordion } from "./ExplanationAccordion";

interface QuizRunnerProps {
  quizId: string;
  title: string;
  initialQuestions: QuizQuestion[];
}

export function QuizRunner({ quizId, title, initialQuestions }: QuizRunnerProps) {
  const questions = useQuizStore((state) => state.questions);
  const currentIndex = useQuizStore((state) => state.currentIndex);
  const answers = useQuizStore((state) => state.answers);
  const loadQuestions = useQuizStore((state) => state.loadQuestions);
  const answerQuestion = useQuizStore((state) => state.answerQuestion);
  const submit = useQuizStore((state) => state.submit);
  const score = useQuizStore((state) => state.score);
  const startedAt = useQuizStore((state) => state.startedAt);

  const loadedQuizIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!initialQuestions.length) return;
    if (loadedQuizIdRef.current === quizId && questions.length) {
      return;
    }
    loadQuestions(quizId, initialQuestions);
    loadedQuizIdRef.current = quizId;
  }, [initialQuestions, loadQuestions, quizId, questions.length]);

  const question = questions[currentIndex];
  const correctCount = useMemo(
    () => questions.reduce((acc, q) => acc + (answers[q.id] === q.answer ? 1 : 0), 0),
    [answers, questions]
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-brand-sky">Kuis Adaptif</p>
          <h1 className="font-display text-3xl text-brand-midnight">{title}</h1>
        </div>
        <Timer startedAt={startedAt} />
      </header>
      <ProgressBar current={currentIndex + 1} total={questions.length || 1} />
      {question && (
        <QuestionCard
          question={question}
          selected={answers[question.id]}
          onSelect={(choice) => answerQuestion(question.id, choice)}
        />
      )}
      <button
        type="button"
        onClick={submit}
        className="w-full rounded-full bg-brand-midnight px-6 py-3 text-sm font-semibold text-white"
      >
        Submit Jawaban
      </button>
      <ScoreBoard score={score ?? undefined} correct={correctCount} total={questions.length || 0} />
      {question && (
        <ExplanationAccordion question={question} userAnswer={answers[question.id]} />
      )}
    </div>
  );
}
