export function IntroPanel() {
  return (
    <aside className="wall__intro" data-intro="" hidden aria-label="How to explore">
      <div className="wall__intro-card">
        <button type="button" className="wall__intro-x" data-intro-x="" aria-label="Close">
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className="studio__intro-icon" aria-hidden="true">
          ✳
        </div>
        <div className="wall__intro-about">
          <p className="wall__intro-title">Follow your curiosity.</p>
          <p>Drag to turn the universe. Scroll to get closer. Click a color to make it yours.</p>
        </div>
        <span data-adopted-count="" hidden />
      </div>
      <div className="wall__intro-links">
        <span>YOUR NEXT IDEA STARTS HERE</span>
        <button type="button" data-intro-close="">
          Got it <span aria-hidden="true">↗</span>
        </button>
      </div>
    </aside>
  );
}
