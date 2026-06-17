# Handoff: Ghid Olanda — "Acasă" redesign (warm, community-first direction)

## Overview
This is a complete visual redesign of the **Ghid & Markt Olanda** platform — a Romanian-language guide + AI-assistant product for Romanians living in the Netherlands. The "**Acasă**" direction ("Home/At-home") is the warm, human, community-first option: cream paper background, poppy-red action colour, honey + pine accents, friendly editorial typography. It covers three views:

1. **Home** — hero, essential-guides list (with category filters), an "Ana" assistant band, and a "what's coming" community section.
2. **Article** — a single procedural guide (dossier card with institution/cost/time/difficulty, prose body with numbered steps and callouts, sources, an Ana CTA, and a community Q&A teaser).
3. **Ana chat** — the AI-assistant conversation view with suggestion chips, message bubbles, a typing indicator, and an EU-AI-Act disclaimer.

The product speaks **Romanian first**, always pairing the official Dutch term (in `.nl` styling) with its Romanian meaning — e.g. *primăria locală (**Gemeente**)*, *asigurare de bază (**basisverzekering**)*. Address the reader as informal "tu". No emoji anywhere.

## About the Design Files
The files in `design/` are **design references created in HTML/CSS/vanilla JS** — a working prototype showing the intended look and behaviour. They are **not** production code to copy directly. The task is to **recreate this design in the existing `rom-com` codebase** (Next.js 16 + React 19 + Tailwind v4), using its established patterns: the `@theme` token block in `src/app/globals.css`, the App-Router layout, and the existing components (`KennisbankExplorer`, `asistent/page.tsx`, `ghid/[slug]/page.tsx`). The guide content already exists as markdown in `src/content/ghiduri/*.md` — reuse it; the design only changes presentation, not data.

> Note: this "Acasă" palette is a **departure** from the current product's institutional Delta-blue/navy + Carpathian-emerald system. Treat it as a candidate art direction — confirm with the team before replacing the live brand tokens.

## Fidelity
**High-fidelity (hifi).** Final colours, typography, spacing, radii, shadows and interactions are all specified below and present in `design/styles.css`. Recreate the UI pixel-perfectly using the codebase's component/Tailwind patterns. All exact values are in the Design Tokens section.

---

## Design Tokens

### Colours
| Role | Hex | Usage |
|---|---|---|
| `--bg` page | `#FAF1E4` | cream paper background |
| `--bg2` | `#F3E6D2` | secondary fill (filter pills inactive, circle buttons) |
| `--card` | `#FFFBF4` | card surfaces |
| `--ink` | `#241C16` | headings, dark buttons, footer bg |
| `--soft` | `#6A5C4E` | body text |
| `--faint` | `#9C8B79` | meta/labels |
| `--poppy` | `#E0502E` | **primary action** — buttons, links, eyebrow text |
| `--poppy-d` | `#C13E20` | poppy hover/pressed, link text |
| `--honey` | `#E9A93C` | secondary accent, eyebrow dot, underline highlight |
| `--honey-d` | `#C9871D` | honey text on light |
| `--pine` | `#2C5544` | tertiary accent — Ana band, fișă bar, NL terms |
| `--pine-d` | `#1F3E32` | pine deep |
| `--pine-tint` | `#E5EEE9` | pine wash (admin icon bg, note callout) |
| `--line` | `#E7D8C2` | hairline borders |
| `--line2` | `#DCC9AE` | stronger border / dividers |
| `--poppy-wash` | `#FBE4DB` | poppy tint (sănătate icon, warning callout) |
| `--honey-wash` | `#FBEFD6` | honey tint (business icon, tip callout, ol markers) |

### Typography
- **Display** — `Bricolage Grotesque` (weights 500/700/800, optical sizing 12–96). Headings, logo, stat values, h2/h3.
- **Body/UI** — `Hanken Grotesk` (400/500/600/700). Everything else.
- Base body `line-height: 1.6`; prose body `font-size: 18px`, `line-height: 1.72`.
- **Eyebrow label**: 13px, weight 700, `letter-spacing: .04em`, UPPERCASE, poppy colour, with a 18px honey circle `::before`.
- Hero h1: `clamp(42px, 5.6vw, 74px)`, weight 800, `letter-spacing: -.025em`, `line-height: .98`.
- Section h2: `clamp(30px, 3.8vw, 48px)`, weight 800, `-.025em`.
- Article h1: `clamp(34px, 5vw, 56px)`, weight 800.

