import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { DemoForm } from "@/components/DemoForm";
import { Faq } from "@/components/Faq";
import { HeroCtas } from "@/components/Bits";
import { siteConfig } from "@/site.config";
import { localePath, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { images } from "@/lib/images";
import { organizationSchema, softwareApplicationSchema } from "@/lib/schema";

const ECOSYSTEM: { key: keyof Dict["home"]["ecosystem"]["cards"]; icon: IconName; feature?: boolean }[] = [
  { key: "pos", icon: "pos", feature: true },
  { key: "booking", icon: "cal" },
  { key: "owner", icon: "chart" },
  { key: "tech", icon: "user" },
  { key: "kiosk", icon: "kiosk" },
  { key: "portal", icon: "money" },
];

type Dict = ReturnType<typeof getDictionary>;

export function HomePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.home;
  const p = (path: string) => localePath(locale, path);

  const teasers = [
    { ...t.features.rows.booking, img: images.onlineBooking, href: p("/online-booking"), alt: "D3 online appointment booking on a phone" },
    { ...t.features.rows.payroll, img: images.payrollSetup, href: p("/payroll"), alt: "D3 payroll setup with W2 and 1099 options" },
    { ...t.features.rows.checkin, img: images.checkinClient, href: p("/check-in"), alt: "D3 Quick Check-in kiosk screen" },
    { ...t.features.rows.payments, img: images.paymentsTerminal, href: p("/salon-pos"), alt: "Payment terminal linked to the D3 POS" },
  ];

  return (
    <>
      <JsonLd data={[organizationSchema(locale), softwareApplicationSchema(locale)]} />

      {/* ---- Hero ---- */}
      <div className="hero">
        <div className="container hero-grid">
          <div>
            <span className="badge-pill"><span className="dot" />{t.hero.badge}</span>
            <h1>{t.hero.h1Lead} <em>{t.hero.h1Emphasis}</em></h1>
            <p className="lead">{t.hero.lead}</p>
            <HeroCtas locale={locale} dict={dict} white />
            <div className="hero-meta">
              <span><Icon name="check" />{dict.common.freeSetup}</span>
              <span><Icon name="check" />{dict.common.noContract}</span>
              <span><Icon name="check" />{dict.common.usSupport}</span>
            </div>
          </div>
          <div className="hero-stage">
            <div className="halo" aria-hidden="true" />
            <div className="app-frame">
              <Image
                src={images.heroDashboard.src}
                width={images.heroDashboard.w}
                height={images.heroDashboard.h}
                alt="D3 Salon POS register screen with technician list, live ticket and turn tracking"
                priority
                sizes="(max-width: 980px) 90vw, 520px"
              />
            </div>
            <div className="float-card one">
              <Icon name="kiosk" />
              <div>New check-in<small>Lux Nail Bar · just now</small></div>
            </div>
            <div className="float-card two">
              <Icon name="money" />
              <div>Payroll ready<small>Daily snapshot · end of day</small></div>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Social proof ---- */}
      <div className="proof">
        <div className="container">
          <p>{t.proof.heading}</p>
          <div className="proof-logos">
            {siteConfig.proofSalons.map((s) => (
              <span key={s}>{s.toUpperCase()}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Ecosystem bento ---- */}
      <section>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{t.ecosystem.eyebrow}</span>
            <h2>{t.ecosystem.h2}</h2>
            <p>{t.ecosystem.lead}</p>
          </div>
          <div className="bento">
            {ECOSYSTEM.map(({ key, icon, feature }) => {
              const card = t.ecosystem.cards[key];
              return (
                <div key={key} className={`bento-card${feature ? " feature sheen sheen-soft" : ""}`}>
                  <div className="bento-icon"><Icon name={icon} /></div>
                  <h3>{card.name}</h3>
                  <p>{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- Feature teasers ---- */}
      <section className="features">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{t.features.eyebrow}</span>
            <h2>{t.features.h2}</h2>
          </div>
          {teasers.map((row) => (
            <div className="feat-row" key={row.href}>
              <div className="feat-copy">
                <span className="eyebrow">{row.eyebrow}</span>
                <h3>{row.h3}</h3>
                <p>{row.p}</p>
                <Link className="learn" href={row.href}>
                  {row.link} <Icon name="arrow" style={{ width: 17, height: 17 }} />
                </Link>
              </div>
              <div className="feat-media sheen sheen-soft">
                <Image src={row.img.src} width={row.img.w} height={row.img.h} alt={row.alt} loading="lazy" sizes="(max-width: 980px) 90vw, 540px" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Personas ---- */}
      <section className="personas">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{t.personas.eyebrow}</span>
            <h2>{t.personas.h2}</h2>
          </div>
          <div className="grid">
            {([
              { icon: "chart" as IconName, data: t.personas.owners },
              { icon: "user" as IconName, data: t.personas.techs },
              { icon: "heart" as IconName, data: t.personas.clients },
            ]).map(({ icon, data }) => (
              <div className="persona" key={data.title}>
                <div className="persona-icon"><Icon name={icon} /></div>
                <h3>{data.title}</h3>
                <ul>{data.items.map((li) => <li key={li}>{li}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Demo form ---- */}
      <section className="demo" id="demo">
        <div className="container demo-grid">
          <div className="demo-copy">
            <span className="eyebrow">{dict.demo.eyebrow}</span>
            <h2>{dict.demo.h2}</h2>
            <p>{dict.demo.p}</p>
            <div className="demo-phone">
              <Icon name="phone" />
              <div>
                <a href={siteConfig.hotlineTel}>{siteConfig.hotline}</a>
                <small>{dict.demo.phoneSub}</small>
              </div>
            </div>
          </div>
          <DemoForm dict={dict} />
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section>
        <div className="container">
          <Faq items={t.faq.items} locale={locale} eyebrow={t.faq.eyebrow} heading={t.faq.h2} />
        </div>
      </section>
    </>
  );
}
