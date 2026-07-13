import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";
import { localePath } from "@/lib/i18n";
import { getAllPosts, getAltSlug } from "@/lib/blog";

const D = siteConfig.domain;
const abs = (locale: "en" | "vi", path: string) => `${D}${localePath(locale, path)}`;

// Static logical routes that exist identically in both locales.
const STATIC_PATHS = [
  "/",
  "/salon-pos",
  "/online-booking",
  "/check-in",
  "/payroll",
  "/pricing",
  "/about",
  "/contact",
  "/blog",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = "2026-06-11";
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    const languages = {
      en: abs("en", path),
      vi: abs("vi", path),
      "x-default": abs("en", path),
    };
    for (const locale of ["en", "vi"] as const) {
      entries.push({
        url: abs(locale, path),
        lastModified,
        changeFrequency: path === "/blog" ? "weekly" : "monthly",
        priority: path === "/" ? 1 : 0.7,
        alternates: { languages },
      });
    }
  }

  // Blog posts — slugs differ per locale, paired by translation key (§11.4).
  for (const post of getAllPosts("en")) {
    const viSlug = getAltSlug(post.meta.key, "vi");
    const languages: Record<string, string> = {
      en: abs("en", `/blog/${post.meta.slug}`),
      "x-default": abs("en", `/blog/${post.meta.slug}`),
    };
    if (viSlug) languages.vi = abs("vi", `/blog/${viSlug}`);

    entries.push({
      url: abs("en", `/blog/${post.meta.slug}`),
      lastModified: post.meta.date || lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: { languages },
    });
    if (viSlug) {
      entries.push({
        url: abs("vi", `/blog/${viSlug}`),
        lastModified: post.meta.date || lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages },
      });
    }
  }

  return entries;
}
