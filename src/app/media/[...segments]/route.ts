import { SITE } from "@/lib/site";

const CATEGORIES = new Set(["data", "pixel", "pixel-atlas", "art", "avatars", "cards", "lists", "previews"]);

/** A fixed-host media gateway, shared by normal images, image bitmaps, and WebGL textures. */
export async function GET(request: Request, { params }: { params: Promise<{ segments: string[] }> }) {
  const { segments } = await params;
  if (
    !CATEGORIES.has(segments[0]) ||
    segments.some((part) => !/^[a-zA-Z0-9_.-]+$/.test(part) || part === "." || part === "..")
  ) {
    return new Response("Not found", { status: 404 });
  }
  const url = new URL(`${SITE.media}/${segments.map(encodeURIComponent).join("/")}`);
  const query = new URL(request.url).searchParams;
  for (const key of ["v", "t", "try"]) if (query.has(key)) url.searchParams.set(key, query.get(key)!);
  try {
    const upstream = await fetch(url, {
      headers: { Origin: SITE.original, Referer: `${SITE.original}/` },
      signal: AbortSignal.timeout(20_000),
      next: { revalidate: 86_400 },
    });
    if (!upstream.ok)
      return new Response("Media unavailable", { status: upstream.status === 404 ? 404 : 502 });
    const contentType = upstream.headers.get("content-type") || "application/octet-stream";
    const body = contentType.includes("json")
      ? (await upstream.text()).replaceAll(`${SITE.media}/`, "/media/")
      : upstream.body;
    return new Response(body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Media temporarily unavailable", { status: 502 });
  }
}
