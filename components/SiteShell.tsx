import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

/**
 * Page chrome shared by every route. Lives at the page level (not a layout) so
 * each route renders Header/Footer in its own locale — the pattern that keeps EN
 * at root paths and VI under /vi without middleware (§11.1).
 */
export function SiteShell({
  locale,
  switcherHref,
  children,
}: {
  locale: Locale;
  switcherHref?: string;
  children: ReactNode;
}) {
  const dict = getDictionary(locale);
  return (
    <>
      <a className="skip-link" href="#main">{dict.nav.skipToContent}</a>
      <Header locale={locale} dict={dict} switcherHref={switcherHref} />
      <main id="main">{children}</main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
