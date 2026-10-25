# Third-party notices

This project recreates [Color Names](https://names.color.pizza/) in Next.js and React.

## Original site

The rendering algorithms, shaders, interaction controllers, reference styles, logo, and adapted page markup originate from [meodai/names.color.pizza](https://github.com/meodai/names.color.pizza), by David Aerne / Elastiq GmbH. Its README and package manifest license the site under MIT.

- Source revision: `dceb095204304e5dcc49cb217dce1c076fdce28f`
- Imported on: October 25, 2026
- Adapted source: `src/vendor/color-names/`
- Reference styles: `src/styles/reference.css`
- React adaptations: shared components and feature components under `src/`

The MIT copyright and permission notice is retained in [LICENSE](LICENSE).

## Color data

The 31,993 color names and curated selections originate from [meodai/color-names](https://github.com/meodai/color-names), licensed under MIT.

- Source revision: `c3f664acb027b2959fa9f74751e79d436c5363ee`
- Published list version at import: `14.80.0`
- Local snapshots: `public/data/`, `public/best-of.json`, and `public/added.json`

Descriptions and supporter information reproduce the original site's public snapshot. They describe the original project and its patrons.

## Font and artwork

Inter is distributed under the SIL Open Font License. Its license is retained at `public/fonts/OFL.txt`. The variable Latin font is served locally.

Pixel drawings and overview sprite sheets come from Color Names and are credited there to Retro Diffusion. The local sheets reproduce that overview; full-size drawings are requested through the media gateway.

Artwork, photographs, album covers, and other images retain their original authors' rights and licenses. The gallery and its image dialog preserve the source links and credits. Access to the original site does not change those licenses.

This recreation does not load the original site's Cloudflare analytics script. It does not impersonate a payment processor: the adoption flow links to the original Color Names service for checkout.
