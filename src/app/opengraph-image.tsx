import { ImageResponse } from "next/og";
import { BRAND_SEGMENTS } from "@/lib/brand";
import { COLOR_COUNT_LABEL, SITE } from "@/lib/site";

export const alt = `Explore a world of color by ${SITE.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#050505",
        color: "white",
        padding: 70,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 32 }}>
        <svg width="50" height="50" viewBox="0 0 64 64">
          {BRAND_SEGMENTS.map(({ d, color }) => (
            <path key={color} d={d} fill={color} />
          ))}
          <circle cx="32" cy="32" r="8" fill="white" />
        </svg>
        {SITE.name}
      </div>
      <div style={{ display: "flex", fontSize: 88, fontWeight: 700, letterSpacing: -4 }}>
        A world of color.
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        {BRAND_SEGMENTS.map(({ color }) => (
          <div key={color} style={{ height: 96, width: 164, background: color, borderRadius: 10 }} />
        ))}
      </div>
      <div style={{ display: "flex", fontSize: 25, color: "#bdbdbd" }}>
        {COLOR_COUNT_LABEL} colors · Explore. Discover. Create.
      </div>
    </div>,
    size,
  );
}
