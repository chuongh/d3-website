import Link from "next/link";
import type { ReactNode, SVGProps } from "react";
import { LegalToc } from "@/components/LegalToc";
import { siteConfig } from "@/site.config";

const HERO_GRADIENT = "bg-[linear-gradient(135deg,#2B36B0,#4150E0_55%,#7D8BFF)]";
const BRAND_GRADIENT = "bg-[linear-gradient(135deg,#4858F8,#7D8BFF)]";

const TOC = [
  { id: "s1", label: "1. Information We Collect" },
  { id: "s2", label: "2. Use of Data" },
  { id: "s3", label: "3. Transfer of Data" },
  { id: "s4", label: "4. Disclosure of Data" },
  { id: "s5", label: "5. Security of Data" },
  { id: "s6", label: "6. Service Providers" },
  { id: "s7", label: "7. Analytics" },
  { id: "s8", label: "8. Google Analytics" },
  { id: "s9", label: "9. Children's Privacy" },
  { id: "s10", label: "10. Policy Changes" },
];

/* ── Inline icons (match the source SVGs exactly) ── */
const svg = (p: SVGProps<SVGSVGElement>) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...p,
});
const Icons = {
  user: (p: SVGProps<SVGSVGElement>) => (
    <svg {...svg(p)}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
  ),
  pos: (p: SVGProps<SVGSVGElement>) => (
    <svg {...svg(p)}><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
  ),
  shield: (p: SVGProps<SVGSVGElement>) => (
    <svg {...svg(p)}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
  ),
  mail: (p: SVGProps<SVGSVGElement>) => (
    <svg {...svg(p)}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
  ),
  info: (p: SVGProps<SVGSVGElement>) => (
    <svg {...svg(p)}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
  ),
  globe: (p: SVGProps<SVGSVGElement>) => (
    <svg {...svg(p)}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
  ),
  calendar: (p: SVGProps<SVGSVGElement>) => (
    <svg {...svg(p)}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
  ),
};

/* ── Reusable blocks ── */
function SectionHeading({ num, children }: { num: number; children: ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-[13px]">
      <span
        className={`inline-flex h-8 w-8 flex-none items-center justify-center rounded-[9px] font-display text-[13px] font-extrabold text-white shadow-[0_4px_12px_rgba(72,88,248,.3),inset_0_1px_0_rgba(255,255,255,.35)] ${BRAND_GRADIENT}`}
      >
        {num}
      </span>
      <h2 className="font-display text-[clamp(18px,2.2vw,22px)] font-bold text-ink">{children}</h2>
    </div>
  );
}

function HighlightBox({ icon: I, children }: { icon: (p: SVGProps<SVGSVGElement>) => JSX.Element; children: ReactNode }) {
  return (
    <div className="my-4 flex items-start gap-[13px] rounded-[11px] border border-border bg-tint px-5 py-[18px]">
      <I className="mt-0.5 h-5 w-5 flex-none text-indigo" />
      <p className="text-[14.5px]">{children}</p>
    </div>
  );
}

function DataType({ icon: I, title, desc }: { icon: (p: SVGProps<SVGSVGElement>) => JSX.Element; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-[11px] rounded-[11px] border border-border bg-tint-2 px-4 py-3.5">
      <span className={`grid h-[34px] w-[34px] flex-none place-items-center rounded-[9px] text-white shadow-[0_4px_10px_rgba(72,88,248,.28),inset_0_1px_0_rgba(255,255,255,.3)] ${BRAND_GRADIENT}`}>
        <I className="h-[17px] w-[17px]" />
      </span>
      <span className="block">
        <strong className="mb-0.5 block font-display text-[13.5px] font-bold text-ink">{title}</strong>
        <span className="text-[12.5px] text-muted">{desc}</span>
      </span>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="my-3.5 grid list-none gap-2.5">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-2.5 text-[15px]">
          <span className="mt-2 h-[7px] w-[7px] flex-none rounded-full bg-indigo" aria-hidden="true" />
          {it}
        </li>
      ))}
    </ul>
  );
}

const blockClass = "border-b border-border py-8 last:border-b-0";

