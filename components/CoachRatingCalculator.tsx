"use client";

import React, { useMemo, useState } from "react";
import { AttributeSelect } from "@/components/AttributeSelect";
import { RatingResult } from "@/components/RatingResult";
import { StarRating } from "@/components/StarRating";
import {
  type AttributeKey,
  type AttributeLevelId,
  type AttributeSelections,
  coachingAttributes,
  createDefaultSelections,
  knowledgeAttributes,
  staffQualityAttributes
} from "@/lib/attributeLevels";
import { calculateAssignmentRatings } from "@/lib/ratingFormula";
import {
  type TrainingCategoryId,
  defaultTrainingCategoryId,
  trainingCategoryById
} from "@/lib/trainingCategories";

export const examplePresets: { label: string; selections: AttributeSelections }[] = [
  {
    label: "Attacking Coach",
    selections: {
      ...createDefaultSelections(),
      attacking: "very-good", tactical: "very-good", technical: "good",
      possession: "good", defending: "competent", fitness: "average",
      goalkeeping: "reasonable", setPieces: "average",
      determination: "good", discipline: "good", motivating: "very-good"
    }
  },
  {
    label: "Fitness Specialist",
    selections: {
      ...createDefaultSelections(),
      attacking: "competent", defending: "average", fitness: "outstanding",
      goalkeeping: "reasonable", possession: "average", setPieces: "competent",
      tactical: "average", technical: "average",
      determination: "good", discipline: "good", motivating: "good"
    }
  },
  {
    label: "Set Pieces Coach",
    selections: {
      ...createDefaultSelections(),
      attacking: "average", defending: "average", fitness: "competent",
      goalkeeping: "reasonable", possession: "average", setPieces: "very-good",
      tactical: "good", technical: "good",
      determination: "good", discipline: "good", motivating: "good"
    }
  }
];

const assignmentGroups = [
  { label: "Attacking", ids: ["attackingTactical", "attackingTechnical"] as TrainingCategoryId[] },
  { label: "Defending", ids: ["defendingTactical", "defendingTechnical"] as TrainingCategoryId[] },
  { label: "Possession", ids: ["possessionTactical", "possessionTechnical"] as TrainingCategoryId[] },
  { label: "Specialist", ids: ["goalkeeping", "fitness", "setPieces"] as TrainingCategoryId[] }
];

export function CoachRatingCalculator() {
  const [selections, setSelections] = useState<AttributeSelections>(createDefaultSelections);
  const [selectedId, setSelectedId] = useState<TrainingCategoryId>(defaultTrainingCategoryId);

  const isDefault = useMemo(
    () => Object.values(selections).every((v) => v === "average"),
    [selections]
  );

  const allRatings = useMemo(() => calculateAssignmentRatings(selections), [selections]);

  const ratingMap = useMemo(() => {
    const m: Record<string, (typeof allRatings)[number]> = {};
    allRatings.forEach((r) => { m[r.id] = r; });
    return m;
  }, [allRatings]);

  const selectedAssignment = trainingCategoryById[selectedId];
  const primaryKeys = new Set(selectedAssignment.keyAttributes);

  const getEmphasis = (key: AttributeKey) => {
    if (!selectedAssignment.weights[key]) return "normal" as const;
    return primaryKeys.has(key) ? "primary" as const : "support" as const;
  };

  const updateSelection = (key: AttributeKey, value: AttributeLevelId) =>
    setSelections((prev) => ({ ...prev, [key]: value }));

  const applyPreset = (preset: (typeof examplePresets)[number]) =>
    setSelections({ ...createDefaultSelections(), ...preset.selections });

  const resultProps = {
    assignmentRatings: allRatings,
    isDefaultProfile: isDefault,
    selectedAssignmentId: selectedId,
    onSelectAssignment: (id: string) => setSelectedId(id as TrainingCategoryId)
  };

  return (
    <div className="calc-page">

      {/* Mobile-only: compact result card at top (before selector/inputs) */}
      <div className="mobile-top-result">
        <RatingResult {...resultProps} compact={true} />
      </div>

      {/* Assignment selector — full-width row */}
      <div className="calc-selector-bar">
        <div className="csb-head">
          <span className="csb-label">Assignment</span>
          <span className="csb-sep">·</span>
          <span className="csb-hint">select to highlight relevant inputs</span>
        </div>
        <div className="assignment-selector">
          {assignmentGroups.map((group) => (
            <div key={group.label} className="asgn-group">
              <div className="asgn-group-label">{group.label}</div>
              <div className="asgn-group-tabs">
                {group.ids.map((id) => {
                  const cat = trainingCategoryById[id];
                  const r = ratingMap[id];
                  return (
                    <button
                      key={id}
                      className={`asgn-tab${id === selectedId ? " selected" : ""}`}
                      onClick={() => setSelectedId(id)}
                      type="button"
                    >
                      <span>{cat.shortLabel}</span>
                      {r && (
                        <span className="asgn-tab-stars">
                          <StarRating value={r.stars} size={9} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Attribute inputs — left column on desktop, below selector on mobile */}
      <div className="calc-left">
        <div className="preset-buttons">
          <span className="preset-label">Try a preset:</span>
          {examplePresets.map((p) => (
            <button key={p.label} className="preset-btn" onClick={() => applyPreset(p)} type="button">
              {p.label}
            </button>
          ))}
          <button
            className="preset-btn reset"
            onClick={() => { setSelections(createDefaultSelections()); setSelectedId(defaultTrainingCategoryId); }}
            type="button"
          >
            Reset
          </button>
        </div>

        <div className="attr-section-block">
          <div className="attr-section-head">
            <span className="attr-section-title">Coaching Attributes</span>
            <span className="attr-section-sub">8 attributes from the FM26 coach profile</span>
          </div>
          <div className="attr-grid">
            {coachingAttributes.map((a) => (
              <AttributeSelect
                key={a.key}
                id={`attr-${a.key}`}
                label={a.label}
                value={selections[a.key]}
                emphasis={getEmphasis(a.key)}
                onChange={(v) => updateSelection(a.key, v)}
              />
            ))}
          </div>
        </div>

        <div className="attr-section-block">
          <div className="attr-section-head">
            <span className="attr-section-title">Mental Attributes</span>
            <span className="attr-section-sub">Support all assignments</span>
          </div>
          <div className="attr-grid">
            {staffQualityAttributes.map((a) => (
              <AttributeSelect
                key={a.key}
                id={`attr-${a.key}`}
                label={a.label}
                value={selections[a.key]}
                emphasis={getEmphasis(a.key)}
                onChange={(v) => updateSelection(a.key, v)}
              />
            ))}
          </div>
        </div>

        <div className="attr-section-block">
          <div className="attr-section-head">
            <span className="attr-section-title">Knowledge</span>
            <span className="attr-section-sub">Affects Set Pieces</span>
          </div>
          <div className="attr-grid">
            {knowledgeAttributes.map((a) => (
              <AttributeSelect
                key={a.key}
                id={`attr-${a.key}`}
                label={a.label}
                value={selections[a.key]}
                emphasis={getEmphasis(a.key)}
                onChange={(v) => updateSelection(a.key, v)}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Single result panel — positioned by grid on desktop, flows after inputs on mobile */}
      <div className="calc-result">
        <RatingResult {...resultProps} />
      </div>
    </div>
  );
}
