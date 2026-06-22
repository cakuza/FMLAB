import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/siteMetadata";
import Script from "next/script";

const pageTitle = "FM26 Staff Attributes Explained | FM Workbench";
const pageDescription =
  "A comprehensive guide to understanding qualitative staff attributes in Football Manager 2026. Learn about the new word bands, the 12 key attributes, and how to evaluate your backroom staff.";
const canonicalUrl = `${siteUrl}/fm26-staff-attributes-explained`;

export const metadata: Metadata = {
  title: "FM26 Staff Attributes Explained",
  description: pageDescription,
  alternates: { canonical: "/fm26-staff-attributes-explained" },
  openGraph: {
    type: "article",
    url: canonicalUrl,
    siteName: "FM Workbench",
    title: pageTitle,
    description: pageDescription
  }
};

export default function StaffAttributesExplainedPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        isPartOf: { "@id": `${canonicalUrl}#webpage` },
        headline: "FM26 Staff Attributes Explained",
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
          { "@type": "ListItem", position: 2, name: "Staff Attributes Explained" }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What are staff attributes in FM26?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In Football Manager 2026, staff attributes have shifted from a 1–20 numerical scale to qualitative descriptive bands. These levels determine a coach's capability in specific areas like Attacking, Defending, or Fitness without exposing the exact underlying number."
            }
          },
          {
            "@type": "Question",
            name: "Can I still see the 1–20 numbers for staff in FM26?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No, the official user interface in FM26 exclusively uses the qualitative descriptive bands for staff attributes. The underlying 1-20 numbers are hidden to provide a more realistic scouting and evaluation experience."
            }
          },
          {
            "@type": "Question",
            name: "How do I compare two coaches with the exact same word bands?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Coaches with identical word bands may still perform slightly differently due to where they fall within that hidden band. However, for practical purposes, evaluating their combination of Mental and Coaching attributes is the best way to separate them. Our calculator can estimate their assignment rating to help you decide."
            }
          },
          {
            "@type": "Question",
            name: "Do all attributes affect every training assignment?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Specialist, Tactical or Technical, and mental attributes contribute differently depending on the specific assignment. For example, Tactical Knowledge is relevant to Set Pieces, while Fitness relies primarily on the Fitness attribute."
            }
          },
          {
            "@type": "Question",
            name: "Why does the calculator differ from the game sometimes?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "In-game results may differ because visible bands hide exact underlying values and because assignment workload may affect displayed coaching quality. FM Workbench provides an estimate based on the visible word bands."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <Script
        id="schema-fm26-staff-attributes"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="content-page">
        <div className="content-body">
          <h1 className="tool-heading">FM26 Staff Attributes Explained</h1>

          <p>
            <strong>What are staff attributes in FM26?</strong> In Football Manager 2026, staff attributes have shifted from a 1–20 numerical scale to qualitative descriptive bands. These levels determine a coach&apos;s capability in specific areas like Attacking, Defending, or Fitness without exposing the exact underlying number. This shift encourages managers to evaluate backroom staff more holistically.
          </p>

          <h2>The Shift from Numbers to Qualitative Bands</h2>
          <p>
            For years, players relied on the traditional 1–20 scale to evaluate staff. In FM26, Sports Interactive has replaced these exact numbers with qualitative words. Visible FM26 words represent broad attribute bands, meaning two coaches with the same word rating might have slight differences under the hood. FM Workbench uses a deterministic estimate based on the words entered; identical word inputs produce identical FM Workbench estimates.
          </p>
          
          <h3>The Eight Word Levels</h3>
          <p>
            Every staff attribute is categorized into one of eight qualitative word levels. Here is a practical, comparative interpretation of these bands:
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.1)]">
                  <th className="py-3 px-4 font-semibold text-[var(--accent-primary)]">Word Level</th>
                  <th className="py-3 px-4 font-semibold text-[var(--accent-primary)]">Interpretation</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[rgba(255,255,255,0.05)]">
                  <td className="py-3 px-4 font-medium">Unsuited</td>
                  <td className="py-3 px-4">A very weak rating. A coach with this rating is generally unsuited for tasks requiring this attribute.</td>
                </tr>
                <tr className="border-b border-[rgba(255,255,255,0.05)]">
                  <td className="py-3 px-4 font-medium">Reasonable</td>
                  <td className="py-3 px-4">A limited level of competence. Acceptable for lower-league clubs but may struggle at higher professional standards.</td>
                </tr>
                <tr className="border-b border-[rgba(255,255,255,0.05)]">
                  <td className="py-3 px-4 font-medium">Competent</td>
                  <td className="py-3 px-4">A functional rating. The coach understands the fundamentals for this area.</td>
                </tr>
                <tr className="border-b border-[rgba(255,255,255,0.05)]">
                  <td className="py-3 px-4 font-medium">Average</td>
                  <td className="py-3 px-4">The middle band. An Average coach provides a standard level of capability.</td>
                </tr>
                <tr className="border-b border-[rgba(255,255,255,0.05)]">
                  <td className="py-3 px-4 font-medium">Good</td>
                  <td className="py-3 px-4">A positive, dependable attribute. Coaches with Good ratings contribute effectively to training sessions.</td>
                </tr>
                <tr className="border-b border-[rgba(255,255,255,0.05)]">
                  <td className="py-3 px-4 font-medium">Very Good</td>
                  <td className="py-3 px-4">A strong level of expertise. These coaches provide excellent training quality.</td>
                </tr>
                <tr className="border-b border-[rgba(255,255,255,0.05)]">
                  <td className="py-3 px-4 font-medium">Outstanding</td>
                  <td className="py-3 px-4">Exceptional ability. Coaches at this level offer highly effective training sessions.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Elite</td>
                  <td className="py-3 px-4">The highest visible band. An Elite attribute indicates the coach is highly specialized in this area.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>The 12 Key Attributes for Training</h2>
          <p>
            When evaluating a coach for the training ground, there are 12 visible inputs to consider. Not all 12 attributes contribute to every assignment. Specialist, Tactical or Technical, and mental attributes contribute differently depending on the assignment.
          </p>

          <h3>1. Coaching Attributes (The Technical Skills)</h3>
          <ul>
            <li><strong>Attacking:</strong> Ability to coach offensive movement and chance creation.</li>
            <li><strong>Defending:</strong> Ability to coach defensive shape and tackling.</li>
            <li><strong>Fitness:</strong> Ability to run physical conditioning and stamina routines.</li>
            <li><strong>Goalkeeping:</strong> Ability to train shot-stopping and handling for keepers.</li>
            <li><strong>Possession:</strong> Ability to coach ball retention and control.</li>
            <li><strong>Set Pieces:</strong> Ability to drill attacking and defending corners and free kicks.</li>
            <li><strong>Tactical:</strong> Ability to coach tactical familiarity and team shape.</li>
            <li><strong>Technical:</strong> Ability to improve individual player technique and first touch.</li>
          </ul>

          <h3>2. Mental Attributes (The Soft Skills)</h3>
          <p>
            These three attributes support a coach&apos;s specific coaching skills during sessions:
          </p>
          <ul>
            <li><strong>Authority (formerly Level of Discipline):</strong> Determines how well the coach commands respect.</li>
            <li><strong>Determination:</strong> Reflects the coach&apos;s personal drive to improve players.</li>
            <li><strong>Motivating:</strong> Dictates the coach&apos;s ability to inspire players during training.</li>
          </ul>

          <h3>3. Knowledge Attributes</h3>
          <ul>
            <li><strong>Tactical Knowledge:</strong> The coach&apos;s overall understanding of tactical systems. In the current FM Workbench model, Tactical Knowledge is relevant to the Set Pieces assignment. It is not used for ordinary Tactical assignments like Attacking Tactical or Defending Tactical.</li>
          </ul>

          <h2>Practical Coach-Comparison Workflow</h2>
          <p>
            Evaluating staff using broad word bands requires a systematic workflow:
          </p>
          <ol>
            <li><strong>Identify the assignment:</strong> Determine exactly which training assignment you need to fill.</li>
            <li><strong>Filter for the primary attributes:</strong> Use the staff search to filter for coaches who have strong ratings in the primary requirements for that specific assignment.</li>
            <li><strong>Check the Mental foundation:</strong> Review the coach&apos;s Authority, Determination, and Motivating ratings to see if they offer strong support.</li>
            <li><strong>Estimate the Star Rating:</strong> Enter the visible word bands into the <Link href="/">FM coach calculator</Link> to get an estimated star rating.</li>
            <li><strong>Compare alternatives:</strong> Look at secondary attributes, cost, and personality to make the final call.</li>
          </ol>

          <h3>A Hypothetical Comparison Example</h3>
          <p>
            Imagine you are evaluating two hypothetical coaches for a Defending Tactical assignment.
          </p>
          <ul>
            <li><strong>Coach A:</strong> Elite Defending, Very Good Tactical, Competent Authority, Determination, and Motivating.</li>
            <li><strong>Coach B:</strong> Very Good Defending, Very Good Tactical, and Very Good across all three Mental attributes.</li>
          </ul>
          <p>
            By entering both hypothetical profiles into the FM Workbench calculator, you can receive an estimated star rating for each. Because Coaching stars are assignment-specific estimates that combine primary technical skills with supporting mental attributes, comparing their calculator outputs provides a practical baseline before signing either coach.
          </p>

          <h2>Common Mistakes to Avoid</h2>
          <ul>
            <li><strong>Ignoring Mental Attributes:</strong> A coach&apos;s specific coaching skills (like Defending or Attacking) are supported by their mental foundation.</li>
            <li><strong>Focusing solely on one attribute:</strong> A combination of attributes determines the final estimate. An Elite attribute in one category does not guarantee a high star rating if the supporting attributes are Unsuited.</li>
            <li><strong>Assuming all attributes apply everywhere:</strong> Remember that Tactical Knowledge is relevant to Set Pieces, while Tactical (the coaching attribute) supports assignments like Attacking Tactical and Defending Tactical.</li>
          </ul>

          <div className="p-6 my-8 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <h2 className="mt-0 text-xl font-bold">Ready to evaluate your backroom staff?</h2>
            <p className="mb-4">
              Use our calculator to estimate the star rating for any coach based on their visible attributes.
            </p>
            <Link href="/" className="inline-block px-6 py-3 font-semibold text-black rounded" style={{ background: "var(--accent-primary)" }}>
              Open the FM coach calculator
            </Link>
          </div>

          <h2>Frequently Asked Questions</h2>
          
          <div className="faq-section mt-8">
            <div className="faq-item mb-6">
              <h3 className="text-lg font-semibold mb-2">What are staff attributes in FM26?</h3>
              <p>In Football Manager 2026, staff attributes have shifted from a 1–20 numerical scale to qualitative descriptive bands. These levels determine a coach&apos;s capability in specific areas like Attacking, Defending, or Fitness without exposing the exact underlying number.</p>
            </div>
            
            <div className="faq-item mb-6">
              <h3 className="text-lg font-semibold mb-2">Can I still see the 1–20 numbers for staff in FM26?</h3>
              <p>No, the official user interface in FM26 exclusively uses the qualitative descriptive bands for staff attributes. The underlying 1-20 numbers are hidden to provide a more realistic scouting and evaluation experience.</p>
            </div>
            
            <div className="faq-item mb-6">
              <h3 className="text-lg font-semibold mb-2">How do I compare two coaches with the exact same word bands?</h3>
              <p>Coaches with identical word bands may still perform slightly differently due to where they fall within that hidden band. However, for practical purposes, evaluating their combination of Mental and Coaching attributes is the best way to separate them. Our calculator can estimate their assignment rating to help you decide.</p>
            </div>
            
            <div className="faq-item mb-6">
              <h3 className="text-lg font-semibold mb-2">Do all attributes affect every training assignment?</h3>
              <p>No. Specialist, Tactical or Technical, and mental attributes contribute differently depending on the specific assignment. For example, Tactical Knowledge is relevant to Set Pieces, while Fitness relies primarily on the Fitness attribute.</p>
            </div>
            
            <div className="faq-item mb-6">
              <h3 className="text-lg font-semibold mb-2">Why does the calculator differ from the game sometimes?</h3>
              <p>In-game results may differ because visible bands hide exact underlying values and because assignment workload may affect displayed coaching quality. FM Workbench provides an estimate based on the visible word bands.</p>
            </div>
          </div>

          <hr className="my-8 border-[rgba(255,255,255,0.1)]" />
          
          <p className="text-sm text-gray-400">
            For more information on how assignments work, read our <Link href="/fm26-coach-star-ratings-guide" className="text-[var(--accent-primary)] hover:underline">FM26 Coach Star Ratings Guide</Link> or view our <Link href="/methodology" className="text-[var(--accent-primary)] hover:underline">Methodology notes</Link>.
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
