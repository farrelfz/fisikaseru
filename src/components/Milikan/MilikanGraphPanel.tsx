"use client";
import React, { useMemo } from "react";
import { useSimStore } from "@/store/useSimStore";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ACCENT_CYAN = "#4FC3F7";
const ACCENT_GOLD = "#FFD700";

export function MilikanGraphPanel() {
  const { floatingTable, risingTable, mode } = useSimStore();
  const measurements = useMemo(() => {
    if (mode === "floating") {
      return floatingTable.map((r) => ({
        no: r.id,
        U: r.U,
        v_fall: (r.v2 ?? 0) / 1000,
        v_rise: (r.v2 ?? 0) / 1000,
        r: (r.rMicron ?? 0) / 1e6,
        q: (r.q19 ?? 0) * 1e-19,
      }));
    }
    return risingTable.map((r) => ({
      no: r.id,
      U: r.U,
      v_fall: (r.v2 ?? 0) / 1000,
      v_rise: (r.v1 ?? 0) / 1000,
      r: (r.rMicron ?? 0) / 1e6,
      q: (r.q19 ?? 0) * 1e-19,
    }));
  }, [floatingTable, risingTable, mode]);

  const labels = measurements.map((m) => `#${m.no}`);

  const vFallVsU = useMemo(
    () => ({
      labels: measurements.map((m) => m.U),
      datasets: [
        {
          label: "v_fall (mm/s)",
          data: measurements.map((m) => m.v_fall * 1000),
          borderColor: ACCENT_CYAN,
          backgroundColor: ACCENT_CYAN,
          tension: 0.3,
        },
      ],
    }),
    [measurements]
  );

  const vRiseVsU = useMemo(
    () => ({
      labels: measurements.map((m) => m.U),
      datasets: [
        {
          label: "v_rise (mm/s)",
          data: measurements.map((m) => m.v_rise * 1000),
          borderColor: ACCENT_GOLD,
          backgroundColor: ACCENT_GOLD,
          tension: 0.3,
        },
      ],
    }),
    [measurements]
  );

  const qVsExp = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "q / e",
          data: measurements.map((m) => m.q / 1.602176634e-19),
          borderColor: ACCENT_CYAN,
          backgroundColor: ACCENT_CYAN,
          pointStyle: "rectRounded" as const,
          tension: 0.2,
        },
      ],
    }),
    [measurements]
  );

  const rVsV = useMemo(
    () => ({
      labels: measurements.map((m) => (m.v_fall * 1000).toFixed(2)),
      datasets: [
        {
          label: "r (µm)",
          data: measurements.map((m) => m.r * 1e6),
          borderColor: ACCENT_GOLD,
          backgroundColor: ACCENT_GOLD,
          tension: 0.3,
        },
      ],
    }),
    [measurements]
  );

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "#cfeefc" } },
      title: { display: false },
    },
    scales: {
      x: { ticks: { color: "#bfe7ff" }, grid: { color: "rgba(79,195,247,0.06)" } },
      y: { ticks: { color: "#bfe7ff" }, grid: { color: "rgba(79,195,247,0.06)" } },
    },
  } as const;

  return (
    <div className="space-y-4">
      <div className="rounded p-2 bg-[#071825] border border-white/6">
        <div className="text-xs text-white/60 mb-2">v_fall vs U</div>
        <Line options={options} data={vFallVsU} className="milikan-chart" />
      </div>

      <div className="rounded p-2 bg-[#071825] border border-white/6">
        <div className="text-xs text-white/60 mb-2">v_rise vs U</div>
        <Line options={options} data={vRiseVsU} className="milikan-chart" />
      </div>

      <div className="rounded p-2 bg-[#071825] border border-white/6">
        <div className="text-xs text-white/60 mb-2">q / e vs Experiment</div>
        <Line options={options} data={qVsExp} className="milikan-chart" />
      </div>

      <div className="rounded p-2 bg-[#071825] border border-white/6">
        <div className="text-xs text-white/60 mb-2">r (µm) vs v_fall (mm/s)</div>
        <Line options={options} data={rVsV} className="milikan-chart" />
      </div>
    </div>
  );
}
