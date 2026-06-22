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
            <strong>What are staff attributes in FM26?</strong> In Football Manager 2026, staff attributes have shifted from a 1–20 numerical scale to qualitative descriptive bands. These levels determine a coach&apos;s capability in specific areas like Attacking, Defending, or Fitness without exposing the exact underlying number. This fundamental shift requires managers to rethink how they evaluate and recruit their backroom staff.
          </p>

          <h2>The Shift from Numbers to Qualitative Bands</h2>
          <p>
            For years, Football Manager players relied on the traditional 1–20 scale to evaluate staff. A coach with an 18 in Attacking and a 19 in Tactical Knowledge was an immediate, obvious hire. In FM26, Sports Interactive has removed these exact numbers for staff, replacing them with a series of qualitative words. This change makes building a coaching staff feel more like real-life football management—you have a general sense of a coach&apos;s proficiency, but not absolute mathematical certainty.
          </p>
          
          <h3>The Eight Word Levels</h3>
          <p>
            Every staff attribute in FM26 is categorized into one of eight qualitative word levels. Understanding these levels is the foundation of building a world-class training setup:
          </p>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.1)]">
                  <th className="py-3 px-4 font-semibold text-[var(--accent-primary)]">Word Level</th>
                  <th className="py-3 px-4 font-semibold text-[var(--accent-primary)]">Explanation</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[rgba(255,255,255,0.05)]">
                  <td className="py-3 px-4 font-medium">Unsuited</td>
                  <td className="py-3 px-4">The lowest possible rating. A coach with this rating is completely ill-equipped for tasks requiring this attribute and should be kept far away from related training sessions.</td>
                </tr>
                <tr className="border-b border-[rgba(255,255,255,0.05)]">
                  <td className="py-3 px-4 font-medium">Reasonable</td>
                  <td className="py-3 px-4">A very basic level of competence. Acceptable for lower-league clubs but insufficient for professional development at a high standard.</td>
                </tr>
                <tr className="border-b border-[rgba(255,255,255,0.05)]">
                  <td className="py-3 px-4 font-medium">Competent</td>
                  <td className="py-3 px-4">A functional rating. The coach understands the fundamentals but lacks the expertise to elevate players to their maximum potential.</td>
                </tr>
                <tr className="border-b border-[rgba(255,255,255,0.05)]">
                  <td className="py-3 px-4 font-medium">Average</td>
                  <td className="py-3 px-4">The baseline professional standard. An Average coach is reliable but unremarkable, fitting perfectly into mid-table or lower-tier professional setups.</td>
                </tr>
                <tr className="border-b border-[rgba(255,255,255,0.05)]">
                  <td className="py-3 px-4 font-medium">Good</td>
                  <td className="py-3 px-4">A strong, dependable attribute. Coaches with Good ratings can contribute effectively to top-flight training grounds and help players reach their potential.</td>
                </tr>
                <tr className="border-b border-[rgba(255,255,255,0.05)]">
                  <td className="py-3 px-4 font-medium">Very Good</td>
                  <td className="py-3 px-4">High-level expertise. These coaches are highly sought after and provide excellent training quality, significantly accelerating player growth.</td>
                </tr>
                <tr className="border-b border-[rgba(255,255,255,0.05)]">
                  <td className="py-3 px-4 font-medium">Outstanding</td>
                  <td className="py-3 px-4">Exceptional ability. Coaches at this level are among the best in the sport, offering premium training sessions that top clubs demand.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Elite</td>
                  <td className="py-3 px-4">The absolute pinnacle. An Elite attribute means the coach is a world-class specialist in this area, capable of maximizing the development of even the most talented wonderkids.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>The 12 Key Attributes for Training</h2>
          <p>
            When evaluating a coach for the training ground, there are 12 visible inputs you need to consider. These are divided into three distinct groups: Coaching, Mental, and Knowledge.
          </p>

          <h3>1. Coaching Attributes (The Technical Skills)</h3>
          <p>
            These eight attributes represent the coach&apos;s practical ability to run specific types of drills on the grass:
          </p>
          <ul>
            <li><strong>Attacking:</strong> Ability to coach offensive movement, final third entries, and chance creation.</li>
            <li><strong>Defending:</strong> Ability to coach defensive shape, pressing triggers, and tackling.</li>
            <li><strong>Fitness:</strong> Ability to run physical conditioning, stamina, and injury-prevention routines.</li>
            <li><strong>Goalkeeping:</strong> Ability to train shot-stopping, handling, and distribution for keepers.</li>
            <li><strong>Possession:</strong> Ability to coach ball retention, passing networks, and control.</li>
            <li><strong>Set Pieces:</strong> Ability to drill attacking and defending corners, free kicks, and throw-ins.</li>
            <li><strong>Tactical:</strong> Ability to coach tactical familiarity, team shape, and strategic understanding.</li>
            <li><strong>Technical:</strong> Ability to improve individual player technique, first touch, and ball control.</li>
          </ul>

          <h3>2. Mental Attributes (The Soft Skills)</h3>
          <p>
            Often referred to as the &quot;Holy Trinity&quot; by experienced managers, these three attributes act as a multiplier for a coach&apos;s technical skills. A coach with Elite Attacking but Average mental attributes will struggle to run a truly effective session.
          </p>
          <ul>
            <li><strong>Authority (formerly Level of Discipline):</strong> Determines how well the coach commands respect and keeps players focused during grueling sessions.</li>
            <li><strong>Determination:</strong> Reflects the coach&apos;s personal drive to improve players and push them to their limits.</li>
            <li><strong>Motivating:</strong> Dictates the coach&apos;s ability to inspire players, keeping morale and effort high during training.</li>
          </ul>

          <h3>3. Knowledge Attributes</h3>
          <p>
            While scouts use several knowledge attributes, coaches rely primarily on one key input for their training ground effectiveness:
          </p>
          <ul>
            <li><strong>Tactical Knowledge:</strong> The coach&apos;s overall understanding of the game&apos;s tactical systems. This is particularly crucial for Tactical coaching assignments.</li>
          </ul>

          <h2>Practical Coach-Comparison Workflow</h2>
          <p>
            Evaluating staff without exact numbers can feel intimidating, but an experienced Football Manager player uses a systematic workflow to find the right personnel. Here is the recommended approach:
          </p>
          <ol>
            <li><strong>Identify the gap:</strong> Determine exactly which training assignment you need to fill (e.g., Attacking Technical).</li>
            <li><strong>Filter for the primary attributes:</strong> Use the staff search to filter for coaches who have at least a &quot;Good&quot; or &quot;Very Good&quot; in the primary requirements (in this case, Attacking and Technical).</li>
            <li><strong>Check the Mental foundation:</strong> Filter out coaches who have poor Authority, Determination, or Motivating. Aim for a baseline of at least &quot;Average&quot; across these three.</li>
            <li><strong>Estimate the Star Rating:</strong> Plug the visible word bands into the <Link href="/">FM26 Coach Assignment Calculator</Link> to get an estimated star rating for the specific assignment.</li>
            <li><strong>Compare candidates:</strong> If two coaches offer the same estimated star rating, look at their personality, preferred formation, or secondary coaching attributes to make the final call.</li>
          </ol>

          <h3>A Fictional Comparison Example</h3>
          <p>
            Imagine you are deciding between two coaches for a Defending Tactical assignment.
          </p>
          <ul>
            <li><strong>Coach A:</strong> Elite Defending, Very Good Tactical, but only Competent in Authority, Determination, and Motivating.</li>
            <li><strong>Coach B:</strong> Very Good Defending, Very Good Tactical, and Very Good across all three Mental attributes.</li>
          </ul>
          <p>
            A novice manager might be blinded by Coach A&apos;s &quot;Elite&quot; Defending tag. However, an experienced player knows that Coach B&apos;s superior mental foundation will likely yield a higher star rating and more effective training sessions overall. The synergy between the 12 attributes is what ultimately dictates coaching quality.
          </p>

          <h2>Common Mistakes to Avoid</h2>
          <ul>
            <li><strong>Ignoring Authority, Determination, and Motivating:</strong> As demonstrated above, elite technical skills mean nothing if the coach cannot control or inspire the squad.</li>
            <li><strong>Chasing &quot;Elite&quot; tags blindly:</strong> A balanced profile of &quot;Very Good&quot; attributes is almost always better than a heavily skewed profile with one &quot;Elite&quot; attribute and several &quot;Unsuited&quot; or &quot;Reasonable&quot; ones.</li>
            <li><strong>Hiring generalists for specialist roles:</strong> While a coach with &quot;Good&quot; across every single attribute looks great, they will likely be outperformed by a specialist when assigned to a single, focused training category.</li>
          </ul>

          <div className="p-6 my-8 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <h2 className="mt-0 text-xl font-bold">Ready to evaluate your backroom staff?</h2>
            <p className="mb-4">
              Stop guessing how word bands translate to training quality. Use our calculator to instantly estimate the star rating for any coach based on their visible attributes.
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
          </div>

          <hr className="my-8 border-[rgba(255,255,255,0.1)]" />
          
          <p className="text-sm text-gray-400">
            For more information on how assignments work, read our <Link href="/fm26-coach-star-ratings-guide" className="text-[var(--accent-primary)] hover:underline">FM26 Coach Star Ratings Guide</Link> or view our <Link href="/methodology" className="text-[var(--accent-primary)] hover:underline">Methodology</Link>.
          </p>

          <div className="mt-8 text-xs text-gray-500">
            <p>Last updated: June 23, 2026.</p>
            <p>FM Workbench is an unofficial fan-made tool. It is not affiliated with, endorsed by, or sponsored by Sports Interactive or SEGA. All Football Manager trademarks belong to their respective owners.</p>
          </div>

        </div>
      </div>
    </>
  );
}
