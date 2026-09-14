import type { Metadata } from "next";
import {
  ClosingCta,
  darkPrimary,
  darkSecondary,
} from "@/components/ClosingCta";
import { MenuBook } from "@/components/menu-book/MenuBook";
import { MenuText } from "@/components/menu-book/MenuText";
import { IconArrowUpRight, IconPhone } from "@/components/icons";
import { getPlates } from "@/lib/local-photos";
import { FULL_MENU_URL, PHONE_HREF } from "@/lib/menu-data";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "The Lukla's full menu with prices: momos, chowmein, dosa, idli, tandoor, curries, biryani, breads and breakfast, plus Jain and vegan menus.",
};

// Opens straight on the menu book; there is no page header in front of it.
export default function Menu() {
  const plates = getPlates();

  return (
    <>
      <MenuBook
        plates={{
          momo: plates.momo?.src,
          dosa: plates.dosa?.src,
          biryani: plates.biryani?.src,
          chai: plates.chai?.src,
        }}
      />
      <MenuText />

      <ClosingCta
        eyebrow="Ready to order?"
        title="Call ahead for takeout"
        body="Everything in the book is cooked to order. Call for takeout or curbside pickup, or just walk in."
      >
        <a href={PHONE_HREF} className={`${darkPrimary} gap-2.5`}>
          <IconPhone className="h-4 w-4" />
          Call to order
        </a>
        <a
          href={FULL_MENU_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={darkSecondary}
        >
          Full menu (PDF)
          <IconArrowUpRight className="h-4 w-4" />
        </a>
      </ClosingCta>
    </>
  );
}
