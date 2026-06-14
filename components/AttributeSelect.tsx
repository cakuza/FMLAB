import { type AttributeLevelId, attributeLevelColors, attributeLevels } from "@/lib/attributeLevels";

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
  const dotColor = attributeLevelColors[value] ?? "rgba(212,232,224,0.4)";
  const emphasisClass =
    emphasis === "primary" ? "attr-primary" : emphasis === "support" ? "attr-support" : "";

  const currentIndex = attributeLevels.findIndex((level) => level.id === value);
  const isMin = currentIndex <= 0;
  const isMax = currentIndex >= attributeLevels.length - 1;

  const handleStep = (direction: -1 | 1) => {
    const nextIndex = currentIndex + direction;
    if (nextIndex >= 0 && nextIndex < attributeLevels.length) {
      onChange(attributeLevels[nextIndex].id);
    }
  };

  return (
    <div className={`attr-row ${emphasisClass}`}>
      <span className="attr-dot" style={{ background: dotColor }} />
      <label className="attr-label" htmlFor={id}>{label}</label>
      <div className="attr-control-group">
        <button
          className="attr-step-btn decrement"
          onClick={() => handleStep(-1)}
          type="button"
          aria-label={`Decrease ${label}`}
          disabled={isMin}
        >
          –
        </button>
        <div className="attr-select-wrap">
          <select
            id={id}
            className="attr-select"
            value={value}
            onChange={(e) => onChange(e.target.value as AttributeLevelId)}
          >
            {attributeLevels.map((level) => (
              <option key={level.id} value={level.id}>{level.label}</option>
            ))}
          </select>
        </div>
        <button
          className="attr-step-btn increment"
          onClick={() => handleStep(1)}
          type="button"
          aria-label={`Increase ${label}`}
          disabled={isMax}
        >
          +
        </button>
      </div>
    </div>
  );
}
