import { normalizeHex } from "@/lib/colors";
import { colorStudySvg, STUDY_COUNT } from "@/lib/color-studies";
import { getColorBySlug } from "@/lib/server/color-repository";
import { colorStudies, pixelTile } from "@/lib/server/local-media";

const CACHE = {
  "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
  "X-Content-Type-Options": "nosniff",
};

/** Bounded local media endpoints, with no remote proxy or arbitrary URL input. */
export async function GET(_request: Request, { params }: { params: Promise<{ segments: string[] }> }) {
  const { segments } = await params;
  if (segments.some((part) => !/^[a-z0-9_.-]+$/.test(part) || part === "." || part === ".."))
    return new Response("Not found", { status: 404 });
  if (segments.length === 3 && segments[0] === "studies") {
    const hex = normalizeHex(segments[1]);
    const match = segments[2].match(/^(\d{1,2})\.svg$/);
    const variant = match ? Number(match[1]) : -1;
    if (!hex || variant < 0 || variant >= STUDY_COUNT) return new Response("Not found", { status: 404 });
    return new Response(colorStudySvg(hex, variant), {
      headers: {
        ...CACHE,
        "Content-Type": "image/svg+xml",
        "Content-Security-Policy": "default-src 'none'; sandbox",
      },
    });
  }
  if (segments.length !== 2 || !["lists", "pixel"].includes(segments[0]))
    return new Response("Not found", { status: 404 });
  const suffix = segments[0] === "lists" ? ".json" : ".webp";
  if (!segments[1].endsWith(suffix)) return new Response("Not found", { status: 404 });
  const slug = segments[1].slice(0, -suffix.length);
  const color = getColorBySlug(slug);
  if (!color) return new Response("Not found", { status: 404 });
  if (segments[0] === "lists") return Response.json(colorStudies(color, slug), { headers: CACHE });
  try {
    return new Response(new Uint8Array(await pixelTile(color, slug)), {
      headers: { ...CACHE, "Content-Type": "image/webp" },
    });
  } catch {
    return new Response("Image unavailable", { status: 500 });
  }
}
