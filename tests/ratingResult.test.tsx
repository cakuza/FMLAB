import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  RatingResult,
  shouldShowWeakestFit
} from "@/components/RatingResult";
import { createDefaultSelections } from "@/lib/attributeLevels";
import type { AssignmentRating } from "@/lib/ratingFormula";
import {
  calculateAssignmentRatings,
  getRecommendedAssignments
} from "@/lib/ratingFormula";
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

describe("RatingResult verdict display", () => {
  it("does not show a weakest assignment for the real homepage default state", () => {
    const defaultSelections = createDefaultSelections();
    const assignmentRatings = calculateAssignmentRatings(defaultSelections);
    const recommendedAssignments = getRecommendedAssignments(
      defaultSelections,
      3
    );

    expect(
      assignmentRatings.every(
        (assignment) => assignment.stars === assignmentRatings[0]?.stars
      )
    ).toBe(true);

    const html = renderToStaticMarkup(
      React.createElement(RatingResult, {
        assignmentRatings,
        isDefaultProfile: true,
        recommendedAssignments,
        selectedAssignmentId: defaultTrainingCategoryId
      })
    );

    expect(html).not.toContain("Weakest current fit");
    expect(html).not.toContain("Attacking Tactical");
    expect(html).toContain(
      "Choose a preset or enter a coach&#x27;s attributes to see his assignment ratings."
    );
  });

  it("only shows the weakest fit when the gap is meaningful and the assignment differs", () => {
    expect(
      shouldShowWeakestFit(
        createAssignment("attackingTactical", "Attacking Tactical", 3),
        createAssignment("attackingTactical", "Attacking Tactical", 2)
      )
    ).toBe(false);
    expect(
      shouldShowWeakestFit(
        createAssignment("attackingTactical", "Attacking Tactical", 3),
        createAssignment("fitness", "Fitness", 2.5)
      )
    ).toBe(true);
    expect(
      shouldShowWeakestFit(
        createAssignment("attackingTactical", "Attacking Tactical", 3),
        createAssignment("fitness", "Fitness", 3)
      )
    ).toBe(false);
  });
});
