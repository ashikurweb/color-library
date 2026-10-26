import "server-only";

import path from "node:path";
import sharp from "sharp";
import atlas from "../../../public/media/data/pixel-atlas.json";
import { colorStudySvg, studyPalette, STUDY_COUNT, STUDY_NAMES } from "@/lib/color-studies";
import { SITE } from "@/lib/site";
import type { NamedColor } from "@/types/color";

const slots = new Map(atlas.slugs.map((slug, index) => [slug, index]));

export function colorStudies(color: NamedColor, slug: string) {
  const palette = studyPalette(color.hex);
  return Array.from({ length: STUDY_COUNT }, (_, variant) => ({
    id: `${slug}-${variant}`,
    title: `${color.name} · ${STUDY_NAMES[variant % STUDY_NAMES.length]} ${variant >= 6 ? "II" : "I"}`,
    artist: SITE.name,
    date: "2026",
    museum: "studies",
    image: `/media/studies/${color.hex.slice(1)}/${variant}.svg`,
    url: `/color/${slug}/#art`,
    ratio: 1,
    color: color.hex,
    palette: palette.map((hex) => [hex, 20]),
  }));
}

/** Crop the included atlas; no original website or remote image host is contacted. */
export async function pixelTile(color: NamedColor, slug: string): Promise<Buffer> {
  const index = slots.get(slug);
  if (index === undefined)
    return sharp(Buffer.from(colorStudySvg(color.hex, 5)))
      .resize(64, 64)
      .webp()
      .toBuffer();
  const sheet = Math.floor(index / atlas.per);
  const slot = index % atlas.per;
  return sharp(path.join(process.cwd(), "public", "media", "pixel-atlas", atlas.sheets[sheet]))
    .extract({
      left: (slot % atlas.cols) * atlas.tile,
      top: Math.floor(slot / atlas.cols) * atlas.tile,
      width: atlas.tile,
      height: atlas.tile,
    })
    .resize(64, 64, { kernel: "nearest" })
    .webp({ lossless: true })
    .toBuffer();
}
