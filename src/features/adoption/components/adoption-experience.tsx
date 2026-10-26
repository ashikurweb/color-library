"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Brand } from "@/components/brand";
import { PageClose } from "@/components/page-close";
import { colorLink, normalizeHex } from "@/lib/colors";
import { cleanIdentity, patronHandle, PLATFORMS, validIdentity } from "@/lib/patrons";
import { SITE, COLOR_COUNT_LABEL } from "@/lib/site";
import type { NamedColor, PatronPlatform } from "@/types/color";
import { useColorCatalog } from "../use-color-catalog";
import { downloadColorCard } from "../download-card";
import { AdoptionCard } from "./adoption-card";

interface Props {
  initialColor: NamedColor;
  initialSlug: string;
  children: ReactNode;
}

export function AdoptionExperience({ initialColor, initialSlug, children }: Props) {
  const catalog = useColorCatalog();
  const [color, setColor] = useState(initialColor);
  const [platform, setPlatform] = useState<PatronPlatform>("name");
  const [typed, setTyped] = useState("");
  const [exporting, setExporting] = useState(false);
  const [message, setMessage] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const resolvedHash = useRef(false);
  const slug = catalog.slugs.get(color.name) || initialSlug;
  const identity = cleanIdentity(typed, platform);
  const valid = validIdentity(identity, platform);
  const shownName = valid && platform !== "anonymous" ? patronHandle({ by: identity, on: platform }) : "";

  useEffect(() => {
    if (!catalog.colors.length || resolvedHash.current) return;
    resolvedHash.current = true;
    const hex = normalizeHex(window.location.hash.slice(1));
    if (hex) {
      const selected = catalog.nearest(hex);
      if (selected) queueMicrotask(() => setColor(selected));
    }
  }, [catalog]);

  function pick(value: string) {
    const hex = normalizeHex(value);
    const selected = hex && catalog.nearest(hex);
    if (!selected) return;
    setColor(selected);
    setMessage("");
    window.history.replaceState(window.history.state, "", `/adopt/#${selected.hex.slice(1)}`);
  }

  async function download() {
    if (!valid) {
      input.current?.focus();
      return;
    }
    setExporting(true);
    setMessage("");
    try {
      await downloadColorCard(color, shownName, slug);
      setMessage("Your card is ready. Enjoy your color!");
    } catch {
      setMessage("The card could not be downloaded. Please try again.");
    } finally {
      setExporting(false);
    }
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
          <AdoptionCard color={color} previewName={shownName || undefined} />
          <div className="hero__content">
            <h1 className="hero__title" aria-live="polite">
              Make {color.name} yours.
            </h1>
            <div className="color-hero__intro">
              <p className="lead">
                Choose a shade, add a name, and make a color card to keep or share. A little inspiration, in
                your own colors.
              </p>
            </div>
            <p className="hero__stats">
              <span>{COLOR_COUNT_LABEL} named colors</span>
              <span>Free PNG download</span>
              <span>By {SITE.name}</span>
            </p>
            <ul className="adopt__tiers">
              <li>
                <b>01</b>
                <span>Pick the color that feels like you.</span>
              </li>
              <li>
                <b>02</b>
                <span>
                  Add your name and preview the <i className="adopt__holo">holographic</i> card.
                </span>
              </li>
              <li>
                <b>03</b>
                <span>Download a clean color card as a PNG, ready to share.</span>
              </li>
            </ul>
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
                    aria-label="Pick a color for your card"
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
            <form
              className="adopt__who"
              onSubmit={(event) => {
                event.preventDefault();
                void download();
              }}
            >
              <label className="label" htmlFor={platform === "anonymous" ? "card-platform" : "adopt-by"}>
                Show me as
              </label>
              <div className="adopt__who-row">
                <select
                  id="card-platform"
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
                        platform === "name" ? "Your name" : platform === "website" ? "example.com" : "@handle"
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
                Your name appears on your card. Nothing is submitted or posted publicly.
              </p>
            </form>
            <p className="adopt__act">
              <button
                type="button"
                className="adopt__cta"
                aria-disabled={!valid || exporting}
                onClick={() => {
                  if (!exporting) void download();
                }}
              >
                {exporting ? "Creating your card…" : "Download your card"}
              </button>
              <span className="adopt__note">Free. No account or payment required.</span>
            </p>
            {message && (
              <p className="adopt__note" role="status">
                {message}
              </p>
            )}
            <p className="adopt__legal">
              <a href="/legal/#adopting">About color cards and privacy</a>
            </p>
          </div>
        </section>
        {children}
      </main>
    </div>
  );
}
