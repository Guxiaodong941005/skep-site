# skep-site

Marketing site for [skepagent.com](https://skepagent.com), for `@skepagent/skep` v0.1.1.

Zero-build static site: everything served lives in `dist/`, hand-written (no bundler, no framework,
no analytics, no backend).

```
dist/
  index.html      single page (hero, how it works, architecture, features, security, quickstart, CTA, footer)
  styles.css      dark theme, design tokens from DESIGN.md
  app.js          copy buttons + toast, accessible tab switchers, optional GitHub star count
  og-image.png    1200x630 social card (rendered from og-image.svg)
  og-image.svg    source of the social card
  favicon.svg
  404.html
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
