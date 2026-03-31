"use client";

import { useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { useSimulationStore } from "@/store/useSimulationStore";

export function OilDropSimulation() {
  const dropletRef = useRef<Mesh>(null);
  const { position, updateSimulation } = useSimulationStore();

  useFrame((_, delta) => {
    updateSimulation(delta);
    if (dropletRef.current) {
      dropletRef.current.position.y = position;
    }
  });

  return (
    <group>
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[3.2, 0.1, 3.2]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>

      <mesh position={[0, -1.8, 0]}>
        <boxGeometry args={[3.2, 0.1, 3.2]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>

      <mesh ref={dropletRef} position={[0, position, 0]}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial color="#2563eb" roughness={0.2} metalness={0.3} />
      </mesh>
    </group>
  );
}
