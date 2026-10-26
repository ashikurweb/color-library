export function ExplorerHero() {
  return (
    <section className="studio__hero" data-studio-hero="" aria-labelledby="explorer-title">
      <p className="studio__eyebrow" data-reveal="">
        <span className="studio__eyebrow-dot" aria-hidden="true" />A SPACE FOR THE UNEXPECTED
      </p>
      <h1 className="studio__title" id="explorer-title" aria-label="Color, in motion.">
        <span className="studio__title-line" aria-hidden="true">
          <span data-title-line="">Color,</span>
        </span>{" "}
        <span className="studio__title-line studio__title-line--light" aria-hidden="true">
          <span data-title-line="">in motion.</span>
        </span>
      </h1>
      <p className="studio__description" data-reveal="">
        Explore <span data-count="">31,993</span> named colors.
        <br />
        Drag, zoom, and find your next idea.
      </p>
      <div className="studio__search-slot" data-search-slot="" aria-hidden="true" />
      <div className="studio__actions" data-reveal="">
        <button className="studio__discover" type="button" data-discover="">
          Surprise me <span aria-hidden="true">⤨</span>
        </button>
      </div>
    </section>
  );
}
