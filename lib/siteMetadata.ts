export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.fmworkbench.com";

export const siteName = "FM Workbench";
export const defaultDescription =
  "Estimate Football Manager 2026 coach ratings for every training assignment using visible staff attributes.";
