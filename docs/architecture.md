# Architecture

## Routing and rendering

Next.js App Router owns page composition, metadata, route validation, and the data/media endpoints. The route files compose feature components instead of mixing page markup with rendering algorithms. Shared contracts live in `src/types/color.ts`.

The explorer and color-detail markup are React server components. `RuntimeBoundary` imports their browser runtime after hydration, preserving useful server-rendered content on direct color URLs. It does not import browser-only modules into the server data layer.

The explorer has tens of thousands of cards and custom GPU shaders. Its camera and animation state stay inside the attributed rendering engine rather than triggering React renders on every frame. The reference CSS preserves its original geometry, typography, motion, and responsive behavior. Tailwind supplies application and recovery UI styles alongside those styles.

Tailwind's theme and utility layers are imported without Preflight. The reference design intentionally uses browser defaults for elements such as paragraphs; adding a reset would change its spacing.

## The DOM contract

The `data-*` attributes in explorer/detail components are an intentional adapter interface. The engine queries them to bind controls or update a color page. If an attribute is renamed or an element removed, update its controller at the same time.

Only one explorer or standalone detail runtime should own a document. The explorer can create its own transient detail overlay, as the original renderer does. React owns the surrounding shell; the runtime owns mutable content within that boundary. Keep React state out of a renderer-owned subtree unless the boundary is explicitly extended to support it.

Native links retain the source site's document-to-document card transitions and restoration behavior. The explorer's own animated overlay uses browser history. This is why the Next.js rule recommending `Link` is disabled with a documented reason; ordinary navigation still uses local Next.js routes.

## Resource lifetime

`RuntimeScope` explicitly tracks event listeners, animation frames, timers, observers, workers, and WebGL contexts. The adapted modules call these helpers directly; they do not monkey-patch browser APIs. The React boundary aborts and releases these resources on unmount. Dynamic imports check cancellation before initializing, including React Strict Mode's development remount.

The adoption form is React state and uses a smaller scoped binding for its holographic card. Preview identity state remains local to the page.

## Data

The server repository imports the pinned catalog and computes the original site's collision-aware slugs once. It rejects unknown slugs before contacting an upstream service. Six common colors are prerendered; other valid colors render and cache on demand.

Editorial enrichment is a bounded request to the matching original page. Only its structured color data is extracted, and the returned name and hex must match the local record. A timeout or upstream error returns the local description and catalog record. The gallery retains its artwork source credits.

The media handler validates path segments and a fixed category allowlist. Its upstream origin is fixed. It localizes media URLs within JSON responses so images and WebGL textures work consistently under localhost and a deployed origin.

The core catalog, fonts, and eight pixel overview sheets are local. Full-size media and extended encyclopedia content remain upstream dependencies. The source and snapshot revisions are recorded in `THIRD_PARTY_NOTICES.md`.

## Adding or changing features

- Put route orchestration and metadata under `app/`, behavior and UI under the relevant `features/` directory, and reusable contracts under `types/`.
- Keep imports of `lib/server/` out of client components. Load large catalogs on demand rather than embedding them in every React page payload.
- Preserve the shared slug rules so explorer links, color routes, adoptions, and gallery data refer to the same color.
- Use the runtime helpers for any new imperative event or animation work. A new GPU resource needs an explicit owner and cleanup.
- Extend browser coverage for a new user-visible interaction. The suite checks actual navigation and controls rather than snapshotting implementation details.
