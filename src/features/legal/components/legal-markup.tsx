import { Brand } from "@/components/brand";
import { PageClose } from "@/components/page-close";

export function LegalMarkup() {
  return (
    <main className="color-page" id="main-content">
      <section className="slide slide--invert hero legal" data-slide="">
        <Brand className="color-hero__home" />
        <PageClose />
        <div className="legal__content">
          <h1 className="hero__title">{"Legal."}</h1>
          <h2 className="label">{"Who runs it"}</h2>
          <p className="prose">
            {" Elastiq GmbH"}
            <br />
            {" Zentralstrasse 43"}
            <br />
            {" 8003 Zürich, Switzerland"}
            <br />
            <a href="mailto:tschou@elastiq.ch">{"tschou@elastiq.ch"}</a>
            <br />
            {" UID CHE-496.923.818 MWST "}
          </p>
          <h2 className="label">{"The list"}</h2>
          <p className="prose">
            {" The color names are free to use under the "}
            <a href="https://github.com/meodai/color-names/blob/main/LICENSE">{"MIT license"}</a>
            {
              ". The pictures, artworks and album covers on the color pages belong to their makers and are shown with a link to where they come from. If something of yours is shown and you want it removed, write to "
            }
            <a href="mailto:tschou@elastiq.ch">{"tschou@elastiq.ch"}</a>
            {" and it comes down. "}
          </p>
          <h2 className="label" id="adopting">
            {"Adopting a color"}
          </h2>
          <p className="prose">
            {
              " Adopting a color is a one-time payment of an amount you choose. In return, your name or the avatar of the account you give is shown on that color’s page, for as long as the site runs. A color can be adopted by one person at a time. The color and its name stay free for everyone to use, adopting doesn’t make them yours. "
            }
          </p>
          <p className="prose">
            {
              " Payments are handled by Stripe. If you change your mind within 14 days, write to us and you get your money back. We may remove a name, avatar or website that is offensive, misleading or impersonates someone, and refund it. "
            }
          </p>
          <h2 className="label">{"Privacy"}</h2>
          <p className="prose">
            {
              " The site doesn’t use cookies. Visits are counted anonymously with Cloudflare Web Analytics: which pages are opened, from where roughly and on what kind of device, without identifying anyone. When you adopt a color, we keep the name or handle you give, its public avatar and the amount; the amount is never shown. Card details only go to Stripe. To have your data removed, write to us. "
            }
          </p>
        </div>
      </section>
    </main>
  );
}
