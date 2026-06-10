export type RatingLabel =
  | "Weak"
  | "Average"
  | "Good"
  | "Very Good"
  | "Excellent"
  | "Elite";

export const ratingLabelThresholds: { minimumScore: number; label: RatingLabel }[] = [
  { minimumScore: 94, label: "Elite" },
  { minimumScore: 82, label: "Excellent" },
  { minimumScore: 70, label: "Very Good" },
  { minimumScore: 55, label: "Good" },
  { minimumScore: 35, label: "Average" },
  { minimumScore: 0, label: "Weak" }
];

export const getRatingLabel = (score: number): RatingLabel => {
  return (
    ratingLabelThresholds.find((threshold) => score >= threshold.minimumScore)
      ?.label ?? "Weak"
  );
};

export const ratingColors: Record<RatingLabel, string> = {
  Elite: "#1fd172",
  Excellent: "#22c55e",
  "Very Good": "#4ade80",
  Good: "#86efac",
  Average: "rgba(212,232,224,0.55)",
  Weak: "rgba(212,232,224,0.3)"
};

export const getRatingInfo = (score: number): { label: RatingLabel; color: string } => {
  const label = getRatingLabel(score);
  return { label, color: ratingColors[label] };
};
