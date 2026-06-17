# Changelog

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
