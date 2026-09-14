import type { Metadata } from "next";
import Image from "next/image";
import {
  ClosingCta,
  darkPrimary,
  darkSecondary,
} from "@/components/ClosingCta";
import { MenuPage } from "@/components/MenuPage";
import { PageHeader } from "@/components/PageHeader";
import { ScrollTurn } from "@/components/ScrollTurn";
import { IconArrowUpRight, IconPhone } from "@/components/icons";
import { getPlates } from "@/lib/local-photos";
import { FULL_MENU_URL, PHONE_HREF } from "@/lib/menu-data";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Momos, thukpa, dosa, idli and tandoor dishes with prices. Vegan and Jain plates on request, halal options available.",
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
        intro="Momos and thukpa from the Himalayas, dosa and idli from South India, and dishes from the tandoor. Cooked to order, every day."
        art={art}
      >
        <p className="mt-6 text-[15px] font-medium text-ink/75">
          Vegan and Jain on request · Halal options available
        </p>
      </PageHeader>

      <MenuPage plates={plates} />

      <ClosingCta
        eyebrow="There's more"
        title="The full menu"
        body="Kebabs, chaat, breads, lassi and desserts are on the full menu too. Call ahead for takeout or curbside pickup."
      >
        <a
          href={FULL_MENU_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={darkPrimary}
        >
          Full menu (PDF)
          <IconArrowUpRight className="h-4 w-4" />
        </a>
        <a href={PHONE_HREF} className={`${darkSecondary} gap-2.5`}>
          <IconPhone className="h-4 w-4" />
          Call to order
        </a>
      </ClosingCta>
    </>
  );
}
