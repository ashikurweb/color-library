import { Brand } from "@/components/brand";
import { ExplorerToolbar } from "./explorer-toolbar";
import { IntroPanel } from "./intro-panel";
import { ExplorerDock } from "./explorer-dock";
import { ViewControls } from "./view-controls";
import { ExplorerHero } from "./explorer-hero";
import { OrbitStage } from "./orbit-stage";

export function ExplorerMarkup() {
  return (
    <main className="wall studio is-opening" data-wall="" id="main-content" aria-busy="true">
      <OrbitStage />
      <Brand className="wall__brand" />
      <canvas className="wall__canvas" data-canvas="" aria-hidden="true"></canvas>
      <div className="wall__labels" data-labels="" aria-hidden="true"></div>
      <div className="wall__mark" data-mark="" hidden></div>
      <div className="wall__tip" data-tip="" hidden></div>
      <ExplorerHero />
      <ExplorerToolbar />
      <div className="wall__corner">
        <p className="wall__status" data-status="" aria-live="polite">
          {"Loading the names…"}
        </p>
      </div>
      <IntroPanel />
      <ExplorerDock />
      <ViewControls />
      <div className="studio__gestures" aria-hidden="true">
        <span className="studio__gesture-icon">↔</span> Drag to orbit <i /> Scroll to dive in
      </div>
    </main>
  );
}
