// The restaurant's full menu, transcribed from the printed menu (Google Maps photos, Aug 2025)
// and laid out as the pages of the menu book on /menu. Descriptions are shortened to fit a page.

export type BookItem = {
  name: string;
  price: string;
  count?: string;
  note?: string;
};

export type BookBlock =
  | { kind: "list"; title?: string; note?: string; items: BookItem[] }
  | {
      kind: "grid";
      title?: string;
      note?: string;
      columns: string[];
      rows: { name: string; count?: string; prices: string[] }[];
    };

export type PlateName = "momo" | "dosa" | "biryani" | "chai";

export type BookPage = {
  id: string;
  kitchen: string;
  title: string;
  note?: string;
  plate?: PlateName;
  // Pages with room to spare get a faint mountain range along the bottom.
  range?: boolean;
  blocks: BookBlock[];
};

const list = (items: BookItem[], title?: string, note?: string): BookBlock => ({
  kind: "list",
  title,
  note,
  items,
});

// Menu pages in reading order. In the book they follow the cover and the contents page.
export const BOOK_PAGES: BookPage[] = [
  {
    id: "momos",
    range: true,
    kitchen: "Himalayan",
    title: "Momos",
    note: "Ten to a plate: steamed, fried, or jhol, in a warm sesame and tomato broth.",
    plate: "momo",
    blocks: [
      {
        kind: "grid",
        columns: ["Steam", "Fried", "Jhol"],
        rows: [
          { name: "Veg", count: "10 pcs", prices: ["13.99", "14.99", "15.99"] },
          { name: "Chicken", count: "10 pcs", prices: ["14.99", "15.99", "17.99"] },
        ],
      },
      list(
        [
          { name: "Veg or Paneer Noodles", price: "15.99" },
          { name: "Chicken Noodles", price: "16.99" },
          { name: "Shrimp Noodles", price: "17.99" },
        ],
        "Chowmein",
      ),
    ],
  },
  {
    id: "appetizers-veg",
    kitchen: "Appetizers",
    title: "Veg appetizers",
    note: "Chaat is spiced to your taste.",
    blocks: [
      list([
        { name: "Veg Pakora", count: "6 pcs", price: "9.99", note: "Mixed vegetable fritters in our homemade batter" },
        { name: "Paneer Pakora", count: "6 pcs", price: "10.99", note: "Homemade cheese in chickpea batter, deep fried" },
        { name: "Samosa", count: "2 pcs", price: "7.99", note: "Homemade pastries filled with potato and Himalayan spices" },
        { name: "Aloo Tikki", count: "3 pcs", price: "6.99", note: "Potato cutlets with Himalayan spices" },
        { name: "Samosa Chaat", price: "10.99", note: "Samosa, chickpeas, onion, cucumber, yogurt, mint and tamarind sauces" },
        { name: "Aloo Tikki Chaat", price: "10.99", note: "Aloo tikki, chickpeas, onion, cucumber, yogurt, mint and tamarind sauces" },
      ]),
    ],
  },
  {
    id: "appetizers-chicken",
    kitchen: "Appetizers",
    title: "Chicken appetizers",
    note: "Fries, nuggets and fingers are chicken breast in a spiced egg and cornstarch batter.",
    blocks: [
      list([
        { name: "Chicken Pakora", price: "10.99", note: "Sliced chicken breast in Himalayan spices and homemade batter" },
        { name: "Chicken Fries", price: "7.99" },
        { name: "Chicken Nuggets", price: "7.99" },
        { name: "Chicken Fingers & Fries", price: "10.99" },
        { name: "Chicken Chilly / 65", price: "17.99", note: "Chicken breast sautéed with fresh ginger, garlic and Himalayan spices" },
        { name: "Chicken Wings", count: "6 pcs", price: "12.99", note: "Marinated in mustard oil, ginger, garlic, pepper and lemon" },
      ]),
    ],
  },
  {
    id: "soups-salads",
    kitchen: "From both kitchens",
    title: "Soups & salads",
    blocks: [
      list(
        [
          { name: "Vegetable Soup", price: "9.99", note: "Minced vegetables cooked with lentils" },
          { name: "Tomato Garlic Soup", price: "9.99", note: "Fresh tomatoes sautéed with garlic" },
          { name: "South Indian Sambar Soup", price: "12.99" },
          { name: "Chicken Thukpa", price: "13.99", note: "Nepali noodle soup with chicken" },
        ],
        "Soup",
      ),
      list(
        [
          { name: "House Salad", price: "10.99", note: "Lettuce, cucumber, carrot, tomato, onion, olive, croutons, ranch" },
          { name: "Chicken Salad", price: "17.99", note: "House salad with grilled chicken breast and ranch" },
        ],
        "Salad",
      ),
    ],
  },
  {
    id: "dosa-idli",
    range: true,
    kitchen: "South Indian",
    title: "Dosa & idli",
    note: "Made from a fermented batter of ground rice and black gram.",
    plate: "dosa",
    blocks: [
      list([
        { name: "Plain Dosa", price: "14.99", note: "The simple, crisp crepe" },
        { name: "Masala Dosa", price: "16.99", note: "Filled with spiced potato, onion and cilantro" },
        { name: "Cheese Dosa", price: "17.99", note: "Filled with grated American cheese and butter" },
        { name: "Soft Idli", count: "3 pcs", price: "12.99", note: "Soft steamed rice cakes" },
      ]),
    ],
  },
  {
    id: "tandoor",
    range: true,
    kitchen: "From the clay oven",
    title: "Tandoor",
    blocks: [
      list([
        { name: "Chicken Tandoori", price: "19.99", note: "With garlic naan" },
        { name: "Chicken Seekh Kebab", price: "18.99", note: "With white rice" },
        { name: "Lamb Seekh Kebab", price: "21.99", note: "With white rice" },
        { name: "Shrimp Tandoori", price: "21.99", note: "With white rice" },
        { name: "Grilled Salmon", price: "21.99", note: "With lemon butter sauce and rice" },
        { name: "Tandoori Mixed Grill", price: "23.99", note: "Chicken tandoori, lamb seekh kebab and 2 shrimp" },
      ]),
    ],
  },
  {
    id: "biryani",
    kitchen: "South Indian",
    title: "Biryani",
    note: "Aromatic rice cooked with fresh herbs and nuts, served with raita.",
    plate: "biryani",
    blocks: [
      list([
        { name: "Vegetable Biryani", price: "15.99" },
        { name: "Chicken Biryani", price: "17.99" },
        { name: "Goat Biryani", price: "19.99" },
        { name: "Lamb Biryani", price: "19.99" },
        { name: "Shrimp Biryani", price: "18.99" },
      ]),
      list(
        [
          { name: "Veg Fried Rice", price: "14.99" },
          { name: "Paneer Fried Rice", price: "16.99" },
          { name: "Chicken Fried Rice", price: "16.99" },
          { name: "Shrimp Fried Rice", price: "18.99" },
        ],
        "Fried rice",
        "Indo-Chinese style, served with raita",
      ),
    ],
  },
  {
    id: "curries-veg",
    kitchen: "Curry with rice",
    title: "Veg curries",
    note: "Served with fluffy Nepalese basmati rice.",
    blocks: [
      list([
        { name: "Daal Tadka", price: "14.99" },
        { name: "Daal Makhani", price: "15.99" },
        { name: "Bhindi Masala", price: "15.99" },
        { name: "Chana Masala", price: "15.99" },
        { name: "Aloo Gobi", price: "15.99" },
        { name: "Matar Paneer", price: "16.99" },
        { name: "Paneer Tikka Masala", price: "16.99" },
        { name: "Palak Paneer", price: "16.99" },
        { name: "Navratan Korma", price: "16.99" },
        { name: "Gobi Manchurian", price: "16.99" },
        { name: "Malai Kofta", price: "16.99" },
        { name: "Chilli Paneer", price: "16.99" },
      ]),
    ],
  },
  {
    id: "curries-non-veg",
    kitchen: "Curry with rice",
    title: "Non-veg curries",
    note: "Served with fluffy Nepalese basmati rice.",
    blocks: [
      list([
        { name: "Egg Curry", price: "15.99" },
        { name: "Chicken Curry", price: "16.99" },
        { name: "Butter Chicken", price: "18.95" },
        { name: "Chicken Tikka Masala", price: "18.95" },
        { name: "Lamb Curry", price: "18.95" },
        { name: "Goat Curry", price: "19.95" },
        { name: "Coconut Fish Curry", price: "18.95" },
        { name: "Shrimp Curry", price: "19.99" },
        { name: "Lamb Karahi", price: "19.99" },
        { name: "Chicken Karahi", price: "17.99" },
        { name: "Paneer Karahi", price: "17.99" },
      ]),
    ],
  },
  {
    id: "breads",
    range: true,
    kitchen: "From the tandoor & tawa",
    title: "Breads",
    blocks: [
      list([
        { name: "Plain or Butter Naan", price: "5.99" },
        { name: "Garlic or Cilantro Naan", price: "5.99" },
        { name: "Cheese Naan", price: "6.99" },
        { name: "Onion Kulcha", price: "6.99" },
        { name: "Tandoori Roti", price: "4.99" },
        { name: "Tawa Roti / Chapati", price: "4.99" },
        { name: "Aloo Paratha", price: "6.99" },
        { name: "Paneer Paratha", price: "6.99" },
        { name: "Bread Basket", price: "11.99", note: "Onion kulcha, tawa roti, garlic naan and aloo paratha" },
      ]),
    ],
  },
  {
    id: "sandwiches",
    kitchen: "Quick bites",
    title: "Sandwiches & wraps",
    blocks: [
      list([
        { name: "Cheese Sandwich with Fries", price: "11.99", note: "White or wheat bread, lettuce, American cheese" },
        { name: "Vegetable Sandwich", price: "11.99", note: "Veg patty, lettuce, tomato, onion, American cheese, mayo" },
        { name: "Chicken Salad Sandwich", price: "11.99", note: "Chicken breast, lettuce, onion, tomato, black pepper" },
        { name: "Veg Wrap with Fries", price: "12.99" },
        { name: "Grilled Chicken Wrap with Fries", price: "15.99" },
      ]),
      list(
        [
          { name: "French Fries", price: "6.99" },
          { name: "Sweet Fries", price: "6.99" },
        ],
        "Fries",
      ),
    ],
  },
  {
    id: "jain",
    range: true,
    kitchen: "No onion, no garlic",
    title: "Jain menu",
    note: "Every dish on this page is cooked without onion or garlic.",
    blocks: [
      list([
        { name: "Veg Chowmein", price: "15.99" },
        { name: "Veg Sandwich", price: "11.99" },
        { name: "Chilli Paneer", price: "16.99" },
        { name: "Chilli Potato", price: "13.99" },
        { name: "Aloo Gobi", price: "14.99" },
        { name: "French Fries", price: "6.99" },
      ]),
    ],
  },
  {
    id: "vegan",
    range: true,
    kitchen: "No animal or dairy products",
    title: "Vegan menu",
    note: "Curries are served with rice.",
    blocks: [
      list([
        { name: "Veg Curry Masala", price: "15.99" },
        { name: "Rajma Rice", price: "14.99" },
        { name: "Aloo Gobi", price: "15.99" },
        { name: "Daal Fry", price: "14.99" },
        { name: "Bhindi Masala", price: "16.99" },
        { name: "Veg Fried Rice", price: "14.99" },
        { name: "Veg Pakora", count: "6 pcs", price: "8.99" },
        { name: "Veg Roll", price: "15.99" },
        { name: "Tandoori Roti", price: "4.99" },
      ]),
    ],
  },
  {
    id: "breakfast",
    range: true,
    kitchen: "Morning",
    title: "Breakfast",
    plate: "chai",
    blocks: [
      list([
        { name: "Veg or Paneer Pakora", count: "6 pcs", price: "10.99" },
        { name: "Samosa", price: "7.99" },
        { name: "Aloo Paratha", price: "5.99" },
        { name: "Chole Bhature", price: "14.99" },
        { name: "Chole Poori", price: "14.99" },
        { name: "Halwa Poori", price: "14.99" },
        { name: "Dosa or Idli", price: "15.99" },
        { name: "Tea", price: "4.99" },
        { name: "Coffee", price: "4.99" },
        { name: "Lassi", count: "mango, sweet or plain", price: "8.99" },
      ]),
    ],
  },
  {
    id: "drinks",
    kitchen: "To drink",
    title: "Drinks",
    blocks: [
      list([
        { name: "Plain Lassi", price: "7.99" },
        { name: "Sweet Lassi", price: "8.99" },
        { name: "Mango Lassi", price: "8.99" },
        { name: "Milk or Masala Tea", price: "4.99" },
        { name: "Black Tea", price: "4.99" },
        { name: "Lemon Tea", price: "4.99" },
        { name: "Black Coffee", price: "4.99" },
        { name: "Milk Coffee", price: "5.99" },
        { name: "Butter Milk", price: "5.99" },
        { name: "Soda", count: "Coke, Fanta or Sprite", price: "2.99" },
        { name: "Bottled Water", price: "1.99" },
        { name: "Mixed Fruit Salad", count: "seasonal", price: "12.99" },
      ]),
    ],
  },
];

