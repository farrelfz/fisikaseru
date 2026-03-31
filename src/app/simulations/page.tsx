"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function SimulationsPage() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold text-blue-600">Simulation Labs</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="text-2xl font-semibold text-blue-600">MilikanLab</h2>
          <p className="mt-2 text-slate-600">
            Simulasi eksperimen tetes minyak Millikan untuk mempelajari gaya listrik dan gravitasi.
          </p>
          <Link href="/simulations/milikan" className="mt-4 inline-block">
            <Button>Open Simulation</Button>
          </Link>
        </Card>
      </div>
    </motion.section>
  );
}
