import type { Adoption, PatronPlatform } from "@/types/color";

export const PLATFORMS: readonly { value: PatronPlatform; label: string }[] = [
  { value: "name", label: "Just a name" },
  { value: "bluesky", label: "Bluesky" },
  { value: "github", label: "GitHub" },
  { value: "x", label: "X" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "twitch", label: "Twitch" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "website", label: "Website" },
  { value: "anonymous", label: "Stay anonymous" },
];

export function patronHandle({ on, by }: Pick<Adoption, "on" | "by">): string {
  if (on === "anonymous") return "Anonymous";
  if (on === "name" || on === "website") return by;
  return `@${by.replace(/^@/, "")}`;
}

export function patronUrl({ on, by }: Pick<Adoption, "on" | "by">): string | undefined {
  const handle = encodeURIComponent(by.replace(/^@/, ""));
  const urls: Partial<Record<PatronPlatform, string>> = {
    bluesky: `https://bsky.app/profile/${handle}`,
    github: `https://github.com/${handle}`,
    x: `https://x.com/${handle}`,
    instagram: `https://instagram.com/${handle}/`,
    tiktok: `https://tiktok.com/@${handle}`,
    twitch: `https://twitch.tv/${handle}`,
    linkedin: `https://linkedin.com/in/${handle}/`,
    website: `https://${by.replace(/^https?:\/\//, "")}`,
  };
  return urls[on];
}

export function cleanIdentity(typed: string, platform: PatronPlatform): string {
  if (platform === "anonymous") return "Anonymous";
  if (platform === "name") return typed.trim().slice(0, 60);
  if (platform === "website")
    return typed
      .trim()
      .toLowerCase()
      .replace(/^[a-z]+:\/\//, "")
      .replace(/^www\./, "")
      .replace(/[/?#:].*$/, "")
      .slice(0, 60);
  const name = typed
    .trim()
    .replace(/^https?:\/\/[^/]+\/(profile\/|in\/)?/, "")
    .replace(/^@/, "")
    .replace(/[/?#].*$/, "")
    .slice(0, 60);
  return platform === "bluesky" && name && !name.includes(".") ? `${name}.bsky.social` : name;
}

export function validIdentity(identity: string, platform: PatronPlatform): boolean {
  if (platform === "anonymous") return true;
  if (!identity.trim()) return false;
  if (platform === "website") return /^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/.test(identity);
  return platform === "name" || !/\s/.test(identity);
}
