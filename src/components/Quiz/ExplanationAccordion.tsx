"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/types/quiz";

interface ExplanationAccordionProps {
  question: QuizQuestion;
  userAnswer?: string;
}

export function ExplanationAccordion({ question, userAnswer }: ExplanationAccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-border bg-white/70">
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-3 text-left"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div>
          <p className="text-sm font-semibold text-brand-midnight">Pembahasan</p>
          <p className="text-xs text-muted-foreground">{question.reference}</p>
        </div>
        <span className="text-xs text-brand-sky">{open ? "Tutup" : "Buka"}</span>
      </button>
      {open && (
        <div className="border-t border-border/60 px-4 py-3 text-sm text-muted-foreground">
          <p>Jawabanmu: {userAnswer ?? "-"}</p>
          <p>Kunci: {question.answer}</p>
          <p className="mt-2 text-brand-midnight">{question.concept}</p>
          {question.choices.map((choice) => (
            <p key={choice.value} className="text-xs">
              {choice.value === question.answer ? "✅" : "•"} {choice.explanation ?? ""}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
