import type { AttributeKey } from "./attributeLevels";

export type TrainingCategoryId =
  | "attackingTactical"
  | "attackingTechnical"
  | "defendingTactical"
  | "defendingTechnical"
  | "possessionTactical"
  | "possessionTechnical"
  | "goalkeeping"
  | "fitness"
  | "setPieces";

export type TrainingCategory = {
  id: TrainingCategoryId;
  label: string;
  shortLabel: string;
  description: string;
  keyAttributes: AttributeKey[];
  weights: Partial<Record<AttributeKey, number>>;
};

const mentalSupportWeights = {
  determination: 0.1,
  discipline: 0.1,
  motivating: 0.1
} satisfies Partial<Record<AttributeKey, number>>;

export const trainingCategories: TrainingCategory[] = [
  {
    id: "attackingTactical",
    label: "Attacking Tactical",
    shortLabel: "Att Tac",
    description: "Attacking sessions that rely on attacking ideas and tactical structure.",
    keyAttributes: ["attacking", "tactical"],
    weights: {
      attacking: 0.45,
      tactical: 0.25,
      ...mentalSupportWeights
    }
  },
  {
    id: "attackingTechnical",
    label: "Attacking Technical",
    shortLabel: "Att Tech",
    description: "Attacking sessions that rely on attacking quality and technical detail.",
    keyAttributes: ["attacking", "technical"],
    weights: {
      attacking: 0.45,
      technical: 0.25,
      ...mentalSupportWeights
    }
  },
  {
    id: "defendingTactical",
    label: "Defending Tactical",
    shortLabel: "Def Tct",
    description: "Defensive sessions that rely on defending skill and tactical organization.",
    keyAttributes: ["defending", "tactical"],
    weights: {
      defending: 0.45,
      tactical: 0.25,
      ...mentalSupportWeights
    }
  },
  {
    id: "defendingTechnical",
    label: "Defending Technical",
    shortLabel: "Def Tech",
    description: "Defensive sessions that rely on defending skill and technical coaching.",
    keyAttributes: ["defending", "technical"],
    weights: {
      defending: 0.45,
      technical: 0.25,
      ...mentalSupportWeights
    }
  },
  {
    id: "possessionTactical",
    label: "Possession Tactical",
    shortLabel: "Poss Tact",
    description: "Possession sessions that rely on ball retention and tactical control.",
    keyAttributes: ["possession", "tactical"],
    weights: {
      possession: 0.45,
      tactical: 0.25,
      ...mentalSupportWeights
    }
  },
  {
    id: "possessionTechnical",
    label: "Possession Technical",
    shortLabel: "Poss Tech",
    description: "Possession sessions that rely on ball retention and technical coaching.",
    keyAttributes: ["possession", "technical"],
    weights: {
      possession: 0.45,
      technical: 0.25,
      ...mentalSupportWeights
    }
  },
  {
    id: "goalkeeping",
    label: "Goalkeeping",
    shortLabel: "Glk",
    description: "Keeper-specific coaching with small tactical and technical support.",
    keyAttributes: ["goalkeeping"],
    weights: {
      goalkeeping: 0.7,
      ...mentalSupportWeights
    }
  },
  {
    id: "fitness",
    label: "Fitness",
    shortLabel: "Fit",
    description: "Physical workload, conditioning and recovery standards.",
    keyAttributes: ["fitness"],
    weights: {
      fitness: 0.7,
      ...mentalSupportWeights
    }
  },
  {
    id: "setPieces",
    label: "Set Pieces",
    shortLabel: "SPC",
    description: "Dead-ball routines, delivery quality and restart organization.",
    keyAttributes: ["setPieces", "tactical", "technical"],
    weights: {
      setPieces: 0.49,
      tactical: 0.105,
      technical: 0.105,
      ...mentalSupportWeights
    }
  }
];

export const defaultTrainingCategoryId: TrainingCategoryId =
  "attackingTactical";

export const trainingCategoryById = Object.fromEntries(
  trainingCategories.map((category) => [category.id, category])
) as Record<TrainingCategoryId, TrainingCategory>;
