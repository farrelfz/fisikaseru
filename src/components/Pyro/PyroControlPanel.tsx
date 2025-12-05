"use client";
import { usePyroStore } from "@/store/usePyroStore";
import { Button } from "@/components/ui/button";

export function PyroControlPanel() {
  const { run, stop, reset } = usePyroStore();
  return (
    <div className="rounded-2xl border border-[#22324d] bg-[#122035] p-5 shadow-[0_20px_60px_rgba(3,7,18,0.55)]">
      <h2 className="mb-4 text-lg font-semibold text-white">Panel Kontrol</h2>
      <div className="flex gap-3">
        <Button onClick={run} variant="primary">Jalankan</Button>
        <Button onClick={stop} variant="secondary">Hentikan</Button>
        <Button onClick={reset} variant="ghost">Reset</Button>
      </div>
    </div>
  );
}
