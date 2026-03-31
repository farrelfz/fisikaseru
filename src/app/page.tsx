"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const CanvasScene = dynamic(() => import("@/components/3d/CanvasScene").then((mod) => mod.CanvasScene), { ssr: false });
const FloatingParticles = dynamic(
  () => import("@/components/3d/FloatingParticles").then((mod) => mod.FloatingParticles),
  { ssr: false }
);

export default function HomePage() {
  return (
    <motion.section
      initial={{ opacity: 0, transform: "translateY(20px)" }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-white p-10 shadow-md"
    >
      <div className="relative z-10 max-w-xl space-y-5">
        <h1 className="text-5xl font-bold text-blue-600">FisikaSeru</h1>
        <p className="text-lg text-slate-700">Belajar Fisika dengan Simulasi 3D Interaktif</p>
        <Link href="/simulations">
          <Button>Explore Simulations</Button>
        </Link>
      </div>

      <div className="pointer-events-none absolute inset-0 -z-0 opacity-50">
        <CanvasScene>
          <FloatingParticles />
        </CanvasScene>
      </div>
    </motion.section>
  );
}
