import type { Metadata } from "next";
import { CoachRatingCalculator } from "@/components/CoachRatingCalculator";
import { type AttributeKey, attributeLabels } from "@/lib/attributeLevels";
import { trainingCategories } from "@/lib/trainingCategories";

export const metadata: Metadata = {
  title: "FM26 Coach Assignment Calculator",
  description:
    "See what a coach is likely to bring to your training setup before you hire him."
};

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
      <section className="relative mb-3 overflow-hidden rounded-lg border border-ink/10 bg-white/72 p-4 shadow-panel">
        <div className="pitch-lines pointer-events-none absolute inset-0 opacity-[0.06]" />
        <div className="relative flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <span className="inline-flex items-center gap-2 rounded-full border border-pitch/20 bg-touchline/60 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-pitch">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            FM26 Staff Tool
          </span>
          <div className="lg:flex-1">
            <h1 className="text-2xl font-black leading-tight text-ink sm:text-3xl">
              FM26 Coach Assignment Calculator
            </h1>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-ink/70">
              See what a coach is likely to bring to your training setup before
              you hire him.
            </p>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-ink/76">
              Stop guessing in the staff room. The strongest roles rise to the
              top, so every coach has a clear job before he joins your club.
            </p>
            <p className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-pitch/75">
              Updated for FM26
            </p>
          </div>
        </div>
      </section>

      <section className="mb-3">
        <article className="rounded-lg border border-ink/10 bg-white/78 p-4 shadow-panel">
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-bench">
            How to use it
          </h2>
          <ol className="mt-3 grid gap-2 text-sm leading-6 text-ink/72 sm:grid-cols-2 lg:grid-cols-4">
            <li>
              Open a coach profile in FM26.
            </li>
            <li>
              Match the visible word levels here.
            </li>
            <li>
              See which training assignments he is most suited for.
            </li>
            <li>
              Decide whether the coach fits the job you need before you commit
              wages.
            </li>
          </ol>
        </article>
      </section>

      <CoachRatingCalculator />

      <section className="mt-4 rounded-lg border border-ink/10 bg-white/76 p-4 shadow-panel">
        <h2 className="text-sm font-black uppercase tracking-[0.16em] text-bench">
          How it works
        </h2>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-ink/72">
          Each training assignment combines its main coaching attributes with
          supporting mental attributes: Determination, Authority and Motivating.
          FM Lab ranks all 9 assignment slots so you can compare staff
          candidates, avoid wasting wage budget, and assign each coach where he
          actually helps.
        </p>
      </section>

      <section className="mt-4 rounded-lg border border-ink/10 bg-white/76 p-4 shadow-panel">
        <h2 className="text-sm font-black uppercase tracking-[0.16em] text-bench">
          Best attributes by FM26 coach assignment
        </h2>
        <div className="mt-3 overflow-x-auto rounded-lg border border-ink/10">
          <table className="w-full min-w-[680px] border-collapse text-left text-sm">
            <thead className="bg-chalk text-xs uppercase tracking-[0.12em] text-ink/62">
              <tr>
                <th className="px-4 py-3 font-black">Assignment</th>
                <th className="px-4 py-3 font-black">Main attributes</th>
                <th className="px-4 py-3 font-black">Support attributes</th>
              </tr>
            </thead>
            <tbody>
              {trainingCategories.map((category) => {
                const mainAttributes = category.keyAttributes
                  .map((key) => attributeLabels[key])
                  .join(" + ");
                const supportAttributes = (
                  Object.keys(category.weights) as AttributeKey[]
                )
                  .filter((key) => !category.keyAttributes.includes(key))
                  .map((key) => attributeLabels[key])
                  .join(", ");

                return (
                  <tr className="border-t border-ink/10" key={category.id}>
                    <td className="px-4 py-3 font-black text-ink">
                      {category.label}
                    </td>
                    <td className="px-4 py-3 text-ink/72">
                      {mainAttributes}
                    </td>
                    <td className="px-4 py-3 text-ink/72">
                      {supportAttributes || "None"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
