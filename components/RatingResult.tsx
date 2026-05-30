import type { RatingResult as RatingResultType } from "@/lib/ratingFormula";
import { StarRating } from "./StarRating";

type RatingResultProps = {
  result: RatingResultType;
  categoryLabel: string;
  className?: string;
};

export function RatingResult({
  result,
  categoryLabel,
  className = ""
}: RatingResultProps) {
  return (
    <aside
      className={[
        "sticky top-[5.5rem] overflow-hidden rounded-2xl border border-white/10 p-5",
        "bg-gradient-to-b from-[#1d2723] to-ink text-chalk shadow-panel",
        className
      ].join(" ")}
    >
      <p className="text-sm font-black uppercase tracking-[0.16em] text-touchline/78">
        Live estimate
      </p>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-chalk/68">{categoryLabel}</p>
          <p className="mt-1 text-5xl font-black">{result.stars.toFixed(1)}</p>
        </div>
        <StarRating value={result.stars} />
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-chalk/10 p-3">
          <dt className="text-xs font-bold uppercase tracking-[0.14em] text-touchline/72">
            Score
          </dt>
          <dd className="mt-1 text-2xl font-black">{result.score}/100</dd>
        </div>
        <div className="rounded-lg bg-chalk/10 p-3">
          <dt className="text-xs font-bold uppercase tracking-[0.14em] text-touchline/72">
            Label
          </dt>
          <dd className="mt-1 text-2xl font-black">{result.label}</dd>
        </div>
      </dl>

      <div className="mt-4 rounded-lg bg-chalk/10 p-3">
        <p className="text-sm font-bold text-touchline">
          Estimated range: {result.range.minStars.toFixed(1)}-
          {result.range.maxStars.toFixed(1)} stars
        </p>
        <p className="mt-2 text-sm leading-6 text-chalk/70">
          FM26 word levels can imply a band of possible values, so the range is
          more honest than a single exact-looking number.
        </p>
      </div>

      <div className="mt-5">
        <h2 className="text-sm font-black uppercase tracking-[0.14em] text-touchline/78">
          Most influential attributes for this category
        </h2>
        <ul className="mt-3 grid gap-2">
          {result.influentialAttributes.map((attribute) => (
            <li
              className="flex items-center justify-between rounded-md bg-chalk/10 px-3 py-2 text-sm"
              key={attribute.key}
            >
              <span className="font-bold">{attribute.label}</span>
              <span className="text-chalk/64">
                {Math.round(attribute.weight * 100)}%
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-5 rounded-lg border border-signal/40 bg-signal/16 p-3 text-sm font-semibold leading-6 text-chalk">
        {result.improvementTip}
      </p>
    </aside>
  );
}
