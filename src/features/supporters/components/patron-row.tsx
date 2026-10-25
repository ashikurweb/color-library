import type { CSSProperties, ReactNode } from "react";
import { Avatar } from "@/components/avatar";
import { colorLink } from "@/lib/colors";
import { patronHandle, patronUrl } from "@/lib/patrons";
import type { Patron } from "@/types/color";

export function PatronRow({ patron, rank }: { patron: Patron; rank: number }) {
  const name = patronHandle(patron);
  const href = patronUrl(patron);
  const wrap = (className: string, content: ReactNode) =>
    href ? (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer nofollow">
        {content}
      </a>
    ) : (
      <span className={className}>{content}</span>
    );
  return (
    <li className="supporter">
      <span className="supporter__rank">#{rank}</span>
      {wrap(
        `card-badge supporter__face${patron.founding ? " card-badge--founding" : ""}`,
        <Avatar src={patron.avatar} name={name} anonymous={patron.on === "anonymous"} />,
      )}
      <span className="supporter__who">
        {wrap("supporter__name", name)}
        {patron.founding && (
          <span className="supporter__founding" title="One of the first 50 patrons">
            Founding patron
          </span>
        )}
      </span>
      <span className="supporter__colors">
        {patron.colors.map((color) => {
          const rotation =
            ([...color.slug].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 7) % 1000) / 500;
          return (
            <a
              key={color.slug}
              className="supporter__color"
              id={`color-${color.slug}`}
              href={colorLink(color.slug)}
              title={color.name}
              style={{ "--c": color.hex, "--r": rotation } as CSSProperties}
            >
              <i />
              <b>{color.hex}</b>
              <span>{color.name}</span>
            </a>
          );
        })}
      </span>
    </li>
  );
}
