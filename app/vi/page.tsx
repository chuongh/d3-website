import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { HomePage } from "@/components/pages/HomePage";
import { buildMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/dictionaries";

const locale = "vi" as const;
const dict = getDictionary(locale);

export const metadata: Metadata = buildMetadata({
  locale,
  path: "/",
  title: dict.home.meta.title,
  description: dict.home.meta.description,
});

export default function Page() {
  return (
    <SiteShell locale={locale}>
      <HomePage locale={locale} />
    </SiteShell>
  );
}
