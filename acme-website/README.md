# Acme Stays: holiday-home website (demo)

An English-language marketing site for a fictional holiday-home and rental-management company, built with **Next.js 15 (App Router)**, **React 19** and **TypeScript**. Palette: navy + antique gold on warm cream; typeface: Montserrat.

> Everything here is **placeholder content** written for this demo: brand, copy, people, listings and prices. Photos and logos were supplied by the author. There is no backend: forms are validated and discarded, the earnings estimate is calculated locally and availability is generated.

## Pages
- `/` Home: hero search, featured stays, destinations, owner pitch, how it works, testimonials, journal, FAQ
- `/stays` Search and filter 12 homes; `/stays/[slug]` detail with gallery, amenities, availability calendar, map and enquiry form
- `/homeowner` Rent your home: benefits, onboarding, pricing plans, earnings calculator, valuation form
- `/corporate` Corporate stays and quote form
- `/whoweare`, `/faqs`, `/blogs` (+ articles), `/contact`, `/privacy`, `/terms`

## Structure
- `src/content/en.ts`: all UI copy
- `src/content/listings.ts`: presentation data for the 12 homes (built on the shared `PROPERTY_PROFILES` in `src/utils/dummy.js`)
- `src/content/blog.ts`: journal articles
- `src/app/globals.css`: design tokens and component styles
- `src/app/api/*`: mock endpoints (`submit-quote`, `calculate-earnings`, `availability`)

## Getting started
```bash
npm install
npm run dev   # http://localhost:3000
```

## Notes
- `PROPERTY_PROFILES` (names, sizes, ADR, occupancy) is shared verbatim with the Acme Workspace and Owners Panel demos so every app agrees on the same 12 homes.
