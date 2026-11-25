import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { copy, isLang } from "@/content";
import LeadForm from "@/components/LeadForm";
import { PageHero } from "@/components/Sections";
import { Icon } from "@/components/Icon";
import { BRAND } from "@/utils/dummy";
import HqGallery from "@/components/HqGallery";

export async function generateMetadata(): Promise<Metadata> {
  const lang = "en" as const;
  return isLang(lang) ? { title: copy[lang].nav.contact, description: copy[lang].contact.hero.subtitle } : {};
}

export default async function Contact() {
  const lang = "en" as const;
  if (!isLang(lang)) notFound();
  const c = copy[lang];
  return (
    <>
      <PageHero eyebrow={c.contact.hero.eyebrow} title={c.contact.hero.title} subtitle={c.contact.hero.subtitle} image="/images/properties/property-11.jpg" />
      <section className="section">
        <div className="container split" style={{ alignItems: "start" }}>
          <div className="contact-info">
            <h2>{c.contact.info.title}</h2>
            <div><Icon name="pin" size={22} /><span><strong>{c.contact.info.visit}</strong>{BRAND.address}</span></div>
            <div><Icon name="phone" size={22} /><span><strong>{BRAND.phoneDisplay}</strong>{c.contact.info.hours}</span></div>
            <div><Icon name="mail" size={22} /><span><strong>{BRAND.email}</strong>{c.contact.info.support}</span></div>
          </div>
          <LeadForm kind="contact" title={c.contact.formTitle} />
        </div>
      </section>
      <HqGallery eyebrow={c.about.hq.eyebrow} title={c.about.hq.title} text={c.about.hq.text} />
    </>
  );
}
