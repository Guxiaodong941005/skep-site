# skep-site

Marketing site for [skepagent.com](https://skepagent.com), for `@skepagent/skep` v0.1.1.

Zero-build static site: everything served lives in `dist/`, hand-written (no bundler, no framework,
no analytics, no backend).

```
dist/
  index.html      single page (hero, how it works, architecture, features, security, quickstart, CTA, footer)
  styles.css      dark theme, design tokens from DESIGN.md
  app.js          EN | 中文 switcher (i18n), copy buttons + toast, accessible tab switchers, optional GitHub star count
  og-image.png    1200x630 social card (rendered from og-image.svg)
  og-image.svg    source of the social card
  favicon.svg
  404.html
  i18n/           en.json + zh.json dictionaries served to the page (mirror of ../i18n/)
  _headers        security headers + CSP for Cloudflare Pages
  robots.txt, sitemap.xml
wrangler.toml     Pages project "skep-site", output dir "dist"
DESIGN.md         design spec
DEPLOY.md         deploy + DNS cutover steps
```

Preview locally:

```bash
npx wrangler pages dev dist      # or: python3 -m http.server -d dist 8080
```

Product facts on the page were checked against the published `@skepagent/skep@0.1.1` tarball (CLI
flags, event names, README, CHANGELOG). Where DESIGN.md's sample commands didn't match the real CLI,
the page follows the CLI:

- `skep session start` has no `--topic` flag. Join with `skep session join --code <code> --host <ip>:7419`.
- `skepd` takes no `--repo`. It runs as a per-device service after `skep init`.
- The blackboard is the `main` branch of a separate blackboard repo, not `refs/skep/blackboard`.
- Conflict handling uses epoch-fenced leases and a deterministic reducer, not a CRDT.
- The supported agent CLIs are claude, codex and pi.

If you change `og-image.svg`, re-render the PNG at 1200x630, for example with `@resvg/resvg-js` and
the Inter and JetBrains Mono fonts.

## Languages (EN | 中文)

Copy is translated client-side from flat dictionaries in `i18n/{en,zh}.json`; keep `dist/i18n/` an exact
copy (`cp i18n/*.json dist/i18n/`). The choice persists in `localStorage["skep.lang"]` (`en` | `zh`);
English is the default and the fallback for anything missing.

- `data-i18n="key"` sets an element's text; add `data-i18n-attr="aria-label"` (etc.) to translate an
  attribute instead.
- When an element contains markup (`<code>`, links, highlighted spans), the dictionary value uses `{0}`,
  `{1}`… placeholders for those child elements in DOM order, e.g. `"Install {0} from npm."`. Children are
  re-inserted as-is, so CLI commands and code are never translated. A value that omits a placeholder
  falls back to English rather than dropping the element.
- Shell commands, copyable comments and clipboard payloads stay English.
