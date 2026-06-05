"use client";

import { useMemo, useState } from "react";
import { AttributeSelect } from "@/components/AttributeSelect";
import { CategorySelect } from "@/components/CategorySelect";
import { RatingResult } from "@/components/RatingResult";
import {
  type AttributeKey,
  type AttributeLevelId,
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

export function CoachRatingCalculator() {
  const [highlightAssignmentId, setHighlightAssignmentId] =
    useState<TrainingCategoryId>(defaultTrainingCategoryId);
  const [selections, setSelections] = useState(createDefaultSelections);

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
        recommendedAssignments={recommendedAssignments}
        selectedAssignmentId={highlightAssignmentId}
      />
    </div>
  );
}
