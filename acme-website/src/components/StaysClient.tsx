"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLang } from "@/utils/i18n/LanguageContext";
import { CITIES, LISTINGS } from "@/content/listings";
import PropertyCard from "./PropertyCard";

type Sort = "recommended" | "priceAsc" | "priceDesc" | "rating";

export default function StaysClient() {
  const { c } = useLang();
  const params = useSearchParams();
  const [city, setCity] = useState(params.get("city") ?? "");
  const [guests, setGuests] = useState(params.get("guests") ?? "");
  const [bedrooms, setBedrooms] = useState(params.get("bedrooms") ?? "");
  const [sort, setSort] = useState<Sort>("recommended");

  const results = useMemo(() => {
    const list = LISTINGS.filter(
      (l) => (!city || l.city === city) && (!guests || l.guests >= Number(guests)) && (!bedrooms || l.rooms >= Number(bedrooms))
    );
    if (sort === "priceAsc") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "priceDesc") return [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") return [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [city, guests, bedrooms, sort]);

  const reset = () => {
    setCity("");
    setGuests("");
    setBedrooms("");
    setSort("recommended");
  };

  return (
    <>
      <div className="container">
        <form className="filters" onSubmit={(e) => e.preventDefault()}>
          <div className="field">
            <label htmlFor="f-city">{c.stays.filters.city}</label>
            <select id="f-city" value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">{c.common.anyCity}</option>
              {CITIES.map((x) => <option key={x} value={x}>{x}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="f-guests">{c.stays.filters.guests}</label>
            <select id="f-guests" value={guests} onChange={(e) => setGuests(e.target.value)}>
              <option value="">{c.common.anyNumber}</option>
              {[2, 4, 6, 8].map((n) => <option key={n} value={n}>{n}+</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="f-beds">{c.stays.filters.bedrooms}</label>
            <select id="f-beds" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
              <option value="">{c.common.anyNumber}</option>
              {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}+</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="f-sort">{c.stays.filters.sort}</label>
            <select id="f-sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              {(Object.keys(c.stays.sort) as Sort[]).map((k) => <option key={k} value={k}>{c.stays.sort[k]}</option>)}
            </select>
          </div>
          <button type="button" className="btn btn-outline btn-sm" onClick={reset}>{c.stays.filters.reset}</button>
        </form>

        <div className="results-bar">
          <strong>{results.length} {c.stays.filters.results}</strong>
          <span>{c.stays.allIn}</span>
        </div>

        <h2 className="sr-only">Available homes</h2>
        {results.length > 0 ? (
          <div className="grid grid-3" style={{ paddingBottom: "5rem" }}>
            {results.map((l) => <PropertyCard key={l.id} listing={l} />)}
          </div>
        ) : (
          <div className="empty" style={{ marginBottom: "5rem" }}>
            <p>{c.stays.empty}</p>
            <button type="button" className="btn btn-primary" onClick={reset}>{c.stays.filters.reset}</button>
          </div>
        )}
      </div>
    </>
  );
}
