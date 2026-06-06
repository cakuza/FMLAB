import type { Metadata } from "next";
import { CoachRatingCalculator } from "@/components/CoachRatingCalculator";
import { type AttributeKey, attributeLabels } from "@/lib/attributeLevels";
import { trainingCategories } from "@/lib/trainingCategories";

export const metadata: Metadata = {
  title: "FM26 Coach Assignment Calculator",
  description:
    "See what a coach is likely to bring to your training setup before you hire him."
};

const howToSteps = [
  {
    number: "01",
    title: "Open FM26 coach profile",
    text: "Start from the coach profile you are checking."
  },
  {
    number: "02",
    title: "Match word levels",
    text: "Enter the visible FM26 attribute words."
  },
  {
    number: "03",
    title: "Read assignment ratings",
    text: "See which training roles he is most suited for."
  },
  {
    number: "04",
    title: "Decide before wages",
    text: "Check whether he fits the job before you commit wages."
  }
];

const howItWorksCards = [
  {
    marker: "WORDS",
    title: "Visible FM26 word levels",
    text:
      "Use the coach attributes you can see in-game, including coaching and mental ratings."
  },
  {
    marker: "RANK",
    title: "Training role ranking",
    text:
      "FM Lab ranks all 9 assignment roles so you can see where the coach helps most."
  },
  {
    marker: "HIRE",
    title: "Hiring decision support",
    text:
      "Use it before committing wages or assigning training responsibilities."
  }
];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <section className="relative mb-5 overflow-hidden rounded-lg border border-ink/10 bg-chalk/88 px-5 py-6 shadow-panel sm:px-7 sm:py-8">
        <div className="pitch-lines pointer-events-none absolute inset-0 opacity-[0.075]" />
        <div className="relative max-w-5xl">
          <h1 className="max-w-4xl text-3xl font-black leading-[1.05] text-ink sm:text-4xl lg:text-5xl">
            FM26 Coach Assignment Calculator
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-ink/72 sm:text-lg">
            See what a coach is likely to bring to your training setup before
            you hire him.
          </p>
          <p className="mt-4 max-w-3xl border-l-4 border-signal bg-white/45 py-2 pl-4 text-sm font-bold leading-6 text-ink/78">
            Stop guessing in the staff room. The strongest roles rise to the top,
            so every coach has a clear job before he joins your club.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-pitch/78">
            <span className="inline-flex items-center gap-2 rounded-full border border-pitch/20 bg-touchline/65 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              FM26 Staff Tool
            </span>
            <span>Updated for FM26</span>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <div className="mb-3 flex items-end justify-between gap-4">
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-bench">
            How to use it
          </h2>
          <span className="hidden h-px flex-1 bg-ink/10 sm:block" />
        </div>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {howToSteps.map((step) => (
            <li
              className="rounded-lg border border-ink/10 bg-white/78 p-4 shadow-[0_12px_34px_rgba(23,32,28,0.08)]"
              key={step.number}
            >
              <span className="inline-flex rounded-full bg-pitch px-2.5 py-1 text-[11px] font-black tracking-[0.12em] text-chalk">
                {step.number}
              </span>
              <h3 className="mt-3 text-base font-black leading-5 text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink/68">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <CoachRatingCalculator />

      <section className="mt-5">
        <h2 className="text-sm font-black uppercase tracking-[0.16em] text-bench">
          How it works
        </h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {howItWorksCards.map((item) => (
            <article
              className="rounded-lg border border-ink/10 bg-white/76 p-4 shadow-[0_12px_34px_rgba(23,32,28,0.08)]"
              key={item.title}
            >
              <span className="text-[11px] font-black uppercase tracking-[0.14em] text-pitch/72">
                {item.marker}
              </span>
              <h3 className="mt-2 text-base font-black leading-5 text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink/68">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-5 rounded-lg border border-ink/10 bg-white/72 p-4 shadow-[0_14px_40px_rgba(23,32,28,0.08)]">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-bench">
            Best attributes by FM26 coach assignment
          </h2>
          <p className="text-sm font-semibold text-ink/55">
            Quick reference for staff shortlist checks.
          </p>
        </div>
        <div className="mt-4 overflow-x-auto rounded-lg border border-ink/10 shadow-sm">
          <table className="w-full min-w-[680px] border-collapse text-left text-sm">
            <thead className="bg-pitch/8 text-xs uppercase tracking-[0.12em] text-ink/62">
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
