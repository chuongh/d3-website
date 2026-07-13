"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/Icon";
import { siteConfig } from "@/site.config";
import { localePath, switchLocalePath, type Locale } from "@/lib/i18n";
import { images } from "@/lib/images";
import type { Dictionary } from "@/lib/dictionaries";

type Props = {
  locale: Locale;
  dict: Dictionary;
  /** Counterpart URL in the other locale (blog posts pass this; others auto-compute). */
  switcherHref?: string;
};

export function Header({ locale, dict, switcherHref }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname() || "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const p = (path: string) => localePath(locale, path);
  const altHref = switcherHref ?? switchLocalePath(locale, pathname);

  const features = [
    { href: p("/salon-pos"), label: dict.nav.salonPos, icon: "pos" as const, slug: "/salon-pos" },
    { href: p("/online-booking"), label: dict.nav.onlineBooking, icon: "cal" as const, slug: "/online-booking" },
    { href: p("/check-in"), label: dict.nav.checkIn, icon: "kiosk" as const, slug: "/check-in" },
    { href: p("/payroll"), label: dict.nav.payroll, icon: "money" as const, slug: "/payroll" },
  ];

  return (
    <header className={scrolled ? "scrolled" : ""} id="hdr">
      <div className="container nav">
        <Link className="logo" href={p("/")} aria-label={`${siteConfig.name} home`}>
          <Image className="logo-img" src={images.logo.src} alt="" width={38} height={38} priority />
          <span className="logo-text">{siteConfig.name}</span>
        </Link>

        <ul className="nav-links">
          <li>
            <button aria-haspopup="true" aria-expanded="false">
              {dict.nav.features} <span aria-hidden="true">▾</span>
            </button>
            <div className="dropdown">
              {features.map((f) => (
                <Link key={f.slug} href={f.href}>
                  <Icon name={f.icon} />
                  <span>
                    {f.label}
                    <small>{f.slug}</small>
                  </span>
                </Link>
              ))}
            </div>
          </li>
          <li><Link href={p("/pricing")}>{dict.nav.pricing}</Link></li>
          <li><Link href={p("/about")}>{dict.nav.about}</Link></li>
          <li><Link href={p("/blog")}>{dict.nav.blog}</Link></li>
        </ul>

        <div className="nav-cta">
          <span className="lang-switch" role="group" aria-label="Language">
            <Link href={locale === "en" ? pathname : altHref} className={locale === "en" ? "active" : ""} hrefLang="en">EN</Link>
            <Link href={locale === "vi" ? pathname : altHref} className={locale === "vi" ? "active" : ""} hrefLang="vi">VI</Link>
          </span>
          <a className="nav-phone" href={siteConfig.hotlineTel}>
            <Icon name="phone" className="ic" style={{ width: 18, height: 18 }} />
            <span>{siteConfig.hotline}</span>
          </a>
          <Link className="btn btn-nav" href={p("/contact")}>{dict.common.bookDemoShort}</Link>
          <button
            className="menu-btn"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Icon name={menuOpen ? "close" : "menu"} className="ic" style={{ width: 26, height: 26 }} />
          </button>
        </div>
      </div>

      <nav className={`mobile-menu${menuOpen ? " open" : ""}`} aria-label="Mobile">
        {features.map((f) => (
          <Link key={f.slug} href={f.href} onClick={() => setMenuOpen(false)}>{f.label}</Link>
        ))}
        <Link href={p("/pricing")} onClick={() => setMenuOpen(false)}>{dict.nav.pricing}</Link>
        <Link href={p("/about")} onClick={() => setMenuOpen(false)}>{dict.nav.about}</Link>
        <Link href={p("/blog")} onClick={() => setMenuOpen(false)}>{dict.nav.blog}</Link>
        <a href={siteConfig.hotlineTel}>{siteConfig.hotline}</a>
        <Link className="btn btn-primary" href={p("/contact")} onClick={() => setMenuOpen(false)}>
          {dict.common.bookDemo}
        </Link>
        <span className="lang-switch" role="group" aria-label="Language">
          <Link href={locale === "en" ? pathname : altHref} className={locale === "en" ? "active" : ""} hrefLang="en">EN</Link>
          <Link href={locale === "vi" ? pathname : altHref} className={locale === "vi" ? "active" : ""} hrefLang="vi">VI</Link>
        </span>
      </nav>
    </header>
  );
}
