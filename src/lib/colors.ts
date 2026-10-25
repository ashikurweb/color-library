import type { HexColor, NamedColor } from "@/types/color";

const LETTERS: Record<string, string> = {
  ß: "ss",
  æ: "ae",
  œ: "oe",
  ø: "o",
  ł: "l",
  đ: "d",
  ð: "d",
  þ: "th",
  ı: "i",
};

export function normalizeHex(input: unknown): HexColor | null {
  if (typeof input !== "string") return null;
  const value = input.trim().replace(/^#/, "").toLowerCase();
  if (!/^([0-9a-f]{3}|[0-9a-f]{6})$/.test(value)) return null;
  return `#${value.length === 3 ? [...value].map((v) => v + v).join("") : value}`;
}

export function foldName(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[ßæœøłđðþı]/g, (letter) => LETTERS[letter]);
}

export function baseSlug(name: string): string {
  return (
    name
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "color"
  );
}

/** Matches the source site's collision rules, including names that resemble hex codes. */
export function createColorSlugs(colors: readonly NamedColor[]): Map<string, string> {
  const groups = new Map<string, NamedColor[]>();
  for (const color of colors) {
    const base = baseSlug(color.name);
    const group = groups.get(base) ?? [];
    group.push(color);
    groups.set(base, group);
  }
  const slugs = new Map<string, string>();
  const changes = (name: string, slug: string) =>
    [...name.toLowerCase()].filter((ch) => !slug.includes(ch)).length;
  for (const [base, group] of groups) {
    group.sort((a, b) => changes(a.name, base) - changes(b.name, base) || (a.name < b.name ? -1 : 1));
    group.forEach((color, index) => {
      slugs.set(
        color.name,
        index === 0 && !/^[0-9a-f]{6}$/.test(base) ? base : `${base}-${color.hex.slice(1)}`,
      );
    });
  }
  return slugs;
}

/** Safe inside an HTML script element, including names containing HTML-like text. */
export function serializeJson(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function colorLink(slug: string): string {
  return `/color/${encodeURIComponent(slug)}/`;
}
