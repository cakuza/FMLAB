import type { Metadata } from "next";
import Link from "next/link";
import { CoachRatingCalculator } from "@/components/CoachRatingCalculator";
import { type AttributeKey, attributeLabels } from "@/lib/attributeLevels";
import { siteName, siteUrl } from "@/lib/siteMetadata";
import { trainingCategories } from "@/lib/trainingCategories";

const pageTitle = "FM26 Coach Assignment Calculator | FM Workbench";
const pageDescription =
  "Free FM coach calculator built for Football Manager 26. Enter a coach’s word-based attributes and compare estimated ratings across all nine FM26 training assignments.";
const ogDescription =
  "Free FM coach calculator built for Football Manager 26. Enter a coach’s word-based attributes and compare estimated ratings across all nine FM26 training assignments.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", url: "/", siteName,
    title: pageTitle,
    description: ogDescription
  },
  twitter: { card: "summary", title: pageTitle, description: ogDescription }
};

const howRows = [
  { n: "01", title: "Open the coach profile", text: "In FM26, view any coach or staff member you want to evaluate." },
  { n: "02", title: "Enter the attribute words", text: "Match the word ratings (Reasonable, Good, Very Good…) for all 12 attributes." },
  { n: "03", title: "Read the assignment ratings", text: "FM Workbench shows star estimates for all 9 coaching roles, ranked by fit." },
  { n: "04", title: "Assign or hire confidently", text: "Know the best role before committing wages or reassigning your staff." }
];

