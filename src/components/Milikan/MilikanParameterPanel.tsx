"use client";
import { useSimStore } from "@/store/useSimStore";
import { Slider } from "@/components/ui/slider";

export function MilikanParameterPanel() {
  const {
    U,
    setU,
    polarity,
    setPolarity,
    mode,
    setMode,
    lampIntensity,
    setLampIntensity,
    focus,
    setFocus,
    simSpeed,
    setSimSpeed,
    showElectricField,
    setShowElectricField,
    plateTopMaterial,
    plateBottomMaterial,
    setPlateTopMaterial,
    setPlateBottomMaterial,
    plateSeparationMm,
    setPlateSeparationMm,
    plateThicknessMm,
    setPlateThicknessMm,
    plateReflectiveness,
    setPlateReflectiveness,
    colorTemperature,
    setColorTemperature,
    backgroundContrast,
    setBackgroundContrast,
    dropletAutoGen,
    setDropletAutoGen,
  } = useSimStore();

  return (
    <div className="rounded-2xl border border-[#22324d] bg-[#122035] p-5 shadow-[0_20px_60px_rgba(3,7,18,0.55)] w-full max-w-xl mx-auto">
      <h2 className="mb-4 text-lg font-semibold text-white">Parameter</h2>

      <div className="space-y-6">

        {/* Tegangan */}
        <div>
          <p className="mb-1 text-sm text-white/80">Tegangan (V)</p>
          <Slider
            min={0}
            max={600}
            step={10}
            value={U.toString()}
            onChange={(e) => {
              const v = Number(e.currentTarget.value);
              if (!Number.isNaN(v)) setU(v);
            }}
          />
          <p className="mt-1 text-xs text-[#4FC3F7]">{U} V</p>
        </div>

        {/* Polarity */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="mb-1 text-sm text-white/80">Polarity</p>
            <select
              className="w-full rounded-lg border border-white/15 bg-[#0f1b2d] px-3 py-2 text-sm text-white"
              value={polarity}
              onChange={(e) => setPolarity(e.currentTarget.value as any)}
            >
              <option value="top-positive">Top-Positive</option>
              <option value="bottom-positive">Bottom-Positive</option>
            </select>
          </div>

          {/* Mode */}
          <div>
            <p className="mb-1 text-sm text-white/80">Mode</p>
            <select
              className="w-full rounded-lg border border-white/15 bg-[#0f1b2d] px-3 py-2 text-sm text-white"
              value={mode}
              onChange={(e) => setMode(e.currentTarget.value as any)}
            >
              <option value="floating">Floating</option>
              <option value="rising">Rising–Falling</option>
            </select>
          </div>
        </div>

        {/* Electric field toggle & Sim speed */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/80">Show Electric Field</p>
            <button
              className={`rounded-full border px-3 py-1 ${showElectricField ? "border-[#4FC3F7] bg-[#4FC3F7]/20 text-white" : "border-white/20 bg-white/5 text-white/70"}`}
              onClick={() => setShowElectricField(!showElectricField)}
            >
              {showElectricField ? "On" : "Off"}
            </button>
          </div>
          <div>
            <p className="mb-2 text-sm text-white/80">Simulation Speed</p>
            <div className="flex items-center gap-3 text-xs">
              {["slow","normal","fast","ultra"].map((s) => (
                <button key={s}
                  onClick={() => setSimSpeed(s as any)}
                  className={`rounded-full border px-3 py-1 ${simSpeed===s?"border-[#4FC3F7] bg-[#4FC3F7]/20 text-white":"border-white/20 bg-white/5 text-white/70"}`}
                >{s}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Plates: materials, separation, thickness, reflectiveness */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="mb-1 text-sm text-white/80">Plate Material (Top)</p>
            <select className="w-full rounded-lg border border-white/15 bg-[#0f1b2d] px-3 py-2 text-sm text-white"
              value={plateTopMaterial}
              onChange={(e)=>setPlateTopMaterial(e.currentTarget.value as any)}>
              <option value="aluminium">Aluminium</option>
              <option value="brass">Brass</option>
              <option value="steel">Steel</option>
            </select>
          </div>
          <div>
            <p className="mb-1 text-sm text-white/80">Plate Material (Bottom)</p>
            <select className="w-full rounded-lg border border-white/15 bg-[#0f1b2d] px-3 py-2 text-sm text-white"
              value={plateBottomMaterial}
              onChange={(e)=>setPlateBottomMaterial(e.currentTarget.value as any)}>
              <option value="aluminium">Aluminium</option>
              <option value="brass">Brass</option>
              <option value="steel">Steel</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="mb-1 text-sm text-white/80">Plate Separation (mm)</p>
            <Slider min={4} max={20} step={1} value={Math.round(plateSeparationMm).toString()} onChange={(e)=>{
              const v=Number(e.currentTarget.value); if(!Number.isNaN(v)) setPlateSeparationMm(v);
            }}/>
            <p className="mt-1 text-xs text-[#4FC3F7]">{plateSeparationMm} mm</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-white/80">Plate Thickness (mm)</p>
            <Slider min={0.2} max={5} step={0.1} value={plateThicknessMm.toString()} onChange={(e)=>{
              const v=Number(e.currentTarget.value); if(!Number.isNaN(v)) setPlateThicknessMm(v);
            }}/>
            <p className="mt-1 text-xs text-[#4FC3F7]">{plateThicknessMm} mm</p>
          </div>
        </div>
        <div>
          <p className="mb-1 text-sm text-white/80">Plate Reflectiveness</p>
          <Slider min={0} max={100} step={1} value={plateReflectiveness.toString()} onChange={(e)=>{
            const v=Number(e.currentTarget.value); if(!Number.isNaN(v)) setPlateReflectiveness(v);
          }}/>
          <p className="mt-1 text-xs text-[#4FC3F7]">{plateReflectiveness}%</p>
        </div>

        {/* Optics: Lamp Intensity, Focus, Color Temp, Background Contrast */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="mb-1 text-sm text-white/80">Lamp Intensity</p>
            <Slider
              min={0}
              max={100}
              step={1}
              value={lampIntensity.toString()}
              onChange={(e) => {
                const v = Number(e.currentTarget.value);
                if (!Number.isNaN(v)) setLampIntensity(v);
              }}
            />
            <p className="mt-1 text-xs text-[#4FC3F7]">{lampIntensity}%</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-white/80">Focus</p>
            <Slider
              min={0}
              max={100}
              step={1}
              value={focus.toString()}
              onChange={(e) => {
                const v = Number(e.currentTarget.value);
                if (!Number.isNaN(v)) setFocus(v);
              }}
            />
            <p className="mt-1 text-xs text-[#4FC3F7]">{focus}%</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="mb-1 text-sm text-white/80">Color Temperature (K)</p>
            <Slider min={2000} max={7500} step={100} value={colorTemperature.toString()} onChange={(e)=>{
              const v=Number(e.currentTarget.value); if(!Number.isNaN(v)) setColorTemperature(v);
            }}/>
            <p className="mt-1 text-xs text-[#4FC3F7]">{colorTemperature} K</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-white/80">Background Contrast</p>
            <Slider min={0} max={100} step={1} value={backgroundContrast.toString()} onChange={(e)=>{
              const v=Number(e.currentTarget.value); if(!Number.isNaN(v)) setBackgroundContrast(v);
            }}/>
            <p className="mt-1 text-xs text-[#4FC3F7]">{backgroundContrast}%</p>
          </div>
        </div>

        {/* Droplet generation */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-white/80">Droplet Auto-Generate</p>
          <button
            className={`rounded-full border px-3 py-1 ${dropletAutoGen ? "border-[#4FC3F7] bg-[#4FC3F7]/20 text-white" : "border-white/20 bg-white/5 text-white/70"}`}
            onClick={()=>setDropletAutoGen(!dropletAutoGen)}
          >{dropletAutoGen?"On":"Off"}</button>
        </div>

        {/* Controls summary could be added here if needed */}
      </div>
    </div>
  );
}
