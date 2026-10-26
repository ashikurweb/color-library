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

/** All page data is local; viewing a color never contacts another project's server. */
export const getColorPage = cache(async (slug: string): Promise<ColorPageData | null> => {
  const color = bySlug.get(slug);
  if (!color) return null;
  return {
    ...color,
    slug,
    description: descriptions.get(color.name) ?? null,
    adopted: adoptions[slug],
    looked: { entries: [], words: [], images: [], pictures: [] },
    list: `/media/lists/${slug}.json`,
    pixel: { src: `/media/pixel/${slug}.webp`, subject: color.name },
  };
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
  return [...people.values()].sort((a, b) => b.total - a.total);
}
