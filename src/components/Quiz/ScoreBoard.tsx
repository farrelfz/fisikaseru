interface ScoreBoardProps {
  score?: number | null;
  correct: number;
  total: number;
}

export function ScoreBoard({ score, correct, total }: ScoreBoardProps) {
  return (
    <div className="rounded-2xl border border-border bg-white/80 p-6 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Hasil</p>
      <h2 className="font-display text-4xl text-brand-midnight">
        {score !== undefined && score !== null ? `${score} / 100` : "-"}
      </h2>
      <p className="text-sm text-muted-foreground">
        Benar {correct} dari {total} soal
      </p>
    </div>
  );
}
