# Implement multi-language switch (EN default + 中文)

Dicts already at `i18n/en.json`, `i18n/zh.json` (also copy into `dist/i18n/`).

## UX
- Language switcher in the header nav (near GitHub / install): **EN** | **中文**
- Default language: English (`en`)
- Persist preference in `localStorage` key `skep.lang` (`en` or `zh`)
- On load: read preference, apply translations, set `document.documentElement.lang`
- Switching updates all `data-i18n` nodes immediately

## Implementation
1. Mark user-facing copy in `dist/index.html` (and source if mirrored) with `data-i18n="key"` matching keys in the JSON. For attributes use `data-i18n-attr="aria-label"` (or title) plus `data-i18n="key"`.
2. Must translate: nav, hero, how-it-works, **#the-hive** (all steps + caption), architecture, features, **security / D19** quote+body, quickstart chrome labels, CTA/footer, toast strings in JS.
3. Extend `dist/app.js`: load `/i18n/{lang}.json` (fallback en), apply i18n, wire switcher, update toast messages from dict (`toast.copied`, `toast.copyFailed`, `btn.copied`).
4. Light CSS for the switcher to match the dark developer aesthetic.
5. Keep CLI commands / code samples in English (do not wrap those in data-i18n unless the dict says so).
6. Deploy: copy updated `dist/*` (including `dist/i18n/`) to `/var/www/skepagent/` so https://skepagent.com serves it (nginx already on 127.0.0.1:8088 via CF tunnel).
7. Commit changes in this git repo.

Do not change Cloudflare DNS. Do not print secrets.
