"use client";
import { useAstroStore } from "@/store/useAstroStore";
import { AstroControlPanel } from "@/components/Astro/AstroControlPanel";
import { AstroCanvas } from "@/components/Astro/AstroCanvas";
import { AstroGraph } from "@/components/Astro/AstroGraph";

export default function AstroLabPage() {
  const { status } = useAstroStore();
  return (
    <main className="bg-[#0b1626] text-white">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <header className="mb-6">
          <h1 className="font-display text-3xl">AstroLab</h1>
          <p className="text-sm text-white/80">Status: {status === "idle" ? "🟡 Siap dijalankan" : status === "running" ? "🔵 Simulasi berjalan" : "🟣 Simulasi dihentikan"}</p>
        </header>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <AstroControlPanel />
          </div>
          <div className="space-y-6 lg:col-span-2">
            <AstroCanvas />
            <AstroGraph />
          </div>
        </div>
      </div>
    </main>
  );
}
