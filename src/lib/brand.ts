export const BRAND_SEGMENTS = [
  { d: "M32 32 32 2 58 17Z", color: "#f472b6" },
  { d: "M32 32 58 17 58 47Z", color: "#fb923c" },
  { d: "M32 32 58 47 32 62Z", color: "#facc15" },
  { d: "M32 32 32 62 6 47Z", color: "#4ade80" },
  { d: "M32 32 6 47 6 17Z", color: "#22d3ee" },
  { d: "M32 32 6 17 32 2Z", color: "#a78bfa" },
] as const;

/** One original geometric mark shared by the header, favicon, and holographic card. */
export const BRAND_SYMBOL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${BRAND_SEGMENTS.map(({ d, color }) => `<path d="${d}" fill="${color}"/>`).join("")}<circle cx="32" cy="32" r="8" fill="#fff"/></svg>`;
