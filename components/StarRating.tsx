import React from "react";

const STAR_PATH =
  "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z";

let gradId = 0;

function StarSvg({
  fill,
  size,
  color = "#f0a020",
  emptyColor = "rgba(240,160,32,0.18)"
}: {
  fill: number;
  size: number;
  color?: string;
  emptyColor?: string;
}) {
  if (fill >= 1) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "block", flexShrink: 0 }}>
        <path d={STAR_PATH} fill={color} />
      </svg>
    );
  }
  if (fill <= 0) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "block", flexShrink: 0 }}>
        <path d={STAR_PATH} fill={emptyColor} />
      </svg>
    );
  }
  const id = `sg${++gradId}`;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "block", flexShrink: 0 }}>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset={`${fill * 100}%`} stopColor={color} />
          <stop offset={`${fill * 100}%`} stopColor={emptyColor} />
        </linearGradient>
      </defs>
      <path d={STAR_PATH} fill={`url(#${id})`} />
    </svg>
  );
}

type StarRatingProps = {
  value: number;
  size?: number;
};

export function StarRating({ value, size = 16 }: StarRatingProps) {
  const filled = Math.floor(value);
  const partial = value - filled;
  const empty = 5 - filled - (partial > 0 ? 1 : 0);

  return (
    <div
      aria-label={`${value.toFixed(1)} out of 5 stars`}
      role="img"
      style={{ display: "flex", gap: 2, alignItems: "center" }}
    >
      {Array.from({ length: filled }, (_, i) => (
        <StarSvg key={`f${i}`} fill={1} size={size} />
      ))}
      {partial > 0 && <StarSvg key="p" fill={partial} size={size} />}
      {Array.from({ length: empty }, (_, i) => (
        <StarSvg key={`e${i}`} fill={0} size={size} />
      ))}
    </div>
  );
}
