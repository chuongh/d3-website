import Link from "next/link";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand, PhotoPlaceholder } from "@/components/Bits";
import { localePath, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { organizationSchema, breadcrumbSchema } from "@/lib/schema";

export function AboutPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.about;
  const p = (path: string) => localePath(locale, path);

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(locale),
          breadcrumbSchema(
            [
              { name: dict.breadcrumb.home, path: "/" },
              { name: t.kicker, path: "/about" },
            ],
            locale,
          ),
        ]}
      />

      <div className="sub-hero">
        <div className="container">
          <div className="crumb"><Link href={p("/")}>{dict.breadcrumb.home}</Link> / <span>{t.kicker}</span></div>
          <h1>{t.h1}</h1>
          <p className="lead">{t.lead}</p>
        </div>
      </div>

      <section>
        <div className="container story">
          <div>
            <span className="eyebrow">{t.storyEyebrow}</span>
            <h2>{t.storyH2}</h2>
            <p>{t.storyP1}</p>
            <p>{t.storyP2}</p>
            <div className="map-note">
              <Icon name="pin" />
              <span>{t.hqNote}</span>
            </div>
          </div>
          <div className="photo-grid" style={{ gridTemplateColumns: "1fr", gap: 16 }}>
            <PhotoPlaceholder label="D3 team — Raleigh showroom" />
            <PhotoPlaceholder label="Raleigh showroom / office" ratio="16 / 7" />
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="stats">
            {t.stats.map((s) => (
              <div className="stat sheen sheen-soft" key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head" style={{ marginBottom: 36 }}>
            <span className="eyebrow">{t.installsEyebrow}</span>
            <h2>{t.installsH2}</h2>
          </div>
          <div className="photo-grid">
            <PhotoPlaceholder label="Salon install — POS station" />
            <PhotoPlaceholder label="Kiosk in use at front desk" />
            <PhotoPlaceholder label="Technician using the app" />
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 24 }}>
        <div className="container">
          <CtaBand locale={locale} dict={dict} heading={t.cta.h2} text={t.cta.p} />
        </div>
      </section>
    </>
  );
}
