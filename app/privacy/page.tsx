import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/siteMetadata";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for FM Workbench — what data is collected, how it is used, and how advertising and cookies work.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/privacy`,
    title: "Privacy Policy | FM Workbench",
    description: "Privacy policy for FM Workbench."
  }
};

const LAST_UPDATED = "13 June 2026";

export default function PrivacyPage() {
  return (
    <div className="content-page">
      <div className="content-body">
        <h1>Privacy Policy</h1>
        <p className="content-sub">Last updated: {LAST_UPDATED}</p>

        <h2>Overview</h2>
        <p>
          FM Workbench is a static web tool. There are no user accounts, no login system,
          and no database. The calculator runs entirely in your browser — attribute
          selections you enter are never transmitted to or stored by FM Workbench.
        </p>

        <h2>What we collect</h2>

        <h3>Calculator inputs</h3>
        <p>
          The attribute values you select in the calculator (e.g. Attacking: Good) exist
          only in your browser session. They are not sent to any server operated by FM
          Workbench and are discarded when you close or refresh the page.
        </p>

        <h3>Hosting and server logs</h3>
        <p>
          FM Workbench is hosted on Vercel. Vercel may collect standard server access
          logs including IP address, browser type, referring URL, and page requested.
          This is standard web-hosting infrastructure logging. Refer to{" "}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
            Vercel&apos;s Privacy Policy
          </a>{" "}
          for details of what Vercel retains.
        </p>

        <h2>Google AdSense and advertising</h2>
        <p>
          FM Workbench uses Google AdSense to display advertisements. Google AdSense may
          use cookies and similar technologies to serve ads based on your prior visits to
          this and other websites.
        </p>
        <p>
          Google&apos;s use of advertising cookies enables it and its partners to serve ads
          based on your visit to FM Workbench and other sites on the internet. You can
          opt out of personalised advertising by visiting{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            Google Ads Settings
          </a>
          .
        </p>
        <p>
          For more information on how Google uses data when you visit sites that use
          Google AdSense, see{" "}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
            How Google uses data from sites that use our services
          </a>
          .
        </p>

        <h2>Cookies</h2>
        <p>
          FM Workbench itself does not set any first-party cookies. Google AdSense and
          any ad-serving partners may set third-party cookies for advertising purposes as
          described above.
        </p>

        <h2>Third-party services</h2>
        <ul>
          <li>
            <strong>Vercel</strong> — hosting and CDN.{" "}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
              Privacy policy
            </a>
          </li>
          <li>
            <strong>Google AdSense</strong> — advertising.{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Privacy policy
            </a>
          </li>
          <li>
            <strong>Google Fonts</strong> — web fonts (Space Grotesk, Space Mono).{" "}
            <a href="https://developers.google.com/fonts/faq/privacy" target="_blank" rel="noopener noreferrer">
              Privacy FAQ
            </a>
          </li>
        </ul>

        <h2>Children</h2>
        <p>
          FM Workbench is not directed at children under 13 and does not knowingly
          collect personal information from children.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          This policy may be updated from time to time. The &quot;last updated&quot; date at
          the top of this page reflects the most recent revision.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy questions, use the contact form on the{" "}
          <Link href="/contact">Contact page</Link>.
        </p>

        <Link href="/" className="content-back-link">← Back to the calculator</Link>
      </div>
    </div>
  );
}
