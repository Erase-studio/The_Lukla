import type { Metadata } from "next";
import Image from "next/image";
import {
  ClosingCta,
  darkPrimary,
  darkSecondary,
} from "@/components/ClosingCta";
import { MenuBook } from "@/components/menu-book/MenuBook";
import { MenuText } from "@/components/menu-book/MenuText";
import { PageHeader } from "@/components/PageHeader";
import { ScrollTurn } from "@/components/ScrollTurn";
import { IconArrowUpRight, IconPhone } from "@/components/icons";
import { getPlates } from "@/lib/local-photos";
import { FULL_MENU_URL, PHONE_HREF } from "@/lib/menu-data";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "The Lukla's full menu with prices: momos, chowmein, dosa, idli, tandoor, curries, biryani, breads and breakfast, plus Jain and vegan menus.",
};

export default function Menu() {
  const plates = getPlates();
  const art =
    plates.momo && plates.dosa ? (
      <div className="relative aspect-square w-full">
        <ScrollTurn
          degrees={-24}
          className="absolute right-[14%] top-0 aspect-square w-[72%]"
        >
          <Image
            src={plates.momo.src}
            alt=""
            fill
            sizes="380px"
            className="object-contain drop-shadow-[0_26px_32px_rgba(21,34,61,0.3)]"
          />
        </ScrollTurn>
        <ScrollTurn
          degrees={30}
          className="absolute bottom-[2%] left-0 aspect-square w-[54%]"
        >
          <Image
            src={plates.dosa.src}
            alt=""
            fill
            sizes="290px"
            className="object-contain drop-shadow-[0_26px_32px_rgba(21,34,61,0.3)]"
          />
        </ScrollTurn>
      </div>
    ) : undefined;

  return (
    <>
      <PageHeader
        eyebrow="Menu"
        title="What we cook"
        intro="Flip through the whole menu: momos and thukpa from the Himalayas, dosa and biryani from South India, and dishes from the tandoor."
        art={art}
      >
        <p className="mt-6 text-[15px] font-medium text-ink/75">
          Jain and vegan menus inside · Halal options available
        </p>
      </PageHeader>

      <MenuText />
      <MenuBook
        plates={{
          momo: plates.momo?.src,
          dosa: plates.dosa?.src,
          biryani: plates.biryani?.src,
          chai: plates.chai?.src,
        }}
      />

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
