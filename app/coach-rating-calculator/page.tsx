import type { Metadata } from "next";
import { CoachRatingCalculator } from "@/components/CoachRatingCalculator";
import { type AttributeKey, attributeLabels } from "@/lib/attributeLevels";
import { siteName } from "@/lib/siteMetadata";
import { trainingCategories } from "@/lib/trainingCategories";

const pageTitle = "FM26 Coach Assignment Calculator";
const pageDescription =
  "Estimate which Football Manager 2026 training assignment a coach fits best using the new word-based staff attribute system.";

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
          Coach assignment calculator
        </p>
        <h1 className="text-3xl font-black leading-tight text-ink sm:text-5xl">
          FM26 Coach Assignment Calculator
        </h1>
        <p className="mt-4 text-lg leading-8 text-ink/72">
          Enter the word levels from a coach profile and estimate which FM26
          training assignments they should handle. This is an unofficial
          fan-made approximation, not an official formula.
        </p>
      </div>

      <CoachRatingCalculator />

      <section className="mt-10 grid gap-5 text-ink/78 lg:grid-cols-2">
        <article className="rounded-lg border border-ink/10 bg-white/72 p-5">
          <h2 className="text-xl font-black text-ink">
            How do FM26 coach assignments work?
          </h2>
          <p className="mt-3 leading-7">
            The practical decision is not a single overall coach score. You need
            to know whether a coach fits Attacking Tactical, Possession
            Technical, Fitness, Set Pieces or another training slot.
          </p>
        </article>
        <article className="rounded-lg border border-ink/10 bg-white/72 p-5">
          <h2 className="text-xl font-black text-ink">
            Attacking Tactical vs Attacking Technical
          </h2>
          <p className="mt-3 leading-7">
            Both lean on Attacking. Tactical pairs it with Tactical coaching,
            while Technical pairs it with Technical coaching. Mental support
            helps separate similar profiles.
          </p>
        </article>
        <article className="rounded-lg border border-ink/10 bg-white/72 p-5">
          <h2 className="text-xl font-black text-ink">
            Defending Tactical vs Defending Technical
          </h2>
          <p className="mt-3 leading-7">
            Defending Tactical values defensive organization with Tactical.
            Defending Technical keeps Defending as the base but rewards a coach
            who is stronger at Technical work.
          </p>
        </article>
        <article className="rounded-lg border border-ink/10 bg-white/72 p-5">
          <h2 className="text-xl font-black text-ink">
            Possession Tactical vs Possession Technical
          </h2>
          <p className="mt-3 leading-7">
            Possession Tactical favors structure and control. Possession
            Technical favors ball work and technique. The best choice depends on
            which second attribute is stronger.
          </p>
        </article>
        <article className="rounded-lg border border-ink/10 bg-white/72 p-5 lg:col-span-2">
          <h2 className="text-xl font-black text-ink">
            Fitness, Goalkeeping and Set Pieces
          </h2>
          <p className="mt-3 leading-7">
            Fitness mainly follows Fitness. Goalkeeping mainly follows
            Goalkeeping with smaller tactical and technical support. Set Pieces
            needs Set Pieces first, then Tactical, Technical and mental
            support.
          </p>
        </article>
      </section>

      <section className="mt-8 rounded-lg border border-ink/10 bg-white/72 p-5">
        <h2 className="text-xl font-black text-ink">
          Assignment attribute emphasis
        </h2>
        <p className="mt-2 max-w-3xl leading-7 text-ink/72">
          The fan-made model keeps the weights centralized by assignment. These
          are the visible attributes that drive each estimate most clearly.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {trainingCategories.map((category) => {
            const topAttributes = (
              Object.entries(category.weights) as [AttributeKey, number][]
            )
              .sort((a, b) => b[1] - a[1])
              .slice(0, 4)
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
              question: "Is this the official FM26 coach assignment formula?",
              answer:
                "No. It is an unofficial fan-made model built to help compare coaches, not a claim about the exact hidden calculation."
            },
            {
              question:
                "What is the difference between Attacking Tactical and Attacking Technical?",
              answer:
                "Both use Attacking. The tactical version rewards Tactical more, while the technical version rewards Technical more."
            },
            {
              question:
                "What is the difference between Defending Tactical and Defending Technical?",
              answer:
                "Both use Defending. Choose the tactical slot for a coach with stronger Tactical, or the technical slot for stronger Technical."
            },
            {
              question:
                "What is the difference between Possession Tactical and Possession Technical?",
              answer:
                "Both use Possession. Tactical fits structure and control; Technical fits ball work and technique."
            },
            {
              question: "Which attributes matter most for Fitness coaches?",
              answer:
                "Fitness matters most, with Determination, Authority and Motivating acting as support."
            },
            {
              question: "Which attributes matter most for Set Pieces coaches?",
              answer:
                "Set Pieces is the main lever, supported by Tactical, Technical and the three mental staff attributes."
            },
            {
              question: "Why are results shown as a range?",
              answer:
                "FM26 shows word levels rather than exact numbers, so a range is more honest than pretending the estimate is exact."
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
