# Third-party notices

Ashikur Colors contains the following third-party materials. Original additions, application branding, local color-study generators, and card exports are Copyright (c) 2026 Ashikur Rahman under the root MIT license. That license does not replace the notices below.

## Rendering engine and adapted design

The rendering algorithms, shaders, interaction controllers, adapted stylesheet, and portions of page structure derive from [meodai/names.color.pizza](https://github.com/meodai/names.color.pizza), by David Aerne / Elastiq GmbH, distributed under MIT.

- Source revision: `dceb095204304e5dcc49cb217dce1c076fdce28f`
- Imported: October 25, 2026
- Adapted source: `src/vendor/color-engine/`, `src/styles/reference.css`, and relevant React markup under `src/`
- Full retained copyright and permission notice: [licenses/color-engine.MIT.txt](licenses/color-engine.MIT.txt)

The original mascot, project branding, operator contact details, external checkout, fundraising claims, and supporter snapshot are not used in this version.

## Color catalog and descriptions

The 31,993 color names and curated selections originate from [meodai/color-names](https://github.com/meodai/color-names), distributed under MIT.

- Source revision: `c3f664acb027b2959fa9f74751e79d436c5363ee`
- Dataset version: `14.80.0`
- Local copies: `public/data/colors.json`, `public/best-of.json`, and derived collection downloads
- Descriptions: the public catalog description snapshot imported on October 25, 2026
- Copyright and permission notice: [licenses/color-engine.MIT.txt](licenses/color-engine.MIT.txt)

## Typefaces

Inter is Copyright (c) 2016 The Inter Project Authors and is distributed under the SIL Open Font License. The complete notice is retained at `public/fonts/OFL.txt`.

## Animation

GSAP 3.15.0 and its Flip plugin are Copyright (c) 2008-2026 GreenSock and use the [GSAP Standard "no charge" license](https://gsap.com/standard-license), not the application's MIT license. The package's copyright headers are retained; see also `licenses/gsap.NOTICE.txt`.

## Pixel illustrations

The included pixel atlas was obtained from Color Names and is credited there to Retro Diffusion. The atlas and derived pixel crops retain that provenance; they are not claimed as original artwork by Ashikur Rahman. No remote image service is used. The newly generated geometric color studies are separate original compositions.

## Dependencies

Installed dependencies retain their package licenses and copyright notices. These include Next.js, React, Tailwind CSS, Culori, color-description, dittotones, and Sharp. Build and test tooling also retains its own notices.

The `/licenses/` endpoint serves these notices together with the complete retained engine MIT license, the Inter font license, and the GSAP notice.
