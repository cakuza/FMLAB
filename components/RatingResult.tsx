"use client";

import React, { useMemo, useState } from "react";
import type { AssignmentRating } from "@/lib/ratingFormula";
import { StarRating } from "./StarRating";

type RatingResultProps = {
  assignmentRatings: AssignmentRating[];
  isDefaultProfile?: boolean;
  recommendedAssignments: AssignmentRating[];
  selectedAssignmentId: string;
  className?: string;
};

const formatRange = (assignment: AssignmentRating) =>
  `${assignment.range.minStars.toFixed(1)}-${assignment.range.maxStars.toFixed(1)}`;

const meaningfulWeakFitGap = 0.5;

const getVerdictTier = (stars: number) => {
  if (stars >= 4.5) {
    return {
      label: "Elite assignment fit",
      meaning: "This coach is likely worth prioritizing for the top assignment."
    };
  }

  if (stars >= 4) {
    return {
      label: "Strong specialist",
      meaning: "This coach is likely worth prioritizing for that assignment."
    };
  }

  if (stars >= 3) {
    return {
      label: "Useful club-level option",
      meaning: "Useful, but not necessarily elite."
    };
  }

  if (stars >= 2) {
    return {
      label: "Backup or depth option",
      meaning: "Probably most useful as staff depth."
    };
  }

  return {
    label: "Weak fit",
    meaning: "This coach is unlikely to be a strong assignment choice."
  };
};

const formatAlsoUseful = (assignments: AssignmentRating[]) =>
  assignments.map((assignment) => assignment.label).join(", ");

export const shouldShowWeakestFit = (
  bestAssignment: Pick<AssignmentRating, "id" | "stars"> | undefined,
  weakestAssignment: Pick<AssignmentRating, "id" | "stars"> | undefined
) =>
  Boolean(bestAssignment && weakestAssignment) &&
  bestAssignment?.id !== weakestAssignment?.id &&
  (bestAssignment?.stars ?? 0) - (weakestAssignment?.stars ?? 0) >=
    meaningfulWeakFitGap;

const formatCopyText = (
  topAssignment: AssignmentRating,
  secondaryAssignments: AssignmentRating[],
  verdictLabel: string
) => {
  const secondaryText = secondaryAssignments
    .map((assignment) => `${assignment.label} - ${assignment.stars.toFixed(1)}`)
    .join(", ");

  return [
    "FM Lab Coach Assignment Estimate",
    `Best fit: ${topAssignment.label} - ${topAssignment.stars.toFixed(1)} stars`,
    secondaryText ? `Also useful for: ${secondaryText}` : "",
    `Verdict: ${verdictLabel}`,
    "Note: Unofficial estimate for comparison only."
  ]
    .filter(Boolean)
    .join("\n");
};

