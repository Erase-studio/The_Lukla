export const FULL_MENU_URL =
  "https://drive.google.com/drive/folders/1WcSPM2tIlN13lUfKSvUhaSW-K6mtzrSj";

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=The+Lukla+Himalayan+%26+South+Indian+Kitchen%2C+1+Prospect+Pointe+Unit+5%2C+Niagara+Falls%2C+NY+14303%2C+USA&query_place_id=ChIJO0zGfQBD04kRRgf8Ra4kKFA";

export const PHONE_DISPLAY = "(716) 461-3694";
export const PHONE_HREF = "tel:+17164613694";
export const WHATSAPP_URL = "https://wa.me/17164613694";
export const EMAIL = "info@thelukla.com";
export const ADDRESS = ["1 Prospect Pointe, Unit 5", "Niagara Falls, NY 14303"] as const;
export const MAP_EMBED_URL =
  "https://www.google.com/maps?q=The+Lukla+Himalayan+%26+South+Indian+Kitchen,+1+Prospect+Pointe,+Niagara+Falls,+NY+14303&output=embed";

export const BRAND_LINE = "From the Himalayas to Niagara.";

// From the restaurant's Google Business listing.
export const GOOGLE_RATING = 4.3;
export const GOOGLE_REVIEW_COUNT = 566;

export const CUISINES = [
  { name: "Himalayan", dishes: ["Momo", "Thukpa", "Chowmein"] },
  { name: "South Indian", dishes: ["Dosa", "Idli", "Sambar", "Biryani"] },
];

export type MenuLine = {
  name: string;
  note?: string;
  price: string;
};

export type MenuGroup = {
  id: string;
  title: string;
  cuisine: string;
  kicker: string;
  tags: string[];
  // File name in /public/plates. Without one, the preview shows the tags instead of a photo.
  plate: string;
  plateAlt: string;
  lines: MenuLine[];
};

export const MENU_GROUPS: MenuGroup[] = [
  {
    id: "momos",
    title: "Momos",
    cuisine: "Himalayan",
    kicker: "10 pieces, with house achar",
    tags: ["Steamed", "Jhol", "Fried"],
    plate: "momo",
    plateAlt: "Momos with tomato achar",
    lines: [
      { name: "Chicken Steam Momo", price: "14.99" },
      { name: "Chicken Jhol Momo", note: "In warm sesame broth", price: "17.99" },
      { name: "Veg Steam Momo", price: "13.99" },
      { name: "Veg Fried Momo", price: "14.99" },
    ],
  },
  {
    id: "dosa-idli",
    title: "Dosa & Idli",
    cuisine: "South Indian",
    kicker: "From the griddle",
    tags: ["Masala", "Plain", "Cheese", "Idli"],
    plate: "dosa",
    plateAlt: "Masala dosa with sambar and coconut chutney",
    lines: [
      { name: "Masala Dosa", note: "Spiced potato, onion and cilantro", price: "16.99" },
      { name: "Plain Dosa", price: "14.99" },
      { name: "Cheese Dosa", price: "17.99" },
      { name: "Soft Idli", note: "3 pieces", price: "12.99" },
    ],
  },
  {
    id: "tandoor-grill",
    title: "Tandoor & Grill",
    cuisine: "From the clay oven",
    kicker: "With rice or garlic naan",
    tags: ["Chicken", "Lamb", "Salmon"],
    plate: "tandoor",
    plateAlt: "Tandoori chicken",
    lines: [
      { name: "Chicken Tandoori", price: "19.99" },
      { name: "Lamb Seekh Kebab", price: "21.99" },
      { name: "Grilled Salmon", note: "Lemon butter", price: "21.99" },
      { name: "Tandoori Mixed Grill", price: "23.99" },
    ],
  },
  {
    id: "noodles-soup",
    title: "Noodles & Soup",
    cuisine: "Himalayan & South Indian",
    kicker: "Warm bowls from both kitchens",
    tags: ["Thukpa", "Chowmein", "Sambar"],
    plate: "thukpa",
    plateAlt: "A bowl of thukpa",
    lines: [
      { name: "Chicken Thukpa", note: "Nepali noodle soup", price: "13.99" },
      { name: "Chicken Noodles", price: "16.99" },
      { name: "South Indian Sambar", price: "12.99" },
      { name: "Tomato Garlic Soup", price: "9.99" },
    ],
  },
];

export type Signature = {
  kitchen: "Himalayan" | "South Indian";
  name: string;
  blurb: string;
  price: string;
  plate: string;
  plateAlt: string;
  href: string;
};

export const SIGNATURES: Signature[] = [
  {
    kitchen: "Himalayan",
    name: "Chicken Jhol Momo",
    blurb: "Steamed chicken dumplings served in a warm sesame and tomato broth.",
    price: "17.99",
    plate: "momo",
    plateAlt: "Momos with tomato achar",
    href: "/menu#momos",
  },
  {
    kitchen: "South Indian",
    name: "Masala Dosa",
    blurb: "A thin, crisp rice crepe filled with spiced potato, with sambar and coconut chutney.",
    price: "16.99",
    plate: "dosa",
    plateAlt: "Masala dosa with sambar and coconut chutney",
    href: "/menu#dosa-idli",
  },
  {
    kitchen: "South Indian",
    name: "Goat Biryani",
    blurb: "Aromatic rice cooked with goat, fresh herbs and nuts, served with raita.",
    price: "19.99",
    plate: "biryani",
    plateAlt: "Biryani in a clay bowl",
    href: "/menu#biryani",
  },
];

export const REVIEWS = [
  {
    name: "Gaurab G.",
    date: "May 2026",
    quote:
      "We tried the jhol momo and it was absolutely delicious. It instantly took me back to my college days. We stayed over two hours while it rained outside and no one ever rushed us.",
  },
  {
    name: "Sharmin A.",
    date: "May 2026",
    quote:
      "On our first day he offered us masala chai on the house, and the next day added a generous portion of rice just to make sure we were happy. Spacious, clean and genuinely welcoming.",
  },
  {
    name: "Puppala V.",
    date: "May 2026",
    quote:
      "Went in during heavy rain and it felt even better to sit down to something warm. The salad and rice dishes were fresh and well done. Ended with gulab jamun, the perfect comforting dessert.",
  },
];
