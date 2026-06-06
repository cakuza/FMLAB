import React from "react";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  copyTextWithFallback,
  formatCopyText,
  RatingResult,
  shouldShowWeakestFit
} from "@/components/RatingResult";
import { sortAssignmentRatingsForDisplay } from "@/components/CoachRatingCalculator";
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
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

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
    expect(text).toContain("Best use: Attacking Tactical — 4.0 stars");
    expect(text).toContain(
      "Also useful: Attacking Technical — 3.5, Possession Tactical — 3.5"
    );
    expect(text).toContain(
      "Decision: Worth prioritizing for this training role."
    );
    expect(text).toContain("Note: estimated for quick coach comparison.");
  });

  it("uses the textarea fallback when browser clipboard permissions are not available", async () => {
    const textarea = {
      focus: vi.fn(),
      select: vi.fn(),
      setAttribute: vi.fn(),
      style: {},
      value: ""
    };
    const appendChild = vi.fn();
    const removeChild = vi.fn();
    const execCommand = vi.fn(() => true);
    const writeText = vi.fn();

    vi.stubGlobal("document", {
      body: {
        appendChild,
        removeChild
      },
      createElement: vi.fn(() => textarea),
      execCommand
    });
    vi.stubGlobal("navigator", {
      clipboard: {
        writeText
      }
    });

    await expect(copyTextWithFallback("FM Lab test")).resolves.toBe(true);
    expect(execCommand).toHaveBeenCalledWith("copy");
    expect(writeText).not.toHaveBeenCalled();
    expect(textarea.value).toBe("FM Lab test");
    expect(removeChild).toHaveBeenCalledWith(textarea);
  });

  it("keeps the all assignment table compact and free of range/key-attribute columns", () => {
    const source = readFileSync(
      "components/CoachRatingCalculator.tsx",
      "utf8"
    );

    expect(source).toContain("All Assignment Ratings");
    expect(source).toContain("Rating</th>");
    expect(source).not.toContain("Key attributes");
    expect(source).not.toContain("Range</th>");
    expect(source).not.toContain("formatRange");
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
