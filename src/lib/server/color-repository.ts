import "server-only";

import { cache } from "react";
import rawColors from "../../../public/data/colors.json";
import rawDescriptions from "../../../public/data/descriptions.json";
import rawAdoptions from "../../../public/data/adopted.json";
import { createColorSlugs } from "@/lib/colors";
import { SITE } from "@/lib/site";
import type { Adoption, ColorPageData, NamedColor, Patron } from "@/types/color";

const colors = rawColors as readonly NamedColor[];
const slugs = createColorSlugs(colors);
const bySlug = new Map(colors.map((color) => [slugs.get(color.name)!, color]));
const byHex = new Map(colors.map((color) => [color.hex, color]));
const descriptions = new Map(rawDescriptions.map((entry) => [entry.name, entry.description]));
const adoptions = rawAdoptions as Record<string, Adoption>;

export function getColors(): readonly NamedColor[] {
  return colors;
}
export function getColorBySlug(slug: string): NamedColor | undefined {
  return bySlug.get(slug);
}
export function getColorByHex(hex: string): NamedColor | undefined {
  return byHex.get(hex as NamedColor["hex"]);
}
export function getSlug(name: string): string | undefined {
  return slugs.get(name);
}
export function getAdoptions(): Readonly<Record<string, Adoption>> {
  return adoptions;
}

/** Keep artwork on this origin so the same URL works in WebGL, localhost, and production. */
function localizeMedia<T>(data: T): T {
  return JSON.parse(JSON.stringify(data).replaceAll(`${SITE.media}/`, "/media/")) as T;
}

export const getColorPage = cache(async (slug: string): Promise<ColorPageData | null> => {
  const color = bySlug.get(slug);
  if (!color) return null;
  const fallback: ColorPageData = {
    ...color,
    slug,
    description: descriptions.get(color.name) ?? null,
    adopted: adoptions[slug],
    looked: null,
    list: null,
  };

  // Editorial copy and credited artwork are optional. Core color data stays available offline.
  try {
    const response = await fetch(`${SITE.original}/color/${encodeURIComponent(slug)}/`, {
      next: { revalidate: 86_400 },
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return localizeMedia(fallback);
    const match = (await response.text()).match(
      /<script type="application\/json" id="color-data">([\s\S]*?)<\/script>/,
    );
    if (!match) return localizeMedia(fallback);
    const detail = JSON.parse(match[1]) as ColorPageData;
    if (detail.name !== color.name || detail.hex.toLowerCase() !== color.hex) return localizeMedia(fallback);
    return localizeMedia({ ...fallback, ...detail, slug });
  } catch {
    return localizeMedia(fallback);
  }
});

export function getPatrons(): Patron[] {
  const people = new Map<string, Patron>();
  for (const [slug, adoption] of Object.entries(adoptions)) {
    if (adoption.amount < SITE.adoptionMinimum) continue;
    const color = bySlug.get(slug);
    if (!color) continue;
    const id = adoption.on === "anonymous" ? `anonymous:${slug}` : `${adoption.on}:${adoption.by}`;
    const previous = people.get(id);
    people.set(id, {
      ...adoption,
      id,
      avatar: previous?.avatar || adoption.avatar,
      founding: previous?.founding || adoption.founding,
      total: (previous?.total ?? 0) + adoption.amount,
      colors: [...(previous?.colors ?? []), { ...color, slug }],
    });
  }
  return localizeMedia([...people.values()].sort((a, b) => b.total - a.total));
}
