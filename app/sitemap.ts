import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/siteMetadata";

const routes = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/coach-rating-calculator", changeFrequency: "monthly", priority: 0.9 }
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date("2026-06-10"),
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));
}
