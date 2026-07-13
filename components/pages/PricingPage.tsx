import Link from "next/link";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Faq } from "@/components/Faq";
import { localePath, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { breadcrumbSchema } from "@/lib/schema";

export function PricingPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.pricing;
  const p = (path: string) => localePath(locale, path);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: dict.breadcrumb.home, path: "/" },
            { name: t.kicker, path: "/pricing" },
          ],
          locale,
        )}
      />

      <div className="sub-hero">
        <div className="container">
          <div className="crumb"><Link href={p("/")}>{dict.breadcrumb.home}</Link> / <span>{t.kicker}</span></div>
          <h1>{t.h1}</h1>
          <p className="lead">{t.lead}</p>
        </div>
      </div>

      <section>
        <div className="container">
          <div className="pricing-grid">
            {/* Basic */}
            <div className="plan">
              <div className="plan-inner">
                <div className="plan-name">{t.plans.basic.name}</div>
                <p className="plan-blurb">{t.plans.basic.blurb}</p>
                <div className="price">{t.plans.basic.price}<small>{t.perMonth}</small></div>
                <ul>
                  {t.plans.basic.features.map((f) => (
                    <li key={f}><Icon name="check" />{f}</li>
                  ))}
                </ul>
                <Link className="btn btn-primary" href={p("/contact")}>{t.ctaBasic}</Link>
              </div>
            </div>

            {/* Premium */}
            <div className="plan featured">
              <span className="plan-badge">{t.mostPopular}</span>
              <div className="plan-inner">
                <div className="plan-name">{t.plans.premium.name}</div>
                <p className="plan-blurb">{t.plans.premium.blurb}</p>
                <div className="price">{t.plans.premium.price}<small>{t.perMonth}</small></div>
                <p className="everything">{t.plans.premium.everythingIn}</p>
                <ul>
                  {t.plans.premium.features.map((f) => (
                    <li key={f}><Icon name="check" />{f}</li>
                  ))}
                </ul>
                <Link className="btn btn-primary" href={p("/contact")}>{t.ctaPremium}</Link>
              </div>
            </div>
          </div>
          <p className="pricing-footnote">{t.footnote}</p>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <Faq items={t.faq.items} locale={locale} eyebrow={t.faq.eyebrow} heading={t.faq.h2} />
        </div>
      </section>
    </>
  );
}