export function PrivacyContent() {
  return (
    <>
      {/* ── Hero ── */}
      <div className={`relative overflow-hidden pb-[60px] pt-[140px] text-white ${HERO_GRADIENT}`}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
            WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 0,#000 30%,transparent 80%)",
            maskImage: "radial-gradient(ellipse 90% 90% at 50% 0,#000 30%,transparent 80%)",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-[100px] -top-[160px] h-[480px] w-[480px] rounded-full blur-[36px]"
          style={{ background: "radial-gradient(circle,rgba(142,155,255,.35),transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="container relative z-[2]">
          <div className="max-w-[720px]">
            <div className="mb-[18px] flex items-center gap-2 font-display text-[13px] font-semibold text-white/65">
              <Link href="/" className="text-white/85 hover:text-white">Home</Link>
              <span className="text-white/40">/</span>
              <span>Privacy Policy</span>
            </div>
            <h1 className="mb-3 font-display text-[clamp(30px,4.5vw,46px)] font-extrabold text-white">Privacy Policy</h1>
            <p className="max-w-[520px] text-[17px] text-white/80">
              How {siteConfig.name} collects, uses, and protects your personal data.
            </p>
            <div className="mt-[18px] flex flex-wrap gap-5 max-[640px]:flex-col max-[640px]:gap-2.5">
              <span className="flex items-center gap-[7px] font-display text-[13.5px] font-semibold text-white/75">
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-[#7CF2B0]" />
                Last updated: {siteConfig.privacyUpdated}
              </span>
              <span className="flex items-center gap-[7px] font-display text-[13.5px] font-semibold text-white/75">
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-[#FFD66B]" />
                Applies to: {siteConfig.domain.replace("https://", "")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="container">
        <div className="grid items-start gap-12 pb-24 pt-16 min-[900px]:grid-cols-[240px_1fr]">
          <LegalToc items={TOC} contactLabel="Questions about this policy?" />

          <article className="min-w-0">
            {/* Intro */}
            <div className={`${blockClass} pt-0`}>
              <p>
                {siteConfig.name} ("us", "we", or "our") operates the{" "}
                <a href={siteConfig.domain} className="font-medium text-indigo hover:underline">
                  {siteConfig.domain.replace("https://", "")}
                </a>{" "}
                website (the "Service"). This page explains how we collect, use, and disclose information when you use
                our Service, and the choices you have regarding your data.
              </p>
              <div className="mt-5">
                <HighlightBox icon={Icons.info}>
                  By using the Service, you agree to the collection and use of information in accordance with this
                  policy. Terms used here have the same meanings as in our{" "}
                  <Link href="/terms" className="font-medium text-indigo hover:underline">Terms and Conditions</Link>.
                </HighlightBox>
              </div>
            </div>

            {/* 1 */}
            <section id="s1" className={blockClass}>
              <SectionHeading num={1}>Information Collection and Use</SectionHeading>
              <p>We collect several types of information to provide and improve our Service to you.</p>
              <div className="my-[18px] grid gap-3 sm:grid-cols-2">
                <DataType icon={Icons.user} title="Personal Data" desc="Name, email, phone, address — provided by you when using the Service" />
                <DataType icon={Icons.pos} title="Usage Data" desc="IP address, browser type, pages visited, time on site, device identifiers" />
                <DataType icon={Icons.shield} title="Cookies" desc="Session, preference, and security cookies stored on your device" />
                <DataType icon={Icons.mail} title="Contact Info" desc="Email, first & last name, phone number, address, city, state, ZIP" />
              </div>
              <p className="mt-2">
                <strong>Tracking &amp; Cookies.</strong> We use cookies and similar tracking technologies (beacons,
                tags, scripts) to track activity and improve our Service. You may instruct your browser to refuse all
                cookies, though some features may not function properly without them.
              </p>
              <div className="my-4 grid gap-3 sm:grid-cols-3">
                {[
                  ["Session Cookies", "Operate the Service during your visit"],
                  ["Preference Cookies", "Remember your preferences & settings"],
                  ["Security Cookies", "Used for security and fraud prevention"],
                ].map(([t, d]) => (
                  <div
                    key={t}
                    className="relative overflow-hidden rounded-[11px] border border-border bg-white px-4 py-3.5 shadow-[0_2px_8px_rgba(72,88,248,.07)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(118deg,rgba(255,255,255,.7),rgba(255,255,255,0)_40%)]"
                  >
                    <strong className="mb-1 block font-display text-[13px] font-bold text-ink">{t}</strong>
                    <span className="text-[12px] text-muted">{d}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 2 */}
            <section id="s2" className={blockClass}>
              <SectionHeading num={2}>Use of Data</SectionHeading>
              <p>{siteConfig.name} uses the collected data for the following purposes:</p>
              <Bullets
                items={[
                  "To provide and maintain the Service",
                  "To notify you about changes to our Service",
                  "To allow participation in interactive features at your option",
                  "To provide customer care and support",
                  "To gather analysis and improve the Service",
                  "To monitor usage patterns and detect technical issues",
                ]}
              />
            </section>

            {/* 3 */}
            <section id="s3" className={blockClass}>
              <SectionHeading num={3}>Transfer of Data</SectionHeading>
              <p>
                Your information, including Personal Data, may be transferred to and maintained on computers located
                outside your state, province, or country where data protection laws may differ from those in your
                jurisdiction.
              </p>
              <HighlightBox icon={Icons.globe}>
                If you are located outside the United States and choose to provide information to us, please note that we
                transfer your data to the United States and process it there. Your consent to this Privacy Policy
                represents your agreement to that transfer.
              </HighlightBox>
              <p>
                D3 will take all reasonably necessary steps to ensure your data is treated securely and that no transfer
                of your Personal Data will take place to an organization or country unless adequate controls are in
                place.
              </p>
            </section>

            {/* 4 */}
            <section id="s4" className={blockClass}>
              <SectionHeading num={4}>Disclosure of Data</SectionHeading>
              <p>D3 may disclose your Personal Data in good faith where such action is necessary to:</p>
              <Bullets
                items={[
                  "Comply with a legal obligation",
                  "Protect and defend the rights or property of D3",
                  "Prevent or investigate possible wrongdoing in connection with the Service",
                  "Protect the personal safety of users or the public",
                  "Protect against legal liability",
                ]}
              />
            </section>

            {/* 5 */}
            <section id="s5" className={blockClass}>
              <SectionHeading num={5}>Security of Data</SectionHeading>
              <p>The security of your data is important to us. We strive to use commercially acceptable means to protect your Personal Data.</p>
              <HighlightBox icon={Icons.shield}>
                No method of transmission over the Internet or electronic storage is 100% secure. While we take
                reasonable precautions, we cannot guarantee absolute security of your data.
              </HighlightBox>
            </section>

            {/* 6 */}
            <section id="s6" className={blockClass}>
              <SectionHeading num={6}>Service Providers</SectionHeading>
              <p>
                We may employ third-party companies and individuals to facilitate our Service ("Service Providers"),
                provide the Service on our behalf, perform Service-related services, or assist in analyzing how our
                Service is used.
              </p>
              <p className="mt-3">
                These third parties have access to your Personal Data only to perform these tasks on our behalf and are
                obligated not to disclose or use it for any other purpose.
              </p>
            </section>

            {/* 7 */}
            <section id="s7" className={blockClass}>
              <SectionHeading num={7}>Analytics</SectionHeading>
              <p>We may use third-party Service Providers to monitor and analyze the use of our Service.</p>
            </section>

            {/* 8 */}
            <section id="s8" className={blockClass}>
              <SectionHeading num={8}>Google Analytics</SectionHeading>
              <p>
                Google Analytics is a web analytics service offered by Google that tracks and reports website traffic.
                Google uses the data collected to track and monitor use of our Service. This data is shared with other
                Google services.
              </p>
              <div className="my-3.5 rounded-[11px] border border-border bg-tint-2 px-[18px] py-4 text-[14px]">
                <strong>Opt out of Google Analytics:</strong> You can prevent your activity from being available to
                Google Analytics by installing the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo hover:underline"
                >
                  Google Analytics opt-out browser add-on
                </a>
                . For more information, visit{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo hover:underline"
                >
                  Google Privacy &amp; Terms
                </a>
                .
              </div>
            </section>

            {/* 9 */}
            <section id="s9" className={blockClass}>
              <SectionHeading num={9}>Children's Privacy</SectionHeading>
              <p>
                Our Service does not address anyone under the age of 18 ("Children"). We do not knowingly collect
                personally identifiable information from anyone under 18.
              </p>
              <p className="mt-3">
                If you are a parent or guardian and believe your child has provided us with Personal Data, please
                contact us at{" "}
                <a href={siteConfig.hotlineTel} className="text-indigo hover:underline">{siteConfig.hotline}</a>. If we
                discover we have collected Personal Data from a child without verified parental consent, we will remove
                that information promptly.
              </p>
            </section>

            {/* 10 */}
            <section id="s10" className={blockClass}>
              <SectionHeading num={10}>Changes to This Privacy Policy</SectionHeading>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page, and where appropriate, via email or a prominent notice on our Service prior
                to the change becoming effective.
              </p>
              <HighlightBox icon={Icons.calendar}>
                You are advised to review this Privacy Policy periodically. Changes are effective when posted on this
                page. This policy was last updated on <strong>{siteConfig.privacyUpdated}</strong>.
              </HighlightBox>
            </section>

            {/* CTA banner */}
            <div
              className={`relative mt-16 flex items-center justify-between gap-7 overflow-hidden rounded-[22px] px-10 py-11 text-white before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(118deg,rgba(255,255,255,.18),rgba(255,255,255,0)_38%)] max-[900px]:flex-col max-[900px]:px-6 max-[900px]:py-8 ${HERO_GRADIENT}`}
            >
              <div className="relative">
                <h2 className="mb-2 font-display text-[22px] font-extrabold text-white">Questions about your data?</h2>
                <p className="text-[15px] text-white/80">Our team is happy to walk you through how D3 handles your information.</p>
              </div>
              <div className="relative flex flex-none flex-wrap gap-3">
                <Link
                  href="/#demo"
                  className="whitespace-nowrap rounded-xl bg-white px-6 py-[13px] font-display text-[15px] font-bold text-indigo shadow-[0_8px_24px_rgba(20,28,100,.3),inset_0_1.5px_0_#fff]"
                >
                  Book a Demo
                </Link>
                <a
                  href={siteConfig.hotlineTel}
                  className="whitespace-nowrap rounded-xl border border-white/35 bg-white/[0.12] px-6 py-[13px] font-display text-[15px] font-bold text-white backdrop-blur-sm"
                >
                  {siteConfig.hotline}
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
