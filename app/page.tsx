import { CoachRatingCalculator } from "@/components/CoachRatingCalculator";

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

      <CoachRatingCalculator />
    </div>
  );
}
