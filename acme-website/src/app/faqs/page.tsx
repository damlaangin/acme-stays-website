import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { copy, isLang } from "@/content";
import FaqList from "@/components/FaqList";
import { PageHero } from "@/components/Sections";

export async function generateMetadata(): Promise<Metadata> {
  const lang = "en" as const;
  return isLang(lang) ? { title: copy[lang].nav.faq, description: copy[lang].faq.hero.subtitle } : {};
}

export default async function Faqs() {
  const lang = "en" as const;
  if (!isLang(lang)) notFound();
  const c = copy[lang];
  return (
    <>
      <PageHero eyebrow={c.faq.hero.eyebrow} title={c.faq.hero.title} subtitle={c.faq.hero.subtitle} image="/images/properties/property-3.jpg" />
      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <FaqList />
          <div className="card center" style={{ marginTop: "3rem" }}>
            <h2 style={{ fontSize: "1.4rem" }}>{c.faq.stillNeed}</h2>
            <Link href={`/contact`} className="btn btn-primary">{c.faq.contact}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
