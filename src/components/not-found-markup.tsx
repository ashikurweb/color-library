import { Brand } from "@/components/brand";
import { PageClose } from "@/components/page-close";

export function NotFoundMarkup() {
  return (
    <main className="color-page" id="main-content">
      <section className="slide slide--invert hero not-found" data-slide="">
        <Brand className="color-hero__home" />
        <PageClose />
        <svg className="not-found__wheel" viewBox="0 0 1000 1000" aria-hidden="true" data-wheel="">
          <defs data-wheel-defs=""></defs>
          <g data-wheel-names=""></g>
        </svg>
        <div className="not-found__content">
          <h1 className="not-found__hex">{"#404404"}</h1>
          <p className="not-found__lead" data-missing="" hidden></p>
          <p className="not-found__more">
            <a href="/">{"See all the colors"}</a>
          </p>
        </div>
      </section>
    </main>
  );
}
