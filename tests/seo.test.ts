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
});
