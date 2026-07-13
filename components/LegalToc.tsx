"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/site.config";

type TocItem = { id: string; label: string };

/**
 * Sticky sidebar table of contents for legal pages (Privacy, Terms).
 * Highlights the section currently in view via IntersectionObserver (ports the
 * inline script from the source HTML). Hidden below 900px.
 */
export function LegalToc({
  items,
  contactLabel,
  heading = "On this page",
}: {
  items: TocItem[];
  contactLabel: string;
  heading?: string;
}) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el !== null);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className="toc sticky top-[90px] max-[899px]:hidden" aria-label="Table of contents">
      <p className="mb-3.5 font-display text-[11px] font-bold uppercase tracking-[0.1em] text-muted">
        {heading}
      </p>
      <ul className="grid gap-0.5">
        {items.map((it) => {
          const isActive = active === it.id;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`flex items-center gap-2.5 rounded-[9px] px-3 py-2 font-display text-[13px] font-semibold leading-[1.35] transition-colors ${
                  isActive ? "bg-tint text-indigo" : "text-body hover:bg-tint hover:text-indigo"
                }`}
              >
                <span
                  className={`h-[3px] w-[3px] flex-none rounded-full transition-colors ${
                    isActive ? "bg-indigo" : "bg-muted"
                  }`}
                  aria-hidden="true"
                />
                {it.label}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="my-3 h-px bg-border" />
      <div className="rounded-[11px] border border-border bg-tint p-4">
        <p className="mb-2 text-[13px] text-muted">{contactLabel}</p>
        <a href={siteConfig.hotlineTel} className="font-display text-[13.5px] font-bold text-indigo">
          {siteConfig.hotline}
        </a>
      </div>
    </nav>
  );
}
