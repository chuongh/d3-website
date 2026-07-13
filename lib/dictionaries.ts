import en from "@/public/locales/en.json";
import vi from "@/public/locales/vi.json";
import type { Locale } from "@/lib/i18n";

/** EN is the structural source of truth; VI mirrors its shape (§11.2). */
export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = {
  en,
  vi: vi as Dictionary,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
