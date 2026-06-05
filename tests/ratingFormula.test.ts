import { describe, expect, it } from "vitest";
import {
  type AttributeSelections,
  allAttributes,
  createDefaultSelections
} from "@/lib/attributeLevels";
import {
  calculateAssignmentRatings,
  calculateRating,
  getRecommendedAssignments
} from "@/lib/ratingFormula";
import { trainingCategories } from "@/lib/trainingCategories";

const createSelections = (
  level: AttributeSelections[keyof AttributeSelections]
) =>
  Object.fromEntries(
    allAttributes.map((attribute) => [attribute.key, level])
  ) as AttributeSelections;

type ExpectedStars = Partial<Record<string, number>>;

const expectStarsToMatch = (
  selections: AttributeSelections,
  expected: ExpectedStars,
  context: string
) => {
  const mismatches: string[] = [];

  for (const [assignmentId, stars] of Object.entries(expected)) {
    const actualStars = calculateRating(assignmentId, selections).stars;

    if (actualStars !== stars) {
      mismatches.push(`${context} ${assignmentId}: expected ${stars}, got ${actualStars}`);
    }
  }

  expect(mismatches).toEqual([]);
};

const assignmentIds = [
  "defendingTechnical",
  "defendingTactical",
  "possessionTactical",
  "possessionTechnical",
  "attackingTechnical",
  "attackingTactical",
  "goalkeeping",
  "fitness",
  "setPieces"
] as const;

const expectAssignmentStars = (
  selections: AttributeSelections,
  expectedStars: number[],
  context: string
) => {
  expectStarsToMatch(
    selections,
    Object.fromEntries(
      assignmentIds.map((assignmentId, index) => [
        assignmentId,
        expectedStars[index]
      ])
    ),
    context
  );
};

