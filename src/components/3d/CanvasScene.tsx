"use client";

import { Canvas } from "@react-three/fiber";
import type { PropsWithChildren } from "react";
import { Suspense } from "react";
import { CameraController } from "@/components/3d/CameraController";
import { Lighting } from "@/components/3d/Lighting";

export function CanvasScene({ children }: PropsWithChildren) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 55 }}>
      <Suspense fallback={null}>
        <Lighting />
        <CameraController />
        {children}
      </Suspense>
    </Canvas>
  );
}
