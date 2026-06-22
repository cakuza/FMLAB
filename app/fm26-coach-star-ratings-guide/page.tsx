import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/siteMetadata";
import Script from "next/script";

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
              text: "Coach star ratings are assignment-specific estimates calculated from a coach's visible qualitative attributes (like Attacking, Tactical, and Determination). They range from 0.5 stars to 5.0 stars and indicate the overall quality of training the coach can provide for a specific category."
            }
          },
          {
            "@type": "Question",
            name: "Why did my coach's star rating drop during the season?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Star ratings can fluctuate due to several dynamic factors, including increased coaching workload, changes in squad size, or the coach attending a coaching course. A rating dropping does not mean the coach's underlying attributes worsened."
            }
          },
          {
            "@type": "Question",
            name: "Is there a huge difference between a 4.5-star and 5.0-star coach?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The difference between 4.5 and 5.0 stars is marginal. While a 5.0-star coach is the gold standard, a 4.5-star coach will still provide world-class training and excellent player development."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <Script
        id="schema-fm26-coach-stars"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="content-page">
        <div className="content-body">
          <h1 className="tool-heading">FM26 Coach Star Ratings Guide</h1>

          <p>
            <strong>How are coach star ratings calculated in FM26?</strong> Coach star ratings are assignment-specific estimates calculated from a coach&apos;s visible qualitative attributes (like Attacking, Tactical, and Determination). They range from 0.5 stars to 5.0 stars and indicate the overall quality of training the coach can provide for a specific category. A higher star rating generally translates to more effective training sessions and better player development.
          </p>

          <h2>The Assignment-Specific Nature of Star Ratings</h2>
          <p>
            The most common mistake new managers make is assuming a coach has a universal star rating. In Football Manager 2026, a coach is never simply &quot;a 4-star coach.&quot; Instead, their star rating is entirely dependent on the specific training assignment you ask them to handle.
          </p>
          <p>
            For example, a coach might be a phenomenal 4.5-star Attacking Technical coach due to their &quot;Elite&quot; Attacking and Technical attributes. However, if you assign that exact same coach to handle Fitness training, they might drop to a 1.0-star rating because their Fitness attribute is &quot;Unsuited.&quot; You must always evaluate coaches in the context of the specific role they will play on your training ground.
          </p>

          <h2>The Nine Training Assignments</h2>
          <p>
            In FM26, first-team and youth training are broken down into nine distinct assignment categories. To maximize your team&apos;s development, you ideally want a high-star coach leading each of these nine areas:
          </p>
          <ol>
            <li><strong>Attacking Tactical:</strong> Focuses on attacking shape, movement, and system familiarity.</li>
            <li><strong>Attacking Technical:</strong> Focuses on individual offensive skills, finishing, and final third execution.</li>
            <li><strong>Defending Tactical:</strong> Focuses on defensive shape, pressing triggers, and offside traps.</li>
            <li><strong>Defending Technical:</strong> Focuses on individual tackling, marking, and defensive fundamentals.</li>
            <li><strong>Possession Tactical:</strong> Focuses on retaining shape while holding the ball and transitioning.</li>
            <li><strong>Possession Technical:</strong> Focuses on first touch, passing accuracy, and ball control.</li>
            <li><strong>Goalkeeping:</strong> Focuses on shot-stopping, handling, and distribution.</li>
            <li><strong>Fitness:</strong> Focuses on stamina, strength, quickness, and injury prevention.</li>
            <li><strong>Set Pieces:</strong> Focuses on attacking and defending corners, free kicks, and throw-ins.</li>
          </ol>

          <h3>Tactical vs. Technical Coaching</h3>
          <p>
            You will notice that Attacking, Defending, and Possession are split into &quot;Tactical&quot; and &quot;Technical&quot; sub-categories. 
          </p>
          <ul>
            <li><strong>Tactical assignments</strong> heavily weigh the coach&apos;s &quot;Tactical&quot; attribute and their &quot;Tactical Knowledge&quot;. These sessions improve the team&apos;s overall strategic understanding and cohesion.</li>
            <li><strong>Technical assignments</strong> lean heavily on the coach&apos;s &quot;Technical&quot; attribute. These sessions focus on improving the individual player&apos;s underlying attributes on the ball.</li>
          </ul>

          <h2>Why Ratings May Change Over Time</h2>
          <p>
            It can be frustrating to hire a 4.5-star coach only to see their rating drop to 4.0 stars a few months later. Star ratings are not static; they are dynamic estimates that reflect the current reality of your training ground.
          </p>
          <p>
            Ratings may fluctuate for several reasons:
          </p>
          <ul>
            <li><strong>Staff Development:</strong> Coaches, like players, have Current Ability and Potential Ability. Their underlying attributes can improve over time, naturally increasing their star rating.</li>
            <li><strong>Coaching Badges:</strong> Sending a coach on a coaching course can temporarily reduce their effectiveness or alter their attributes, causing minor rating shifts.</li>
            <li><strong>Squad Size Changes:</strong> An influx of new youth intakes or a bloated first-team squad can stretch your coaching staff thinner, though this usually manifests more heavily in the workload penalty.</li>
          </ul>

          <h3>The Impact of Coach Workload</h3>
          <p>
            Even a 5.0-star coach will fail to deliver world-class training if their workload is listed as &quot;Heavy.&quot; When a coach is assigned to too many categories, or when the ratio of players to coaches is too high, the effectiveness of their training sessions diminishes. 
          </p>
          <p>
            While the exact mathematical penalty for a heavy workload is hidden by the game engine, the visual feedback is clear. Always aim to keep your coaching workload at &quot;Light&quot; or &quot;Average&quot; by hiring enough staff to distribute the burden, ensuring your high-star coaches can perform at their maximum capability.
          </p>

          <h2>Practical Discussion: 4.5 vs. 5.0 Stars</h2>
          <p>
            Many managers obsess over achieving a perfect 5.0-star rating across all nine categories. While this is an excellent long-term goal for elite clubs, it is rarely necessary for success.
          </p>
          <p>
            The difference between a 4.5-star coach and a 5.0-star coach is marginal. A 4.5-star coach still represents top-tier, world-class training that will reliably develop wonderkids and keep the first team sharp. If you have the choice between spending your entire wage budget to upgrade a 4.5-star coach to a 5.0-star coach, or using those funds to hire better scouts or upgrade facilities, the latter is almost always the smarter strategic choice.
          </p>

          <h2>Balanced Coaching-Team Checklist</h2>
          <p>
            To build a cohesive and highly effective backroom staff, follow this checklist during the offseason:
          </p>
          <ul>
            <li>[ ] Assign at least one dedicated specialist to each of the nine training categories.</li>
            <li>[ ] Ensure no primary coach is assigned to more than two categories to prevent workload penalties.</li>
            <li>[ ] Check the overall coaching workload bar to ensure it reads &quot;Average&quot; or &quot;Light&quot;.</li>
            <li>[ ] Verify that your Head Coach (you) or Assistant Manager is filling any glaring gaps while you recruit new staff.</li>
            <li>[ ] Review staff contracts to ensure key 4.5-star or 5.0-star coaches aren&apos;t poached by rival clubs.</li>
          </ul>

          <h2>Calculator Estimates vs. In-Game Reality</h2>
          <p>
            Our calculator provides an excellent baseline estimate of a coach&apos;s capability based purely on their profile attributes. However, because FM Workbench is an unofficial fan-made tool, there may occasionally be minor discrepancies between our calculated estimate and the final star rating displayed in the FM26 training screen.
          </p>
          <p>
            These differences usually occur because the game engine factors in dynamic, real-time variables like exact squad sizes, temporary morale issues, or slight fractional differences within the broad qualitative word bands. The calculator isolates the coach&apos;s pure mathematical potential to give you the most accurate pre-signing evaluation possible.
          </p>

          <div className="p-6 my-8 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <h2 className="mt-0 text-xl font-bold">Calculate Your Coach&apos;s True Value</h2>
            <p className="mb-4">
              Don&apos;t wait until after you&apos;ve offered a contract to find out a coach is only 3 stars. Use our tool to estimate their exact assignment ratings right from the scouting screen.
            </p>
            <Link href="/" className="inline-block px-6 py-3 font-semibold text-black rounded" style={{ background: "var(--accent-primary)" }}>
              Open the FM coach calculator
            </Link>
          </div>

          <h2>Frequently Asked Questions</h2>
          
          <div className="faq-section mt-8">
            <div className="faq-item mb-6">
              <h3 className="text-lg font-semibold mb-2">How are coach star ratings calculated in FM26?</h3>
              <p>Coach star ratings are assignment-specific estimates calculated from a coach&apos;s visible qualitative attributes (like Attacking, Tactical, and Determination). They range from 0.5 stars to 5.0 stars and indicate the overall quality of training the coach can provide for a specific category.</p>
            </div>
            
            <div className="faq-item mb-6">
              <h3 className="text-lg font-semibold mb-2">Why did my coach&apos;s star rating drop during the season?</h3>
              <p>Star ratings can fluctuate due to several dynamic factors, including increased coaching workload, changes in squad size, or the coach attending a coaching course. A rating dropping does not mean the coach&apos;s underlying attributes worsened.</p>
            </div>
            
            <div className="faq-item mb-6">
              <h3 className="text-lg font-semibold mb-2">Is there a huge difference between a 4.5-star and 5.0-star coach?</h3>
              <p>The difference between 4.5 and 5.0 stars is marginal. While a 5.0-star coach is the gold standard, a 4.5-star coach will still provide world-class training and excellent player development.</p>
            </div>
          </div>

          <hr className="my-8 border-[rgba(255,255,255,0.1)]" />
          
          <p className="text-sm text-gray-400">
            For more information on the underlying inputs, read our <Link href="/fm26-staff-attributes-explained" className="text-[var(--accent-primary)] hover:underline">FM26 Staff Attributes Explained</Link> guide or view our <Link href="/methodology" className="text-[var(--accent-primary)] hover:underline">Methodology</Link>.
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
