# UI-PREMIUM — skepagent.com visual polish

Goal: denser, more deliberate dark UI — glass nav, richer hero depth, softer cards, better type rhythm. Keep EN/zh `<select>` language switcher and all `data-i18n` keys. No blackboard/skepd copy.

## Tokens (`:root`)
- Raise `--wrap` to `1180px`; `--radius` to `12px`; add `--radius-lg: 16px`.
- Add glow tokens: `--glow-cyan: rgba(6,182,212,.22)`, `--glow-em: rgba(16,185,129,.14)`.
- Add `--shadow-card: 0 1px 0 rgba(255,255,255,.04) inset, 0 18px 50px rgba(0,0,0,.35)`.
- `--bg-base` keep near `#07090D`; surfaces slightly cooler.
- Load Inter + JetBrains Mono via Google Fonts (or keep system stack if offline constraint — prefer fonts).

## Nav
- Sticky glass: `backdrop-filter: blur(14px) saturate(1.2)`; background `rgba(8,10,14,.72)`; bottom border with soft cyan fade.
- Slightly taller (`height: 64px`); brand mark with subtle cyan drop-shadow.
- Lang select: denser padding, cyan focus ring, custom chevron.

## Hero
- Soft radial vignette behind title (cyan → transparent), plus faint grid already present — increase opacity of accent wash.
- Title: slightly tighter tracking; optional gradient on second line (`hero.title`) from `#F8FAFC` → `#67E8F9`.
- Primary CTA: soft glow `box-shadow: 0 0 0 1px ..., 0 10px 40px var(--glow-cyan)`.
- Terminal demos: deeper panel, top highlight edge, tab pills with active cyan underline.

## Cards / features / hive
- Cards: `--shadow-card`, hover lift `translateY(-2px)` + brighter border `#334155`.
- Hive nodes: left accent bar or top glow per role (human amber, skep cyan, devices slate, session emerald, merge amber).
- Step numbers: larger mono, muted with cyan tint.

## Architecture / security / quickstart
- Architecture terminal: softer green/cyan syntax colors; padded frame with glow edge.
- Feature grid: 2→3 columns earlier; icons in soft tinted circles.
- Security list: checkmarks in emerald disks.

## Motion / polish
- Respect `prefers-reduced-motion`.
- Fade-in sections on scroll (subtle, ~200ms, opacity+translateY) via `.reveal` class + tiny app.js IntersectionObserver — optional; skip if risk.
- Focus rings consistent cyan.

## Footer / CTA
- CTA band with gradient border top; buttons aligned.
- Footer denser, muted links hover to primary.

## Files to edit
1. `/root/skep-site/dist/styles.css` (+ sync `/var/www/skepagent/styles.css`)
2. Minor class hooks in `index.html` if needed (e.g. `hero-title-gradient`, `card--glow`) — keep i18n attrs.
3. `app.js` only if adding reveal observer or cache-bust.
4. Bump `?v=` on css/js to `20261009-4`.
5. Deploy: copy to `/var/www/skepagent/`, `nginx -t && systemctl reload nginx`.
6. Mirror into `/root/skep-site/dist/`.

## Do not
- Reintroduce blackboard/skepd/signed-git blackboard wording.
- Break language `<select id="lang-select">`.
- Remove hive or demo session tabs.
