"use client";
import { Button } from "@/components/ui/button";
import { useSimStore } from "@/store/useSimStore";

export function MilikanControlPanel() {
  const {
    mode,
    U,
    setU,
    startFall,
    stop,
    riseOn,
    markT1,
    fallOff,
    markT2,
    resetAll,
    running,
    addDroplet,
    clearDroplets,
    lockDroplet,
    microscopeView,
    toggleMicroscopeView,
    measurementMode,
    setMeasurementMode,
  } = useSimStore();

  return (
    <div className="rounded-2xl border border-[#22324d] bg-[#122035] p-5 shadow-[0_20px_60px_rgba(3,7,18,0.55)] w-full max-w-xl mx-auto min-w-0">
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-white">Panel Kontrol</h2>
        <span className="text-xs text-[#4FC3F7] truncate sm:max-w-[60%]">
          Mode: {mode === "floating" ? "Melayang" : "Naik–Turun"} | {U} V
        </span>
      </div>
      {mode === "floating" ? (
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setU(Math.max(0, U))} variant="blue">Set U</Button>
          <Button onClick={startFall} variant="outline" disabled={running}>Start Fall</Button>
          <Button onClick={stop} variant="ghost">Stop</Button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          <Button onClick={riseOn} variant="blue" disabled={running}>Rise ON</Button>
          <Button onClick={markT1} variant="outline">Mark t1</Button>
          <Button onClick={fallOff} variant="outline">Fall OFF</Button>
          <Button onClick={markT2} variant="ghost">Mark t2</Button>
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-3">
        <Button onClick={() => {/* run/pause handled in 3D until store adds flag */}} variant="blue">{running ? "Pause" : "Run"}</Button>
        <Button onClick={resetAll} variant="ghost">Reset</Button>
        <Button onClick={addDroplet} variant="outline">Add droplet</Button>
        <Button onClick={clearDroplets} variant="outline">Clear droplets</Button>
        <Button onClick={() => lockDroplet(null)} variant="outline">Unlock droplet</Button>
        <Button onClick={toggleMicroscopeView} variant="outline">{microscopeView ? "Microscope OFF" : "Microscope ON"}</Button>
      </div>

      <div className="mt-4 flex items-center gap-3 text-xs">
        <span className="text-white/70">Measurement:</span>
        {["measure_v_fall","measure_v_rise","auto_terminal"].map((m) => (
          <button key={m}
            onClick={()=>setMeasurementMode(m as any)}
            className={`rounded-full border px-3 py-1 ${measurementMode===m?"border-[#FFD700] bg-[#FFD700]/10 text-[#FFD700]":"border-white/20 bg-white/5 text-white/70"}`}
          >{m.replace("measure_","")}</button>
        ))}
      </div>
    </div>
  );
}
