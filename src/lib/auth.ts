import { cookies } from "next/headers";
import { createSupabaseBrowserClient } from "@/lib/supabase";

export const getSession = async () => {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) {
    throw new Error("Supabase belum dikonfigurasi. Tambahkan NEXT_PUBLIC_SUPABASE_* ke .env.local");
  }
  const {
    data: { session }
  } = await supabase.auth.getSession();
  return session;
};

export const signOut = async () => {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) {
    throw new Error("Supabase belum dikonfigurasi. Tambahkan NEXT_PUBLIC_SUPABASE_* ke .env.local");
  }
  await supabase.auth.signOut();
  cookies().delete("sb:token");
};
