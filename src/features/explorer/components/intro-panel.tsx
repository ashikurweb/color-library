export function IntroPanel() {
  return (
    <aside className="wall__intro" data-intro="" hidden>
      <div className="wall__intro-card">
        <button type="button" className="wall__intro-x" data-intro-x="" aria-label="Close">
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
          </svg>
        </button>
        <div className="wall__intro-about">
          <p className="wall__intro-title">
            <span data-count="">{"31,993"}</span>
            {" colors, named by people."}
          </p>
          <p>
            {
              " Color Names is an open, community-grown collection of unique, human-authored color names. Free to use under the MIT license, available as an npm package or through the API. "
            }
          </p>
        </div>
        <details className="wall__intro-adopt">
          <summary className="label wall__intro-stat" data-adopted-count="">
            {"Support the list"}
          </summary>
          <p>
            <b>{"Adopt a color to support my work."}</b>
            {" Pick your favourite, open it and hit "}
            <i>{"Adopt this color"}</i>
            {": from $5, with your name on it for good. Each color can be adopted only once. "}
          </p>
        </details>
      </div>
      <div className="wall__intro-links">
        <a className="wall__intro-cta" href="/adopt/">
          {"Adopt a color"}
        </a>
        <button type="button" data-intro-close="">
          {"Got it"}
        </button>
      </div>
    </aside>
  );
}
