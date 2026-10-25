export function Colophon() {
  return (
    <footer className="colophon" data-colophon="">
      <nav className="colophon__nav" aria-label="The list">
        <a href="https://github.com/meodai/color-names">
          {"GitHub"}
          <span data-version=""></span>
        </a>
        <a href="https://www.npmjs.com/package/color-name-list">{"npm"}</a>
        <a href="https://meodai.github.io/color-name-api/">{"API"}</a>
        <a href="https://github.com/meodai/color-names/blob/main/LICENSE">{"License"}</a>
        <a href="/legal/">{"Legal"}</a>
      </nav>
      <p className="colophon__color" data-colophon-color=""></p>
    </footer>
  );
}
