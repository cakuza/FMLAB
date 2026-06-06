# FM26 Staff & Training Tools

Practical tools for evaluating staff and coach assignment fit in Football
Manager 2026.

The main tool is the FM26 Coach Assignment Calculator. It uses the word-level
staff attributes shown in FM26, then applies an internal estimate model to
compare stars for the 9 visible coach assignment categories.

## How to Use

- Open a coach profile in FM26.
- Match the visible word levels in the calculator.
- Pick an assignment to see its main levers.
- Use the highest estimated stars as a shortlist before offering a contract or
  changing staff responsibilities.

## Features

- Next.js App Router with TypeScript and Tailwind CSS
- No database, no user accounts and no server-only runtime requirements
- Static-export friendly configuration
- FM26 word-level staff attributes throughout the calculator UI
- Assignment-specific weighting for the 9 coach assignment slots
- Compact 9-row assignment ratings panel
- Inspect assignment control for seeing the attributes behind each role
- Example coach presets and reset control for faster testing
- Formula data kept in reusable `lib/` files

## Main Calculator Inputs

The visible calculator inputs are limited to the attributes used by the 9 main
FM26 coach assignment estimates:

- Coaching attributes: Attacking, Defending, Fitness, Goalkeeping, Possession,
  Set Pieces, Tactical and Technical
- Mental attributes: Authority, Determination and Motivating

Legacy or unrelated staff fields are not shown in the main calculator and do not
affect assignment stars.

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

The model is intentionally presented as an estimated assignment model. The
internal attribute level model can be changed in `lib/attributeLevels.ts`, and
assignment weights can be tuned in `lib/trainingCategories.ts`. These values are
for comparison only and are not presented as official Football Manager data.

FM Lab is an unofficial fan-made tool and is not affiliated with, endorsed by,
sponsored by, or connected to Sports Interactive, SEGA, or Football Manager. All
trademarks belong to their respective owners. Ratings are estimates for
comparison only.
