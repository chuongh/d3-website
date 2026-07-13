import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { PrivacyContent } from "@/components/pages/PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | D3 Salon Solution",
  description:
    "How D3 Salon Solution collects, uses, and protects your personal data when you use our services.",
  alternates: { canonical: "https://d3salonsolution.com/privacy" },
};

export default function Page() {
  return (
    <SiteShell locale="en">
      <PrivacyContent />
    </SiteShell>
  );
}
