"use client";

import React, { useMemo } from "react";
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

export function RatingResult({
  assignmentRatings,
  isDefaultProfile = false,
  selectedAssignmentId,
  className = ""
}: RatingResultProps) {
  const sortedAssignments = useMemo(
    () =>
      sortAssignmentRatingsForDisplay(assignmentRatings).map(
        ({ assignment }) => assignment
      ),
    [assignmentRatings]
  );

  return (
    <aside
      className={[
        "overflow-hidden rounded-lg border border-white/10 p-4 lg:sticky lg:top-[4.75rem] lg:max-h-[calc(100vh-5.5rem)] lg:overflow-y-auto",
        "bg-gradient-to-b from-[#1d2723] to-ink text-chalk shadow-panel",
        className
      ].join(" ")}
    >
      <p className="text-sm font-black uppercase tracking-[0.16em] text-signal">
        All Assignment Ratings
      </p>

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
                  <td
                    aria-label={`${assignment.label}, ${assignment.stars.toFixed(1)} stars`}
                    className="px-2 py-2"
                    title={`${assignment.stars.toFixed(1)} stars`}
                  >
                    <div className="flex items-center justify-end">
                      <StarRating size="xs" value={assignment.stars} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

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
