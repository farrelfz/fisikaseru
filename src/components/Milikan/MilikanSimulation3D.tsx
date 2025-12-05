"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  ContactShadows,
  SpotLight,
} from "@react-three/drei";
import * as THREE from "three";
import { useSimStore } from "@/store/useSimStore";
import { LAB } from "@/lib/constants";

/**
 * Millikan J2436-like full instrument component
 *
 * Features:
 * - Realistic scaled chamber & casing modeled after the image you provided
 * - Microscope body, objective, focus knob
 * - Thin parallel plates inside chamber with glow when voltage applied
 * - Needle/emitter and small reticle (crosshair)
 * - Small voltmeter display (Html) and power switch/knob on front panel
 * - RK4 integrator for droplet motion + collision with plates
 * - Droplet label using Html with transform + scale to avoid exploding text
 *
 * Notes:
 * - Scene units: 1 unit ≈ 1 cm in render mapping (adjust `METER_TO_UNIT` if needed)
 * - Integrate this component in a Next.js page as a client component
 */

/* ----------------------------
   Physical constants & utils
   ---------------------------- */
const g = LAB.g;
const etaAir = LAB.eta;
const rhoOil = LAB.rho_oil;
const rhoAir = LAB.rho_air;
const eCharge = LAB.elementaryCharge;
const METER_TO_UNIT = 100; // 1 meter => 100 scene units (so 1 cm = 1 unit)

/* simple Cunningham correction */
function cunninghamCorrection(r: number) {
  const lambda = 6.65e-8;
  const Kn = lambda / r;
  return 1 + Kn * (1.257 + 0.4 * Math.exp(-1.1 / Kn));
}
function stokesDrag(r: number, v: number) {
  return 6 * Math.PI * etaAir * r * v;
}

/* RK4 integrator for 1D vertical motion */
type DropletState = { position: number; velocity: number; radius: number; charge: number };

function electricField(V: number, d: number) {
  if (d <= 0) return 0;
  return V / d;
}

function integrateRK4(state: DropletState, dt: number, V: number, plateSep: number) {
  const E = electricField(V, plateSep);
  function accel(s: DropletState) {
    const r = s.radius;
    const vol = (4 / 3) * Math.PI * r * r * r;
    const mass = vol * rhoOil;
    const buoy = vol * rhoAir * g;
    const Fe = s.charge * E; // up positive
    const Fg = mass * g; // down positive
    const v = s.velocity;
    const cc = cunninghamCorrection(r);
    const drag = stokesDrag(r, v) / cc; // opposes motion
    const Fnet = Fe - Fg + buoy - Math.sign(v) * Math.abs(drag);
    return Fnet / mass;
  }

  const k1v = accel(state);
  const k1x = state.velocity;

  const s2 = { ...state, position: state.position + 0.5 * dt * k1x, velocity: state.velocity + 0.5 * dt * k1v };
  const k2v = accel(s2);
  const k2x = s2.velocity;

  const s3 = { ...state, position: state.position + 0.5 * dt * k2x, velocity: state.velocity + 0.5 * dt * k2v };
  const k3v = accel(s3);
  const k3x = s3.velocity;

  const s4 = { ...state, position: state.position + dt * k3x, velocity: state.velocity + dt * k3v };
  const k4v = accel(s4);
  const k4x = s4.velocity;

  const newPos = state.position + (dt / 6) * (k1x + 2 * k2x + 2 * k3x + k4x);
  const newVel = state.velocity + (dt / 6) * (k1v + 2 * k2v + 2 * k3v + k4v);

  return { position: newPos, velocity: newVel };
}

/* ----------------------------
   Instrument subcomponents
   ---------------------------- */

