# Ashikur Colors

An interactive color atlas by **[Ashikur Rahman](https://github.com/ashikurweb)**. Explore 31,993 named colors, compare palettes, and create personalized color cards.

Built with **Next.js 16.4.3**, **React 19.3.1**, **TypeScript**, **Tailwind CSS 4.3.3**, **GSAP 3.15.0**, and instanced **WebGL 2**.

## Run locally

Use Node.js 22.14 or later.

```sh
npm ci
npm run dev
```

Open **http://localhost:3000**. For production:

```sh
npm run build
npm start
```

Set `NEXT_PUBLIC_SITE_URL` in `.env.local` to your deployed origin. No API key or external content service is required.

## Features

- All **31,993** named colors, with exact-name, partial-name, and hex search.
- The actual **31,993-color 3D space opens directly on home**, beside the headline on desktop and above it on mobile. Drag, zoom, search, or switch models immediately.
- The original artistic **Orbit** layout plus RGB, OKLab, OKLCH, and HSL. Distant swatches have soft edges and directional lighting; close swatches retain their exact colors and readable labels.
- GSAP drives a continuous, gentle camera rotation, with pause/resume and a smooth handoff to dragging. The current angle is preserved when rotation stops. Reduced-motion preferences and hidden tabs pause automatic motion.
- GSAP line reveals, a gradual color-space entrance, animated model changes, and Flip transitions that move search out of the way. Home restores the introduction and the live color space.
- Swatches, Voronoi cells, pixel illustrations, and a virtualized A–Z list.
- Full, Best of, and Short collections with local JSON downloads.
- Animated detail overlays, direct color URLs, history restoration, and canonical hex redirects.
- Color formats, copy actions, descriptions, mixing diagrams, related colors, complements, and ramps.
- A local gallery of original geometric color studies, palettes, and image dialogs.
- Personalized card previews with holographic effects and **1080 × 1380 PNG downloads**.
- A fresh supporter page, accurate privacy information, local licenses, and a custom 404.
- Responsive layouts, locally bundled Inter, a custom geometric brand mark, and generated social previews.

## Structure

```text
src/
  app/                    Routes, metadata, image generation, and HTTP handlers
    color/[slug]/         Named-color pages
    api/colors/[slug]/    Local typed color-page data
    media/[...segments]/  Local color studies and cropped pixel illustrations
    license/              Project MIT license
    licenses/             Complete third-party notices
  components/             Shared brand, swatch, avatar, and runtime boundary
  features/               Explorer, color details, card designer, supporters, and legal UI
    explorer/motion.ts    Scoped GSAP timelines, Flip, and pointer interactions
    explorer/ambient-motion.ts  Scoped GSAP rotation of the existing color camera
    explorer/color-space.css   Hero typography and responsive color-space layout
    explorer/studio.css   Responsive studio shell and interaction states
    explorer/studio-controls.css  Search and color-explorer control styles
  lib/                    Typed data, color utilities, brand configuration, and runtime scope
    server/               Server-only catalog and local media generation
  types/                  Shared color and supporter contracts
  styles/                 Design tokens and adapted renderer styles
  vendor/color-engine/    Licensed rendering engine, GPU shaders, and workers
public/
  data/                   Local colors, descriptions, collections, and empty supporter registry
  fonts/                  Local Inter font and its license
  media/pixel-atlas/      Local illustration atlas and index
licenses/                 Retained licenses for included third-party work
```

See [docs/architecture.md](docs/architecture.md) for the React/runtime boundary. Production screenshots are in [docs/screenshots](docs/screenshots).

## Branding

Edit `src/lib/site.ts` for the site name, copyright owner, GitHub profile, and version. The geometric symbol is defined in `src/lib/brand.ts` and used by the header and holographic cards. Keep `public/favicon.svg` in sync when changing it. The Open Graph image uses the same brand configuration.

The package is `ashikur-colors`; the existing workspace directory is retained for convenience.

## Data, media, and privacy

All application data and media are served from this project. Color-page data never scrapes another website. Color studies are deterministic SVG compositions generated from the selected shade. Pixel images are cropped from the included 16-pixel atlas tiles and scaled to 64 pixels, preserving their pixel appearance. They do not fetch separate high-resolution images.

The supporter registry starts empty. No third-party patrons, fundraising totals, payment links, or operator details are presented as this project's own. Card creation is a free local download: it does not charge money, reserve a color, or publish the entered identity. Names stay on the user's device. The app does not load analytics.

Graphics views require WebGL 2 and a current browser. No payment provider is configured.

Orbit is an artistic layout. Choosing Voronoi from Orbit automatically switches to OKLab, which has the inverse mapping required by the cell renderer. Choosing Orbit again restores the swatch view.

## Checks

```sh
npm run check           # ESLint and strict TypeScript
npm run format:check    # First-party formatting
npm test                # Catalog, slugs, safe JSON, and identity validation
npm run test:e2e        # Browser suite; starts a server on port 3100
```

Install Chromium with `npx playwright install chromium`, or use an existing Chrome installation:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/google-chrome \
E2E_BASE_URL=http://localhost:3000 npm run test:e2e
```

The browser suite covers direct color-space rendering, model changes, drag interaction, actual rotation pause/resume, mobile spacing, home restoration, search relocation, Orbit/Voronoi transitions, reduced motion, models, views, history, mobile controls, color details, local galleries, PNG downloads, owner branding, local-only requests, API validation, and retained licenses. Unit tests also check the full catalog's Orbit coordinates and the hue seam.

## License

Original additions and branding: **Copyright © 2026 Ashikur Rahman**, under the [MIT license](LICENSE). Included third-party code, color data, fonts, and artwork retain their own notices. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) and [licenses/color-engine.MIT.txt](licenses/color-engine.MIT.txt). The project license does not transfer authorship of those components.
