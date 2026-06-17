# Changelog

## 2026-06-17 — Trust, accessibility, SEO & copy pass

Acted on a senior UX/UI design critique of the live site, judged against the
platform concept (trust-first, SEO as the wedge, Romanian newcomers,
mobile-first). Also ran a copywriting pass over the content.

### Trust
- Replaced the two "FOTO:" gradient placeholders in the hero with meaningful
  product panels: a guides checklist ("Pas cu pas, în limba ta.") and an Ana
  chat preview — showcasing the two live pillars instead of empty boxes.
- Re-added official **sources** to all three guides (frontmatter `sources` +
  rendered "Surse oficiale" list): Rijksoverheid, RvIG, DigiD, Belastingdienst,
  CAK, KVK. Sources are a core trust signal in the concept.
- Removed fabricated social proof (M/I/D avatars + "ajutăm zilnic") in favour of
  honest value chips: *Gratuit · În română · Surse oficiale*.

### Accessibility (now WCAG AA)
- Darkened text tokens to pass contrast: `--color-poppy-d` #C13E20 → **#B83A1C**
  (white-on-button 5.7:1, 4.7:1+ on washes), `--color-faint` #9C8B79 → **#7E6E5C**
  (4.8:1), `--color-honey-d` #C9871D → **#8C5E12** (4.9:1 on honey-wash).
- `sănătate` category text now uses poppy-d; eyebrow uses poppy-d.
- Global `:focus-visible` ring + a guaranteed focus ring on the chat input
  (`focus-within` on the form).

### SEO
- Added JSON-LD structured data: `TechArticle` on each guide + `Organization`
  sitewide.
- Replaced the auto-numbered article `h2` (which implied a false step order) with
  a poppy section bar; true sequence stays in the numbered `<ol>` lists.

### Mobile-first
- Restored cost + tap affordance on guide rows on mobile (a `cost · duration`
  line with a chevron) without crowding the title.

### Copywriting
- Hero lead rewritten to be honest and functional (leads with the live guides +
  Ana, no longer implies a community that isn't live yet).
- Chat errors now render as a distinct warning callout ("Ceva n-a mers bine",
  what happened + how to fix) instead of masquerading as an answer from Ana.

## 2026-06-17 — "Acasă" redesign (warm, community-first direction)

Complete visual redesign of the Ghid Olanda platform, recreating the **Acasă**
design handoff (`design_handoff_acasa_redesign/`) in the Next.js 16 / React 19 /
Tailwind v4 codebase. The institutional Delta-blue/navy brand was replaced with
a warm palette: cream paper background, poppy-red action colour, honey + pine
accents, and editorial typography (Bricolage Grotesque + Hanken Grotesk).

Guide content still comes from `src/content/ghiduri/*.md` — only the
presentation changed, not the data.

### Added
- `src/components/icons.tsx` — hand-inlined Lucide-style SVG icons (no new dependency).
- `src/lib/guide-style.tsx` — maps a guide category to its colour + icon
  (administrativ → pine, sănătate → poppy, business → honey).
- `src/components/Reveal.tsx` — scroll-reveal wrapper (IntersectionObserver,
  respects `prefers-reduced-motion`, with a safety fallback).
- `src/components/SiteHeader.tsx` / `SiteFooter.tsx` — sticky header and ink
  footer (footer hidden on the Ana chat view).
- `src/components/GuidesList.tsx` — category filter pills + vertical guide rows
  (replaces `KennisbankExplorer`).

### Changed
- `src/app/globals.css` — Acasă design tokens in the `@theme` block plus
  component styles: buttons, article prose (numbered `h2`, honey-numbered
  ordered lists, poppy bullets), callouts, chat bubbles and typing animation.
- `src/app/layout.tsx` — fonts switched to Bricolage Grotesque + Hanken Grotesk
  via `next/font` (`latin` + `latin-ext` for Romanian diacritics); new header/footer.
- `src/app/page.tsx` — home: hero with image-placeholder collage, essential
  guides, Ana band, and the community "what's coming" section.
- `src/app/ghid/[slug]/page.tsx` — article: dossier (fișă) card, restyled prose,
  Ana CTA; markdown `> [!TIP]/[!WARNING]/[!NOTE]` blockquotes now render as
  Acasă callouts with a coloured title + icon.
- `src/app/asistent/page.tsx` — Ana chat in the new look, still wired to the live
  Gemini RAG endpoint (`/api/chat`), with suggestion chips, typing indicator and
  article deep-link seeding.

### Removed
- `src/components/KennisbankExplorer.tsx` — superseded by `GuidesList`
  (the free-text search box was dropped; the Acasă home uses filter pills only).

### Notes
- The Acasă palette is a departure from the previous brand. To revert, restore
  the old `@theme` block in `globals.css`.
- No formal "Surse oficiale" list or per-article Q&A rows: that data isn't in the
  markdown frontmatter, so a generic "în curând" community teaser is shown instead.
