import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  RatingResult,
  shouldShowWeakestFit
} from "@/components/RatingResult";
import type { AssignmentRating } from "@/lib/ratingFormula";

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

const tiedAssignments: AssignmentRating[] = [
  createAssignment("attackingTactical", "Attacking Tactical"),
  createAssignment("attackingTechnical", "Attacking Technical"),
  createAssignment("defendingTactical", "Defending Tactical"),
  createAssignment("defendingTechnical", "Defending Technical"),
  createAssignment("possessionTactical", "Possession Tactical"),
  createAssignment("possessionTechnical", "Possession Technical"),
  createAssignment("goalkeeping", "Goalkeeping"),
  createAssignment("fitness", "Fitness"),
  createAssignment("setPieces", "Set Pieces")
];

describe("RatingResult verdict display", () => {
  it("does not show a weakest assignment when all assignment ratings are tied", () => {
    const html = renderToStaticMarkup(
      React.createElement(RatingResult, {
        assignmentRatings: tiedAssignments,
        recommendedAssignments: tiedAssignments,
        selectedAssignmentId: "attackingTactical"
      })
    );

    expect(html).not.toContain("Weakest current fit");
    expect(html).toContain(
      "No clear weak assignment yet. Change the coach&#x27;s word levels to reveal stronger and weaker fits."
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
