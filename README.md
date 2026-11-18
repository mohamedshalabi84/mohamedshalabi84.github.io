# Mohamed Shalabi — Executive Portfolio (V15)

A fully static, bilingual (EN / عربي) executive portfolio for **Mohamed Shalabi**, PMO & Digital
Governance Lead. Runs on GitHub Pages with **no backend, no database, no CMS and no paid services**.

## Entry points
| Path | Purpose |
| --- | --- |
| `index.html` | The public portfolio (all sections, all 15 projects, EN/AR). |
| `editor.html` | Browser-based content editor (draft / import / export / rebuild). No publish rights. |
| `content.json` | Bilingual text catalogue + `profile` and `media` settings. |
| `content-loader.js` | Applies `content.json` over the inline text in `index.html`. |
| `images/logo.png` | Supplied MS. artwork (1024×683). Master — optimized derivatives are served. |
| `images/portrait.png` | Supplied portrait, saved byte-for-byte (1,574,520 B). Master for the responsive variants. |
| `fonts/Dubai-*.woff` | Self-hosted **Dubai Font** (Light 300 / Regular 400 / Medium 500 / Bold 700–900). No CDN. |
| `Mohamed_Sayed_Shalabi_CV.pdf` | Downloadable CV (hero + contact "Download CV" buttons). |

## Executive Governance Console
Four tabs, each with its own real panel (not a single swapped `<div>`):

| Tab | Focus | CTA destination |
| --- | --- | --- |
| PMO | Portfolio governance, dashboards, RAID, stage gates, KPI reporting, decision traceability | `#projects` |
| Transformation | SAP Business One ERP, Microsoft 365/Azure, process improvement, enterprise delivery | `#case-4` (SAP ERP) |
| Responsible AI | AI governance policies, responsible adoption, AI risk, human oversight, integration | `#ai` |
| Risk & Assurance | Risk registers, IT audit coordination, change governance, CAB, compliance, remediation | `#case-6` (ITSM & change) |

**Why it was broken:** the decorative `.hero:before` grid overlay was painted *above* the
console, which had `position:static`. Every real pointer click hit the overlay instead of the
buttons (`elementFromPoint` returned `DIV.hero`). Programmatic `button.click()` bypassed
hit-testing, which is why the handlers looked wired. Fixed with `.hero:before,.hero:after
{pointer-events:none}` and making `.console` a positioned stacking context.

**Semantics:** `role="tablist"` → `role="tab"` with `aria-selected` and `aria-controls`, and four
`role="tabpanel"` regions. Roving `tabindex` (one tab is 0, the rest −1). Arrow keys, Home and End
work; arrow direction is mirrored in RTL. Panels are real markup, so all copy is translatable and
readable without JavaScript (the first panel is simply visible).

## Experience metrics (authoritative)
Two **separate** metrics that must never be merged or confused:

| Metric | English | Arabic |
| --- | --- | --- |
| Total professional experience | `18+ Years — Professional Experience` | `+18 عاماً — من الخبرة المهنية` |
| UAE professional experience | `14+ Years — UAE Experience` | `+14 عاماً — من الخبرة في دولة الإمارات` |

The hero also states **"In Dubai since July 2012"** / `في دبي منذ يوليو 2012`.
The earlier `13+` (and any `12+`) UAE figure was **removed everywhere**; the journey timeline
(`2008–2011`, `2012–2019`, `2020–2024`, `2024–present`) is consistent with both figures and with
residency from July 2012. The acceptance suite asserts that `13+` and `12+` appear nowhere.

## Arabic typography — Dubai Font (self-hosted)
The **actual Dubai Font family** is served, not a Tahoma-style imitation, and **never from a CDN**:

```css
@font-face{font-family:'Dubai';src:url('fonts/Dubai-Regular.woff') format('woff');font-weight:400;font-display:swap}
/* … Light 300, Medium 500, Bold 700 900 … */
html[lang=ar] h1, html[lang=ar] h2, html[lang=ar] p, html[lang=ar] a, … {font-family:'Dubai','Segoe UI',Tahoma,Arial,sans-serif}
```

