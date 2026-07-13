import Image from "next/image";
import { Icon, type IconName } from "@/components/Icon";
import { getDictionary } from "@/lib/dictionaries";
import { images } from "@/lib/images";
import type { Locale } from "@/lib/i18n";

/**
 * "One Platform, Eight Tools" — a hub-and-spoke diagram. D3 Salon POS sits at the
 * centre; spokes fan out to three audiences, colour-coded:
 *   • Customers   (teal)   → Online Booking, Quick Check-In, Loyalty Program   (left)
 *   • Technicians (indigo) → Technician App, Technician Turn, Technician Portal (right)
 *   • Owners      (amber)  → Owner App                                         (top)
 * Desktop: absolutely-positioned nodes over an SVG connector layer with an
 * animated data-flow. Mobile: the same nodes stack into labelled groups.
 */
const T: Record<Locale, { cust: string; tech: string; own: string; core: string; names: { loyalty: string; turn: string }; desc: Record<string, string> }> = {
  en: {
    cust: "For Customers",
    tech: "For Technicians",
    own: "For Owners",
    core: "The core — every tool syncs here",
    names: { loyalty: "Loyalty Program", turn: "Technician Turn" },
    desc: {
      booking: "Clients book 24/7",
      kiosk: "Self check-in in seconds",
      loyalty: "Points & rewards that bring clients back",
      tech: "Schedule, turns & payouts",
      turn: "Fair turn rotation, tracked live",
      portal: "Hours & payout history",
      owner: "Revenue & payroll on the go",
    },
  },
  vi: {
    cust: "Về phía khách hàng",
    tech: "Về phía kỹ thuật viên",
    own: "Về phía quản lý",
    core: "Trung tâm — mọi công cụ đồng bộ tại đây",
    names: { loyalty: "Chương trình tích điểm", turn: "Chia lượt kỹ thuật viên" },
    desc: {
      booking: "Khách đặt lịch 24/7",
      kiosk: "Tự check-in trong vài giây",
      loyalty: "Tích điểm & ưu đãi giữ chân khách",
      tech: "Lịch, lượt & thu nhập",
      turn: "Chia lượt công bằng, theo dõi trực tiếp",
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
      <svg className="eco-links" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true">
        <path className="flow" stroke="#d1912a" d="M500 346 C500 250 500 160 500 77" />
        <path className="flow" stroke="#0d9488" d="M500 346 C370 320 250 240 155 192" />
        <path className="flow" stroke="#0d9488" d="M500 346 C380 352 260 358 155 358" />
        <path className="flow" stroke="#0d9488" d="M500 346 C370 382 250 470 155 525" />
        <path className="flow" stroke="#4f46e5" d="M500 346 C630 320 750 240 845 192" />
        <path className="flow" stroke="#4f46e5" d="M500 346 C620 352 740 358 845 358" />
        <path className="flow" stroke="#4f46e5" d="M500 346 C630 382 750 470 845 525" />
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
      <Node icon="heart" name={t.names.loyalty} desc={t.desc.loyalty} group="cust" pos="p-loyalty" />

      {/* technicians (right) */}
      <span className="eco-lane tech p-tech-lane">{t.tech}</span>
      <Node icon="user" name={c.tech.name} desc={t.desc.tech} group="tech" pos="p-techapp" />
      <Node icon="clock" name={t.names.turn} desc={t.desc.turn} group="tech" pos="p-turn" />
      <Node icon="money" name={c.portal.name} desc={t.desc.portal} group="tech" pos="p-portal" />

      {/* owners (top) */}
      <span className="eco-lane own p-own-lane">{t.own}</span>
      <Node icon="chart" name={c.owner.name} desc={t.desc.owner} group="own" pos="p-own" />
    </div>
  );
}
