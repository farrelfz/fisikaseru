interface LearningPageProps {
  params: {
    level: "eksplor" | "pejuang" | "kesatria" | "king";
    slug: string;
  };
}

const levelCopy: Record<LearningPageProps["params"]["level"], string> = {
  eksplor: "Level Eksplor",
  pejuang: "Level Pejuang",
  kesatria: "Level Kesatria",
  king: "Level King"
};

export default function LearningDetailPage({ params }: LearningPageProps) {
  return (
    <div className="container space-y-6 py-12">
      <p className="text-xs uppercase tracking-[0.4em] text-brand-sky">{levelCopy[params.level]}</p>
      <h1 className="font-display text-3xl text-brand-midnight">Roadmap: {params.slug.replace(/-/g, " ")}</h1>
      <p className="text-muted-foreground">
        Konten materi mengikuti blueprint Gemini untuk tahap {levelCopy[params.level]}.
      </p>
      <div className="rounded-2xl border border-border bg-white/80 p-6">
        <p className="text-sm text-muted-foreground">
          Modul belajar akan diisi dengan video renyah, simulasi terarah, serta kuis adaptif per topik.
        </p>
      </div>
    </div>
  );
}
