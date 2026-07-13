import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { BlogPost } from "@/components/pages/BlogPost";
import { siteConfig } from "@/site.config";
import { localePath } from "@/lib/i18n";
import { getPost, getSlugs, getAltSlug } from "@/lib/blog";

const locale = "vi" as const;

export function generateStaticParams() {
  return getSlugs(locale).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(locale, params.slug);
  if (!post) return {};
  const m = post.meta;
  const viUrl = `${siteConfig.domain}${localePath("vi", `/blog/${m.slug}`)}`;
  const enSlug = getAltSlug(m.key, "en");
  const languages: Record<string, string> = {
    vi: localePath("vi", `/blog/${m.slug}`),
  };
  if (enSlug) {
    languages.en = localePath("en", `/blog/${enSlug}`);
    languages["x-default"] = localePath("en", `/blog/${enSlug}`);
  }

  return {
    title: m.title.length > 60 ? `${m.title.slice(0, 57)}…` : m.title,
    description: m.description,
    alternates: { canonical: localePath("vi", `/blog/${m.slug}`), languages },
    openGraph: {
      type: "article",
      url: viUrl,
      title: m.title,
      description: m.description,
      publishedTime: m.date,
      locale: "vi_VN",
      images: [{ url: "/og/default.png", width: 1200, height: 630, alt: m.title }],
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description, images: ["/og/default.png"] },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = getPost(locale, params.slug);
  if (!post) notFound();
  const enSlug = getAltSlug(post.meta.key, "en");
  const switcherHref = enSlug ? localePath("en", `/blog/${enSlug}`) : localePath("en", "/blog");
  return (
    <SiteShell locale={locale} switcherHref={switcherHref}>
      <BlogPost locale={locale} post={post} />
    </SiteShell>
  );
}
