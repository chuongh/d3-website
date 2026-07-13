import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Faq } from "@/components/Faq";
import { CtaBand, HeroCtas } from "@/components/Bits";
import { localePath, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { images, type ImageAsset } from "@/lib/images";
import { breadcrumbSchema } from "@/lib/schema";

export type FeatureKey = "salonPos" | "onlineBooking" | "checkIn" | "payroll";

type CrossKey = "pos" | "booking" | "checkin" | "payroll";

const CONFIG: Record<
  FeatureKey,
  { slug: string; hero: ImageAsset; heroAlt: string; benefitImgs: ImageAsset[]; cross: { key: CrossKey; slug: string; icon: IconName }[] }
> = {
  salonPos: {
    slug: "/salon-pos",
    hero: images.heroDashboard,
    heroAlt: "D3 Salon POS dashboard on desktop and tablet",
    benefitImgs: [images.paymentsTerminal, images.heroDashboard, images.payrollSetup],
    cross: [
      { key: "checkin", slug: "/check-in", icon: "kiosk" },
      { key: "booking", slug: "/online-booking", icon: "cal" },
      { key: "payroll", slug: "/payroll", icon: "money" },
    ],
  },
  onlineBooking: {
    slug: "/online-booking",
    hero: images.onlineBooking,
    heroAlt: "D3 online booking page on a phone",
    benefitImgs: [images.onlineBooking, images.smsReminder, images.heroDashboard],
    cross: [
      { key: "pos", slug: "/salon-pos", icon: "pos" },
      { key: "checkin", slug: "/check-in", icon: "kiosk" },
      { key: "payroll", slug: "/payroll", icon: "money" },
    ],
  },
  checkIn: {
    slug: "/check-in",
    hero: images.checkinKiosk,
    heroAlt: "D3 Quick Check-in kiosk on an iPad",
    benefitImgs: [images.checkinClient, images.loyaltyPhone, images.smsReminder],
    cross: [
      { key: "pos", slug: "/salon-pos", icon: "pos" },
      { key: "booking", slug: "/online-booking", icon: "cal" },
      { key: "payroll", slug: "/payroll", icon: "money" },
    ],
  },
  payroll: {
    slug: "/payroll",
    hero: images.payrollSetup,
    heroAlt: "D3 payroll setup with W2 and 1099 options",
    benefitImgs: [images.payrollSetup, images.heroDashboard, images.paymentsTerminal],
    cross: [
      { key: "pos", slug: "/salon-pos", icon: "pos" },
      { key: "checkin", slug: "/check-in", icon: "kiosk" },
      { key: "booking", slug: "/online-booking", icon: "cal" },
    ],
  },
};

export function FeaturePage({ feature, locale }: { feature: FeatureKey; locale: Locale }) {
  const dict = getDictionary(locale);
  const page = dict.pages[feature];
  const cfg = CONFIG[feature];
  const p = (path: string) => localePath(locale, path);
  const x = dict.pages.crosslinks;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: dict.breadcrumb.home, path: "/" },
            { name: page.kicker, path: cfg.slug },
          ],
          locale,
        )}
      />

      {/* ---- Hero ---- */}
      <div className="sub-hero">
        <div className="container">
          <div className="crumb">
            <Link href={p("/")}>{dict.breadcrumb.home}</Link> / <span>{dict.breadcrumb.features}</span> / <span>{page.kicker}</span>
          </div>
          <div className="sub-grid">
            <div>
              <span className="eyebrow" style={{ color: "#C9C4FF" }}>{page.kicker}</span>
              <h1>{page.h1}</h1>
              <p className="lead">{page.lead}</p>
              <HeroCtas locale={locale} dict={dict} white />
            </div>
            <div className="hero-stage">
              <div className="halo" aria-hidden="true" />
              <div className="app-frame">
                <Image src={cfg.hero.src} width={cfg.hero.w} height={cfg.hero.h} alt={cfg.heroAlt} priority sizes="(max-width: 980px) 90vw, 460px" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Benefit rows ---- */}
      <section>
        <div className="container">
          {page.benefits.map((b, i) => (
            <div className="benefit" key={b.h3}>
              <div className="feat-copy">
                <span className="eyebrow">{b.eyebrow}</span>
                <h3>{b.h3}</h3>
                <p>{b.p}</p>
                <ul>
                  {b.items.map((li) => (
                    <li key={li}><Icon name="check" />{li}</li>
                  ))}
                </ul>
              </div>
              <div className="feat-media sheen sheen-soft">
                <Image
                  src={cfg.benefitImgs[i].src}
                  width={cfg.benefitImgs[i].w}
                  height={cfg.benefitImgs[i].h}
                  alt={`${page.kicker} — ${b.eyebrow}`}
                  loading="lazy"
                  sizes="(max-width: 980px) 90vw, 540px"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Mini FAQ ---- */}
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <Faq items={page.faq} locale={locale} eyebrow={dict.home.faq.eyebrow} heading={`${page.kicker} — FAQ`} />
        </div>
      </section>

      {/* ---- Cross-links ---- */}
      <section className="xlinks">
        <div className="container">
          <div className="section-head" style={{ marginBottom: 36 }}><h2>{x.heading}</h2></div>
          <div className="xgrid">
            {cfg.cross.map((c) => (
              <Link className="xcard" key={c.key} href={p(c.slug)}>
                <div className="bento-icon"><Icon name={c.icon} /></div>
                <div>
                  <h4>{x[c.key].name}</h4>
                  <small>{x[c.key].blurb}</small>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CTA band ---- */}
      <section style={{ paddingTop: 48 }}>
        <div className="container">
          <CtaBand locale={locale} dict={dict} heading={dict.pages.featureCta.h2} text={dict.pages.featureCta.p} />
        </div>
      </section>
    </>
  );
}
