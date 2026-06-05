import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { defaultDescription, siteName, siteUrl } from "@/lib/siteMetadata";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s | Staff & Training Tools"
  },
  description: defaultDescription,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title: siteName,
    description: defaultDescription
  },
  twitter: {
    card: "summary",
    title: siteName,
    description: defaultDescription
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-30 border-b border-ink/10 bg-chalk/80 backdrop-blur-md">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
              <Link
                href="/"
                className="group flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-4 focus-visible:ring-pitch/25"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-pitch text-base font-display font-black text-chalk shadow-sm transition group-hover:bg-ink">
                  26
                </span>
                <span className="flex flex-col leading-none">
                  <span className="font-display text-sm font-black uppercase tracking-[0.16em] text-ink">
                    FM Lab
                  </span>
                  <span className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-pitch/80">
                    FM26 Staff Tools
                  </span>
                </span>
              </Link>
              <span className="hidden rounded-full border border-pitch/25 bg-touchline/60 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-pitch sm:inline-block">
                Unofficial
              </span>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-white/5 bg-ink px-4 py-7 text-sm text-chalk/70 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-1">
              <span className="font-display text-xs font-black uppercase tracking-[0.18em] text-touchline/80">
                FM26 Staff &amp; Training Tools
              </span>
              <span className="leading-6">
                FM Lab is an unofficial fan-made tool and is not affiliated
                with, endorsed by, sponsored by, or connected to Sports
                Interactive, SEGA, or Football Manager. All trademarks belong to
                their respective owners. Ratings are estimates for comparison
                only.
              </span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
