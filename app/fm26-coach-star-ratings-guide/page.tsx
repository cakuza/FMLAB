import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/siteMetadata";

const pageTitle = "FM26 Coach Star Ratings Guide | FM Workbench";
const pageDescription =
  "A complete guide to coach star ratings in Football Manager 2026. Learn how assignments work, why ratings change, and how to build a 5-star coaching team.";
const canonicalUrl = `${siteUrl}/fm26-coach-star-ratings-guide`;

export const metadata: Metadata = {
  title: "FM26 Coach Star Ratings Guide",
  description: pageDescription,
  alternates: { canonical: "/fm26-coach-star-ratings-guide" },
  openGraph: {
    type: "article",
    url: canonicalUrl,
    siteName: "FM Workbench",
    title: pageTitle,
    description: pageDescription
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: pageDescription
  }
};

export default function CoachStarRatingsGuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        isPartOf: { "@id": `${canonicalUrl}#webpage` },
        headline: "FM26 Coach Star Ratings Guide",
        description: pageDescription,
        author: { "@type": "Organization", name: "FM Workbench" },
        publisher: { "@type": "Organization", name: "FM Workbench" },
        datePublished: "2026-06-23T00:00:00+00:00",
        dateModified: "2026-06-23T00:00:00+00:00",
        mainEntityOfPage: { "@id": `${canonicalUrl}#webpage` }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Coach Star Ratings Guide" }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "How are coach star ratings calculated in FM26?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Coach star ratings are assignment-specific estimates. They range from 0.5 stars to 5.0 stars and indicate the estimated quality of training the coach can provide for a specific category based on their visible attributes."
            }
          },
          {
            "@type": "Question",
            name: "Why did my coach's star rating drop during the season?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Star ratings can fluctuate due to several factors, including changes in the coach's visible attributes, assignment overlap, and increased coaching workload."
            }
          },
          {
            "@type": "Question",
            name: "Is there a huge difference between a 4.5-star and 5.0-star coach?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A 4.5-star coach may already be an excellent practical option, but the value of upgrading to 5.0 depends on club context, cost, workload and alternatives."
            }
          },
          {
            "@type": "Question",
            name: "How does Tactical Knowledge work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In the FM Workbench model, Tactical Knowledge is relevant to the Set Pieces assignment. Ordinary tactical assignments like Attacking Tactical use the Attacking and Tactical coaching attributes instead."
            }
          },
          {
            "@type": "Question",
            name: "Why does the calculator differ from the game sometimes?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In-game results may differ because visible bands hide exact underlying values and because assignment workload may affect displayed coaching quality. Identical word inputs produce identical FM Workbench estimates."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="content-page">
        <div className="content-body">
          <h1 className="tool-heading">FM26 Coach Star Ratings Guide</h1>

          <p>
            <strong>How are coach star ratings calculated in FM26?</strong> Coach star ratings are assignment-specific estimates. They range from 0.5 stars to 5.0 stars and indicate the estimated quality of training the coach can provide for a specific category based on their visible attributes. A higher estimated star rating indicates a stronger coaching profile for that specific role.
          </p>

          <h2>The Assignment-Specific Nature of Star Ratings</h2>
          <p>
            A common misconception is assuming a coach has a universal star rating. In Football Manager 2026, coaching stars are assignment-specific estimates. Their star rating is entirely dependent on the specific training assignment you ask them to handle.
          </p>
          <p>
            For example, a coach might have a strong estimate for an Attacking Technical role due to their Attacking and Technical attributes. However, if you assign that exact same coach to handle Fitness training, their estimated rating may drop significantly if their Fitness attribute is Unsuited. The final estimate also depends on the supporting mental attributes entered. Always evaluate coaches in the context of the specific role they will play on your training ground.
          </p>

          <h2>The Nine Training Assignments</h2>
          <p>
            In FM26, training is broken down into nine distinct assignment categories. To develop your team, you typically look for specialists leading each of these nine areas:
          </p>
          <ol>
            <li><strong>Attacking Tactical:</strong> Focuses on attacking shape and movement.</li>
            <li><strong>Attacking Technical:</strong> Focuses on individual offensive skills and finishing.</li>
            <li><strong>Defending Tactical:</strong> Focuses on defensive shape and offside traps.</li>
            <li><strong>Defending Technical:</strong> Focuses on individual tackling and marking.</li>
            <li><strong>Possession Tactical:</strong> Focuses on retaining shape while holding the ball.</li>
            <li><strong>Possession Technical:</strong> Focuses on first touch and passing accuracy.</li>
            <li><strong>Goalkeeping:</strong> Focuses on shot-stopping, handling, and distribution.</li>
            <li><strong>Fitness:</strong> Focuses on stamina, strength, and quickness.</li>
            <li><strong>Set Pieces:</strong> Focuses on attacking and defending corners and free kicks.</li>
          </ol>

          <h3>Tactical vs. Technical Coaching</h3>
          <p>
            Attacking, Defending, and Possession are split into Tactical and Technical sub-categories. 
          </p>
          <ul>
            <li><strong>Tactical assignments</strong> use the specific Coaching attribute (e.g., Attacking) and the Tactical attribute, supported by mental attributes. (Note: Tactical Knowledge is used for Set Pieces in our model).</li>
            <li><strong>Technical assignments</strong> use the specific Coaching attribute and the Technical attribute, supported by mental attributes.</li>
            <li><strong>Goalkeeping</strong> primarily uses the Goalkeeping attribute, supported by mental attributes.</li>
            <li><strong>Fitness</strong> primarily uses the Fitness attribute, supported by mental attributes.</li>
          </ul>

          <h2>Why Ratings May Change Over Time</h2>
          <p>
            It can be surprising to hire a coach and later see their rating drop. Star ratings are estimates that reflect the current reality of your training ground.
          </p>
          <p>
            Ratings may fluctuate for several reasons:
          </p>
          <ul>
            <li><strong>Changes in the coach&apos;s visible attributes:</strong> Staff Development means coaches have Current Ability and Potential Ability. Their underlying attributes can improve or decline over time, increasing or decreasing their star rating.</li>
            <li><strong>Workload and assignment overlap:</strong> Assignment workload may affect displayed coaching quality.</li>
            <li><strong>Game/database updates:</strong> Underlying attribute values or calculations may shift with official game updates.</li>
            <li><strong>Hidden positions within broad word bands:</strong> In-game results may differ from calculator estimates because visible bands hide exact underlying values.</li>
          </ul>

          <h3>The Impact of Coach Workload</h3>
          <p>
            Assignment workload may affect displayed coaching quality. When a coach is assigned to too many categories, or when the ratio of players to coaches is high, the effectiveness of their training sessions may diminish visually in the game.
          </p>
          <p>
            Workload should be reviewed in your own save, balancing the number of assignments per coach with your club&apos;s requirements and resources, rather than following a strict universal limit.
          </p>

          <h2>Practical Discussion: 4.5 vs. 5.0 Stars</h2>
          <p>
            Many managers target a 5.0-star rating across all nine categories, but this depends on your club&apos;s situation.
          </p>
          <p>
            A 4.5-star coach may already be an excellent practical option, but the value of upgrading to 5.0 depends on club context, cost, workload and alternatives. If you have the choice between spending your budget to upgrade a 4.5-star coach or using those funds to hire better scouts or upgrade facilities, consider your broader strategic goals.
          </p>

          <h2>Balanced Coaching-Team Checklist</h2>
          <p>
            To build a cohesive backroom staff, consider this checklist during the offseason:
          </p>
          <ul>
            <li>[ ] Identify specialists for each of the nine training categories.</li>
            <li>[ ] Review assignment workload to ensure coaches aren&apos;t over-burdened.</li>
            <li>[ ] Monitor the overall coaching workload bar.</li>
            <li>[ ] Check if your Head Coach (you) or Assistant Manager can fill gaps while you recruit.</li>
            <li>[ ] Review staff contracts to retain key coaches.</li>
          </ul>

          <h2>Calculator Estimates vs. In-Game Reality</h2>
          <p>
            Our calculator provides a deterministic estimate based on the words entered. Identical word inputs produce identical FM Workbench estimates.
          </p>
          <p>
            In-game results may differ because visible bands hide exact underlying values and because assignment workload may affect displayed coaching quality. FM Workbench is unofficial and does not claim access to an official published formula.
          </p>

          <div className="p-6 my-8 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <h2 className="mt-0 text-xl font-bold">Calculate Your Coach&apos;s Estimated Value</h2>
            <p className="mb-4">
              Use our tool to estimate their assignment ratings based on their visible word attributes.
            </p>
            <Link href="/" className="inline-block px-6 py-3 font-semibold text-black rounded" style={{ background: "var(--accent-primary)" }}>
              Open the FM coach calculator
            </Link>
          </div>

          <h2>Frequently Asked Questions</h2>
          
          <div className="faq-section mt-8">
            <div className="faq-item mb-6">
              <h3 className="text-lg font-semibold mb-2">How are coach star ratings calculated in FM26?</h3>
              <p>Coach star ratings are assignment-specific estimates. They range from 0.5 stars to 5.0 stars and indicate the estimated quality of training the coach can provide for a specific category based on their visible attributes.</p>
            </div>
            
            <div className="faq-item mb-6">
              <h3 className="text-lg font-semibold mb-2">Why did my coach&apos;s star rating drop during the season?</h3>
              <p>Star ratings can fluctuate due to several factors, including changes in the coach&apos;s visible attributes, assignment overlap, and increased coaching workload.</p>
            </div>
            
            <div className="faq-item mb-6">
              <h3 className="text-lg font-semibold mb-2">Is there a huge difference between a 4.5-star and 5.0-star coach?</h3>
              <p>A 4.5-star coach may already be an excellent practical option, but the value of upgrading to 5.0 depends on club context, cost, workload and alternatives.</p>
            </div>
            
            <div className="faq-item mb-6">
              <h3 className="text-lg font-semibold mb-2">How does Tactical Knowledge work?</h3>
              <p>In the FM Workbench model, Tactical Knowledge is relevant to the Set Pieces assignment. Ordinary tactical assignments like Attacking Tactical use the Attacking and Tactical coaching attributes instead.</p>
            </div>
            
            <div className="faq-item mb-6">
              <h3 className="text-lg font-semibold mb-2">Why does the calculator differ from the game sometimes?</h3>
              <p>In-game results may differ because visible bands hide exact underlying values and because assignment workload may affect displayed coaching quality. Identical word inputs produce identical FM Workbench estimates.</p>
            </div>
          </div>

          <hr className="my-8 border-[rgba(255,255,255,0.1)]" />
          
          <p className="text-sm text-gray-400">
            For more information on the underlying inputs, read our <Link href="/fm26-staff-attributes-explained" className="text-[var(--accent-primary)] hover:underline">FM26 Staff Attributes Explained</Link> guide or view our <Link href="/methodology" className="text-[var(--accent-primary)] hover:underline">Methodology notes</Link>.
          </p>

          <div className="mt-8 text-xs text-gray-500">
            <h3 className="font-semibold text-gray-400 mb-2">Sources and methodology notes</h3>
            <p className="mb-2">This guide is based on standard Football Manager 2026 qualitative attribute structures. FM Workbench is unofficial and does not claim access to an official published formula. The estimated outputs represent a practical tool derived from the visible bands.</p>
            <p>Last updated: June 23, 2026.</p>
            <p>FM Workbench is an unofficial fan-made tool. It is not affiliated with, endorsed by, or sponsored by Sports Interactive or SEGA. All Football Manager trademarks belong to their respective owners.</p>
          </div>

        </div>
      </div>
    </>
  );
}
