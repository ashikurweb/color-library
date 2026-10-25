export const SITE = {
  name: "Color Names",
  description:
    "Wander through 31,993 color names, each one chosen by a person: a space of color cards, each hanging where its color is.",
  colorCount: 31_993,
  listVersion: "14.80.0",
  original: "https://names.color.pizza",
  repository: "https://github.com/meodai/color-names",
  source: "https://github.com/meodai/names.color.pizza",
  media: "https://media.color.pizza",
  annualCost: 980,
  adoptionMinimum: 5,
} as const;

export const COLOR_COUNT_LABEL = SITE.colorCount.toLocaleString("en-US");

export function siteOrigin(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}
