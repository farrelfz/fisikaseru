import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "green" | "blue" | "ghost" | "outline";
}

const variantClass: Record<NonNullable<ButtonProps["variant"]>, string> = {
  gold: "bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/60",
  green: "bg-[#00A859]/15 text-[#00A859] border border-[#00A859]/50",
  blue: "bg-[#4FC3F7]/20 text-white border border-[#4FC3F7]/40",
  ghost: "bg-transparent text-white border border-white/20",
  outline: "bg-white text-[#1D2A40] border border-[#1D2A40]/10"
};

export function Button({ className, variant = "ghost", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors",
        variantClass[variant],
        className
      )}
      {...props}
    />
  );
}
