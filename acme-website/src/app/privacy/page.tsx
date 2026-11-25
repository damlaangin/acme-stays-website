import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { copy, isLang } from "@/content";
import { PageHero } from "@/components/Sections";

export async function generateMetadata(): Promise<Metadata> {
  const lang = "en" as const;
  return isLang(lang) ? { title: copy[lang].legal.privacy.title } : {};
}

export default async function Page() {
  const lang = "en" as const;
  if (!isLang(lang)) notFound();
  const l = copy[lang].legal;
  const doc = l.privacy;
  return (
    <>
      <PageHero eyebrow={copy[lang].footer.company} title={doc.title} subtitle={l.updated} />
      <section className="section">
        <div className="container legal" style={{ maxWidth: 820 }}>
          <p className="notice">{l.notice}</p>
          {doc.sections.map((s) => (
            <div key={s.h}>
              <h2>{s.h}</h2>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