describe("calculateRating", () => {
  it("uses the real FM26 coach assignment categories only", () => {
    expect(trainingCategories.map((category) => category.label)).toEqual([
      "Attacking Tactical",
      "Attacking Technical",
      "Defending Tactical",
      "Defending Technical",
      "Possession Tactical",
      "Possession Technical",
      "Goalkeeping",
      "Fitness",
      "Set Pieces"
    ]);
  });

  it("keeps an average coach around the middle of the assignment scale", () => {
    const result = calculateRating("attackingTactical", createDefaultSelections());

    expect(result.score).toBeGreaterThanOrEqual(50);
    expect(result.score).toBeLessThanOrEqual(55);
    expect(result.stars).toBe(3);
    expect(result.range.minStars).toBeLessThanOrEqual(result.range.maxStars);
  });

  it("matches black-box FM26 calculator probes around average profiles", () => {
    const attackingMainProbe = createDefaultSelections();
    attackingMainProbe.attacking = "elite";

    const attackingSupportProbe = createDefaultSelections();
    attackingSupportProbe.technical = "elite";

    const fitnessMainProbe = createDefaultSelections();
    fitnessMainProbe.fitness = "elite";

    const goalkeepingMainProbe = createDefaultSelections();
    goalkeepingMainProbe.goalkeeping = "elite";

    expect(calculateRating("attackingTechnical", attackingMainProbe).stars).toBe(4);
    expect(calculateRating("attackingTechnical", attackingSupportProbe).stars).toBe(
      3.5
    );
    expect(calculateRating("fitness", fitnessMainProbe).stars).toBe(4.5);
    expect(calculateRating("goalkeeping", goalkeepingMainProbe).stars).toBe(4.5);
  });

  it("treats mental attributes mostly as support around average profiles", () => {
    const authorityElite = createDefaultSelections();
    authorityElite.discipline = "elite";

    const authorityLow = createDefaultSelections();
    authorityLow.discipline = "unsuited";

    const motivationElite = createDefaultSelections();
    motivationElite.motivating = "elite";

    expect(calculateRating("attackingTechnical", authorityElite).stars).toBe(3);
    expect(calculateRating("attackingTechnical", motivationElite).stars).toBe(3);
    expect(calculateRating("attackingTechnical", authorityLow).stars).toBe(2.5);
    expect(calculateRating("fitness", authorityLow).stars).toBe(2.5);
  });

  it("returns a top assignment rating when every relevant attribute is elite", () => {
    const result = calculateRating("attackingTechnical", createSelections("elite"));

    expect(result.score).toBe(100);
    expect(result.stars).toBeGreaterThanOrEqual(4.5);
    expect(result.stars).toBeLessThanOrEqual(5);
    expect(result.label).toBe("Elite");
  });

  it("returns a low assignment rating when every relevant attribute is unsuited", () => {
    const result = calculateRating("defendingTactical", createSelections("unsuited"));

    expect(result.score).toBeLessThanOrEqual(15);
    expect(result.stars).toBe(0.5);
    expect(result.label).toBe("Weak");
  });

  it("keeps score and stars inside their display bounds", () => {
    for (const category of trainingCategories) {
      const eliteResult = calculateRating(category.id, createSelections("elite"));
      const unsuitedResult = calculateRating(
        category.id,
        createSelections("unsuited")
      );

      for (const result of [eliteResult, unsuitedResult]) {
        expect(result.score).toBeGreaterThanOrEqual(0);
        expect(result.score).toBeLessThanOrEqual(100);
        expect(result.stars).toBeGreaterThanOrEqual(0.5);
        expect(result.stars).toBeLessThanOrEqual(5);
        expect(result.range.minStars).toBeLessThanOrEqual(result.range.maxStars);
      }
    }
  });

  it("calculates every assignment and returns influential attributes", () => {
    const ratings = calculateAssignmentRatings(createDefaultSelections());

    expect(ratings).toHaveLength(9);

    for (const assignment of ratings) {
      expect(assignment.score).toBeGreaterThanOrEqual(0);
      expect(assignment.influentialAttributes.length).toBeGreaterThan(0);
      expect(assignment.keyAttributes.length).toBeGreaterThan(0);
    }
  });

  it("ignores legacy staff params for main assignment stars", () => {
    const baseSelections = createDefaultSelections();
    baseSelections.attacking = "good";
    baseSelections.defending = "competent";
    baseSelections.fitness = "very-good";
    baseSelections.goalkeeping = "reasonable";
    baseSelections.possession = "outstanding";
    baseSelections.setPieces = "elite";
    baseSelections.tactical = "good";
    baseSelections.technical = "very-good";
    baseSelections.discipline = "good";
    baseSelections.determination = "competent";
    baseSelections.motivating = "outstanding";

    const controlRatings = calculateAssignmentRatings(baseSelections);
    const controlRecommendations = getRecommendedAssignments(baseSelections, 3);

    const legacySelections = {
      ...baseSelections,
      tacticalKnowledge: "elite",
      workingWithYoungsters: "unsuited"
    };

    expect(calculateAssignmentRatings(legacySelections)).toEqual(controlRatings);
    expect(getRecommendedAssignments(legacySelections, 3)).toEqual(
      controlRecommendations
    );

    for (const assignmentId of assignmentIds) {
      expect(calculateRating(assignmentId, legacySelections)).toEqual(
        calculateRating(assignmentId, baseSelections)
      );
    }
  });

  it("falls back safely for unknown categories and missing selections", () => {
    const result = calculateRating("made-up-category", {});

    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
    expect(result.stars).toBeGreaterThanOrEqual(0.5);
    expect(result.stars).toBeLessThanOrEqual(5);
    expect(result.influentialAttributes.length).toBeGreaterThan(0);
  });

  it("recommends the strongest matching assignment first", () => {
    const selections = createSelections("unsuited");
    selections.possession = "elite";
    selections.technical = "elite";
    selections.determination = "good";
    selections.discipline = "good";
    selections.motivating = "good";

    const [bestAssignment] = getRecommendedAssignments(selections, 3);

    expect(bestAssignment.label).toBe("Possession Technical");
  });

  it("keeps obvious specialist profiles pointed at their assignment", () => {
    const setPieceSpecialist = createDefaultSelections();
    setPieceSpecialist.setPieces = "elite";
    setPieceSpecialist.technical = "outstanding";
    setPieceSpecialist.determination = "very-good";
    setPieceSpecialist.motivating = "very-good";

    const goalkeeperSpecialist = createDefaultSelections();
    goalkeeperSpecialist.goalkeeping = "elite";
    goalkeeperSpecialist.determination = "very-good";
    goalkeeperSpecialist.motivating = "very-good";

    expect(getRecommendedAssignments(setPieceSpecialist, 1)[0]?.label).toBe(
      "Set Pieces"
    );
    expect(getRecommendedAssignments(goalkeeperSpecialist, 1)[0]?.label).toBe(
      "Goalkeeping"
    );
  });

  it("tracks screenshot-calibrated set piece specialist bands", () => {
    const mixedCoach = createDefaultSelections();
    mixedCoach.setPieces = "average";
    mixedCoach.tactical = "competent";
    mixedCoach.technical = "very-good";
    mixedCoach.determination = "average";
    mixedCoach.motivating = "outstanding";

    const setPieceLead = createDefaultSelections();
    setPieceLead.setPieces = "elite";
    setPieceLead.tactical = "good";
    setPieceLead.technical = "average";
    setPieceLead.determination = "competent";
    setPieceLead.motivating = "unsuited";

    const maxedSetPieceLead = createSelections("unsuited");
    maxedSetPieceLead.setPieces = "elite";
    maxedSetPieceLead.technical = "elite";
    maxedSetPieceLead.determination = "elite";
    maxedSetPieceLead.discipline = "elite";
    maxedSetPieceLead.motivating = "elite";

    expect(calculateRating("setPieces", mixedCoach).stars).toBe(3);
    expect(calculateRating("setPieces", setPieceLead).stars).toBe(3.5);
    expect(calculateRating("setPieces", maxedSetPieceLead).stars).toBe(5);
  });

  it("matches the core FM Scout calibration references", () => {
    expectAssignmentStars(createSelections("average"), [3, 3, 3, 3, 3, 3, 3, 3, 3], "all average");
    expectAssignmentStars(
      createSelections("good"),
      [3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5],
      "all good"
    );
    expectAssignmentStars(
      createSelections("very-good"),
      [4, 4, 4.5, 4.5, 4, 4, 4, 4, 4],
      "all very good"
    );
    expectAssignmentStars(createSelections("outstanding"), [5, 5, 5, 5, 5, 5, 5, 5, 5], "all outstanding");
    expectAssignmentStars(createSelections("elite"), [5, 5, 5, 5, 5, 5, 5, 5, 5], "all elite");

    const attackingTactical = createDefaultSelections();
    attackingTactical.attacking = "elite";
    attackingTactical.tactical = "elite";
    attackingTactical.technical = "unsuited";
    expect(calculateRating("attackingTactical", attackingTactical).stars).toBe(4.5);

    const attackingTechnical = createDefaultSelections();
    attackingTechnical.attacking = "elite";
    attackingTechnical.technical = "elite";
    attackingTechnical.tactical = "unsuited";
    expect(calculateRating("attackingTechnical", attackingTechnical).stars).toBe(4.5);

    const setPiecesWithGoodSupport = createDefaultSelections();
    setPiecesWithGoodSupport.setPieces = "elite";
    setPiecesWithGoodSupport.tactical = "good";
    setPiecesWithGoodSupport.technical = "good";
    expect(calculateRating("setPieces", setPiecesWithGoodSupport).stars).toBe(4);

    const setPiecesWithAverageSupport = createDefaultSelections();
    setPiecesWithAverageSupport.setPieces = "elite";
    setPiecesWithAverageSupport.tactical = "average";
    setPiecesWithAverageSupport.technical = "average";
    expect(calculateRating("setPieces", setPiecesWithAverageSupport).stars).toBe(4);
  });

  it("matches FM Scout single-attribute sweeps from an average profile", () => {
    const levels = [
      "unsuited",
      "reasonable",
      "competent",
      "average",
      "good",
      "very-good",
      "outstanding",
      "elite"
    ] as const;
    const baseExpected = {
      attackingTactical: 3,
      attackingTechnical: 3,
      defendingTactical: 3,
      defendingTechnical: 3,
      possessionTactical: 3,
      possessionTechnical: 3,
      goalkeeping: 3,
      fitness: 3,
      setPieces: 3
    };
    const sweepCases: Array<{
      key: keyof AttributeSelections;
      expectedByLevel: ExpectedStars[];
    }> = [
      {
        key: "attacking",
        expectedByLevel: [2, 2, 2.5, 3, 3, 3.5, 3.5, 4].map((stars) => ({
          attackingTactical: stars,
          attackingTechnical: stars
        }))
      },
      {
        key: "defending",
        expectedByLevel: [2, 2, 2.5, 3, 3, 3.5, 3.5, 4].map((stars) => ({
          defendingTactical: stars,
          defendingTechnical: stars
        }))
      },
      {
        key: "possession",
        expectedByLevel: [2, 2.5, 2.5, 3, 3, 3.5, 3.5, 4].map(
          (stars) => ({
            possessionTactical: stars,
            possessionTechnical: stars
          })
        )
      },
      {
        key: "setPieces",
        expectedByLevel: [2, 2, 2.5, 3, 3, 3.5, 3.5, 4].map((stars) => ({
          setPieces: stars
        }))
      },
      {
        key: "fitness",
        expectedByLevel: [1.5, 2, 2.5, 3, 3, 3.5, 4, 4.5].map((stars) => ({
          fitness: stars
        }))
      },
      {
        key: "goalkeeping",
        expectedByLevel: [1.5, 2, 2.5, 3, 3, 3.5, 4, 4.5].map((stars) => ({
          goalkeeping: stars
        }))
      },
      {
        key: "tactical",
        expectedByLevel: [
          { attackingTactical: 2.5, defendingTactical: 2.5, possessionTactical: 2 },
          { attackingTactical: 2.5, defendingTactical: 2.5, possessionTactical: 2.5 },
          { attackingTactical: 2.5, defendingTactical: 2.5, possessionTactical: 2.5 },
          { attackingTactical: 3, defendingTactical: 3, possessionTactical: 3 },
          { attackingTactical: 3, defendingTactical: 3, possessionTactical: 3 },
          { attackingTactical: 3, defendingTactical: 3, possessionTactical: 3 },
          { attackingTactical: 3, defendingTactical: 3, possessionTactical: 3.5 },
          { attackingTactical: 3.5, defendingTactical: 3.5, possessionTactical: 3.5 }
        ]
      },
      {
        key: "technical",
        expectedByLevel: [
          { attackingTechnical: 2.5, defendingTechnical: 2.5, possessionTechnical: 2.5 },
          { attackingTechnical: 2.5, defendingTechnical: 2.5, possessionTechnical: 2.5 },
          { attackingTechnical: 2.5, defendingTechnical: 2.5, possessionTechnical: 3 },
          { attackingTechnical: 3, defendingTechnical: 3, possessionTechnical: 3 },
          { attackingTechnical: 3, defendingTechnical: 3, possessionTechnical: 3 },
          { attackingTechnical: 3, defendingTechnical: 3, possessionTechnical: 3 },
          { attackingTechnical: 3, defendingTechnical: 3, possessionTechnical: 3.5 },
          { attackingTechnical: 3.5, defendingTechnical: 3.5, possessionTechnical: 3.5 }
        ]
      }
    ];

    for (const sweepCase of sweepCases) {
      for (const [levelIndex, level] of levels.entries()) {
        const selections = createDefaultSelections();
        selections[sweepCase.key] = level;

        expectStarsToMatch(
          selections,
          { ...baseExpected, ...sweepCase.expectedByLevel[levelIndex] },
          `${String(sweepCase.key)} ${level}`
        );
      }
    }
  });

  it("matches FM Scout mental support probes", () => {
    const eliteMental = createDefaultSelections();
    eliteMental.discipline = "elite";
    eliteMental.determination = "elite";
    eliteMental.motivating = "elite";

    expectStarsToMatch(
      eliteMental,
      {
        attackingTactical: 4,
        attackingTechnical: 4,
        defendingTactical: 4,
        defendingTechnical: 4,
        possessionTactical: 4,
        possessionTechnical: 4,
        goalkeeping: 4,
        fitness: 4,
        setPieces: 4
      },
      "elite mental average profile"
    );
  });

  it("matches the provided FM26 calculator screenshots", () => {
    const screenshotProfiles: Array<{
      selections: AttributeSelections;
      expected: Partial<Record<string, number>>;
    }> = [
      {
        selections: {
          ...createDefaultSelections(),
          discipline: "reasonable",
          determination: "average",
          motivating: "outstanding",
          attacking: "very-good",
          defending: "average",
          fitness: "good",
          goalkeeping: "good",
          possession: "outstanding",
          setPieces: "average",
          tactical: "competent",
          technical: "very-good"
        },
        expected: {
          attackingTactical: 3,
          attackingTechnical: 3.5,
          defendingTactical: 2.5,
          defendingTechnical: 3,
          possessionTactical: 3.5,
          possessionTechnical: 4,
          goalkeeping: 3,
          fitness: 3,
          setPieces: 3
        }
      },
      {
        selections: {
          ...createDefaultSelections(),
          discipline: "average",
          determination: "competent",
          motivating: "unsuited",
          attacking: "good",
          defending: "competent",
          fitness: "competent",
          goalkeeping: "reasonable",
          possession: "very-good",
          setPieces: "elite",
          tactical: "good",
          technical: "average"
        },
        expected: {
          attackingTactical: 2.5,
          attackingTechnical: 2.5,
          defendingTactical: 2,
          defendingTechnical: 2,
          possessionTactical: 3,
          possessionTechnical: 3,
          goalkeeping: 1.5,
          fitness: 2,
          setPieces: 3.5
        }
      },
      {
        selections: {
          ...createSelections("unsuited"),
          setPieces: "elite",
          technical: "elite"
        },
        expected: {
          attackingTactical: 0.5,
          attackingTechnical: 1.5,
          defendingTactical: 0.5,
          defendingTechnical: 1.5,
          possessionTactical: 0.5,
          possessionTechnical: 1.5,
          goalkeeping: 0.5,
          fitness: 0.5,
          setPieces: 3
        }
      },
      {
        selections: {
          ...createDefaultSelections(),
          attacking: "unsuited",
          defending: "unsuited",
          fitness: "unsuited",
          goalkeeping: "unsuited",
          possession: "unsuited",
          setPieces: "elite",
          tactical: "unsuited",
          technical: "elite"
        },
        expected: {
          attackingTactical: 1.5,
          attackingTechnical: 2.5,
          defendingTactical: 1.5,
          defendingTechnical: 2.5,
          possessionTactical: 1.5,
          possessionTechnical: 2.5,
          goalkeeping: 1.5,
          fitness: 1.5,
          setPieces: 4
        }
      },
      {
        selections: {
          ...createSelections("unsuited"),
          discipline: "elite",
          determination: "elite",
          motivating: "elite",
          setPieces: "elite",
          technical: "elite"
        },
        expected: {
          attackingTactical: 2.5,
          attackingTechnical: 3.5,
          defendingTactical: 2.5,
          defendingTechnical: 3.5,
          possessionTactical: 2.5,
          possessionTechnical: 3.5,
          goalkeeping: 2.5,
          fitness: 2.5,
          setPieces: 5
        }
      },
      {
        selections: {
          ...createDefaultSelections(),
          discipline: "reasonable",
          determination: "competent",
          motivating: "unsuited",
          attacking: "good",
          defending: "good",
          fitness: "reasonable",
          goalkeeping: "very-good",
          possession: "competent",
          setPieces: "outstanding",
          tactical: "competent",
          technical: "competent"
        },
        expected: {
          attackingTactical: 2,
          attackingTechnical: 2,
          defendingTactical: 2,
          defendingTechnical: 2,
          possessionTactical: 2,
          possessionTechnical: 2,
          goalkeeping: 3,
          fitness: 1.5,
          setPieces: 3
        }
      },
      {
        selections: {
          ...createDefaultSelections(),
          discipline: "reasonable",
          determination: "competent",
          motivating: "unsuited",
          attacking: "outstanding",
          defending: "reasonable",
          fitness: "competent",
          goalkeeping: "good",
          possession: "competent",
          setPieces: "good",
          tactical: "very-good",
          technical: "outstanding"
        },
        expected: {
          attackingTactical: 3,
          attackingTechnical: 3.5,
          defendingTactical: 2,
          defendingTechnical: 2,
          possessionTactical: 2.5,
          possessionTechnical: 2.5,
          goalkeeping: 2.5,
          fitness: 1.5,
          setPieces: 2.5
        }
      },
      {
        selections: {
          ...createDefaultSelections(),
          discipline: "outstanding",
          determination: "very-good",
          motivating: "elite",
          attacking: "elite",
          defending: "unsuited",
          fitness: "average",
          goalkeeping: "reasonable",
          possession: "good",
          setPieces: "reasonable",
          tactical: "good",
          technical: "very-good"
        },
        expected: {
          attackingTactical: 4.5,
          attackingTechnical: 5,
          defendingTactical: 2.5,
          defendingTechnical: 3,
          possessionTactical: 4.5,
          possessionTechnical: 4.5,
          goalkeeping: 2.5,
          fitness: 3.5,
          setPieces: 3
        }
      },
      {
        selections: {
          ...createDefaultSelections(),
          discipline: "competent",
          determination: "reasonable",
          motivating: "outstanding",
          attacking: "good",
          defending: "competent",
          fitness: "good",
          goalkeeping: "reasonable",
          possession: "very-good",
          setPieces: "elite",
          tactical: "very-good",
          technical: "outstanding"
        },
        expected: {
          attackingTactical: 3.5,
          attackingTechnical: 3.5,
          defendingTactical: 2.5,
          defendingTechnical: 3,
          possessionTactical: 4,
          possessionTechnical: 4,
          goalkeeping: 2,
          fitness: 3,
          setPieces: 4
        }
      },
      {
        selections: {
          ...createDefaultSelections(),
          discipline: "unsuited",
          determination: "outstanding",
          motivating: "competent",
          attacking: "average",
          defending: "average",
          fitness: "reasonable",
          goalkeeping: "reasonable",
          possession: "good",
          setPieces: "good",
          tactical: "outstanding",
          technical: "elite"
        },
        expected: {
          attackingTactical: 3,
          attackingTechnical: 3,
          defendingTactical: 3,
          defendingTechnical: 3,
          possessionTactical: 3.5,
          possessionTechnical: 3.5,
          goalkeeping: 1.5,
          fitness: 1.5,
          setPieces: 3
        }
      },
      {
        selections: {
          ...createDefaultSelections(),
          discipline: "very-good",
          determination: "very-good",
          motivating: "elite",
          attacking: "reasonable",
          defending: "very-good",
          fitness: "good",
          goalkeeping: "reasonable",
          possession: "average",
          setPieces: "reasonable",
          tactical: "outstanding",
          technical: "elite"
        },
        expected: {
          attackingTactical: 3,
          attackingTechnical: 3.5,
          defendingTactical: 4.5,
          defendingTechnical: 4.5,
          possessionTactical: 4,
          possessionTechnical: 4,
          goalkeeping: 2.5,
          fitness: 3.5,
          setPieces: 3
        }
      },
      {
        selections: {
          ...createDefaultSelections(),
          discipline: "elite",
          determination: "outstanding",
          motivating: "elite",
          attacking: "elite",
          defending: "elite",
          fitness: "reasonable",
          goalkeeping: "reasonable",
          possession: "competent",
          setPieces: "good",
          tactical: "good",
          technical: "outstanding"
        },
        expected: {
          attackingTactical: 5,
          attackingTechnical: 5,
          defendingTactical: 5,
          defendingTechnical: 5,
          possessionTactical: 4,
          possessionTechnical: 4,
          goalkeeping: 3,
          fitness: 3,
          setPieces: 4.5
        }
      },
      {
        selections: {
          ...createDefaultSelections(),
          discipline: "very-good",
          determination: "very-good",
          motivating: "good",
          attacking: "average",
          defending: "average",
          fitness: "very-good",
          goalkeeping: "unsuited",
          possession: "very-good",
          setPieces: "very-good",
          tactical: "good",
          technical: "competent"
        },
        expected: {
          attackingTactical: 3.5,
          attackingTechnical: 3,
          defendingTactical: 3.5,
          defendingTechnical: 3,
          possessionTactical: 4,
          possessionTechnical: 4,
          goalkeeping: 2,
          fitness: 4,
          setPieces: 3.5
        }
      },
      {
        selections: {
          ...createDefaultSelections(),
          discipline: "very-good",
          determination: "very-good",
          motivating: "good",
          attacking: "average",
          defending: "average",
          fitness: "very-good",
          goalkeeping: "unsuited",
          possession: "very-good",
          setPieces: "very-good",
          tactical: "good",
          technical: "competent"
        },
        expected: {
          attackingTactical: 3.5,
          attackingTechnical: 3,
          defendingTactical: 3.5,
          defendingTechnical: 3,
          possessionTactical: 4,
          possessionTechnical: 4,
          goalkeeping: 2,
          fitness: 4,
          setPieces: 3.5
        }
      },
      {
        selections: {
          ...createDefaultSelections(),
          discipline: "average",
          determination: "reasonable",
          motivating: "outstanding",
          attacking: "reasonable",
          defending: "reasonable",
          fitness: "competent",
          goalkeeping: "very-good",
          possession: "reasonable",
          setPieces: "average",
          tactical: "average",
          technical: "good"
        },
        expected: {
          attackingTactical: 2,
          attackingTechnical: 2.5,
          defendingTactical: 2,
          defendingTechnical: 2.5,
          possessionTactical: 2.5,
          possessionTechnical: 2.5,
          goalkeeping: 3.5,
          fitness: 2.5,
          setPieces: 3
        }
      }
    ];

    const mismatches: string[] = [];

    for (const [profileIndex, profile] of screenshotProfiles.entries()) {
      for (const [assignmentId, stars] of Object.entries(profile.expected)) {
        const actualStars = calculateRating(assignmentId, profile.selections).stars;

        if (actualStars !== stars) {
          mismatches.push(
            `profile ${profileIndex + 1} ${assignmentId}: expected ${stars}, got ${actualStars}`
          );
        }
      }
    }

    expect(mismatches).toEqual([]);
  });
});
