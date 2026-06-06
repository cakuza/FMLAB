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
  emphasis?: "primary" | "support" | "normal";
};

export function AttributeSelect({
  id,
  label,
  value,
  onChange,
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
        "relative overflow-hidden rounded-md border p-1.5 transition sm:p-2",
        emphasis === "primary"
          ? "border-signal/80 bg-signal/10 shadow-sm"
          : "",
        emphasis === "support"
          ? "border-pitch/35 bg-touchline/28 shadow-sm"
          : "",
        !isHighlighted ? "border-ink/10 bg-white/70" : ""
      ].join(" ")}
    >
      {isHighlighted ? (
        <span
          aria-hidden="true"
          className={[
            "absolute inset-y-0 left-0 w-1",
            emphasis === "primary" ? "bg-signal" : "bg-pitch"
          ].join(" ")}
        />
      ) : null}

      <label
        className="mb-1 block text-xs font-black uppercase leading-4 tracking-[0.04em] text-ink/82 sm:text-sm sm:normal-case sm:tracking-normal"
        htmlFor={id}
      >
        {label}
      </label>

      <div className="grid grid-cols-[32px_minmax(0,1fr)_32px] overflow-hidden rounded-md border border-ink/12 bg-chalk shadow-inner sm:grid-cols-[34px_minmax(0,1fr)_34px]">
        <button
          aria-label={`Decrease ${label}`}
          className="flex h-8 items-center justify-center border-r border-ink/10 text-ink transition hover:bg-touchline disabled:cursor-not-allowed disabled:opacity-35 sm:h-9"
          disabled={!canDecrease}
          onClick={() => step(-1)}
          type="button"
        >
          <Minus aria-hidden="true" size={18} />
        </button>
        <select
          aria-label={`${label} level`}
          className="h-8 w-full min-w-0 border-0 bg-transparent px-1.5 text-center text-sm font-black text-ink outline-none sm:h-9 sm:text-base"
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
          className="flex h-8 items-center justify-center border-l border-ink/10 text-ink transition hover:bg-touchline disabled:cursor-not-allowed disabled:opacity-35 sm:h-9"
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
