"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { converter, formatHex, wcagLuminance } from "culori";
import { Avatar } from "@/components/avatar";
import { SwatchCard } from "@/components/swatch-card";
import { activateRuntime, RuntimeScope } from "@/lib/runtime-scope";
import type { Adoption, NamedColor } from "@/types/color";

const toLab = converter("lab");
const shade = (hex: string, amount: number) => {
  const lab = toLab(hex)!;
  return formatHex({ ...lab, l: Math.max(0, Math.min(100, lab.l + amount)) });
};

export function AdoptionCard({
  color,
  patron,
  previewName,
}: {
  color: NamedColor;
  patron?: Adoption;
  previewName?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scope = new RuntimeScope();
    activateRuntime(scope);
    let stop: (() => void) | undefined;
    const card = root.current?.querySelector<HTMLElement>("[data-card]");
    if (card) {
      const dark = wcagLuminance(color.hex) < 0.5;
      card.style.setProperty("--c-shade0", shade(color.hex, dark ? 25 : -25));
      card.style.setProperty("--c-shade1", shade(color.hex, dark ? 12 : -12));
      import("@/vendor/color-engine/tilt.js").then(({ tiltCard }) => {
        if (scope.signal.aborted) return;
        const tilt = tiltCard(card);
        tilt.holo(patron?.shine || "prism");
        stop = () => tilt.stop();
      });
    }
    const footer = document.querySelector("[data-adoption-more]");
    const observer = new IntersectionObserver(
      ([entry]) => root.current?.classList.toggle("is-away", entry.isIntersecting),
      { threshold: 0.05 },
    );
    if (footer) observer.observe(footer);
    return () => {
      stop?.();
      observer.disconnect();
      scope.dispose();
    };
  }, [color.hex, patron?.shine]);

  return (
    <div
      ref={root}
      className="color-hero__card is-placed"
      style={{ "--x": 0.76, "--y": 0, "--r": "-3deg" } as CSSProperties}
    >
      <SwatchCard color={color} visible />
      {(patron || previewName) && (
        <span
          className={`card-badge${patron?.founding ? " card-badge--founding" : ""}`}
          title={patron?.by || previewName}
        >
          <Avatar
            key={patron?.avatar || previewName}
            src={patron?.avatar}
            name={patron?.by || previewName || ""}
            anonymous={patron?.on === "anonymous"}
          />
        </span>
      )}
    </div>
  );
}
