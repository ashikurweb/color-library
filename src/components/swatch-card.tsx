import type { CSSProperties } from "react";
import type { NamedColor } from "@/types/color";

interface SwatchCardProps {
  color?: NamedColor;
  visible?: boolean;
  className?: string;
}

export function SwatchCard({ color, visible = false, className = "" }: SwatchCardProps) {
  const style = color ? ({ "--c-color": color.hex } as CSSProperties) : undefined;
  return (
    <div
      className={`swatchcard${visible ? " swatchcard--visible" : ""} ${className}`}
      style={style}
      data-card=""
    >
      <div className="swatchcard__upper">
        <i className="swatchcard__swatch" aria-hidden="true">
          <i className="swatchcard__shade" />
          <i className="swatchcard__shade" />
          <i className="swatchcard__shade" />
        </i>
      </div>
      <div className="swatchcard__label">
        <div className="swatchcard__info">
          <span className="swatchcard__row1" data-value="">
            {color?.hex}
          </span>
          <span className="swatchcard__row2" data-card-name="">
            {color?.name}
          </span>
        </div>
      </div>
    </div>
  );
}
