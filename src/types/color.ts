export type HexColor = `#${string}`;

export interface NamedColor {
  readonly name: string;
  readonly hex: HexColor;
}

export type ColorList = "default" | "bestOf" | "short" | "adopted";
export type ColorModel = "rgb" | "oklab" | "oklch" | "hsl";
export type ExplorerView = "colors" | "cells" | "pixel" | "az";

export type PatronPlatform =
  | "name"
  | "bluesky"
  | "github"
  | "x"
  | "instagram"
  | "tiktok"
  | "twitch"
  | "linkedin"
  | "website"
  | "anonymous";

export interface Adoption {
  readonly on: PatronPlatform;
  readonly by: string;
  readonly amount: number;
  readonly at: string;
  readonly avatar?: string;
  readonly founding?: boolean;
  readonly shine?: string;
}

export interface ColorPageData extends NamedColor {
  readonly slug: string;
  readonly description: string | null;
  readonly fetched?: string | null;
  readonly looked?: Record<string, unknown> | null;
  readonly list?: string | null;
  readonly adopted?: Adoption;
  readonly pixel?: Record<string, unknown> | null;
}

export interface Patron extends Adoption {
  readonly id: string;
  readonly total: number;
  readonly colors: readonly (NamedColor & { readonly slug: string })[];
}
