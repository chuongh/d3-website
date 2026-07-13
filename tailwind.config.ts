import type { Config } from "tailwindcss";

/**
 * Design tokens mirror §4 of the spec (LOCKED 2026-06-11).
 * Primary is the logo blue #4858F8 — NOT the legacy #3D3B8E.
 * The mockup's component CSS lives in app/globals.css using CSS variables;
 * these Tailwind tokens are for new utility-class work and stay in sync.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          DEFAULT: "#4858F8",
          dark: "#3543D9",
        },
        violet: "#7D8BFF",
        tint: {
          DEFAULT: "#EEF1FF",
          2: "#F8F9FF",
        },
        ink: "#1A1A2E",
        body: "#4A4A68",
        muted: "#7B7B99",
        border: "#E3E7FB",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        xl: "20px",
      },
      maxWidth: {
        container: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
