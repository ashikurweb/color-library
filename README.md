# Color Names

A faithful recreation of [names.color.pizza](https://names.color.pizza/), built with **Next.js 16.4.3**, **React 19.3.1**, **TypeScript**, and **Tailwind CSS 4.3.3**. These were the latest stable versions resolved from npm when this project was created.

The original MIT-licensed renderer is adapted behind a typed React lifecycle boundary. The app renders actual interactive color spaces; it does not embed the original website.

## Run locally

Use Node.js 22.14 or later.

```sh
npm ci
npm run dev
```

Open **http://localhost:3000**. If that port is busy, Next.js prints the port it selected.

```sh
npm run build
npm start
```

For a deployment, copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the site's public origin. No API key is needed to explore colors.

## Included

- All **31,993** named colors, with exact-name, partial-name, and hex search.
- Interactive RGB, OKLab, OKLCH, and HSL spaces; drag, zoom, touch, and keyboard navigation.
- Swatches, Voronoi cells, and pixel-art views, plus a virtualized A–Z list.
- Full, Best of, Short, and Adopted collections.
- Animated color-page overlays, direct color URLs, browser history, and saved view state.
- Canonical hex-to-name redirects, page metadata, and a sitemap covering every named color.
- Color formats with copy actions, descriptions, mixing diagrams, related colors, complements, and ramps.
- Artwork galleries, image dialogs, palettes, and original image credits.
- Adoption previews with holographic cards, a color picker, identity validation, and already-adopted states.
- The complete supporter snapshot, legal page, and custom color-themed 404.
- Responsive desktop/mobile layouts, local fonts, local logo assets, and local overview sprite sheets.

## Code structure

```text
src/
  app/                    Next.js routes, metadata, error states, and HTTP handlers
    color/[slug]/         Individual named-color pages
    api/colors/[slug]/    Cached, validated color-page data
    media/[...segments]/  Restricted gateway to the original media host
  components/             Shared brand, swatch, avatar, and lifecycle boundary
  features/
    explorer/             Search, toolbar, introduction, and view controls
    color-detail/         Hero, gallery, formats, related colors, and footer
    adoption/             React form, catalog hook, card preview, and related projects
    supporters/           Patron rows and project running costs
    legal/                Legal page markup
  lib/                    Typed color, identity, configuration, and lifecycle utilities
    server/               Server-only catalog and editorial-data repository
  types/                  Shared color and patron contracts
  styles/                 Original design tokens and reference styles
  vendor/color-names/     Attributed MIT rendering code and workers
public/
  data/                   Pinned color, description, and supporter snapshots
  fonts/                  Local Inter variable font and its license
  media/pixel-atlas/      All eight overview sprite sheets
  logo/                   Original logo assets
```

Read [docs/architecture.md](docs/architecture.md) before changing the renderer's DOM contract.

Verified production previews: [desktop](docs/screenshots/desktop.png), [mobile](docs/screenshots/mobile.png), [color detail](docs/screenshots/color-detail.png), [adoption](docs/screenshots/adoption.png), and [supporters](docs/screenshots/supporters.png).

## Data and service boundaries

The catalog, curated lists, descriptions, supporter snapshot, fonts, and pixel-art overview load from this project. The initial collection contains 31,993 names, 136 adopted colors, and 113 patrons, captured on October 25, 2026.

Extended editorial material, full-size pixel drawings, and gallery images use the original public services. Editorial requests are cached and fall back to the local catalog when unavailable. `/media/` only forwards approved paths to `media.color.pizza`; it is not an arbitrary URL proxy.

**Payments are not processed by this clone.** The adoption form previews an identity and hands off to the original Color Names adoption page. Checkout, ownership changes, refunds, certificate issuance, and live patron updates belong to that service. The identity is a local preview and is not submitted or persisted by this app. A separate authorized payment backend would be needed to make those operations native to a deployed copy.

The graphics views need WebGL 2 and a current browser. Gallery media needs an internet connection. Local preferences are stored in browser storage; the original analytics script is omitted.

## Checks

```sh
npm run check           # ESLint and strict TypeScript
npm run format:check    # Formatting for first-party source
npm test                # Catalog, slug, safe JSON, and identity contracts
npm run test:e2e        # Browser tests; starts a separate dev server on port 3100
```

Install the test browser once with `npx playwright install chromium`. To use an existing Chrome installation or server:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/google-chrome \
E2E_BASE_URL=http://localhost:3000 npm run test:e2e
```

The 19 browser tests check search, hex entry, model/list selection, A–Z navigation, pixel-art assets, Voronoi initialization, random selection, overlay history, mobile controls, direct color pages, copying, artwork dialogs, supporters, adoption validation, canonical redirects, and 404/API behavior. They fail on uncaught browser errors and retain traces and screenshots for failures. Four unit tests check every catalog slug, pasted hex input, safe embedded JSON, and identity validation.

## Attribution

Original website and color list by **David Aerne / Elastiq GmbH and contributors**. Their MIT-licensed work and original visual assets are retained with attribution. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) and [LICENSE](LICENSE).
