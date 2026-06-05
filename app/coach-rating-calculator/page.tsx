import type { Metadata } from "next";
import { CoachRatingCalculator } from "@/components/CoachRatingCalculator";
import { type AttributeKey, attributeLabels } from "@/lib/attributeLevels";
import { siteName } from "@/lib/siteMetadata";
import { trainingCategories } from "@/lib/trainingCategories";

const pageTitle = "FM26 Coach Assignment Calculator";
const pageDescription =
  "See what a coach is likely to bring to your training setup before you hire him.";

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
          See what a coach is likely to bring to your training setup before you
          hire him.
        </p>
        <p className="mt-3 max-w-3xl text-base font-semibold leading-7 text-ink/76">
          Stop guessing in the staff room. The strongest roles rise to the top,
          so every coach has a clear job before he joins your club.
        </p>
        <p className="mt-3 text-xs font-black uppercase tracking-[0.14em] text-pitch/75">
          Updated for FM26
        </p>
      </div>

      <section className="mb-5">
        <article className="rounded-lg border border-ink/10 bg-white/78 p-5 shadow-panel">
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-bench">
            How to use it
          </h2>
          <ol className="mt-4 grid gap-3 text-sm leading-6 text-ink/72 sm:grid-cols-2">
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

      <section className="mt-10 grid gap-5 text-ink/78 lg:grid-cols-2">
        <article className="rounded-lg border border-ink/10 bg-white/72 p-5 lg:col-span-2">
          <h2 className="text-xl font-black text-ink">
            What is the FM26 Coach Assignment Calculator?
          </h2>
          <p className="mt-3 leading-7">
            FM Lab helps you turn Football Manager 2026 staff word attributes
            into clear training assignment ratings. See what a coach is likely
            to bring to your training setup before you hire him.
          </p>
        </article>
        <article className="rounded-lg border border-ink/10 bg-white/72 p-5">
          <h2 className="text-xl font-black text-ink">
            How do FM26 coach assignments work?
          </h2>
          <p className="mt-3 leading-7">
            Each training assignment combines its main coaching attributes with
            supporting mental attributes: Determination, Authority and
            Motivating. FM Lab ranks all 9 assignment slots so you can compare
            staff candidates, avoid wasting wage budget, and assign each coach
            where he actually helps.
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
            Goalkeeping. Set Pieces needs Set Pieces first, then Tactical,
            Technical and mental support.
          </p>
        </article>
        <article className="rounded-lg border border-ink/10 bg-white/72 p-5 lg:col-span-2">
          <h2 className="text-xl font-black text-ink">
            How should you read the star rating?
          </h2>
          <p className="mt-3 leading-7">
            Use the stars as a quick comparison layer before offering a contract
            or changing staff responsibilities. Higher-rated assignments show
            where the coach can help most, while nearby fits are useful backups
            when your staff room is thin.
          </p>
        </article>
      </section>

      <section className="mt-8 rounded-lg border border-ink/10 bg-white/72 p-5">
        <h2 className="text-xl font-black text-ink">
          Assignment attribute emphasis
        </h2>
        <p className="mt-2 max-w-3xl leading-7 text-ink/72">
          The model keeps the weights centralized by assignment. These are the
          visible attributes that drive each estimate most clearly.
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
        <h2 className="text-xl font-black text-ink">
          Best attributes by FM26 coach assignment
        </h2>
        <p className="mt-2 max-w-3xl leading-7 text-ink/72">
          Use this as a quick checklist when you are scanning staff profiles in
          Football Manager 2026.
        </p>
        <div className="mt-5 overflow-x-auto rounded-lg border border-ink/10">
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

      <section className="mt-8 rounded-lg border border-ink/10 bg-white/72 p-5">
        <h2 className="text-xl font-black text-ink">FAQ</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {[
            {
              question: "Is this the official FM26 coach assignment formula?",
              answer:
                "No. It is built to help compare coaches, not to claim the exact hidden calculation."
            },
            {
              question: "How accurate is the FM26 coach calculator?",
              answer:
                "It is calibrated as a practical estimate from visible word levels. Treat it as a comparison aid, not a guaranteed in-game result."
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
            },
            {
              question: "Why can my in-game stars differ?",
              answer:
                "FM Lab only uses visible word attributes. Hidden game context, staff setup or future FM26 changes can make real in-game stars differ."
            },
            {
              question: "Can I use this for FM25 or FM24?",
              answer:
                "It is built for FM26 word-based staff attributes. Older games may not line up with the same input system or calibration."
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
