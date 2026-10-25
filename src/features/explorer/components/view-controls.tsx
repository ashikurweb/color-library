export function ViewControls() {
  return (
    <div className="wall__zoom">
      <button type="button" data-home="" aria-label="Show the whole space">
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="10" cy="10" r="6.5" fill="none" stroke="currentColor" strokeWidth="2"></circle>
          <circle cx="10" cy="10" r="2" fill="currentColor"></circle>
        </svg>
      </button>
      <div className="wall__modes" data-modes="">
        <div
          className="wall__mode-list"
          role="radiogroup"
          aria-label="How the space shows its names"
          data-mode-list=""
        >
          <i className="wall__mode-thumb" aria-hidden="true"></i>
          <button
            type="button"
            role="radio"
            aria-checked="true"
            data-mode="colors"
            data-name="Swatches"
            aria-label="Colors"
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
                <rect x="4.5" y="3" width="11" height="14" rx="1"></rect>
                <path d="M4.5 12.5h11"></path>
              </g>
            </svg>
          </button>
          <button
            type="button"
            role="radio"
            aria-checked="false"
            data-mode="cells"
            data-name="Voronoi"
            aria-label="Each name’s part of the space"
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="10" cy="10" r="7"></circle>
                <path d="M10 3v7l6.58 2.39M10 10H3"></path>
              </g>
            </svg>
          </button>
          <button
            type="button"
            role="radio"
            aria-checked="false"
            data-mode="pixel"
            data-name="Pixelart"
            aria-label="Each color’s pixel art"
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
                <path d="M3 5.33h14V10h-4.67v4.67H7.67V10H3z"></path>
                <path d="M7.67 5.33V10M12.33 5.33V10M7.67 10h4.66"></path>
              </g>
            </svg>
          </button>
          <span className="wall__mode-name" aria-hidden="true"></span>
        </div>
        <span className="wall__mode-hint" data-mode-hint="" hidden>
          {"View"}
        </span>
      </div>
    </div>
  );
}
