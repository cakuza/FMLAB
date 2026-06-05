import {
  type TrainingCategoryId,
  trainingCategories
} from "@/lib/trainingCategories";

type CategorySelectProps = {
  value: TrainingCategoryId;
  onChange: (value: TrainingCategoryId) => void;
};

export function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <label className="grid gap-2" htmlFor="training-category">
      <span className="text-sm font-black uppercase tracking-[0.14em] text-bench">
        Highlight assignment
      </span>
      <select
        id="training-category"
        value={value}
        onChange={(event) => onChange(event.target.value as TrainingCategoryId)}
        className="h-12 w-full rounded-md border border-ink/16 bg-white px-3 text-base font-bold text-ink outline-none transition focus:border-pitch focus:ring-4 focus:ring-pitch/16"
      >
        {trainingCategories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.label}
          </option>
        ))}
      </select>
    </label>
  );
}
