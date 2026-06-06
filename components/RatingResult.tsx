"use client";

import React, { useMemo, useState } from "react";
import type { AssignmentRating } from "@/lib/ratingFormula";
import { StarRating } from "./StarRating";

type RatingResultProps = {
  assignmentRatings: AssignmentRating[];
  isDefaultProfile?: boolean;
  selectedAssignmentId: string;
  className?: string;
};

export const sortAssignmentRatingsForDisplay = (
  assignmentRatings: AssignmentRating[]
) =>
  assignmentRatings
    .map((assignment, index) => ({ assignment, index }))
    .sort(
      (a, b) =>
        b.assignment.stars - a.assignment.stars ||
        b.assignment.score - a.assignment.score ||
        a.index - b.index
    );

export const formatCopyText = (
  sortedAssignments: AssignmentRating[]
) => {
  const topAssignment = sortedAssignments[0];
  const topRatings = sortedAssignments
    .slice(0, 3)
    .map(
      (assignment, index) =>
        `${index + 1}. ${assignment.label} — ${assignment.stars.toFixed(1)}`
    )
    .join("\n");
  const lines = [
    "FM Lab Coach Assignment",
    topAssignment
      ? `Best current fit: ${topAssignment.label} — ${topAssignment.stars.toFixed(1)} stars`
      : "",
    "Top ratings:",
    topRatings
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
  selectedAssignmentId,
  className = ""
}: RatingResultProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle"
  );
  const sortedAssignments = useMemo(
    () =>
      sortAssignmentRatingsForDisplay(assignmentRatings).map(
        ({ assignment }) => assignment
      ),
    [assignmentRatings]
  );
  const topAssignment = sortedAssignments[0];

  const copyResult = async () => {
    if (!topAssignment) {
      return;
    }

    const text = formatCopyText(sortedAssignments);

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
            All Assignment Ratings
          </p>
        </div>
        <div className="shrink-0">
          <button
            className="rounded-full border border-chalk/15 bg-chalk/10 px-3 py-1.5 text-xs font-black text-chalk transition hover:bg-chalk/18 focus:outline-none focus:ring-4 focus:ring-signal/20 disabled:cursor-not-allowed disabled:opacity-45"
            disabled={!topAssignment}
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

      <p className="mt-2 text-xs font-semibold leading-5 text-chalk/56">
        {isDefaultProfile
          ? "Default values shown. Choose a preset or enter a coach's attributes to see meaningful differences."
          : "Full rating table for the current coach profile."}
      </p>

      <div className="mt-3 overflow-hidden rounded-lg border border-chalk/12">
        <table className="w-full border-collapse text-left text-xs">
          <thead className="bg-chalk/8 text-[0.68rem] uppercase tracking-[0.12em] text-touchline/72">
            <tr>
              <th className="w-9 px-2 py-2 font-black">#</th>
              <th className="px-2 py-2 font-black">Assignment</th>
              <th className="px-2 py-2 text-right font-black">Rating</th>
            </tr>
          </thead>
          <tbody>
            {sortedAssignments.map((assignment, index) => {
              const isSelected = assignment.id === selectedAssignmentId;

              return (
                <tr
                  className={[
                    "border-t border-chalk/10",
                    isSelected ? "bg-signal/12" : "bg-chalk/5"
                  ].join(" ")}
                  key={assignment.id}
                >
                  <td className="px-2 py-2 font-black text-touchline/62">
                    {index + 1}
                  </td>
                  <td className="px-2 py-2 font-black text-chalk">
                    {assignment.label}
                  </td>
                  <td className="px-2 py-2">
                    <div className="flex items-center justify-end gap-2">
                      <span className="font-black text-signal">
                        {assignment.stars.toFixed(1)}
                      </span>
                      <StarRating size="xs" value={assignment.stars} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {topAssignment ? (
        <p className="mt-3 text-xs font-semibold leading-5 text-chalk/56">
          Best current fit:{" "}
          <span className="font-black text-chalk">{topAssignment.label}</span>.
        </p>
      ) : null}

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
