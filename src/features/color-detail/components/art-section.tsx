export function ArtSection() {
  return (
    <section className="slide slide--dense color-art is-filling" id="art" data-slide="" data-art-slide="">
      <div className="gallery" data-art=""></div>
      <div className="art-settings" data-art-settings="">
        <button
          type="button"
          data-art-settings-open=""
          aria-haspopup="menu"
          aria-expanded="false"
          aria-label="How the pictures show"
          title="Settings"
        >
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M4 6h5M13 6h3M4 14h3M11 14h5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            ></path>
            <circle cx="11" cy="6" r="2" fill="none" stroke="currentColor" strokeWidth="1.8"></circle>
            <circle cx="9" cy="14" r="2" fill="none" stroke="currentColor" strokeWidth="1.8"></circle>
          </svg>
        </button>
        <div
          className="art-settings__menu"
          role="menu"
          aria-label="How the pictures show"
          data-art-settings-menu=""
          hidden
        >
          <button type="button" role="menuitemcheckbox" data-art-setting="plain" aria-checked="false">
            <span>{"Hide title"}</span>
            <small>{"only the pictures"}</small>
          </button>
          <button type="button" role="menuitemcheckbox" data-art-setting="palettes" aria-checked="false">
            <span>{"As palettes"}</span>
            <small>{"their colors"}</small>
          </button>
          <button
            type="button"
            role="menuitemcheckbox"
            className="art-settings__inset"
            data-art-setting="even"
            aria-checked="false"
          >
            <span>{"Same width"}</span>
            <small>{"a swatch each"}</small>
          </button>
          <button type="button" role="menuitemcheckbox" data-art-setting="animate" aria-checked="false">
            <span>{"Animate"}</span>
            <small>{"the rows drift"}</small>
          </button>
        </div>
      </div>
    </section>
  );
}
