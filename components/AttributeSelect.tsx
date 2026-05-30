import {
  type AttributeLevelId,
  attributeLevels
} from "@/lib/attributeLevels";
import { Minus, Plus } from "lucide-react";

type AttributeSelectProps = {
  id: string;
  label: string;
  value: AttributeLevelId;
  onChange: (value: AttributeLevelId) => void;
  weight?: number;
  emphasis?: "primary" | "support" | "normal";
};

export function AttributeSelect({
  id,
  label,
  value,
  onChange,
  weight,
  emphasis = "normal"
}: AttributeSelectProps) {
  const selectedIndex = attributeLevels.findIndex((level) => level.id === value);
  const canDecrease = selectedIndex > 0;
  const canIncrease = selectedIndex < attributeLevels.length - 1;
  const selectedLevel = attributeLevels[selectedIndex] ?? attributeLevels[0];
  const isHighlighted = emphasis !== "normal";

  const step = (direction: -1 | 1) => {
    const nextLevel = attributeLevels[selectedIndex + direction];

    if (nextLevel) {
      onChange(nextLevel.id);
    }
  };

  return (
    <div
      className={[
        "rounded-lg border p-3 transition",
        isHighlighted
          ? "border-pitch/40 bg-white shadow-sm"
          : "border-ink/10 bg-white/64",
        emphasis === "primary" ? "ring-2 ring-signal/60" : ""
      ].join(" ")}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <label className="text-sm font-black leading-5 text-ink" htmlFor={id}>
          {label}
        </label>
        {typeof weight === "number" ? (
          <span className="shrink-0 rounded-full bg-touchline px-2 py-1 text-xs font-black text-pitch">
            {Math.round(weight * 100)}%
          </span>
        ) : null}
      </div>

      <div className="grid grid-cols-[42px_minmax(0,1fr)_42px] overflow-hidden rounded-md border border-ink/12 bg-chalk">
        <button
          aria-label={`Decrease ${label}`}
          className="flex h-11 items-center justify-center border-r border-ink/10 text-ink transition hover:bg-touchline disabled:cursor-not-allowed disabled:opacity-35"
          disabled={!canDecrease}
          onClick={() => step(-1)}
          type="button"
        >
          <Minus aria-hidden="true" size={18} />
        </button>
        <select
          aria-label={`${label} level`}
          className="h-11 min-w-0 border-0 bg-transparent px-2 text-center text-base font-black text-ink outline-none"
          id={id}
          onChange={(event) => onChange(event.target.value as AttributeLevelId)}
          value={selectedLevel.id}
        >
          {attributeLevels.map((level) => (
            <option key={level.id} value={level.id}>
              {level.label}
            </option>
          ))}
        </select>
        <button
          aria-label={`Increase ${label}`}
          className="flex h-11 items-center justify-center border-l border-ink/10 text-ink transition hover:bg-touchline disabled:cursor-not-allowed disabled:opacity-35"
          disabled={!canIncrease}
          onClick={() => step(1)}
          type="button"
        >
          <Plus aria-hidden="true" size={18} />
        </button>
      </div>
    </div>
  );
}