### Spacing / radii / shadows
- Content max width `--maxw: 1180px`; prose/article max width `--prose: 730px`; chat shell `840px`. Side padding 28px (20px ≤560px).
- **Radii**: buttons 14px · cards/rows 22px · large bands 32px · icon tiles 18px · footer top corners 34px · pills/filters/dots 999px · message bubbles 6px/18px asymmetric.
- **Shadows**: cards lift on hover to `0 22px 40px -28px rgba(60,40,20,.4)`; poppy button `0 10px 24px -10px rgba(224,80,46,.7)`; chat shell `0 30px 60px -42px rgba(60,40,20,.5)`.
- **Section rhythm**: `.section` = 64px vertical padding; hero = `56px 0 30px`.
- **Easing**: `cubic-bezier(.2,.7,.2,1)`, ~200–220ms for colour/transform; reveals 700ms.

---

## Screens / Views

### 1. Home (`#view-home`)
**Header** (sticky, 74px, `rgba(250,241,228,.85)` + `blur(10px)`, bottom hairline). Left: logo = 36px poppy rounded-square (13px radius) with white "G" in Bricolage 800 + "Ghid Olanda" wordmark. Right nav: "Ghiduri" (→ home), "Comunitate" (→ scroll to section), "Întreabă pe Ana" as a poppy button (→ Ana view). Nav links 15px/600, `--soft` → `--ink` on hover; active link is `--ink`.

**Hero** — 2-col grid `1.08fr .92fr`, 50px gap, centred.
- Left: eyebrow "Comunitatea ta în Olanda" · h1 *"Aici nu ești `<span class=u>`singur`</span>` în Olanda."* (the `.u` word is poppy with a honey 10px underline-highlight bar behind it) · lead 19px `--soft`, max 32ch · CTA row: poppy button "Întreabă pe Ana" (arrow nudges +4px on hover) + ghost button "Vezi ghidurile" (scrolls to guides) + "helped" cluster (3 overlapping 30px avatar dots in pine/poppy/honey + "ajutăm zilnic").
- Right: `.collage` 440px tall — `ph1` (62%×74%, top-left, pine gradient, label "FOTO: PIAȚĂ LOCALĂ"), `ph2` (50%×56%, bottom-right, poppy→honey gradient, label "FOTO: COMUNITATE"), and a rotated (+5°) ink "în română" sticker top-right. **These are image placeholders** — replace with real community/marketplace photography; each has a bottom gradient scrim and uppercase caption.

**Guides section** (`#ghiduri`) — sec-head (eyebrow "Ghidurile esențiale" + h2 "Pașii prin care trece oricine" + sub). Then **filter pills** (`Toate` + one per category, 999px, active = ink fill) and a **vertical list of guide rows** (`.grow`):
- Row grid `auto 1fr auto`, card surface, 22px radius, hover lifts -3px + border darkens.
- Left: 60px icon tile (18px radius) tinted by category — `admin`=pine-tint/pine, `sanatate`=poppy-wash/poppy, `business`=honey-wash/honey-d. Lucide-style icons.
- Middle: uppercase category label (faint) · h3 title (Bricolage 22px/700) · summary (`--soft`).
- Right: facts (Bricolage value + faint label, e.g. "Gratuit / 30-45 min") + 46px circular "go" button (bg2) that turns poppy + rotates -8° on hover.

**Ana band** (`.ana-band`, clickable → Ana) — pine `#2C5544`, 32px radius. Grid `auto 1fr auto`: 90px circular Ana avatar (honey→poppy gradient, white "A", inset white ring) + text (honey eyebrow, Bricolage h3 "Salut, sunt Ana.", body at white/.8) + ink button "Începe o conversație".

**Community section** (`#comunitate`) — sec-head (pine eyebrow). 3-col pillar grid: each `.pill` is a card with a big faint number (01/02/03), h4, body, and a status badge — `live` (pine fill, "Disponibil acum") or `soon` (bg2/faint, "În curând").

**Footer** (`#foot`) — ink block, 34px top corners. 3-col grid `1.6fr 1fr 1fr`: brand + mission line, "Platformă" links, "Despre" links; bottom row "© 2026 Ghid Olanda" + "Informații neoficiale. Ana respectă EU AI Act." Footer links hover to honey.

### 2. Article (`#view-article`, rendered by JS — see `renderArticle` in app.js)
Back-link ("← Înapoi la ghiduri", gap widens + turns poppy on hover). Article head (max 730px): category pill + "Actualizat 13 iunie 2026" · h1 · standfirst (20px/`--soft`).

**Fișă (dossier) card** — pine header bar "Fișă procedură" + 4-col grid of cells (Instituție / Cost oficial / Timp / Dificultate), each label uppercase-faint over a Bricolage value, cells divided by hairlines.

