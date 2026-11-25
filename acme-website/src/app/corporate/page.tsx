import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { copy, isLang } from "@/content";
import LeadForm from "@/components/LeadForm";
import { Icon } from "@/components/Icon";
import { CtaBand, SectionHead } from "@/components/Sections";

export async function generateMetadata(): Promise<Metadata> {
  const lang = "en" as const;
  return isLang(lang) ? { title: copy[lang].nav.corporate, description: copy[lang].corporate.hero.subtitle } : {};
}

export default async function Corporate() {
  const lang = "en" as const;
  if (!isLang(lang)) notFound();
  const c = copy[lang];
  const k = c.corporate;

  return (
    <>
      <section className="page-hero has-image">
        <div className="hero-bg"><img src="/images/properties/property-6.jpg" alt="" /></div>
        <div className="container split-hero">
          <div>
            <span className="eyebrow">{k.hero.eyebrow}</span>
            <h1>{k.hero.title}</h1>
            <p>{k.hero.subtitle}</p>
            <ul className="tick-list">
              {k.hero.bullets.map((b) => <li key={b}><Icon name="check" size={18} />{b}</li>)}
            </ul>
          </div>
          <LeadForm kind="corporate" title={k.hero.formTitle} text={k.hero.formText} />
        </div>
      </section>

      <section className="section--tight section--navy">
        <div className="container">
          <div className="stats stats--3">
            {k.stats.map((s) => (
              <div key={s.label}><div className="stat-value">{s.value}</div><div className="stat-label">{s.label}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow={k.benefits.eyebrow} title={k.benefits.title} center />
          <div className="grid grid-3">
            {k.benefits.items.map((b) => (
              <div key={b.title} className="card">
                <div className="icon-badge"><Icon name={b.icon} /></div>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <SectionHead eyebrow={k.cases.eyebrow} title={k.cases.title} center />
          <div className="grid grid-3">
            {k.cases.items.map((x, i) => (
              <div key={x.title} className="split-media" style={{ aspectRatio: "4 / 3", boxShadow: "var(--shadow)" }}>
                <img src={`/images/properties/property-${[2, 8, 12][i]}.jpg`} alt="" loading="lazy" />
                <div className="float-badge" style={{ right: "1.2rem" }}>
                  <strong style={{ fontSize: "1.3rem" }}>{x.title}</strong>
                  {x.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={k.cta.title} text={k.cta.text} primary={{ label: k.cta.button, to: `/contact` }} />
    </>
  );
}
