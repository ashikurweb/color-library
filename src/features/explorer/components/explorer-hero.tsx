export function ExplorerHero() {
  return (
    <section className="studio__hero" data-studio-hero="" aria-labelledby="explorer-title">
      <p className="studio__eyebrow" data-reveal="">
        <span className="studio__live-dot" aria-hidden="true" />
        <span data-count="">31,993</span> colors. Infinite possibilities.
      </p>
      <h1 className="studio__title" id="explorer-title">
        <span className="studio__title-line">
          <span data-title-line="">A universe</span>
        </span>
        <span className="studio__title-line">
          <span data-title-line="">
            of <em>color.</em>
            <i aria-hidden="true">✳</i>
          </span>
        </span>
      </h1>
      <p className="studio__description" data-reveal="">
        A little curiosity. A whole new spectrum.
        <br />
        Find the shade that feels like you.
      </p>
      <div className="studio__search-slot" data-search-slot="" aria-hidden="true" />
      <div className="studio__actions" data-reveal="">
        <button className="studio__discover" type="button" data-discover="" data-magnetic="">
          Surprise me <span aria-hidden="true">↗</span>
        </button>
        <button className="studio__browse" type="button" data-browse="">
          Browse all colors <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
