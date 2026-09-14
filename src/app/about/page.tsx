import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClosingCta, darkPrimary, darkSecondary } from "@/components/ClosingCta";
import { PageHeader } from "@/components/PageHeader";
import { Reviews } from "@/components/Reviews";
import { ScrollTurn } from "@/components/ScrollTurn";
import { Story } from "@/components/Story";
import { WhatToExpect } from "@/components/WhatToExpect";
import { IconArrowRight, IconArrowUpRight } from "@/components/icons";
import { MAPS_URL } from "@/lib/menu-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Lukla is named after the Nepali mountain town where treks to Everest begin. A Himalayan and South Indian kitchen three minutes from Niagara Falls.",
};

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A Himalayan and South Indian kitchen"
        intro="Momos from the mountains of Nepal and dosa from South India, cooked side by side three minutes from Niagara Falls."
        art={
          <ScrollTurn degrees={20} className="relative aspect-square w-full">
            <Image
              src="/thali-plate.png"
              alt=""
              fill
              sizes="540px"
              className="object-contain drop-shadow-[0_30px_40px_rgba(21,34,61,0.3)]"
            />
          </ScrollTurn>
        }
      />

      <Story />
      <WhatToExpect />
      <Reviews />

      <ClosingCta
        eyebrow="Come hungry"
        title="Three minutes from the Falls"
        body="Spend the afternoon by the water, then come up the road for momos and a cup of chai."
      >
        <Link href="/menu" className={darkPrimary}>
          See the menu
          <IconArrowRight className="h-4 w-4" />
        </Link>
        <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={darkSecondary}>
          Get directions
          <IconArrowUpRight className="h-4 w-4" />
        </a>
      </ClosingCta>
    </>
  );
}
