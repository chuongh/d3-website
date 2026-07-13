import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import { buildAlternates, localePath, type Locale } from "@/lib/i18n";

const OG_LOCALE: Record<Locale, string> = { en: "en_US", vi: "vi_VN" };

/**
 * Build a consistent Metadata object for a page that exists at the same logical
 * `path` in both locales. Handles title, description, canonical, hreflang
 * alternates, OpenGraph + Twitter card with the branded 1200×630 OG image (§3, §11.2).
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  ogImage = "/og/default.png",
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  ogImage?: string;
}): Metadata {
  const url = `${siteConfig.domain}${localePath(locale, path)}`;
  const alt = buildAlternates(path);
  return {
    title,
    description,
    alternates: {
      canonical: localePath(locale, path),
      languages: alt.languages,
    },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title,
      description,
      locale: OG_LOCALE[locale],
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
