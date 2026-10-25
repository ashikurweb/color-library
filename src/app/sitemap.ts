import type { MetadataRoute } from "next";
import { getColors, getSlug } from "@/lib/server/color-repository";
import { siteOrigin } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();
  return [
    ...["/", "/adopt/", "/supporters/", "/legal/"].map((route) => ({ url: `${origin}${route}` })),
    ...getColors().map((color) => ({ url: `${origin}/color/${getSlug(color.name)}/` })),
  ];
}