const faqItems = [
  {
    question: "Is this the official FM26 coach rating formula?",
    answer: "No. FM Workbench is an unofficial, fan-made tool. The formula is an estimated approximation based on publicly visible FM26 coach attributes. It is not affiliated with Sports Interactive, SEGA, or Football Manager."
  },
  {
    question: "How accurate is the FM26 Coach Assignment Calculator?",
    answer: "Results are a close estimate, not a guaranteed match. In-game star ratings can vary based on coach workload, squad size, and whether a coach covers multiple roles. Use the calculator as a comparison guide, not an exact measure."
  },
  {
    question: "What is the difference between Attacking Tactical and Attacking Technical?",
    answer: "Both assignments require high Attacking skill. Attacking Tactical favours coaches with strong Tactical ability for shape and structure work. Attacking Technical favours coaches with strong Technical ability for skill-based and ball-work sessions."
  },
  {
    question: "What is the difference between Defending Tactical and Defending Technical?",
    answer: "Both require high Defending skill. Defending Tactical suits coaches who can organise defensive shape and systems. Defending Technical suits coaches who focus on individual defensive technique and positioning."
  },
  {
    question: "What is the difference between Possession Tactical and Possession Technical?",
    answer: "Both require high Possession skill. Possession Tactical covers structured press and retention systems. Possession Technical covers technical ball-work and close-control sessions."
  },
  {
    question: "Which attributes matter for Fitness coaches in FM26?",
    answer: "Fitness is the primary attribute for the Fitness assignment. Authority, Determination and Motivating provide supporting weight. Coaching skill attributes like Attacking or Tactical have little influence on this assignment."
  },
  {
    question: "Which attributes matter for Goalkeeping coaches in FM26?",
    answer: "Goalkeeping is the primary attribute for the Goalkeeping assignment. Authority, Determination and Motivating provide supporting weight. Other coaching attributes have minimal effect on this role."
  },
  {
    question: "Which attributes matter for Set Pieces coaches in FM26?",
    answer: "The Set Pieces assignment values a coach's Set Pieces ability most highly. Tactical Knowledge also carries meaningful weight for this assignment. Tactical, Technical, Authority, Determination and Motivating all contribute additional support."
  },
  {
    question: "Why does FM26 use word-based staff attributes?",
    answer: "FM26 replaced numerical coach attributes with word-based descriptions (Average, Competent, Good, Very Good, Outstanding) to simplify the interface. FM Workbench converts these words to score ranges internally for estimation."
  },
  {
    question: "Can I use this calculator during a save?",
    answer: "Yes. The calculator works in any browser alongside your FM26 game. Enter the attribute words directly from the coach profile screen and compare assignments in seconds."
  },
  {
    question: "Can I use this FM coach calculator for older Football Manager versions?",
    answer: "FM Workbench is designed specifically for FM26 and its word-based coach attributes and training assignments. Older Football Manager versions may use different attributes, categories or rating behaviour, so their results may not match."
  }
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: "Unofficial FM26 coaching utilities and calculators."
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "FM26 Coach Assignment Calculator",
    alternateName: [
      "FM Coach Calculator",
      "Football Manager Coach Calculator",
      "FM26 Coach Calculator",
      "FM26 Coach Rating Calculator",
      "FM26 Coach Assignment Calculator"
    ],
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    description: pageDescription,
    url: siteUrl,
    isAccessibleForFree: true,
    creator: { "@type": "Organization", name: siteName }
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

        <section className="home-section" id="quick-answer">
          <div className="home-section-head">
            <h2 className="home-section-title">Quick answer</h2>
          </div>
          <div className="quick-answer-body">
            <p>FM Workbench is an FM coach calculator built specifically for Football Manager 26 and its word-based staff attributes. It estimates which FM26 training assignment fits a coach best. Select the coach&apos;s word-based attributes from their FM26 profile, then compare estimated star ratings for all nine assignment categories: Attacking, Defending, Possession, Goalkeeping, Fitness and Set Pieces.</p>
            <p>Each assignment weights attributes differently. An Attacking Tactical coach needs high Attacking and Tactical ratings. A Fitness coach needs high Fitness. A Set Pieces coach benefits from Set Pieces, Tactical and Technical combined. Authority, Determination and Motivating support every assignment.</p>
            <p>Results are estimates based on visible attribute words. In-game ratings may differ slightly depending on workload and squad context, but the calculator gives a reliable comparison for hiring and assignment decisions.</p>
          </div>
        </section>

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
                  <th>Key attributes</th>
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

        <section className="home-section" id="about">
          <div className="home-section-head">
            <h2 className="home-section-title">About the calculator</h2>
          </div>
          <div className="geo-blocks">
            <div className="geo-block">
              <h3 className="geo-q">What is the FM26 Coach Assignment Calculator?</h3>
              <p className="geo-a">FM Workbench is an unofficial fan-made web tool that estimates the best training assignment for any FM26 coach. You enter the coach&apos;s visible word attributes and the tool returns estimated star ratings for all nine assignment categories so you can compare and decide quickly.</p>
            </div>
            <div className="geo-block">
              <h3 className="geo-q">How does the FM26 coach calculator work?</h3>
              <p className="geo-a">FM Workbench reads the word-based attributes from the coach profile and evaluates each assignment using a combination of relevant coaching ability, tactical or technical fit, mental strengths and knowledge. The output is an estimated star rating from 0.5 to 5 stars.</p>
            </div>
            <div className="geo-block">
              <h3 className="geo-q">Which FM26 coach attributes matter?</h3>
              <p className="geo-a">The calculator uses 12 attributes from the FM26 coach profile: Attacking, Defending, Fitness, Goalkeeping, Possession, Set Pieces, Tactical and Technical as the eight coaching attributes, plus Authority, Determination and Motivating as the three mental attributes, and Tactical Knowledge as the knowledge attribute. Mental attributes contribute across all assignments. Tactical Knowledge is particularly relevant to Set Pieces.</p>
            </div>
            <div className="geo-block">
              <h3 className="geo-q">What is the difference between Tactical and Technical assignments?</h3>
              <p className="geo-a">Tactical assignments (Attacking Tactical, Defending Tactical, Possession Tactical) place greater weight on a coach&apos;s Tactical rating. Technical assignments place greater weight on Technical instead. In both cases the relevant specialist skill — Attacking, Defending or Possession — remains a key factor for that pair.</p>
            </div>
            <div className="geo-block">
              <h3 className="geo-q">Why are the results approximate?</h3>
              <p className="geo-a">FM26 coach attributes are displayed as word bands, not exact numbers. Each word covers a range of underlying values, and the calculator cannot know where within that band a coach sits. In-game ratings can also vary with workload and squad size.</p>
            </div>
          </div>
        </section>

        <section className="home-section" id="accuracy">
          <div className="home-section-head">
            <h2 className="home-section-title">A practical assignment estimate</h2>
          </div>
          <div className="accuracy-block">
            <p>FM Workbench combines the relevant coaching, mental and knowledge attributes into a consistent 0.5–5 star estimate. It is an unofficial fan-made tool and may differ from in-game results.</p>
            <Link href="/methodology" className="accuracy-link">Read the methodology →</Link>
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
