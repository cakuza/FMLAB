"use client";

import React, { useMemo, useState } from "react";
import type { AssignmentRating } from "@/lib/ratingFormula";
import { StarRating } from "./StarRating";

type RatingResultProps = {
  assignmentRatings: AssignmentRating[];
  isDefaultProfile?: boolean;
  presetActions?: {
    label: string;
    onClick: () => void;
  }[];
  recommendedAssignments: AssignmentRating[];
  selectedAssignmentId: string;
  className?: string;
};

const meaningfulWeakFitGap = 0.5;

const getVerdictTier = (stars: number) => {
  if (stars >= 4.5) {
    return {
      label: "Elite assignment fit",
      meaning:
        "Use him here first. This looks like a premium assignment fit."
    };
  }

  if (stars >= 4) {
    return {
      label: "Strong specialist",
      meaning: "Worth prioritizing for this training role."
    };
  }

  if (stars >= 3) {
    return {
      label: "Useful club-level option",
      meaning: "Useful staff option, but not a premium hire."
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
    meaning: "Avoid this role unless you have no better staff option."
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

export const formatCopyText = (
  topAssignment: AssignmentRating,
  secondaryAssignments: AssignmentRating[],
  verdictMeaning: string
) => {
  const secondaryText = secondaryAssignments
    .map((assignment) => `${assignment.label} — ${assignment.stars.toFixed(1)}`)
    .join(", ");
  const lines = [
    "FM Lab Coach Assignment",
    `Best use: ${topAssignment.label} — ${topAssignment.stars.toFixed(1)} stars`,
    secondaryText ? `Also useful: ${secondaryText}` : "",
    `Decision: ${verdictMeaning}`
  ].filter(Boolean);

  return `${lines.join("\n")}\n\nNote: estimated for quick coach comparison.`;
};

const copyTextWithTextarea = (text: string) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    return document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
  }
};

export const copyTextWithFallback = async (text: string) => {
  if (copyTextWithTextarea(text)) {
    return true;
  }

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }

  return false;
};

export function RatingResult({
  assignmentRatings,
  isDefaultProfile = false,
  presetActions = [],
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
      verdict.meaning
    );

    try {
      const copied = await copyTextWithFallback(text);

      if (!copied) {
        window.prompt("Copy result", text);
      }

      setCopyState("copied");
    } catch {
      window.prompt("Copy result", text);
      setCopyState("failed");
    }

    window.setTimeout(() => setCopyState("idle"), 2200);
  };

  return (
    <aside
      className={[
        "overflow-hidden rounded-lg border border-white/10 p-4 lg:sticky lg:top-[4.75rem] lg:max-h-[calc(100vh-5.5rem)] lg:overflow-y-auto",
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
            Start with a preset, then adjust the word levels to match the coach
            you are checking.
          </p>
          <p className="mt-2 text-xs font-semibold leading-5 text-chalk/56">
            Once you enter a real profile, FM Lab will show the best training
            roles and what to expect from him.
          </p>
          {presetActions.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {presetActions.map((preset) => (
                <button
                  className="rounded-full border border-signal bg-signal px-3 py-1.5 text-xs font-black text-ink transition hover:bg-[#ffd06a] focus:outline-none focus:ring-4 focus:ring-signal/25"
                  key={preset.label}
                  onClick={preset.onClick}
                  type="button"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          ) : null}
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
                  <span className="text-xs font-black uppercase tracking-[0.1em] text-touchline">
                    {verdict.label}
                  </span>
                </div>
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
                    Decision:
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
        FM Lab estimates the rating for a single assignment. In-game stars may
        look lower if a coach is assigned to multiple areas or if workload is
        high.
      </p>
    </aside>
  );
}
