import React from "react";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  RatingResult,
  sortAssignmentRatingsForDisplay
} from "@/components/RatingResult";
import { examplePresets } from "@/components/CoachRatingCalculator";
import { createDefaultSelections } from "@/lib/attributeLevels";
import type { AssignmentRating } from "@/lib/ratingFormula";
import { calculateAssignmentRatings } from "@/lib/ratingFormula";
import { defaultTrainingCategoryId } from "@/lib/trainingCategories";

const createAssignment = (
  id: AssignmentRating["id"],
  label: string,
  stars = 3
): AssignmentRating => ({
  id,
  label,
  shortLabel: label,
  score: stars * 20,
  stars,
  range: {
    minStars: stars,
    maxStars: stars
  },
  ratingLabel: "Good",
  influentialAttributes: [],
  improvementTip: "",
  keyAttributes: []
});

const renderAssignmentTable = (
  assignmentRatings: AssignmentRating[],
  isDefaultProfile = false
) =>
  renderToStaticMarkup(
    React.createElement(RatingResult, {
      assignmentRatings,
      isDefaultProfile,
      selectedAssignmentId: defaultTrainingCategoryId
    })
  );

const getPresetRatings = (label: string) => {
  const preset = examplePresets.find((item) => item.label === label);

  if (!preset) {
    throw new Error(`Missing preset: ${label}`);
  }

  return calculateAssignmentRatings(preset.selections);
};

describe("RatingResult assignment table display", () => {
  it("shows all 9 assignment ratings in the real homepage default state", () => {
    const defaultSelections = createDefaultSelections();
    const assignmentRatings = calculateAssignmentRatings(defaultSelections);

    expect(
      assignmentRatings.every(
        (assignment) => assignment.stars === assignmentRatings[0]?.stars
      )
    ).toBe(true);

    const html = renderAssignmentTable(assignmentRatings, true);

    expect(html).toContain("All Assignment Ratings");
    expect(html).not.toContain("Top Assignment Fits");
    expect(html).not.toContain("Copy result");
    expect(html).not.toContain("Start with a preset");
    expect(html).not.toContain("Once you enter a real profile");
    expect(html).toContain("Attacking Tactical");
    expect(html).toContain("Attacking Technical");
    expect(html).toContain("Defending Tactical");
    expect(html).toContain("Defending Technical");
    expect(html).toContain("Possession Tactical");
    expect(html).toContain("Possession Technical");
    expect(html).toContain("Goalkeeping");
    expect(html).toContain("Fitness");
    expect(html).toContain("Set Pieces");
    expect(html).toContain("Attacking Tactical, 3.0 stars");
    expect(html).toContain(
      "Default values shown. Choose a preset or enter a coach&#x27;s attributes to see meaningful differences."
    );
  });

  it("keeps the right assignment table compact and free of range/key-attribute columns", () => {
    const source = readFileSync("components/RatingResult.tsx", "utf8");

    expect(source).toContain("All Assignment Ratings");
    expect(source).toContain("Rating</th>");
    expect(source).toContain('StarRating size="sm" tone="dark"');
    expect(source).not.toContain("Key attributes");
    expect(source).not.toContain("Range</th>");
    expect(source).not.toContain("formatRange");
    expect(source).not.toContain("Top Assignment Fits");
    expect(source).not.toContain("Copy result");
    expect(source).not.toContain("formatCopyText");
  });

  it("wires the right panel ratings to the current calculator selections", () => {
    const source = readFileSync("components/CoachRatingCalculator.tsx", "utf8");

    expect(source).toContain(
      "const assignmentRatings = useMemo(\n    () => calculateAssignmentRatings(selections),\n    [selections]\n  );"
    );
    expect(source).toContain("setSelections(preset.selections)");
    expect(source).toContain("[attributeKey]: value");
    expect(source).toContain("assignmentRatings={assignmentRatings}");
  });

  it("sorts assignment rows by rating while preserving stable order for ties", () => {
    const sorted = sortAssignmentRatingsForDisplay([
      createAssignment("attackingTactical", "Attacking Tactical", 3),
      createAssignment("attackingTechnical", "Attacking Technical", 3),
      createAssignment("fitness", "Fitness", 4)
    ]).map(({ assignment }) => assignment.label);

    expect(sorted).toEqual([
      "Fitness",
      "Attacking Tactical",
      "Attacking Technical"
    ]);
  });

  it("renders attacking preset with attacking roles rising in the live table", () => {
    const html = renderAssignmentTable(getPresetRatings("Try attacking coach"));

    expect(html).toContain("Full rating table for the current coach profile.");
    expect(html.indexOf("Attacking Tactical")).toBeLessThan(
      html.indexOf("Fitness")
    );
    expect(html).toContain("Attacking Tactical, 4.0 stars");
    expect(html).not.toContain("Attacking Tactical, 3.0 stars");
  });

  it("renders fitness preset with Fitness rising in the live table", () => {
    const html = renderAssignmentTable(getPresetRatings("Try fitness coach"));

    expect(html.indexOf("Fitness")).toBeLessThan(
      html.indexOf("Attacking Tactical")
    );
    expect(html).toContain("Fitness, 4.5 stars");
    expect(html).not.toContain("Fitness, 3.0 stars");
  });

  it("renders set pieces preset with Set Pieces rising in the live table", () => {
    const html = renderAssignmentTable(getPresetRatings("Try set pieces coach"));

    expect(html.indexOf("Set Pieces")).toBeLessThan(
      html.indexOf("Attacking Tactical")
    );
    expect(html).toContain("Set Pieces, ");
    expect(html).not.toContain("Set Pieces, 3.0 stars");
  });

  it("renders reset/default values after returning to default selections", () => {
    const html = renderAssignmentTable(
      calculateAssignmentRatings(createDefaultSelections()),
      true
    );

    expect(html).toContain("Attacking Tactical, 3.0 stars");
    expect(html).toContain(
      "Default values shown. Choose a preset or enter a coach&#x27;s attributes to see meaningful differences."
    );
  });
});
