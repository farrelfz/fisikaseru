"use client";
import { useCosmosStore } from "@/store/useCosmosStore";
import { CosmosControlPanel } from "@/components/Cosmos/CosmosControlPanel";
import { CosmosCanvas } from "@/components/Cosmos/CosmosCanvas";
import { CosmosSpectraTable } from "@/components/Cosmos/CosmosSpectraTable";

export default function CosmosLabPage() {
  const { status } = useCosmosStore();
  return (
    <main className="bg-[#0b1626] text-white">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <header className="mb-6">
          <h1 className="font-display text-3xl">CosmosLab</h1>
          <p className="text-sm text-white/80">Status: {status === "idle" ? "🟡 Siap dijalankan" : status === "running" ? "🔵 Simulasi berjalan" : "🟣 Simulasi dihentikan"}</p>
        </header>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <CosmosControlPanel />
          </div>
          <div className="space-y-6 lg:col-span-2">
            <CosmosCanvas />
            <CosmosSpectraTable />
          </div>
        </div>
      </div>
    </main>
  );
}
