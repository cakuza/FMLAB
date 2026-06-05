export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://fm26-staff-tools.example.com";

export const siteName = "FM26 Staff & Training Tools";
export const defaultDescription =
  "Unofficial Football Manager 2026 coach assignment tool for estimating training stars from word-based staff attributes.";
