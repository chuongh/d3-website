import Link from "next/link";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { DemoForm } from "@/components/DemoForm";
import { siteConfig } from "@/site.config";
import { localePath, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { breadcrumbSchema } from "@/lib/schema";

export function ContactPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.contact;
  const p = (path: string) => localePath(locale, path);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: dict.breadcrumb.home, path: "/" },
            { name: t.kicker, path: "/contact" },
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

      <section className="demo">
        <div className="container contact-grid">
          <div>
            <h2 style={{ fontSize: 24, marginBottom: 18 }}>{t.infoHeading}</h2>
            <div className="info-list">
              <div className="info-item">
                <div className="bento-icon"><Icon name="phone" /></div>
                <div>
                  <h4>{t.callLabel}</h4>
                  <a href={siteConfig.hotlineTel}>{siteConfig.hotline}</a>
                </div>
              </div>
              <div className="info-item">
                <div className="bento-icon"><Icon name="mail" /></div>
                <div>
                  <h4>{t.emailLabel}</h4>
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                </div>
              </div>
              <div className="info-item">
                <div className="bento-icon"><Icon name="clock" /></div>
                <div>
                  <h4>{t.hoursLabel}</h4>
                  <span>{dict.demo.phoneSub}</span>
                </div>
              </div>
              <div className="info-item">
                <div className="bento-icon"><Icon name="pin" /></div>
                <div>
                  <h4>{t.locationLabel}</h4>
                  <span>{siteConfig.address.locality}, {siteConfig.address.region}</span>
                </div>
              </div>
            </div>
          </div>
          <DemoForm dict={dict} />
        </div>
      </section>
    </>
  );
}
