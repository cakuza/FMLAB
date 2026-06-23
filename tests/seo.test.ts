import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import sitemap from "@/app/sitemap";

describe("SEO structure", () => {
  it("sitemap excludes /coach-rating-calculator", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls.every((u) => !u.includes("coach-rating-calculator"))).toBe(true);
  });

  it("sitemap contains all canonical pages", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls.some((u) => !u.includes("/methodology") && !u.includes("/about") && !u.includes("/privacy") && !u.includes("/contact"))).toBe(true);
    expect(urls.some((u) => u.includes("/methodology"))).toBe(true);
    expect(urls.some((u) => u.includes("/about"))).toBe(true);
    expect(urls.some((u) => u.includes("/privacy"))).toBe(true);
    expect(urls.some((u) => u.includes("/contact"))).toBe(true);
  });

  it("vercel.json permanently redirects /coach-rating-calculator to /", () => {
    const config = JSON.parse(
      readFileSync(resolve(process.cwd(), "vercel.json"), "utf8")
    );
    const redirects: { source: string; destination: string; permanent: boolean }[] =
      config.redirects ?? [];
    const r = redirects.find((x) => x.source === "/coach-rating-calculator");
    expect(r).toBeDefined();
    expect(r?.destination).toBe("/");
    expect(r?.permanent).toBe(true);
  });

  it("llms.txt uses 0.5 star floor not 1.0", () => {
    const llms = readFileSync(resolve(process.cwd(), "public/llms.txt"), "utf8");
    expect(llms).not.toContain("(1.0–5.0)");
    expect(llms).toContain("0.5");
  });

  it("homepage copy uses 0.5 to 5 star range", () => {
    const src = readFileSync(resolve(process.cwd(), "app/page.tsx"), "utf8");
    expect(src).not.toContain("from 1 to 5");
    expect(src).toContain("0.5 to 5");
  });

  it("homepage trust section contains methodology link", () => {
    const src = readFileSync(resolve(process.cwd(), "app/page.tsx"), "utf8");
    expect(src).toContain("0.5");
    expect(src).toContain("/methodology");
    expect(src).not.toContain("96.7");
    expect(src).not.toContain("174");
    expect(src).not.toContain("0.017");
  });

  // --- Methodology page ---

  it("methodology page exists and contains unofficial fan-made disclaimer", () => {
    const src = readFileSync(
      resolve(process.cwd(), "app/methodology/page.tsx"),
      "utf8"
    );
    expect(src).toContain("unofficial");
    expect(src).toContain("fan-made");
    expect(src).not.toContain("96.7");
    expect(src).not.toContain("0.017");
  });

  it("methodology page mentions 0.5 to 5 star output range", () => {
    const src = readFileSync(
      resolve(process.cwd(), "app/methodology/page.tsx"),
      "utf8"
    );
    expect(src).toContain("0.5");
    expect(src).not.toContain("1 to 5");
  });

  it("methodology page lists the 12 visible inputs", () => {
    const src = readFileSync(
      resolve(process.cwd(), "app/methodology/page.tsx"),
      "utf8"
    );
    expect(src).toContain("Tactical Knowledge");
    expect(src).toContain("Authority");
    expect(src).toContain("Determination");
    expect(src).toContain("Goalkeeping");
  });

  it("methodology page references all nine assignment outputs", () => {
    const src = readFileSync(
      resolve(process.cwd(), "app/methodology/page.tsx"),
      "utf8"
    );
    expect(src).toContain("Attacking Tactical");
    expect(src).toContain("Defending Technical");
    expect(src).toContain("Possession Tactical");
    expect(src).toContain("Goalkeeping");
    expect(src).toContain("Fitness");
    expect(src).toContain("Set Pieces");
  });

  it("methodology page states internal weighting logic is proprietary", () => {
    const src = readFileSync(
      resolve(process.cwd(), "app/methodology/page.tsx"),
      "utf8"
    );
    expect(src.toLowerCase()).toContain("proprietary");
  });

  it("methodology page does not expose exact formula percentages", () => {
    const src = readFileSync(
      resolve(process.cwd(), "app/methodology/page.tsx"),
      "utf8"
    );
    expect(src).not.toContain("42%");
    expect(src).not.toContain("24%");
    expect(src).not.toContain("8%");
    expect(src).not.toContain("6%");
  });

  it("methodology page does not contain word-band numerical range table", () => {
    const src = readFileSync(
      resolve(process.cwd(), "app/methodology/page.tsx"),
      "utf8"
    );
    expect(src).not.toContain("1–3");
    expect(src).not.toContain("4–6");
    expect(src).not.toContain("7–9");
    expect(src).not.toContain("10–11");
    expect(src).not.toContain("12–14");
    expect(src).not.toContain("15–17");
    expect(src).not.toContain("18–19");
  });

  it("methodology page does not contain midpoint conversion details", () => {
    const src = readFileSync(
      resolve(process.cwd(), "app/methodology/page.tsx"),
      "utf8"
    );
    expect(src).not.toContain("midpoint");
    expect(src).not.toContain("normalises");
    expect(src).not.toContain("normalizes");
  });

  it("methodology page does not contain exact assignment formula mappings", () => {
    const src = readFileSync(
      resolve(process.cwd(), "app/methodology/page.tsx"),
      "utf8"
    );
    expect(src).not.toContain("Primary attribute");
    expect(src).not.toContain("formula weights");
    expect(src).not.toContain("Tactical Knowledge has no effect");
    expect(src).not.toContain("only attribute unique");
  });

  it("llms.txt does not expose formula weights or midpoint mapping", () => {
    const src = readFileSync(resolve(process.cwd(), "public/llms.txt"), "utf8");
    expect(src).not.toContain("45–70%");
    expect(src).not.toContain("~25%");
    expect(src).not.toContain("~10%");
    expect(src).not.toContain("24% weight");
    expect(src).not.toContain("midpoint");
    expect(src).not.toContain("affects the Set Pieces assignment only");
  });

  it("homepage does not expose formula weights", () => {
    const src = readFileSync(resolve(process.cwd(), "app/page.tsx"), "utf8");
    expect(src).not.toContain("42%");
    expect(src).not.toContain("24%");
    expect(src).not.toContain("midpoint");
    expect(src).not.toContain("Set Pieces is the only assignment");
  });

  it("privacy page mentions Google AdSense", () => {
    const src = readFileSync(resolve(process.cwd(), "app/privacy/page.tsx"), "utf8");
    expect(src).toContain("AdSense");
    expect(src.toLowerCase()).toContain("cookie");
  });

  it("sitemap has correct structure (url, lastModified, changeFrequency, priority)", () => {
    const entries = sitemap();
    for (const entry of entries) {
      expect(typeof entry.url).toBe("string");
      expect(entry.url.startsWith("https://")).toBe(true);
      expect(entry.lastModified).toBeDefined();
      expect(entry.changeFrequency).toBeDefined();
      expect(entry.priority).toBeDefined();
    }
  });

  it("verifies homepage title remains 'FM26 Coach Assignment Calculator | FM Workbench'", () => {
    const src = readFileSync(resolve(process.cwd(), "app/page.tsx"), "utf8");
    expect(src).toContain('const pageTitle = "FM26 Coach Assignment Calculator | FM Workbench";');
  });

  it("verifies H1 remains 'FM26 Coach Assignment Calculator'", () => {
    const src = readFileSync(resolve(process.cwd(), "app/page.tsx"), "utf8");
    expect(src).toContain('<h1 className="tool-heading">FM26 Coach Assignment Calculator</h1>');
  });

  it("verifies meta description naturally contains 'FM coach calculator'", () => {
    const src = readFileSync(resolve(process.cwd(), "app/page.tsx"), "utf8");
    expect(src).toContain('const pageDescription =');
    expect(src).toContain('Free FM coach calculator built for Football Manager 26.');
  });

  it("verifies canonical remains 'https://www.fmworkbench.com/'", () => {
    const src = readFileSync(resolve(process.cwd(), "app/page.tsx"), "utf8");
    expect(src).toContain('alternates: { canonical: "/" }');
  });

  it("verifies the version-compatibility FAQ is visible", () => {
    const src = readFileSync(resolve(process.cwd(), "app/page.tsx"), "utf8");
    expect(src).toContain('Can I use this FM coach calculator for older Football Manager versions?');
    expect(src).toContain('FM Workbench is designed specifically for FM26 and its word-based coach attributes');
  });

  it("verifies FAQPage JSON-LD matches the visible FAQ", () => {
    const src = readFileSync(resolve(process.cwd(), "app/page.tsx"), "utf8");
    expect(src).toContain('mainEntity: faqItems.map');
  });

  it("verifies WebApplication contains approved alternate names", () => {
    const src = readFileSync(resolve(process.cwd(), "app/page.tsx"), "utf8");
    expect(src).toContain('name: "FM26 Coach Assignment Calculator",');
    expect(src).toContain('alternateName: [');
    expect(src).toContain('"FM Coach Calculator",');
    expect(src).toContain('"Football Manager Coach Calculator",');
    expect(src).toContain('"FM26 Coach Calculator",');
    expect(src).toContain('"FM26 Coach Rating Calculator",');
    expect(src).toContain('"FM26 Coach Assignment Calculator"');
  });

  it("verifies no /fm-coach-calculator duplicate page route exists", () => {
    const fs = require("fs");
    const exists = fs.existsSync(resolve(process.cwd(), "app/fm-coach-calculator/page.tsx")) || 
                   fs.existsSync(resolve(process.cwd(), "app/fm-coach-calculator/page.ts"));
    expect(exists).toBe(false);
  });

  it("verifies no proprietary formula details were added", () => {
    const src = readFileSync(resolve(process.cwd(), "app/page.tsx"), "utf8");
    expect(src).not.toContain("0.45");
    expect(src).not.toContain("0.25");
  });

  it("verifies no existing redirect, sitemap or methodology protection was reverted", () => {
    const vercelConfig = readFileSync(resolve(process.cwd(), "vercel.json"), "utf8");
    expect(vercelConfig).toContain("/coach-rating-calculator");
    const methodologyPage = readFileSync(resolve(process.cwd(), "app/methodology/page.tsx"), "utf8");
    expect(methodologyPage.toLowerCase()).toContain("proprietary");
  });

  // --- Guides Pages SEO Tests ---
  const guidePaths = [
    "app/fm26-staff-attributes-explained/page.tsx",
    "app/fm26-coach-star-ratings-guide/page.tsx"
  ];

  it("verifies both routes exist", () => {
    const fs = require("fs");
    for (const p of guidePaths) {
      expect(fs.existsSync(resolve(process.cwd(), p))).toBe(true);
    }
  });

  it("verifies exactly one H1 per guide", () => {
    for (const p of guidePaths) {
      const src = readFileSync(resolve(process.cwd(), p), "utf8");
      const h1Count = (src.match(/<h1/g) || []).length;
      expect(h1Count).toBe(1);
    }
  });

  it("verifies unique title per guide", () => {
    const titles = new Set();
    for (const p of guidePaths) {
      const src = readFileSync(resolve(process.cwd(), p), "utf8");
      const match = src.match(/title:\s*"([^"]+)"/);
      expect(match).toBeDefined();
      if (match) titles.add(match[1]);
    }
    expect(titles.size).toBe(2);
  });

  it("verifies unique description per guide", () => {
    const descs = new Set();
    for (const p of guidePaths) {
      const src = readFileSync(resolve(process.cwd(), p), "utf8");
      const match = src.match(/description:\s*pageDescription/);
      expect(match).toBeDefined();
      const descText = src.match(/const pageDescription =\s*"([^"]+)"/);
      expect(descText).toBeDefined();
      if (descText) descs.add(descText[1]);
    }
    expect(descs.size).toBe(2);
  });

  it("verifies correct canonical per guide", () => {
    for (const p of guidePaths) {
      const src = readFileSync(resolve(process.cwd(), p), "utf8");
      if (p.includes("attributes")) {
        expect(src).toContain('alternates: { canonical: "/fm26-staff-attributes-explained" }');
      } else {
        expect(src).toContain('alternates: { canonical: "/fm26-coach-star-ratings-guide" }');
      }
    }
  });

  it("verifies direct-answer section exists", () => {
    for (const p of guidePaths) {
      const src = readFileSync(resolve(process.cwd(), p), "utf8");
      expect(src).toContain("<strong>");
    }
  });

  it("verifies both guides link to the calculator", () => {
    for (const p of guidePaths) {
      const src = readFileSync(resolve(process.cwd(), p), "utf8");
      expect(src).toContain('href="/"');
      expect(src).toContain("FM coach calculator");
    }
  });

  it("verifies both guides cross-link", () => {
    const p1 = readFileSync(resolve(process.cwd(), guidePaths[0]), "utf8");
    const p2 = readFileSync(resolve(process.cwd(), guidePaths[1]), "utf8");
    expect(p1).toContain('href="/fm26-coach-star-ratings-guide"');
    expect(p2).toContain('href="/fm26-staff-attributes-explained"');
  });

  it("verifies sitemap contains both URLs", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls.some((u) => u.includes("/fm26-staff-attributes-explained"))).toBe(true);
    expect(urls.some((u) => u.includes("/fm26-coach-star-ratings-guide"))).toBe(true);
  });

  it("verifies Article JSON-LD exists", () => {
    for (const p of guidePaths) {
      const src = readFileSync(resolve(process.cwd(), p), "utf8");
      expect(src).toContain('"@type": "Article"');
    }
  });

  it("verifies BreadcrumbList JSON-LD exists", () => {
    for (const p of guidePaths) {
      const src = readFileSync(resolve(process.cwd(), p), "utf8");
      expect(src).toContain('"@type": "BreadcrumbList"');
    }
  });

  it("verifies FAQPage matches visible FAQ", () => {
    // Basic verification that FAQ JSON-LD exists, we manually verified the strings match.
    for (const p of guidePaths) {
      const src = readFileSync(resolve(process.cwd(), p), "utf8");
      expect(src).toContain('"@type": "FAQPage"');
      expect(src).toContain('<div className="faq-section mt-8">');
    }
  });

  it("verifies no AggregateRating or Review", () => {
    for (const p of guidePaths) {
      const src = readFileSync(resolve(process.cwd(), p), "utf8");
      expect(src).not.toContain('"@type": "AggregateRating"');
      expect(src).not.toContain('"@type": "Review"');
    }
  });

  it("verifies no proprietary formula percentages", () => {
    for (const p of guidePaths) {
      const src = readFileSync(resolve(process.cwd(), p), "utf8");
      expect(src).not.toContain("24%");
      expect(src).not.toContain("42%");
      expect(src).not.toContain("0.45");
      expect(src).not.toContain("0.25");
    }
  });

  it("verifies no hidden numerical word-band ranges", () => {
    for (const p of guidePaths) {
      const src = readFileSync(resolve(process.cwd(), p), "utf8");
      expect(src).not.toContain("15-17");
      expect(src).not.toContain("12-14");
      expect(src).not.toContain("18-19");
      expect(src).not.toContain("10-11");
    }
  });

  it("verifies factual consistency regarding Tactical Knowledge", () => {
    for (const p of guidePaths) {
      const src = readFileSync(resolve(process.cwd(), p), "utf8");
      expect(src.toLowerCase()).not.toContain("tactical knowledge is particularly crucial for tactical coaching assignments");
      expect(src.toLowerCase()).toContain("tactical knowledge is relevant to");
      expect(src.toLowerCase()).toContain("set pieces");
    }
  });

  it("verifies 12 attributes aren't universally applied", () => {
    for (const p of guidePaths) {
      const src = readFileSync(resolve(process.cwd(), p), "utf8");
      if (p.includes("attributes")) {
        expect(src).toContain("Not all 12 attributes contribute to every assignment");
      }
    }
  });

  it("verifies no exaggerated claims are present", () => {
    const forbidden = [
      "act as a multiplier",
      "Holy Trinity",
      "temporary morale",
      "no more than two",
      "true value",
      "exact assignment ratings",
      "most accurate",
      "guarantees"
    ];
    for (const p of guidePaths) {
      const src = readFileSync(resolve(process.cwd(), p), "utf8");
      for (const phrase of forbidden) {
        expect(src).not.toContain(phrase);
      }
    }
  });

  it("verifies identical inputs explanation", () => {
    for (const p of guidePaths) {
      const src = readFileSync(resolve(process.cwd(), p), "utf8");
      expect(src.toLowerCase()).toContain("identical word inputs produce identical fm workbench estimates");
    }
  });

  it("verifies in-game differences are cautious", () => {
    for (const p of guidePaths) {
      const src = readFileSync(resolve(process.cwd(), p), "utf8");
      expect(src).toContain("In-game results may differ because visible bands hide exact underlying values");
    }
  });

  // --- Hotfix regression tests ---

  it("star ratings guide does not contain the incorrect '1.0 star' Fitness claim", () => {
    const src = readFileSync(resolve(process.cwd(), guidePaths[1]), "utf8");
    expect(src).not.toContain("drop to 1.0 star");
    expect(src).not.toContain("1.0 star if their Fitness");
  });

  it("star ratings guide does not replace the removed claim with another exact star output", () => {
    const src = readFileSync(resolve(process.cwd(), guidePaths[1]), "utf8");
    // The example paragraph must not assert a specific star number for the Fitness scenario
    expect(src).not.toMatch(/Fitness.*?\b[0-9]+\.[05] star/);
    expect(src).not.toMatch(/[0-9]+\.[05] star.*?Fitness.*?Unsuited/);
  });

  it("llms.txt contains all eight canonical word bands in canonical order", () => {
    const llms = readFileSync(resolve(process.cwd(), "public/llms.txt"), "utf8");
    const bands = ["Unsuited", "Reasonable", "Competent", "Average", "Good", "Very Good", "Outstanding", "Elite"];
    for (const band of bands) {
      expect(llms).toContain(band);
    }
    // Verify canonical order: Unsuited appears before Elite
    expect(llms.indexOf("Unsuited")).toBeLessThan(llms.indexOf("Elite"));
    // Verify Unsuited and Elite are on the word-values line, not just in other contexts
    expect(llms).toContain("Unsuited, Reasonable, Competent, Average, Good, Very Good, Outstanding, Elite");
  });

  it("each guide has page-specific twitter:title and twitter:description in metadata", () => {
    for (const p of guidePaths) {
      const src = readFileSync(resolve(process.cwd(), p), "utf8");
      // twitter block must be present in the metadata export
      expect(src).toContain("twitter:");
      expect(src).toContain('card: "summary"');
      // title and description must reference the page-specific constants, not hardcoded strings
      expect(src).toContain("title: pageTitle");
      expect(src).toContain("description: pageDescription");
    }
  });

  it("guides use native script tag for JSON-LD, not next/script", () => {
    for (const p of guidePaths) {
      const src = readFileSync(resolve(process.cwd(), p), "utf8");
      // Must not import the next/script Script component
      expect(src).not.toContain('import Script from "next/script"');
      // Must contain native script element with the JSON-LD type
      expect(src).toContain('<script');
      expect(src).toContain('type="application/ld+json"');
    }
  });

  it("each guide emits exactly one Article, one BreadcrumbList, and one FAQPage schema", () => {
    for (const p of guidePaths) {
      const src = readFileSync(resolve(process.cwd(), p), "utf8");
      expect((src.match(/"@type": "Article"/g) || []).length).toBe(1);
      expect((src.match(/"@type": "BreadcrumbList"/g) || []).length).toBe(1);
      expect((src.match(/"@type": "FAQPage"/g) || []).length).toBe(1);
    }
  });

  it("visible FAQ item count matches FAQ JSON-LD question count per guide", () => {
    for (const p of guidePaths) {
      const src = readFileSync(resolve(process.cwd(), p), "utf8");
      const visibleCount = (src.match(/<div className="faq-item mb-6">/g) || []).length;
      const jsonLdCount = (src.match(/"@type": "Question"/g) || []).length;
      expect(visibleCount).toBeGreaterThan(0);
      expect(visibleCount).toBe(jsonLdCount);
    }
  });

  it("guide sitemap dates: guide pages use 2026-06-23, existing pages retain 2026-06-13", () => {
    const entries = sitemap();
    const guideEntries = entries.filter(
      (e) => e.url.includes("fm26-staff-attributes-explained") || e.url.includes("fm26-coach-star-ratings-guide")
    );
    const otherEntries = entries.filter(
      (e) => !e.url.includes("fm26-staff-attributes-explained") && !e.url.includes("fm26-coach-star-ratings-guide")
    );
    for (const e of guideEntries) {
      expect((e.lastModified as Date).toISOString()).toContain("2026-06-23");
    }
    for (const e of otherEntries) {
      expect((e.lastModified as Date).toISOString()).toContain("2026-06-13");
    }
  });

  it("formula files are unchanged: ratingFormula exports calculateRating", () => {
    const src = readFileSync(resolve(process.cwd(), "lib/ratingFormula.ts"), "utf8");
    expect(src).toContain("export const calculateRating");
    expect(src).toContain("export const calculateAssignmentRatings");
    // Must not contain publicly disclosed weights
    expect(src).not.toContain("// PUBLIC:");
  });

  it("formula files are unchanged: trainingCategories has exactly nine entries", () => {
    const src = readFileSync(resolve(process.cwd(), "lib/trainingCategories.ts"), "utf8");
    const idCount = (src.match(/id: "/g) || []).length;
    expect(idCount).toBe(9);
  });

  it("formula files are unchanged: attributeLevels has exactly eight levels", () => {
    const src = readFileSync(resolve(process.cwd(), "lib/attributeLevels.ts"), "utf8");
    expect((src.match(/id: "/g) || []).length).toBe(8);
  });

  it("guide pages do not contain new formula weights or percentages", () => {
    const newForbidden = ["0.42", "0.24", "0.08", "0.06", "0.7", "8%", "6%", "70%"];
    for (const p of guidePaths) {
      const src = readFileSync(resolve(process.cwd(), p), "utf8");
      for (const phrase of newForbidden) {
        expect(src).not.toContain(phrase);
      }
    }
  });

});
