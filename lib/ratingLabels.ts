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