/* Base casing (metal box) */
function BaseCasing({ position = [0, -1.1, 0] as [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.28, 2.2]} />
        <meshStandardMaterial color="#cfcfd1" metalness={0.65} roughness={0.45} />
      </mesh>

      {/* top panel small inset where knobs sit */}
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[2.2, 0.02, 1.2]} />
        <meshStandardMaterial color="#eef0f1" metalness={0.25} roughness={0.6} />
      </mesh>

      {/* front panel */}
      <mesh position={[0, -0.02, 1.05]}>
        <boxGeometry args={[2.9, 0.16, 0.08]} />
        <meshStandardMaterial color="#9fa6ad" metalness={0.45} roughness={0.5} />
      </mesh>

      {/* feet */}
      <mesh position={[1.4, -0.18, 0.9]}>
        <cylinderGeometry args={[0.06, 0.06, 0.04, 12]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[-1.4, -0.18, 0.9]}>
        <cylinderGeometry args={[0.06, 0.06, 0.04, 12]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[1.4, -0.18, -0.9]}>
        <cylinderGeometry args={[0.06, 0.06, 0.04, 12]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[-1.4, -0.18, -0.9]}>
        <cylinderGeometry args={[0.06, 0.06, 0.04, 12]} />
        <meshStandardMaterial color="#111" />
      </mesh>
    </group>
  );
}

/* Microscope body modeled to match the image: barrel + mount + coarse knob */
function MicroscopeModel() {
  return (
    <group position={[-0.7, -0.1, -0.3]} rotation={[0.05, -0.5, 0]}>
      {/* main barrel */}
      <mesh castShadow position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.11, 0.12, 0.9, 32]} />
        <meshStandardMaterial color="#d8d9db" metalness={0.45} roughness={0.3} />
      </mesh>

      {/* eyepiece (black) */}
      <mesh position={[0, 0.82, -0.05]}>
        <cylinderGeometry args={[0.055, 0.055, 0.18, 20]} />
        <meshStandardMaterial color="#0c0c0c" metalness={0.2} roughness={0.4} />
      </mesh>

      {/* objective lens front (glassy) */}
      <mesh position={[0, 0.05, 0.15]}>
        <cylinderGeometry args={[0.06, 0.06, 0.18, 20]} />
        <meshPhysicalMaterial transmission={0.85} roughness={0.02} thickness={0.06} />
      </mesh>

      {/* mount bracket */}
      <mesh position={[0.28, 0.05, -0.15]} rotation={[0, 0, 0.25]}>
        <boxGeometry args={[0.25, 0.14, 0.16]} />
        <meshStandardMaterial color="#2b2b2b" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* coarse focus knob */}
      <mesh position={[0.18, 0.05, -0.35]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.04, 20]} />
        <meshStandardMaterial color="#1b1b1b" />
      </mesh>
    </group>
  );
}

/* Chamber realistic: small cylinder with outer casing and front window, plates inside */
function ChamberRealistic({ plateSep = 0.009, voltage = 0, thicknessMm = 1, reflectiveness = 50, topMaterial = "brass", bottomMaterial = "brass" }: { plateSep?: number; voltage?: number; thicknessMm?: number; reflectiveness?: number; topMaterial?: string; bottomMaterial?: string }) {
  const scale = METER_TO_UNIT; // meters -> units multiplier
  const halfSepUnits = (plateSep / 2) * scale;
  const plateGlow = Math.min(1, Math.abs(voltage) / 2000);
  const tUnits = Math.max(0.001, (thicknessMm / 1000) * scale);
  const matColor = (m: string) => (m === "aluminium" ? "#cdd2d6" : m === "steel" ? "#9aa0a6" : "#d4af37");
  const metalness = Math.min(1, reflectiveness / 100);
  const roughness = 0.3 + (1 - metalness) * 0.4;

  return (
    <group position={[0.6, -0.18, -0.1]}>
      {/* outer clear plastic cup (cap) */}
      <mesh position={[0, 0.26, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.32, 56]} />
        <meshPhysicalMaterial transmission={0.94} roughness={0.02} thickness={0.06} clearcoat={0.2} />
      </mesh>

      {/* inner transparent tall narrow tube */}
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.46, 56]} />
        <meshPhysicalMaterial transmission={0.96} roughness={0.01} thickness={0.03} />
      </mesh>

      {/* base plate ring */}
      <mesh position={[0, -0.02, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 0.02, 40]} />
        <meshStandardMaterial color="#2a3b52" metalness={0.4} roughness={0.45} />
      </mesh>

      {/* top thin wide plate (metal) */}
      <mesh position={[0, halfSepUnits, 0]}>
        <boxGeometry args={[0.34, tUnits, 0.34]} />
        <meshStandardMaterial color={matColor(topMaterial)} metalness={metalness} roughness={roughness} emissive={voltage > 0 ? "#fff7cc" : "#000000"} emissiveIntensity={plateGlow * 0.7} />
      </mesh>

      {/* bottom thin wide plate (metal) */}
      <mesh position={[0, -halfSepUnits, 0]}>
        <boxGeometry args={[0.34, tUnits, 0.34]} />
        <meshStandardMaterial color={matColor(bottomMaterial)} metalness={metalness} roughness={roughness} emissive={voltage < 0 ? "#cfe8ff" : "#000000"} emissiveIntensity={plateGlow * 0.55} />
      </mesh>

      {/* reticle: transparent square with crosshair to simulate observation plate */}
      <mesh position={[0, -0.02, 0.09]}>
        <planeGeometry args={[0.12, 0.12]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.06} />
      </mesh>

      {/* atomizer nozzle above top plate */}
      <mesh position={[0.04, halfSepUnits + 0.065, 0]}>
        <coneGeometry args={[0.012, 0.05, 12]} />
        <meshStandardMaterial color="#222" />
      </mesh>

      {/* small screws / mechanical supports (visual) */}
      <mesh position={[0.12, -0.015, -0.08]}>
        <cylinderGeometry args={[0.006, 0.006, 0.02, 8]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[-0.12, -0.015, -0.08]}>
        <cylinderGeometry args={[0.006, 0.006, 0.02, 8]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  );
}

