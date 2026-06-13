import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/siteMetadata";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "Learn how FM Workbench turns FM26 coach attributes into practical assignment estimates, what factors are considered and why results may vary in game.",
  alternates: { canonical: "/methodology" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/methodology`,
    title: "Methodology | FM Workbench",
    description:
      "Learn how FM Workbench turns FM26 coach attributes into practical assignment estimates, what factors are considered and why results may vary in game."
  }
};

export default function MethodologyPage() {
  return (
    <div className="content-page">
      <div className="content-body">
        <h1>Methodology</h1>
        <p className="content-sub">How FM Workbench estimates coach assignment ratings</p>

        <h2>What the calculator estimates</h2>
        <p>
          FM Workbench estimates how well a coach may fit each of the nine FM26 training
          assignments, based on the word-based attributes visible on the coach profile screen.
          It is designed for comparison and decision support — it helps you identify stronger
          and weaker coaching fits before committing to a hire or reassignment in your save.
        </p>
        <p>
          FM Workbench is an unofficial, fan-made tool. It is not affiliated with Sports
          Interactive, SEGA, or Football Manager, and it is not designed to guarantee
          replication of any specific in-game value.
        </p>

        <h2>How the model works</h2>
        <p>
          FM Workbench converts the coach profile&apos;s word-based attributes into a consistent
          internal model. Each assignment is evaluated using a combination of specialist
          coaching ability, tactical or technical fit, mental attributes and relevant
          knowledge. Different assignments prioritise these signals differently.
        </p>
        <p>
          FM Workbench publishes the factors considered by the calculator, but the internal
          weighting, conversion and rating logic are proprietary.
        </p>

        <h2>Inputs considered</h2>
        <p>
          The calculator uses these twelve attributes from the FM26 coach profile:
        </p>
        <ul>
          <li><strong>Coaching (8):</strong> Attacking, Defending, Fitness, Goalkeeping, Possession, Set Pieces, Tactical, Technical</li>
          <li><strong>Mental (3):</strong> Authority, Determination, Motivating</li>
          <li><strong>Knowledge (1):</strong> Tactical Knowledge</li>
        </ul>
        <p>
          All twelve attributes default to Average if not entered. You can leave any
          attribute at its default and adjust only the ones you know from the coach profile.
        </p>

        <h2>Assignment ratings</h2>
        <p>
          FM Workbench returns estimated star ratings from 0.5 to 5 stars in half-star
          steps for each of the nine FM26 training assignments:
        </p>
        <ul>
          <li>Attacking Tactical</li>
          <li>Attacking Technical</li>
          <li>Defending Tactical</li>
          <li>Defending Technical</li>
          <li>Possession Tactical</li>
          <li>Possession Technical</li>
          <li>Goalkeeping</li>
          <li>Fitness</li>
          <li>Set Pieces</li>
        </ul>

        <h2>What influences a result</h2>
        <p>
          Assignment ratings are influenced most strongly by the coach&apos;s relevant
          specialist ability. Tactical or technical fit, mental strengths and
          role-specific knowledge may also contribute depending on the assignment.
        </p>
        <p>
          For specialised areas such as Set Pieces, the model also considers relevant
          knowledge alongside coaching and mental attributes.
        </p>

        <h2>Why results may differ in game</h2>
        <p>
          Several factors can cause the calculator output to differ from the star rating
          shown in FM26:
        </p>
        <ul>
          <li>Word-based attributes represent bands rather than exact visible numbers — the underlying value within a band is not shown in the game interface</li>
          <li>Coach workload can affect practical coaching performance when a coach covers multiple roles simultaneously</li>
          <li>Game updates may alter the underlying behaviour of assignments</li>
          <li>Other contextual in-game factors such as squad size may also matter</li>
        </ul>
        <p>
          FM Workbench is best used as a comparison guide rather than a precise prediction.
        </p>

        <h2>How to use the result</h2>
        <p>
          To get the most from the calculator:
        </p>
        <ul>
          <li>Compare assignments for the same coach to identify their strongest and weakest fits</li>
          <li>Treat close half-star differences cautiously — they may sit within the margin introduced by word-band variation</li>
          <li>Use the result to narrow your shortlist, then confirm the final choice inside your own save</li>
        </ul>

        <div className="content-disclaimer">
          FM Workbench is an unofficial, fan-made tool. It is not affiliated with, endorsed
          by, sponsored by, or connected to Sports Interactive, SEGA, or Football Manager.
          The model is a fan-made approximation and is not derived from Sports Interactive
          source code or official documentation. All trademarks belong to their respective
          owners. Ratings produced by this tool are estimates for comparison purposes only.
        </div>

        <Link href="/" className="content-back-link">← Back to the calculator</Link>
      </div>
    </div>
  );
}
