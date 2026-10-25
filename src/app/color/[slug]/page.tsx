import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { RuntimeBoundary } from "@/components/runtime-boundary";
import { ColorDetailMarkup } from "@/features/color-detail/components/color-detail-markup";
import { getColorPage, getColorByHex, getSlug } from "@/lib/server/color-repository";
import { colorLink, normalizeHex, serializeJson } from "@/lib/colors";

export const revalidate = 86_400;
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ["rebecca-purple", "red", "blue", "green", "24-carrot", "squirrel"].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const color = await getColorPage((await params).slug);
  if (!color) return { title: "Color not found" };
  return {
    title: `${color.name}: ${color.hex}`,
    description:
      color.description ??
      `Explore ${color.name} (${color.hex}), its neighbors, complements, color values, and art.`,
    alternates: { canonical: `/color/${color.slug}/` },
    openGraph: { title: `${color.name} · ${color.hex}`, images: ["/og.jpg"] },
  };
}

export default async function NamedColorPage({ params }: Props) {
  const { slug } = await params;
  const hex = normalizeHex(slug);
  const alias = hex && getColorByHex(hex);
  if (alias) permanentRedirect(colorLink(getSlug(alias.name)!));
  const color = await getColorPage(slug);
  if (!color) notFound();
  return (
    <RuntimeBoundary kind="color">
      <ColorDetailMarkup color={color} />
      <script
        id="color-data"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: serializeJson(color) }}
      />
    </RuntimeBoundary>
  );
}
