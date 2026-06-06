import type { Metadata } from "next";
import { CoachRatingCalculator } from "@/components/CoachRatingCalculator";
import { type AttributeKey, attributeLabels } from "@/lib/attributeLevels";
import { siteName, siteUrl } from "@/lib/siteMetadata";
import { trainingCategories } from "@/lib/trainingCategories";

const pageTitle = "FM26 Coach Calculator - Staff Assignment Ratings | FM Lab";
const pageDescription =
  "Estimate Football Manager 2026 coach ratings for Attacking, Defending, Possession, Goalkeeping, Fitness and Set Pieces assignments using coach profile ratings.";
const ogDescription =
  "Compare FM26 staff assignment ratings before you hire or assign coaches.";

export const metadata: Metadata = {
  title: {
    absolute: pageTitle
  },
  description: pageDescription,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title: "FM26 Coach Calculator",
    description: ogDescription
  },
  twitter: {
    card: "summary",
    title: "FM26 Coach Calculator",
    description: ogDescription
  }
};

const howToSteps = [
  {
    number: "01",
    title: "Enter attributes",
    text: "Match the word ratings from the coach profile."
  },
  {
    number: "02",
    title: "Read all ratings",
    text: "See estimated star ratings for every coaching assignment."
  },
  {
    number: "03",
    title: "Compare roles",
    text:
      "Check Attacking, Defending, Possession, Fitness, Goalkeeping and Set Pieces side by side."
  },
  {
    number: "04",
    title: "Hire smarter",
    text: "Use the ratings as a quick hiring and assignment guide."
  }
];

const howItWorksCards = [
  {
    marker: "WORDS",
    title: "Enter the coach attributes you see in FM26",
    text:
      "Use the word ratings from the coach profile, including coaching and mental attributes."
  },
  {
    marker: "RANK",
    title: "See every training role ranked",
    text:
      "FM Lab shows how the coach fits all 9 assignment roles, from strongest to weakest."
  },
  {
    marker: "HIRE",
    title: "Know what to expect before hiring",
    text:
      "Use the ratings to spot specialists, backup options, and roles where the coach may not be worth the wage."
  }
];

