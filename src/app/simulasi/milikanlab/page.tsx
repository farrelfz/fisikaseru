"use client";

import { useSimStore } from "@/store/useSimStore";
import { MilikanControlPanel } from "@/components/Milikan/MilikanControlPanel";
import { MilikanParameterPanel } from "@/components/Milikan/MilikanParameterPanel";
import Simulation3DPro from "@/components/Milikan/MilikanSimulation3D";
import { MilikanGraphPanel } from "@/components/Milikan/MilikanGraphPanel";
import { MilikanDataTable } from "@/components/Milikan/MilikanDataTable";
import { MilikanBottomPanel } from "@/components/Milikan/MilikanBottomPanel";

export default function MilikanLabPage() {
  const running = useSimStore((s) => s.running);
  const status = running ? "running" : "idle";

  return (
    <main className="bg-[#0b1626] text-white min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-8">

        {/* HEADER */}
        <header className="mb-6">
          <h1 className="font-display text-3xl">MilikanLab</h1>

          <p className="mt-2 text-sm text-gray-300">
            Status:{" "}
            {status === "idle"
              ? "🟡 Siap dijalankan"
              : "🔵 Simulasi berjalan"}
          </p>
        </header>

        {/* Layout: 3D + table/graphs left; controls right */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-8">
            <div id="milikan-canvas" className="rounded-xl overflow-hidden border border-white/10 h-[680px]">
              <Simulation3DPro />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <MilikanDataTable />
              </div>
              <div>
                <MilikanGraphPanel />
              </div>
            </div>
          </div>
          <aside className="col-span-12 lg:col-span-4 space-y-4">
            <MilikanParameterPanel />
            <MilikanControlPanel />
            <MilikanBottomPanel />
          </aside>
        </div>

      </div>
    </main>
  );
}
