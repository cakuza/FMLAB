import React from "react";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  copyTextWithFallback,
  formatCopyText,
  RatingResult,
  sortAssignmentRatingsForDisplay
} from "@/components/RatingResult";
import { createDefaultSelections } from "@/lib/attributeLevels";
import type { AssignmentRating } from "@/lib/ratingFormula";
import {
  calculateAssignmentRatings
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

describe("RatingResult assignment table display", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

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
    expect(html).toContain("Attacking Tactical");
    expect(html).toContain("Attacking Technical");
    expect(html).toContain("Defending Tactical");
    expect(html).toContain("Defending Technical");
    expect(html).toContain("Possession Tactical");
    expect(html).toContain("Possession Technical");
    expect(html).toContain("Goalkeeping");
    expect(html).toContain("Fitness");
    expect(html).toContain("Set Pieces");
    expect(html).not.toContain("Weakest current fit");
    expect(html).toContain(
      "Default values shown. Choose a preset or enter a coach&#x27;s attributes to see meaningful differences."
    );
  });

  it("formats copy text as a concise coach assignment result", () => {
    const text = formatCopyText(
      [
        createAssignment("attackingTactical", "Attacking Tactical", 4),
        createAssignment("attackingTechnical", "Attacking Technical", 3.5),
        createAssignment("possessionTactical", "Possession Tactical", 3.5)
      ]
    );

    expect(text).toContain("FM Lab Coach Assignment");
    expect(text).toContain("Best current fit: Attacking Tactical — 4.0 stars");
    expect(text).toContain("Top ratings:");
    expect(text).toContain(
      "2. Attacking Technical — 3.5"
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

  it("keeps the right assignment table compact and free of range/key-attribute columns", () => {
    const source = readFileSync(
      "components/RatingResult.tsx",
      "utf8"
    );

    expect(source).toContain("All Assignment Ratings");
    expect(source).toContain("Rating</th>");
    expect(source).not.toContain("Key attributes");
    expect(source).not.toContain("Range</th>");
    expect(source).not.toContain("formatRange");
    expect(source).not.toContain("Top Assignment Fits");
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
