import { gsap } from "gsap";

interface CameraRotation {
  yaw: number;
  pitch: number;
}

/** Moves the existing color camera; stopping preserves the user's current angle. */
export function createAmbientMotion(
  root: HTMLElement,
  camera: CameraRotation,
  signal: AbortSignal,
  requestRender: () => void,
) {
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  const button = root.querySelector<HTMLButtonElement>("[data-motion-pause]")!;
  const context = gsap.context(() => {});
  const phase = { value: 0 };
  let wanted = false;
  let paused = false;
  let loop: gsap.core.Tween | undefined;

  function sync() {
    const running = wanted && !paused && !preference.matches && !document.hidden;
    if (running) loop?.play();
    else loop?.pause();
    root.dataset.rotation = running ? "playing" : "paused";
  }

  button.addEventListener(
    "click",
    () => {
      paused = !paused;
      button.setAttribute("aria-pressed", String(paused));
      button.setAttribute("aria-label", paused ? "Resume color rotation" : "Pause color rotation");
      sync();
    },
    { signal },
  );
  preference.addEventListener("change", sync, { signal });
  document.addEventListener("visibilitychange", sync, { signal });
  signal.addEventListener(
    "abort",
    () => {
      context.revert();
      delete root.dataset.rotation;
    },
    { once: true },
  );

  return {
    start() {
      loop?.kill();
      phase.value = 0;
      const { yaw, pitch } = camera;
      wanted = true;
      context.add(() => {
        loop = gsap.to(phase, {
          value: Math.PI * 2,
          duration: 32,
          repeat: -1,
          paused: true,
          ease: "none",
          onUpdate() {
            camera.yaw = yaw + Math.sin(phase.value) * 0.24;
            camera.pitch = pitch + Math.sin(phase.value * 2) * 0.065;
            requestRender();
          },
        });
      });
      sync();
    },
    stop() {
      wanted = false;
      loop?.kill();
      loop = undefined;
      sync();
    },
  };
}
