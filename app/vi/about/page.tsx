import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { AboutPage } from "@/components/pages/AboutPage";
import { buildMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/dictionaries";

const locale = "vi" as const;
const dict = getDictionary(locale);

export const metadata: Metadata = buildMetadata({
  locale,
  path: "/about",
  title: dict.about.meta.title,
  description: dict.about.meta.description,
});

export default function Page() {
  return (
    <SiteShell locale={locale}>
      <AboutPage locale={locale} />
    </SiteShell>
  );
}
