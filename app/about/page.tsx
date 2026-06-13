import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/siteMetadata";

export const metadata: Metadata = {
  title: "About",
  description:
    "FM Workbench is an unofficial fan-made Football Manager 2026 tool for estimating coach assignment star ratings from visible staff attributes.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/about`,
    title: "About | FM Workbench",
    description: "What FM Workbench is, why it exists, and where it is heading."
  }
};

export default function AboutPage() {
  return (
    <div className="content-page">
      <div className="content-body">
        <h1>About FM Workbench</h1>
        <p className="content-sub">Unofficial FM26 coaching utilities</p>

        <h2>What FM Workbench is</h2>
        <p>
          FM Workbench is an unofficial, fan-made collection of practical utilities for
          Football Manager 2026 players. The site is built and maintained independently
          and has no affiliation with Sports Interactive, SEGA, or the Football Manager
          franchise.
        </p>

        <h2>Why it exists</h2>
        <p>
          FM26 replaced numerical coach attributes with word-level descriptions such as
          Average, Good, and Very Good. This makes it harder to quickly compare coaches
          or know which assignment fits a coach best before committing wages or
          reassigning staff.
        </p>
        <p>
          FM Workbench translates those word levels into estimated assignment star ratings
          so you can make faster, better-informed decisions in your save.
        </p>

        <h2>The FM26 Coach Assignment Calculator</h2>
        <p>
          The current main tool is the{" "}
          <Link href="/">FM26 Coach Assignment Calculator</Link>. Enter the word-level
          attributes from any coach profile in FM26, and the calculator returns estimated
          star ratings for all nine training assignment categories:
        </p>
        <ul>
          <li>Attacking Tactical and Attacking Technical</li>
          <li>Defending Tactical and Defending Technical</li>
          <li>Possession Tactical and Possession Technical</li>
          <li>Goalkeeping, Fitness, and Set Pieces</li>
        </ul>
        <p>
          The formula uses 12 visible attributes and has been calibrated against 180
          observed FM26 outputs across 20 controlled profiles, achieving a 96.7%
          exact-match rate.{" "}
          <Link href="/methodology">Read the methodology</Link> for full details.
        </p>

        <h2>Future direction</h2>
        <p>
          FM Workbench aims to grow into a small set of practical Football Manager tools —
          all focused on reducing the lookup and calculation work that currently lives in
          spreadsheets or forum threads. Future tools may cover staff recruitment
          filtering, role suitability, or training schedule comparisons, depending on
          what is most useful.
        </p>

        <h2>Unofficial status</h2>
        <p>
          FM Workbench is entirely fan-made. It is not affiliated with, endorsed by,
          sponsored by, or connected to Sports Interactive, SEGA, or Football Manager.
          The formula is a fan-made approximation, not derived from any official source
          code or documentation. All Football Manager trademarks belong to their
          respective owners.
        </p>

        <Link href="/" className="content-back-link">← Back to the calculator</Link>
      </div>
    </div>
  );
}
