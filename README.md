# FM26 Staff & Training Tools

Unofficial fan-made tools for evaluating staff, training assignments and coach
quality in Football Manager 2026.

The first tool is the FM26 Coach Rating Calculator. It uses the word-level staff
attributes shown in FM26, then applies an internal fan-made approximation model
to estimate a 0-100 score, a 0.5-5 star rating and a rating range.

## Features

- Next.js App Router with TypeScript and Tailwind CSS
- No database, no user accounts and no server-only runtime requirements
- Static-export friendly configuration
- FM26 word-level staff attributes throughout the calculator UI
- Category-specific weighting for training assignments
- Estimated score, stars, label, uncertainty range and improvement tip
- Formula data kept in reusable `lib/` files

## File Structure

```text
app/
  coach-rating-calculator/
    page.tsx
  globals.css
  layout.tsx
  page.tsx
components/
  AttributeSelect.tsx
  CategorySelect.tsx
  CoachRatingCalculator.tsx
  RatingResult.tsx
  StarRating.tsx
  ToolCard.tsx
lib/
  attributeLevels.ts
  ratingFormula.ts
  ratingLabels.ts
  trainingCategories.ts
tests/
  ratingFormula.test.ts
```

## Installation

```bash
npm install
```

## Local Development

```bash
npm run dev
```

Then open `http://localhost:3000`.

On Windows, you can also double-click `FM26-Tools-Baslat.bat` in the project
folder. It installs dependencies on first run, opens the browser and starts the
local development server.

## Test and Build

```bash
npm run test
npm run build
```

## Deploy

### Vercel standard Next.js deploy

Vercel can run the project as a standard Next.js app. Connect the repository and
use the default build command:

```bash
npm run build
```

### Cloudflare Pages static export

The project uses `output: "export"` in `next.config.mjs`, so `npm run build`
creates a static `out/` folder. In Cloudflare Pages, use:

```text
Build command: npm run build
Output directory: out
```

Set `NEXT_PUBLIC_SITE_URL` to the production URL before building so `sitemap.xml`
and canonical metadata use the live domain.

## Formula Notes

The model is intentionally presented as an estimated rating model. The internal
attribute level model can be changed in `lib/attributeLevels.ts`, and category
weights can be tuned in `lib/trainingCategories.ts`. These values are for the
fan-made approximation only and are not presented as official Football Manager
data.

This project is not affiliated with Sports Interactive, SEGA, or Football
Manager.
