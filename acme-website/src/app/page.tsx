import Link from "next/link";
import { notFound } from "next/navigation";
import { copy, isLang } from "@/content";
import { LISTINGS, cityCount } from "@/content/listings";
import { POSTS } from "@/content/blog";
import PropertyCard from "@/components/PropertyCard";
import SearchCard from "@/components/SearchCard";
import { Icon } from "@/components/Icon";
import { CtaBand, PostCard, SectionHead, Stars } from "@/components/Sections";

const FEATURED = [0, 1, 3, 8, 9, 11];
const DEST_IMAGES = ["/images/properties/property-1.jpg", "/images/properties/property-7.jpg", "/images/properties/property-10.jpg"];

export default async function Home() {
  const lang = "en" as const;
  if (!isLang(lang)) notFound();
  const c = copy[lang];
  const h = c.home;
  const href = (p: string) => p;

  return (
    <>
      <section className="hero">
        <div className="hero-bg"><img src="/images/properties/property-5.jpg" alt="" /></div>
        <div className="container">
          <span className="eyebrow">{h.hero.eyebrow}</span>
          <h1>{h.hero.title}</h1>
          <p>{h.hero.subtitle}</p>
          <div className="hero-chips">
            {h.hero.chips.map((chip) => (
              <span key={chip} className="chip"><Icon name="check" size={14} /> {chip}</span>
            ))}
          </div>
        </div>
        <SearchCard />
      </section>

      <section className="section after-search">
        <div className="container">
          <div className="head-row">
            <SectionHead eyebrow={h.featured.eyebrow} title={h.featured.title} text={h.featured.subtitle} />
            <Link href={href("/stays")} className="btn btn-outline">{h.featured.cta}</Link>
          </div>
          <div className="grid grid-3">
            {FEATURED.map((i) => <PropertyCard key={LISTINGS[i].id} listing={LISTINGS[i]} />)}
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container">
          <div className="stats">
            {h.stats.map((s) => (
              <div key={s.label}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow={h.why.eyebrow} title={h.why.title} center />
          <div className="grid grid-4">
            {h.why.items.map((it) => (
              <div key={it.title} className="card">
                <div className="icon-badge"><Icon name={it.icon} /></div>
                <h3>{it.title}</h3>
                <p>{it.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <SectionHead eyebrow={h.destinations.eyebrow} title={h.destinations.title} center />
          <div className="grid grid-3">
            {h.destinations.items.map((d, i) => (
              <Link key={d.city} href={`/stays?city=${d.city}`} className="dest">
                <img src={DEST_IMAGES[i]} alt="" loading="lazy" />
                <div className="dest-body">
                  <h3>{d.city}</h3>
                  <p>{d.text}</p>
                  <span className="dest-count">{cityCount(d.city)} {h.destinations.homes}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split-media">
            <img src="/images/properties/property-9.jpg" alt="" loading="lazy" />
            <div className="float-badge"><strong>+48%</strong>{c.owners.results.items[0].label}</div>
          </div>
          <div>
            <span className="eyebrow">{h.owners.eyebrow}</span>
            <h2>{h.owners.title}</h2>
            <p>{h.owners.text}</p>
            <ul className="tick-list">
              {h.owners.bullets.map((b) => <li key={b}><Icon name="check" size={18} />{b}</li>)}
            </ul>
            <div style={{ display: "flex", gap: ".8rem", flexWrap: "wrap", marginTop: "2rem" }}>
              <Link href={href("/homeowner#valuation")} className="btn btn-primary">{h.owners.primary}</Link>
              <Link href={href("/homeowner")} className="btn btn-outline">{h.owners.secondary}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container">
          <SectionHead eyebrow={h.steps.eyebrow} title={h.steps.title} />
          <div className="steps">
            {h.steps.items.map((s) => (
              <div key={s.title} className="step">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow={h.testimonials.eyebrow} title={h.testimonials.title} center />
          <div className="grid grid-4">
            {h.testimonials.items.map((t) => (
              <div key={t.name} className="card quote">
                <Stars n={t.rating} />
                <p>“{t.text}”</p>
                <div className="person">
                  <span className="avatar-initials" style={{ width: 46, height: 46, fontSize: "1rem" }}>{t.name.slice(0, 1)}</span>
                  <div><strong>{t.name}</strong><span>{t.role}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <div className="head-row">
            <SectionHead eyebrow={h.journal.eyebrow} title={h.journal.title} />
            <Link href={href("/blogs")} className="btn btn-outline">{h.journal.cta}</Link>
          </div>
          <div className="grid grid-3">
            {POSTS.slice(0, 3).map((p) => <PostCard key={p.slug} post={p} lang={lang} readLabel={c.common.readMore} minLabel={c.common.minRead} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <SectionHead eyebrow={h.faq.eyebrow} title={h.faq.title} center />
          <FaqPreview lang={lang} />
          <div className="center mt-2"><Link href={href("/faqs")} className="link-arrow">{h.faq.cta} <Icon name="arrow" size={16} /></Link></div>
        </div>
      </section>

      <CtaBand
        title={h.final.title}
        text={h.final.text}
        primary={{ label: h.final.primary, to: href("/stays") }}
        secondary={{ label: h.final.secondary, to: href("/contact") }}
      />
    </>
  );
}

function FaqPreview({ lang }: { lang: "en" }) {
  const items = copy[lang].faq.categories[0].items.slice(0, 4).concat(copy[lang].faq.categories[1].items.slice(0, 2));
  return (
    <div>
      {items.map((i) => (
        <details key={i.q} className="faq-item">
          <summary>{i.q}<Icon name="plus" size={22} /></summary>
          <div className="faq-answer"><p>{i.a}</p></div>
        </details>
      ))}
    </div>
  );
}
