"use client";

import { useState } from "react";
import { useLang } from "@/utils/i18n/LanguageContext";
import { CITIES } from "@/content/listings";

type Kind = "owner" | "corporate" | "contact" | "inquiry";

export default function LeadForm({ kind, title, text, subject }: { kind: Kind; title?: string; text?: string; subject?: string }) {
  const { c } = useLang();
  const f = c.forms;
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    setState("sending");
    try {
      const res = await fetch("/api/submit-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: get("name"),
          email: get("email"),
          phone: get("phone"),
          location: get("city") || get("company") || subject || kind,
          notes: [kind, get("dates"), get("guests") && `${get("guests")} guests`, get("message")].filter(Boolean).join(" | "),
          propertyReady: data.get("ready") === "on",
          tourismLicense: data.get("license") === "on",
        }),
      });
      setState(res.ok ? "ok" : "err");
      if (res.ok) event.currentTarget.reset();
    } catch {
      setState("err");
    }
  };

  return (
    <div className="form-card" id={kind === "owner" ? "valuation" : undefined}>
      {title && <h2>{title}</h2>}
      {text && <p>{text}</p>}
      <form onSubmit={submit}>
        {state === "ok" && <div className="alert alert-ok" role="status">{f.success}</div>}
        {state === "err" && <div className="alert alert-err" role="alert">{f.error}</div>}
        <div className="form-grid">
          <div className="field"><label htmlFor={`${kind}-name`}>{f.name}</label><input id={`${kind}-name`} name="name" required autoComplete="name" /></div>
          <div className="field"><label htmlFor={`${kind}-email`}>{f.email}</label><input id={`${kind}-email`} name="email" type="email" required autoComplete="email" /></div>
          <div className="field"><label htmlFor={`${kind}-phone`}>{f.phone}</label><input id={`${kind}-phone`} name="phone" type="tel" required autoComplete="tel" /></div>
          {kind === "owner" && (
            <div className="field">
              <label htmlFor="owner-city">{f.city}</label>
              <select id="owner-city" name="city" required defaultValue="">
                <option value="" disabled>–</option>
                {CITIES.map((x) => <option key={x} value={x}>{x}</option>)}
              </select>
            </div>
          )}
          {kind === "corporate" && (
            <div className="field"><label htmlFor="corp-company">{f.company}</label><input id="corp-company" name="company" required /></div>
          )}
          {(kind === "corporate" || kind === "inquiry") && (
            <>
              <div className="field"><label htmlFor={`${kind}-dates`}>{f.dates}</label><input id={`${kind}-dates`} name="dates" placeholder="12 – 18 Jul" /></div>
              <div className="field"><label htmlFor={`${kind}-guests`}>{f.guests}</label><input id={`${kind}-guests`} name="guests" type="number" min={1} max={30} /></div>
            </>
          )}
          <div className="field full"><label htmlFor={`${kind}-msg`}>{f.message}</label><textarea id={`${kind}-msg`} name="message" /></div>
          {kind === "owner" && (
            <>
              <label className="check full"><input type="checkbox" name="ready" /> {f.ready}</label>
              <label className="check full"><input type="checkbox" name="license" /> {f.license}</label>
            </>
          )}
          <button type="submit" className="btn btn-primary btn-block full" disabled={state === "sending"}>
            {state === "sending" ? f.sending : f.submit}
          </button>
        </div>
        <p className="form-note">{f.consent}</p>
      </form>
    </div>
  );
}
