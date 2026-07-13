import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { ContactPage } from "@/components/pages/ContactPage";
import { buildMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/dictionaries";

const locale = "en" as const;
const dict = getDictionary(locale);

export const metadata: Metadata = buildMetadata({
  locale,
  path: "/contact",
  title: dict.contact.meta.title,
  description: dict.contact.meta.description,
});

export default function Page() {
  return (
    <SiteShell locale={locale}>
      <ContactPage locale={locale} />
    </SiteShell>
  );
}
