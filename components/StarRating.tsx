import React from "react";
import { Star } from "lucide-react";

type StarRatingProps = {
  value: number;
  size?: "xs" | "sm" | "md" | "lg";
  tone?: "light" | "dark";
};

const sizeClasses = {
  xs: "h-4 w-4",
  sm: "h-5 w-5",
  md: "h-8 w-8",
  lg: "h-10 w-10"
};

export function StarRating({
  value,
  size = "md",
  tone = "light"
}: StarRatingProps) {
  const starClassName = sizeClasses[size];
  const emptyStarClassName = tone === "dark" ? "text-chalk/28" : "text-ink/18";

  return (
    <div
      aria-label={`Estimated star rating: ${value} out of 5`}
      className="flex items-center gap-1"
      role="img"
    >
      {Array.from({ length: 5 }, (_, index) => {
        const fillPercent = Math.max(0, Math.min(1, value - index)) * 100;

        return (
          <span
            key={index}
            className={`relative ${starClassName} ${emptyStarClassName}`}
          >
            <Star
              aria-hidden="true"
              className={starClassName}
              strokeWidth={1.8}
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 overflow-hidden text-signal"
              style={{ width: `${fillPercent}%` }}
            >
              <Star
                className={`${starClassName} fill-current`}
                strokeWidth={1.8}
              />
            </span>
          </span>
        );
      })}
    </div>
  );
}
