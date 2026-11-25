// Journal articles (original placeholder copy).
import type { Lang } from "./index";

export type Block = { type: "h" | "p" | "li"; text: string };
export type CategoryId = "owners" | "travel" | "guides" | "corporate";

export type Post = {
  slug: string;
  category: CategoryId;
  date: string;
  readMin: number;
  image: string;
  author: string;
  featured?: boolean;
  title: Record<Lang, string>;
  excerpt: Record<Lang, string>;
  body: Record<Lang, Block[]>;
};

export const CATEGORY_LABELS: Record<CategoryId, Record<Lang, string>> = {
  owners: { en: "For owners" },
  travel: { en: "Travel" },
  guides: { en: "Guides" },
  corporate: { en: "Corporate" },
};

export const POSTS: Post[] = [
  {
    slug: "how-to-price-your-short-term-rental",
    category: "owners",
    date: "2026-02-10",
    readMin: 6,
    image: "/images/properties/property-1.jpg",
    author: "Riley Brooks",
    featured: true,
    title: { en: "How to price your short-term rental like a revenue manager" },
    excerpt: {
      en: "A fixed nightly rate leaves money on the table. Here is how demand, events and booking windows should shape your price.",
    },
    body: {
      en: [
        { type: "p", text: "Most owners set a nightly price once and revisit it a few times a year. The best-performing homes in our portfolio change price almost every day. The difference is typically a 20–35% lift in annual revenue." },
        { type: "h", text: "Start with a realistic baseline" },
        { type: "p", text: "Look at comparable homes with similar size, finish and location, then look at what they actually earn rather than what they ask. Your baseline is the rate at which your home books roughly 70% of available nights in a normal week." },
        { type: "h", text: "Let demand move the price" },
        { type: "li", text: "Raise rates ahead of festivals, conferences and long weekends, often 4–8 weeks out." },
        { type: "li", text: "Discount gently for hard-to-fill mid-week nights, rather than slashing the whole calendar." },
        { type: "li", text: "Shorten the minimum stay for last-minute gaps, and lengthen it for peak dates." },
        { type: "h", text: "Review weekly, not yearly" },
        { type: "p", text: "Pricing is a feedback loop. Check pacing against last year, watch your booking window and adjust. Software helps, but the real edge is a team that interprets the data and acts on it every day." },
      ],
    },
  },
  {
    slug: "a-weekend-in-springfield",
    category: "travel",
    date: "2026-01-22",
    readMin: 5,
    image: "/images/properties/property-5.jpg",
    author: "Casey Morgan",
    featured: true,
    title: { en: "A perfect long weekend in Springfield" },
    excerpt: {
      en: "Rooftop breakfasts, gallery hopping and an evening on the water: our local team's favourite 72 hours.",
    },
    body: {
      en: [
        { type: "p", text: "Springfield rewards slow wandering. Our guest team lives here, so we asked them how they spend a free long weekend." },
        { type: "h", text: "Friday: settle in and stroll" },
        { type: "p", text: "Drop your bags at your Acme home, pick up pastries from the corner bakery and head to the old market. Finish with sunset drinks on a rooftop terrace and an early night." },
        { type: "h", text: "Saturday: art, coffee and the waterfront" },
        { type: "li", text: "Start at the Central Gallery before the crowds arrive." },
        { type: "li", text: "Lunch at a neighbourhood café, then walk the waterfront promenade." },
        { type: "li", text: "Book a table for dinner in the old quarter, and ask us for our short list." },
        { type: "h", text: "Sunday: a slow goodbye" },
        { type: "p", text: "Late checkout can usually be arranged. Use it for a last coffee, a final wander and one more look at the skyline." },
      ],
    },
  },
  {
    slug: "owner-checklist-before-you-list",
    category: "guides",
    date: "2026-01-08",
    readMin: 4,
    image: "/images/properties/property-3.jpg",
    author: "Taylor Quinn",
    title: { en: "The 12-point checklist before you list your home" },
    excerpt: {
      en: "From permits to pillows: what to sort out before your first guest arrives.",
    },
    body: {
      en: [
        { type: "p", text: "A smooth launch is mostly preparation. Use this checklist to make sure your home is ready for its first review." },
        { type: "li", text: "Check local rental rules and secure any required permit." },
        { type: "li", text: "Confirm your insurance covers short-term guests." },
        { type: "li", text: "Install a smart lock and agree a backup access plan." },
        { type: "li", text: "Fit smoke and carbon monoxide detectors, and add a first-aid kit." },
        { type: "li", text: "Provide two sets of hotel-quality linen per bed." },
        { type: "li", text: "Stock the kitchen with the essentials guests expect." },
        { type: "li", text: "Test Wi-Fi speed in every room and set up a workspace if you can." },
        { type: "h", text: "Then make it photogenic" },
        { type: "p", text: "Declutter, add warm lighting and a few plants, and book a professional shoot. Listing photos are the single biggest driver of clicks." },
      ],
    },
  },
  {
    slug: "why-teams-choose-serviced-homes",
    category: "corporate",
    date: "2025-12-15",
    readMin: 5,
    image: "/images/properties/property-6.jpg",
    author: "Jordan Lee",
    title: { en: "Why more teams are choosing serviced homes over hotels" },
    excerpt: {
      en: "More space, better rates and a feeling of home: the case for serviced homes on long assignments.",
    },
    body: {
      en: [
        { type: "p", text: "For stays beyond a week, hotels start to feel cramped and expensive. Serviced homes fill the gap with the comfort of a real kitchen and living room, plus hotel-style service." },
        { type: "h", text: "Cost without compromise" },
        { type: "p", text: "Companies typically save 25–40% compared with equivalent hotel rooms, once meals, laundry and extra nights are taken into account." },
        { type: "h", text: "Wellbeing matters" },
        { type: "p", text: "Travellers who can cook, work comfortably and sleep in a real bedroom are more productive and happier. That shows up in retention and in results." },
        { type: "h", text: "Simple admin" },
        { type: "p", text: "One partner, one monthly invoice and a coordinator who knows your team. It is hospitality designed around how companies actually work." },
      ],
    },
  },
  {
    slug: "five-ways-to-earn-better-reviews",
    category: "owners",
    date: "2025-11-30",
    readMin: 4,
    image: "/images/properties/property-12.jpg",
    author: "Alex Johnson",
    title: { en: "Five small things that earn five-star reviews" },
    excerpt: {
      en: "Reviews are won in the details. These small touches consistently move our guest scores.",
    },
    body: {
      en: [
        { type: "li", text: "A personal welcome message sent before arrival, with check-in details and local tips." },
        { type: "li", text: "A freshly made bed, folded towels and a small welcome snack." },
        { type: "li", text: "A strong shower, a good mattress and blackout curtains. Sleep quality shapes reviews." },
        { type: "li", text: "A reply to every message in under 15 minutes, including late at night." },
        { type: "li", text: "A friendly check-in on day two to fix anything before it becomes a complaint." },
        { type: "p", text: "None of these are expensive. All of them are consistent, and consistency is what turns good stays into five-star reviews." },
      ],
    },
  },
  {
    slug: "choosing-a-family-friendly-holiday-home",
    category: "travel",
    date: "2025-11-12",
    readMin: 5,
    image: "/images/properties/property-10.jpg",
    author: "Casey Morgan",
    title: { en: "How to choose a family-friendly holiday home" },
    excerpt: {
      en: "Pools, gardens, sleeping arrangements and safety: what to check before you book with children.",
    },
    body: {
      en: [
        { type: "p", text: "A good family home gives everyone space to be together and apart. Here is what we look at when we recommend a home to families." },
        { type: "h", text: "Sleeping arrangements" },
        { type: "p", text: "Count beds, not just bedrooms, and ask whether a cot or extra bed can be added. Separate bedrooms make evenings far easier." },
        { type: "h", text: "Outdoor space and water" },
        { type: "p", text: "Gardens and terraces give children room to play. If there is a pool, check for fencing, a safety cover and clear house rules." },
        { type: "h", text: "Practical comforts" },
        { type: "li", text: "A washing machine for muddy clothes and sandy towels." },
        { type: "li", text: "A full kitchen so you can eat when the children are hungry." },
        { type: "li", text: "Parking, so there is no carrying luggage and car seats far." },
      ],
    },
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
export const formatDate = (iso: string, lang: Lang) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
