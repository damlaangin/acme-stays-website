import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { copy, isLang } from "@/content";
import { CtaBand, PageHero, SectionHead } from "@/components/Sections";
import { Icon } from "@/components/Icon";
import HqGallery from "@/components/HqGallery";

export async function generateMetadata(): Promise<Metadata> {
  const lang = "en" as const;
  return isLang(lang) ? { title: copy[lang].nav.about, description: copy[lang].about.hero.subtitle } : {};
}

const initials = (name: string) => name.split(" ").map((p) => p[0]).join("");

export default async function About() {
  const lang = "en" as const;
  if (!isLang(lang)) notFound();
  const c = copy[lang];
  const a = c.about;

  return (
    <>
      <PageHero eyebrow={a.hero.eyebrow} title={a.hero.title} subtitle={a.hero.subtitle} image="/images/properties/property-2.jpg" />

      <section className="section">
        <div className="container split">
          <div className="split-media"><img src="/images/properties/property-11.jpg" alt="" loading="lazy" /></div>
          <div>
            <h2>{a.story.title}</h2>
            {a.story.paragraphs.map((p) => <p key={p} style={{ fontSize: "1.08rem" }}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className="section--tight section--navy">
        <div className="container">
          <div className="stats">
            {a.numbers.map((n) => <div key={n.label}><div className="stat-value">{n.value}</div><div className="stat-label">{n.label}</div></div>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow={a.values.eyebrow} title={a.values.title} center />
          <div className="grid grid-4">
            {a.values.items.map((v) => (
              <div key={v.title} className="card">
                <div className="icon-badge"><Icon name="check" /></div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container split" style={{ alignItems: "start" }}>
          <div>
            <SectionHead eyebrow={a.timeline.eyebrow} title={a.timeline.title} />
          </div>
          <div className="timeline">
            {a.timeline.items.map((t) => (
              <div key={t.year} className="timeline-item">
                <div className="timeline-year">{t.year}</div>
                <p>{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow={a.team.eyebrow} title={a.team.title} center />
          <div className="team">
            {a.team.members.map((m) => (
              <div key={m.name} className="card member">
                <div className="avatar-initials">{initials(m.name)}</div>
                <h3>{m.name}</h3>
                <p>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HqGallery eyebrow={a.hq.eyebrow} title={a.hq.title} text={a.hq.text} />

      <CtaBand title={a.cta.title} primary={{ label: a.cta.primary, to: `/stays` }} secondary={{ label: a.cta.secondary, to: `/homeowner` }} />
    </>
  );
}
