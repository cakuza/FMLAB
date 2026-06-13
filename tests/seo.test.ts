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

  it("homepage accuracy section contains calibration figures", () => {
    const src = readFileSync(resolve(process.cwd(), "app/page.tsx"), "utf8");
    expect(src).toContain("96.7");
    expect(src).toContain("180");
    expect(src).toContain("174");
    expect(src).toContain("0.017");
  });

  it("methodology page contains required accuracy figures", () => {
    const src = readFileSync(
      resolve(process.cwd(), "app/methodology/page.tsx"),
      "utf8"
    );
    expect(src).toContain("96.7");
    expect(src).toContain("180");
    expect(src).toContain("unofficial");
    expect(src).toContain("fan-made");
  });

  it("methodology page mentions Tactical Knowledge for Set Pieces", () => {
    const src = readFileSync(
      resolve(process.cwd(), "app/methodology/page.tsx"),
      "utf8"
    );
    expect(src).toContain("Tactical Knowledge");
    expect(src).toContain("Set Pieces");
  });

  it("methodology page states 0.5 to 5 star output range", () => {
    const src = readFileSync(
      resolve(process.cwd(), "app/methodology/page.tsx"),
      "utf8"
    );
    expect(src).toContain("0.5");
    expect(src).not.toContain("1 to 5");
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
});
