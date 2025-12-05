import Link from "next/link";

export default function SimulasiIndexPage() {
  const sims = [
    { name: "MilikanLab", slug: "milikanlab", blurb: "Analisis tetes minyak dan muatan elektron.", tag: "Elektron & Muatan" },
    { name: "AstroLab", slug: "astrolab", blurb: "Simulasi orbit planet berbasis hukum Newton.", tag: "Astrofisika" },
    { name: "PyroLab", slug: "pyrolab", blurb: "Model kalor & pirolisis termal.", tag: "Termodinamika" },
    { name: "CosmosLab", slug: "cosmoslab", blurb: "Gravitasi dan analisis data teleskop.", tag: "Kosmologi" },
  ];

  return (
    <main className="bg-[#0b1626] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#FFD700]">Simulasi Unggulan</p>
            <h1 className="font-display text-3xl">Lab virtual siap pakai.</h1>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sims.map((s) => (
            <div key={s.slug} className="rounded-2xl border border-[#22324d] bg-[#122035] p-6 shadow-[0_20px_60px_rgba(3,7,18,0.55)]">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#1D2A40] px-3 py-1 text-xs font-semibold text-[#4FC3F7]">{s.tag}</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-white">{s.name}</h3>
              <p className="mt-2 text-sm text-white/80">{s.blurb}</p>
              <Link href={`/simulasi/${s.slug}`} className="mt-4 inline-flex items-center justify-center rounded-full bg-[#4FC3F7] px-4 py-2 text-sm font-semibold text-[#1D2A40]">
                Buka Simulasi
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
// Note: This file only exports the Simulasi index page.
