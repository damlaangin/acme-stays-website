import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { copy, isLang } from "@/content";
import { AMENITIES, LISTINGS, getListing, money } from "@/content/listings";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import LeadForm from "@/components/LeadForm";
import PropertyCard from "@/components/PropertyCard";
import { Icon } from "@/components/Icon";

export function generateStaticParams() {
  return LISTINGS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const lang = "en" as const;
  const { slug } = await params;
  const listing = getListing(slug);
  if (!isLang(lang) || !listing) return {};
  return { title: listing.name, description: listing.about[lang], openGraph: { images: [listing.photos[0]] } };
}

export default async function StayDetail({ params }: { params: Promise<{ slug: string }> }) {
  const lang = "en" as const;
  const { slug } = await params;
  if (!isLang(lang)) notFound();
  const listing = getListing(slug);
  if (!listing) notFound();
  const c = copy[lang];
  const s = c.stay;
  const bbox = `${listing.lng - 0.012}%2C${listing.lat - 0.007}%2C${listing.lng + 0.012}%2C${listing.lat + 0.007}`;
  const similar = LISTINGS.filter((l) => l.id !== listing.id && (l.city === listing.city || Math.abs(l.price - listing.price) < 40)).slice(0, 3);

  return (
    <div style={{ paddingTop: "calc(var(--header-h) + 1.5rem)" }}>
      <div className="container">
        <Link href={`/stays`} className="crumb"><Icon name="back" size={16} /> {s.back}</Link>
        <div className="gallery">
          <img className="g-main" src={listing.photos[0]} alt={listing.name} />
          <img src={listing.photos[1]} alt="" />
          <img src={listing.photos[2]} alt="" />
        </div>

        <div className="detail">
          <div>
            <div className="detail-block" style={{ paddingTop: 0 }}>
              <span className="eyebrow">{listing.city} · {listing.country}</span>
              <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: ".5rem" }}>{listing.name}</h1>
              <div className="facts">
                <span><Icon name="star" size={16} /> {listing.rating.toFixed(2)} · {listing.reviews} {c.common.reviews}</span>
                <span><Icon name="users" size={16} /> {listing.guests} {c.common.guests}</span>
                <span><Icon name="bed" size={16} /> {listing.rooms} {listing.rooms === 1 ? c.common.bedroom : c.common.bedrooms}</span>
                <span><Icon name="bath" size={16} /> {listing.baths} {listing.baths === 1 ? c.common.bath : c.common.bathrooms}</span>
                <span><Icon name="shield" size={16} /> {s.verified}</span>
              </div>
            </div>

            <div className="detail-block">
              <h2 style={{ fontSize: "1.6rem" }}>{s.about}</h2>
              <p style={{ fontSize: "1.08rem" }}>{listing.about[lang]}</p>
            </div>

            <div className="detail-block">
              <h2 style={{ fontSize: "1.6rem" }}>{s.amenities}</h2>
              <ul className="amenities">
                {listing.amenities.map((a) => (
                  <li key={a}><Icon name={a} size={20} />{AMENITIES[a][lang]}</li>
                ))}
              </ul>
            </div>

            <div className="detail-block">
              <h2 style={{ fontSize: "1.6rem" }}>{s.availability}</h2>
              <p>{s.availabilityHint}</p>
              <AvailabilityCalendar listingId={listing.id} />
            </div>

            <div className="detail-block">
              <h2 style={{ fontSize: "1.6rem" }}>{s.location}</h2>
              <p><strong>{s.neighbourhood}:</strong> {listing.neighbourhood[lang]}</p>
              <iframe
                className="map-frame"
                title={`${listing.name} map`}
                loading="lazy"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${listing.lat}%2C${listing.lng}`}
              />
            </div>

            <div className="detail-block">
              <h2 style={{ fontSize: "1.6rem" }}>{s.rules}</h2>
              <ul className="tick-list">
                {s.rulesList.map((r) => <li key={r}><Icon name="check" size={18} />{r}</li>)}
              </ul>
            </div>
          </div>

          <aside className="aside">
            <div className="card" style={{ padding: "1.4rem 1.6rem" }}>
              <div className="price">{money(listing.price, lang)} <small>/ {c.common.perNight}</small></div>
              <p style={{ margin: ".2rem 0 0", fontSize: ".85rem" }}>{c.stays.allIn}</p>
              <ul className="guarantee">
                {s.guarantee.map((g) => <li key={g}><Icon name="check" size={16} />{g}</li>)}
              </ul>
            </div>
            <LeadForm kind="inquiry" title={s.inquiryTitle} text={s.inquiryText} subject={listing.name} />
          </aside>
        </div>

        <section className="section">
          <h2>{s.similar}</h2>
          <div className="grid grid-3">
            {similar.map((l) => <PropertyCard key={l.id} listing={l} />)}
          </div>
        </section>
      </div>
    </div>
  );
}
