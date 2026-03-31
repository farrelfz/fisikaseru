import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "FisikaSeru — Interactive 3D Physics Learning Platform",
  description: "Belajar fisika lewat simulasi 3D interaktif berbasis web."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F0F9FF] font-[Inter,system-ui,sans-serif] text-slate-900">
        <nav className="border-b border-blue-100 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-xl font-bold text-blue-600">
              FisikaSeru
            </Link>
            <div className="flex items-center gap-5 text-sm font-medium">
              <Link href="/">Home</Link>
              <Link href="/simulations">Simulations</Link>
            </div>
          </div>
        </nav>
        <main className="mx-auto min-h-[calc(100vh-65px)] w-full max-w-6xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
