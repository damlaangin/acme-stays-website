import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { copy, isLang } from "@/content";
import Calculator from "@/components/Calculator";
import LeadForm from "@/components/LeadForm";
import { FaqItem } from "@/components/FaqList";
import { Icon } from "@/components/Icon";
import { CtaBand, SectionHead } from "@/components/Sections";

export async function generateMetadata(): Promise<Metadata> {
  const lang = "en" as const;
  return isLang(lang) ? { title: copy[lang].nav.owners, description: copy[lang].owners.hero.subtitle } : {};
}

export default async function Homeowner() {
  const lang = "en" as const;
  if (!isLang(lang)) notFound();
  const c = copy[lang];
  const o = c.owners;
  const faq = c.faq.categories.find((x) => x.id === "owners")!;

  return (
    <>
      <section className="page-hero has-image">
        <div className="hero-bg"><img src="/images/properties/property-4.jpg" alt="" /></div>
        <div className="container split-hero">
          <div>
            <span className="eyebrow">{o.hero.eyebrow}</span>
            <h1>{o.hero.title}</h1>
            <p>{o.hero.subtitle}</p>
            <ul className="tick-list">
              {o.hero.bullets.map((b) => <li key={b}><Icon name="check" size={18} />{b}</li>)}
            </ul>
          </div>
          <LeadForm kind="owner" title={o.hero.formTitle} text={o.hero.formText} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow={o.benefits.eyebrow} title={o.benefits.title} center />
          <div className="grid grid-3">
            {o.benefits.items.map((b) => (
              <div key={b.title} className="card">
                <div className="icon-badge"><Icon name={b.icon} /></div>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container">
          <SectionHead eyebrow={o.process.eyebrow} title={o.process.title} />
          <div className="steps">
            {o.process.items.map((s) => (
              <div key={s.title} className="step">
                <span className="step-time">{s.time}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow={o.plans.eyebrow} title={o.plans.title} text={o.plans.subtitle} center />
          <div className="grid grid-3" style={{ alignItems: "stretch" }}>
            {o.plans.items.map((p, i) => (
              <div key={p.name} className={`card plan ${i === 1 ? "is-popular" : ""}`}>
                {i === 1 && <span className="plan-flag">{o.plans.popular}</span>}
                <h3>{p.name}</h3>
                <div className="plan-rate">{p.rate}</div>
                <p>{p.text}</p>
                <ul>
                  {p.features.map((f) => <li key={f}><Icon name="check" size={16} />{f}</li>)}
                </ul>
                <Link href="#valuation" className={`btn ${i === 1 ? "btn-accent" : "btn-outline"}`}>{o.plans.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <SectionHead eyebrow={o.calculator.eyebrow} title={o.calculator.title} center />
          <Calculator />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow={o.results.eyebrow} title={o.results.title} center />
          <div className="stats stats--light">
            {o.results.items.map((s) => (
              <div key={s.label}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container" style={{ maxWidth: 860 }}>
          <SectionHead eyebrow={c.home.faq.eyebrow} title={faq.title} center />
          {faq.items.map((i) => <FaqItem key={i.q} q={i.q} a={i.a} />)}
        </div>
      </section>

      <CtaBand title={o.cta.title} text={o.cta.text} primary={{ label: o.cta.button, to: "#valuation" }} />
    </>
  );
}
