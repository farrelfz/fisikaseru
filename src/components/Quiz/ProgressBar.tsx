interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const value = total === 0 ? 0 : (current / total) * 100;
  return (
    <div className="w-full rounded-full bg-muted/40">
      <div
        className="h-2 rounded-full bg-gradient-to-r from-brand-sun to-brand-sky"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
