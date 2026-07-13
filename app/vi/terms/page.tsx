import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { TermsContent } from "@/components/pages/TermsContent";

export const metadata: Metadata = {
  title: "Điều Khoản & Điều Kiện | D3 Salon Solution",
  description:
    "Điều Khoản và Điều Kiện về việc sử dụng dịch vụ D3 Salon Solution — D3 Salon Solution LLC, Raleigh, NC.",
  alternates: {
    canonical: "https://d3salonsolution.com/vi/terms",
    languages: {
      en: "/terms",
      vi: "/vi/terms",
      "x-default": "/terms",
    },
  },
};

export default function Page() {
  return (
    <SiteShell locale="vi">
      <TermsContent locale="vi" />
    </SiteShell>
  );
}
