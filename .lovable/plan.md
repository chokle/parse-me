# Parseur-inspired Clone + New Perk

A multi-page marketing site inspired by parseur.com (AI document data extraction), rebuilt with original copy/visuals and one meaningful new feature that the original is missing.

## The new perk: "Review Inbox" — Human-in-the-loop confidence routing

Parseur markets accuracy and automation, but nothing on the site surfaces a built-in **low-confidence review queue** where humans approve borderline extractions before they hit downstream systems. We'll add this as a first-class feature:

- Per-field confidence scores
- Auto-route any extraction below a threshold to a **Review Inbox**
- Side-by-side document ↔ extracted JSON, click-to-correct
- Corrections feed back as training signal
- SLA timer + assignee + audit log

This is presented as a marketed feature with its own page, plus an interactive demo on the homepage.

## Pages (TanStack Start file-based routes)

```
src/routes/
  index.tsx                       Home (hero, logos, how-it-works, perk demo, pricing teaser, CTA)
  document-intake.tsx             Core feature page
  document-parsing.tsx            Core feature page
  exports-and-integrations.tsx    Core feature page
  review-inbox.tsx                NEW perk feature page (with interactive demo)
  pricing.tsx                     3-tier pricing + FAQ
  integrations.tsx                Logo grid of integrations
  contact.tsx                     Book a demo form
```

Each route gets its own `head()` with unique title/description/og tags. Hash anchors only for in-page scrolling.

## Homepage sections

1. Sticky nav (logo, Features dropdown, Pricing, Integrations, Review Inbox, Sign in, Get started)
2. Hero — headline, sub, two CTAs, animated "document → fields" visualization
3. Trusted-by logo strip (fictional company names)
4. How it works — 3 steps (Send → Extract → Sync)
5. Core capabilities grid (Intake, Parsing, OCR, Normalize, Export)
6. **Review Inbox showcase** (the new perk) — split view mock with confidence chips, "Approve / Edit" buttons, animated counter
7. Integrations marquee (Sheets, Slack, Zapier, Make, Airtable, etc. — text/SVG, no copyrighted logos)
8. Pricing teaser (3 cards)
9. FAQ accordion
10. Final CTA + footer

## Review Inbox page (the perk)

- Hero explaining the problem ("99% accuracy still means 1 in 100 invoices wrong")
- Interactive demo: a fake document with 6 fields, 2 flagged low-confidence, user can click to "approve" or edit inline, counter updates
- Feature bullets: thresholds, assignees, SLA, audit trail, training feedback
- Comparison table: "Without Review Inbox" vs "With Review Inbox"

## Design direction

I'll generate 3 design directions (modern SaaS, all original styling) for you to pick from before building. Likely axes:
- Clean light SaaS with soft gradients and rounded cards
- Editorial / typographic with serif accents and lots of whitespace
- Dark technical with mono accents and data-viz feel

All variants use semantic tokens in `src/styles.css` (oklch), Tailwind v4, shadcn primitives.

## Technical notes

- Pure frontend, no backend needed for the marketing site
- Interactive Review Inbox demo uses local React state only
- All copy is original; no Parseur trademarks, logos, or assets reused
- Company/integration logos rendered as text or simple SVG placeholders
- Responsive mobile-first (user is viewing at 390px)
- SEO: unique meta per route, semantic HTML, single H1, alt text

## Out of scope (for this first build)

- Real auth / signup
- Real document parsing
- Backend / database (can be added later via Lovable Cloud)

---

Next step after approval: I'll call `design--create_directions` so you can pick a visual direction, then build.