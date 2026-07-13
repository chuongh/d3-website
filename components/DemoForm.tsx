"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { siteConfig } from "@/site.config";
import type { Dictionary } from "@/lib/dictionaries";

type Status = "idle" | "submitting" | "success" | "error";

export function DemoForm({ dict }: { dict: Dictionary }) {
  const t = dict.demo.form;
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    // §5 open question: form backend. siteConfig.formEndpoint is a TODO until the
    // D3 API lead endpoint (or Formspree/Resend) is wired. Until then we show the
    // success state optimistically so the conversion flow is demoable end-to-end.
    if (siteConfig.formEndpoint && siteConfig.formEndpoint !== "TODO") {
      try {
        const res = await fetch(siteConfig.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        setStatus(res.ok ? "success" : "error");
      } catch {
        setStatus("error");
      }
    } else {
      // eslint-disable-next-line no-console
      console.info("[demo lead] (no endpoint wired — see site.config.ts)", data);
      setStatus("success");
    }
  }

  if (status === "success") {
    return (
      <div className="form-card">
        <div className="form-success">
          <div className="check"><Icon name="check" className="ic" style={{ width: 30, height: 30 }} /></div>
          <h3>{t.successTitle}</h3>
          <p>{t.successBody}</p>
        </div>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <div className="field full">
          <label htmlFor="salon">{t.salon} <em>*</em></label>
          <input id="salon" name="salon" type="text" required placeholder={t.salonPlaceholder} />
        </div>
        <div className="field">
          <label htmlFor="name">{t.name} <em>*</em></label>
          <input id="name" name="name" type="text" required placeholder={t.namePlaceholder} />
        </div>
        <div className="field">
          <label htmlFor="phone">{t.phone} <em>*</em></label>
          <input id="phone" name="phone" type="tel" required placeholder={t.phonePlaceholder} />
        </div>
        <div className="field">
          <label htmlFor="email">{t.email} <em>*</em></label>
          <input id="email" name="email" type="email" required placeholder={t.emailPlaceholder} />
        </div>
        <div className="field">
          <label htmlFor="techs">{t.techs}</label>
          <select id="techs" name="techs" defaultValue="1–5">
            <option>1–5</option>
            <option>6–10</option>
            <option>11–20</option>
            <option>20+</option>
          </select>
        </div>
        <div className="field full">
          <label htmlFor="msg">{t.message}</label>
          <textarea id="msg" name="message" placeholder={t.messagePlaceholder} />
        </div>
      </div>
      <button className="btn btn-primary" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? t.submitting : t.submit}
        {status !== "submitting" && <Icon name="arrow" />}
      </button>
      {status === "error" && <p className="form-note" style={{ color: "#B3261E" }}>{t.errorBody}</p>}
      <p className="form-note">{t.note}</p>
    </form>
  );
}
