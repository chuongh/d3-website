import Link from "next/link";
import { Icon } from "@/components/Icon";
import { siteConfig } from "@/site.config";
import { localePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

/** CTA band with demo + hotline (feature/about pages) (§10.3, §10.4). */
export function CtaBand({
  locale,
  dict,
  heading,
  text,
}: {
  locale: Locale;
  dict: Dictionary;
  heading: string;
  text: string;
}) {
  return (
    <div className="cta-band sheen sheen-soft">
      <h2>{heading}</h2>
      <p>{text}</p>
      <div className="row">
        <Link className="btn btn-white" href={localePath(locale, "/contact")}>
          {dict.common.bookDemo}
        </Link>
        <a className="btn btn-ghost" href={siteConfig.hotlineTel}>
          <Icon name="phone" /> {siteConfig.hotline}
        </a>
      </div>
    </div>
  );
}

/** Styled photo placeholder tile — swaps to <Image> once real WebP is delivered (§13.2). */
export function PhotoPlaceholder({
  label,
  ratio,
}: {
  label: string;
  ratio?: string;
}) {
  return (
    <div className="photo-ph" data-label={label} style={ratio ? { aspectRatio: ratio } : undefined}>
      <span>📸 [Photo: {label}]</span>
    </div>
  );
}

/** Dual-CTA row used in hero sections. */
export function HeroCtas({
  locale,
  dict,
  white = false,
}: {
  locale: Locale;
  dict: Dictionary;
  white?: boolean;
}) {
  return (
    <div className="hero-ctas">
      <Link className={`btn ${white ? "btn-white" : "btn-primary"}`} href={localePath(locale, "/contact")}>
        {dict.common.bookDemo} <Icon name="arrow" />
      </Link>
      <a className="btn btn-ghost" href={siteConfig.hotlineTel}>
        <Icon name="phone" /> {dict.common.callHotline}
      </a>
    </div>
  );
}
