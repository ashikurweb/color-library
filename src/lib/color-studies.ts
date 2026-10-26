import type { HexColor } from "@/types/color";

export const STUDY_COUNT = 12;
export const STUDY_NAMES = ["Orbit", "Prism", "Layers", "Rhythm", "Horizon", "Mosaic"] as const;

function blend(hex: HexColor, target: number, amount: number): HexColor {
  const channels = [1, 3, 5].map((index) => {
    const value = parseInt(hex.slice(index, index + 2), 16);
    return Math.round(value + (target - value) * amount)
      .toString(16)
      .padStart(2, "0");
  });
  return `#${channels.join("")}`;
}

export function studyPalette(hex: HexColor): readonly HexColor[] {
  return [hex, blend(hex, 255, 0.28), blend(hex, 255, 0.66), blend(hex, 0, 0.28), blend(hex, 0, 0.65)];
}

/** Deterministic, original vector compositions; input is a validated hex, never arbitrary SVG. */
export function colorStudySvg(hex: HexColor, variant: number): string {
  const palette = studyPalette(hex);
  const reverse = variant >= 6;
  const c = (index: number) => palette[(index + (reverse ? 3 : 0)) % palette.length];
  let shapes = "";
  switch (variant % 6) {
    case 0:
      shapes = Array.from(
        { length: 7 },
        (_, i) =>
          `<circle cx="${reverse ? 230 : 560}" cy="${reverse ? 600 : 230}" r="${640 - i * 88}" fill="${c(i)}"/>`,
      ).join("");
      break;
    case 1:
      shapes = Array.from(
        { length: 9 },
        (_, i) =>
          `<path d="M400 400 ${i * 120 - 140} 0H${i * 120 + 220}Z" fill="${c(i)}"/><path d="M400 400 ${i * 120 - 140} 800H${i * 120 + 220}Z" fill="${c(i + 2)}"/>`,
      ).join("");
      break;
    case 2:
      shapes = Array.from(
        { length: 7 },
        (_, i) =>
          `<rect x="${i * 57}" y="${i * 57}" width="${800 - i * 95}" height="${800 - i * 95}" rx="${reverse ? 90 : 0}" fill="${c(i)}"/>`,
      ).join("");
      break;
    case 3:
      shapes = Array.from(
        { length: 18 },
        (_, i) =>
          `<path d="M${i * 90 - 520} 0H${i * 90 - 474}L${i * 90 + 326} 800H${i * 90 + 280}Z" fill="${c(i)}"/>`,
      ).join("");
      break;
    case 4:
      shapes = Array.from(
        { length: 8 },
        (_, i) =>
          `<path d="M0 ${i * 120 - 160}Q400 ${i * 120 + 110} 800 ${i * 120 - 30}V800H0Z" fill="${c(i)}"/>`,
      ).join("");
      break;
    default:
      shapes = Array.from(
        { length: 64 },
        (_, i) =>
          `<rect x="${(i % 8) * 100}" y="${Math.floor(i / 8) * 100}" width="100" height="100" fill="${c((i * 7 + Math.floor(i / 8)) % 5)}"/><circle cx="${(i % 8) * 100 + 50}" cy="${Math.floor(i / 8) * 100 + 50}" r="${reverse ? 34 : 18}" fill="${c(i + 2)}"/>`,
      ).join("");
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><rect width="800" height="800" fill="${hex}"/>${shapes}</svg>`;
}
