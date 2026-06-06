"use client";

import { useMemo, useState } from "react";
import { AttributeSelect } from "@/components/AttributeSelect";
import { CategorySelect } from "@/components/CategorySelect";
import { RatingResult } from "@/components/RatingResult";
import { StarRating } from "@/components/StarRating";
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
  shortLabel: string;
  selections: AttributeSelections;
}[] = [
  {
    label: "Try attacking coach",
    shortLabel: "Attacking coach",
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
    shortLabel: "Fitness coach",
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
    shortLabel: "Set pieces coach",
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
  const sortedAssignmentRatings = useMemo(
    () =>
      assignmentRatings
        .map((assignment, index) => ({ assignment, index }))
        .sort(
          (a, b) =>
            b.assignment.stars - a.assignment.stars ||
            b.assignment.score - a.assignment.score ||
            a.index - b.index
        ),
    [assignmentRatings]
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
  const applyPreset = (preset: (typeof examplePresets)[number]) => {
    setSelections(preset.selections);
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
    <>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_430px]">
        <section className="order-2 rounded-lg border border-ink/10 bg-white/80 p-3 shadow-panel lg:order-1">
          <div className="mb-3 rounded-lg border border-ink/10 bg-touchline/45 p-3">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-pitch/80">
              Choose a preset or enter a coach&apos;s attributes to see his best
              training role.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {examplePresets.map((preset) => (
                <button
                  className="rounded-full border border-pitch/18 bg-white px-3.5 py-2 text-xs font-black text-ink transition hover:border-pitch/45 hover:bg-touchline focus:outline-none focus:ring-4 focus:ring-pitch/16"
                  key={preset.label}
                  onClick={() => applyPreset(preset)}
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
                Inspecting {highlightedAssignment.label}
              </p>
              <p className="mt-2 text-sm leading-6 text-ink/72">
                Main levers:{" "}
                <strong className="text-ink">{primaryText}</strong>.
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
              <h2 className="mb-2 text-base font-black text-ink">Coaching</h2>
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
              <h2 className="mb-2 text-base font-black text-ink">Mental</h2>
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
          presetActions={examplePresets.map((preset) => ({
            label: preset.shortLabel,
            onClick: () => applyPreset(preset)
          }))}
          recommendedAssignments={recommendedAssignments}
          selectedAssignmentId={highlightAssignmentId}
        />
      </div>

      <section className="mt-4 rounded-lg border border-ink/10 bg-white/78 p-4 shadow-panel">
        <h2 className="text-sm font-black uppercase tracking-[0.16em] text-bench">
          All Assignment Ratings
        </h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-ink/64">
          {isDefaultProfile
            ? "Default values shown. Choose a preset or enter a coach's attributes to see meaningful differences."
            : "Full rating table for the current coach profile."}
        </p>
        <div className="mt-3 overflow-x-auto rounded-lg border border-ink/10">
          <table className="w-full min-w-[420px] border-collapse text-left text-sm">
            <thead className="bg-chalk text-xs uppercase tracking-[0.12em] text-ink/62">
              <tr>
                <th className="w-14 px-3 py-3 font-black">#</th>
                <th className="px-3 py-3 font-black">Assignment</th>
                <th className="px-3 py-3 text-right font-black">Rating</th>
              </tr>
            </thead>
            <tbody>
              {sortedAssignmentRatings.map(({ assignment }, index) => {
                const isSelected = assignment.id === highlightAssignmentId;

                return (
                  <tr
                    className={[
                      "border-t border-ink/10",
                      isSelected ? "bg-signal/10" : "bg-white/40"
                    ].join(" ")}
                    key={assignment.id}
                  >
                    <td className="px-3 py-3 font-black text-ink/58">
                      #{index + 1}
                    </td>
                    <td className="px-3 py-3 font-black text-ink">
                      {assignment.label}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center justify-end gap-3">
                        <StarRating size="xs" value={assignment.stars} />
                        <span className="font-black text-pitch">
                          {assignment.stars.toFixed(1)}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
