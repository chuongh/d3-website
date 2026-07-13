/**
 * D3 Salon Solution — business constants (spec §8, §13).
 * Single source of truth for hotline, pricing, domain, external links.
 */

export const siteConfig = {
  name: "D3 Salon Solution",
  tagline: "All Salon Solutions in One Place",
  domain: "https://d3salonsolution.com",

  hotline: "(919) 655-3989",
  hotlineTel: "tel:+19196553989",

  email: "info@d3salonsolution.com", // TODO: confirm public-facing sales email
  hours: "Mon–Sat, 9 AM – 7 PM",

  // HQ — NAP consistency with Google Business Profile (§9, §10.4)
  address: {
    locality: "Raleigh",
    region: "NC",
    country: "US",
  },

  priceBasic: "$49.95",
  pricePremium: "$99.95",

  // Legal page "Last updated" dates (§8 — final legal copy pending review).
  privacyUpdated: "March 5, 2024",
  termsUpdated: "September 12, 2023",

  // Registered legal entity & address (Terms page contact/definitions).
  legal: {
    entity: "D3 Salon Solution LLC",
    street: "42 Atlantic Ave",
    cityStateZip: "Raleigh, NC 27604",
    fullAddress: "42 Atlantic Ave, Raleigh, NC 27604",
  },

  // Pricing displayed on the home/feature pages as a "from" anchor.
  priceFrom: "$49.95",

  furnitureUrl: "https://furniture.d3salonsolution.com",

  ga4Id: "TODO", // §8 placeholder — Google Analytics 4 measurement ID
  gscVerification: "TODO", // §9 — google-site-verification token (carry over at cutover)

  // Demo form backend (§5 open question). Static export cannot host an API route,
  // so the form POSTs to this endpoint. TODO: wire to D3 API or Formspree/Resend.
  formEndpoint: "TODO", // e.g. https://formspree.io/f/xxxx or D3 API lead endpoint

  social: {
    facebook: "https://facebook.com/d3salonsolution", // TODO: confirm handles
    instagram: "https://instagram.com/d3salonsolution",
    youtube: "https://youtube.com/@d3salonsolution",
    tiktok: "https://tiktok.com/@d3salonsolution",
  },

  // Public client salons usable as social-proof names (§9 — names already public).
  proofSalons: [
    "Bella Nails Spa",
    "Posh Nails",
    "Reign",
    "Noire",
    "Lux Nail Bar",
    "Urban Chic",
    "Royal Nails & Spa",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
