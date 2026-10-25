export function ExplorerToolbar() {
  return (
    <header className="wall__bar">
      <form className="wall__find" data-find="" role="search" autoComplete="off">
        <label className="wall__picker" title="Pick a color">
          <input
            type="color"
            data-picker=""
            defaultValue="#dd2233"
            aria-label="Pick a color and go to its closest name"
          />
        </label>
        <input
          className="wall__search"
          type="search"
          data-search=""
          placeholder=" "
          aria-label="Find a color name or a hex code"
          spellCheck="false"
        />
        <span className="wall__hint" data-hint="" aria-hidden="true">
          {"Find a name, or paste a hex"}
        </span>
        <button
          type="button"
          className="wall__clear"
          data-clear=""
          aria-label="A random color"
          title="A random color"
        >
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <rect className="wall__face" x="2.5" y="2.5" width="15" height="15" rx="4" pathLength="1"></rect>
            <path className="wall__arm" d="M10 10L5.8 5.8" pathLength="1"></path>
            <path className="wall__arm" d="M10 10L14.2 5.8" pathLength="1"></path>
            <path className="wall__arm" d="M10 10L5.8 14.2" pathLength="1"></path>
            <path className="wall__arm" d="M10 10L14.2 14.2" pathLength="1"></path>
            <circle className="wall__pip wall__pip--middle" cx="10" cy="10" r="1.3"></circle>
            <circle className="wall__pip" cx="6.8" cy="6.8" r="1.3"></circle>
            <circle className="wall__pip" cx="13.2" cy="6.8" r="1.3"></circle>
            <circle className="wall__pip" cx="6.8" cy="13.2" r="1.3"></circle>
            <circle className="wall__pip" cx="13.2" cy="13.2" r="1.3"></circle>
          </svg>
        </button>
        <ul className="wall__results" data-results="" hidden></ul>
      </form>
      <nav className="wall__nav" aria-label="Project">
        <a href="https://github.com/meodai/color-names">
          {"GitHub"}
          <span data-version=""></span>
        </a>
        <button
          type="button"
          className="wall__help"
          data-intro-open=""
          aria-label="About Color Names"
          aria-expanded="false"
        >
          {" ? "}
        </button>
      </nav>
      <button type="button" className="wall__burger" data-menu="" aria-expanded="false" aria-label="Menu">
        <span></span>
        <span></span>
      </button>
    </header>
  );
}
