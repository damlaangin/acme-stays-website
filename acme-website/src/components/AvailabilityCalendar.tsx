"use client";

import { useEffect, useMemo, useState } from "react";
import { useLang } from "@/utils/i18n/LanguageContext";
import { Icon } from "./Icon";

const dayKey = (d: Date) => d.toISOString().slice(0, 10);

export default function AvailabilityCalendar({ listingId }: { listingId: string }) {
  const { c } = useLang();
  const [events, setEvents] = useState<{ start: string; end: string }[]>([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetch(`/api/availability?url=${encodeURIComponent(`demo-${listingId}`)}`)
      .then((r) => r.json())
      .then((d) => setEvents(d.events ?? []))
      .catch(() => setEvents([]));
  }, [listingId]);

  const booked = useMemo(() => {
    const set = new Set<string>();
    events.forEach((e) => {
      for (let d = new Date(e.start); d < new Date(e.end); d = new Date(d.getTime() + 864e5)) set.add(dayKey(d));
    });
    // a listing-specific shift so each home looks different
    const shift = Number(listingId) % 5;
    return new Set(Array.from(set).map((k) => dayKey(new Date(new Date(k).getTime() + shift * 864e5))));
  }, [events, listingId]);

  const base = new Date();
  const month = new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth() + offset, 1));
  const first = (month.getUTCDay() + 6) % 7; // Monday first
  const days = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + 1, 0)).getUTCDate();
  const todayKey = dayKey(base);
  const locale = "en-GB";
  const dows = Array.from({ length: 7 }, (_, i) => new Date(Date.UTC(2024, 0, 1 + i)).toLocaleDateString(locale, { weekday: "short", timeZone: "UTC" }));

  return (
    <div className="cal">
      <div className="cal-head">
        <button type="button" onClick={() => setOffset((o) => Math.max(0, o - 1))} aria-label="Previous month"><Icon name="left" size={18} /></button>
        <strong>{month.toLocaleDateString(locale, { month: "long", year: "numeric", timeZone: "UTC" })}</strong>
        <button type="button" onClick={() => setOffset((o) => Math.min(3, o + 1))} aria-label="Next month"><Icon name="right" size={18} /></button>
      </div>
      <div className="cal-grid">
        {dows.map((d) => <span key={d} className="cal-dow">{d}</span>)}
        {Array.from({ length: first }).map((_, i) => <span key={`b${i}`} />)}
        {Array.from({ length: days }, (_, i) => {
          const key = dayKey(new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth(), i + 1)));
          const cls = key < todayKey ? "is-past" : booked.has(key) ? "is-booked" : "is-free";
          return <span key={key} className={`cal-day ${cls}`}>{i + 1}</span>;
        })}
      </div>
      <div className="cal-legend">
        <span><i style={{ background: "rgba(201,160,82,.25)" }} />{c.stay.free}</span>
        <span><i style={{ background: "var(--color-primary)" }} />{c.stay.booked}</span>
      </div>
    </div>
  );
}