// Page 0 is the cover and page 1 the contents, so menu pages start at 2; the back cover is last.
const FIRST_MENU_PAGE = 2;
export const BOOK_PAGE_COUNT = FIRST_MENU_PAGE + BOOK_PAGES.length + 1;
export const CONTENTS_PAGE = 1;

export function pageIndex(id: string) {
  const i = BOOK_PAGES.findIndex((page) => page.id === id);
  return i < 0 ? 0 : FIRST_MENU_PAGE + i;
}

// The contents page and the section chips above the book.
export const BOOK_SECTIONS: { id: string; label: string; short: string }[] = [
  { id: "momos", label: "Momos & chowmein", short: "Momos" },
  { id: "appetizers-veg", label: "Appetizers", short: "Appetizers" },
  { id: "soups-salads", label: "Soups & salads", short: "Soups & salads" },
  { id: "dosa-idli", label: "Dosa & idli", short: "Dosa & idli" },
  { id: "tandoor", label: "Tandoor", short: "Tandoor" },
  { id: "biryani", label: "Biryani & fried rice", short: "Biryani" },
  { id: "curries-veg", label: "Curries with rice", short: "Curries" },
  { id: "breads", label: "Breads", short: "Breads" },
  { id: "sandwiches", label: "Sandwiches & fries", short: "Sandwiches" },
  { id: "jain", label: "Jain & vegan menus", short: "Jain & vegan" },
  { id: "breakfast", label: "Breakfast", short: "Breakfast" },
  { id: "drinks", label: "Drinks", short: "Drinks" },
];

// Older links around the site (/menu#tandoor-grill and so on) still open the right page.
const HASH_ALIASES: Record<string, string> = {
  "tandoor-grill": "tandoor",
  "noodles-soup": "soups-salads",
  "biryani-rice": "biryani",
  appetizers: "appetizers-veg",
  curries: "curries-veg",
};

export function pageFromHash(hash: string) {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  if (!id) return 0;
  if (id === "contents" || id === "start-here") return CONTENTS_PAGE;
  return pageIndex(HASH_ALIASES[id] ?? id);
}

// The parts of page-flip's API the menu uses.
export type PageFlipApi = {
  flip: (page: number) => void;
  flipNext: () => void;
  flipPrev: () => void;
  getCurrentPageIndex: () => number;
  getOrientation: () => "portrait" | "landscape";
  getFlipController: () => unknown;
};
