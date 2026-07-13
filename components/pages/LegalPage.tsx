import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { localePath, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { breadcrumbSchema } from "@/lib/schema";

export function LegalPage({ locale, kind }: { locale: Locale; kind: "privacy" | "terms" }) {
  const dict = getDictionary(locale);
  const t = dict.legal[kind];
  const p = (path: string) => localePath(locale, path);
  const slug = kind === "privacy" ? "/privacy" : "/terms";

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: dict.breadcrumb.home, path: "/" },
            { name: t.h1, path: slug },
          ],
          locale,
        )}
      />
      <div className="sub-hero">
        <div className="container">
          <div className="crumb"><Link href={p("/")}>{dict.breadcrumb.home}</Link> / <span>{t.h1}</span></div>
          <h1>{t.h1}</h1>
          <p className="lead">{t.updated}</p>
        </div>
      </div>
      <section>
        <div className="container">
          <div className="prose">
            <div className="todo">{/* TODO: real copy needed */} {t.placeholder}</div>
          </div>
        </div>
      </section>
    </>
  );
}
