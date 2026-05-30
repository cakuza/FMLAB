import { Star } from "lucide-react";

type StarRatingProps = {
  value: number;
};

export function StarRating({ value }: StarRatingProps) {
  return (
    <div
      aria-label={`Estimated star rating: ${value} out of 5`}
      className="flex items-center gap-1"
      role="img"
    >
      {Array.from({ length: 5 }, (_, index) => {
        const fillPercent = Math.max(0, Math.min(1, value - index)) * 100;

        return (
          <span key={index} className="relative h-8 w-8 text-ink/18">
            <Star aria-hidden="true" className="h-8 w-8" strokeWidth={1.8} />
            <span
              aria-hidden="true"
              className="absolute inset-0 overflow-hidden text-signal"
              style={{ width: `${fillPercent}%` }}
            >
              <Star className="h-8 w-8 fill-current" strokeWidth={1.8} />
            </span>
          </span>
        );
      })}
    </div>
  );
}
