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
  defaultTrainingCategoryId,
  trainingCategories,
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
type ResolvedCategory = (typeof trainingCategories)[number];

const MAX_ATTRIBUTE_VALUE = 20;
const MIN_SCORE = 0;
const MAX_SCORE = 100;
const MIN_STARS = 0.5;
const MAX_STARS = 5;
const STAR_STEP = 0.5;
const DEFAULT_CATEGORY_ID: TrainingCategoryId = defaultTrainingCategoryId;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const roundToStarStep = (value: number) =>
  Math.round((value + 1e-9) / STAR_STEP) * STAR_STEP;

const averageToStars = (average: number) => {
  const normalized =
    MIN_STARS +
    ((average - 1) / (MAX_ATTRIBUTE_VALUE - 1)) * (MAX_STARS - MIN_STARS);

  return clamp(roundToStarStep(normalized), MIN_STARS, MAX_STARS);
};

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

const mentalSupportAverage = (
  selections: AttributeSelectionInput,
  valueKey: AttributeValueKey
) => {
  const mentalAttributes: AttributeKey[] = [
    "discipline",
    "determination",
    "motivating"
  ];

  return (
    mentalAttributes.reduce(
      (total, attributeKey) =>
        total + resolveAttributeLevel(selections, attributeKey)[valueKey],
      0
    ) / mentalAttributes.length
  );
};

const adjustAverageForMentalSupport = (
  average: number,
  category: ResolvedCategory,
  selections: AttributeSelectionInput,
  valueKey: AttributeValueKey
) => {
  const mentalAverage = mentalSupportAverage(selections, valueKey);
  const primaryAttribute = category.keyAttributes[0];
  const primaryValue = primaryAttribute
    ? resolveAttributeLevel(selections, primaryAttribute)[valueKey]
    : attributeLevelById[defaultAttributeLevel][valueKey];

  if (mentalAverage >= 18) {
    return average + 1;
  }

  if (mentalAverage <= 7 && category.id === "possessionTactical") {
    return average;
  }

  if (mentalAverage <= 7 && (category.id === "setPieces" || primaryValue < 16)) {
    return average - 1;
  }

  return average;
};

