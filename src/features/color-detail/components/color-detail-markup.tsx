import type { ColorPageData } from "@/types/color";
import { ColorHero } from "./color-hero";
import { ArtSection } from "./art-section";
import { ColorValuesSection } from "./color-values-section";
import { DetailFooter } from "./detail-footer";
import { Colophon } from "./colophon";

export function ColorDetailMarkup({ color }: { color?: ColorPageData }) {
  return (
    <main className="color-page" id="main-content">
      <ColorHero color={color} />
      <ArtSection />
      <ColorValuesSection />
      <section className="slide slide--dense is-filling" id="words" data-slide="" data-words-slide="">
        <h2 className="display color-words__title" data-words-title=""></h2>
        <div className="color-about" data-about=""></div>
        <dl className="color-specs color-specs--words" data-words=""></dl>
      </section>
      <section className="slide slide--dense is-filling" id="meaning" data-slide="" data-meaning-slide="">
        <h2 className="display color-meaning__title" data-meaning-title=""></h2>
        <div className="color-dictionary" data-dictionary=""></div>
        <div className="color-wiki" data-wiki="" aria-live="polite"></div>
      </section>
      <section className="slide slide--dense is-filling" id="neighbors" data-slide="" data-neighbors-slide="">
        <h2 className="display">{"Its neighbors."}</h2>
        <div className="neighbors" data-neighbors=""></div>
        <h2 className="display color-next" id="complements">
          {"Its complements."}
        </h2>
        <div className="neighbors neighbors--ramp" data-complements=""></div>
        <h2 className="display color-next" id="ramp">
          {"As a ramp."}
        </h2>
        <div className="neighbors neighbors--ramp" data-ramp=""></div>
      </section>
      <DetailFooter />
      <Colophon />
    </main>
  );
}
