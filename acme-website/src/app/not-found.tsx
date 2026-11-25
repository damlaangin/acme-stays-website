"use client";

import Link from "next/link";
import { useLang } from "@/utils/i18n/LanguageContext";

export default function NotFound() {
  const { c, href } = useLang();
  return (
    <section className="page-hero" style={{ minHeight: "70vh", display: "grid", alignContent: "center" }}>
      <div className="container">
        <span className="eyebrow">404</span>
        <h1>{c.notFound.title}</h1>
        <p>{c.notFound.text}</p>
        <Link href={href("/")} className="btn btn-accent">{c.notFound.cta}</Link>
      </div>
    </section>
  );
}
