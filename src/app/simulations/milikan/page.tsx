"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Panel } from "@/components/ui/Panel";

const CanvasScene = dynamic(() => import("@/components/3d/CanvasScene").then((mod) => mod.CanvasScene), { ssr: false });
const OilDropSimulation = dynamic(
  () => import("@/components/3d/OilDropSimulation").then((mod) => mod.OilDropSimulation),
  { ssr: false }
);

export default function MilikanPage() {
  return (
    <section className="flex min-h-[70vh] flex-col gap-6 lg:flex-row">
      <div className="h-[520px] w-full rounded-2xl bg-white shadow-md lg:w-[70%]">
        <Suspense fallback={<div className="flex h-full items-center justify-center">Loading 3D scene...</div>}>
          <CanvasScene>
            <OilDropSimulation />
          </CanvasScene>
        </Suspense>
      </div>

      <div className="w-full lg:w-[30%]">
        <Panel />
      </div>
    </section>
  );
}