- Applies to headings, body copy, nav, buttons, project descriptions, statistics and mobile layouts
  (every `html[lang=ar]` selector), so English keeps Inter and Arabic gets Dubai.
- `font-display:swap` plus a realistic Arabic fallback chain (`Segoe UI` → `Tahoma` → `Arial`) means
  text stays readable and correctly shaped even if the WOFF files fail to load.
- Arabic leading is opened to `1.9` (`h1`/`h2` `1.35`) because Dubai sets tighter than Tahoma at
  executive display sizes.
- Verified in-browser: 4 faces declared, `document.fonts.check('16px Dubai') === true`, and computed
  `font-family` resolves to `Dubai` on body, `h1`, nav, `.btn`, project `h3`, `.metric`, console tabs
  and footer. The suite also asserts **no** `fonts.googleapis` / `fonts.gstatic` / `cdnfonts` request.

## Portrait
`images/portrait.png` is your upload stored verbatim (never redrawn or approximated). Responsive
WebP variants are served through one `<picture>`:

| File | Size | Used for |
| --- | --- | --- |
| `images/portrait-640.webp` | 22.4 KB | ≥761px (desktop/tablet) |
| `images/portrait-400.webp` | 10.5 KB | ≤760px (phones) |
| `images/portrait-640.png` | 590 KB | No-WebP fallback |

Sizing is CSS-only and circular (`border-radius:50%`, `object-fit:cover`, `object-position:center 22%`)
with a gold gradient ring. The portrait stays on the **left** in both LTR and RTL, and the acceptance
suite asserts its bounding box never intersects the `h1`. The previous portrait
(`mohamed-shalabi.jpg`, at the root and in `images/`) was **deleted**, and no reference to it remains
in markup, CSS or `content.json`.

## Logo & image assets
`images/logo.png` is your uploaded artwork, saved byte-for-byte from the original upload URL and
kept unchanged as the high-resolution master. **No redraw, trace, recolour or crop** of the design.

**Measured facts about the master** (pixel probe, not a guess): 1024×683 px PNG, genuine
**transparent background** (`alphaMin=0`; ~518k non-opaque pixels). The grey in some previews is the
viewer's backdrop, not part of the file. Artwork is a gold **M**, white **S**, gold full stop.

### Optimized derivatives
Generated from the master; all local, all genuine alpha, aspect ratio locked at 1.500.

| File | Dimensions | Size | Used for |
| --- | --- | --- | --- |
| `images/logo.png` | 1024×683 | 725.7 KB | Master — **kept, not served** to the page |
| `images/logo-160.webp` | 240×160 | **23.4 KB** | Header/footer ≥701px (2× of 38px/26px) |
| `images/logo-96.webp` | 144×96 | **10.7 KB** | Header/footer ≤700px (2× of 30px/22px) |
| `images/logo-160.png` | 240×160 | 52.1 KB | Fallback for browsers without WebP |
| `images/favicon-64.png` | 64×64 | **6.1 KB** | `<link rel="icon">` |
| `images/favicon-180.png` | 180×180 | 33.4 KB | `apple-touch-icon` |

Header cost dropped from **725.7 KB → 23.4 KB (−97%)**, or **10.7 KB (−98.5%)** on phones.

### How it's wired
`<picture>` picks the file, so there is one code path and no JS:

```html
<picture>
  <source media="(max-width:700px)" srcset="images/logo-96.webp" type="image/webp">
  <source srcset="images/logo-160.webp" type="image/webp">
  <img alt="MS. — Mohamed Shalabi" src="images/logo-160.png" width="240" height="160">
</picture>
```

Browsers without WebP fall through to `logo-160.png`. `width`/`height` carry the true intrinsic
size to prevent layout shift. Sizing stays CSS-only: `38px` header (`30px` ≤700px), `26px` footer
(`22px` ≤700px), always `width:auto` so the mark never distorts.

### Regenerating the derivatives
Any of these work; the markup needs no change as long as filenames stay the same.

