import {
  type AttributeKey,
  type AttributeSelections,
  attributeLabels,
  attributeLevelById,
  defaultAttributeLevel
} from "./attributeLevels";
import { getRatingLabel } from "./ratingLabels";
import {
  type TrainingCategoryId,
  trainingCategoryById
} from "./trainingCategories";

export type InfluentialAttribute = {
  key: AttributeKey;
  label: string;
  weight: number;
};

export type RatingResult = {
  score: number;
  stars: number;
  range: {
    minStars: number;
    maxStars: number;
  };
  label: ReturnType<typeof getRatingLabel>;
  influentialAttributes: InfluentialAttribute[];
  improvementTip: string;
};

type AttributeSelectionInput = Partial<Record<AttributeKey, string>>;
type AttributeValueKey = "estimatedValue" | "minValue" | "maxValue";

const MAX_ATTRIBUTE_VALUE = 20;
const MIN_SCORE = 0;
const MAX_SCORE = 100;
const MIN_STARS = 0.5;
const MAX_STARS = 5;
const STAR_STEP = 0.5;
const DEFAULT_CATEGORY_ID: TrainingCategoryId = "generalCoachingQuality";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const roundToStarStep = (value: number) =>
  Math.round(value / STAR_STEP) * STAR_STEP;

const scoreToStars = (score: number) =>
  clamp(roundToStarStep((score / MAX_SCORE) * MAX_STARS), MIN_STARS, MAX_STARS);

const resolveCategory = (categoryId: string) =>
  trainingCategoryById[categoryId as TrainingCategoryId] ??
  trainingCategoryById[DEFAULT_CATEGORY_ID];

const resolveAttributeLevel = (
  selections: AttributeSelectionInput,
  attributeKey: AttributeKey
) =>
  attributeLevelById[
    selections[attributeKey] as keyof typeof attributeLevelById
  ] ?? attributeLevelById[defaultAttributeLevel];

const normalizedWeightEntries = (
  weights: Partial<Record<AttributeKey, number>>
) => {
  const entries = (Object.entries(weights) as [AttributeKey, number][])
    .filter(([, weight]) => Number.isFinite(weight) && weight > 0);
  const totalWeight = entries.reduce((total, [, weight]) => total + weight, 0);

  if (totalWeight <= 0) {
    return [];
  }

  return entries.map(([key, weight]) => [key, weight / totalWeight] as const);
};

const weightedAverage = (
  selections: AttributeSelectionInput,
  weights: Partial<Record<AttributeKey, number>>,
  valueKey: AttributeValueKey
) => {
  const entries = normalizedWeightEntries(weights);

  if (entries.length === 0) {
    return 0;
  }

  const weightedValue = entries.reduce((total, [attributeKey, weight]) => {
    const level = resolveAttributeLevel(selections, attributeKey);
    return total + level[valueKey] * weight;
  }, 0);

  return weightedValue;
};

const scoreFromAverage = (average: number) =>
  clamp((average / MAX_ATTRIBUTE_VALUE) * MAX_SCORE, MIN_SCORE, MAX_SCORE);

const getInfluentialAttributes = (
  weights: Partial<Record<AttributeKey, number>>
): InfluentialAttribute[] =>
  normalizedWeightEntries(weights)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key, weight]) => ({
      key,
      label: attributeLabels[key],
      weight
    }));

const getImprovementTip = (
  selections: AttributeSelectionInput,
  weights: Partial<Record<AttributeKey, number>>
) => {
  const bestCandidate = normalizedWeightEntries(weights)
    .filter(
      ([attributeKey]) =>
        resolveAttributeLevel(selections, attributeKey).id !== "elite"
    )
    .sort((a, b) => {
      const aLevel = resolveAttributeLevel(selections, a[0]);
      const bLevel = resolveAttributeLevel(selections, b[0]);
      const aLift = (MAX_ATTRIBUTE_VALUE - aLevel.estimatedValue) * a[1];
      const bLift = (MAX_ATTRIBUTE_VALUE - bLevel.estimatedValue) * b[1];
      return bLift - aLift;
    })[0];

  if (!bestCandidate) {
    return "This profile is already maxed out for the selected category.";
  }

  const [attributeKey] = bestCandidate;
  return `Improving ${attributeLabels[attributeKey]} should have the clearest impact on this category.`;
};

export const calculateRating = (
  categoryId: TrainingCategoryId | string,
  selections: AttributeSelections | AttributeSelectionInput
): RatingResult => {
  const category = resolveCategory(categoryId);
  const average = weightedAverage(selections, category.weights, "estimatedValue");
  const minAverage = weightedAverage(selections, category.weights, "minValue");
  const maxAverage = weightedAverage(selections, category.weights, "maxValue");
  const score = scoreFromAverage(average);
  const minScore = scoreFromAverage(minAverage);
  const maxScore = scoreFromAverage(maxAverage);

  return {
    score: Math.round(score),
    stars: scoreToStars(score),
    range: {
      minStars: scoreToStars(minScore),
      maxStars: scoreToStars(maxScore)
    },
    label: getRatingLabel(score),
    influentialAttributes: getInfluentialAttributes(category.weights),
    improvementTip: getImprovementTip(selections, category.weights)
  };
};