/* Small voltmeter Html panel (front left) */
function VoltMeter({ voltage }: { voltage: number }) {
  return (
    <Html position={[-0.9, -0.06, 1.06]} transform occlude distanceFactor={8}>
      <div style={{
        background: "linear-gradient(180deg,#071422,#02202b)",
        padding: "6px 10px",
        borderRadius: 6,
        color: "#7fffd4",
        fontFamily: "monospace",
        fontSize: 12,
        minWidth: 62,
        textAlign: "center",
        boxShadow: "0 6px 18px rgba(0,0,0,0.6)"
      }}>
        <div style={{ fontSize: 10, color: "#bcd", opacity: 0.8 }}>V</div>
        <div style={{ fontSize: 16, fontWeight: 700 }}>{Math.round(voltage)} V</div>
      </div>
    </Html>
  );
}

/* Droplet visual + small label (safe scale) */
function DropletVisual({ d, index, hoveredId, setHoveredId, lockedId, setLockedId }: { d: DropletState; index: number; hoveredId: number | null; setHoveredId: (v: number | null) => void; lockedId: number | null; setLockedId: (v: number | null) => void }) {
  // radius mapping: meters -> units
  const sceneRadius = Math.max(0.008, d.radius * METER_TO_UNIT * 0.5);
  const y = d.position * METER_TO_UNIT;

  return (
    <group position={[0.6, y - 0.18, 0]}>
      <mesh
        castShadow
        onPointerOver={(e) => { e.stopPropagation(); setHoveredId(index); }}
        onPointerOut={(e) => { e.stopPropagation(); setHoveredId((id) => (id === index ? null : id)); }}
        onClick={(e) => { e.stopPropagation(); setLockedId(lockedId === index ? null : index); }}
      >
        <sphereGeometry args={[sceneRadius, 24, 24]} />
        <meshPhysicalMaterial
          color="#ffd36b"
          metalness={0.3}
          roughness={0.25}
          clearcoat={0.3}
          transmission={0.0}
          emissive={hoveredId === index || lockedId === index ? "#4FC3F7" : "#000000"}
          emissiveIntensity={hoveredId === index || lockedId === index ? 0.6 : 0}
        />
      </mesh>

      {/* small HTML label, transform + scale to avoid exploding when camera near */}
      {(hoveredId === index || lockedId === index) && (
        <Html transform occlude distanceFactor={10} position={[0, sceneRadius + 0.02, 0]}>
          <div style={{
            padding: "6px 8px",
            background: "linear-gradient(180deg, rgba(3,12,25,0.9), rgba(6,18,32,0.8))",
            color: "white",
            fontSize: 12,
            borderRadius: 8,
            boxShadow: "0 6px 18px rgba(0,0,0,0.6)",
            minWidth: 140,
          }}>
            <div style={{ fontSize: 12, color: "#4FC3F7", fontWeight: 700 }}>Droplet #{index + 1}</div>
            <div style={{ fontSize: 11, marginTop: 6 }}>
              v: <b>{(d.velocity).toFixed(3)}</b> m/s<br/>
              r: <b>{(d.radius * 1e6).toFixed(2)}</b> µm<br/>
              q: <b>{(d.charge / eCharge).toFixed(0)}</b> e
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

/* Camera rig for microscope POV toggle */
function CameraRig({ microscope }: { microscope: boolean }) {
  const { camera } = useThree();
  const q = useRef(new THREE.Quaternion());
  useFrame(() => {
    if (microscope) {
      // near the eyepiece of the microscope
      const target = new THREE.Vector3(-0.75, 0.42, -0.25);
      const lookAt = new THREE.Vector3(0.6, 0.08, -0.1);
      camera.position.lerp(target, 0.08);
      camera.lookAt(lookAt);
    } else {
      const target = new THREE.Vector3(2.2, 1.2, 1.8);
      camera.position.lerp(target, 0.06);
      camera.lookAt(new THREE.Vector3(0.6, 0.0, 0));
    }
  });
  return null;
}

/* Lock-on camera helper: smoothly follow a selected droplet */
function LockOnCamera({ targetIndex, droplets }: { targetIndex: number; droplets: DropletState[] }) {
  const { camera } = useThree();
  useFrame(() => {
    const d = droplets[targetIndex];
    if (!d) return;
    const target = new THREE.Vector3(0.6, d.position * METER_TO_UNIT - 0.18, 0);
    const camTarget = target.clone().add(new THREE.Vector3(0.9, 0.3, 1.2));
    camera.position.lerp(camTarget, 0.08);
    camera.lookAt(target);
  });
  return null;
}

/* ----------------------------
   Integrator hook running inside Canvas
   ---------------------------- */
function Integrator({
  running,
  droplets,
  setDroplets,
  dtScale,
  plateSep,
  voltage,
}: {
  running: boolean;
  droplets: DropletState[];
  setDroplets: React.Dispatch<React.SetStateAction<DropletState[]>>;
  dtScale: number;
  plateSep: number;
  voltage: number;
}) {
  const localRef = useRef<DropletState[]>(droplets);
  useEffect(() => {
    localRef.current = droplets;
  }, [droplets]);

  // simple sampler buffers for velocity stability detection
  const buffersRef = useRef<Array<{ times: number[]; positions: number[] }>>([]);
  useEffect(() => {
    buffersRef.current = droplets.map(() => ({ times: [], positions: [] }));
  }, [droplets.length]);

  useFrame((_, delta) => {
    if (!running) return;
    const dt = delta * dtScale;
    const next = localRef.current.map((s) => {
      // subdivide for stability
      const maxStep = 0.02;
      let remaining = dt;
      let st = { ...s };
      while (remaining > 1e-8) {
        const step = Math.min(maxStep, remaining);
        const res = integrateRK4(st, step, voltage, plateSep);
        st = { ...st, position: res.position, velocity: res.velocity };
        remaining -= step;
      }

      // clamp inside plates (plateSep in meters)
      const half = plateSep / 2;
      if (st.position > half * 0.98) {
        st.position = half * 0.98;
        st.velocity *= -0.18;
      } else if (st.position < -half * 0.98) {
        st.position = -half * 0.98;
        st.velocity *= -0.18;
      }
      return st;
    });

    setDroplets(next);

    // Sampling dy/dt and auto capture
    const now = performance.now();
    const state = useSimStore.getState();
    const dMeters = Math.max(1e-6, state.plateSeparationMm / 1000);
    const E = state.U / dMeters;
    next.forEach((s, i) => {
      const buf = buffersRef.current[i] || { times: [], positions: [] };
      buf.times.push(now);
      buf.positions.push(s.position);
      // keep last 1.5s of samples
      const cutoff = now - 1500;
      while (buf.times.length && buf.times[0] < cutoff) {
        buf.times.shift();
        buf.positions.shift();
      }
      buffersRef.current[i] = buf;

      if (buf.times.length >= 12) {
        const t0 = buf.times[0];
        const tN = buf.times[buf.times.length - 1];
        const x0 = buf.positions[0];
        const xN = buf.positions[buf.positions.length - 1];
        const vAvg = (xN - x0) / ((tN - t0) / 1000); // m/s
        // variance for stability
        const mean = buf.positions.reduce((a, b) => a + b, 0) / buf.positions.length;
        const varPos = buf.positions.reduce((a, b) => a + (b - mean) * (b - mean), 0) / buf.positions.length;
        const stable = varPos < 1e-9; // tuned threshold for stability in meters^2

        // decide fall/rise by sign of v and voltage
        const isFalling = state.U === 0 && vAvg < 0;
        const isRising = Math.abs(state.U) > 1 && vAvg > 0;

        if (stable && (state.autoCaptureFall && isFalling || state.autoCaptureRise && isRising)) {
          const v_fall = Math.abs(vAvg);
          // radius from v_fall: r = sqrt((9 η v_fall)/(2 g (ρ_oil − ρ_air)))
          const r_m = Math.sqrt((9 * etaAir * v_fall) / (2 * g * (rhoOil - rhoAir)));
          const vol = (4 / 3) * Math.PI * r_m ** 3;
          const m_eff = vol * (rhoOil - rhoAir);
          const v_rise = isRising ? Math.abs(vAvg) : Math.max(0, (state.U * E - m_eff * g) / (6 * Math.PI * etaAir * r_m));
          const q_coul = (dMeters / Math.max(1e-6, Math.abs(state.U))) * 6 * Math.PI * etaAir * r_m * (v_fall + v_rise);
          const rowCommon = {
            U: state.U,
            rMicron: r_m * 1e6,
            q19: q_coul / 1e-19,
          };
          if (isFalling) {
            const row = {
              id: state.floatingTable.length + 1,
              t2: (tN - t0) / 1000,
              v2: v_fall * 1000, // mm/s
              ...rowCommon,
            };
            useSimStore.setState({ floatingTable: [...state.floatingTable, row as any] });
          } else if (isRising) {
            const row = {
              id: state.risingTable.length + 1,
              t1: 0,
              t2: (tN - t0) / 1000,
              v1: 0,
              v2: v_rise * 1000, // mm/s
              ...rowCommon,
            };
            useSimStore.setState({ risingTable: [...state.risingTable, row as any] });
          }
          // reset buffer to avoid duplicate captures
          buffersRef.current[i] = { times: [], positions: [] };
        }
      }
    });
  });

  return null;
}

/* ----------------------------
   Final instrument + UI wrapper
   ---------------------------- */
export default function MillikanJ2436() {
  // bind to global store for live parameters
  const {
    running,
    U,
    setU,
    plateSeparationMm,
    setPlateSeparationMm,
    plateThicknessMm,
    plateReflectiveness,
    plateTopMaterial,
    plateBottomMaterial,
    microscopeView,
    toggleMicroscopeView,
    simSpeed,
  } = useSimStore();
  const [timeScale, setTimeScale] = useState(1);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [lockedId, setLockedId] = useState<number | null>(null);
  useEffect(() => {
    setTimeScale(simSpeed === "slow" ? 0.5 : simSpeed === "fast" ? 2 : simSpeed === "ultra" ? 4 : 1);
  }, [simSpeed]);
  const voltage = U;
  const plateSep = Math.max(1, plateSeparationMm) / 1000;

  // droplets initial
  const [droplets, setDroplets] = useState<DropletState[]>([
    { position: 0.0, velocity: 0.0, radius: 1.1e-6, charge: eCharge * 15 },
  ]);

  const addDroplet = useCallback(() => {
    const rr = (8 + Math.random() * 6) * 1e-7;
    const q = eCharge * Math.round(5 + Math.random() * 30);
    const pos = (Math.random() - 0.5) * plateSep * 0.6;
    setDroplets((s) => [...s, { position: pos, velocity: 0, radius: rr, charge: q }]);
  }, [plateSep]);

  const removeDroplet = useCallback(() => setDroplets((s) => s.slice(0, Math.max(0, s.length - 1))), []);
  const clearDroplets = useCallback(() => setDroplets([]), []);

  return (
    <section className="rounded-2xl bg-[#0f1829] p-6 text-white">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm text-white/70 uppercase tracking-wide">MillikanLab — J2436 (Realistic)</h3>

        <div className="flex gap-2 items-center">
          <button onClick={() => {/* hook up to store later */}} className="px-3 py-1 rounded bg-white/10">
            {running ? "Pause" : "Play"}
          </button>
          <button onClick={addDroplet} className="px-3 py-1 rounded bg-white/10">+ Tetes</button>
          <button onClick={removeDroplet} className="px-3 py-1 rounded bg-white/10">-</button>
          <button onClick={clearDroplets} className="px-3 py-1 rounded bg-red-700">Clear</button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-9 rounded-xl overflow-hidden border border-white/6">
          <Canvas shadows camera={{ position: [2.2, 1.2, 1.8], fov: 45 }}>
            <color attach="background" args={["#071024"]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 6, 2]} intensity={1} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
            {/* Removed Environment preset to avoid remote HDR fetch errors */}

            <ContactShadows position={[0, -1.45, 0]} opacity={0.6} width={4} blur={1.6} far={2} />

            <CameraRig microscope={microscopeView} />

            <group>
              <BaseCasing />
              <MicroscopeModel />
              <ChamberRealistic
                plateSep={plateSep}
                voltage={voltage}
                thicknessMm={plateThicknessMm}
                reflectiveness={plateReflectiveness}
                topMaterial={plateTopMaterial}
                bottomMaterial={plateBottomMaterial}
              />
              {/* Reticle crosshair lines within observation zone */}
              <group position={[0.6, -0.18, 0]}>
                <mesh position={[0, (LAB.plateSepDefault * METER_TO_UNIT) * 0.3, 0]}>
                  <planeGeometry args={[0.25, 0.001]} />
                  <meshBasicMaterial color="#4FC3F7" transparent opacity={0.9} />
                </mesh>
                <mesh position={[0, -(LAB.plateSepDefault * METER_TO_UNIT) * 0.3, 0]}>
                  <planeGeometry args={[0.25, 0.001]} />
                  <meshBasicMaterial color="#4FC3F7" transparent opacity={0.9} />
                </mesh>
              </group>
            </group>

            {/* render droplets */}
            {droplets.map((d, i) => (
              <DropletVisual
                key={i}
                d={d}
                index={i}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
                lockedId={lockedId}
                setLockedId={setLockedId}
              />
            ))}

            {/* integrator inside canvas */}
            <Integrator running={running} droplets={droplets} setDroplets={setDroplets} dtScale={timeScale} plateSep={plateSep} voltage={voltage} />

            <VoltMeter voltage={voltage} />

            {/* Lock-on camera behavior when a droplet is locked */}
            {lockedId !== null && (
              <LockOnCamera targetIndex={lockedId} droplets={droplets} />
            )}

            <OrbitControls makeDefault minDistance={0.8} maxDistance={6} />
          </Canvas>
        </div>

        <div className="col-span-3 p-4 rounded-xl bg-[#071825] border border-white/6">
          <div className="space-y-3">
            <label className="text-xs text-white/60">Voltage (V)</label>
            <input type="range" min={-2000} max={2000} value={voltage} onChange={(e) => setU(Number(e.target.value))} />
            <div className="text-sm text-white/60">{voltage} V</div>

            <label className="text-xs text-white/60">Plate Separation (mm)</label>
            <input type="range" min={4} max={20} value={Math.round(plateSep * 1000)} onChange={(e) => setPlateSeparationMm(Number(e.target.value))} />
            <div className="text-sm text-white/60">{(plateSep * 1000).toFixed(1)} mm</div>

            <label className="text-xs text-white/60">Time Scale</label>
            <select value={timeScale} onChange={(e) => setTimeScale(Number(e.target.value))} className="w-full rounded p-1 bg-transparent border">
              <option value={0.25}>x0.25</option>
              <option value={0.5}>x0.5</option>
              <option value={1}>x1</option>
              <option value={2}>x2</option>
              <option value={4}>x4</option>
            </select>

            <div className="flex items-center gap-2">
              <input id="mic" type="checkbox" checked={microscopeView} onChange={() => toggleMicroscopeView()} />
              <label htmlFor="mic" className="text-sm text-white/60">Microscope POV</label>
            </div>

            <div className="pt-2 border-t border-white/6">
              <div className="text-xs text-white/50">Droplets: {droplets.length}</div>
              <div className="text-xs text-white/50 mt-2">Tip: gunakan microscope POV + zoom kecil untuk melihat reticle seperti di laboratorium.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
