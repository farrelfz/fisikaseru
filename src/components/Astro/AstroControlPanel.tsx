"use client";
import { useAstroStore } from "@/store/useAstroStore";
import { Button } from "@/components/ui/button";

export function AstroControlPanel() {
  const { run, stop, reset } = useAstroStore();
  return (
    <div className="rounded-2xl border border-[#22324d] bg-[#122035] p-5 shadow-[0_20px_60px_rgba(3,7,18,0.55)]">
      <h2 className="mb-4 text-lg font-semibold text-white">Panel Kontrol</h2>
      <div className="flex gap-3">
        <Button onClick={run}>Jalankan</Button>
        <Button onClick={stop}>Hentikan</Button>
        <Button onClick={reset}>Reset</Button>
      </div>
    </div>
  );
}
