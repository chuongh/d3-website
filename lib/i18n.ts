import { siteConfig } from "@/site.config";

export const locales = ["en", "vi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Build a locale-aware href for an in-site path.
 * EN (default) lives at root paths; VI lives under the /vi prefix (§11.1).
 *   localePath("en", "/payroll") -> "/payroll"
 *   localePath("vi", "/payroll") -> "/vi/payroll"
 *   localePath("vi", "/")        -> "/vi"
 */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  if (locale === "en") return clean === "" ? "/" : clean;
  return `/vi${clean}`;
}

/** Absolute canonical URL for a path in a given locale. */
export function absoluteUrl(locale: Locale, path = "/"): string {
  return `${siteConfig.domain}${localePath(locale, path)}`;
}

/**
 * hreflang alternates for a page that exists at the same logical `path` in both
 * locales (everything except blog posts, whose slugs are translated — see lib/blog).
 * x-default points at EN per §11.2.
 */
export function buildAlternates(path = "/") {
  return {
    canonical: localePath(defaultLocale, path),
    languages: {
      en: localePath("en", path),
      vi: localePath("vi", path),
      "x-default": localePath("en", path),
    },
  };
}

/** Map a logical path to its sibling in the other locale (for the language switcher). */
export function switchLocalePath(current: Locale, path: string): string {
  const other: Locale = current === "en" ? "vi" : "en";
  // Strip an existing /vi prefix to recover the logical path, then re-localize.
  const logical = path.replace(/^\/vi(?=\/|$)/, "") || "/";
  return localePath(other, logical);
}
