import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";
import type { Locale } from "@/lib/i18n";

/**
 * Accordion FAQ rendered as semantic <details> (present in initial HTML for SEO)
 * plus paired FAQPage JSON-LD (§2.10, §3).
 */
export function Faq({
  items,
  locale,
  eyebrow,
  heading,
}: {
  items: { q: string; a: string }[];
  locale: Locale;
  eyebrow?: string;
  heading: string;
}) {
  return (
    <>
      <div className="section-head" style={{ marginBottom: 36 }}>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{heading}</h2>
      </div>
      <div className="faq-list">
        {items.map((it, i) => (
          <details key={i}>
            <summary>
              {it.q} <span className="chev" aria-hidden="true">+</span>
            </summary>
            <p>{it.a}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqSchema(items, locale)} />
    </>
  );
}
