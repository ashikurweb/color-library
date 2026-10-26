import { BRAND_SEGMENTS } from "@/lib/brand";
import { SITE } from "@/lib/site";

export function Brand({ className = "" }: { className?: string }) {
  return (
    <a className={`brand ${className}`} href="/" aria-label={`${SITE.name} home`}>
      <svg className="brand__logo" viewBox="0 0 64 64" aria-hidden="true">
        {BRAND_SEGMENTS.map(({ d, color }) => (
          <path key={color} d={d} fill={color} />
        ))}
        <circle cx="32" cy="32" r="8" fill="#fff" />
      </svg>
      <span>{SITE.name}</span>
    </a>
  );
}
