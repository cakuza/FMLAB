import { describe, expect, it } from "vitest";
import {
  type AttributeSelections,
  allAttributes,
  createDefaultSelections
} from "@/lib/attributeLevels";
import { calculateRating } from "@/lib/ratingFormula";
import { trainingCategories } from "@/lib/trainingCategories";

const createSelections = (
  level: AttributeSelections[keyof AttributeSelections]
) =>
  Object.fromEntries(
    allAttributes.map((attribute) => [attribute.key, level])
  ) as AttributeSelections;

describe("calculateRating", () => {
  it("keeps an average coach around the middle of the scale", () => {
    const result = calculateRating(
      "generalCoachingQuality",
      createDefaultSelections()
    );

    expect(result.score).toBeGreaterThanOrEqual(50);
    expect(result.score).toBeLessThanOrEqual(55);
    expect(result.stars).toBe(2.5);
    expect(result.range.minStars).toBeLessThanOrEqual(result.range.maxStars);
  });

  it("returns a top rating when every relevant attribute is elite", () => {
    const result = calculateRating("attacking", createSelections("elite"));

    expect(result.score).toBe(100);
    expect(result.stars).toBe(5);
    expect(result.label).toBe("Elite");
  });

  it("returns a low rating when every relevant attribute is unsuited", () => {
    const result = calculateRating("defending", createSelections("unsuited"));

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

  it("calculates every training category and returns influential attributes", () => {
    for (const category of trainingCategories) {
      const result = calculateRating(category.id, createDefaultSelections());

      expect(result.score).toBeGreaterThanOrEqual(0);
      expect(result.influentialAttributes.length).toBeGreaterThan(0);
      expect(result.influentialAttributes[0]?.label).toBeTruthy();
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

  it("uses category weights for influential attributes", () => {
    const result = calculateRating(
      "youthDevelopment",
      createDefaultSelections()
    );

    expect(result.influentialAttributes[0]?.label).toBe(
      "Working With Youngsters"
    );
    expect(result.improvementTip).toContain("Working With Youngsters");
  });
});
