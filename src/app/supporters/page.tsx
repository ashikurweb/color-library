import type { Metadata } from "next";
import { Brand } from "@/components/brand";
import { PageClose } from "@/components/page-close";
import { PatronRow } from "@/features/supporters/components/patron-row";
import { getPatrons } from "@/lib/server/color-repository";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Supporters",
  description: "The community behind this independent color atlas.",
};

export default function SupportersPage() {
  const patrons = getPatrons();
  return (
    <div data-page="supporters">
      <main className="color-page" id="main-content">
        <section className="slide slide--invert hero supporters">
          <Brand className="color-hero__home" />
          <PageClose />
          <div className="supporters__content">
            <h1 className="hero__title">Supporters.</h1>
            <div className="color-hero__intro">
              <p className="lead">
                For everyone who loves exploring color. An independent project by{" "}
                <a href={SITE.github}>{SITE.name}</a>.
              </p>
            </div>
            {patrons.length ? (
              <ol className="supporters__list">
                {patrons.map((patron, index) => (
                  <PatronRow key={patron.id} patron={patron} rank={index + 1} />
                ))}
              </ol>
            ) : (
              <div className="supporters__empty">
                <h2 className="label">A fresh start</h2>
                <p className="prose">
                  No public supporters have been added yet. You can follow the project’s creator on GitHub or
                  create a color card of your own.
                </p>
              </div>
            )}
            <p className="adopt__act">
              <a className="adopt__cta" href="/adopt/">
                Create a color card
              </a>
              <a href={SITE.github} target="_blank" rel="noopener noreferrer">
                Follow on GitHub
              </a>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
