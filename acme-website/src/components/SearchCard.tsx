"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLang } from "@/utils/i18n/LanguageContext";
import { CITIES } from "@/content/listings";
import { Icon } from "./Icon";

export default function SearchCard() {
  const { c, href } = useLang();
  const router = useRouter();
  const [city, setCity] = useState("");
  const [guests, setGuests] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (guests) params.set("guests", guests);
    if (bedrooms) params.set("bedrooms", bedrooms);
    const qs = params.toString();
    router.push(`${href("/stays")}${qs ? `?${qs}` : ""}`);
  };

  return (
    <div className="search-card">
      <form onSubmit={submit} aria-label={c.home.hero.searchTitle}>
        <div className="field">
          <label htmlFor="s-city">{c.stays.filters.city}</label>
          <select id="s-city" value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">{c.common.anyCity}</option>
            {CITIES.map((x) => <option key={x} value={x}>{x}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="s-guests">{c.stays.filters.guests}</label>
          <select id="s-guests" value={guests} onChange={(e) => setGuests(e.target.value)}>
            <option value="">{c.common.anyNumber}</option>
            {[2, 4, 6, 8].map((n) => <option key={n} value={n}>{n}+</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="s-beds">{c.stays.filters.bedrooms}</label>
          <select id="s-beds" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
            <option value="">{c.common.anyNumber}</option>
            {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}+</option>)}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          <Icon name="search" size={18} /> {c.common.search}
        </button>
      </form>
    </div>
  );
}
