import { SITE } from "@/lib/site";

export function Colophon() {
  return (
    <footer className="colophon" data-colophon="">
      <nav className="colophon__nav" aria-label="The atlas">
        <a href="/">
          {SITE.name}
          <span data-version="" />
        </a>
        <a href={SITE.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="/data/colors.json" download>
          Color data
        </a>
        <a href="/license/">License</a>
        <a href="/legal/">Legal</a>
      </nav>
      <p className="colophon__color" data-colophon-color="" />
    </footer>
  );
}
