import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/siteMetadata";

const routes = [
  { path: "",             changeFrequency: "weekly",  priority: 1.0, lastModified: "2026-06-13" },
  { path: "/methodology", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-06-13" },
  { path: "/fm26-staff-attributes-explained", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-06-23" },
  { path: "/fm26-coach-star-ratings-guide",   changeFrequency: "monthly", priority: 0.8, lastModified: "2026-06-23" },
  { path: "/about",       changeFrequency: "monthly", priority: 0.7, lastModified: "2026-06-13" },
  { path: "/contact",     changeFrequency: "yearly",  priority: 0.4, lastModified: "2026-06-13" },
  { path: "/privacy",     changeFrequency: "yearly",  priority: 0.3, lastModified: "2026-06-13" }
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));
}
