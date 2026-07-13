import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { TermsContent } from "@/components/pages/TermsContent";

export const metadata: Metadata = {
  title: "Terms & Conditions | D3 Salon Solution",
  description:
    "Terms and Conditions governing the use of D3 Salon Solution services — D3 Salon Solution LLC, Raleigh, NC.",
  alternates: {
    canonical: "https://d3salonsolution.com/terms",
    languages: {
      en: "/terms",
      vi: "/vi/terms",
      "x-default": "/terms",
    },
  },
};

export default function Page() {
  return (
    <SiteShell locale="en">
      <TermsContent locale="en" />
    </SiteShell>
  );
}
