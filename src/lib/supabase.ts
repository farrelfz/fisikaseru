import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const missingEnvMessage =
  "Supabase env vars missing. Set NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY (lihat .env.example).";

const resolveSupabaseEnv = (): { url: string; anonKey: string } | null => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    return null;
  }
  return { url, anonKey };
};

export const isSupabaseConfigured = (): boolean => Boolean(resolveSupabaseEnv());

export const createSupabaseBrowserClient = (): SupabaseClient | null => {
  const config = resolveSupabaseEnv();
  if (!config) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(missingEnvMessage);
      return null;
    }
    throw new Error(missingEnvMessage);
  }

  return createClient(config.url, config.anonKey, {
    auth: {
      detectSessionInUrl: true,
      persistSession: true
    }
  });
};
