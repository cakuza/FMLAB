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

  return (
    <div className={`attr-row ${emphasisClass}`}>
      <span className="attr-dot" style={{ background: dotColor }} />
      <label className="attr-label" htmlFor={id}>{label}</label>
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
    </div>
  );
}
