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

The home shell lives under `features/explorer/`. Server components render the hero, controls, and orbital guides. `studio.css` scopes the new design to `.studio`, allowing color-detail overlays to retain their own color system.

`lib/orbit-layout.ts` maps hue, saturation, and lightness into an original torus independently of catalog order. Filtering a collection preserves every remaining color's position. The existing instanced WebGL renderer draws all swatches in one call; distant swatches become softly lit round particles, while close cards retain their exact colors and labels. No second canvas or 3D framework is required.

`features/explorer/motion.ts` owns a GSAP context with entrance timelines, Flip search relocation, magnetic controls, and pointer parallax. It measures the search's layout slot with a resize observer. The engine reads a small mutable stage object to offset the camera, keeping rendering and hit testing in the same coordinate space. Selecting or exploring a color centers the scene and makes the hidden introduction inert.

The runtime's abort signal disposes the GSAP context and its listeners and observers. Both GSAP and the camera observe reduced-motion preferences. The artistic Orbit has no inverse color-space mapping, so Voronoi switches to OKLab before building its worker data; switching back to Orbit exits cells.

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
