import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { FeaturePage } from "@/components/pages/FeaturePage";
import { buildMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/dictionaries";

const locale = "en" as const;
const dict = getDictionary(locale);

export const metadata: Metadata = buildMetadata({
  locale,
  path: "/salon-pos",
  title: dict.pages.salonPos.meta.title,
  description: dict.pages.salonPos.meta.description,
});

export default function Page() {
  return (
    <SiteShell locale={locale}>
      <FeaturePage feature="salonPos" locale={locale} />
    </SiteShell>
  );
}
