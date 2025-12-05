import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface SwitchProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  label?: string;
}

export function Switch({ checked, className, label, ...props }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={cn(
        "relative flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold",
        checked ? "border-[#4FC3F7] bg-[#4FC3F7]/20 text-white" : "border-white/20 bg-white/5 text-white/70",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "inline-flex h-4 w-4 items-center justify-center rounded-full",
          checked ? "bg-[#4FC3F7]" : "bg-white/30"
        )}
      />
      {label}
    </button>
  );
}
