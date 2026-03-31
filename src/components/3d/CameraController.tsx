"use client";

import { OrbitControls } from "@react-three/drei";

export function CameraController() {
  return (
    <OrbitControls
      enablePan={false}
      minDistance={3}
      maxDistance={9}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={(Math.PI * 3) / 4}
    />
  );
}
