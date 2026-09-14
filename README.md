# The Lukla — Website

Marketing website for **The Lukla Himalayan & South Indian Kitchen**, 1 Prospect Pointe, Niagara Falls, NY.

Built with **Next.js 16 (App Router)**, **Tailwind CSS v4**, **Framer Motion**, and **TypeScript**.

---

## Getting started

```bash
npm install
```

Copy the env template and fill in your Google Places API key:

```bash
cp .env.example .env.local
```

> The site falls back to hardcoded data if the key is absent, so local development works without it.

```bash
npm run dev      # http://localhost:3000
npm run build
npm run start
```

---

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `GOOGLE_PLACES_API_KEY` | For live reviews | Google Places API (New) key. Enable it at [console.cloud.google.com](https://console.cloud.google.com/). |

---

## Adding real food photos

Drop image files into `/public/hero/` named after the slot they should fill:

| File name | Slot |
|---|---|
| `momo.jpg` / `momo.png` / `momo.webp` | Top-left corner plate |
| `dosa.jpg` / `dosa.png` / `dosa.webp` | Top-right corner plate |
| `biryani.jpg` / `biryani.png` / `biryani.webp` | Bottom-left corner plate |
| `chai.jpg` / `chai.png` / `chai.webp` | Bottom-right corner plate |

PNG/WebP files are treated as transparent cutouts (no circular mask). JPGs are cropped into a round circle.

The site picks them up automatically on the next build — no code changes needed.

---

## Project structure

```
src/
  app/
    layout.tsx        Root layout, fonts, metadata
    page.tsx          Single page — fetches Google Places data server-side
    globals.css       Tailwind v4 + design tokens
  components/
    SiteHeader.tsx    Fixed nav with real-time open/closed status
    Hero.tsx          Parallax hero with skyline SVG and plate photos
    Story.tsx         About section
    Dishes.tsx        Signature dish cards
    Menu.tsx          Accordion menu with prices
    Reviews.tsx       Rotating review carousel (live from Google)
    FallsBand.tsx     Parallax Niagara Falls photo band
    Visit.tsx         Hours, address, contact
    Footer.tsx
    Reveal.tsx        Scroll-triggered fade-in wrapper
    MotionProvider.tsx  Framer Motion config (respects prefers-reduced-motion)
    icons.tsx         Inline SVG icons
  lib/
    google-reviews.ts  Google Places API fetcher with fallback
    menu-data.ts       Menu items, prices, hours, contact info
    images.ts          Unsplash image URLs
    local-photos.ts    Reads /public/hero/ at build time
    skyline.ts         Himalayan skyline SVG path data
public/
  hero/               Drop real food photos here (see above)
  logo.png
  logo-mark.png
  thali-plate.png
  dining-room.jpg
```
