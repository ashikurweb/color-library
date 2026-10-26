export function OrbitStage() {
  return (
    <>
      <div className="studio__ambient" aria-hidden="true" />
      <div className="studio__stage" data-studio-stage="" aria-hidden="true">
        <svg className="studio__orbits" viewBox="0 0 700 700" fill="none">
          <circle cx="350" cy="350" r="315" />
          <circle className="studio__orbit-dashed" cx="350" cy="350" r="327" />
          <ellipse cx="350" cy="350" rx="344" ry="125" transform="rotate(-32 350 350)" />
          <path d="M350 17v12M350 671v12M17 350h12M671 350h12" />
          <circle className="studio__orbit-point" cx="626" cy="198" r="3" />
          <circle className="studio__orbit-point" cx="74" cy="502" r="2" />
        </svg>
        <div className="studio__axis">
          <span>+</span>
          <span>DRAG TO EXPLORE</span>
        </div>
        <div className="studio__model-caption">
          <span className="studio__model-index" data-model-index="">
            01 / 05
          </span>
          <span className="studio__model-label" data-model-label="">
            The color orbit
          </span>
          <span className="studio__model-note" data-model-note="">
            Every shade, connected.
          </span>
        </div>
      </div>
      <div className="studio__edition" aria-hidden="true">
        AN EXPERIMENT IN COLOR <span>—</span> EST. 2026
      </div>
    </>
  );
}
