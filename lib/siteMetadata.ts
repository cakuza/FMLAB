export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://fmlab-five.vercel.app";

export const siteName = "FM Lab";
export const defaultDescription =
  "Estimate Football Manager 2026 coach ratings for every training assignment using visible staff attributes.";
