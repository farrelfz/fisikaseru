"use client";
import { usePyroStore } from "@/store/usePyroStore";
import { PyroControlPanel } from "@/components/Pyro/PyroControlPanel";
import { PyroCanvas } from "@/components/Pyro/PyroCanvas";
import { PyroResults } from "@/components/Pyro/PyroResults";

export default function PyroLabPage() {
  const { status } = usePyroStore();
  return (
    <main className="bg-[#0b1626] text-white">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <header className="mb-6">
          <h1 className="font-display text-3xl">PyroLab</h1>
          <p className="text-sm text-white/80">Status: {status === "idle" ? "🟡 Siap dijalankan" : status === "running" ? "🔵 Simulasi berjalan" : "🟣 Simulasi dihentikan"}</p>
        </header>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <PyroControlPanel />
          </div>
          <div className="space-y-6 lg:col-span-2">
            <PyroCanvas />
            <PyroResults />
          </div>
        </div>
      </div>
    </main>
  );
}
