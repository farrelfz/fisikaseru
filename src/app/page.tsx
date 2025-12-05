import Link from "next/link";
import { FlaskConical, PlayCircle, BrainCircuit, Atom, Activity } from "lucide-react";

export default function HomePage() {
  const featuredHighlights = [
    {
      title: "Lab Virtual",
      description: "Eksperimen interaktif seperti MilikanLab, PyroLab, dan CosmosLab langsung dari browser.",
      icon: FlaskConical
    },
    {
      title: "Video Renyah",
      description: "Koleksi video singkat yang memecah konsep besar menjadi cerita fisika yang gampang dicerna.",
      icon: PlayCircle
    },
    {
      title: "Kuis Adaptif",
      description: "Soal cerdas yang mengikuti kemampuanmu dan menyesuaikan tingkat kesulitan tiap sesi.",
      icon: BrainCircuit
    }
  ];

  const simulationCatalog = [
    {
      name: "MilikanLab",
      slug: "milikanlab",
      tag: "Elektron & Muatan",
      blurb: "Analisis tetes minyak dengan parameter tegangan, polaritas, dan stopwatch otomatis.",
      gradient: "linear-gradient(135deg, rgba(255,215,0,0.25), rgba(255,215,0,0))"
    },
    {
      name: "PyroLab",
      slug: "pyrolab",
      tag: "Termodinamika",
      blurb: "Eksperimen kalorimeter digital untuk menghitung perubahan entalpi dan laju perpindahan panas.",
      gradient: "linear-gradient(135deg, rgba(0,168,89,0.18), rgba(0,168,89,0))"
    },
    {
      name: "CosmosLab",
      slug: "cosmoslab",
      tag: "Astrofisika",
      blurb: "Simulasikan orbit planet, gaya gravitasi, dan analisis data teleskop langsung di dashboard.",
      gradient: "linear-gradient(135deg, rgba(79,195,247,0.25), rgba(79,195,247,0))"
    }
  ];

  return (
    <main className="bg-[#f8fdff]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-12">
        <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#1D2A40] via-[#203450] to-[#4FC3F7] px-10 py-14 text-white">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.4em] text-[#FFD700]">FisikaSeru</p>
              <h1 className="font-display text-4xl leading-tight text-white md:text-5xl drop-shadow-[0_6px_18px_rgba(0,0,0,0.25)]">
                Jagonya Fisika dengan Cara Paling Seru.
              </h1>
              <p className="text-lg text-white/90">
                Platform belajar fisika nasional dengan lab virtual, roadmap interaktif, dan kuis adaptif yang terasa seperti
                main game edtech kelas dunia.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/auth/login"
                  className="rounded-full bg-[#FFD700] px-6 py-3 text-sm font-semibold text-[#1D2A40] shadow-[0_8px_20px_rgba(255,215,0,0.35)]"
                >
                  Mulai Petualangan Fisikamu
                </Link>
                <Link
                  href="/simulasi/milikanlab"
                  className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Coba Simulasi MilikanLab
                </Link>
              </div>
            </div>
            <div className="rounded-[28px] border border-white/30 bg-white/15 p-6 backdrop-blur">
              <div className="rounded-2xl border border-white/50 bg-white p-6 text-[#1D2A40] shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
                <p className="text-sm font-semibold text-[#00A859]">Realtime Chamber Preview</p>
                <h3 className="mt-2 text-2xl font-semibold">MilikanLab</h3>
                <p className="text-sm text-[#475569]">
                  Tegangan 300 V · Polaritas positif · Stopwatch aktif
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white p-4 shadow-[0_6px_18px_rgba(0,0,0,0.08)]">
                    <p className="text-xs uppercase tracking-[0.35em] text-[#94a3b8]">Radius</p>
                    <p className="text-2xl font-semibold text-[#0369a1]">1.63 µm</p>
                  </div>
                  <div className="rounded-2xl bg-white p-4 shadow-[0_6px_18px_rgba(0,0,0,0.08)]">
                    <p className="text-xs uppercase tracking-[0.35em] text-[#94a3b8]">Muatan</p>
                    <p className="text-2xl font-semibold text-[#0369a1]">1.56e-18 C</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between rounded-2xl bg-[#1D2A40] px-5 py-4 text-white shadow-[0_12px_28px_rgba(3,22,45,0.45)]">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-white/70">Status</p>
                    <p className="text-lg font-semibold">Simulasi Aktif</p>
                  </div>
                  <Atom className="h-10 w-10 text-[#FFD700]" />
                </div>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-24 top-1/2 hidden h-64 w-64 -translate-y-1/2 rounded-full bg-[#4FC3F7]/30 blur-3xl lg:block" />
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#00A859]">Kenapa FisikaSeru</p>
              <h2 className="font-display text-3xl text-[#1D2A40]">Belajar urban, hasil ilmiah.</h2>
            </div>
            <Link href="/belajar" className="text-sm font-semibold text-[#0369a1] hover:text-[#00A859]">
              Lihat roadmap belajar →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-[#D5DAE1] bg-white p-6 shadow-[0_10px_25px_rgba(0,0,0,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_32px_rgba(0,0,0,0.12)]"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E5F4FF] text-[#0369a1]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1D2A40]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#475569]">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#4FC3F7]">Simulasi Unggulan</p>
              <h2 className="font-display text-3xl text-[#1D2A40]">Lab virtual siap pakai.</h2>
            </div>
            <Link href="/simulasi" className="text-sm font-semibold text-[#0369a1]">
              Jelajahi semua lab →
            </Link>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {simulationCatalog.map((sim) => (
              <div
                key={sim.name}
                className="min-w-[260px] rounded-[24px] border border-[#D5DAE1] bg-white p-5 shadow-[0_20px_38px_rgba(29,42,64,0.08)]"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#E5E7EB] px-3 py-1 text-xs font-semibold text-[#1D2A40]">{sim.tag}</span>
                  <Activity className="h-5 w-5 text-[#4FC3F7]" />
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-[#1D2A40]">{sim.name}</h3>
                <p className="mt-2 text-sm text-[#475569]">{sim.blurb}</p>
                <div
                  className="mt-5 rounded-2xl border border-dashed border-[#E5E7EB] px-4 py-3 text-sm text-[#0369a1]"
                  style={{ backgroundImage: sim.gradient }}
                >
                  Optimasi parameter · Export PDF · Monitoring realtime
                </div>
                <Link
                  href={`/simulasi/${sim.slug}`}
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-[#4FC3F7] px-4 py-2 text-sm font-semibold text-[#1D2A40] shadow-[0_10px_20px_rgba(79,195,247,0.55)]"
                >
                  Buka Simulasi
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
