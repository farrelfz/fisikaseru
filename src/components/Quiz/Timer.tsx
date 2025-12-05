"use client";

import { useEffect, useState } from "react";

interface TimerProps {
  startedAt?: string | null;
}

export function Timer({ startedAt }: TimerProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!startedAt) return;
    const start = new Date(startedAt).getTime();
    const id = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => window.clearInterval(id);
  }, [startedAt]);

  const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const seconds = String(elapsed % 60).padStart(2, "0");

  return (
    <div className="rounded-full border border-border px-4 py-1 text-sm font-mono text-brand-midnight">
      ⏱ {minutes}:{seconds}
    </div>
  );
}
