"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Brand } from "@/components/brand";
import { PageClose } from "@/components/page-close";
import { CostsBar } from "@/components/costs-bar";
import { colorLink, normalizeHex } from "@/lib/colors";
import { cleanIdentity, patronHandle, PLATFORMS, validIdentity } from "@/lib/patrons";
import { SITE } from "@/lib/site";
import type { Adoption, NamedColor, PatronPlatform } from "@/types/color";
import { useColorCatalog } from "../use-color-catalog";
import { AdoptionCard } from "./adoption-card";

interface Props {
  initialColor: NamedColor;
  initialSlug: string;
  adoptions: Readonly<Record<string, Adoption>>;
  children: ReactNode;
}

export function AdoptionExperience({ initialColor, initialSlug, adoptions, children }: Props) {
  const catalog = useColorCatalog();
  const [color, setColor] = useState(initialColor);
  const [platform, setPlatform] = useState<PatronPlatform>("name");
  const [typed, setTyped] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const resolvedHash = useRef(false);
  const slug = catalog.slugs.get(color.name) || initialSlug;
  const patron = adoptions[slug];
  const taken = Boolean(patron && patron.amount >= SITE.adoptionMinimum);
  const identity = cleanIdentity(typed, platform);
  const valid = validIdentity(identity, platform);
  const raised = Object.values(adoptions).reduce((sum, entry) => sum + entry.amount, 0);
  const checkout = `${SITE.original}/adopt/?name=${encodeURIComponent(color.name)}`;

  useEffect(() => {
    if (!catalog.colors.length || resolvedHash.current) return;
    resolvedHash.current = true;
    const hex = normalizeHex(window.location.hash.slice(1));
    if (hex) {
      const selected = catalog.nearest(hex);
      if (selected) queueMicrotask(() => setColor(selected));
    }
  }, [catalog]);

  useEffect(() => {
    document.title = `${taken ? `${color.name} is adopted` : `Adopt ${color.name}`} — Color Names`;
  }, [color.name, taken]);

  function pick(value: string) {
    const hex = normalizeHex(value);
    const selected = hex && catalog.nearest(hex);
    if (!selected) return;
    setColor(selected);
    window.history.replaceState(window.history.state, "", `/adopt/#${selected.hex.slice(1)}`);
  }

  return (
    <div data-page="adopt">
      <main className="color-page" id="main-content">
        <section
          className="slide slide--invert hero color-hero adopt"
          style={{ "--page-color": color.hex, "--c": color.hex } as CSSProperties}
        >
          <Brand className="color-hero__home" />
          <PageClose href={colorLink(slug)} />
          <AdoptionCard
            color={color}
            patron={taken ? patron : undefined}
            previewName={valid ? patronHandle({ by: identity, on: platform }) : undefined}
          />
          <div className="hero__content">
            <h1 className="hero__title" aria-live="polite">
              {taken ? `${color.name} is adopted.` : `Adopt ${color.name}.`}
            </h1>
            <div className="color-hero__intro">
              <p className="lead">
                {taken
                  ? `${patronHandle(patron)} adopted it on ${new Date(`${patron.at}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}. Every color has one adopter: pick another one.`
                  : `Be the one and only patron of ${color.name}: every color can be adopted just once. It keeps the list, its API and these pages running for everyone.`}
              </p>
            </div>
            <p className="hero__stats">
              <span>3,075 stars on GitHub</span>
              <span>2.4 million npm downloads a year</span>
              <span>Millions of API requests</span>
            </p>
            {!taken && (
              <>
                <ul className="adopt__tiers">
                  <li>
                    <b>$5+</b>
                    <span>
                      your name and picture on <span className="adopt__named">{color.name}</span>, with the{" "}
                      <a href="/supporters/">supporters</a> and in the{" "}
                      <a href={`${SITE.repository}#sponsors`} target="_blank" rel="noopener noreferrer">
                        README
                      </a>
                    </span>
                  </li>
                  <li>
                    <b>$10+</b>
                    <span>
                      its card turns <i className="adopt__holo">holographic</i>, in one of eight foils drawn
                      for you
                    </span>
                  </li>
                </ul>
                <CostsBar raised={raised} link className="adopt__costs" />
              </>
            )}
            <div className="adopt__pick" style={{ "--picked": color.hex } as CSSProperties}>
              <label className="label adopt__pick-label" htmlFor="adopt-picker">
                Pick a color
              </label>
              <label className="adopt__pill" title="Pick a color">
                <span className="wall__picker adopt__wheel">
                  <input
                    type="color"
                    id="adopt-picker"
                    value={color.hex}
                    onChange={(event) => pick(event.target.value)}
                    aria-label="Pick a color to adopt"
                    disabled={!catalog.colors.length}
                  />
                </span>
                <span className="adopt__pick-name">{color.name}</span>
              </label>
              {catalog.error && (
                <p role="alert" className="adopt__note">
                  The color list couldn’t load. Reload to choose another color.
                </p>
              )}
            </div>
            {!taken && (
              <form
                className="adopt__who"
                onSubmit={(event) => {
                  event.preventDefault();
                  // The checkout is on the external, original Color Names service.
                  // eslint-disable-next-line @next/next/no-location-assign-relative-destination
                  if (valid) window.location.assign(checkout);
                  else input.current?.focus();
                }}
              >
                <label className="label" htmlFor="adopt-by">
                  Show me as
                </label>
                <div className="adopt__who-row">
                  <select
                    value={platform}
                    onChange={(event) => setPlatform(event.target.value as PatronPlatform)}
                    aria-label="Where you're known"
                  >
                    {PLATFORMS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {platform !== "anonymous" && (
                    <span className="adopt__by">
                      <input
                        ref={input}
                        id="adopt-by"
                        value={typed}
                        onChange={(event) => setTyped(event.target.value)}
                        maxLength={80}
                        autoComplete="off"
                        spellCheck={false}
                        placeholder={
                          platform === "name"
                            ? "Your name"
                            : platform === "website"
                              ? "example.com"
                              : "@handle"
                        }
                        aria-describedby="adoption-note"
                        aria-invalid={Boolean(typed && !valid)}
                      />
                    </span>
                  )}
                </div>
                {typed && !valid && (
                  <p className="adopt__note" role="status">
                    {platform === "website"
                      ? "Enter a website address, like example.com."
                      : "Check your name or handle."}
                  </p>
                )}
                <p className="adopt__note" id="adoption-note">
                  Shown on the color and listed on the{" "}
                  <a href="/supporters/" target="_blank" rel="noopener noreferrer">
                    supporters page
                  </a>
                  . A gift? Put in their handle: the color is theirs.
                </p>
              </form>
            )}
            <p className="adopt__act">
              <a
                className="adopt__cta"
                href={taken ? "/supporters/" : checkout}
                aria-disabled={!taken && !valid}
                onClick={(event) => {
                  if (!taken && !valid) {
                    event.preventDefault();
                    input.current?.focus();
                  }
                }}
              >
                {taken ? (
                  "See the supporters"
                ) : (
                  <>
                    Adopt {color.name}
                    <svg className="hero__heart" viewBox="0 1 24 22" aria-hidden="true">
                      <path d="M12 21.35 10.55 20C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z" />
                    </svg>
                  </>
                )}
              </a>
              {!taken && <span className="adopt__note">From $5. Continue on Color Names to pay.</span>}
            </p>
            <p className="adopt__legal">
              <a href="/legal/#adopting">How adopting works, refunds and privacy</a>
            </p>
          </div>
        </section>
        {children}
      </main>
    </div>
  );
}
