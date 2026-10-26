# Architecture

## Rendering and ownership

Next.js App Router owns routes, metadata, server data, and HTTP handlers. Feature components compose the explorer, color details, card designer, and legal pages. Shared contracts live in `src/types/color.ts`.

The explorer and color-detail markup are React server components. `RuntimeBoundary` dynamically imports the browser engine after hydration. Its camera, shaders, and per-frame state stay within the engine rather than causing React renders on every frame.

The original MIT copyright and permission notice for adapted code is retained in `licenses/color-engine.MIT.txt`, with provenance in `THIRD_PARTY_NOTICES.md`. The product brand and new application features belong to Ashikur Rahman.

## DOM contract and lifecycle

The `data-*` attributes are the interface between React markup and the engine. React owns the surrounding shell, and the engine owns the mutable subtree. Rename attributes only alongside their controllers.

Native links preserve document transitions and view restoration. The explorer creates temporary detail overlays and manages browser history. `RuntimeScope` owns listeners, animation frames, timers, observers, workers, and WebGL contexts, then releases them on unmount. Dynamic imports check cancellation before initialization so React Strict Mode remains safe.

Tailwind's theme and utilities are imported without Preflight. The adapted stylesheet relies on browser defaults for paragraph spacing and other elements.

## Studio and motion

The home shell lives under `features/explorer/`. Server components render the hero and controls around the existing instanced WebGL color canvas. The collection is interactive immediately on home. `studio.css` scopes the shell to `.studio`; `color-space.css` reserves space beside the headline on desktop and above it on mobile. `studio-controls.css` styles search and the model/view controls. Color-detail overlays retain their own color system.

`lib/orbit-layout.ts` maps hue, saturation, and lightness into the original torus independently of catalog order. Filtering a collection preserves every remaining color's position. The color engine draws all swatches in one call. Distant swatches have antialiased edges and directional lighting; close swatches retain their exact colors and labels. Pixel art uses its existing texture path.

`features/explorer/ambient-motion.ts` drives the existing camera through a continuous 32-second GSAP cycle. Each cycle begins from the current camera angle. Stopping rotation preserves that angle, so dragging takes control without a jump. The pause control, reduced-motion preference, and page visibility suspend the loop. GSAP requests frames from the engine's existing scheduler; it does not create a second renderer or animation-frame loop.

`features/explorer/motion.ts` owns line entrance timelines, Flip search relocation, and pointer interactions. A resize observer measures the hero, search slot, and scene center. The engine applies that offset to the camera used by both rendering and picking. Dragging, zooming, or selecting a color centers the view and makes the hidden introduction inert. Scientific models use the centered view; returning to Orbit restores the introduction.

The desktop model and view controls are available on home. The mobile menu provides the same controls; the search suggestions open upward to stay in the viewport. Each GSAP context, listener, observer, and GPU resource follows the runtime abort signal. Hidden tabs stop scheduling color frames. The artistic Orbit has no inverse color-space mapping, so Voronoi switches to OKLab before building its worker data; switching back to Orbit exits cells.

## Local content

The server repository indexes the local catalog by slug and hex. It computes stable collision-aware slugs once. Six named colors are prerendered; other known colors are generated and cached on demand. Unknown names never trigger a remote request.

The repository returns local descriptions, a same-origin generated gallery URL, and a same-origin pixel image URL. There is no upstream HTML parser, media proxy, or external checkout.

The media route accepts only validated paths for color-study lists, bounded SVG variants, and known-color pixel tiles. SVG geometry is generated from validated hex values. Sharp crops pixel tiles from the included local atlas. Arbitrary URLs and path traversal are rejected.

Gallery images are original geometric color studies, not museum photographs. The illustration atlas keeps its existing credits in the notices. Fonts and all downloadable color collections are local.

## Identity and card creation

`src/lib/site.ts` centralizes the displayed name, GitHub profile, and copyright owner. `src/lib/brand.ts` defines the shared geometric mark. The social preview is generated from those settings.

The card designer uses React state, with a small scoped binding for its holographic preview. Canvas text rendering creates PNG downloads without interpreting the name as HTML or SVG. Object URLs are released after the download. Identity data is not persisted or submitted.

`public/data/adopted.json` is an empty registry for this project. External supporters, amounts, and operator details are not imported. Adding paid adoption later requires a separately configured backend and accurate terms.

## Changes and verification

Keep route orchestration under `app/`, UI behavior under `features/`, and shared contracts under `types/`. Do not import server repositories into client components. Use lifecycle helpers for new imperative work. Run lint, TypeScript, unit tests, and the relevant browser tests after changing engine contracts.

Browser tests exercise actual controls, image dialogs, file downloads, branding, and local-only network requests. License endpoints are checked independently of product branding.
