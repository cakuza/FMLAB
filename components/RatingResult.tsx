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
      meaning:
        "Use this coach here first. This looks like a premium assignment fit."
    };
  }

  if (stars >= 4) {
    return {
      label: "Strong specialist",
      meaning: "Worth prioritizing for this assignment."
    };
  }

  if (stars >= 3) {
    return {
      label: "Useful club-level option",
      meaning: "Good enough as a useful staff option, but not a premium hire."
    };
  }

  if (stars >= 2) {
    return {
      label: "Backup or depth option",
      meaning: "Use as cover or depth, not as your main specialist."
    };
  }

  return {
    label: "Weak fit",
    meaning: "Avoid this assignment unless you have no better staff option."
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
    "Note: Estimate for comparison only."
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
  const shouldShowWeakestAssignment =
    !isDefaultProfile && shouldShowWeakestFit(topAssignment, weakestAssignment);

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
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-signal">
            Top Assignment Fits
          </p>
        </div>
        <div className="shrink-0">
          <button
            className="rounded-full border border-chalk/15 bg-chalk/10 px-3 py-1.5 text-xs font-black text-chalk transition hover:bg-chalk/18 focus:outline-none focus:ring-4 focus:ring-signal/20 disabled:cursor-not-allowed disabled:opacity-45"
            disabled={isDefaultProfile || !topAssignment}
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
      </div>

      {isDefaultProfile ? (
        <div className="mt-3 rounded-lg border border-chalk/12 bg-chalk/8 p-4">
          <p className="text-sm font-black leading-6 text-chalk">
            Choose a preset or enter a coach&apos;s attributes to see his
            assignment ratings.
          </p>
          <p className="mt-2 text-xs font-semibold leading-5 text-chalk/56">
            Presets are the quickest way to see how a specialist profile changes
            the ranking.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-3 grid gap-2">
            {topAssignment ? (
              <section className="rounded-lg border border-signal/55 bg-signal/12 p-3.5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-touchline/75">
                      #1
                    </p>
                    <p className="mt-1 text-xl font-black leading-6">
                      {topAssignment.label}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-5xl font-black leading-none text-signal">
                      {topAssignment.stars.toFixed(1)}
                    </p>
                    <p className="mt-1 text-xs font-black uppercase tracking-[0.1em] text-signal/85">
                      stars
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <StarRating size="md" value={topAssignment.stars} />
                  <span className="text-xs font-bold text-touchline">
                    {formatRange(topAssignment)} range
                  </span>
                </div>
                <p className="mt-2 text-sm font-black text-chalk">
                  {verdict.label}
                </p>
              </section>
            ) : null}

            {secondaryAssignments.map((assignment, index) => (
              <div
                aria-label={`Rank ${index + 2}: ${assignment.label}`}
                className="rounded-lg border border-chalk/12 bg-chalk/10 p-3"
                key={assignment.id}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-xs font-black uppercase tracking-[0.12em] text-touchline/70">
                      #{index + 2}
                    </span>
                    <p className="mt-1 truncate text-base font-black leading-5">
                      {assignment.label}
                    </p>
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
              </div>
            ))}
          </div>

          {topAssignment ? (
            <div className="mt-3 rounded-lg border border-chalk/10 bg-chalk/6 p-3 text-sm leading-6">
              <div className="grid gap-2">
                <p className="font-semibold text-chalk/74">
                  <span className="font-black text-touchline/80">
                    Best use:
                  </span>{" "}
                  <span className="font-bold text-chalk">
                    {topAssignment.label}
                  </span>
                </p>
                {secondaryAssignments.length > 0 ? (
                  <p className="font-semibold text-chalk/74">
                    <span className="font-black text-touchline/80">
                      Also useful:
                    </span>{" "}
                    <span className="font-bold text-chalk">
                      {formatAlsoUseful(secondaryAssignments)}
                    </span>
                  </p>
                ) : null}
                <p className="font-semibold text-chalk/74">
                  <span className="font-black text-touchline/80">
                    Verdict:
                  </span>{" "}
                  <span className="font-bold text-chalk">
                    {verdict.meaning}
                  </span>
                </p>
              </div>
            </div>
          ) : null}

          {shouldShowWeakestAssignment && weakestAssignment ? (
            <p className="mt-3 text-xs font-semibold leading-5 text-chalk/48">
              Lowest fit right now: {weakestAssignment.label}. Treat it as
              staff cover unless your options are thin.
            </p>
          ) : (
            <p className="mt-3 text-xs font-semibold leading-5 text-chalk/48">
              No clear weak assignment yet. Change the coach&apos;s word levels
              to reveal stronger and weaker fits.
            </p>
          )}
        </>
      )}

      <details className="mt-3 rounded-lg border border-chalk/10 bg-chalk/6 p-3">
        <summary className="cursor-pointer text-xs font-black uppercase tracking-[0.12em] text-touchline/68">
          What do the stars mean?
        </summary>
        <ul className="mt-2 grid gap-1 text-xs font-semibold leading-5 text-chalk/62">
          <li>4.5-5.0: Elite assignment fit</li>
          <li>4.0-4.5: Strong specialist</li>
          <li>3.0-4.0: Useful club-level option</li>
          <li>2.0-3.0: Backup/depth option</li>
          <li>Below 2.0: Weak fit</li>
        </ul>
      </details>

      <p className="mt-2 text-xs font-semibold leading-5 text-chalk/50">
        Note: FM Lab is an unofficial estimate for quick coach comparison. Exact
        in-game stars can vary with workload and assignments.
      </p>
    </aside>
  );
}
