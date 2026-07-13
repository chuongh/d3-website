"use client";

import { useEffect } from "react";

/**
 * Scroll-reveal driver (paired with the `html.reveal-on` CSS in globals.css).
 *
 * - No library: one IntersectionObserver reveals section-level elements once.
 * - Stagger: elements sharing a parent get an incremental transition-delay.
 * - Flash-free: pre-hiding is done in CSS gated by `.reveal-on`, which an inline
 *   head script sets before first paint (and skips under reduced motion).
 * - Crisp hover: `data-rv` arms the long reveal transition, then is removed on
 *   completion so a card's own `transition: transform .2s` hover takes over.
 */
const SELECTOR = [
  ".hero-grid > div:first-child > *",
  ".hero-stage",
  ".proof-logos > *",
  ".section-head",
  ".bento-card",
  ".feat-row",
  ".persona",
  ".demo-copy",
  ".xcard",
  ".plan",
  ".post",
].join(",");

const STEP_MS = 70; // stagger between siblings
const MAX_STEPS = 6; // cap so long lists don't drag

export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    // data-reveal-on is absent under prefers-reduced-motion — leave all visible.
    if (!root.hasAttribute("data-reveal-on")) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    if (els.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in-view"));
      return;
    }

    // Assign a stagger index within each parent group.
    const seen = new Map<Element, number>();
    els.forEach((el) => {
      const parent = el.parentElement;
      if (!parent) return;
      const i = seen.get(parent) ?? 0;
      seen.set(parent, i + 1);
      el.dataset.rvStep = String(Math.min(i, MAX_STEPS));
    });

    const reveal = (el: HTMLElement) => {
      const step = Number(el.dataset.rvStep ?? 0);
      el.setAttribute("data-rv", ""); // arm the transition
      el.style.transitionDelay = `${step * STEP_MS}ms`;
      // Commit the hidden state (with the transition now armed) via a forced
      // reflow, then flip — this transitions reliably even when rAF is throttled
      // in a backgrounded tab, instead of snapping.
      void el.offsetWidth;
      el.classList.add("in-view");

      const cleanup = () => {
        el.removeAttribute("data-rv");
        el.style.transitionDelay = "";
        el.style.willChange = "";
        el.removeEventListener("transitionend", cleanup);
      };
      el.addEventListener("transitionend", cleanup);
      window.setTimeout(cleanup, step * STEP_MS + 1000); // fallback
    };

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target as HTMLElement);
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    // Above-the-fold: reveal immediately by geometry — the observer's first
    // callback can be deferred until a paint/scroll in some environments, and
    // hero content must never wait.
    const vh = window.innerHeight;
    const pending = els.filter((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < vh * 0.9) {
        reveal(el);
        return false;
      }
      return true;
    });

    pending.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
