import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { LegalPage } from "@/components/pages/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/dictionaries";

const locale = "vi" as const;
const dict = getDictionary(locale);

export const metadata: Metadata = buildMetadata({
  locale,
  path: "/privacy",
  title: dict.legal.privacy.meta.title,
  description: dict.legal.privacy.meta.description,
});

export default function Page() {
  return (
    <SiteShell locale={locale}>
      <LegalPage locale={locale} kind="privacy" />
    </SiteShell>
  );
}
