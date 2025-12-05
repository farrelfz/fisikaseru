import { FlaskConical, Activity, Clock3, ChevronRight, ArrowUpRight } from "lucide-react";

const quickStats = [
  { label: "Riwayat Simulasi", value: "12", trend: "+2 minggu ini", icon: FlaskConical },
  { label: "Riwayat Kuis", value: "24", trend: "+5 skor terekam", icon: Activity },
  { label: "Jam Belajar", value: "42j", trend: "+6 jam bulan ini", icon: Clock3 }
];

const timeline = [
  { title: "MilikanLab", desc: "Auto export PDF", date: "30 Nov", accent: "#4FC3F7" },
  { title: "Kuis Newton", desc: "Skor 86%", date: "28 Nov", accent: "#00A859" },
  { title: "Roadmap Eksplor", desc: "Selesai 2 modul", date: "27 Nov", accent: "#FFD700" }
];

export default function DashboardPage() {
  return (
    <main className="bg-[#f8fdff]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12">
        <section className="rounded-[32px] border border-[rgba(29,42,64,0.08)] bg-white px-8 py-10 shadow-[0_18px_45px_rgba(12,23,44,0.08)]">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.4em] text-[#4FC3F7]">Dashboard</p>
              <h1 className="font-display text-4xl text-[#1D2A40]">Halo, Raka Fisika</h1>
              <p className="text-sm text-[#475569]">
                Semua progres roadmap, simulasi, dan kuismu tersinkron otomatis dengan akun Supabase. Lanjutkan level
                Kesatria untuk naik ke badge King.
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="rounded-full bg-[#E5F4FF] px-4 py-2 font-semibold text-[#0369a1]">XP 480</span>
                <span className="rounded-full bg-[#FFF5D1] px-4 py-2 font-semibold text-[#A66900]">Badge Pejuang</span>
                <span className="rounded-full border border-[#E5E7EB] px-4 py-2 text-[#475569]">Streak 12 hari</span>
              </div>
            </div>
            <div className="rounded-[24px] border border-[#E5E7EB] bg-[#fdfefe] p-6">
              <div className="flex items-center justify-between text-sm text-[#1D2A40]">
                <span>Roadmap Kemajuan</span>
                <span className="text-[#0369a1]">45% Eksplor</span>
              </div>
              <div className="mt-4 h-3 rounded-full bg-[#E5E7EB]">
                <div className="h-full rounded-full bg-gradient-to-r from-[#4FC3F7] via-[#00A859] to-[#FFD700]" style={{ width: "45%" }} />
              </div>
              <div className="mt-6 space-y-3 text-sm text-[#475569]">
                <p className="font-semibold text-[#1D2A40]">Agenda terdekat</p>
                <div className="rounded-2xl border border-dashed border-[#E5E7EB] p-4">
                  <p className="font-semibold text-[#0369a1]">Simulasi MilikanLab malam ini</p>
                  <p>Tuntaskan stopwatch dan ekspor data ke Notion Lab sebelum jam 21.00 WIB.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-[0_12px_32px_rgba(12,23,44,0.08)]">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#94a3b8]">{stat.label}</p>
                  <Icon className="h-5 w-5 text-[#4FC3F7]" />
                </div>
                <p className="mt-4 font-display text-3xl text-[#1D2A40]">{stat.value}</p>
                <p className="text-xs text-[#00A859]">{stat.trend}</p>
              </div>
            );
          })}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-6 shadow-[0_12px_32px_rgba(12,23,44,0.08)]">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#1D2A40]">Grafik Progres Mingguan</p>
              <button type="button" className="text-xs font-semibold text-[#0369a1]">
                Lihat detail
              </button>
            </div>
            <div className="mt-6 grid gap-4 text-xs text-[#94a3b8] sm:grid-cols-6">
              {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day, idx) => (
                <div key={day} className="flex flex-col items-center gap-2">
                  <span>{day}</span>
                  <span className="h-24 w-4 rounded-full bg-[#E5E7EB]">
                    <span
                      className="block w-full rounded-full bg-gradient-to-b from-[#4FC3F7] to-[#00A859]"
                      style={{ height: `${20 + idx * 10}%` }}
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-6 shadow-[0_12px_32px_rgba(12,23,44,0.08)]">
            <p className="text-sm font-semibold text-[#1D2A40]">Aktivitas Terbaru</p>
            <div className="mt-4 space-y-4">
              {timeline.map((item) => (
                <div key={item.title} className="flex items-center gap-4">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.accent }} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#1D2A40]">{item.title}</p>
                    <p className="text-xs text-[#94a3b8]">{item.desc}</p>
                  </div>
                  <span className="text-xs text-[#94a3b8]">{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-6 shadow-[0_12px_32px_rgba(12,23,44,0.08)]">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#1D2A40]">Riwayat Simulasi Terakhir</p>
              <button type="button" className="text-xs font-semibold text-[#0369a1]">
                Lihat semua
              </button>
            </div>
            <div className="mt-4 space-y-3 text-sm text-[#475569]">
              {["MilikanLab", "PyroLab", "CosmosLab"].map((lab) => (
                <div key={lab} className="flex items-center justify-between rounded-2xl border border-[#E5E7EB] px-4 py-3">
                  <div>
                    <p className="font-semibold text-[#1D2A40]">{lab}</p>
                    <p className="text-xs text-[#94a3b8]">Auto-export selesai</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[#94a3b8]" />
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-6 shadow-[0_12px_32px_rgba(12,23,44,0.08)]">
            <p className="text-sm font-semibold text-[#1D2A40]">Rekomendasi selanjutnya</p>
            <div className="mt-4 flex flex-col gap-3">
              {["Tuntaskan modul gaya I", "Coba kuis adaptif Pejuang", "Riset mini tentang optik"].map((task) => (
                <div key={task} className="flex items-center justify-between rounded-2xl border border-[#E5E7EB] px-4 py-3 text-sm text-[#475569]">
                  <span>{task}</span>
                  <ArrowUpRight className="h-4 w-4 text-[#4FC3F7]" />
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-dashed border-[#E5E7EB] bg-[#f8fdff] p-4 text-xs text-[#475569]">
              <p className="font-semibold text-[#1D2A40]">Goal pekan ini</p>
              <p>Selesaikan 1 simulasi MilikanLab + 1 kuis adaptif untuk menjaga streak emasmu.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
