# Final Acceptance Test Report — Portrait, Arabic, Metrics & Dubai Font

**Project:** Mohamed Shalabi — Executive Portfolio
**Version tested:** V17 (new portrait · Dubai Font · 18+/14+ metrics · aligned content.json)
**Test date:** 2026-11-18
**Status:** ✅ **PASSED — 61/61 on desktop and mobile** (nothing deployed; local only)

## How this was tested

A headless Chromium suite ran against the **real `index.html`** at two viewports:

- **Desktop** 1280×800
- **Mobile** 390×844 (touch + mobile UA — mobile breakpoints genuinely applied)

Interactions used **real pointer hit-testing** (`elementFromPoint` → topmost element → real click),
not `.click()` shortcuts, so an overlay swallowing clicks would be caught. Keyboard was driven with
real `KeyboardEvent`s. Results were also **rendered on-page** and read back from a screenshot, to
confirm the checks passed in the actual mobile layout rather than only in a console log.

**Result: TOTAL 61 · PASS 61 · FAILS 0** at **both** widths.

---

## Passed — this round's requirements

### 1. Dubai Font (actual family, self-hosted)
| Check | Evidence |
|---|---|
| 4 faces declared (300/400/500/700 900) | `fontFaces=4`, weights 300, 400, 500, `700 900` |
| Font actually available | `document.fonts.check('16px Dubai') === true` |
| Faces loaded | `400:loaded`, `700 900:loaded` (300/500 lazily unloaded — correct `font-display` behaviour) |
| Applied to all Arabic text | `body`, `h1`, nav, `.btn`, project `h3`, `.metric`, `.console-tab`, footer, `.lead` → all `Dubai` |
| No external font CDN | zero `fonts.googleapis` / `fonts.gstatic` / `cdnfonts` requests |
| `@font-face` sources local | all `url("fonts/Dubai-*.woff")` |
| RTL | `dir=rtl`, `lang=ar` |

### 2. Portrait replacement
| Check | Evidence |
|---|---|
| New portrait loads | 640×640, `complete` |
| Aspect preserved | ratio **1.000** (no distortion) |
| Framing | `object-fit:cover`, `object-position:center 22%` |
| Gold ring | `linear-gradient(135deg, rgb(240,209,154) → rgb(154,114,57) …)` |
| Desktop source | `portrait-640.webp` |
| Mobile source | `portrait-400.webp` (responsive `<picture>`) |
| No overlap with headline | portrait x 32–322 vs `h1` x 384–1248 |
| Old portrait gone | zero `mohamed-shalabi` references anywhere |

### 3. Experience metrics (never mixed)
| Check | Evidence |
|---|---|
| Total: 18+ | `18+` / `Years — Professional Experience` / `+18 عاماً — من الخبرة المهنية` |
| UAE: 14+ | `14+` / `Years — UAE Experience` / `+14 عاماً — من الخبرة في دولة الإمارات` |
| Dubai since July 2012 | EN *"In Dubai since July 2012"*, AR `في دبي منذ يوليو 2012` |
| Old 13+ removed | `13+` **absent** from the whole page |
| 12+ absent | `12+` **absent** |
| Western digits in AR | no Arabic-Indic (`٠-٩`) digits in metrics |

### 4. Arabic — UAE executive standard
| Check | Evidence |
|---|---|
| Every bilingual element has Arabic | 0 missing of 408 |
| English-only strings | exactly **23**, all official names + email (asserted) |
| Terminology unified | `مكتب إدارة المشاريع`, `حوكمة تقنية المعلومات`, `التحول الرقمي`, `إدارة المحافظ`, `إدارة المخاطر`, `حوكمة الذكاء الاصطناعي` |
| Duplicate English with divergent Arabic | **0** (was 6 — all unified) |
| Arabic case details | 15/15 summaries render in Arabic |

### 5. content.json synchronisation
Audit against the live DOM: `MATCHED=408 · MISSING=0 · AR_DIFF=0 · ORPHANS=0 · DUP_DIFF_AR=0`.
The loader's drift warning (`Applied 335 of 378 …`) is **gone** — console is clean. Stale entries
`#32`/`#33` were removed; 43 missing entries added; metric labels and all Arabic deltas corrected.

### 6. Executive Governance Console
4 tabs / 4 panels · correct ARIA (`tablist`/`tab`/`tabpanel`, `aria-selected`, `aria-labelledby`) ·
one panel per tab · gold active fill `rgb(212,173,104)` · **real pointer click works** (topmost element
is `BUTTON.console-tab`) · Arrow/Home/End keyboard with RTL mirroring (`right=delivery end=assurance home=pmo`).

### 7. Preserved content & functionality
15 project cards · 7 filters (Governance filter → 4, All restores 15) · search (`SAP` → 1) ·
language persistence (`ar` → `en`) · favicon + apple-touch-icon · header/footer logo · CV links ·
no horizontal overflow (1280 vs 1280) · no raw markup leaked · viewport meta present.

---

## Harness defects found and corrected (not product defects)

Three initial failures were faults in the test, verified and fixed rather than papered over:

1. **`PMO · IT · AI` "has no digits"** — the 4th metric is intentionally non-numeric; only the two
   year metrics must carry digits. Assertion narrowed to `^\+\d+\+?$` on exactly 2 metrics.
2. **"Untranslated prose"** — flagged 23 strings that are all official certification/technology names
   (PMP®, PMI-ACP®, PMI-RMP®, ITIL® 4, CPMAI, SAP Business One, PMI/Google/Duke/EDUCBA course titles)
   plus the contact email, which **must** stay English per requirement. Replaced the regex heuristic
   with an explicit verified allowlist and added an exact-count assertion.
3. **`elementFromPoint` returned `null`** — the console sits below the fold, and hit-testing only sees
   painted pixels. Added `scrollIntoView` before probing (the same trap as the original console bug).

## Not tested / limitations
- Real touch gestures (tap/swipe) — clicks were verified via pointer events and hit-testing.
- Safari/Firefox-specific rendering — Chromium only.
- Dubai WOFFs are full-family files (~270 KB total); subsetting is an optional optimisation.

## Verdict
All requested changes are implemented and verified at desktop and mobile widths.
**No deployment was performed** — publishing remains pending explicit approval.
