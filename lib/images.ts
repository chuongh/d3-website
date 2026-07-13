/**
 * Self-hosted product imagery (§4 — no hotlinks to d3salonsolution.com).
 * Sources copied from the live site and re-encoded to WebP under /public/images.
 * Intrinsic dimensions are baked in so next/image reserves space → zero CLS (§3).
 */
// Prefix public-asset paths with the deploy base path. Required because Next does
// NOT apply basePath to unoptimized next/image `src` (see next.config.mjs). Uses
// NEXT_PUBLIC_BASE_PATH so server and client renders agree. Empty on Vercel.
const BP = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const images = {
  heroDashboard: { src: `${BP}/images/hero-salon-banner.webp`, w: 1678, h: 937 },
  onlineBooking: { src: `${BP}/images/online-booking.webp`, w: 810, h: 810 },
  payrollSetup: { src: `${BP}/images/payroll-setup.webp`, w: 810, h: 810 },
  checkinKiosk: { src: `${BP}/images/checkin-kiosk.webp`, w: 4286, h: 696 },
  paymentsTerminal: { src: `${BP}/images/payments-terminal.webp`, w: 810, h: 810 },
  checkinClient: { src: `${BP}/images/checkin-client.webp`, w: 1316, h: 767 },
  loyaltyPhone: { src: `${BP}/images/loyalty-phone.webp`, w: 881, h: 1066 },
  smsReminder: { src: `${BP}/images/sms-reminder.webp`, w: 810, h: 810 },
  logo: { src: `${BP}/d3-logo.png`, w: 702, h: 702 },
} as const;

export type ImageAsset = { src: string; w: number; h: number };
