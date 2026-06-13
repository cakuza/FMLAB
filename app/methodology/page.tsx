import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/siteMetadata";
import { trainingCategories } from "@/lib/trainingCategories";
import { attributeLabels, type AttributeKey } from "@/lib/attributeLevels";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "How FM Workbench estimates FM26 coach assignment star ratings — 12 visible inputs, 9 assignment outputs, and the attribute weights behind each assignment.",
  alternates: { canonical: "/methodology" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/methodology`,
    title: "Methodology | FM Workbench",
    description:
      "How FM Workbench estimates FM26 coach assignment star ratings — calibration method and accuracy results."
  }
};

const attributeWordRows = [
  { word: "Unsuited",    range: "1–3",   note: "Very low" },
  { word: "Reasonable",  range: "4–6",   note: "Low" },
  { word: "Competent",   range: "7–9",   note: "Below average" },
  { word: "Average",     range: "10–11", note: "Middle" },
  { word: "Good",        range: "12–14", note: "Above average" },
  { word: "Very Good",   range: "15–17", note: "High" },
  { word: "Outstanding", range: "18–19", note: "Very high" },
  { word: "Elite",       range: "20",    note: "Maximum" }
];

export default function MethodologyPage() {
  return (
    <div className="content-page">
      <div className="content-body">
        <h1>Methodology</h1>
        <p className="content-sub">How FM Workbench estimates FM26 coach assignment star ratings</p>

        <h2>What the calculator estimates</h2>
        <p>
          FM Workbench estimates the star rating a coach would receive in FM26 for each of the
          nine training assignment categories. It uses only the word-based attributes visible on
          the FM26 coach profile screen.
        </p>
        <p>
          The tool is an unofficial, fan-made approximation. The internal FM26 formula is not
          publicly available. FM Workbench is not affiliated with Sports Interactive, SEGA, or
          Football Manager.
        </p>

        <h2>The FM26 word-based attribute system</h2>
        <p>
          FM26 replaced numerical coach attributes with word bands. Each word corresponds to a
          range of internal values on a 1–20 scale. FM Workbench maps each word to the midpoint
          of its estimated range:
        </p>
        <table>
          <thead>
            <tr>
              <th scope="col">Word</th>
              <th scope="col">Estimated range</th>
              <th scope="col">Midpoint used</th>
            </tr>
          </thead>
          <tbody>
            {attributeWordRows.map((r) => (
              <tr key={r.word}>
                <td>{r.word}</td>
                <td>{r.range}</td>
                <td>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Using the midpoint of each range means results represent the most likely in-game value
          rather than a guaranteed match. A coach whose attributes sit at the low or high end of
          their word band may see a slight difference.
        </p>

        <h2>The 12 visible inputs</h2>
        <p>The calculator accepts these twelve attributes from the FM26 coach profile:</p>
        <ul>
          <li><strong>Coaching (8):</strong> Attacking, Defending, Fitness, Goalkeeping, Possession, Set Pieces, Tactical, Technical</li>
          <li><strong>Mental (3):</strong> Authority, Determination, Motivating</li>
          <li><strong>Knowledge (1):</strong> Tactical Knowledge</li>
        </ul>
        <p>
          All twelve default to Average if not entered. Tactical Knowledge defaults to Average
          when left blank.
        </p>

        <h2>The 9 assignment outputs</h2>
        <p>
          FM Workbench returns estimated star ratings (0.5–5.0 in 0.5 steps) for these nine
          FM26 training assignments:
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

        <h2>Which attributes affect each assignment</h2>
        <p>
          Each assignment applies a different weight to the 12 inputs. Weights below are
          approximate — the formula normalises the full weight set internally.
        </p>
        <table>
          <thead>
            <tr>
              <th scope="col">Assignment</th>
              <th scope="col">Primary attribute(s)</th>
              <th scope="col">Secondary</th>
              <th scope="col">Mental support</th>
            </tr>
          </thead>
          <tbody>
            {trainingCategories.map((cat) => {
              const mental = ["Authority", "Determination", "Motivating"].join(", ");
              const primary = cat.keyAttributes
                .slice(0, cat.id === "setPieces" ? 2 : 1)
                .map((k) => attributeLabels[k as AttributeKey])
                .join(", ");
              const secondary = cat.keyAttributes
                .slice(cat.id === "setPieces" ? 2 : 1)
                .map((k) => attributeLabels[k as AttributeKey])
                .join(", ");
              return (
                <tr key={cat.id}>
                  <td>{cat.label}</td>
                  <td>{primary}</td>
                  <td>{secondary || "—"}</td>
                  <td>{mental}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h2>Tactical Knowledge and Set Pieces</h2>
        <p>
          Tactical Knowledge is the only attribute unique to a single assignment. It carries
          significant secondary weight for Set Pieces (24%) alongside the primary Set Pieces
          attribute (42%). Tactical and Technical each add 8%, and the three mental attributes
          contribute 6% each.
        </p>
        <p>
          Tactical Knowledge has no effect on any other assignment. When left blank it defaults
          to Average.
        </p>

        <h2>Set Pieces formula weights</h2>
        <table>
          <thead>
            <tr><th scope="col">Attribute</th><th scope="col">Weight</th></tr>
          </thead>
          <tbody>
            <tr><td>Set Pieces</td><td>42%</td></tr>
            <tr><td>Tactical Knowledge</td><td>24%</td></tr>
            <tr><td>Tactical</td><td>8%</td></tr>
            <tr><td>Technical</td><td>8%</td></tr>
            <tr><td>Authority</td><td>6%</td></tr>
            <tr><td>Determination</td><td>6%</td></tr>
            <tr><td>Motivating</td><td>6%</td></tr>
          </tbody>
        </table>

        <h2>Known edge cases and limitations</h2>
        <p>
          Because each word band covers a range of underlying values, a coach whose
          attributes sit at the low or high end of their band may see a slight difference
          from the calculator output. These cases tend to occur where the word-band
          midpoint sits close to a star threshold.
        </p>
        <p>
          In-game star ratings in FM26 can also vary due to factors outside the
          calculator&apos;s scope:
        </p>
        <ul>
          <li>Coach workload (covering multiple assignments simultaneously)</li>
          <li>Squad size and composition</li>
          <li>Attributes sitting at the edge of their word band rather than the midpoint</li>
          <li>Game version patches that may adjust internal weighting</li>
        </ul>
        <p>
          FM Workbench is best used as a comparison guide rather than a precise prediction.
        </p>

        <div className="content-disclaimer">
          FM Workbench is an unofficial, fan-made tool. It is not affiliated with, endorsed
          by, sponsored by, or connected to Sports Interactive, SEGA, or Football Manager.
          The formula is a fan-made approximation and is not derived from Sports Interactive
          source code or official documentation. All trademarks belong to their respective
          owners. Ratings produced by this tool are estimates for comparison purposes only.
        </div>

        <Link href="/" className="content-back-link">← Back to the calculator</Link>
      </div>
    </div>
  );
}
