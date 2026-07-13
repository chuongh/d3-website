# D3 Salon Solution — Marketing Website

Multi-page marketing site for **D3 Salon Solution** (nail-salon POS & management software).
Next.js 14 (App Router) · TypeScript · Tailwind · static-prerendered (SSG) · EN/VI i18n.

Built to the LOCKED v3 spec: <https://app.notion.com/p/37c9e87e207e8118afe9c81bb741dd89>

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (prerenders every route)
npm run start      # serve the production build
```

## Architecture

- **Routing / i18n (§11).** English is the default locale at **root paths** (`/`, `/pricing`, …).
  Vietnamese lives under **`/vi/...`**. Both are fully static. EN routes are in `app/*`,
  VI routes mirror them in `app/vi/*`; each thin route file renders a shared content
  component from `components/pages/` wrapped in `<SiteShell locale=…>`. This keeps EN at
  root with no middleware (which static export doesn't support). `app/vi/layout.tsx`
  corrects `<html lang>` to `vi`.
- **Copy** lives in `public/locales/{en,vi}.json` (the VI set follows the industry-authentic
  nail-salon Vietnamese guidelines in §11.3). `lib/dictionaries.ts` is the typed loader.
- **Design system (§4, §12)** is in `app/globals.css` — primary `#4858F8` (logo blue), the
  glossy layer (sheen overlays, 3D hero tilt + glow halo + shine sweep, floating glass
  cards), all gated behind the `≤980px` / `≤640px` / `prefers-reduced-motion` rules.
- **Blog (§10.5)** is MDX in `content/blog/{en,vi}/*.mdx`, rendered with `next-mdx-remote`.
  EN/VI posts are paired by a shared `key` in frontmatter (VI slugs are translated, §11.4).
- **SEO.** `lib/seo.ts` (titles/descriptions/canonical/hreflang/OG), `lib/schema.ts`
  (Organization, SoftwareApplication, FAQPage, Article, BreadcrumbList JSON-LD),
  `app/sitemap.ts` (all routes × 2 locales + blog, with hreflang), `app/robots.ts`.
- **Images (§4).** All product screenshots are self-hosted WebP in `public/images/`
  (re-encoded from the live site — **zero hotlinks**), served via `next/image` with explicit
  dimensions (`lib/images.ts`) for a zero-CLS layout. OG image: `public/og/default.png`.

## Redirects (§9, §13.1)

`next.config.mjs` `redirects()` (mirrored in `vercel.json` as a hosting-level backup):

- `/salon-software` and `/salon-software/` → `/` (301)
- `/salon-furniture/`, `/pedicure-chairs/`, `/marketing-services/`, … → the furniture
  subdomain `https://furniture.d3salonsolution.com{path}` (301)

`skipTrailingSlashRedirect` is on so each legacy URL resolves in a **single 301 hop** (no chains).

> **Output mode:** we use Next's default output (not `output: 'export'`) because static
> export silently drops `redirects()`. Every route is still fully static-prerendered
> (`○`/`●` in the build output). Deploy on Vercel for working redirects + `next/image`.

## Outstanding placeholders (resolve before launch — §8, §10.8, §13.2)

Edit `site.config.ts`:

- `GA4_ID` — Google Analytics 4 measurement ID (`gscVerification` for Search Console).
- `formEndpoint` — demo-form backend (D3 API lead endpoint or Formspree/Resend). Until set,
  the form shows its success state and logs the lead to the console. See `components/DemoForm.tsx`.
- `email`, `social.*` — confirm public sales email and social handles.

Content placeholders:

- **About stats** (`about.stats` in the locale files) — `[X]+` salons / years / states.
- **Real photos** — `📸 [Photo: …]` tiles (`<PhotoPlaceholder>`) swap to `<Image>` once the
  Photo & Video shoot (§13.2 brief A–H) is delivered.
- **Blog bodies** — the 10 posts ship with realistic outlines marked `{/* TODO: real copy needed */}`.
- **Testimonials** — intentionally omitted (spec forbids fabricated quotes); add a section when real ones exist.

## Acceptance status

Verified locally against the built output: all routes render with unique title/meta/single
h1 (both locales); hreflang en/vi/x-default on every pair; JSON-LD for all required types;
`sitemap.xml` covers all routes × 2 locales + blog with hreflang; 301 single-hop redirects;
hotline `tel:` links; Basic $49.95 / Premium $99.95; EN↔VI toggle; all images self-hosted
WebP (0 hotlinks); `prefers-reduced-motion` honored. **Run Lighthouse mobile (≥90 Perf & SEO)
and the hreflang/Rich-Results validators against the deployed URL** — those need the live host.
