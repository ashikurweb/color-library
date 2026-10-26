export function OrbitStage() {
  return (
    <>
      <div className="studio__stage" data-studio-stage="">
        <div className="studio__scene-aura" aria-hidden="true" />
        <div className="studio__scene-caption">
          <span className="studio__live-dot" aria-hidden="true" />
          <span data-model-label="">The color orbit</span>
          <span className="studio__caption-divider" aria-hidden="true" />
          <span>Drag to rotate</span>
          <button
            className="studio__pause"
            type="button"
            data-motion-pause=""
            aria-label="Pause color rotation"
            aria-pressed="false"
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path className="studio__pause-bars" d="M7 5v10M13 5v10" />
              <path className="studio__play-triangle" d="m7 5 8 5-8 5z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="studio__edition" aria-hidden="true">
        AN OPEN WORLD OF COLOR
      </div>
    </>
  );
}