export function RatingResult({
  assignmentRatings,
  isDefaultProfile = false,
  recommendedAssignments,
  selectedAssignmentId,
  className = ""
}: RatingResultProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle"
  );
  const topAssignment = recommendedAssignments[0];
  const secondaryAssignments = recommendedAssignments.slice(1, 3);
  const weakestAssignment = useMemo(
    () =>
      [...assignmentRatings].sort(
        (a, b) => a.stars - b.stars || a.score - b.score
      )[0],
    [assignmentRatings]
  );
  const verdict = topAssignment
    ? getVerdictTier(topAssignment.stars)
    : getVerdictTier(0);
  const shouldShowWeakestAssignment = shouldShowWeakestFit(
    topAssignment,
    weakestAssignment
  );

  const copyResult = async () => {
    if (!topAssignment) {
      return;
    }

    const text = formatCopyText(
      topAssignment,
      secondaryAssignments,
      verdict.label
    );

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopyState("copied");
      } else {
        window.prompt("Copy result", text);
        setCopyState("copied");
      }
    } catch {
      setCopyState("failed");
    }

    window.setTimeout(() => setCopyState("idle"), 2200);
  };

  return (
    <aside
      className={[
        "sticky top-[4.75rem] overflow-hidden rounded-lg border border-white/10 p-4",
        "bg-gradient-to-b from-[#1d2723] to-ink text-chalk shadow-panel",
        className
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-signal">
          Recommended Assignments
        </p>
        <button
          className="rounded-full border border-chalk/15 bg-chalk/10 px-3 py-1.5 text-xs font-black text-chalk transition hover:bg-chalk/18 focus:outline-none focus:ring-4 focus:ring-signal/20"
          onClick={copyResult}
          type="button"
        >
          {copyState === "copied"
            ? "Copied"
            : copyState === "failed"
              ? "Copy failed"
              : "Copy result"}
        </button>
      </div>

      {isDefaultProfile ? (
        <p className="mt-3 rounded-lg border border-touchline/20 bg-touchline/10 p-3 text-sm font-semibold leading-6 text-chalk/82">
          Select a coach&apos;s word levels to generate a more meaningful
          recommendation.
        </p>
      ) : null}

      {topAssignment ? (
        <section className="mt-3 rounded-lg border border-signal/45 bg-signal/12 p-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.12em] text-touchline/75">
                Best fit
              </p>
              <h2 className="mt-1 text-xl font-black leading-6">
                {topAssignment.label}
              </h2>
            </div>
            <p className="text-4xl font-black leading-none text-signal">
              {topAssignment.stars.toFixed(1)}
            </p>
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <StarRating size="sm" value={topAssignment.stars} />
            <span className="text-xs font-bold text-touchline">
              {formatRange(topAssignment)} range
            </span>
          </div>
          <div className="mt-3 rounded-md border border-chalk/10 bg-ink/20 p-3">
            <p className="text-sm font-black text-chalk">{verdict.label}</p>
            <p className="mt-1 text-sm leading-6 text-chalk/76">
              {verdict.meaning}
            </p>
          </div>
        </section>
      ) : null}

      {secondaryAssignments.length > 0 ? (
        <section className="mt-3 rounded-lg border border-chalk/10 bg-chalk/10 p-3">
          <p className="text-xs font-black uppercase tracking-[0.12em] text-touchline/75">
            Also useful for
          </p>
          <p className="mt-1 text-sm font-bold leading-6 text-chalk">
            {formatAlsoUseful(secondaryAssignments)}
          </p>
        </section>
      ) : null}

      {shouldShowWeakestAssignment && weakestAssignment ? (
        <p className="mt-3 text-xs font-semibold leading-5 text-chalk/58">
          Weakest current fit: {weakestAssignment.label}. Use lower-ranked roles
          only when staff depth is limited.
        </p>
      ) : (
        <p className="mt-3 text-xs font-semibold leading-5 text-chalk/58">
          No clear weak assignment yet. Change the coach&apos;s word levels to
          reveal stronger and weaker fits.
        </p>
      )}

      <details className="mt-3 rounded-lg border border-chalk/10 bg-chalk/10 p-3">
        <summary className="cursor-pointer text-xs font-black uppercase tracking-[0.12em] text-touchline/78">
          What do the stars mean?
        </summary>
        <ul className="mt-2 grid gap-1 text-xs font-semibold leading-5 text-chalk/72">
          <li>4.5-5.0: Elite assignment fit</li>
          <li>4.0-4.5: Strong specialist</li>
          <li>3.0-4.0: Useful club-level option</li>
          <li>2.0-3.0: Backup/depth option</li>
          <li>Below 2.0: Weak fit</li>
        </ul>
      </details>

      <p className="mt-3 rounded-lg border border-chalk/10 bg-chalk/10 p-3 text-xs font-semibold leading-5 text-chalk/68">
        FM Lab estimates the rating for a single assignment. In-game stars may
        look lower if a coach is assigned to multiple areas or if workload is
        high.
      </p>

      <ol className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        {secondaryAssignments.map((assignment, index) => (
          <li
            className="rounded-lg border border-chalk/12 bg-chalk/10 p-3"
            key={assignment.id}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.12em] text-touchline/70">
                  #{index + 2}
                </p>
                <h2 className="mt-1 text-base font-black leading-5">
                  {assignment.label}
                </h2>
              </div>
              <p className="text-2xl font-black leading-none text-signal">
                {assignment.stars.toFixed(1)}
              </p>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3">
              <StarRating size="sm" value={assignment.stars} />
              <span className="text-xs font-bold text-touchline">
                {formatRange(assignment)} range
              </span>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-4">
        <h2 className="text-sm font-black uppercase tracking-[0.14em] text-touchline/78">
          All Assignment Ratings
        </h2>
        <div className="mt-2 overflow-hidden rounded-lg border border-chalk/10">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-chalk/10 text-xs uppercase tracking-[0.12em] text-touchline/75">
              <tr>
                <th className="px-3 py-2 font-black">Assignment</th>
                <th className="px-3 py-2 font-black">Stars</th>
                <th className="hidden px-3 py-2 font-black sm:table-cell">
                  Range
                </th>
              </tr>
            </thead>
            <tbody>
              {assignmentRatings.map((assignment) => {
                const isSelected = assignment.id === selectedAssignmentId;

                return (
                  <tr
                    className={[
                      "border-t border-chalk/10",
                      isSelected ? "bg-signal/14" : "bg-chalk/4"
                    ].join(" ")}
                    key={assignment.id}
                  >
                    <td className="px-3 py-2 align-top">
                      <div className="font-black leading-5">
                        {assignment.label}
                      </div>
                      <div className="mt-1 text-xs leading-5 text-chalk/60">
                        {assignment.keyAttributes
                          .map((attribute) => attribute.label)
                          .join(", ")}
                      </div>
                    </td>
                    <td className="px-3 py-2 align-top">
                      <div className="font-black text-signal">
                        {assignment.stars.toFixed(1)}
                      </div>
                      <div className="mt-1">
                        <StarRating size="xs" value={assignment.stars} />
                      </div>
                    </td>
                    <td className="hidden px-3 py-2 align-top font-bold text-chalk/70 sm:table-cell">
                      {formatRange(assignment)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 rounded-lg border border-signal/35 bg-signal/12 p-2.5 text-sm font-semibold leading-6 text-chalk">
        Stop guessing in the staff room. The strongest roles rise to the top, so
        every coach has a clear job before they join your club.
      </p>
    </aside>
  );
}
