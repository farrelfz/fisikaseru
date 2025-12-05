export async function GET() {
  return Response.json({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "null",
    anon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "null",
  });
}