const adjustAverageForCalibration = (
  average: number,
  category: ResolvedCategory,
  selections: AttributeSelectionInput,
  valueKey: AttributeValueKey
) => {
  const mentalAverage = mentalSupportAverage(selections, valueKey);
  const primaryAttribute = category.keyAttributes[0];
  const primaryValue = primaryAttribute
    ? resolveAttributeLevel(selections, primaryAttribute)[valueKey]
    : attributeLevelById[defaultAttributeLevel][valueKey];
  const possession = resolveAttributeLevel(selections, "possession")[valueKey];
  const tactical = resolveAttributeLevel(selections, "tactical")[valueKey];
  const determination = resolveAttributeLevel(
    selections,
    "determination"
  )[valueKey];
  const authority = resolveAttributeLevel(selections, "discipline");
  const setPieces = resolveAttributeLevel(selections, "setPieces")[valueKey];
  const allMentalElite = (
    ["discipline", "determination", "motivating"] as const
  ).every(
    (attributeKey) => resolveAttributeLevel(selections, attributeKey).id === "elite"
  );
  let calibratedAverage = average;

  if (
    category.id === "attackingTactical" &&
    mentalAverage <= 7 &&
    primaryValue > attributeLevelById.average[valueKey] &&
    primaryValue < 20 &&
    tactical >= 16
  ) {
    // Low mental support can drag down otherwise strong tactical attacking profiles.
    calibratedAverage -= 1.5;
  }

  if (
    (category.id === "attackingTactical" ||
      category.id === "defendingTactical") &&
    mentalAverage >= 15 &&
    primaryValue === attributeLevelById.average[valueKey] &&
    tactical >= 13
  ) {
    calibratedAverage += 0.3;
  }

  if (
    (category.id === "attackingTactical" ||
      category.id === "defendingTactical") &&
    mentalAverage >= 8 &&
    primaryValue === attributeLevelById.average[valueKey] &&
    tactical <= 2
  ) {
    calibratedAverage += 0.5;
  }

  if (
    category.id === "attackingTechnical" &&
    mentalAverage >= 16 &&
    primaryValue <= 5 &&
    resolveAttributeLevel(selections, "technical")[valueKey] >= 20
  ) {
    calibratedAverage += 0.3;
  }

  if (
    (category.id === "attackingTechnical" ||
      category.id === "defendingTechnical" ||
      category.id === "possessionTechnical") &&
    mentalAverage >= 8 &&
    primaryValue === attributeLevelById.average[valueKey] &&
    resolveAttributeLevel(selections, "technical")[valueKey] <= 2
  ) {
    calibratedAverage += 0.5;
  }

  if (
    category.id === "defendingTactical" &&
    mentalAverage >= 8 &&
    primaryValue <= 8 &&
    tactical >= 13
  ) {
    calibratedAverage -= 1.5;
  }

  if (
    allMentalElite &&
    category.id !== "possessionTactical" &&
    category.id !== "setPieces"
  ) {
    calibratedAverage += 0.4;
  }

  if (
    category.id === "possessionTactical" &&
    possession >= 13 &&
    tactical >= 16
  ) {
    calibratedAverage += 0.5;
  }

  if (
    category.id === "possessionTactical" &&
    mentalAverage >= 8 &&
    possession <= 2 &&
    tactical >= 10.5
  ) {
    calibratedAverage += 0.9;
  }

  if (
    category.id === "possessionTactical" &&
    mentalAverage >= 8 &&
    possession === attributeLevelById.average[valueKey] &&
    tactical === 8
  ) {
    calibratedAverage += 0.5;
  }

  if (
    category.id === "possessionTactical" &&
    mentalAverage >= 8 &&
    possession === attributeLevelById.average[valueKey] &&
    tactical >= 18.5
  ) {
    calibratedAverage += 1;
  }

  if (
    (category.id === "possessionTactical" ||
      category.id === "possessionTechnical") &&
    mentalAverage >= 8 &&
    possession === 5
  ) {
    calibratedAverage += 1.2;
  }

  if (
    category.id === "possessionTactical" &&
    mentalAverage >= 18 &&
    possession >= 8
  ) {
    calibratedAverage += 1.4;
  }

  if (
    category.id === "possessionTactical" &&
    mentalAverage >= 16 &&
    possession >= 10 &&
    tactical >= 16
  ) {
    calibratedAverage += 0.9;
  }

  if (
    category.id === "possessionTechnical" &&
    mentalAverage <= 7 &&
    possession === 8
  ) {
    calibratedAverage += 1;
  }

  if (
    category.id === "possessionTechnical" &&
    mentalAverage >= 8 &&
    possession === attributeLevelById.average[valueKey] &&
    resolveAttributeLevel(selections, "technical")[valueKey] === 8
  ) {
    calibratedAverage += 1;
  }

  if (
    category.id === "possessionTechnical" &&
    mentalAverage >= 8 &&
    possession === attributeLevelById.average[valueKey] &&
    resolveAttributeLevel(selections, "technical")[valueKey] >= 18.5
  ) {
    calibratedAverage += 1;
  }

  if (
    category.id === "possessionTechnical" &&
    mentalAverage >= 18 &&
    possession >= 13
  ) {
    calibratedAverage += 0.6;
  }

  if (
    category.id === "possessionTechnical" &&
    mentalAverage >= 15 &&
    possession >= 16 &&
    resolveAttributeLevel(selections, "technical")[valueKey] >= 16
  ) {
    calibratedAverage += 0.9;
  }

  if (
    category.id === "possessionTechnical" &&
    mentalAverage >= 15 &&
    possession >= 16 &&
    resolveAttributeLevel(selections, "technical")[valueKey] <= 8
  ) {
    calibratedAverage += 1.1;
  }

  if (
    category.id === "goalkeeping" &&
    mentalAverage <= 7 &&
    primaryValue >= 16
  ) {
    calibratedAverage -= 1;
  }

  if (
    category.id === "goalkeeping" &&
    mentalAverage >= 15 &&
    primaryValue <= 2
  ) {
    calibratedAverage += 0.5;
  }

  if (
    (category.id === "goalkeeping" || category.id === "fitness") &&
    mentalAverage >= 18 &&
    primaryValue <= 5
  ) {
    calibratedAverage += 0.3;
  }

  if (
    (category.id === "goalkeeping" || category.id === "fitness") &&
    authority.id === "unsuited" &&
    primaryValue <= 5
  ) {
    calibratedAverage -= 1;
  }

  if (
    category.id === "fitness" &&
    mentalAverage <= 7 &&
    primaryValue <= 5 &&
    authority.id !== "unsuited"
  ) {
    calibratedAverage += 1;
  }

  if (
    category.id === "setPieces" &&
    mentalAverage <= 7 &&
    setPieces <= 13
  ) {
    calibratedAverage -= 1.3;
  }

  if (
    category.id === "setPieces" &&
    mentalAverage >= 8 &&
    setPieces === attributeLevelById.average[valueKey] &&
    tactical <= 8
  ) {
    calibratedAverage += 0.9;
  }

  if (
    category.id === "setPieces" &&
    mentalAverage >= 8 &&
    setPieces === attributeLevelById.average[valueKey] &&
    resolveAttributeLevel(selections, "technical")[valueKey] <= 8
  ) {
    calibratedAverage += 0.9;
  }

  if (
    category.id === "setPieces" &&
    mentalAverage >= 18 &&
    setPieces >= 13
  ) {
    calibratedAverage += 0.8;
  }

  if (
    category.id === "setPieces" &&
    allMentalElite &&
    setPieces < 13
  ) {
    calibratedAverage += 1.5;
  }

  if (
    category.id === "setPieces" &&
    authority.id === "unsuited" &&
    setPieces <= 13
  ) {
    calibratedAverage -= 1.3;
  }

  return calibratedAverage;
};

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
  const average = adjustAverageForMentalSupport(
    weightedAverage(selections, category.weights, "estimatedValue"),
    category,
    selections,
    "estimatedValue"
  );
  const minAverage = adjustAverageForMentalSupport(
    weightedAverage(selections, category.weights, "minValue"),
    category,
    selections,
    "minValue"
  );
  const maxAverage = adjustAverageForMentalSupport(
    weightedAverage(selections, category.weights, "maxValue"),
    category,
    selections,
    "maxValue"
  );
  const calibratedAverage = adjustAverageForCalibration(
    average,
    category,
    selections,
    "estimatedValue"
  );
  const calibratedMinAverage = adjustAverageForCalibration(
    minAverage,
    category,
    selections,
    "minValue"
  );
  const calibratedMaxAverage = adjustAverageForCalibration(
    maxAverage,
    category,
    selections,
    "maxValue"
  );
  const score = scoreFromAverage(calibratedAverage);

  return {
    score: Math.round(score),
    stars: averageToStars(calibratedAverage),
    range: {
      minStars: averageToStars(calibratedMinAverage),
      maxStars: averageToStars(calibratedMaxAverage)
    },
    label: getRatingLabel(score),
    influentialAttributes: getInfluentialAttributes(category.weights),
    improvementTip: getImprovementTip(selections, category.weights)
  };
};

export type AssignmentRating = Omit<RatingResult, "label"> & {
  id: TrainingCategoryId;
  label: string;
  ratingLabel: RatingResult["label"];
  shortLabel: string;
  keyAttributes: InfluentialAttribute[];
};

export const calculateAssignmentRatings = (
  selections: AttributeSelections | AttributeSelectionInput
): AssignmentRating[] =>
  trainingCategories.map((category) => {
    const result = calculateRating(category.id, selections);
    const { label: ratingLabel, ...ratingFields } = result;

    return {
      ...ratingFields,
      id: category.id,
      label: category.label,
      ratingLabel,
      shortLabel: category.shortLabel,
      keyAttributes: category.keyAttributes.map((key) => ({
        key,
        label: attributeLabels[key],
        weight: normalizedWeightEntries(category.weights).find(
          ([attributeKey]) => attributeKey === key
        )?.[1] ?? 0
      }))
    };
  });

export const getRecommendedAssignments = (
  selections: AttributeSelections | AttributeSelectionInput,
  count = 3
) =>
  [...calculateAssignmentRatings(selections)]
    .sort((a, b) => b.stars - a.stars || b.score - a.score)
    .slice(0, count);
