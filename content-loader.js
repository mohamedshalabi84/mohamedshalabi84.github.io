/* Portfolio content loader (V15).
 *
 * Applies content.json over the bilingual text already authored inline in index.html.
 * The inline markup is the structural source of truth, so the site stays readable even
 * if content.json is missing, stale or hand-edited.
 *
 * Safety rule: entries are matched to elements by their ENGLISH text, never purely by
 * array position. An index-based match silently rewrites the wrong element whenever the
 * JSON and the markup drift apart — that is what previously pushed project copy into the
 * Journey timeline and AI copy into Certifications. A stale file can now only fail to
 * match; it can never corrupt unrelated sections.
 */
(() => {
  'use strict';

  const els = [...document.querySelectorAll('[data-en][data-ar]')];

  /* JSON generated from HTML can still carry entities; compare normalised plain text. */
  const norm = (value) => String(value == null ? '' : value)
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

  /* Reuses the page's own language renderer so titles, placeholders and counters agree. */
  function refreshLanguage() {
    const active = document.documentElement.lang === 'ar' ? 'ar' : 'en';
    const button = document.querySelector('[data-lang="' + active + '"]');
    if (button) { button.click(); return; }
    els.forEach((el) => { el.textContent = el.dataset[active]; });
  }

  function applyContent(data) {
    if (!data || !Array.isArray(data.items)) return;

    const byEnglish = new Map();
    for (const item of data.items) {
      if (!item || typeof item.en !== 'string') continue;
      const key = norm(item.en);
      if (!key) continue;
      if (!byEnglish.has(key)) byEnglish.set(key, []);
      byEnglish.get(key).push(item);
    }

    let applied = 0;
    let skipped = 0;

    els.forEach((el, index) => {
      const ownEnglish = norm(el.dataset.en);
      if (!ownEnglish) return;

      let item = null;

      /* Fast path: the file is aligned with this markup, so the slot can be trusted and
         edits to the English wording are carried straight through. */
      const slot = data.items[index];
      if (slot && norm(slot.en) === ownEnglish) item = slot;

      /* Fallback: locate the entry by English text. Only used when every candidate agrees
         on the Arabic wording, so duplicate English strings cannot swap translations. */
      if (!item) {
        const candidates = byEnglish.get(ownEnglish);
        if (candidates && candidates.length) {
          const arabic = new Set(candidates.map((candidate) => norm(candidate.ar)));
          if (arabic.size === 1) item = candidates[0];
          else skipped++;
        }
      }

      if (!item) return;

      if (norm(item.ar)) el.dataset.ar = item.ar;
      if (norm(item.en)) el.dataset.en = item.en;
      applied++;
    });

    if (data.media && data.media.portrait) {
      const portrait = document.querySelector('.hero-portrait img');
      if (portrait) portrait.src = data.media.portrait;
    }

    if (data.profile && data.profile.phone) {
      const phone = String(data.profile.phone).replace(/[^+\d]/g, '');
      document.querySelectorAll('a[href^="tel:"]').forEach((link) => { link.href = 'tel:' + phone; });
    }

    if (data.profile && data.profile.email) {
      document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
        const subject = link.href.includes('?') ? link.href.substring(link.href.indexOf('?')) : '';
        link.href = 'mailto:' + data.profile.email + subject;
      });
    }

    if (applied) refreshLanguage();

    /* Reports drift instead of hiding it: open editor.html to rebuild an aligned file. */
    if (applied < els.length) {
      console.info('[portfolio] Applied ' + applied + ' of ' + els.length + ' content entries from content.json' +
        (skipped ? ' (' + skipped + ' ambiguous matches skipped)' : '') + '. Open editor.html to rebuild an aligned content.json.');
    }
  }

  fetch('./content.json', { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error('content.json ' + response.status);
      return response.json();
    })
    .then(applyContent)
    .catch((error) => console.warn('Using built-in portfolio content:', error));
})();
