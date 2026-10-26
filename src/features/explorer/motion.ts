import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

const MODEL_COPY: Record<string, [string, string, string]> = {
  orbit: ["01 / 05", "The color orbit", "Every shade, connected."],
  rgb: ["02 / 05", "Light, in three dimensions", "Red. Green. Blue. Every possibility."],
  oklab: ["03 / 05", "A matter of perception", "Color, as our eyes see it."],
  oklch: ["04 / 05", "Around the spectrum", "Lightness. Chroma. Hue."],
  hsl: ["05 / 05", "The shape of a shade", "Hue. Saturation. Lightness."],
};

interface MotionOptions {
  signal: AbortSignal;
  requestRender: () => void;
}

/** One GSAP context per mounted explorer. No global ticker or orphaned listeners. */
export function createExplorerMotion(root: HTMLElement, { signal, requestRender }: MotionOptions) {
  const hero = root.querySelector<HTMLElement>("[data-studio-hero]")!;
  const search = root.querySelector<HTMLElement>("[data-find]")!;
  const slot = root.querySelector<HTMLElement>("[data-search-slot]")!;
  const decoration = root.querySelector<HTMLElement>("[data-studio-stage]")!;
  const menu = root.querySelector<HTMLElement>("[data-menu]")!;
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  root.dataset.motion = preference.matches ? "reduced" : "full";
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  const stage = { presence: 1, parallaxX: 0, parallaxY: 0 };
  const context = gsap.context(() => {}, root);
  let entered = false;
  let engaged = false;
  let heroHidden = false;
  let currentModel = "";
  let placement: gsap.core.Timeline | undefined;

  function alignSearch() {
    // Measure the untransformed flow slot: text and locally loaded fonts can resize it.
    root.style.setProperty("--search-top", `${hero.offsetTop + slot.offsetTop}px`);
  }
  const resize = new ResizeObserver(alignSearch);
  resize.observe(hero);
  alignSearch();
  window.addEventListener(
    "resize",
    () => {
      placement?.progress(1);
      alignSearch();
      observeState();
    },
    { signal, passive: true },
  );

  function setEngaged(on: boolean) {
    const hideHero = on || (root.clientWidth <= 896 && menu.getAttribute("aria-expanded") === "true");
    hero.inert = hideHero;
    hero.setAttribute("aria-hidden", String(hideHero));
    if (heroHidden !== hideHero) {
      heroHidden = hideHero;
      context.add(() =>
        gsap.to(hero, {
          autoAlpha: hideHero ? 0 : 1,
          y: hideHero ? -18 : 0,
          duration: preference.matches ? 0 : 0.45,
          overwrite: true,
          ease: "power2.out",
        }),
      );
    }
    if (engaged === on) return;
    engaged = on;
    context.add(() => {
      placement?.progress(1);
      const before = Flip.getState(search);
      root.classList.toggle("is-engaged", on);
      placement = Flip.from(before, {
        duration: preference.matches ? 0 : 0.72,
        ease: "power3.inOut",
        prune: true,
      });
      gsap.to(decoration, {
        autoAlpha: on ? 0 : 1,
        duration: preference.matches ? 0 : 0.55,
        overwrite: "auto",
      });
      gsap.to(stage, {
        presence: on ? 0 : 1,
        duration: preference.matches ? 0 : 0.85,
        ease: "power3.inOut",
        overwrite: "auto",
        onUpdate: requestRender,
      });
    });
  }

  const observeState = () =>
    setEngaged(root.classList.contains("is-away") || root.classList.contains("is-az"));
  const stateObserver = new MutationObserver(observeState);
  stateObserver.observe(root, { attributes: true, attributeFilter: ["class"] });
  stateObserver.observe(menu, { attributes: true, attributeFilter: ["aria-expanded"] });

  context.add(() => {
    const moveX = gsap.quickTo(stage, "parallaxX", {
      duration: 1.3,
      ease: "power3.out",
      onUpdate: requestRender,
    });
    const moveY = gsap.quickTo(stage, "parallaxY", {
      duration: 1.3,
      ease: "power3.out",
      onUpdate: requestRender,
    });
    root.addEventListener(
      "pointermove",
      (event) => {
        if (preference.matches || !finePointer.matches || engaged || root.classList.contains("is-dragging"))
          return;
        moveX((event.clientX / root.clientWidth - 0.5) * 0.07);
        moveY((event.clientY / root.clientHeight - 0.5) * 0.045);
      },
      { signal, passive: true },
    );
    root.addEventListener(
      "pointerleave",
      () => {
        moveX(0);
        moveY(0);
      },
      { signal },
    );

    root.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((button) => {
      const xTo = gsap.quickTo(button, "x", { duration: 0.45, ease: "power3.out" });
      const yTo = gsap.quickTo(button, "y", { duration: 0.45, ease: "power3.out" });
      button.addEventListener(
        "pointermove",
        (event) => {
          if (preference.matches || !finePointer.matches) return;
          const rect = button.getBoundingClientRect();
          xTo((event.clientX - rect.left - rect.width / 2) * 0.075);
          yTo((event.clientY - rect.top - rect.height / 2) * 0.12);
        },
        { signal, passive: true },
      );
      button.addEventListener(
        "pointerleave",
        () => {
          xTo(0);
          yTo(0);
        },
        { signal },
      );
    });
  });

  function enter() {
    if (entered || signal.aborted) return;
    entered = true;
    root.dataset.motionReady = "true";
    observeState();
    if (preference.matches) return;
    context.add(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".wall__brand, .wall__nav, .studio__header-label",
          { opacity: 0, y: -12 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.07, clearProps: "all" },
          0,
        )
        .from("[data-title-line]", { yPercent: 115, rotation: 3, duration: 1.15, stagger: 0.12 }, 0.1)
        .from("[data-reveal]", { opacity: 0, y: 18, duration: 0.85, stagger: 0.1 }, 0.3)
        .from(search, { opacity: 0, duration: 0.8 }, 0.65)
        .fromTo(
          ".wall__dock, .studio__gestures, .studio__edition",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, clearProps: "all" },
          0.5,
        );
      gsap.fromTo(
        ".studio__orbits",
        { rotation: -9, scale: 0.92, opacity: 0 },
        {
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 1.8,
          ease: "power2.out",
        },
      );
    });
  }

  function setModel(key: string) {
    if (currentModel === key) return;
    currentModel = key;
    root.dataset.studioModel = key;
    const copy = MODEL_COPY[key] ?? MODEL_COPY.orbit;
    const fields = ["[data-model-index]", "[data-model-label]", "[data-model-note]"];
    fields.forEach((selector, index) => {
      const field = root.querySelector<HTMLElement>(selector);
      if (field) field.textContent = copy[index];
    });
    if (!entered || preference.matches) return;
    context.add(() => {
      gsap.fromTo(
        ".studio__model-caption > *",
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          overwrite: true,
          ease: "power2.out",
        },
      );
    });
  }

  preference.addEventListener(
    "change",
    () => {
      root.dataset.motion = preference.matches ? "reduced" : "full";
      if (!preference.matches) return;
      context.getTweens().forEach((tween: gsap.core.Tween) => tween.progress(1));
      Object.assign(stage, { parallaxX: 0, parallaxY: 0, presence: engaged ? 0 : 1 });
      requestRender();
    },
    { signal },
  );

  signal.addEventListener(
    "abort",
    () => {
      resize.disconnect();
      stateObserver.disconnect();
      context.revert();
      hero.inert = false;
      hero.removeAttribute("aria-hidden");
      root.classList.remove("is-engaged");
      root.style.removeProperty("--search-top");
      delete root.dataset.motionReady;
      delete root.dataset.motion;
      delete root.dataset.studioModel;
    },
    { once: true },
  );

  return { stage, enter, setModel };
}
