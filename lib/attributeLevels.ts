export const attributeLevels = [
  {
    id: "unsuited",
    label: "Unsuited",
    estimatedValue: 2,
    minValue: 1,
    maxValue: 3
  },
  {
    id: "reasonable",
    label: "Reasonable",
    estimatedValue: 5,
    minValue: 4,
    maxValue: 6
  },
  {
    id: "competent",
    label: "Competent",
    estimatedValue: 8,
    minValue: 7,
    maxValue: 9
  },
  {
    id: "average",
    label: "Average",
    estimatedValue: 10.5,
    minValue: 10,
    maxValue: 11
  },
  {
    id: "good",
    label: "Good",
    estimatedValue: 13,
    minValue: 12,
    maxValue: 14
  },
  {
    id: "very-good",
    label: "Very Good",
    estimatedValue: 16,
    minValue: 15,
    maxValue: 17
  },
  {
    id: "outstanding",
    label: "Outstanding",
    estimatedValue: 18.5,
    minValue: 18,
    maxValue: 19
  },
  {
    id: "elite",
    label: "Elite",
    estimatedValue: 20,
    minValue: 20,
    maxValue: 20
  }
] as const;

export type AttributeLevel = (typeof attributeLevels)[number];
export type AttributeLevelId = AttributeLevel["id"];

export const attributeLevelById: Record<AttributeLevelId, AttributeLevel> =
  Object.fromEntries(attributeLevels.map((level) => [level.id, level])) as Record<
    AttributeLevelId,
    AttributeLevel
  >;

export const defaultAttributeLevel: AttributeLevelId = "average";

export const coachingAttributes = [
  { key: "attacking", label: "Attacking" },
  { key: "defending", label: "Defending" },
  { key: "fitness", label: "Fitness" },
  { key: "goalkeeping", label: "Goalkeeping" },
  { key: "possession", label: "Possession" },
  { key: "setPieces", label: "Set Pieces" },
  { key: "tactical", label: "Tactical" },
  { key: "technical", label: "Technical" }
] as const;

export const staffQualityAttributes = [
  { key: "determination", label: "Determination" },
  { key: "discipline", label: "Level of Discipline" },
  { key: "motivating", label: "Motivating" },
  { key: "workingWithYoungsters", label: "Working With Youngsters" },
  { key: "tacticalKnowledge", label: "Tactical Knowledge" }
] as const;

export const allAttributes = [
  ...coachingAttributes,
  ...staffQualityAttributes
] as const;

export type AttributeKey = (typeof allAttributes)[number]["key"];

export const attributeLabels: Record<AttributeKey, string> = Object.fromEntries(
  allAttributes.map((attribute) => [attribute.key, attribute.label])
) as Record<AttributeKey, string>;

export type AttributeSelections = Record<AttributeKey, AttributeLevelId>;

export const createDefaultSelections = (): AttributeSelections =>
  Object.fromEntries(
    allAttributes.map((attribute) => [attribute.key, defaultAttributeLevel])
  ) as AttributeSelections;
