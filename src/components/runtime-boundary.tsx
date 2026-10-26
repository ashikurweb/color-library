"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { activateRuntime, RuntimeScope } from "@/lib/runtime-scope";

type RuntimeKind = "explorer" | "color" | "not-found";

/** React owns the shell; this boundary exclusively owns the renderer's mutable subtree. */
export function RuntimeBoundary({ kind, children }: { kind: RuntimeKind; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const scope = new RuntimeScope();
    activateRuntime(scope);
    const element = root.current;
    const bodyClass = kind === "explorer" ? "wall-page" : "color-page";
    document.body.classList.add(bodyClass);
    if (kind === "color") document.documentElement.classList.add("color-root");

    async function mount() {
      if (!element) return;
      if (kind === "explorer") {
        const { initWall } = await import("@/vendor/color-engine/wall.js");
        if (scope.signal.aborted) return;
        const wall = element.querySelector<HTMLElement>("[data-wall]");
        if (wall) await initWall(wall, scope.signal);
      } else if (kind === "color") {
        const { initDetailPage } = await import("@/vendor/color-engine/detail.js");
        if (!scope.signal.aborted) initDetailPage(element, { signal: scope.signal });
      } else {
        const { initNotFound } = await import("@/vendor/color-engine/not-found.js");
        if (!scope.signal.aborted) await initNotFound();
      }
    }

    mount().catch((cause: unknown) => {
      if (scope.signal.aborted) return;
      console.error(`Unable to initialize ${kind}`, cause);
      setError(true);
    });

    return () => {
      scope.dispose();
      document.body.classList.remove(bodyClass);
      document.documentElement.classList.remove("color-root", "is-arriving", "is-passed-on", "is-pixel");
      document.documentElement.style.removeProperty("--page-color");
    };
  }, [kind]);

  return (
    <div ref={root} data-page={kind} className="runtime-root">
      {children}
      {error && (
        <div role="alert" className="runtime-error rounded-2xl bg-white p-6 text-sm text-black shadow-xl">
          <p className="font-semibold">The color explorer couldn’t start.</p>
          <p className="mt-2">Reload to try again, or open a color directly.</p>
          <div className="mt-4 flex gap-4">
            <button className="underline underline-offset-4" onClick={() => window.location.reload()}>
              Reload
            </button>
            <a href="/color/rebecca-purple/" className="underline underline-offset-4">
              Explore a color
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
