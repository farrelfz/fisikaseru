import Link from "next/link";
import { Trophy, BookOpen, Compass, GraduationCap, Lock, CheckCircle2, Atom, Sparkles } from "lucide-react";

const masteryLevels = [
  {
    slug: "eksplor",
    title: "Level Eksplor",
    subtitle: "Fondasi konsep gaya, gerak, dan energi",
    progress: 45,
    xp: "120 XP",
    badge: "Pemula",
    accent: "#4FC3F7",
    nodes: [
      { slug: "gaya-dasar", title: "Konsep Gaya", icon: Compass, status: "completed", duration: "25 mnt" },
      { slug: "energi-kinetik", title: "Energi Kinetik", icon: Atom, status: "in-progress", duration: "30 mnt" },
      { slug: "hukum-newton", title: "Hukum Newton", icon: Trophy, status: "locked", duration: "40 mnt" }
    ]
  },
  {
    slug: "pejuang",
    title: "Level Pejuang",
    subtitle: "Listrik dinamis, magnet, dan instrumentasi",
    progress: 10,
    xp: "40 XP",
    badge: "Intermediate",
    accent: "#00A859",
    nodes: [
      { slug: "medan-listrik", title: "Medan Listrik", icon: Sparkles, status: "locked", duration: "35 mnt" },
      { slug: "arus-beda-potensial", title: "Rangkaian Arus", icon: BookOpen, status: "locked", duration: "45 mnt" },
      { slug: "elektromagnetik", title: "Elektromagnetik", icon: GraduationCap, status: "locked", duration: "50 mnt" }
    ]
  },
  {
    slug: "kesatria",
    title: "Level Kesatria",
    subtitle: "Gelombang lanjut, optik, dan relativitas",
    progress: 0,
    xp: "0 XP",
    badge: "Advanced",
    accent: "#FFD700",
    nodes: [
      { slug: "gelombang-quantum", title: "Gelombang Kuantum", icon: Sparkles, status: "locked", duration: "55 mnt" },
      { slug: "interferensi", title: "Interferensi Optik", icon: Atom, status: "locked", duration: "45 mnt" },
      { slug: "relativitas", title: "Relativitas Khusus", icon: Compass, status: "locked", duration: "60 mnt" }
    ]
  },
  {
    slug: "king",
    title: "Level King",
    subtitle: "Riset, eksperimen terbuka, dan presentasi ilmiah",
    progress: 0,
    xp: "0 XP",
    badge: "Expert",
    accent: "#1D2A40",
    nodes: [
      { slug: "projekt-lab", title: "Proyek Lab Bebas", icon: Trophy, status: "locked", duration: "70 mnt" },
      { slug: "analisis-data", title: "Analisis Data", icon: BookOpen, status: "locked", duration: "60 mnt" },
      { slug: "presentasi", title: "Presentasi Fisika", icon: GraduationCap, status: "locked", duration: "45 mnt" }
    ]
  }
];

const statusStyles = {
  completed: {
    border: "border-[#00A859]/40",
    bg: "bg-[#00A859]/10",
    text: "text-[#00A859]",
    indicator: "bg-[#00A859]"
  },
  "in-progress": {
    border: "border-[#4FC3F7]/40",
    bg: "bg-[#4FC3F7]/10",
    text: "text-[#0369a1]",
    indicator: "bg-[#4FC3F7]"
  },
  locked: {
    border: "border-[#E5E7EB]",
    bg: "bg-white",
    text: "text-[#94a3b8]",
    indicator: "bg-[#E5E7EB]"
  }
} as const;

