import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  formatCopyText,
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
      "Start with a preset, then adjust the word levels to match the coach you are checking."
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

  it("formats copy text as a concise coach assignment result", () => {
    const text = formatCopyText(
      createAssignment("attackingTactical", "Attacking Tactical", 4),
      [
        createAssignment("attackingTechnical", "Attacking Technical", 3.5),
        createAssignment("possessionTactical", "Possession Tactical", 3.5)
      ],
      "Worth prioritizing for this training role."
    );

    expect(text).toContain("FM Lab Coach Assignment");
    expect(text).toContain("Best use: Attacking Tactical - 4.0 stars");
    expect(text).toContain(
      "Also useful: Attacking Technical - 3.5, Possession Tactical - 3.5"
    );
    expect(text).toContain(
      "Decision: Worth prioritizing for this training role."
    );
    expect(text).toContain("Note: estimated for quick coach comparison.");
  });
});
