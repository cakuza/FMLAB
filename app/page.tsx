import type { Metadata } from "next";
import { CoachRatingCalculator } from "@/components/CoachRatingCalculator";
import { type AttributeKey, attributeLabels } from "@/lib/attributeLevels";
import { siteName, siteUrl } from "@/lib/siteMetadata";
import { trainingCategories } from "@/lib/trainingCategories";

const pageTitle = "FM Lab — FM26 Coach Assignment Calculator";
const pageDescription =
  "Find the right role for any FM26 coach. Enter coach attributes and instantly see all 9 assignment ratings — ranked, scored, explained.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", url: "/", siteName,
    title: "FM Lab — FM26 Coach Assignment Calculator",
    description: pageDescription
  },
  twitter: { card: "summary", title: pageTitle, description: pageDescription }
};

const howRows = [
  { n: "01", title: "Open the coach profile", text: "In FM26, view any coach or staff member you want to evaluate." },
  { n: "02", title: "Enter the attribute words", text: "Match the word ratings (Reasonable, Good, Very Good…) for all 11 attributes." },
  { n: "03", title: "Read the assignment ratings", text: "FM Lab shows star estimates for all 9 coaching roles, ranked by fit." },
  { n: "04", title: "Assign or hire confidently", text: "Know the best role before committing wages or reassigning your staff." }
];

const faqItems = [
  { question: "Is this official?", answer: "No. FM Lab is an unofficial, fan-made calculator and is not affiliated with Sports Interactive, SEGA or Football Manager." },
  { question: "What attributes should I enter?", answer: "Enter the coaching and mental attributes from the FM26 coach profile: Attacking, Defending, Fitness, Goalkeeping, Possession, Set Pieces, Tactical, Technical, Authority, Determination and Motivating." },
  { question: "What does the assignment rating mean?", answer: "The rating estimates how suitable the coach is for that training assignment, shown as a star score for quick comparison." },
  { question: "Can I use this before hiring a coach?", answer: "Yes. The calculator is designed to help you compare staff before offering wages or assigning a role." },
  { question: "Why do some assignments rate differently?", answer: "Each assignment weighs attributes differently. Attacking Tactical, Defending Technical, Fitness and Goalkeeping all use a different attribute mix." },
  { question: "Is it exact?", answer: "No. It is an approximation based on the coach profile and should be used as a practical decision aid, not an official formula." }
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "FM Lab — FM26 Coach Assignment Calculator",
    applicationCategory: "SportsApplication",
    operatingSystem: "Web",
    description: pageDescription,
    url: siteUrl
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  }
];

export default function Home() {
  return (
    <div className="tool-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="tool-intro">
        <h1 className="tool-heading">FM26 Coach Assignment Calculator</h1>
        <p className="tool-sub">Enter coach attributes. Instantly compare all 9 training assignment ratings.</p>
      </div>

      <CoachRatingCalculator />

      <div className="below-fold">
        <section className="home-section" id="how">
          <div className="home-section-head">
            <h2 className="home-section-title">How to use it</h2>
          </div>
          <div className="how-grid">
            {howRows.map((r) => (
              <div key={r.n} className="how-card">
                <span className="how-num">{r.n}</span>
                <h3 className="how-title">{r.title}</h3>
                <p className="how-text">{r.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="home-section" id="best-attributes">
          <div className="home-section-head">
            <h2 className="home-section-title">Best attributes by assignment</h2>
            <p className="home-section-sub">Each assignment values a different attribute mix. Here&apos;s what matters most.</p>
          </div>
          <div className="weights-table-wrap">
            <table className="weights-table">
              <thead>
                <tr>
                  <th>Assignment</th>
                  <th>Primary attributes</th>
                  <th>Mental support</th>
                </tr>
              </thead>
              <tbody>
                {trainingCategories.map((cat) => (
                  <tr key={cat.id}>
                    <td className="wt-name">{cat.label}</td>
                    <td className="wt-primary">
                      {cat.keyAttributes.map((k) => attributeLabels[k as AttributeKey]).join(" + ")}
                    </td>
                    <td className="wt-support">Authority, Determination, Motivating</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="home-section" id="faq">
          <div className="home-section-head">
            <h2 className="home-section-title">FAQ</h2>
          </div>
          <div className="faq-list">
            {faqItems.map((item) => (
              <details key={item.question} className="faq-item">
                <summary className="faq-q">
                  <span>{item.question}</span>
                  <span className="faq-chevron">›</span>
                </summary>
                <div className="faq-a">{item.answer}</div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
