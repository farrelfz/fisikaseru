interface QuizResultPageProps {
  params: {
    attemptId: string;
  };
}

export default function QuizResultPage({ params }: QuizResultPageProps) {
  return (
    <div className="container space-y-6 py-12">
      <header>
        <p className="text-xs uppercase tracking-[0.4em] text-brand-sky">Hasil Kuis</p>
        <h1 className="font-display text-3xl text-brand-midnight">Attempt #{params.attemptId}</h1>
        <p className="text-muted-foreground">
          Halaman ini akan menampilkan skor, pembahasan lengkap, dan rekomendasi roadmap berikutnya.
        </p>
      </header>
      <div className="rounded-2xl border border-border bg-white/80 p-6">
        <p className="text-sm text-muted-foreground">Integrasikan ke Supabase quiz_attempts dan quiz_attempt_answers.</p>
      </div>
    </div>
  );
}
