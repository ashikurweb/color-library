import { Brand } from "@/components/brand";
import { PageClose } from "@/components/page-close";
import { SITE } from "@/lib/site";

export function LegalMarkup() {
  return (
    <main className="color-page" id="main-content">
      <section className="slide slide--invert hero legal">
        <Brand className="color-hero__home" />
        <PageClose />
        <div className="legal__content">
          <h1 className="hero__title">Legal.</h1>
          <h2 className="label">{SITE.name}</h2>
          <p className="prose">
            An independent color exploration project by <a href={SITE.github}>{SITE.name}</a>. Copyright ©
            2026 {SITE.copyrightOwner} for original additions and branding.
          </p>
          <h2 className="label">Software and data</h2>
          <p className="prose">
            The project is available under the <a href="/license/">MIT license</a>. Included open-source
            components and data retain their own copyright and license notices in the{" "}
            <a href="/licenses/">third-party notices</a>. The typeface and pixel artwork retain their
            respective credits.
          </p>
          <h2 className="label" id="adopting">
            Color cards
          </h2>
          <p className="prose">
            Personalized cards are previews you can download. Creating a card does not reserve a color, grant
            ownership, or make a public supporter entry. Payments and paid adoptions are not available.
          </p>
          <h2 className="label">Privacy</h2>
          <p className="prose">
            Your explorer preferences are saved in your browser. Names entered in the card designer stay on
            your device and appear only in your preview and downloaded card. This app does not submit that
            identity, collect card details, or load analytics.
          </p>
          <h2 className="label">Images</h2>
          <p className="prose">
            Color studies are generated from the selected shade. Pixel illustrations are served from the
            included local artwork collection, with credits retained in the third-party notices.
          </p>
        </div>
      </section>
    </main>
  );
}
