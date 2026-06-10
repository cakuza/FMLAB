"use client";

import React, { useMemo } from "react";
import type { AssignmentRating } from "@/lib/ratingFormula";
import { getRatingInfo } from "@/lib/ratingLabels";
import { StarRating } from "./StarRating";

type Props = {
  assignmentRatings: AssignmentRating[];
  isDefaultProfile?: boolean;
  selectedAssignmentId: string;
  onSelectAssignment?: (id: string) => void;
  compact?: boolean;
};

export const sortAssignmentRatingsForDisplay = (
  ratings: AssignmentRating[]
) =>
  ratings
    .map((assignment, index) => ({ assignment, index }))
    .sort(
      (a, b) =>
        b.assignment.stars - a.assignment.stars ||
        b.assignment.score - a.assignment.score ||
        a.index - b.index
    );

function ResultCard({
  rating,
  bestRating,
  isDefault
}: {
  rating: AssignmentRating;
  bestRating: AssignmentRating;
  isDefault: boolean;
}) {
  const info = getRatingInfo(rating.score);
  const isBest = bestRating.id === rating.id;

  return (
    <div className="result-card">
      <div className="rc-header">
        <div>
          <span className="rc-category-tag">Selected Assignment</span>
          <h2 className="rc-assignment-name">{rating.label}</h2>
        </div>
        {isBest && <span className="rc-best-badge">Best Fit</span>}
      </div>

      {isDefault ? (
        <div className="rc-default-msg">
          <p>Enter a coach&apos;s attributes to see their estimated rating.</p>
        </div>
      ) : (
        <>
          <div className="rc-stars-row">
            <StarRating value={rating.stars} size={28} />
            <div className="rc-stars-meta">
              <span className="rc-stars-value">{rating.stars.toFixed(1)}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: info.color, whiteSpace: "nowrap" }}>
                {info.label}
              </span>
            </div>
          </div>

          <div className="rc-range">
            <span className="rc-range-label">Est. range</span>
            <span className="rc-range-value">
              {rating.range.minStars.toFixed(1)} – {rating.range.maxStars.toFixed(1)} ★
            </span>
          </div>

          <div className="rc-attrs">
            <div className="rc-attrs-title">Key attributes</div>
            {rating.influentialAttributes.map((attr) => (
              <div key={attr.key} className="rc-attr-row">
                <span className="rc-attr-name">{attr.label}</span>
                <div className="rc-attr-bar-wrap">
                  <div
                    className="rc-attr-bar"
                    style={{ width: `${(attr.weight * 100).toFixed(0)}%` }}
                  />
                </div>
                <span className="rc-attr-pct">{(attr.weight * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>

          {!isBest && (
            <div className="rc-best-note">
              <span className="rc-best-note-label">Best fit:</span>
              <strong className="rc-best-note-name">{bestRating.label}</strong>
              <StarRating value={bestRating.stars} size={11} />
            </div>
          )}

          <div className="rc-tip">
            <span className="rc-tip-icon">›</span>
            <span className="rc-tip-text">{rating.improvementTip}</span>
          </div>
        </>
      )}
    </div>
  );
}

function TopAssignments({
  ratings,
  selectedId,
  onSelect
}: {
  ratings: AssignmentRating[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const top3 = ratings.slice(0, 3);
  return (
    <div className="top-assignments">
      <div className="section-label">Top Assignments</div>
      {top3.map((r, i) => {
        const info = getRatingInfo(r.score);
        return (
          <button
            key={r.id}
            className={`top-asgn-row${r.id === selectedId ? " selected" : ""}`}
            onClick={() => onSelect(r.id)}
            type="button"
          >
            <span className="top-asgn-rank">{i + 1}</span>
            <span className="top-asgn-name">{r.label}</span>
            <StarRating value={r.stars} size={13} />
            <span className="top-asgn-label" style={{ color: info.color }}>{info.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function AllRatingsTable({
  ratings,
  selectedId,
  onSelect
}: {
  ratings: AssignmentRating[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="ratings-table-wrap">
      <div className="section-label">All Assignment Ratings</div>
      <table className="ratings-table">
        <thead>
          <tr>
            <th className="rt-rank">#</th>
            <th className="rt-name">Assignment</th>
            <th className="rt-stars">Rating</th>
            <th className="rt-label">Quality</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map((r, i) => {
            const info = getRatingInfo(r.score);
            return (
              <tr
                key={r.id}
                className={`rt-row${r.id === selectedId ? " selected" : ""}`}
                onClick={() => onSelect(r.id)}
              >
                <td className="rt-rank">{i === 0 ? "★" : i + 1}</td>
                <td className="rt-name">{r.label}</td>
                <td
                  className="rt-stars"
                  aria-label={`${r.label}, ${r.stars.toFixed(1)} stars`}
                >
                  <StarRating value={r.stars} size={13} />
                </td>
                <td className="rt-label" style={{ color: info.color }}>{info.label}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="rt-note">
        Ratings are approximations. In-game stars may differ if a coach covers multiple roles or workload is high.
      </p>
    </div>
  );
}

function StarLegend() {
  const rows = [
    { stars: "4.5 – 5.0", desc: "Elite assignment fit" },
    { stars: "4.0 – 4.5", desc: "Strong specialist" },
    { stars: "3.0 – 4.0", desc: "Useful club option" },
    { stars: "2.0 – 3.0", desc: "Backup / depth" },
    { stars: "< 2.0", desc: "Weak fit" }
  ];
  return (
    <div className="star-legend">
      <div className="section-label" style={{ marginBottom: 8 }}>What do the stars mean?</div>
      {rows.map((r) => (
        <div key={r.stars} className="sl-row">
          <span className="sl-stars">{r.stars}</span>
          <span className="sl-desc">{r.desc}</span>
        </div>
      ))}
    </div>
  );
}

export function RatingResult({
  assignmentRatings,
  isDefaultProfile = false,
  selectedAssignmentId,
  onSelectAssignment = () => {},
  compact = false
}: Props) {
  const sorted = useMemo(
    () => sortAssignmentRatingsForDisplay(assignmentRatings).map(({ assignment }) => assignment),
    [assignmentRatings]
  );
  const selected = assignmentRatings.find((r) => r.id === selectedAssignmentId) ?? assignmentRatings[0];
  const best = sorted[0];

  if (!selected || !best) return null;

  if (compact) {
    return (
      <div className="result-panel">
        <ResultCard rating={selected} bestRating={best} isDefault={isDefaultProfile} />
      </div>
    );
  }

  return (
    <div className="result-panel">
      <ResultCard rating={selected} bestRating={best} isDefault={isDefaultProfile} />
      <TopAssignments ratings={sorted} selectedId={selectedAssignmentId} onSelect={onSelectAssignment} />
      <AllRatingsTable ratings={sorted} selectedId={selectedAssignmentId} onSelect={onSelectAssignment} />
      <StarLegend />
    </div>
  );
}
