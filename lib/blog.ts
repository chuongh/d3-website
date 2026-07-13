import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Locale } from "@/lib/i18n";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  /** Stable translation key shared by the EN and VI versions (for hreflang pairing). */
  key: string;
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  tag: string; // primary tag, shown on the cover
  cover?: string;
  minutes: number;
};

export type Post = { meta: PostMeta; content: string };

function localeDir(locale: Locale) {
  return path.join(BLOG_DIR, locale);
}

function parse(locale: Locale, file: string): Post {
  const slug = file.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(localeDir(locale), file), "utf8");
  const { data, content } = matter(raw);
  const tags: string[] = Array.isArray(data.tags) ? data.tags.map(String) : [];
  return {
    meta: {
      key: String(data.key ?? slug),
      slug,
      locale,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      date: String(data.date ?? ""),
      author: String(data.author ?? "D3 Salon Solution"),
      tags,
      tag: String(data.tag ?? tags[0] ?? ""),
      cover: data.cover ? String(data.cover) : undefined,
      minutes: Math.max(1, Math.round(readingTime(content).minutes)),
    },
    content,
  };
}

export function getAllPosts(locale: Locale): Post[] {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    // Ignore dotfiles — notably macOS AppleDouble `._*.mdx` sidecars created on
    // exFAT/non-HFS drives, which are not real posts and fail MDX parsing.
    .filter((f) => !f.startsWith(".") && /\.mdx?$/.test(f))
    .map((f) => parse(locale, f))
    .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
}

export function getPost(locale: Locale, slug: string): Post | null {
  for (const ext of [".mdx", ".md"]) {
    const file = path.join(localeDir(locale), slug + ext);
    if (fs.existsSync(file)) return parse(locale, slug + ext);
  }
  return null;
}

export function getSlugs(locale: Locale): string[] {
  return getAllPosts(locale).map((p) => p.meta.slug);
}

/** Find the counterpart slug in the other locale by shared translation key (§11.4). */
export function getAltSlug(key: string, otherLocale: Locale): string | null {
  const match = getAllPosts(otherLocale).find((p) => p.meta.key === key);
  return match ? match.meta.slug : null;
}
