// Presentation data for the 12 demo listings. Core facts (names, sizes, ADR, cities, coordinates)
// come from the shared PROPERTY_PROFILES / PROPERTIES in utils/dummy.js so every Acme demo project agrees.
import { PROPERTIES, PROPERTY_PROFILES } from "@/utils/dummy";
import type { Lang } from "./index";

export type AmenityId =
  | "wifi" | "kitchen" | "ac" | "washer" | "parking" | "tv" | "balcony" | "pool"
  | "garden" | "workspace" | "elevator" | "bbq" | "view" | "heating";

export const AMENITIES: Record<AmenityId, { en: string }> = {
  wifi: { en: "Fast Wi-Fi" },
  kitchen: { en: "Fully equipped kitchen" },
  ac: { en: "Air conditioning" },
  washer: { en: "Washing machine" },
  parking: { en: "Free parking" },
  tv: { en: "Smart TV" },
  balcony: { en: "Balcony or terrace" },
  pool: { en: "Private pool" },
  garden: { en: "Garden" },
  workspace: { en: "Dedicated workspace" },
  elevator: { en: "Elevator" },
  bbq: { en: "Barbecue area" },
  view: { en: "Panoramic view" },
  heating: { en: "Heating" },
};

const AMENITY_SETS: AmenityId[][] = [
  ["wifi", "kitchen", "ac", "washer", "tv", "balcony", "view", "elevator", "workspace"],
  ["wifi", "kitchen", "ac", "washer", "tv", "workspace", "heating", "elevator"],
  ["wifi", "kitchen", "washer", "garden", "tv", "heating", "parking"],
  ["wifi", "kitchen", "ac", "washer", "parking", "garden", "bbq", "tv", "heating"],
  ["wifi", "kitchen", "ac", "washer", "tv", "view", "balcony", "elevator", "workspace"],
  ["wifi", "kitchen", "ac", "washer", "tv", "workspace", "elevator", "heating"],
  ["wifi", "kitchen", "ac", "tv", "view", "balcony", "heating"],
  ["wifi", "kitchen", "ac", "washer", "parking", "balcony", "garden", "tv", "bbq"],
  ["wifi", "kitchen", "ac", "washer", "parking", "garden", "bbq", "tv", "heating"],
  ["wifi", "kitchen", "ac", "washer", "parking", "pool", "garden", "bbq", "tv"],
  ["wifi", "kitchen", "ac", "washer", "tv", "workspace", "elevator"],
  ["wifi", "kitchen", "ac", "washer", "tv", "balcony", "view", "heating", "workspace"],
];

const BLURBS: { en: string }[] = [
  { en: "A light-filled penthouse with floor-to-ceiling glass, a wraparound terrace and uninterrupted skyline views. Ideal for celebrations, long weekends and guests who like to be impressed." },
  { en: "A stylish loft in the middle of the action: open-plan living, a chef-ready kitchen and cafés, galleries and transit on the doorstep. Perfect for couples and small groups." },
  { en: "A calm, bright studio with a leafy garden outside the door. Everything you need for a restful solo trip or a romantic escape, at an easy price." },
  { en: "A contemporary family house wrapped in greenery, with a private garden, parking and a barbecue terrace. Space for everyone to spread out and still sit down together." },
  { en: "Generous living spaces and sweeping city panoramas make this residence a favourite for families and remote teams who want room to breathe." },
  { en: "A sleek open-plan flat with a marble kitchen island, designed for slow breakfasts and dinners with friends. Walkable to the waterfront and the best restaurants." },
  { en: "A romantic suite with warm interiors and a balcony overlooking the old town rooftops. The kind of place you plan the whole trip around." },
  { en: "A three-level townhouse with a landscaped entrance, a sunny terrace and three bathrooms. Great for families and groups who value privacy." },
  { en: "A stone villa wrapped around a sun-warmed courtyard with a fire pit and olive trees. Slow mornings, long dinners and room for eight." },
  { en: "A white modern villa with a private pool, sun terraces and sea breezes. The ultimate holiday home for families and friends." },
  { en: "A bright, clean-lined city flat with a dining nook and a quiet bedroom. Thoughtfully priced and ideal for short work trips." },
  { en: "A warm, character-filled apartment with a balcony facing the historic tower. Wake up to the view, then step out into the liveliest streets in town." },
];

const NEIGHBOURHOOD: Record<string, { en: string }> = {
  Springfield: { en: "Springfield city centre: cafés, galleries and transit within a short walk." },
  Rivertown: { en: "Rivertown's historic quarter: leafy lanes, markets and riverside walks nearby." },
  Lakeside: { en: "Lakeside's quiet residential area: gardens, lake paths and a relaxed pace." },
};

const RATINGS = [4.9, 4.8, 4.95, 4.7, 4.85, 4.8, 4.9, 4.75, 4.85, 4.9, 4.7, 4.95];
const REVIEW_COUNTS = [64, 112, 87, 41, 56, 73, 129, 38, 29, 47, 95, 108];

export type Listing = {
  id: string;
  slug: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  rooms: number;
  baths: number;
  beds: number;
  guests: number;
  price: number;
  cleaningFee: number;
  rating: number;
  reviews: number;
  photos: string[];
  amenities: AmenityId[];
  about: { en: string };
  neighbourhood: { en: string };
};

const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const LISTINGS: Listing[] = PROPERTIES.map((p: any, i: number) => {
  const profile = PROPERTY_PROFILES[i];
  return {
    id: String(i + 1),
    slug: slugify(profile.name),
    name: profile.name,
    city: p.city as string,
    country: i % 4 === 3 ? "Sampleland" : "Exampleland",
    lat: p.latitude,
    lng: p.longitude,
    rooms: profile.rooms,
    baths: profile.baths,
    beds: profile.beds,
    guests: profile.guests,
    price: profile.adr,
    cleaningFee: profile.cleaningFee,
    rating: RATINGS[i],
    reviews: REVIEW_COUNTS[i],
    photos: [0, 1, 2].map((n) => `/images/properties/property-${((i + n) % 12) + 1}.jpg`),
    amenities: AMENITY_SETS[i],
    about: BLURBS[i],
    neighbourhood: NEIGHBOURHOOD[p.city],
  };
});

export const CITIES = ["Springfield", "Rivertown", "Lakeside"] as const;
export const getListing = (slug: string) => LISTINGS.find((l) => l.slug === slug);
export const cityCount = (city: string) => LISTINGS.filter((l) => l.city === city).length;
export const money = (value: number, lang: Lang) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
