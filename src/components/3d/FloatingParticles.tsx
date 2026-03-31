"use client";

import { useMemo, useRef } from "react";
import { Points } from "three";
import { useFrame } from "@react-three/fiber";

export function FloatingParticles() {
  const ref = useRef<Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(300);
    for (let i = 0; i < 300; i += 3) {
      values[i] = (Math.random() - 0.5) * 8;
      values[i + 1] = (Math.random() - 0.5) * 4;
      values[i + 2] = (Math.random() - 0.5) * 8;
    }
    return values;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#2563eb" />
    </points>
  );
}
