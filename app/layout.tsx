import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import { defaultDescription, siteName, siteUrl } from "@/lib/siteMetadata";
import NavBar from "@/components/NavBar";
import Script from "next/script";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-grotesk",
    weight: ["400", "500", "600", "700"],
    display: "swap"
});

const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-mono",
    display: "swap"
});

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteName,
          template: "%s | FM Workbench"
    },
    description: defaultDescription,
    alternates: { canonical: "/" },
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

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
          <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
                  <head>
                          <Script
                                      async
                                      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2198254554444215"
                                      crossOrigin="anonymous"
                                      strategy="afterInteractive"
                                    />
                  </head>head>
                <body className="antialiased">
                        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                                  <NavBar />
                                  <main style={{ flex: 1 }}>{children}</main>main>
                                  <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                              <div className="fm-footer">
                                                            <p className="fm-footer-disclaimer">
                                                                            FM Workbench is an unofficial, fan-made tool and is not affiliated with Sports Interactive, SEGA, or Football Manager. All trademarks belong to their respective owners. Ratings are estimates for comparison only.
                                                            </p>p>
                                                            <p className="fm-footer-sub">FM26 Coach Assignment Calculator · {new Date().getFullYear()}</p>p>
                                              </div>div>
                                  </footer>footer>
                        </div>div>
                </body>body>
          </html>html>
        );
}</head>
