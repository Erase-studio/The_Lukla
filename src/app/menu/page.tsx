import Image from "next/image";
import { FULL_MENU_URL, MENU_GROUPS } from "@/lib/menu-data";
import { images } from "@/lib/images";
import { Reveal } from "@/components/Reveal";
import { IconArrowUpRight } from "@/components/icons";

export const metadata = {
  title: "Menu · The Lukla",
  description:
    "Momos, dosa, biryani, thukpa, kebabs and more — the full menu at The Lukla Himalayan & South Indian Kitchen, Niagara Falls, NY.",
};

// Full menu with all groups — more detail than the home-page preview.
const ALL_GROUPS = [
  ...MENU_GROUPS,
  {
    title: "Biryani & Rice",
    kicker: "Slow-cooked, served with raita",
    image: images.biryani,
    lines: [
      { name: "Goat Biryani", note: "Basmati rice, whole spices, saffron", price: "19.95" },
      { name: "Chicken Biryani", price: "17.95" },
      { name: "Veg Biryani", price: "14.95" },
      { name: "Egg Fried Rice", price: "11.95" },
    ],
  },
  {
    title: "Chaat & Sides",
    kicker: "Starters and snacks",
    image: images.momo,
    lines: [
      { name: "Pani Puri", note: "6 pieces", price: "7.95" },
      { name: "Samosa", note: "2 pieces with chutney", price: "5.95" },
      { name: "Onion Bhaji", price: "7.95" },
      { name: "Mango Lassi", price: "5.95" },
    ],
  },
];

export default function MenuPage() {
  return (
    <main className="pt-[120px] lg:pt-[140px]">
      {/* Header band */}
      <section className="bg-wash py-20 sm:py-28">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow">Menu</p>
            <h1 className="mt-5 font-display text-[clamp(2.8rem,6vw,5rem)] leading-[1.02] tracking-[-0.02em] text-ink">
              What we cook
            </h1>
            <p className="mt-6 max-w-xl text-[18px] leading-[1.65] text-stone">
              Two cuisines, one kitchen. Himalayan food from Nepal — momos,
              thukpa, chowmein. South Indian food — dosa, idli, sambar, biryani.
              Everything cooked to order.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={FULL_MENU_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-solid"
              >
                Download full menu
                <IconArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Menu groups */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="grid gap-16 md:grid-cols-2 lg:gap-20">
            {ALL_GROUPS.map((group, i) => (
              <Reveal key={group.title} delay={i % 2 === 0 ? 0 : 0.08}>
                <div className="group">
                  {/* Category image */}
                  <div className="relative aspect-[16/7] overflow-hidden rounded-[20px] bg-wash">
                    <Image
                      src={group.image}
                      alt={group.title}
                      fill
                      sizes="(min-width:768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1400ms] ease-soft group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Items */}
                  <div className="mt-8">
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="font-display text-[clamp(1.9rem,3.5vw,2.75rem)] leading-tight text-ink">
                        {group.title}
                      </h2>
                      <p className="shrink-0 text-[14px] text-stone">
                        {group.kicker}
                      </p>
                    </div>
                    <ul className="mt-6 border-t border-ink/10">
                      {group.lines.map((line) => (
                        <li
                          key={line.name}
                          className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-4"
                        >
                          <span>
                            <span className="block text-[16px] font-medium text-ink">
                              {line.name}
                            </span>
                            {"note" in line && line.note && (
                              <span className="mt-0.5 block text-[14px] text-stone">
                                {line.note}
                              </span>
                            )}
                          </span>
                          <span className="tnum text-[16px] text-ink">
                            ${line.price}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-20 rounded-[24px] bg-wash px-8 py-10 text-center sm:px-14">
            <p className="text-[17px] leading-[1.7] text-stone">
              This is a curated selection. The full menu also includes kebabs,
              chaat, breads, lassi, gulab jamun and more.
            </p>
            <a
              href={FULL_MENU_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid mt-8 inline-flex"
            >
              View complete menu
              <IconArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
