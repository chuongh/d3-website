import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import Script from "next/script";
import { siteConfig } from "@/site.config";
import { ScrollReveal } from "@/components/ScrollReveal";
import "./globals.css";

// Self-hosted via next/font — no render-blocking external font requests (§4).
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

// On GitHub Pages the site lives under a project-site basePath; metadata icon
// URLs aren't auto-prefixed, so prepend it here. Empty on Vercel.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: "Nail Salon POS & Management Software | D3 Salon Solution",
    template: "%s",
  },
  description:
    "All-in-one nail salon POS, online booking, payroll and self check-in kiosk. Book a free demo or call (919) 655-3989.",
  applicationName: siteConfig.name,
  icons: {
    icon: [{ url: `${basePath}/d3-logo.png`, type: "image/png" }],
    apple: [{ url: `${basePath}/d3-logo.png` }],
  },
  // Carry over the existing google-site-verification token at cutover (§9).
  ...(siteConfig.gscVerification !== "TODO"
    ? { verification: { google: siteConfig.gscVerification } }
    : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ga = siteConfig.ga4Id;
  // suppressHydrationWarning: the inline script in <body> sets data-reveal-on on
  // <html> before hydration, which React would otherwise flag as a mismatch.
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Arm scroll-reveal before first paint so pre-hiding never flashes;
            skip under prefers-reduced-motion. The 3s `reveal-fallback` timer is a
            safety net: if the app bundle ever fails to reveal, content still shows. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.setAttribute('data-reveal-on','');setTimeout(function(){d.setAttribute('data-reveal-fallback','');},3000);}catch(e){}})();",
          }}
        />
        <ScrollReveal />
        {children}
        {ga && ga !== "TODO" && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
