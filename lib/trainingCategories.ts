import type { AttributeKey } from "./attributeLevels";

export type TrainingCategoryId =
  | "attacking"
  | "defending"
  | "fitness"
  | "goalkeeping"
  | "possession"
  | "setPieces"
  | "tactical"
  | "technical"
  | "youthDevelopment"
  | "generalCoachingQuality";

export type TrainingCategory = {
  id: TrainingCategoryId;
  label: string;
  description: string;
  weights: Partial<Record<AttributeKey, number>>;
};

export const trainingCategories: TrainingCategory[] = [
  {
    id: "attacking",
    label: "Attacking",
    description: "Chance creation, final-third patterns and forward training fit.",
    weights: {
      attacking: 0.38,
      technical: 0.15,
      possession: 0.13,
      tactical: 0.1,
      determination: 0.08,
      discipline: 0.08,
      motivating: 0.08
    }
  },
  {
    id: "defending",
    label: "Defending",
    description: "Back-line structure, pressing discipline and defensive sessions.",
    weights: {
      defending: 0.43,
      tactical: 0.17,
      determination: 0.12,
      discipline: 0.14,
      motivating: 0.1,
      tacticalKnowledge: 0.04
    }
  },
  {
    id: "fitness",
    label: "Fitness",
    description: "Conditioning, recovery standards and physical workload quality.",
    weights: {
      fitness: 0.58,
      determination: 0.14,
      discipline: 0.14,
      motivating: 0.14
    }
  },
  {
    id: "goalkeeping",
    label: "Goalkeeping",
    description: "Keeper-specific coaching with technical and tactical support.",
    weights: {
      goalkeeping: 0.52,
      tactical: 0.12,
      technical: 0.12,
      determination: 0.08,
      discipline: 0.08,
      motivating: 0.08
    }
  },
  {
    id: "possession",
    label: "Possession",
    description: "Ball retention, circulation and control-focused training.",
    weights: {
      possession: 0.4,
      technical: 0.22,
      tactical: 0.16,
      attacking: 0.08,
      determination: 0.05,
      discipline: 0.05,
      motivating: 0.04
    }
  },
  {
    id: "setPieces",
    label: "Set Pieces",
    description: "Dead-ball routines, delivery detail and restart organization.",
    weights: {
      setPieces: 0.5,
      tactical: 0.18,
      technical: 0.14,
      discipline: 0.08,
      determination: 0.05,
      motivating: 0.05
    }
  },
  {
    id: "tactical",
    label: "Tactical",
    description: "Team shape, match plans and tactical learning sessions.",
    weights: {
      tactical: 0.42,
      tacticalKnowledge: 0.22,
      determination: 0.1,
      discipline: 0.12,
      motivating: 0.1,
      possession: 0.04
    }
  },
  {
    id: "technical",
    label: "Technical",
    description: "Technique work, ball mastery and individual skill growth.",
    weights: {
      technical: 0.42,
      attacking: 0.13,
      possession: 0.15,
      tactical: 0.08,
      determination: 0.08,
      discipline: 0.07,
      motivating: 0.07
    }
  },
  {
    id: "youthDevelopment",
    label: "Youth Development",
    description: "Young-player development, standards and communication fit.",
    weights: {
      workingWithYoungsters: 0.48,
      determination: 0.15,
      motivating: 0.17,
      discipline: 0.14,
      tacticalKnowledge: 0.06
    }
  },
  {
    id: "generalCoachingQuality",
    label: "General Coaching Quality",
    description: "Balanced overall staff quality across the important coaching areas.",
    weights: {
      attacking: 0.075,
      defending: 0.075,
      fitness: 0.075,
      goalkeeping: 0.055,
      possession: 0.075,
      setPieces: 0.055,
      tactical: 0.09,
      technical: 0.09,
      determination: 0.085,
      discipline: 0.085,
      motivating: 0.085,
      workingWithYoungsters: 0.08,
      tacticalKnowledge: 0.075
    }
  }
];

export const trainingCategoryById = Object.fromEntries(
  trainingCategories.map((category) => [category.id, category])
) as Record<TrainingCategoryId, TrainingCategory>;
