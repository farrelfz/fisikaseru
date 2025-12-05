import { notFound } from "next/navigation";
import { ParameterPanel } from "@/components/Simulation/ParameterPanel";
import { ControlPanel } from "@/components/Simulation/ControlPanel";
import { SimulationCanvas } from "@/components/Simulation/SimulationCanvas";
import { GraphPanel } from "@/components/Simulation/GraphPanel";
import { DataTable } from "@/components/Simulation/DataTable";
import { BottomPanel } from "@/components/Simulation/BottomPanel";

const allowedLabs = new Set(["milikanlab", "pyrolab", "cosmoslab"]);

interface LabPageProps {
  params: {
    slug: string;
  };
}

export default function LabPage({ params }: LabPageProps) {
  if (!allowedLabs.has(params.slug)) {
    return notFound();
  }

  return (
    <div className="container space-y-10 py-12">
      <header>
        <p className="text-xs uppercase tracking-[0.4em] text-brand-sky">{params.slug}</p>
        <h1 className="font-display text-4xl text-brand-midnight">Blueprint Simulasi {params.slug}</h1>
        <p className="text-muted-foreground">Panel parameter dan visualisasi siap diisi model kalkulasi lanjutan.</p>
      </header>
      <div className="grid gap-8 lg:grid-cols-[350px_minmax(0,1fr)]">
        <ParameterPanel />
        <div className="flex flex-col gap-6">
          <ControlPanel />
          <SimulationCanvas />
          <GraphPanel />
          <DataTable />
          <BottomPanel />
        </div>
      </div>
    </div>
  );
}
