import type { QuizQuestion } from "@/types/quiz";

interface InlineOptionCardProps {
  label: string;
  description?: string;
  active?: boolean;
  onClick: () => void;
}

function OptionCard({ label, description, active, onClick }: InlineOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-start rounded-xl border p-4 text-left transition hover:border-brand-leaf hover:bg-brand-leaf/5 ${
        active ? "border-brand-leaf bg-brand-leaf/10" : "border-border bg-white"
      }`}
    >
      <span className="font-semibold text-brand-midnight">{label}</span>
      {description ? <span className="text-sm text-muted-foreground">{description}</span> : null}
    </button>
  );
}

interface QuestionCardProps {
  question: QuizQuestion;
  selected?: string;
  onSelect: (choice: string) => void;
}

export function QuestionCard({ question, selected, onSelect }: QuestionCardProps) {
  return (
    <article className="space-y-4 rounded-2xl border border-border bg-white/80 p-6 shadow-card">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-leaf">{question.concept}</p>
        <h2 className="font-display text-2xl text-brand-midnight">{question.prompt}</h2>
      </header>
      <div className="grid gap-3">
        {question.choices.map((choice) => (
          <OptionCard
            key={choice.value}
            label={choice.label}
            description={choice.explanation}
            active={selected === choice.value}
            onClick={() => onSelect(choice.value)}
          />
        ))}
      </div>
    </article>
  );
}
