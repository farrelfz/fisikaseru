"use client";
import { useSimStore } from "@/store/useSimStore";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function MilikanBottomPanel() {
  const { mode, U, floatingTable, risingTable } = useSimStore();

  const measurements = (mode === "floating" ? floatingTable : risingTable).map((r) => ({
    no: r.id,
    U: r.U,
    v_fall: (mode === "floating" ? r.v2 : r.v2) ?? 0, // mm/s in table
    v_rise: (mode === "floating" ? r.v2 : r.v1) ?? 0, // mm/s
    r: r.rMicron ?? 0, // micron
    q: r.q19 ?? 0, // x1e-19 C
  }));

  const exportPDF = async () => {
    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    const margin = 20;
    let y = margin;

    const canvasEl = document.querySelector("#milikan-canvas") as HTMLDivElement | null;
    if (canvasEl) {
      const imgCanvas = await html2canvas(canvasEl as HTMLElement, { backgroundColor: "#071825", scale: 2 });
      const imgData = imgCanvas.toDataURL("image/png");
      const imgW = pdf.internal.pageSize.getWidth() - 2 * margin;
      const imgH = (imgCanvas.height * imgW) / imgCanvas.width;
      pdf.addImage(imgData, "PNG", margin, y, imgW, imgH);
      y += imgH + 12;
    }

    const charts = document.querySelectorAll<HTMLCanvasElement>(".milikan-chart");
    if (charts.length) {
      const imgW = (pdf.internal.pageSize.getWidth() - 2 * margin);
      for (const c of Array.from(charts)) {
        const chartImg = c.toDataURL("image/png", 1.0);
        const imgH = (c.height * imgW) / c.width;
        if (y + imgH > pdf.internal.pageSize.getHeight() - margin) {
          pdf.addPage();
          y = margin;
        }
        pdf.addImage(chartImg, "PNG", margin, y, imgW, imgH);
        y += imgH + 10;
      }
    }

    pdf.setFontSize(10);
    pdf.setTextColor(10, 200, 230);
    pdf.text("Measurements", margin, y);
    y += 14;

    pdf.setFontSize(9);
    pdf.setTextColor(255, 255, 255);
    const headers = ["No", "U (V)", "v_fall (mm/s)", "v_rise (mm/s)", "r (µm)", "q (×10⁻¹⁹ C)"];
    const colW = (pdf.internal.pageSize.getWidth() - 2 * margin) / headers.length;
    headers.forEach((h, i) => pdf.text(h, margin + i * colW + 2, y));
    y += 12;

    measurements.forEach((m) => {
      const row = [
        `${m.no}`,
        `${m.U}`,
        (m.v_fall).toFixed(3),
        (m.v_rise).toFixed(3),
        (m.r).toFixed(3),
        (m.q).toFixed(2),
      ];
      row.forEach((cell, i) => pdf.text(cell, margin + i * colW + 2, y));
      y += 12;
      if (y > pdf.internal.pageSize.getHeight() - 60) {
        pdf.addPage();
        y = margin;
      }
    });

    pdf.save("MilikanLab_Report.pdf");
  };

  return (
    <div className="mt-6 rounded-2xl border border-[#22324d] bg-[#122035] p-5 shadow-[0_20px_60px_rgba(3,7,18,0.55)]">
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/80">
          Toolbar: [ Jalankan ] [ Hentikan ] [ Reset ] • Mode: {mode === "floating" ? "Melayang" : "Naik–Turun"} | {U} V
        </p>
        <button onClick={exportPDF} className="rounded-full bg-[#4FC3F7] px-4 py-2 text-sm font-semibold text-black">
          Export PDF
        </button>
      </div>
    </div>
  );
}