**Prose** (730px) — h2 has a poppy 38px rounded-square step number; numbered `<ol>` uses honey-wash square counters; `<ul>` uses poppy dot bullets; `.nl` terms are pine/700; links are poppy-d underlined. **Callouts**: `.tip` (honey-wash), `.warning` (poppy-wash), `.note` (pine-tint), each with a Bricolage title + Lucide icon.

**Sources** list (external-link icon rows, hover poppy). **Article Ana CTA** (pine card, 64px avatar). **Q&A teaser** — pine eyebrow "Din comunitate, în curând" + rows of avatar + question + meta.

### 3. Ana chat (`#view-ana`, rendered by JS — see `renderAna`)
Centred 840px shell. Hero: 88px Ana avatar, h1 "Salut, sunt **Ana**." (em = poppy), intro. **Chat card** (26px radius, big soft shadow): scroll stream (min 330 / max 480px) starting with an empty-state of suggestion chips (Bricolage, hover poppy + slide +3px); on send, user bubbles (pine, right-aligned, "Tu" avatar) and Ana bubbles (bg surface, left, gradient "A" avatar) with a 3-dot **bounce** typing indicator (`@keyframes tb`, 1.2s) shown for ~950ms before the reply. Input row: borderless text field + 46px circular poppy send button (disabled until non-empty). Below: centred disclaimer about EU AI Act / orientative answers.

---

## Interactions & Behavior
- **Routing** (`show`/`go` in app.js): three views toggled via `hidden`; footer hidden on Ana view; `window.scrollTo(0,0)` and reveals re-armed on each nav. In React, model as route segments (`/`, `/ghid/[slug]`, `/asistent`) or client state — match the existing App Router.
- **Click delegation** on `document`: `[data-open=slug]` → article, `[data-nav]` → view, `[data-cat]` → filter, `[data-sug]` → send suggestion, `[data-scroll]` → smooth-scroll to section, `[data-src]` → no-op (prevent default).
- **Filters**: `activeCat` state; "Toate" + unique categories; clicking re-renders the list filtered.
- **Ana answers**: keyword-matched canned responses (`anaAnswer`) — in production wire to the existing RAG assistant endpoint. Keep the ~950ms typing delay + indicator for perceived responsiveness, and always append the disclaimer.
- **Reveals**: `.reveal` elements fade up (opacity 0 → 1, translateY 18px → 0, 700ms) via IntersectionObserver (`threshold .12`, staggered 70ms). **Important:** there is a 500ms fallback that force-reveals everything if IO never fires (some embedded environments) — in React, prefer a standard scroll-reveal hook and respect `prefers-reduced-motion` (the CSS already disables the transform under reduced motion).
- **Hover micro-interactions**: button arrows nudge +4px; guide "go" button rotates -8° and fills poppy; cards lift; back-link gap widens. No scale-on-press.

## State Management
- `activeView` ∈ {home, article, ana}
- `activeCat` (filter) — string
- `currentSlug` (article)
- Ana: `messages[]` ({role, html}), `typing` boolean, `seeded` boolean (article→Ana deep-link seeds an opening question). Persist conversation if desired.
- Data: `GUIDES[]` (slug, category, icon, title, summary, authority, cost, duration, difficulty, standfirst, body HTML, sources[], qa[]) — in production source this from `src/content/ghiduri/*.md` frontmatter + body, not the inline array.

## Assets
- **Icons**: Lucide (Feather family) — the prototype hand-inlines Lucide-identical SVGs (`I.*` map in app.js: admin/building, heart-pulse, store, file, tip/lightbulb, warn/triangle, note/info, send, arrow, back, ext). Use the `lucide-react` package in the codebase. Stroke 2–2.5px, `currentColor`, round caps/joins.
- **Photography**: the hero collage uses two **gradient placeholders** ("FOTO: piață locală", "FOTO: comunitate"). Real community/marketplace photos are needed — until then keep the gradient + uppercase caption treatment.
- **Fonts**: Google Fonts — Bricolage Grotesque + Hanken Grotesk (self-host or use `next/font`).
- No logo image: the mark is a poppy rounded square with a "G" glyph.

## Files
- `design/index.html` — home view markup + header/footer scaffold.
- `design/styles.css` — all visual tokens and component styles (authoritative for exact values).
- `design/app.js` — routing, guide data, filters, article renderer, Ana chat logic, reveals.

Original prototype lives in the project at `acasa/` (the same three files). The two sibling alternative directions ("Helder", "Sistem") are in `mockups/` for context.
