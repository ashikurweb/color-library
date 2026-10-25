export function ExplorerDock() {
  return (
    <div className="wall__dock">
      <div className="wall__tabs">
        <div className="wall__models" role="group" aria-label="Color model" data-models=""></div>
      </div>
      <div className="wall__pick-list">
        <button
          type="button"
          data-lists=""
          aria-haspopup="menu"
          aria-expanded="false"
          aria-label="Choose a list of names"
          title="Lists"
        >
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <g fill="currentColor">
              <circle cx="4.5" cy="5.5" r="1.5"></circle>
              <circle cx="4.5" cy="10" r="1.5"></circle>
              <circle cx="4.5" cy="14.5" r="1.5"></circle>
            </g>
            <path
              d="M8.5 5.5H16M8.5 10H16M8.5 14.5H16"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            ></path>
          </svg>
        </button>
        <div className="wall__lists" role="menu" aria-label="Lists of names" data-list-menu="" hidden>
          <div className="wall__list" role="none">
            <button type="button" role="menuitemradio" data-list="default" aria-checked="true">
              <span>{"Full"}</span>
              <small>{"every name"}</small>
            </button>
            <a
              className="wall__list-file"
              href="https://unpkg.com/color-name-list/dist/colornames.json"
              target="_blank"
              rel="noopener"
              aria-label="The Full list as a JSON file"
              title="colornames.json"
            >
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path
                  d="M8 4H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3M11 4h5v5M16 4l-7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </a>
          </div>
          <div className="wall__list" role="none">
            <button type="button" role="menuitemradio" data-list="bestOf" aria-checked="false">
              <span>{"Best of"}</span>
              <small>{"hand-picked"}</small>
            </button>
            <a
              className="wall__list-file"
              href="https://unpkg.com/color-name-list/dist/colornames.bestof.json"
              target="_blank"
              rel="noopener"
              aria-label="The Best of list as a JSON file"
              title="colornames.bestof.json"
            >
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path
                  d="M8 4H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3M11 4h5v5M16 4l-7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </a>
          </div>
          <div className="wall__list" role="none">
            <button type="button" role="menuitemradio" data-list="short" aria-checked="false">
              <span>{"Short"}</span>
              <small>{"a word or two"}</small>
            </button>
            <a
              className="wall__list-file"
              href="https://unpkg.com/color-name-list/dist/colornames.short.json"
              target="_blank"
              rel="noopener"
              aria-label="The Short list as a JSON file"
              title="colornames.short.json"
            >
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path
                  d="M8 4H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3M11 4h5v5M16 4l-7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </a>
          </div>
          <div className="wall__list" role="none">
            <button type="button" role="menuitemradio" data-list="adopted" aria-checked="false">
              <span>{"Adopted"}</span>
              <small>{"by our patrons"}</small>
            </button>
            <a
              className="wall__list-file"
              href="/supporters/"
              aria-label="Who adopted them"
              title="Supporters"
            >
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path
                  d="M8 4H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3M11 4h5v5M16 4l-7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
