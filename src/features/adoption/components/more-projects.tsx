import { PROJECTS } from "../projects";

export function MoreProjects() {
  return (
    <footer className="slide adopt-more" data-adoption-more="">
      <h2 className="display">Also kept going.</h2>
      <p className="lead adopt-more__about">
        Color Names is made by{" "}
        <a href="https://elastiq.ch/" target="_blank" rel="noopener noreferrer">
          David Aerne
        </a>{" "}
        in Zürich. Adopting a color also keeps David’s other open projects going: tools, libraries and
        experiments around color.
      </p>
      <ul className="adopt-projects">
        {PROJECTS.map((project) => (
          <li key={project.name}>
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              {project.name}
            </a>{" "}
            <small>{project.year}</small>
            <p>{project.about}</p>
          </li>
        ))}
      </ul>
      <nav className="footer__nav" aria-label="More">
        <a href="/">Color Names</a>
        <a href="/supporters/">Supporters</a>
        <a href="/legal/">Legal</a>
        <a href="https://elastiq.ch/" target="_blank" rel="noopener noreferrer">
          elastiq.ch
        </a>
      </nav>
    </footer>
  );
}
