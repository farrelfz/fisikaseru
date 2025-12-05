import { cn } from "@/lib/utils";

interface OptionCardProps {
  label: string;
  description?: string;
  active?: boolean;
  onClick: () => void;
}

export function OptionCard({ label, description, active, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-xl border px-4 py-3 text-left transition",
        active ? "border-brand-sun bg-brand-sun/20" : "border-border bg-white/70 hover:border-brand-sky/60"
      )}
    >
      <p className="font-semibold text-brand-midnight">{label}</p>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </button>
  );
}
