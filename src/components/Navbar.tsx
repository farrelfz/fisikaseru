"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/belajar", label: "Belajar" },
  { href: "/simulasi", label: "Simulasi" },
  { href: "/kuis", label: "Kuis" },
  { href: "/dashboard", label: "Dashboard" }
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-[#223550] bg-[#1D2A40]/95 text-white backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-display text-xl text-[#FFD700]">
          <span className="rounded-full bg-[#FFD700]/15 px-3 py-1 text-sm font-semibold text-white">FS</span>
          FisikaSeru
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors",
                pathname === "/" && link.href === "/"
                  ? "text-[#FFD700]"
                  : pathname?.startsWith(link.href) && link.href !== "/"
                    ? "text-[#4FC3F7]"
                    : "text-white/70 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/auth/login"
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            Masuk
          </Link>
          <Link
            href="/auth/register"
            className="rounded-full bg-[#4FC3F7] px-4 py-2 text-sm font-semibold text-[#1D2A40] shadow-[0_10px_20px_rgba(79,195,247,0.45)]"
          >
            Mulai
          </Link>
        </div>
        <button
          type="button"
          className="md:hidden rounded-full border border-white/20 p-2 text-white"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-[#223550] bg-[#0f172a]">
          <div className="mx-auto flex w-full max-w-6xl flex-col px-6 py-4 text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 text-white/80"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/auth/login"
                className="rounded-full border border-white/20 px-4 py-2 text-center text-white"
                onClick={() => setOpen(false)}
              >
                Masuk
              </Link>
              <Link
                href="/auth/register"
                className="rounded-full bg-[#4FC3F7] px-4 py-2 text-center text-[#1D2A40]"
                onClick={() => setOpen(false)}
              >
                Mulai
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
