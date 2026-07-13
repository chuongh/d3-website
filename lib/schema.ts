import { siteConfig } from "@/site.config";
import { absoluteUrl, type Locale } from "@/lib/i18n";

const inLanguage = (locale: Locale) => (locale === "vi" ? "vi-US" : "en-US");

/** Organization schema — used site-wide (home, about) (§3, §10.4). */
export function organizationSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.domain,
    logo: `${siteConfig.domain}/d3-logo.png`,
    description: siteConfig.tagline,
    telephone: "+1-919-655-3989",
    inLanguage: inLanguage(locale),
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.youtube,
      siteConfig.social.tiktok,
    ],
  };
}

/** SoftwareApplication schema with pricing offers (home) (§3). */
export function softwareApplicationSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${siteConfig.name} — Nail Salon POS`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    inLanguage: inLanguage(locale),
    description:
      "All-in-one nail salon POS, online booking, payroll and self check-in kiosk.",
    offers: [
      {
        "@type": "Offer",
        name: "Basic",
        price: "49.95",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "49.95",
          priceCurrency: "USD",
          unitText: "MONTH",
        },
      },
      {
        "@type": "Offer",
        name: "Premium",
        price: "99.95",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "99.95",
          priceCurrency: "USD",
          unitText: "MONTH",
        },
      },
    ],
  };
}

/** FAQPage schema from a list of Q&A (pricing, feature pages, home FAQ) (§3). */
export function faqSchema(items: { q: string; a: string }[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: inLanguage(locale),
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

/** BreadcrumbList for any sub-page (§10.1). `crumbs` are {name, path}. */
export function breadcrumbSchema(
  crumbs: { name: string; path: string }[],
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(locale, c.path),
    })),
  };
}

/** Article schema for a blog post (§3, §10.5). */
export function articleSchema(
  post: {
    title: string;
    description: string;
    date: string;
    author: string;
    path: string;
    cover?: string;
  },
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: inLanguage(locale),
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.domain}/d3-logo.png` },
    },
    mainEntityOfPage: absoluteUrl(locale, post.path),
    image: post.cover
      ? `${siteConfig.domain}${post.cover}`
      : `${siteConfig.domain}/og/default.png`,
  };
}
