import Link from "next/link";
import type { ReactNode, SVGProps } from "react";
import { LegalToc } from "@/components/LegalToc";
import { siteConfig } from "@/site.config";
import { localePath, type Locale } from "@/lib/i18n";
import { termsCopy } from "@/components/pages/termsCopy";

const HERO_GRADIENT = "bg-[linear-gradient(135deg,#2B36B0,#4150E0_55%,#7D8BFF)]";
const BRAND_GRADIENT = "bg-[linear-gradient(135deg,#4858F8,#7D8BFF)]";
const { legal } = siteConfig;

/* ── Inline icons ── */
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
  info: (p: SVGProps<SVGSVGElement>) => (
    <svg {...svg(p)}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
  ),
  warn: (p: SVGProps<SVGSVGElement>) => (
    <svg {...svg(p)}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
  ),
  calendar: (p: SVGProps<SVGSVGElement>) => (
    <svg {...svg(p)}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
  ),
  pin: (p: SVGProps<SVGSVGElement>) => (
    <svg {...svg(p)}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
  ),
};

/* ── Reusable blocks ── */
function SectionHeading({ num, children }: { num: number; children: ReactNode }) {
  return (
    <div className="mb-3.5 flex items-center gap-[13px]">
      <span className={`inline-flex h-8 w-8 flex-none items-center justify-center rounded-[9px] font-display text-[13px] font-extrabold text-white shadow-[0_4px_12px_rgba(72,88,248,.3),inset_0_1px_0_rgba(255,255,255,.35)] ${BRAND_GRADIENT}`}>
        {num}
      </span>
      <h2 className="font-display text-[clamp(17px,2.1vw,21px)] font-bold text-ink">{children}</h2>
    </div>
  );
}

function HighlightBox({ icon: I, children }: { icon: (p: SVGProps<SVGSVGElement>) => JSX.Element; children: ReactNode }) {
  return (
    <div className="my-3.5 flex items-start gap-3 rounded-[11px] border border-border bg-tint px-[18px] py-4">
      <I className="mt-0.5 h-5 w-5 flex-none text-indigo" />
      <p className="text-[14.5px]">{children}</p>
    </div>
  );
}

function WarnBox({ children }: { children: ReactNode }) {
  return (
    <div className="my-3.5 flex items-start gap-3 rounded-[11px] border border-[#FDDFA0] bg-[#FFF8EC] px-[18px] py-4">
      <Icons.warn className="mt-0.5 h-5 w-5 flex-none text-[#D97706]" />
      <p className="text-[14px] text-[#7C4A00]">{children}</p>
    </div>
  );
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="my-3 grid list-none gap-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-2.5 text-[15px]">
          <span className="mt-2 h-[7px] w-[7px] flex-none rounded-full bg-indigo" aria-hidden="true" />
          {it}
        </li>
      ))}
    </ul>
  );
}

function DefItem({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="grid gap-3 rounded-[11px] border border-border bg-tint-2 px-4 py-[13px] text-[14px] min-[900px]:grid-cols-[140px_1fr]">
      <span className="font-display text-[13.5px] font-bold text-indigo">{term}</span>
      <span className="text-body">{children}</span>
    </div>
  );
}

const blockClass = "border-b border-border py-[30px] last:border-b-0";
const mutedNote = "mt-3 text-[14.5px] text-muted";

