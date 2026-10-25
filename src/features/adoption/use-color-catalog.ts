"use client";

import { useEffect, useMemo, useState } from "react";
import { converter } from "culori";
import { createColorSlugs } from "@/lib/colors";
import type { HexColor, NamedColor } from "@/types/color";

const toLab = converter("oklab");

export function useColorCatalog() {
  const [colors, setColors] = useState<readonly NamedColor[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/data/colors.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Color list unavailable");
        return response.json() as Promise<NamedColor[]>;
      })
      .then(setColors)
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      });
    return () => controller.abort();
  }, []);

  return useMemo(() => {
    const entries = colors.map((color) => ({ color, lab: toLab(color.hex)! }));
    const slugs = createColorSlugs(colors);
    return {
      colors,
      slugs,
      error,
      nearest(hex: HexColor): NamedColor | undefined {
        const target = toLab(hex)!;
        let distance = Infinity;
        let found: NamedColor | undefined;
        for (const { color, lab } of entries) {
          const next = (lab.l - target.l) ** 2 + (lab.a - target.a) ** 2 + (lab.b - target.b) ** 2;
          if (next < distance) {
            distance = next;
            found = color;
          }
        }
        return found;
      },
    };
  }, [colors, error]);
}
