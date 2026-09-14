import { images } from "./images";

export const FULL_MENU_URL =
  "https://drive.google.com/drive/folders/1WcSPM2tIlN13lUfKSvUhaSW-K6mtzrSj";

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=The+Lukla+Himalayan+%26+South+Indian+Kitchen%2C+1+Prospect+Pointe+Unit+5%2C+Niagara+Falls%2C+NY+14303%2C+USA&query_place_id=ChIJO0zGfQBD04kRRgf8Ra4kKFA";

export const PHONE_DISPLAY = "(716) 461-3694";
export const PHONE_HREF = "tel:+17164613694";
export const WHATSAPP_URL = "https://wa.me/17164613694";
export const EMAIL = "info@thelukla.com";

export type MenuLine = {
  name: string;
  note?: string;
  price: string;
};

export type MenuGroup = {
  title: string;
  kicker: string;
  image: string;
  lines: MenuLine[];
};

export const MENU_GROUPS: MenuGroup[] = [
  {
    title: "Momos",
    kicker: "10 pieces, with house achar",
    image: images.pill.momo,
    lines: [
      { name: "Chicken Steam Momo", price: "11.95" },
      { name: "Chicken Jhol Momo", note: "In warm sesame broth", price: "13.95" },
      { name: "Veg Steam Momo", price: "10.95" },
      { name: "Veg Fried Momo", price: "11.95" },
    ],
  },
  {
    title: "Dosa & Idli",
    kicker: "From the South Indian griddle",
    image: images.pill.dosa,
    lines: [
      { name: "Masala Dosa", note: "Spiced potato, sambar, chutney", price: "12.95" },
      { name: "Plain Dosa", price: "9.95" },
      { name: "Cheese Dosa", price: "13.95" },
      { name: "Soft Idli", note: "3 pieces", price: "8.95" },
    ],
  },
  {
    title: "Tandoor & Grill",
    kicker: "With rice or garlic naan",
    image: images.pill.tandoori,
    lines: [
      { name: "Chicken Tandoori", price: "16.95" },
      { name: "Lamb Seekh Kebab", price: "18.95" },
      { name: "Grilled Salmon", note: "Lemon butter", price: "21.95" },
      { name: "Tandoori Mixed Grill", price: "24.95" },
    ],
  },
  {
    title: "Noodles & Soup",
    kicker: "Thukpa, chowmein and soups",
    image: images.pill.thukpa,
    lines: [
      { name: "Chicken Thukpa", note: "Nepali noodle soup", price: "13.95" },
      { name: "Chicken Chowmein", price: "12.95" },
      { name: "South Indian Sambar", price: "7.95" },
      { name: "Tomato Garlic Soup", price: "6.95" },
    ],
  },
];

export type Signature = {
  kitchen: "Himalayan" | "South Indian";
  name: string;
  blurb: string;
  price: string;
  image: string;
};

export const SIGNATURES: Signature[] = [
  {
    kitchen: "Himalayan",
    name: "Chicken Jhol Momo",
    blurb: "Steamed chicken dumplings served in a warm sesame and tomato broth.",
    price: "13.95",
    image: images.momo,
  },
  {
    kitchen: "South Indian",
    name: "Masala Dosa",
    blurb:
      "A thin, crisp rice crepe filled with spiced potato. Comes with sambar and coconut chutney.",
    price: "12.95",
    image: images.dosa,
  },
  {
    kitchen: "South Indian",
    name: "Goat Biryani",
    blurb: "Basmati rice layered with slow-cooked goat, whole spices and saffron.",
    price: "19.95",
    image: images.biryani,
  },
];

// Minutes after midnight in Niagara Falls time, indexed by weekday (0 is Sunday). Keep in step with HOURS.
export const OPENING_MINUTES: [number, number][] = [
  [540, 1320],
  [570, 1350],
  [570, 1350],
  [570, 1350],
  [570, 1350],
  [570, 1410],
  [540, 1410],
];

export const HOURS = [
  { day: "Monday to Thursday", time: "9:30 AM – 10:30 PM" },
  { day: "Friday", time: "9:30 AM – 11:30 PM" },
  { day: "Saturday", time: "9:00 AM – 11:30 PM" },
  { day: "Sunday", time: "9:00 AM – 10:00 PM" },
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
