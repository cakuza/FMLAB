import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/siteMetadata";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with FM Workbench — feedback, bug reports, or questions about the FM26 Coach Assignment Calculator.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/contact`,
    title: "Contact | FM Workbench",
    description: "Get in touch with FM Workbench."
  }
};

// Update this constant before deploy
const CONTACT_EMAIL = "contact@fmworkbench.com";

export default function ContactPage() {
  return (
    <div className="content-page">
      <div className="content-body">
        <h1>Contact</h1>
        <p className="content-sub">Feedback, bug reports, and questions</p>

        <h2>Get in touch</h2>
        <p>
          FM Workbench is a small fan-made project. If you have found a bug,
          noticed a result that looks wrong, or have a suggestion, you can reach
          us by email:
        </p>
        <p>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>

        <h2>Bug reports</h2>
        <p>
          If the calculator produces a star rating that does not match your
          in-game value, it helps to include:
        </p>
        <ul>
          <li>The attribute word levels you entered</li>
          <li>The assignment you were checking</li>
          <li>The in-game star rating you saw in FM26</li>
          <li>The FM26 version or patch number if known</li>
        </ul>
        <p>
          Results can differ slightly from in-game values due to coach workload,
          squad size, or attributes sitting at the edge of their word band.
          See the <Link href="/methodology">Methodology page</Link> for more
          detail on known accuracy limits.
        </p>

        <h2>Disclaimer</h2>
        <p>
          FM Workbench is an unofficial fan-made tool and is not affiliated with
          Sports Interactive, SEGA, or Football Manager. We cannot assist with
          in-game technical issues or official Football Manager support — please
          use the{" "}
          <a href="https://community.sigames.com" target="_blank" rel="noopener noreferrer">
            Sports Interactive community forums
          </a>{" "}
          for those.
        </p>

        <Link href="/" className="content-back-link">← Back to the calculator</Link>
      </div>
    </div>
  );
}
