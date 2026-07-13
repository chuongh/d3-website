/**
 * D3 Salon Solution — Next.js config
 *
 * NOTE on output mode (spec §5, §9, §11.1):
 * The spec asks for "all SSG" AND working 301 redirects() AND no middleware.
 * `output: 'export'` would prerender every route to static HTML, but it SILENTLY
 * DROPS next.config redirects() (there is no server to execute them). Since the
 * acceptance criteria explicitly require the 301 redirects to work, we use Next's
 * default output: every marketing route is still fully static-prerendered via
 * generateStaticParams (verifiable in the build output as ○/● static), while
 * redirects() run at the edge on Vercel. `vercel.json` carries the same rules as a
 * hosting-level backup. If a pure static export is ever required, swap to
 * `output: 'export'` and rely on vercel.json / _redirects for the 301s.
 */

const FURNITURE_URL = "https://furniture.d3salonsolution.com";

// Known legacy WordPress paths that now live on the furniture subdomain (§9, §13.1).
// We enumerate them rather than using a catch-all so we never shadow a new route.
const LEGACY_WP_PATHS = [
  "salon-furniture",
  "pedicure-chairs",
  "manicure-tables",
  "salon-equipment",
  "marketing-services",
  "graphic-design",
  "photo-video",
  "web-design",
  "contact-us",
];

// GitHub Pages deploy target (set in .github/workflows/deploy.yml). NEXT_PUBLIC_
// so the same base path is inlined into BOTH server and client bundles — it must
// be prepended by hand to next/image `src` and metadata icons, because Next does
// NOT auto-apply basePath to unoptimized images (required for static export).
// Empty on Vercel builds, which keep the default server output + redirects().
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""; // e.g. "/d3-website"
const isGithubPages = basePath !== "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isGithubPages
    ? {
        output: "export",
        basePath,
        // Trailing slashes so /about resolves to /about/index.html on Pages.
        trailingSlash: true,
      }
    : {}),
  // Don't auto-strip trailing slashes before redirects run — that would turn a
  // legacy "/salon-furniture/" hit into a chain (normalize 308 → our 301). With
  // this off, our explicit slash + no-slash rules each resolve in a SINGLE 301 hop
  // (spec §9: "NO redirect chains").
  skipTrailingSlashRedirect: true,
  images: {
    // All product imagery is self-hosted under /public/images (§4, no hotlinks)
    // and already encoded as WebP at final size.
    formats: ["image/avif", "image/webp"],
    // Serve those files directly instead of running them through Next's on-disk
    // image optimizer. On this exFAT working drive, macOS auto-creates AppleDouble
    // `._*` sidecars inside `.next/cache/images`, which the optimizer then serves
    // in place of the real bytes → broken images. Bypassing the cache avoids that
    // entirely. (For a Vercel/Linux deploy, this line can be removed to re-enable
    // optimization — the sidecar issue is macOS-on-exFAT-specific.)
    unoptimized: true,
  },
  // Static export has no server to run redirects — skip them on GitHub Pages.
  async redirects() {
    if (isGithubPages) return [];
    // statusCode: 301 (not permanent:true, which emits 308) per spec §9 acceptance.
    return [
      // The new homepage replaces /salon-software/ and inherits its rankings (§9).
      { source: "/salon-software", destination: "/", statusCode: 301 },
      { source: "/salon-software/", destination: "/", statusCode: 301 },
      // Legacy WordPress terms slug → new /terms page.
      { source: "/terms-conditions", destination: "/terms", statusCode: 301 },
      { source: "/terms-conditions/", destination: "/terms", statusCode: 301 },
      // Legacy WP services move to the furniture subdomain, path preserved (§9, §13.1).
      ...LEGACY_WP_PATHS.flatMap((p) => [
        { source: `/${p}`, destination: `${FURNITURE_URL}/${p}/`, statusCode: 301 },
        { source: `/${p}/`, destination: `${FURNITURE_URL}/${p}/`, statusCode: 301 },
      ]),
    ];
  },
};

export default nextConfig;