export function TermsContent({ locale }: { locale: Locale }) {
  const t = termsCopy[locale];
  const p = (path: string) => localePath(locale, path);
  const domainText = siteConfig.domain.replace("https://", "");
  const withEntity = (s: string) => s.replace("{entity}", legal.entity);

  const TOC = t.toc.map((label, i) => ({ id: `s${i + 1}`, label }));

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
              <Link href={p("/")} className="text-white/85 hover:text-white">{t.crumbHome}</Link>
              <span className="text-white/40">/</span>
              <span>{t.crumbCurrent}</span>
            </div>
            <h1 className="mb-3 font-display text-[clamp(30px,4.5vw,46px)] font-extrabold text-white">{t.h1}</h1>
            <p className="max-w-[520px] text-[17px] text-white/80">{withEntity(t.subtitle)}</p>
            <div className="mt-[18px] flex flex-wrap gap-5 max-[640px]:flex-col max-[640px]:gap-2.5">
              <span className="flex items-center gap-[7px] font-display text-[13.5px] font-semibold text-white/75">
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-[#7CF2B0]" />
                {t.lastUpdated} {siteConfig.termsUpdated}
              </span>
              <span className="flex items-center gap-[7px] font-display text-[13.5px] font-semibold text-white/75">
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-[#FFD66B]" />
                {legal.entity} · {siteConfig.address.locality}, {siteConfig.address.region}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="container">
        <div className="grid items-start gap-12 pb-24 pt-16 min-[900px]:grid-cols-[240px_1fr]">
          <LegalToc items={TOC} contactLabel={t.contactLabel} heading={t.onThisPage} />

          <article className="min-w-0">
            {/* Intro */}
            <div className={`${blockClass} pt-0`}>
              <p>{t.intro.p}</p>
              <HighlightBox icon={Icons.info}>
                {t.intro.hi.pre}
                <Link href={p("/privacy")} className="font-medium text-indigo hover:underline">{t.intro.hi.link}</Link>
                {t.intro.hi.post}
              </HighlightBox>
            </div>

            {/* 1 */}
            <section id="s1" className={blockClass}>
              <SectionHeading num={1}>{t.s1.h}</SectionHeading>
              <p>{t.s1.p}</p>
              <div className="mt-[18px] grid gap-2.5">
                <DefItem term={t.defsTerms.affiliate}>{t.s1.affiliate}</DefItem>
                <DefItem term={t.defsTerms.country}>{t.s1.country}</DefItem>
                <DefItem term={t.defsTerms.company}>{legal.entity}, {legal.fullAddress}{t.s1.companySuffix}</DefItem>
                <DefItem term={t.defsTerms.device}>{t.s1.device}</DefItem>
                <DefItem term={t.defsTerms.service}>
                  {t.s1.servicePre}
                  <a href={siteConfig.domain} className="text-indigo hover:underline">{domainText}</a>
                  {t.s1.servicePost}
                </DefItem>
                <DefItem term={t.defsTerms.terms}>{t.s1.terms}</DefItem>
                <DefItem term={t.defsTerms.social}>{t.s1.social}</DefItem>
                <DefItem term={t.defsTerms.you}>{t.s1.you}</DefItem>
              </div>
            </section>

            {/* 2 */}
            <section id="s2" className={blockClass}>
              <SectionHeading num={2}>{t.s2.h}</SectionHeading>
              <p>{withEntity(t.s2.p1)}</p>
              <p className="mt-3">
                {t.s2.p2.pre}
                <Link href={p("/privacy")} className="font-medium text-indigo hover:underline">{t.s2.p2.link}</Link>
                {t.s2.p2.post}
              </p>
            </section>

            {/* 3 */}
            <section id="s3" className={blockClass}>
              <SectionHeading num={3}>{t.s3.h}</SectionHeading>
              <p>{withEntity(t.s3.p)}</p>
              <WarnBox>{t.s3.warn}</WarnBox>
            </section>

            {/* 4 */}
            <section id="s4" className={blockClass}>
              <SectionHeading num={4}>{t.s4.h}</SectionHeading>
              <p>{t.s4.p1}</p>
              <p className="mt-3">{t.s4.p2}</p>
            </section>

            {/* 5 */}
            <section id="s5" className={blockClass}>
              <SectionHeading num={5}>{t.s5.h}</SectionHeading>
              <p>{t.s5.p.pre}<strong>{t.s5.p.b}</strong>{t.s5.p.post}</p>
              <WarnBox>{t.s5.warn}</WarnBox>
              <p className={mutedNote}>{t.s5.note}</p>
            </section>

            {/* 6 */}
            <section id="s6" className={blockClass}>
              <SectionHeading num={6}>{t.s6.h}</SectionHeading>
              <p>{t.s6.p.pre}<strong>{t.s6.p.b1}</strong>{t.s6.p.mid}<strong>{t.s6.p.b2}</strong>{t.s6.p.post}</p>
              <p className="mt-3">{t.s6.p2}</p>
              <p className={mutedNote}>{t.s6.note}</p>
            </section>

            {/* 7 */}
            <section id="s7" className={blockClass}>
              <SectionHeading num={7}>{t.s7.h}</SectionHeading>
              <p>{t.s7.p.pre}<strong>{t.s7.p.b}</strong>{t.s7.p.post}</p>
            </section>

            {/* 8 */}
            <section id="s8" className={blockClass}>
              <SectionHeading num={8}>{t.s8.h}</SectionHeading>
              <p>
                {t.s8.pre}
                <a href={siteConfig.hotlineTel} className="text-indigo hover:underline">{siteConfig.hotline}</a>
                {t.s8.mid}
                <Link href={p("/contact")} className="text-indigo hover:underline">{t.s8.contactText}</Link>
                {t.s8.post}
              </p>
            </section>

            {/* 9 */}
            <section id="s9" className={blockClass}>
              <SectionHeading num={9}>{t.s9.h}</SectionHeading>
              <p>{t.s9.p}</p>
            </section>

            {/* 10 */}
            <section id="s10" className={blockClass}>
              <SectionHeading num={10}>{t.s10.h}</SectionHeading>
              <p>{t.s10.p}</p>
              <Bullets items={t.s10.bullets} />
            </section>

            {/* 11 */}
            <section id="s11" className={blockClass}>
              <SectionHeading num={11}>{t.s11.h}</SectionHeading>
              <h3 className="mb-2 mt-[18px] font-display text-[16px] font-bold text-ink">{t.s11.sevH}</h3>
              <p>{t.s11.sevP}</p>
              <h3 className="mb-2 mt-[18px] font-display text-[16px] font-bold text-ink">{t.s11.waiveH}</h3>
              <p>{t.s11.waiveP}</p>
            </section>

            {/* 12 */}
            <section id="s12" className={blockClass}>
              <SectionHeading num={12}>{t.s12.h}</SectionHeading>
              <p>{t.s12.p.pre}<strong>{t.s12.p.b}</strong>{t.s12.p.post}</p>
            </section>

            {/* 13 */}
            <section id="s13" className={blockClass}>
              <SectionHeading num={13}>{t.s13.h}</SectionHeading>
              <p>{t.s13.p.pre}<strong>{t.s13.p.b}</strong>{t.s13.p.post}</p>
              <HighlightBox icon={Icons.calendar}>
                {t.s13.hi.pre}<strong>{t.s13.hi.b.replace("{date}", siteConfig.termsUpdated)}</strong>{t.s13.hi.post}
              </HighlightBox>
            </section>

            {/* 14 */}
            <section id="s14" className={blockClass}>
              <SectionHeading num={14}>{t.s14.h}</SectionHeading>
              <p>{t.s14.p}</p>
              <div className="mt-3 inline-flex items-start gap-[13px] rounded-[11px] border border-border bg-white px-5 py-4 shadow-[0_2px_8px_rgba(72,88,248,.07)]">
                <Icons.pin className="mt-0.5 h-5 w-5 flex-none text-indigo" />
                <address className="font-display text-[14.5px] font-semibold not-italic leading-[1.6] text-ink">
                  {legal.entity}
                  <br />
                  {legal.fullAddress}
                  <br />
                  <a href={siteConfig.hotlineTel} className="font-medium text-indigo hover:underline">{siteConfig.hotline}</a>
                  {" · "}
                  <Link href={p("/contact")} className="font-medium text-indigo hover:underline">{t.s14.contactText}</Link>
                </address>
              </div>
            </section>

            {/* CTA banner */}
            <div className={`relative mt-[60px] flex items-center justify-between gap-7 overflow-hidden rounded-[22px] px-10 py-11 text-white before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(118deg,rgba(255,255,255,.18),rgba(255,255,255,0)_38%)] max-[900px]:flex-col max-[900px]:px-6 max-[900px]:py-8 ${HERO_GRADIENT}`}>
              <div className="relative">
                <h2 className="mb-1.5 font-display text-[22px] font-extrabold text-white">{t.cta.h2}</h2>
                <p className="text-[15px] text-white/80">{t.cta.p}</p>
              </div>
              <div className="relative flex flex-none flex-wrap gap-3">
                <Link href={p("/#demo")} className="whitespace-nowrap rounded-xl bg-white px-6 py-[13px] font-display text-[15px] font-bold text-indigo shadow-[0_8px_24px_rgba(20,28,100,.3),inset_0_1.5px_0_#fff]">
                  {t.cta.bookDemo}
                </Link>
                <a href={siteConfig.hotlineTel} className="whitespace-nowrap rounded-xl border border-white/35 bg-white/[0.12] px-6 py-[13px] font-display text-[15px] font-bold text-white backdrop-blur-sm">
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
