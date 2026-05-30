"use client";

import { useMemo, useState } from "react";
import { AttributeSelect } from "@/components/AttributeSelect";
import { CategorySelect } from "@/components/CategorySelect";
import { RatingResult } from "@/components/RatingResult";
import {
  type AttributeKey,
  type AttributeLevelId,
  allAttributes,
  coachingAttributes,
  createDefaultSelections,
  staffQualityAttributes
} from "@/lib/attributeLevels";
import { calculateRating } from "@/lib/ratingFormula";
import {
  type TrainingCategoryId,
  trainingCategoryById
} from "@/lib/trainingCategories";

export function CoachRatingCalculator() {
  const [categoryId, setCategoryId] =
    useState<TrainingCategoryId>("attacking");
  const [selections, setSelections] = useState(createDefaultSelections);

  const result = useMemo(
    () => calculateRating(categoryId, selections),
    [categoryId, selections]
  );
  const category = trainingCategoryById[categoryId];
  const weightedAttributes = useMemo(
    () =>
      (Object.entries(category.weights) as [AttributeKey, number][])
        .filter(([, weight]) => weight > 0)
        .sort((a, b) => b[1] - a[1]),
    [category]
  );
  const primaryWeight = weightedAttributes[0]?.[1] ?? 0;
  const weightedAttributeKeys = new Set(
    weightedAttributes.map(([attributeKey]) => attributeKey)
  );
  const otherAttributes = allAttributes.filter(
    (attribute) => !weightedAttributeKeys.has(attribute.key)
  );

  const updateSelection = (
    attributeKey: AttributeKey,
    value: AttributeLevelId
  ) => {
    setSelections((current) => ({
      ...current,
      [attributeKey]: value
    }));
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section className="order-2 rounded-2xl border border-ink/10 bg-white/80 p-4 shadow-panel sm:p-5 lg:order-1">
        <div className="mb-5 grid gap-4 rounded-xl border border-ink/10 bg-chalk p-4 md:grid-cols-[0.55fr_1fr]">
          <CategorySelect value={categoryId} onChange={setCategoryId} />
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-pitch">
              What this coach needs
            </p>
            <p className="mt-2 leading-7 text-ink/72">
              For <strong className="text-ink">{category.label}</strong>, only
              the highlighted attributes below affect the estimate. Start with
              the gold-outlined primary attribute, then tune the support ones.
            </p>
          </div>
        </div>

        <div>
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-ink">
                Needed for {category.label}
              </h2>
              <p className="mt-1 text-sm leading-6 text-ink/64">
                These are the attributes used for this selected coaching role.
              </p>
            </div>
            <span className="rounded-full bg-ink px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-chalk">
              {weightedAttributes.length} inputs
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {weightedAttributes.map(([attributeKey, weight]) => {
              const attribute = allAttributes.find(
                (item) => item.key === attributeKey
              );

              if (!attribute) {
                return null;
              }

              return (
                <AttributeSelect
                  id={`attribute-${attribute.key}`}
                  key={attribute.key}
                  emphasis={weight === primaryWeight ? "primary" : "support"}
                  label={attribute.label}
                  weight={weight}
                  value={selections[attribute.key]}
                  onChange={(value) => updateSelection(attribute.key, value)}
                />
              );
            })}
          </div>
        </div>

        {otherAttributes.length > 0 ? (
          <details className="mt-5 rounded-lg border border-ink/10 bg-chalk/70 p-4">
            <summary className="cursor-pointer text-sm font-black uppercase tracking-[0.12em] text-ink/72">
              Other attributes not used for {category.label}
            </summary>
            <div className="mt-4 grid gap-5 xl:grid-cols-2">
              <div>
                <h3 className="mb-3 text-base font-black text-ink">
                  Coaching attributes
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {coachingAttributes
                    .filter(
                      (attribute) => !weightedAttributeKeys.has(attribute.key)
                    )
                    .map((attribute) => (
                      <AttributeSelect
                        id={`attribute-${attribute.key}`}
                        key={attribute.key}
                        label={attribute.label}
                        value={selections[attribute.key]}
                        onChange={(value) =>
                          updateSelection(attribute.key, value)
                        }
                      />
                    ))}
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-base font-black text-ink">
                  Mental & staff attributes
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {staffQualityAttributes
                    .filter(
                      (attribute) => !weightedAttributeKeys.has(attribute.key)
                    )
                    .map((attribute) => (
                      <AttributeSelect
                        id={`attribute-${attribute.key}`}
                        key={attribute.key}
                        label={attribute.label}
                        value={selections[attribute.key]}
                        onChange={(value) =>
                          updateSelection(attribute.key, value)
                        }
                      />
                    ))}
                </div>
              </div>
            </div>
          </details>
        ) : null}
      </section>

      <RatingResult
        className="order-1 lg:order-2"
        result={result}
        categoryLabel={category.label}
      />
    </div>
  );
}
