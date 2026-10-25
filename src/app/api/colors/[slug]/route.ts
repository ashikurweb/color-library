import { getColorPage } from "@/lib/server/color-repository";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const color = await getColorPage((await params).slug);
  if (!color) return Response.json({ error: "Color not found" }, { status: 404 });
  return Response.json(color, {
    headers: { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" },
  });
}
