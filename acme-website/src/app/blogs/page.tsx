import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { copy, isLang } from "@/content";
import BlogList from "@/components/BlogList";
import { PageHero } from "@/components/Sections";

export async function generateMetadata(): Promise<Metadata> {
  const lang = "en" as const;
  return isLang(lang) ? { title: copy[lang].nav.blog, description: copy[lang].blog.hero.subtitle } : {};
}

export default async function Blogs() {
  const lang = "en" as const;
  if (!isLang(lang)) notFound();
  const c = copy[lang];
  return (
    <>
      <PageHero eyebrow={c.blog.hero.eyebrow} title={c.blog.hero.title} subtitle={c.blog.hero.subtitle} image="/images/properties/property-8.jpg" />
      <section className="section">
        <div className="container"><BlogList /></div>
      </section>
    </>
  );
}