- **This project's environment:** the assets were produced via the wsrv.nl image CDN and then
  committed locally (e.g. `?h=160&output=webp&q=82&l=3`). The site has **no runtime dependency** on
  that service — the files are in the repo.
- **Locally, best quality:** `cwebp -q 82 -alpha_q 100 -resize 0 160 images/logo.png -o images/logo-160.webp`
  (from `libwebp`), plus `sips`/ImageMagick for the PNG fallback and favicons.
- **Favicons:** generated with `trim=6` then `fit=contain`, which removes empty margin so the mark
  reads at 16px **without** cropping the gold swoosh, M, S or dot.

### Rejected alternative (why the favicon isn't a cover-crop)
A `fit=cover` square crop looked bolder at 16px, but it clipped the decorative gold swoosh and
grazed the M and S edges. Trim-then-contain gives nearly the same legibility while keeping the
design intact, per the "no visual changes" requirement.

## Sections
Hero (portrait, name, positioning, 4 metrics, CTAs) · Executive Governance Console (4 interactive
tabs) · Executive Profile · Core Expertise · Selected Projects + full 15-project portfolio
(featured cards, category filters, live search, expandable case details) · Responsible AI Governance ·
Leadership approach + career journey · Credentials & development · Contact · Footer.

## Bilingual behaviour
- Every user-facing string carries `data-en` / `data-ar`; **408** bilingual elements, zero missing Arabic.
- Arabic is written to a **UAE professional register** for government / semi-government readers, with
  consistent terminology: `مكتب إدارة المشاريع` (PMO), `حوكمة تقنية المعلومات` (IT Governance),
  `التحول الرقمي`, `إدارة المحافظ`, `إدارة المخاطر`, `حوكمة الذكاء الاصطناعي`.
- Official certification and technology names stay in English in both modes (23 strings, verified):
  PMP®, PMI-ACP®, PMI-RMP®, ITIL® 4, CPMAI, SAP Business One, plus the PMI/Google/Duke/EDUCBA
  course titles and the contact email.
- The `EN` / `عربي` switch sets `lang` + `dir` (`rtl` on Arabic), retranslates titles, search
  placeholder and the project counter, and persists the choice in `localStorage`
  (key `portfolioLanguage`).
- The portrait stays on the **left** in both languages; text never overlaps it.
- Protocol names (PMP®, PMI-ACP®, PMI-RMP®, ITIL® 4, CPMAI) stay in English in both modes, by design.
- CPMAI is presented as *core training completed, exam preparation in progress* — not a certification.

## Acceptance tests (this round)
A headless suite of **61 checks** runs the real page at **desktop 1280×800** and **mobile 390×844**:

- **Dubai Font** — 4 faces declared, `fonts.check` true, faces loaded, applied to all Arabic types,
  no external CDN, `@font-face` sources are local `fonts/Dubai-*.woff` only.
- **Portrait** — loads, correct aspect (1.000), `object-fit:cover`, gold gradient ring, no overlap with
  the headline, serves `portrait-400.webp` ≤760px / `portrait-640.webp` above, zero old-portrait refs.
- **Metrics** — `18+` Professional Experience and `14+` UAE Experience present in EN and AR, no `13+`
  or `12+` anywhere, "since July 2012" stated in both languages, no Arabic-Indic digits.
- **Console** — 4 tabs / 4 panels, correct ARIA, one panel per tab, gold active fill, real pointer
  hit-test (no overlay interception) and Arrow/Home/End keyboard including RTL mirroring.
- **Content** — 15 projects, 7 filters, search, 15/15 Arabic case-detail summaries, language
  persistence, favicon/apple-touch/logo/CV assets, no horizontal overflow, no leaked markup.

**Result: desktop 61 PASS / 0 FAIL · mobile 61 PASS / 0 FAIL.** Full detail in
`ACCEPTANCE-REPORT.md`.

Three initial "failures" were defects in the harness, not the site: a 4th metric that is
intentionally non-numeric (`PMO · IT · AI`), official certification names flagged as "untranslated",
and an `elementFromPoint` hit-test run without scrolling the console into view. Each was diagnosed
and the assertion corrected rather than the page.

