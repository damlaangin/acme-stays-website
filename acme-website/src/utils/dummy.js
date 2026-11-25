// Central place for placeholder data: brand, contact details, blog posts, listings.
// Everything here is fictional. Replace freely.

export const BRAND = {
  name: "Acme Stays",
  legalName: "Acme Stays Ltd.",
  siteUrl: "https://www.example.com",
  email: "hello@example.com",
  phoneDisplay: "+1 555 010 0100",
  phoneRaw: "15550100100",
  whatsapp: "+15550100101",
  address: "123 Example Street, Springfield, Exampleland",
  social: {
    facebook: "https://www.facebook.com/example",
    instagram: "https://www.instagram.com/example",
    linkedin: "https://www.linkedin.com/company/example",
    twitter: "https://twitter.com/example",
  },
  logo: "/images/logo.png",
};

// ---------- Listings ----------
// Single source of truth for the demo listings. The same table is used by every project
// (owners panel, workspace, marketing website) so names, sizes, ADR and occupancy always match.
// `occupancy` is the planned share of nights booked over the last 3 months (0..1);
// `adr` is the average nightly rate in USD. Photo n (public/images/properties/property-n.jpg) belongs to listing n.
export const PROPERTY_PROFILES = [
  { name: "Skyline Penthouse",        rooms: 3, baths: 2, guests: 6, beds: 4, cleaningFee: 75, adr: 230, occupancy: 0.52 },
  { name: "Sunny Loft Downtown",      rooms: 2, baths: 1, guests: 4, beds: 2, cleaningFee: 40, adr: 135, occupancy: 0.78 },
  { name: "Cozy Garden Studio",       rooms: 1, baths: 1, guests: 2, beds: 1, cleaningFee: 30, adr: 85,  occupancy: 0.82 },
  { name: "Modern Garden House",      rooms: 3, baths: 2, guests: 6, beds: 4, cleaningFee: 65, adr: 190, occupancy: 0.6 },
  { name: "Panorama Residence",       rooms: 3, baths: 2, guests: 6, beds: 3, cleaningFee: 60, adr: 175, occupancy: 0.64 },
  { name: "Marina Open-Plan Flat",    rooms: 2, baths: 1, guests: 4, beds: 2, cleaningFee: 45, adr: 125, occupancy: 0.72 },
  { name: "Old Town View Suite",      rooms: 1, baths: 1, guests: 2, beds: 1, cleaningFee: 35, adr: 110, occupancy: 0.85 },
  { name: "Terrace Townhouse",        rooms: 3, baths: 3, guests: 7, beds: 4, cleaningFee: 70, adr: 180, occupancy: 0.62 },
  { name: "Stone Courtyard Villa",    rooms: 4, baths: 3, guests: 8, beds: 5, cleaningFee: 90, adr: 260, occupancy: 0.48 },
  { name: "Seaside Pool Villa",       rooms: 4, baths: 3, guests: 8, beds: 6, cleaningFee: 100, adr: 320, occupancy: 0.45 },
  { name: "Bright City Flat",         rooms: 1, baths: 1, guests: 3, beds: 2, cleaningFee: 35, adr: 95,  occupancy: 0.76 },
  { name: "Galata Balcony Apartment", rooms: 2, baths: 1, guests: 4, beds: 3, cleaningFee: 50, adr: 150, occupancy: 0.8 },
];

// Listing geography shared by all projects (same fictional cities as the address data).
export const PROPERTY_CITIES = PROPERTY_PROFILES.map((_, i) => {
  const n = i + 1;
  return n % 4 === 0 ? "Lakeside" : n % 2 ? "Rivertown" : "Springfield";
});

// Cities come from the shared PROPERTY_CITIES; coordinates only place the pin on the map.
const CITY_CENTERS = { Springfield: [41.0082, 28.9784], Rivertown: [38.4237, 27.1428], Lakeside: [37.2153, 28.3636] };

export const PROPERTIES = PROPERTY_PROFILES.map((profile, i) => {
  const city = PROPERTY_CITIES[i];
  const [lat, lng] = CITY_CENTERS[city];
  return {
    id: `00000000-0000-4000-8000-0000000000${String(i + 1).padStart(2, "0")}`,
    workspace_id: "00000000-0000-4000-8000-000000000000",
    title: profile.name,
    room_count: profile.rooms,
    bathroom_count: profile.baths,
    square_footage: 40 + profile.rooms * 25 + i * 4,
    cleaning_fee: profile.cleaningFee,
    city,
    longitude: Number((lng + (i % 3) * 0.012).toFixed(6)),
    latitude: Number((lat + (i % 4) * 0.009).toFixed(6)),
    created_at: new Date(Date.UTC(2024, i % 12, 5)).toISOString(),
    hours_to_clean: 2,
    ical_url: null,
    images: [`photo-${i + 1}-a.jpeg`, `photo-${i + 1}-b.jpeg`, `photo-${i + 1}-c.jpeg`],
    tag: null,
    is_active: true,
  };
});

// ---------- Earnings estimate (replaces the AI-based calculator) ----------
export const FX_RATES = { TRY: 35, EUR: 0.92 }; // fixed demo rates per 1 USD

export const estimateMonthlyEarningsUsd = ({ bedrooms = 1, location = "" } = {}) => {
  const cityFactor = /springfield/i.test(location) ? 1.25 : /rivertown/i.test(location) ? 1.05 : 0.95;
  const usd = 700 + Math.max(1, Number(bedrooms) || 1) * 1100 * cityFactor;
  return Math.min(8000, Math.max(720, Math.round(usd)));
};
