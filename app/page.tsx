import { Sparkles } from "lucide-react";
import { CoachRatingCalculator } from "@/components/CoachRatingCalculator";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
      <section className="relative mb-6 overflow-hidden rounded-2xl border border-ink/10 bg-white/72 p-5 shadow-panel sm:p-7">
        <div className="pitch-lines pointer-events-none absolute inset-0 opacity-[0.06]" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-pitch/20 bg-touchline/60 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-pitch">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            Unofficial FM26 tool
          </span>
          <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_0.6fr] lg:items-end">
            <div>
              <h1 className="text-3xl font-black leading-[1.05] text-ink sm:text-5xl">
                FM26 Coach Rating Calculator
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-ink/70 sm:text-lg">
                Pick a training category, adjust only the highlighted coach
                attributes with the plus and minus buttons, and get an estimated
                star rating for Football Manager 2026.
              </p>
            </div>
            <div className="flex gap-3 rounded-xl border border-pitch/15 bg-touchline/70 p-4 text-sm font-semibold leading-6 text-pitch">
              <Sparkles
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-pitch/70"
                size={18}
              />
              <span>
                The model is unofficial and approximate. It uses FM26 word
                levels, never visible numeric staff inputs.
              </span>
            </div>
          </div>
        </div>
      </section>

      <CoachRatingCalculator />
    </div>
  );
}
