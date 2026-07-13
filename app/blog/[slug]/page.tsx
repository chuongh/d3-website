import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { BlogPost } from "@/components/pages/BlogPost";
import { siteConfig } from "@/site.config";
import { localePath } from "@/lib/i18n";
import { getPost, getSlugs, getAltSlug } from "@/lib/blog";

const locale = "en" as const;

export function generateStaticParams() {
  return getSlugs(locale).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(locale, params.slug);
  if (!post) return {};
  const m = post.meta;
  const enUrl = `${siteConfig.domain}${localePath("en", `/blog/${m.slug}`)}`;
  const viSlug = getAltSlug(m.key, "vi");
  const languages: Record<string, string> = {
    en: localePath("en", `/blog/${m.slug}`),
    "x-default": localePath("en", `/blog/${m.slug}`),
  };
  if (viSlug) languages.vi = localePath("vi", `/blog/${viSlug}`);

  return {
    title: m.title.length > 60 ? `${m.title.slice(0, 57)}…` : m.title,
    description: m.description,
    alternates: { canonical: localePath("en", `/blog/${m.slug}`), languages },
    openGraph: {
      type: "article",
      url: enUrl,
      title: m.title,
      description: m.description,
      publishedTime: m.date,
      locale: "en_US",
      images: [{ url: "/og/default.png", width: 1200, height: 630, alt: m.title }],
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description, images: ["/og/default.png"] },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = getPost(locale, params.slug);
  if (!post) notFound();
  const viSlug = getAltSlug(post.meta.key, "vi");
  const switcherHref = viSlug ? localePath("vi", `/blog/${viSlug}`) : localePath("vi", "/blog");
  return (
    <SiteShell locale={locale} switcherHref={switcherHref}>
      <BlogPost locale={locale} post={post} />
    </SiteShell>
  );
}
