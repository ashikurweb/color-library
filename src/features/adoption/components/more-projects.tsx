import { SITE } from "@/lib/site";

const DESTINATIONS = [
  {
    name: "The color atlas",
    about: "Move through a world of named colors in RGB, OKLab, OKLCH, and HSL.",
    href: "/",
  },
  {
    name: "Browse A–Z",
    about: "Find the perfect name, from the familiar to the unexpected.",
    href: "/?view=az",
  },
  {
    name: "Pixel view",
    about: "Discover the atlas as a collection of tiny colorful illustrations.",
    href: "/?view=pixel",
  },
];

export function MoreProjects() {
  return (
    <footer className="slide adopt-more" data-adoption-more="">
      <h2 className="display">Keep exploring.</h2>
      <p className="lead adopt-more__about">
        A world of color, brought together by{" "}
        <a href={SITE.github} target="_blank" rel="noopener noreferrer">
          {SITE.name}
        </a>
        . Find a new shade, try a different view, or make another card.
      </p>
      <ul className="adopt-projects">
        {DESTINATIONS.map((item) => (
          <li key={item.name}>
            <a href={item.href}>{item.name}</a>
            <p>{item.about}</p>
          </li>
        ))}
      </ul>
      <nav className="footer__nav" aria-label="More">
        <a href="/">{SITE.name}</a>
        <a href={SITE.repository} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="/license/">License</a>
        <a href="/legal/">Legal</a>
      </nav>
    </footer>
  );
}
