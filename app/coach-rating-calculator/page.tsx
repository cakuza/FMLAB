import type { Metadata } from "next";
import { CoachRatingCalculator } from "@/components/CoachRatingCalculator";
import { siteName, siteUrl } from "@/lib/siteMetadata";

const pageTitle = "FM26 Coach Calculator — Assignment Ratings | FM Lab";
const pageDescription =
  "Estimate FM26 coach ratings for every training assignment. Enter coach profile attributes and compare Attacking, Defending, Possession, Goalkeeping, Fitness and Set Pieces ratings.";
const ogDescription = "Compare FM26 staff assignment ratings before you hire or assign coaches.";
const pageUrl = `${siteUrl}/coach-rating-calculator`;

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", url: "/coach-rating-calculator", siteName,
    title: "FM26 Coach Calculator",
    description: ogDescription
  },
  twitter: { card: "summary", title: "FM26 Coach Calculator", description: ogDescription }
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "FM26 Coach Calculator",
    applicationCategory: "SportsApplication",
    operatingSystem: "Web",
    description: pageDescription,
    url: pageUrl
  }
];

export default function CoachRatingCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <h1 className="sr-only">FM26 Coach Assignment Calculator</h1>
      <CoachRatingCalculator />
    </>
  );
}
