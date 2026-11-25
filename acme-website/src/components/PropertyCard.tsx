"use client";

import Link from "next/link";
import { useLang } from "@/utils/i18n/LanguageContext";
import { money, type Listing } from "@/content/listings";
import { Icon } from "./Icon";

export default function PropertyCard({ listing }: { listing: Listing }) {
  const { lang, c, href } = useLang();
  return (
    <Link href={href(`/stays/${listing.slug}`)} className="prop-card">
      <div className="prop-media">
        <img src={listing.photos[0]} alt={listing.name} loading="lazy" />
        <span className="tag">{listing.city}</span>
      </div>
      <div className="prop-body">
        <div className="prop-top">
          <span className="prop-city">{listing.country}</span>
          <span className="rating">
            <Icon name="star" size={15} /> {listing.rating.toFixed(1)}
            <span style={{ color: "var(--color-text-muted)", fontWeight: 400 }}>({listing.reviews})</span>
          </span>
        </div>
        <h3>{listing.name}</h3>
        <div className="prop-meta">
          <span><Icon name="bed" size={16} /> {listing.rooms} {listing.rooms === 1 ? c.common.bedroom : c.common.bedrooms}</span>
          <span><Icon name="bath" size={16} /> {listing.baths} {listing.baths === 1 ? c.common.bath : c.common.bathrooms}</span>
          <span><Icon name="users" size={16} /> {listing.guests} {c.common.guests}</span>
        </div>
        <div className="prop-foot">
          <span className="price">
            {money(listing.price, lang)} <small>/ {c.common.perNight}</small>
          </span>
          <span className="link-arrow">{c.common.viewStay} <Icon name="arrow" size={16} /></span>
        </div>
      </div>
    </Link>
  );
}
