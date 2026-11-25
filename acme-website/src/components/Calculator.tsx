"use client";

import { useState } from "react";
import { useLang } from "@/utils/i18n/LanguageContext";
import { CITIES } from "@/content/listings";

type Result = { estimatedMonthlyEarnings: { TRY: string; USD: string; EUR: string }; monthlyOccupancyRate: string };

export default function Calculator() {
  const { c } = useLang();
  const t = c.owners.calculator;
  const [city, setCity] = useState<string>(CITIES[0]);
  const [bedrooms, setBedrooms] = useState(2);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const calculate = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/calculate-earnings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bedrooms, location: city }),
      });
      setResult(res.ok ? await res.json() : null);
    } finally {
      setLoading(false);
    }
  };

  const main = result ? result.estimatedMonthlyEarnings.USD : "–";

  return (
    <div className="calc">
      <form className="form-card" onSubmit={calculate}>
        <h3>{t.title}</h3>
        <p>{t.subtitle}</p>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="calc-city">{t.city}</label>
            <select id="calc-city" value={city} onChange={(e) => setCity(e.target.value)}>
              {CITIES.map((x) => <option key={x} value={x}>{x}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="calc-beds">{t.bedrooms}</label>
            <select id="calc-beds" value={bedrooms} onChange={(e) => setBedrooms(Number(e.target.value))}>
              {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-block full" disabled={loading}>{loading ? t.calculating : t.button}</button>
        </div>
      </form>
      <div className="calc-out" aria-live="polite">
        <small>{t.perMonth}</small>
        <div className="calc-big">{main}</div>
        {result && (
          <div className="calc-row">
            <div><small>USD</small><strong>{result.estimatedMonthlyEarnings.USD.replace("USD ", "")}</strong></div>
            <div><small>EUR</small><strong>{result.estimatedMonthlyEarnings.EUR.replace("EUR ", "")}</strong></div>
            <div><small>{t.occupancy}</small><strong>{result.monthlyOccupancyRate}</strong></div>
          </div>
        )}
        <p className="disclaimer">{t.disclaimer}</p>
      </div>
    </div>
  );
}
