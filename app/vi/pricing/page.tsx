import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { PricingPage } from "@/components/pages/PricingPage";
import { buildMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/dictionaries";

const locale = "vi" as const;
const dict = getDictionary(locale);

export const metadata: Metadata = buildMetadata({
  locale,
  path: "/pricing",
  title: dict.pricing.meta.title,
  description: dict.pricing.meta.description,
});

export default function Page() {
  return (
    <SiteShell locale={locale}>
      <PricingPage locale={locale} />
    </SiteShell>
  );
}
