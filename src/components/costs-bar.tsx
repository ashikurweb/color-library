import type { CSSProperties } from "react";
import { SITE } from "@/lib/site";

export function CostsBar({
  raised,
  link = false,
  className = "",
}: {
  raised: number;
  link?: boolean;
  className?: string;
}) {
  const years = Math.min(10, Math.floor(raised / SITE.annualCost));
  const progress = years === 10 ? 1 : (raised % SITE.annualCost) / SITE.annualCost;
  const text = years
    ? `$${raised.toLocaleString("en-US")} from patrons so far: ${years === 1 ? "a year" : `${years} years`} of running it covered`
    : `$${raised.toLocaleString("en-US")} of a year’s $980 covered by patrons so far`;
  return (
    <div className={`costs__bar ${className}`} style={{ "--k": progress } as CSSProperties}>
      <ol className="costs__years" aria-hidden="true">
        {Array.from({ length: 10 }, (_, index) => (
          <li key={index} className={9 - index < years ? "is-full" : undefined} data-year={2016 + index} />
        ))}
      </ol>
      <div className="costs__track">
        <i className="costs__fill" />
      </div>
      <p className="costs__note">
        {text}
        {link && (
          <>
            {" "}
            <a href="/supporters/#costs">What it costs</a>
          </>
        )}
      </p>
    </div>
  );
}
