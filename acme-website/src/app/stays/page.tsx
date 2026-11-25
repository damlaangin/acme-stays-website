import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { copy, isLang } from "@/content";
import StaysClient from "@/components/StaysClient";
import { PageHero } from "@/components/Sections";

export async function generateMetadata(): Promise<Metadata> {
  const lang = "en" as const;
  return isLang(lang) ? { title: copy[lang].nav.stays, description: copy[lang].stays.subtitle } : {};
}

export default async function Stays() {
  const lang = "en" as const;
  if (!isLang(lang)) notFound();
  const c = copy[lang];
  return (
    <>
      <PageHero eyebrow={c.nav.stays} title={c.stays.title} subtitle={c.stays.subtitle} image="/images/properties/property-12.jpg" />
      <Suspense fallback={null}>
        <StaysClient />
      </Suspense>
    </>
  );
}