const faqItems = [
  {
    question: "Is this an official Football Manager tool?",
    answer:
      "No. FM Lab is an unofficial, fan-made calculator and is not affiliated with Sports Interactive, SEGA or Football Manager."
  },
  {
    question: "What attributes should I enter?",
    answer:
      "Enter the coaching and mental attributes from the FM26 coach profile: Attacking, Defending, Fitness, Goalkeeping, Possession, Set Pieces, Tactical, Technical, Authority, Determination and Motivating."
  },
  {
    question: "What does the assignment rating mean?",
    answer:
      "The rating estimates how suitable the coach is for that training assignment, shown as a star-style score for quick comparison."
  },
  {
    question: "Can I use this before hiring a coach?",
    answer:
      "Yes. The calculator is designed to help compare staff before offering wages or assigning a role."
  },
  {
    question: "Why do some assignments rate differently?",
    answer:
      "Each assignment weighs attributes differently. For example, Attacking Tactical, Defending Technical, Fitness and Goalkeeping do not use the same attribute mix."
  },
  {
    question: "Does this guarantee the exact in-game star rating?",
    answer:
      "No. It is an approximation based on the coach profile and should be used as a practical decision aid, not an official formula."
  }
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "FM26 Coach Calculator",
    applicationCategory: "SportsApplication",
    operatingSystem: "Web",
    description:
      "An unofficial Football Manager 2026 coach assignment calculator for estimating staff ratings from coach profile attributes.",
    url: siteUrl
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "FM26 Coach Calculator",
        item: siteUrl
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  }
];

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="relative mb-2 overflow-hidden rounded-lg border border-ink/10 bg-chalk/88 px-4 py-3 shadow-panel sm:px-5 sm:py-4">
        <div className="pitch-lines pointer-events-none absolute inset-0 opacity-[0.075]" />
        <div className="relative max-w-5xl">
          <h1 className="max-w-4xl text-2xl font-black leading-tight text-ink sm:text-3xl lg:text-4xl">
            FM26 Coach Assignment Calculator
          </h1>
          <p className="mt-1.5 max-w-3xl text-sm leading-6 text-ink/72 sm:text-base">
            Rate Football Manager 2026 coaches for every training assignment
            using the ratings from the coach profile.
          </p>
          <p className="mt-2 max-w-3xl border-l-4 border-signal bg-white/45 py-1 pl-3 text-xs font-bold leading-5 text-ink/78 sm:text-sm">
            Compare Attacking, Defending, Possession, Goalkeeping, Fitness and
            Set Pieces ratings before you offer wages.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-[0.12em] text-pitch/78">
            <span className="inline-flex items-center gap-2 rounded-full border border-pitch/20 bg-touchline/65 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              FM26 Staff Tool
            </span>
            <span>Updated for FM26</span>
          </div>
        </div>
      </section>

      <nav
        aria-label="Page sections"
        className="mb-2 flex flex-wrap gap-2 text-xs font-black text-pitch sm:text-sm"
      >
        <a className="rounded-full border border-ink/10 bg-white/75 px-3 py-1.5 hover:bg-touchline/55" href="#calculator">
          Calculator
        </a>
        <a className="rounded-full border border-ink/10 bg-white/75 px-3 py-1.5 hover:bg-touchline/55" href="#how-to-use-it">
          How to use it
        </a>
        <a className="rounded-full border border-ink/10 bg-white/75 px-3 py-1.5 hover:bg-touchline/55" href="#best-attributes">
          Best attributes
        </a>
        <a className="rounded-full border border-ink/10 bg-white/75 px-3 py-1.5 hover:bg-touchline/55" href="#faq">
          FAQ
        </a>
      </nav>

      <section className="mb-2" id="how-to-use-it">
        <div className="mb-2 flex items-end justify-between gap-4">
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-bench">
            How to use it
          </h2>
          <span className="hidden h-px flex-1 bg-ink/10 sm:block" />
        </div>
        <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {howToSteps.map((step) => (
            <li
              className="rounded-lg border border-ink/10 bg-white/78 p-2.5 shadow-[0_10px_26px_rgba(23,32,28,0.07)]"
              key={step.number}
            >
              <span className="inline-flex rounded-full bg-pitch px-2 py-0.5 text-[10px] font-black tracking-[0.12em] text-chalk">
                {step.number}
              </span>
              <h3 className="mt-1.5 text-sm font-black leading-5 text-ink">
                {step.title}
              </h3>
              <p className="mt-1 text-xs leading-5 text-ink/68">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="calculator">
        <h2 className="sr-only">FM26 coach calculator</h2>
        <CoachRatingCalculator />
      </section>

      <section className="mt-5 rounded-lg border border-ink/10 bg-white/78 p-4 shadow-[0_12px_34px_rgba(23,32,28,0.08)]">
        <h2 className="text-lg font-black text-ink">
          What does this FM26 coach calculator do?
        </h2>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-ink/72">
          This tool estimates how well a Football Manager 2026 staff member
          fits each coaching assignment. Enter the coach&apos;s profile ratings,
          then compare assignment ratings from 1 to 5 stars.
        </p>
        <ul className="mt-3 grid gap-2 text-xs font-bold text-ink/72 sm:grid-cols-3">
          <li className="rounded-lg border border-ink/10 bg-chalk/72 px-3 py-2">
            Best for: checking what a coach can realistically offer before you hire him.
          </li>
          <li className="rounded-lg border border-ink/10 bg-chalk/72 px-3 py-2">
            Input: the coach attributes you see on his FM26 profile.
          </li>
          <li className="rounded-lg border border-ink/10 bg-chalk/72 px-3 py-2">
            Output: a live star rating for every training assignment.
          </li>
        </ul>
      </section>

      <section className="mt-5">
        <h2 className="text-sm font-black uppercase tracking-[0.16em] text-bench">
          How it works
        </h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {howItWorksCards.map((item) => (
            <article
              className="rounded-lg border border-ink/10 bg-white/80 p-3.5 shadow-[0_12px_30px_rgba(23,32,28,0.08)]"
              key={item.title}
            >
              <span className="inline-flex rounded-full bg-touchline px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.14em] text-pitch/72">
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

      <section
        className="mt-5 rounded-lg border border-ink/10 bg-white/72 p-4 shadow-[0_14px_40px_rgba(23,32,28,0.08)]"
        id="best-attributes"
      >
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.16em] text-bench">
              Best attributes by FM26 coach assignment
            </h2>
            <p className="mt-2 max-w-4xl text-sm font-semibold leading-6 text-ink/62">
              Different FM26 training assignments value different attributes.
              The table below shows which coach attributes matter most
              for each coaching role, so you can understand why a coach rates
              higher or lower.
            </p>
          </div>
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

      <section
        className="mt-5 rounded-lg border border-ink/10 bg-white/72 p-5"
        id="faq"
      >
        <h2 className="text-xl font-black text-ink">FAQ</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {faqItems.map((item) => (
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
