"use client";
export function CosmosSpectraTable() {
  return (
    <div className="rounded-2xl border border-[#22324d] bg-[#122035] p-5 shadow-[0_20px_60px_rgba(3,7,18,0.55)]">
      <h2 className="mb-3 text-lg font-semibold text-white">Tabel Spektrum</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-white/90">
          <thead>
            <tr className="text-left text-[#4FC3F7]">
              <th className="px-3 py-2">Objek</th>
              <th className="px-3 py-2">λ (nm)</th>
              <th className="px-3 py-2">Intensitas</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-[#22324d]"><td className="px-3 py-2">—</td><td className="px-3 py-2">—</td><td className="px-3 py-2">—</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
