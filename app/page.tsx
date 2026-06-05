import type { Metadata } from "next";
import { CoachRatingCalculator } from "@/components/CoachRatingCalculator";

export const metadata: Metadata = {
  title: "FM26 Coach Assignment Calculator",
  description:
    "Estimate Football Manager 2026 coach assignment stars from visible word-based staff attributes before offering a contract."
};

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
      <section className="relative mb-3 overflow-hidden rounded-lg border border-ink/10 bg-white/72 p-4 shadow-panel">
        <div className="pitch-lines pointer-events-none absolute inset-0 opacity-[0.06]" />
        <div className="relative flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <span className="inline-flex items-center gap-2 rounded-full border border-pitch/20 bg-touchline/60 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-pitch">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            Unofficial FM26 tool
          </span>
          <div className="lg:flex-1">
            <h1 className="text-2xl font-black leading-tight text-ink sm:text-3xl">
              FM26 Coach Assignment Calculator
            </h1>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-ink/70">
              Turn FM26 word attributes into instant assignment stars and spot
              the coach who can lift your training week before you offer the
              contract.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-3 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
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
              Check the estimated stars by assignment.
            </li>
            <li>
              Use the top results before offering a contract.
            </li>
          </ol>
        </article>
        <article className="rounded-lg border border-signal/30 bg-touchline/80 p-4 shadow-panel">
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-pitch">
            Unofficial estimate
          </h2>
          <p className="mt-3 text-sm leading-6 text-ink/72">
            FM Lab is a fan-made comparison tool. Ratings are approximate and
            may differ from exact in-game stars.
          </p>
        </article>
      </section>

      <CoachRatingCalculator />

      <section className="mt-4 rounded-lg border border-ink/10 bg-white/76 p-4 shadow-panel">
        <h2 className="text-sm font-black uppercase tracking-[0.16em] text-bench">
          How the estimate works
        </h2>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-ink/72">
          Each training assignment combines its main coaching attributes with
          supporting mental attributes: Determination, Authority and Motivating.
          FM Lab then ranks the 9 assignment slots from strongest to weakest so
          you can compare coaches quickly and consistently.
        </p>
      </section>
    </div>
  );
}
