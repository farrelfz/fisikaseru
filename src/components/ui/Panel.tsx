"use client";

import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";
import { useSimulationStore } from "@/store/useSimulationStore";

export function Panel() {
  const {
    voltage,
    mass,
    charge,
    running,
    setVoltage,
    setMass,
    setCharge,
    start,
    pause,
    reset
  } = useSimulationStore();

  return (
    <div className="space-y-5 rounded-2xl bg-white p-6 shadow-md">
      <h2 className="text-xl font-semibold text-blue-600">Control Panel</h2>

      <div className="space-y-2">
        <label className="text-sm font-medium">Voltage: {voltage.toFixed(0)} V</label>
        <Slider value={voltage} min={0} max={1000} step={10} onChange={setVoltage} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Mass (kg)</label>
        <input
          type="number"
          className="w-full rounded-xl border border-blue-100 p-2"
          value={mass}
          onChange={(event) => setMass(Number(event.target.value) || 0)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Charge (C)</label>
        <input
          type="number"
          className="w-full rounded-xl border border-blue-100 p-2"
          value={charge}
          onChange={(event) => setCharge(Number(event.target.value) || 0)}
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Button onClick={start} className="bg-blue-600">Start</Button>
        <Button onClick={pause} className="bg-blue-500">Pause</Button>
        <Button onClick={reset} className="bg-blue-400 text-blue-950">Reset</Button>
      </div>

      <p className="text-sm text-slate-600">Status: {running ? "Running" : "Paused"}</p>
    </div>
  );
}