## Interactions (all verified in a headless browser)
| Feature | Behaviour |
| --- | --- |
| Governance console | 4 tabs, click + Arrow/Home/End keyboard, swaps title/description/link. |
| Category filters | `All · Governance · Enterprise · Cloud · Payments · Platforms · Infrastructure`. |
| Project search | Matches EN **and** AR text, updates the live "Showing N of 15" counter. |
| Case details | Native `<details>` per project — accessible, works without JS. |
| Mobile menu | Toggles an `open` class and keeps `aria-expanded` in sync. |
| Language switch | Full retranslation + RTL flip, remembered across visits. |
| Scroll progress | Gold reading bar driven by `scrollY`. |

## Editing content
1. Serve the folder over HTTP (GitHub Pages, or locally `python -m http.server 8000`).
2. Open `editor.html`, pick a section, edit the English and Arabic fields.
3. **Export content.json**, then replace `content.json` in the repository and commit.

`editor.html` never publishes and never asks for GitHub credentials — it only produces a file you
commit yourself. Drafts live in `localStorage` under `ms-v14-editor-draft` and do not sync.

### If the editor shows stale text: "Rebuild from page"
`content.json` is currently **fully aligned**: 401 entries covering all **408** bilingual elements
(the 7 shared strings — e.g. `Related initiatives` appearing once per console panel — are matched by
text; there are 330 distinct English strings). The audit reports `MATCHED=408 MISSING=0 AR_DIFF=0
ORPHANS=0`, and the loader no longer logs a drift warning.

If it drifts later, **Rebuild from page** re-reads `index.html`, emits one correctly ordered entry per
bilingual element, and reuses any existing wording it can match — producing an aligned file in one
click. Export it and commit.

## Content-integrity notes (important)
`content-loader.js` matches entries to elements **by English text, not by array index**. The earlier
index-based loader silently rewrote the wrong nodes once the JSON drifted, which pushed project copy
into the Journey timeline and AI copy into Certifications. Consequences of the current design:

- A stale or hand-edited `content.json` can only *fail to match*; it can no longer corrupt another
  section. The inline markup is the structural source of truth.
- Matching falls back to English text only when all candidates share the same Arabic, so duplicate
  English strings cannot swap translations.
- When fewer entries than elements apply, an `info` message in the console reports the counts and
  points at the editor's rebuild action. Drift stays visible instead of hiding.

## Publishing to GitHub Pages
1. Upload **all files** from this folder to the root of `mohamedshalabi84/mohamedshalabi84.github.io`
   (replace any older `index.html` and `content.json`).
2. Wait for the Pages deployment, then visit https://mohamedshalabi84.github.io/.
3. Edit later at https://mohamedshalabi84.github.io/editor.html → Export → commit `content.json`.

All asset paths are relative, so the site also works from a subdirectory. No build step.

## Local preview
```bash
python -m http.server 8000
# http://localhost:8000/          → portfolio
# http://localhost:8000/editor.html → editor
```
Opening the files via `file://` blocks `fetch('./content.json')`; the page still renders fully from
its inline content, and the editor shows a hint to use HTTP instead.

## Known limitations
- The editor edits **text**, not structure. Adding or removing a project card, or adding a section,
  means editing `index.html` (each new text node needs `data-en` + `data-ar`).
- `editor.html` is public but privilege-free: it cannot write to the repository, so it exposes no
  credentials and no publish path. Don't put private information in `content.json`.
- The editor's preview iframe shows the currently served site, not unsaved edits — publish first.
- LinkedIn URL is `linkedin.com/in/mohdshalabi` (as supplied); the CV uses the same handle.

## Possible next steps
- Deploy to GitHub Pages (or a Hosted Deploy) **once explicitly approved** — nothing is live yet.
- Optional: subset the Dubai WOFFs to the Arabic glyphs actually used to cut ~270 KB to ~90 KB.
- Optional: split `content.json` into `profile / projects / credentials / experience` files if the
  catalogue grows; `index.html` is ~124 KB today mostly because all 15 case studies are inline.
