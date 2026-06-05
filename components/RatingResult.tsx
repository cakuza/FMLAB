import type { AssignmentRating } from "@/lib/ratingFormula";
import { StarRating } from "./StarRating";

type RatingResultProps = {
  assignmentRatings: AssignmentRating[];
  recommendedAssignments: AssignmentRating[];
  selectedAssignmentId: string;
  className?: string;
};

const formatRange = (assignment: AssignmentRating) =>
  `${assignment.range.minStars.toFixed(1)}-${assignment.range.maxStars.toFixed(1)}`;

export function RatingResult({
  assignmentRatings,
  recommendedAssignments,
  selectedAssignmentId,
  className = ""
}: RatingResultProps) {
  return (
    <aside
      className={[
        "sticky top-[4.75rem] overflow-hidden rounded-lg border border-white/10 p-4",
        "bg-gradient-to-b from-[#1d2723] to-ink text-chalk shadow-panel",
        className
      ].join(" ")}
    >
      <p className="text-sm font-black uppercase tracking-[0.16em] text-signal">
        Recommended Assignments
      </p>
      <ol className="mt-3 grid gap-2">
        {recommendedAssignments.map((assignment, index) => (
          <li
            className="rounded-lg border border-signal/35 bg-chalk/10 p-3"
            key={assignment.id}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.12em] text-touchline/70">
                  #{index + 1}
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
