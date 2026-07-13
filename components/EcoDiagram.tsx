import Image from "next/image";
import { Icon, type IconName } from "@/components/Icon";
import { getDictionary } from "@/lib/dictionaries";
import { images } from "@/lib/images";
import type { Locale } from "@/lib/i18n";

/**
 * "One Platform, Six Tools" — a hub-and-spoke diagram. D3 Salon POS sits at the
 * centre; spokes fan out to three audiences, colour-coded:
 *   • Customers   (teal)   → Online Booking, Quick Check-In    (left)
 *   • Technicians (indigo) → Technician App, Technician Portal (right)
 *   • Owners      (amber)  → Owner App                         (bottom)
 * Desktop: absolutely-positioned nodes over an SVG connector layer with an
 * animated data-flow. Mobile: the same nodes stack into labelled groups.
 */
const T: Record<Locale, { cust: string; tech: string; own: string; core: string; desc: Record<string, string> }> = {
  en: {
    cust: "For Customers",
    tech: "For Technicians",
    own: "For Owners",
    core: "The core — every tool syncs here",
    desc: {
      booking: "Clients book 24/7",
      kiosk: "Self check-in in seconds",
      tech: "Schedule, turns & payouts",
      portal: "Hours & payout history",
      owner: "Revenue & payroll on the go",
    },
  },
  vi: {
    cust: "Về phía khách hàng",
    tech: "Về phía kỹ thuật viên",
    own: "Về phía quản lý",
    core: "Trung tâm — mọi công cụ đồng bộ tại đây",
    desc: {
      booking: "Khách đặt lịch 24/7",
      kiosk: "Tự check-in trong vài giây",
      tech: "Lịch, lượt & thu nhập",
      portal: "Giờ công & lịch sử payout",
      owner: "Doanh thu & payroll mọi lúc",
    },
  },
};

function Node({ icon, name, desc, group, pos }: { icon: IconName; name: string; desc: string; group: "cust" | "tech" | "own"; pos: string }) {
  return (
    <div className={`eco-node ${group} ${pos}`}>
      <span className="ico-wrap"><Icon name={icon} /></span>
      <span className="eco-txt"><b>{name}</b><small>{desc}</small></span>
    </div>
  );
}

export function EcoDiagram({ locale }: { locale: Locale }) {
  const eco = getDictionary(locale).home.ecosystem;
  const c = eco.cards;
  const t = T[locale] ?? T.en;

  return (
    <div className="eco-hub" role="group" aria-label={eco.h2}>
      <svg className="eco-links" viewBox="0 0 1000 560" preserveAspectRatio="none" aria-hidden="true">
        <path className="flow" stroke="#d1912a" d="M500 314 C500 230 500 160 500 84" />
        <path className="flow" stroke="#0d9488" d="M500 314 C370 300 250 245 155 196" />
        <path className="flow" stroke="#0d9488" d="M500 314 C370 330 250 400 155 448" />
        <path className="flow" stroke="#4f46e5" d="M500 314 C630 300 750 245 845 196" />
        <path className="flow" stroke="#4f46e5" d="M500 314 C630 330 750 400 845 448" />
      </svg>

      {/* hub — the POS core */}
      <div className="eco-node hub p-hub">
        <span className="ico-wrap logo">
          <Image src={images.logo.src} width={images.logo.w} height={images.logo.h} alt="D3" />
        </span>
        <span className="eco-txt"><b>{c.pos.name}</b><small>{t.core}</small></span>
      </div>

      {/* customers (left) */}
      <span className="eco-lane cust p-cust-lane">{t.cust}</span>
      <Node icon="cal" name={c.booking.name} desc={t.desc.booking} group="cust" pos="p-book" />
      <Node icon="kiosk" name={c.kiosk.name} desc={t.desc.kiosk} group="cust" pos="p-kiosk" />

      {/* technicians (right) */}
      <span className="eco-lane tech p-tech-lane">{t.tech}</span>
      <Node icon="user" name={c.tech.name} desc={t.desc.tech} group="tech" pos="p-techapp" />
      <Node icon="clock" name={c.portal.name} desc={t.desc.portal} group="tech" pos="p-portal" />

      {/* owners (bottom) */}
      <span className="eco-lane own p-own-lane">{t.own}</span>
      <Node icon="chart" name={c.owner.name} desc={t.desc.owner} group="own" pos="p-own" />
    </div>
  );
}
