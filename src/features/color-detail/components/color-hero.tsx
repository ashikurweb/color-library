import { Brand } from "@/components/brand";
import { PageClose } from "@/components/page-close";
import { SwatchCard } from "@/components/swatch-card";
import type { ColorPageData } from "@/types/color";

export function ColorHero({ color }: { color?: ColorPageData }) {
  return (
    <section className="slide slide--invert hero color-hero" data-slide="">
      <Brand className="color-hero__home" />
      <PageClose />
      <div className="color-hero__card" data-place="">
        <SwatchCard color={color} />
      </div>

      <div className="hero__content">
        <h1 className="hero__title" data-name="">
          {color?.name}
        </h1>
        <div className="color-hero__intro" data-intro="">
          {color?.description && <p className="lead">{color.description}</p>}
        </div>
        <p className="hero__stats" data-stats="">
          {color && <span>{color.hex}</span>}
        </p>
      </div>
    </section>
  );
}
