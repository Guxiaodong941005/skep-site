# Deploying skepagent.com to Cloudflare Pages

The site is static files in `dist/`. There is no build step. Cloudflare Pages project name: `skep-site`.

## 1. One-time: authenticate

Use either of these:

```bash
# Interactive (opens a browser)
npx wrangler login

# Or non-interactive (CI): an API token with "Account › Cloudflare Pages › Edit"
export CLOUDFLARE_API_TOKEN=...      # never commit this
export CLOUDFLARE_ACCOUNT_ID=...     # dashboard → right sidebar on any zone, or `npx wrangler whoami`
```

## 2. One-time: create the Pages project

```bash
cd /root/skep-site
npx wrangler pages project create skep-site --production-branch main
```

(`wrangler pages deploy` also offers to create it on first run if it doesn't exist.)

## 3. Deploy

```bash
cd /root/skep-site
npx wrangler pages deploy dist --project-name skep-site --branch main
```

`wrangler.toml` sets `pages_build_output_dir = "dist"`, so `npx wrangler pages deploy` with no
arguments also works from this directory. This deploys to production because the branch is `main`.
Use `--branch preview` (or any other name) for a preview URL instead.

Verify on the `*.pages.dev` URL that wrangler prints (e.g. `https://skep-site.pages.dev`):

```bash
curl -sI https://skep-site.pages.dev/ | grep -iE 'HTTP/|content-security-policy'
curl -sI https://skep-site.pages.dev/og-image.png | head -1
```

## 4. Attach the custom domains

In the Cloudflare dashboard, open **Workers & Pages → skep-site → Custom domains → Set up a custom domain**:

1. Add `skepagent.com`.
2. Add `www.skepagent.com`.

What Cloudflare asks you to do next depends on where DNS for `skepagent.com` is hosted.

### Option A (recommended): move DNS to Cloudflare

The apex domain (`skepagent.com` with no `www`) can only point to Pages if the zone is on
Cloudflare. A CNAME at the apex isn't allowed at most registrars, including Squarespace.

1. Cloudflare dashboard → **Add a domain** → `skepagent.com` → Free plan.
2. Cloudflare imports the existing records. **Before switching nameservers, review them:**
   - **Delete** the Squarespace website records:
     - `A @` → `198.185.159.144`, `198.185.159.145`, `198.49.23.144`, `198.49.23.145`
     - `CNAME www` → `ext-cust.squarespace.com`
     - any `CNAME` verification record like `<random> → verify.squarespace.com`
   - **Keep** mail and other records: `MX`, SPF/DKIM/DMARC `TXT`, any Google/Microsoft verification `TXT`.
3. In **Squarespace Domains → skepagent.com → DNS → Nameservers**, switch to custom nameservers and
   enter the two `*.ns.cloudflare.com` nameservers Cloudflare shows you. If DNSSEC is on at
   Squarespace, turn it off first, then turn it back on in Cloudflare once the zone is active.
4. Wait until the zone shows **Active** (usually minutes, at most 24h).
5. Back in **skep-site → Custom domains**, add `skepagent.com` and `www.skepagent.com`.
   Cloudflare creates the proxied `CNAME @ → skep-site.pages.dev` (flattened at the apex) and
   `CNAME www → skep-site.pages.dev` records for you.
6. Optional: redirect `www` to the apex with **Rules → Redirect Rules**
   (`www.skepagent.com/*` → `https://skepagent.com/${1}`, 301), or keep both serving.

### Option B: keep DNS at Squarespace

This only works for subdomains. The apex can't point to Pages from Squarespace DNS.

1. In Squarespace **DNS settings** for `skepagent.com`:
   - Delete the `CNAME www → ext-cust.squarespace.com` record.
   - Add `CNAME www → skep-site.pages.dev`.
2. In Pages → Custom domains, add `www.skepagent.com` and wait for it to show **Active**.
3. For the apex, either keep the Squarespace `A` records and set up a Squarespace domain forward
   `skepagent.com → https://www.skepagent.com`, or use Option A. Also update the canonical/OG URLs
   in `dist/index.html`, `robots.txt` and `sitemap.xml` to `https://www.skepagent.com/` if `www`
   becomes the primary host.

Important: add the custom domain in Pages **before** pointing the CNAME at it. Otherwise
`*.pages.dev` returns a 522 or 1014 error for that hostname.

## 5. After the cutover

```bash
dig +short skepagent.com          # Cloudflare anycast IPs (104.x / 172.x), not 198.185.159.x / 198.49.23.x
dig +short www.skepagent.com
curl -sI https://skepagent.com/ | head -5
```

- Disconnect the domain from the Squarespace website (Squarespace → Settings → Domains) so
  Squarespace stops trying to serve it. Keep the domain **registration** there unless you also
  transfer it.
- Check the social card: <https://www.opengraph.xyz/url/https%3A%2F%2Fskepagent.com%2F>.
- SSL/TLS mode for the zone: **Full (strict)**. Pages provisions the certificate automatically.

## Rollback

Every deploy is immutable. In **Workers & Pages → skep-site → Deployments**, pick an earlier deployment and choose
**Rollback to this deployment**.
