export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://fm26-staff-tools.example.com";

export const siteName = "FM26 Staff & Training Tools";
export const defaultDescription =
  "Unofficial Football Manager 2026 staff tools for estimating coach ratings, training fit and staff quality.";
