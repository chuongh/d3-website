import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { localePath, type Locale } from "@/lib/i18n";
import { images } from "@/lib/images";
import type { Dictionary } from "@/lib/dictionaries";

const FURN = siteConfig.furnitureUrl;

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const p = (path: string) => localePath(locale, path);
  const year = 2026; // build-time constant — Date.now() is unavailable in this runtime

  return (
    <footer className="site">
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link className="logo" href={p("/")}>
              <Image className="logo-img" src={images.logo.src} alt="" width={38} height={38} />
              {siteConfig.name}
            </Link>
            <p>{dict.footer.brandBlurb}</p>
          </div>

          <div>
            <h4>{dict.footer.product}</h4>
            <ul>
              <li><Link href={p("/salon-pos")}>{dict.nav.salonPos}</Link></li>
              <li><Link href={p("/online-booking")}>{dict.nav.onlineBooking}</Link></li>
              <li><Link href={p("/check-in")}>{dict.nav.checkIn}</Link></li>
              <li><Link href={p("/payroll")}>{dict.nav.payroll}</Link></li>
              <li><Link href={p("/pricing")}>{dict.nav.pricing}</Link></li>
            </ul>
          </div>

          <div>
            <h4>{dict.footer.company}</h4>
            <ul>
              <li><Link href={p("/about")}>{dict.nav.about}</Link></li>
              <li><Link href={p("/blog")}>{dict.nav.blog}</Link></li>
              <li><Link href={p("/contact")}>{dict.common.bookDemoShort}</Link></li>
              <li><a href={siteConfig.hotlineTel}>{siteConfig.hotline}</a></li>
              <li><Link href={p("/privacy")}>{dict.footer.privacy}</Link></li>
              <li><Link href={p("/terms")}>{dict.footer.terms}</Link></li>
            </ul>
          </div>

          <div>
            <h4>{dict.footer.moreFromD3}</h4>
            <ul>
              <li><a href={`${FURN}/salon-furniture/`} target="_blank" rel="noopener">{dict.footer.salonFurniture} ↗</a></li>
              <li><a href={`${FURN}/pedicure-chairs/`} target="_blank" rel="noopener">{dict.footer.pedicureChairs} ↗</a></li>
              <li><a href={`${FURN}/marketing-services/`} target="_blank" rel="noopener">{dict.footer.marketingServices} ↗</a></li>
              <li><a href={`${FURN}/photo-video/`} target="_blank" rel="noopener">{dict.footer.photoVideo} ↗</a></li>
            </ul>
          </div>
        </div>

        <div className="foot-bottom">
          <span>© {year} {siteConfig.name}. {dict.footer.copyright}</span>
          <span>
            {dict.footer.locationLine} ·{" "}
            <a href={siteConfig.social.facebook} target="_blank" rel="noopener">Facebook</a> ·{" "}
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener">Instagram</a> ·{" "}
            <a href={siteConfig.social.youtube} target="_blank" rel="noopener">YouTube</a> ·{" "}
            <a href={siteConfig.social.tiktok} target="_blank" rel="noopener">TikTok</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
