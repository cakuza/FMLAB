import React from "react";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  RatingResult,
  sortAssignmentRatingsForDisplay
} from "@/components/RatingResult";
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

describe("RatingResult assignment table display", () => {
  it("shows all 9 assignment ratings in the real homepage default state", () => {
    const defaultSelections = createDefaultSelections();
    const assignmentRatings = calculateAssignmentRatings(defaultSelections);

    expect(
      assignmentRatings.every(
        (assignment) => assignment.stars === assignmentRatings[0]?.stars
      )
    ).toBe(true);

    const html = renderToStaticMarkup(
      React.createElement(RatingResult, {
        assignmentRatings,
        isDefaultProfile: true,
        selectedAssignmentId: defaultTrainingCategoryId
      })
    );

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
    expect(source).toContain("StarRating");
    expect(source).not.toContain("Key attributes");
    expect(source).not.toContain("Range</th>");
    expect(source).not.toContain("formatRange");
    expect(source).not.toContain("Top Assignment Fits");
    expect(source).not.toContain("Copy result");
    expect(source).not.toContain("formatCopyText");
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
});
