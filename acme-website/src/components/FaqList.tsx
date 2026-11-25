"use client";

import { useMemo, useState } from "react";
import { useLang } from "@/utils/i18n/LanguageContext";
import { Icon } from "./Icon";

export function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="faq-item">
      <summary>
        {q}
        <Icon name="plus" size={22} />
      </summary>
      <div className="faq-answer"><p>{a}</p></div>
    </details>
  );
}

export default function FaqList({ limitCategory, limit }: { limitCategory?: string; limit?: number }) {
  const { c } = useLang();
  const [active, setActive] = useState<string>(limitCategory ?? "all");
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return c.faq.categories
      .filter((cat) => active === "all" || cat.id === active)
      .map((cat) => ({ ...cat, items: cat.items.filter((i) => !q || `${i.q} ${i.a}`.toLowerCase().includes(q)) }))
      .filter((cat) => cat.items.length > 0);
  }, [c, active, query]);

  return (
    <div>
      <div className="search-input">
        <Icon name="search" size={18} />
        <input type="search" placeholder={c.faq.search} value={query} onChange={(e) => setQuery(e.target.value)} aria-label={c.faq.search} />
      </div>
      <div className="faq-tabs" role="group">
        <button type="button" className="pill" aria-pressed={active === "all"} onClick={() => setActive("all")}>{c.blog.all}</button>
        {c.faq.categories.map((cat) => (
          <button key={cat.id} type="button" className="pill" aria-pressed={active === cat.id} onClick={() => setActive(cat.id)}>{cat.title}</button>
        ))}
      </div>
      {items.length === 0 && <p>{c.faq.empty}</p>}
      {items.map((cat) => (
        <section key={cat.id} style={{ marginBottom: "2rem" }}>
          {active === "all" && <h2 style={{ marginTop: "1rem", fontSize: "1.5rem" }}>{cat.title}</h2>}
          {cat.items.slice(0, limit ?? 99).map((i) => <FaqItem key={i.q} q={i.q} a={i.a} />)}
        </section>
      ))}
    </div>
  );
}
