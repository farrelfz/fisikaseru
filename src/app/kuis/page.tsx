import Link from "next/link";

const quizzes = [
  { id: "hukum-newton", title: "Bank Soal Newton", level: "Explorer" },
  { id: "milikan", title: "Eksperimen Tetes Minyak", level: "Engineer" }
];

export default function QuizPage() {
  return (
    <div className="container space-y-8 py-12">
      <header>
        <p className="text-xs uppercase tracking-[0.4em] text-brand-sky">Kuis Adaptif</p>
        <h1 className="font-display text-4xl text-brand-midnight">Pilih Tantangan</h1>
        <p className="text-muted-foreground">Menggunakan engine GPT Go & bank soal Gemini.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {quizzes.map((quiz) => (
          <Link key={quiz.id} href={`/kuis/${quiz.id}`} className="rounded-2xl border border-border bg-white/80 p-5">
            <h2 className="font-display text-2xl text-brand-midnight">{quiz.title}</h2>
            <p className="text-sm text-muted-foreground">Level {quiz.level}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
