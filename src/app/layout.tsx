import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AppProviders } from "@/providers/app-providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "FisikaSeru | Lab Virtual & Kuis Adaptif",
  description: "Platform edtech fisika berisi simulasi MilikanLab, kuis adaptif, dan roadmap belajar bertahap."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground",
          inter.variable,
          spaceGrotesk.variable,
          "font-body"
        )}
      >
        <AppProviders>
          <div className="relative flex min-h-screen flex-col">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,215,0,0.25),_transparent_55%)]" />
            <Navbar />
            <main className="flex-1 bg-gradient-to-b from-white via-brand-sky/10 to-brand-midnight/5">{children}</main>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
