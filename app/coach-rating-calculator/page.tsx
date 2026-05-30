import type { Metadata } from "next";
import { CoachRatingCalculator } from "@/components/CoachRatingCalculator";
import { type AttributeKey, attributeLabels } from "@/lib/attributeLevels";
import { siteName } from "@/lib/siteMetadata";
import { trainingCategories } from "@/lib/trainingCategories";

const pageTitle = "FM26 Coach Rating Calculator";
const pageDescription =
  "Estimate coach star ratings in Football Manager 2026 using the new word-based staff attribute system.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/coach-rating-calculator"
  },
  openGraph: {
    type: "website",
    url: "/coach-rating-calculator",
    siteName,
    title: `${pageTitle} | Staff & Training Tools`,
    description: pageDescription
  },
  twitter: {
    card: "summary",
    title: `${pageTitle} | Staff & Training Tools`,
    description: pageDescription
  }
};

export default function CoachRatingCalculatorPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mb-8 max-w-3xl">
        <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-bench">
          Staff calculator
        </p>
        <h1 className="text-3xl font-black leading-tight text-ink sm:text-5xl">
          FM26 Coach Rating Calculator
        </h1>
        <p className="mt-4 text-lg leading-8 text-ink/72">
          This tool estimates training star ratings using the word attribute
          levels shown in FM26. It is a fan-made approximation, not an official
          formula or exact reverse-engineered model.
        </p>
      </div>

      <CoachRatingCalculator />

      <section className="mt-10 grid gap-5 text-ink/78 lg:grid-cols-2">
        <article className="rounded-lg border border-ink/10 bg-white/72 p-5">
          <h2 className="text-xl font-black text-ink">
            What does the FM26 coach rating calculator do?
          </h2>
          <p className="mt-3 leading-7">
            It turns FM26 staff word levels into an estimated training rating for
            a chosen category. The result is designed for quick staff-room
            decisions, not as a claim about the exact game formula.
          </p>
        </article>
        <article className="rounded-lg border border-ink/10 bg-white/72 p-5">
          <h2 className="text-xl font-black text-ink">
            Why FM26 staff attributes use words instead of numbers
          </h2>
          <p className="mt-3 leading-7">
            Word levels make staff profiles easier to read at a glance and avoid
            implying more precision than the game shows. This calculator keeps
            that presentation and treats each level as an approximate band.
          </p>
        </article>
        <article className="rounded-lg border border-ink/10 bg-white/72 p-5">
          <h2 className="text-xl font-black text-ink">
            Which attributes matter most for each training category?
          </h2>
          <p className="mt-3 leading-7">
            Each category leans on its matching coaching attribute, then adds
            supporting mental, technical or tactical qualities. Youth development
            puts Working With Youngsters at the center.
          </p>
        </article>
        <article className="rounded-lg border border-ink/10 bg-white/72 p-5">
          <h2 className="text-xl font-black text-ink">
            How to read the estimated star rating
          </h2>
          <p className="mt-3 leading-7">
            The star rating is a readable summary of the 0-100 estimate. Use it
            to compare coaches for a category, then check the influential
            attributes to see why the rating moved.
          </p>
        </article>
        <article className="rounded-lg border border-ink/10 bg-white/72 p-5 lg:col-span-2">
          <h2 className="text-xl font-black text-ink">
            Why the result is shown as a range
          </h2>
          <p className="mt-3 leading-7">
            A word level can cover more than one hidden value, so a single star
            number can look more certain than it really is. The range gives a
            more honest view of the likely outcome in this fan-made model.
          </p>
        </article>
      </section>

      <section className="mt-8 rounded-lg border border-ink/10 bg-white/72 p-5">
        <h2 className="text-xl font-black text-ink">
          Category attribute emphasis
        </h2>
        <p className="mt-2 max-w-3xl leading-7 text-ink/72">
          The model gives each training category its own weighting. These are
          the three strongest levers in the current approximation.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {trainingCategories.map((category) => {
            const topAttributes = (
              Object.entries(category.weights) as [AttributeKey, number][]
            )
              .sort((a, b) => b[1] - a[1])
              .slice(0, 3)
              .map(([key]) => attributeLabels[key]);

            return (
              <div
                className="rounded-lg border border-ink/10 bg-chalk/74 p-4"
                key={category.id}
              >
                <h3 className="font-black text-ink">{category.label}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/68">
                  {topAttributes.join(", ")}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-ink/10 bg-white/72 p-5">
        <h2 className="text-xl font-black text-ink">FAQ</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {[
            {
              question: "Is this the official FM26 coach rating formula?",
              answer:
                "No. It is an unofficial fan-made model that estimates ratings from the attributes shown in the game."
            },
            {
              question: "Why are FM26 staff attributes shown as words?",
              answer:
                "FM26 presents staff attributes as descriptive levels, so this tool uses those same words instead of asking for hidden numbers."
            },
            {
              question: "How accurate is this calculator?",
              answer:
                "It is useful for comparison and planning, but the result should be treated as approximate because the official calculation is not exposed here."
            },
            {
              question: "Which attributes matter most for 5-star coaches?",
              answer:
                "The main category attribute matters most, backed by relevant mental qualities such as Determination, Discipline and Motivating."
            },
            {
              question: "Can I use this calculator for every training category?",
              answer:
                "Yes. Choose the category first, then adjust the coach profile to see the estimate update instantly."
            },
            {
              question: "What does Elite mean in FM26 staff attributes?",
              answer:
                "Elite is the strongest visible word level in this calculator and represents top-end staff quality for the selected attribute."
            }
          ].map((item) => (
            <details
              className="rounded-lg border border-ink/10 bg-chalk/74 p-4"
              key={item.question}
            >
              <summary className="cursor-pointer font-black text-ink">
                {item.question}
              </summary>
              <p className="mt-3 leading-7 text-ink/70">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
