"use client";

import { useState } from "react";
import { loginSchema } from "@/lib/schemas";
import { createSupabaseBrowserClient } from "@/lib/supabase";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parse = loginSchema.safeParse(form);
    if (!parse.success) {
      setError(parse.error.issues[0].message);
      return;
    }
    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError("Supabase belum dikonfigurasi. Isi NEXT_PUBLIC_SUPABASE_* di .env.local");
      setLoading(false);
      return;
    }
    const { error: signInError } = await supabase.auth.signInWithPassword(parse.data);
    setLoading(false);
    setError(signInError?.message ?? null);
  };

  return (
    <div className="container flex justify-center py-12">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 rounded-2xl border border-border bg-white/80 p-6">
        <header className="space-y-1 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-sky">Masuk</p>
          <h1 className="font-display text-3xl text-brand-midnight">Selamat datang kembali</h1>
        </header>
        <label className="flex flex-col gap-2 text-sm">
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            className="rounded-xl border border-border bg-white/80 p-3"
            placeholder="kamu@fisika.com"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
            className="rounded-xl border border-border bg-white/80 p-3"
            placeholder="••••••••"
          />
        </label>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-brand-midnight py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Memproses..." : "Masuk"}
        </button>
        <p className="text-center text-sm text-brand-midnight/80">
          Belum punya akun? <a href="/auth/register" className="font-semibold text-brand-sky">Daftar sekarang</a>
        </p>
      </form>
    </div>
  );
}
