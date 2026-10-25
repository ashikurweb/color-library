import { CostsBar } from "@/components/costs-bar";

const COSTS = [
  ["API server", "$360 a year"],
  ["Cloudflare: speed and storage", "about $330 a year"],
  ["The domain, color.pizza", "about $50 a year"],
  ["GitHub runners for the art and the data", "about $240 a year"],
  ["A year", "about $980"],
  ["Various one-off costs", "about $950"],
] as const;

export function RunningCosts({ raised }: { raised: number }) {
  return (
    <section className="slide costs" id="costs" aria-labelledby="costs-title">
      <h2 className="display" id="costs-title">
        What it costs.
      </h2>
      <p className="lead costs__lead">
        What it takes to keep the list, its API and this site running. Color Names turns ten this year, paid
        out of pocket all along.
      </p>
      <dl className="costs__list">
        {COSTS.map(([label, value]) => (
          <div key={label} className={label === "A year" ? "costs__sum" : undefined}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <CostsBar raised={raised} />
    </section>
  );
}
