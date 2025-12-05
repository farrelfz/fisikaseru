"use client";
import { useSimStore } from "@/store/useSimStore";

export function MilikanDataTable() {
  const { floatingTable, risingTable, mode } = useSimStore();

  return (
    <div className="rounded-2xl border border-[#22324d] bg-[#122035] p-5 shadow-[0_20px_60px_rgba(3,7,18,0.55)] w-full min-w-0 overflow-x-auto">
      <h2 className="mb-3 text-lg font-semibold text-white">Tabel Data ({mode === "floating" ? "Floating" : "Rising–Falling"})</h2>

      <div className="overflow-x-auto">
        {mode === "floating" ? (
          <table className="min-w-full text-sm text-white/90">
            <thead>
              <tr className="text-[#4FC3F7]">
                <th className="px-3 py-2 text-left">#</th>
                <th className="px-3 py-2 text-left">U (V)</th>
                <th className="px-3 py-2 text-left">t₂ (s)</th>
                <th className="px-3 py-2 text-left">v₂ (mm/s)</th>
                <th className="px-3 py-2 text-left">r (µm)</th>
                <th className="px-3 py-2 text-left">q (×10⁻¹⁹ C)</th>
              </tr>
            </thead>
            <tbody>
              {floatingTable.map((row) => (
                <tr key={row.id} className="border-t border-[#22324d]">
                  <td className="px-3 py-2">{row.id}</td>
                  <td className="px-3 py-2">{row.U}</td>
                  <td className="px-3 py-2">{row.t2.toFixed(2)}</td>
                  <td className="px-3 py-2">{row.v2.toFixed(2)}</td>
                  <td className="px-3 py-2">{row.rMicron.toFixed(2)}</td>
                  <td className="px-3 py-2">{row.q19.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="min-w-full text-sm text-white/90">
            <thead>
              <tr className="text-[#4FC3F7]">
                <th className="px-3 py-2 text-left">#</th>
                <th className="px-3 py-2 text-left">U (V)</th>
                <th className="px-3 py-2 text-left">t₁ (s)</th>
                <th className="px-3 py-2 text-left">t₂ (s)</th>
                <th className="px-3 py-2 text-left">v₁ (mm/s)</th>
                <th className="px-3 py-2 text-left">v₂ (mm/s)</th>
                <th className="px-3 py-2 text-left">r (µm)</th>
                <th className="px-3 py-2 text-left">q (×10⁻¹⁹ C)</th>
              </tr>
            </thead>
            <tbody>
              {risingTable.map((row) => (
                <tr key={row.id} className="border-t border-[#22324d]">
                  <td className="px-3 py-2">{row.id}</td>
                  <td className="px-3 py-2">{row.U}</td>
                  <td className="px-3 py-2">{row.t1.toFixed(2)}</td>
                  <td className="px-3 py-2">{row.t2.toFixed(2)}</td>
                  <td className="px-3 py-2">{row.v1.toFixed(2)}</td>
                  <td className="px-3 py-2">{row.v2.toFixed(2)}</td>
                  <td className="px-3 py-2">{row.rMicron.toFixed(2)}</td>
                  <td className="px-3 py-2">{row.q19.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
