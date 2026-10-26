import { SITE } from "@/lib/site";

export function DetailFooter() {
  return (
    <footer className="slide footer" id="share" data-slide="">
      <h2 className="display" data-outro="">
        {"Use it, share it."}
      </h2>
      <p className="lead footer__about">
        {` Explore color with ${SITE.name}. Find a shade, build a palette, and bring it into your next project. `}
      </p>
      <p className="footer__adopt" data-footer-adopt="" hidden>
        <a href="/adopt/">
          {"Create a color card "}
          <svg className="hero__heart" viewBox="0 1 24 22" aria-hidden="true">
            <path
              className="hero__heart-edge"
              d="M12 21.35 10.55 20C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"
            ></path>
            <path d="M12 21.35 10.55 20C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"></path>
          </svg>
        </a>
      </p>
      <nav className="footer__nav" aria-label="Project links">
        <a href="/">{SITE.name}</a>
        <a href="/supporters/">{"Supporters"}</a>
        <span className="footer__share">
          <a data-page-link="" href="/color/"></a>
          <button type="button" data-share="" aria-label="Share this color">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path
                d="M10 12.5V3M6.5 6.5 10 3l3.5 3.5M5.5 9.5H5a1 1 0 0 0-1 1V16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-5.5a1 1 0 0 0-1-1h-.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </span>
      </nav>
    </footer>
  );
}