export default function BelajarPage() {
  const activeLevel = masteryLevels[0];

  return (
    <main className="bg-[#f8fdff]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 py-12">
        <section className="rounded-[32px] border border-[rgba(29,42,64,0.08)] bg-white px-10 py-12 shadow-[0_18px_45px_rgba(12,23,44,0.08)]">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-2xl space-y-4">
              <p className="text-xs uppercase tracking-[0.4em] text-[#4FC3F7]">Roadmap Belajar</p>
              <h1 className="font-display text-4xl text-[#1D2A40]">Bangun skill fisika dari Eksplor sampai King.</h1>
              <p className="text-base text-[#475569]">
                Tiap level dirancang seperti Duolingo: modul kecil, progress bar hijau, dan badge XP untuk menjaga motivasi.
                Mulai dari eksperimen dasar hingga teori tingkat lanjut.
              </p>
              <div className="rounded-3xl bg-[#f0f7ff] px-5 py-3 text-sm text-[#0369a1]">
                Level aktif: <span className="font-semibold text-[#00A859]">{activeLevel.title}</span> · {activeLevel.xp} terkumpul
              </div>
            </div>
            <div className="w-full max-w-sm rounded-3xl border border-[#E5E7EB] bg-[#fdfefe] p-6 shadow-inner">
              <div className="flex items-center justify-between text-sm text-[#1D2A40]">
                <span>Progress level saat ini</span>
                <span className="font-semibold text-[#0369a1]">{activeLevel.progress}%</span>
              </div>
              <div className="mt-3 h-3 rounded-full bg-[#E5E7EB]">
                <div className="h-full rounded-full bg-gradient-to-r from-[#00A859] via-[#4FC3F7] to-[#FFD700]" style={{ width: `${activeLevel.progress}%` }} />
              </div>
              <div className="mt-6 space-y-3 text-sm">
                <p className="font-semibold text-[#1D2A40]">Target minggu ini</p>
                <ul className="space-y-2 text-[#475569]">
                  <li>• Selesaikan 2 modul gaya dan 1 quiz adaptif</li>
                  <li>• Dokumentasikan catatan eksperimen di Notion Lab</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#00A859]">Pilih level</p>
              <h2 className="font-display text-3xl text-[#1D2A40]">Roadmap modular ala edtech.</h2>
            </div>
            <Link href="/kuis" className="text-sm font-semibold text-[#0369a1] hover:text-[#00A859]">
              Cek kesiapan dengan kuis adaptif →
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {masteryLevels.map((level) => (
              <div key={level.slug} className="rounded-[26px] border border-[#E5E7EB] bg-white p-6 shadow-[0_12px_32px_rgba(12,23,44,0.08)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-[#94a3b8]">{level.badge}</p>
                    <h3 className="text-2xl font-semibold text-[#1D2A40]">{level.title}</h3>
                  </div>
                  <span className="rounded-full bg-[#f0f7ff] px-3 py-1 text-xs font-semibold text-[#0369a1]">{level.xp}</span>
                </div>
                <p className="mt-3 text-sm text-[#475569]">{level.subtitle}</p>
                <div className="mt-4 h-2 rounded-full bg-[#E5E7EB]">
                  <div className="h-full rounded-full" style={{ width: `${level.progress}%`, backgroundColor: level.accent }} />
                </div>
                <p className="mt-2 text-xs text-[#94a3b8]">{level.progress}% selesai</p>
                <Link
                  href={`/belajar/${level.slug}/${level.nodes[0].slug}`}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#1D2A40] px-4 py-2 text-sm font-semibold text-white"
                >
                  Lanjutkan Level
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs uppercase tracking-[0.35em] text-[#4FC3F7]">Roadmap aktif</p>
            <span className="rounded-full bg-[#E5E7EB] px-3 py-1 text-xs text-[#1D2A40]">{activeLevel.title}</span>
          </div>
          <div className="rounded-[32px] border border-[#E5E7EB] bg-white p-6 shadow-[0_12px_32px_rgba(12,23,44,0.08)]">
            <div className="grid gap-6 md:grid-cols-3">
              {activeLevel.nodes.map((node, index) => {
                const style = statusStyles[node.status as keyof typeof statusStyles];
                const Icon = node.icon;
                return (
                  <Link
                    key={node.slug}
                    href={`/belajar/${activeLevel.slug}/${node.slug}`}
                    className={`relative flex min-h-[150px] flex-col justify-between rounded-[24px] border bg-white p-5 ${style.border} ${style.bg}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`h-8 w-8 rounded-full ${style.indicator}`} />
                      {node.status === "locked" ? (
                        <Lock className="h-4 w-4 text-[#94a3b8]" />
                      ) : (
                        <CheckCircle2 className={`h-4 w-4 ${style.text}`} />
                      )}
                    </div>
                    <div>
                      <Icon className={`mb-3 h-6 w-6 ${style.text}`} />
                      <p className="text-sm font-semibold text-[#1D2A40]">{node.title}</p>
                      <p className="text-xs text-[#94a3b8]">{node.duration} · {node.status === "locked" ? "Terkunci" : node.status === "in-progress" ? "Sedang berlangsung" : "Selesai"}</p>
                    </div>
                    {index < activeLevel.nodes.length - 1 && (
                      <span className="absolute -right-6 top-1/2 hidden h-1 w-6 bg-gradient-to-r from-[#E5E7EB] to-transparent md:block" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
