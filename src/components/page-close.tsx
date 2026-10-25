export function PageClose({ href = "/", label = "Back to Color Names" }: { href?: string; label?: string }) {
  return (
    <a className="color-hero__close" href={href} data-close="" aria-label={label}>
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path
          d="M5 5l10 10M15 5L5 15"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </a>
  );
}
