export const SITE = {
  name: "Ashikur Rahman",
  copyrightOwner: "Ashikur Rahman",
  github: "https://github.com/ashikurweb",
  repository: "https://github.com/ashikurweb/color-library",
  description:
    "Explore 31,993 named colors in an interactive atlas. Find your shade, compare palettes, and make it your own.",
  colorCount: 31_993,
  listVersion: "14.80.0",
  version: "1.0.0",
  adoptionMinimum: 5,
} as const;

export const COLOR_COUNT_LABEL = SITE.colorCount.toLocaleString("en-US");

export function siteOrigin(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}
