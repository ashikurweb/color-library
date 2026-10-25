import type { Metadata } from "next";
import { AdoptionExperience } from "@/features/adoption/components/adoption-experience";
import { MoreProjects } from "@/features/adoption/components/more-projects";
import { getAdoptions, getColorBySlug, getColors, getSlug } from "@/lib/server/color-repository";

export const metadata: Metadata = {
  title: "Adopt a color",
  description: "Be the one and only patron of a color. Keep Color Names and its API free for everyone.",
};

export default async function AdoptPage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string; name?: string }>;
}) {
  const params = await searchParams;
  const color =
    (params.c
      ? getColorBySlug(params.c)
      : params.name
        ? getColors().find((entry) => entry.name === params.name)
        : undefined) ?? getColorBySlug("bright-red")!;
  return (
    <AdoptionExperience initialColor={color} initialSlug={getSlug(color.name)!} adoptions={getAdoptions()}>
      <MoreProjects />
    </AdoptionExperience>
  );
}
