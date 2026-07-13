import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { BlogIndex } from "@/components/pages/BlogIndex";
import { buildMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/dictionaries";

const locale = "en" as const;
const dict = getDictionary(locale);

export const metadata: Metadata = buildMetadata({
  locale,
  path: "/blog",
  title: dict.blog.meta.title,
  description: dict.blog.meta.description,
});

export default function Page() {
  return (
    <SiteShell locale={locale}>
      <BlogIndex locale={locale} />
    </SiteShell>
  );
}
