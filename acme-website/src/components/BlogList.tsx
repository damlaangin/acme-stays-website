"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/utils/i18n/LanguageContext";
import { CATEGORY_LABELS, POSTS, formatDate, type CategoryId } from "@/content/blog";
import { Icon } from "./Icon";

export default function BlogList() {
  const { lang, c, href } = useLang();
  const [cat, setCat] = useState<CategoryId | "all">("all");
  const posts = POSTS.filter((p) => cat === "all" || p.category === cat);
  const featured = cat === "all" ? posts[0] : undefined;
  const grid = cat === "all" ? posts.slice(1) : posts;

  return (
    <>
      <div className="faq-tabs" role="group">
        <button type="button" className="pill" aria-pressed={cat === "all"} onClick={() => setCat("all")}>{c.blog.all}</button>
        {(Object.keys(CATEGORY_LABELS) as CategoryId[]).map((k) => (
          <button key={k} type="button" className="pill" aria-pressed={cat === k} onClick={() => setCat(k)}>{CATEGORY_LABELS[k][lang]}</button>
        ))}
      </div>

      {featured && (
        <Link href={href(`/blogs/${featured.slug}`)} className="post-feature">
          <img src={featured.image} alt="" />
          <div className="post-card-body">
            <div className="post-meta">
              <span className="post-cat">{c.blog.featured}</span>
              <span>{formatDate(featured.date, lang)}</span>
              <span>{featured.readMin} {c.common.minRead}</span>
            </div>
            <h2>{featured.title[lang]}</h2>
            <p>{featured.excerpt[lang]}</p>
            <span className="link-arrow">{c.common.readMore} <Icon name="arrow" size={16} /></span>
          </div>
        </Link>
      )}

      <div className="grid grid-3">
        {grid.map((p) => (
          <Link key={p.slug} href={href(`/blogs/${p.slug}`)} className="post-card">
            <img src={p.image} alt="" loading="lazy" />
            <div className="post-card-body">
              <div className="post-meta">
                <span className="post-cat">{CATEGORY_LABELS[p.category][lang]}</span>
                <span>{formatDate(p.date, lang)}</span>
              </div>
              <h3>{p.title[lang]}</h3>
              <p>{p.excerpt[lang]}</p>
              <span className="link-arrow" style={{ marginTop: "auto" }}>{c.common.readMore} <Icon name="arrow" size={16} /></span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
