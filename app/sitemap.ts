import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/siteMetadata";

const routes = [
  { path: "",             changeFrequency: "weekly",  priority: 1.0 },
  { path: "/methodology", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about",       changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact",     changeFrequency: "yearly",  priority: 0.4 },
  { path: "/privacy",     changeFrequency: "yearly",  priority: 0.3 }
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date("2026-06-13"),
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));
}
