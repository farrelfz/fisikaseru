"use client";

import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/lib/supabase";

const SupabaseContext = createContext<SupabaseClient | null>(null);

interface SupabaseProviderProps {
  children: ReactNode;
}

export function SupabaseProvider({ children }: SupabaseProviderProps) {
  const client = useMemo(() => createSupabaseBrowserClient(), []);
  const missingEnv = client === null;

  return (
    <SupabaseContext.Provider value={client}>
      {missingEnv && process.env.NODE_ENV !== "production" ? (
        <div className="mx-auto mb-4 w-full max-w-3xl rounded-xl border border-dashed border-brand-sky/50 bg-brand-sky/10 p-4 text-sm text-brand-midnight">
          Supabase belum dikonfigurasi. Tambahkan <code>NEXT_PUBLIC_SUPABASE_URL</code> dan{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> ke <code>.env.local</code> (lihat <code>.env.example</code>), lalu jalankan ulang server dev.
        </div>
      ) : null}
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabaseClient(): SupabaseClient {
  const context = useContext(SupabaseContext);

  if (!context) {
    throw new Error(
      "Supabase client tidak tersedia. Pastikan provider terpasang dan env NEXT_PUBLIC_SUPABASE_* sudah diisi."
    );
  }

  return context;
}
