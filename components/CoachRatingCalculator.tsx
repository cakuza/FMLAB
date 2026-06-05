"use client";

import { useMemo, useState } from "react";
import { AttributeSelect } from "@/components/AttributeSelect";
import { CategorySelect } from "@/components/CategorySelect";
import { RatingResult } from "@/components/RatingResult";
import {
  type AttributeKey,
  type AttributeLevelId,
  type AttributeSelections,
  attributeLabels,
  coachingAttributes,
  createDefaultSelections,
  staffQualityAttributes
} from "@/lib/attributeLevels";
import {
  calculateAssignmentRatings,
  getRecommendedAssignments
} from "@/lib/ratingFormula";
import {
  type TrainingCategoryId,
  defaultTrainingCategoryId,
  trainingCategoryById
} from "@/lib/trainingCategories";

const examplePresets: {
  label: string;
  selections: AttributeSelections;
}[] = [
  {
    label: "Try attacking coach",
    selections: {
      ...createDefaultSelections(),
      attacking: "very-good",
      tactical: "very-good",
      technical: "good",
      possession: "good",
      defending: "competent",
      fitness: "average",
      goalkeeping: "reasonable",
      setPieces: "average",
      determination: "good",
      discipline: "good",
      motivating: "very-good"
    }
  },
  {
    label: "Try fitness coach",
    selections: {
      ...createDefaultSelections(),
      attacking: "competent",
      defending: "average",
      fitness: "outstanding",
      goalkeeping: "reasonable",
      possession: "average",
      setPieces: "competent",
      tactical: "average",
      technical: "average",
      determination: "good",
      discipline: "good",
      motivating: "good"
    }
  },
  {
    label: "Try set pieces coach",
    selections: {
      ...createDefaultSelections(),
      attacking: "average",
      defending: "average",
      fitness: "competent",
      goalkeeping: "reasonable",
      possession: "average",
      setPieces: "very-good",
      tactical: "good",
      technical: "good",
      determination: "good",
      discipline: "good",
      motivating: "good"
    }
  }
];

export function CoachRatingCalculator() {
  const [highlightAssignmentId, setHighlightAssignmentId] =
    useState<TrainingCategoryId>(defaultTrainingCategoryId);
  const [selections, setSelections] = useState(createDefaultSelections);
  const isDefaultProfile = Object.values(selections).every(
    (value) => value === "average"
  );

  const assignmentRatings = useMemo(
    () => calculateAssignmentRatings(selections),
    [selections]
  );
  const recommendedAssignments = useMemo(
    () => getRecommendedAssignments(selections, 3),
    [selections]
  );
  const highlightedAssignment = trainingCategoryById[highlightAssignmentId];
  const highlightedWeights = new Map<AttributeKey, number>(
    Object.entries(highlightedAssignment.weights) as [AttributeKey, number][]
  );
  const primaryAttributeKeys = new Set(highlightedAssignment.keyAttributes);

  const getAttributeEmphasis = (attributeKey: AttributeKey) => {
    const weight = highlightedWeights.get(attributeKey);

    if (!weight) {
      return "normal";
    }

    return primaryAttributeKeys.has(attributeKey) ? "primary" : "support";
  };

  const updateSelection = (
    attributeKey: AttributeKey,
    value: AttributeLevelId
  ) => {
    setSelections((current) => ({
      ...current,
      [attributeKey]: value
    }));
  };

  const primaryText = highlightedAssignment.keyAttributes
    .map((key) => attributeLabels[key])
    .join(", ");
  const supportText = Object.keys(highlightedAssignment.weights)
    .filter(
      (key): key is AttributeKey =>
        !primaryAttributeKeys.has(key as AttributeKey) &&
        Boolean(attributeLabels[key as AttributeKey])
    )
    .map((key) => attributeLabels[key])
    .join(", ");

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_430px]">
      <section className="order-2 rounded-lg border border-ink/10 bg-white/80 p-3 shadow-panel lg:order-1">
        <div className="mb-3 rounded-lg border border-ink/10 bg-touchline/45 p-3">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-pitch/80">
            Choose a preset or match the coach&apos;s visible word levels to reveal
            their best assignment fits.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {examplePresets.map((preset) => (
              <button
                className="rounded-full border border-pitch/18 bg-white px-3.5 py-2 text-xs font-black text-ink transition hover:border-pitch/45 hover:bg-touchline focus:outline-none focus:ring-4 focus:ring-pitch/16"
                key={preset.label}
                onClick={() => setSelections(preset.selections)}
                type="button"
              >
                {preset.label}
              </button>
            ))}
            <button
              className="rounded-full border border-ink/12 bg-chalk px-3.5 py-2 text-xs font-black text-ink/70 transition hover:border-pitch/40 hover:text-ink focus:outline-none focus:ring-4 focus:ring-pitch/16"
              onClick={() => setSelections(createDefaultSelections())}
              type="button"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mb-3 grid gap-3 rounded-lg border border-ink/10 bg-chalk p-3 md:grid-cols-[0.42fr_1fr]">
          <CategorySelect
            value={highlightAssignmentId}
            onChange={setHighlightAssignmentId}
          />
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-pitch">
              Highlighted for {highlightedAssignment.label}
            </p>
            <p className="mt-2 text-sm leading-6 text-ink/72">
              Main levers: <strong className="text-ink">{primaryText}</strong>.
              {supportText ? (
                <>
                  {" "}
                  Support:{" "}
                  <span className="font-semibold text-ink/80">
                    {supportText}
                  </span>
                  .
                </>
              ) : null}
            </p>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <section>
            <h2 className="mb-2 text-lg font-black text-ink">
              Coaching Attributes
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {coachingAttributes.map((attribute) => (
                <AttributeSelect
                  emphasis={getAttributeEmphasis(attribute.key)}
                  id={`attribute-${attribute.key}`}
                  key={attribute.key}
                  label={attribute.label}
                  onChange={(value) => updateSelection(attribute.key, value)}
                  value={selections[attribute.key]}
                />
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-black text-ink">
              Staff / Mental Attributes
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {staffQualityAttributes.map((attribute) => (
                <AttributeSelect
                  emphasis={getAttributeEmphasis(attribute.key)}
                  id={`attribute-${attribute.key}`}
                  key={attribute.key}
                  label={attribute.label}
                  onChange={(value) => updateSelection(attribute.key, value)}
                  value={selections[attribute.key]}
                />
              ))}
            </div>
          </section>
        </div>
      </section>

      <RatingResult
        assignmentRatings={assignmentRatings}
        className="order-1 lg:order-2"
        isDefaultProfile={isDefaultProfile}
        recommendedAssignments={recommendedAssignments}
        selectedAssignmentId={highlightAssignmentId}
      />
    </div>
  );
}
