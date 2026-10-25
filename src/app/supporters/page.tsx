import type { Metadata } from "next";
import { Brand } from "@/components/brand";
import { PageClose } from "@/components/page-close";
import { PatronRow } from "@/features/supporters/components/patron-row";
import { RunningCosts } from "@/features/supporters/components/running-costs";
import { getPatrons } from "@/lib/server/color-repository";

export const metadata: Metadata = {
  title: "Supporters",
  description: "Everyone who adopted a color, keeping the list and its API free for everyone.",
};

export default function SupportersPage() {
  const patrons = getPatrons();
  const count = patrons.reduce((total, patron) => total + patron.colors.length, 0);
  const raised = patrons.reduce((total, patron) => total + patron.total, 0);
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
                Everyone who adopted a color, keeping the list and its API free for everyone.
              </p>
            </div>
            <p className="hero__stats supporters__stats">
              <span>
                {count} colors adopted by {patrons.length} patrons
              </span>
              <span>${raised.toLocaleString("en-US")} raised</span>
            </p>
            <ol className="supporters__list">
              {patrons.map((patron, index) => (
                <PatronRow key={patron.id} patron={patron} rank={index + 1} />
              ))}
            </ol>
            <p className="adopt__act">
              <a className="adopt__cta" href="/adopt/">
                Adopt a color
              </a>
            </p>
          </div>
        </section>
        <RunningCosts raised={raised} />
      </main>
    </div>
  );
}
